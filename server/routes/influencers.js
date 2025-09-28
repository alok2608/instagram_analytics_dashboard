// server/routes/influencers.js
import express from 'express';
import Influencer from '../models/Influencer.js';
import InstagramScraper from '../services/instagramScraper.js';
import AnalyticsService from '../services/analyticsService.js';

const router = express.Router();

// Get influencer profile
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  console.log(`[INFO] Fetching influencer: ${username}`);

  try {
    let influencer = await Influencer.findOne({ username });
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    if (!influencer || !influencer.lastScraped || influencer.lastScraped < oneHourAgo) {
      console.log(`[INFO] Scraping fresh data for ${username}`);
      const scraper = new InstagramScraper();
      const scrapedData = await scraper.scrapeProfile(username);

      const analytics = AnalyticsService.calculateEngagementMetrics(
        scrapedData.posts,
        scrapedData.followersCount || 0
      );
      const demographics = AnalyticsService.generateDemographics();

      if (influencer) {
        influencer.set({
          ...scrapedData,
          analytics: { ...analytics, lastUpdated: new Date() },
          demographics,
          lastScraped: new Date(),
        });
        await influencer.save();
      } else {
        influencer = new Influencer({
          ...scrapedData,
          analytics: { ...analytics, lastUpdated: new Date() },
          demographics,
          lastScraped: new Date(),
        });
        await influencer.save();
      }
    }

    res.json(influencer);
  } catch (error) {
    console.error('[ERROR] Failed to fetch influencer:', error);
    res.status(500).json({ error: 'Failed to fetch influencer data' });
  }
});

// Get analytics for influencer
router.get('/:username/analytics', async (req, res) => {
  const { username } = req.params;

  try {
    let influencer = await Influencer.findOne({ username });

    // If influencer not found, scrape demo data
    if (!influencer) {
      console.log(`[INFO] Influencer ${username} not found, scraping demo data...`);
      const scraper = new InstagramScraper();
      const scrapedData = await scraper.scrapeProfile(username);

      const analytics = AnalyticsService.calculateEngagementMetrics(
        scrapedData.posts,
        scrapedData.followersCount || 0
      );
      const demographics = AnalyticsService.generateDemographics();

      influencer = new Influencer({
        ...scrapedData,
        analytics: { ...analytics, lastUpdated: new Date() },
        demographics,
        lastScraped: new Date(),
      });
      await influencer.save();
    }

    const posts = Array.isArray(influencer.posts) ? influencer.posts : [];
    const engagementTrend = AnalyticsService.getEngagementTrend(posts);
    const contentAnalysis = AnalyticsService.getContentAnalysis(posts);

    res.json({
      basic: influencer.analytics,
      engagementTrend,
      contentAnalysis,
      demographics: influencer.demographics,
    });
  } catch (error) {
    console.error('[ERROR] Failed to fetch analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get recent posts
router.get('/:username/posts', async (req, res) => {
  const { username } = req.params;
  const limit = parseInt(req.query.limit) || 10;
  const type = req.query.type || 'all';

  try {
    let influencer = await Influencer.findOne({ username });

    // If not found, scrape demo data
    if (!influencer) {
      console.log(`[INFO] Influencer ${username} not found, scraping demo data for posts...`);
      const scraper = new InstagramScraper();
      const scrapedData = await scraper.scrapeProfile(username);

      const analytics = AnalyticsService.calculateEngagementMetrics(
        scrapedData.posts,
        scrapedData.followersCount || 0
      );
      const demographics = AnalyticsService.generateDemographics();

      influencer = new Influencer({
        ...scrapedData,
        analytics: { ...analytics, lastUpdated: new Date() },
        demographics,
        lastScraped: new Date(),
      });
      await influencer.save();
    }

    let posts = Array.isArray(influencer.posts) ? influencer.posts : [];
    if (type !== 'all') posts = posts.filter((post) => post.type === type);
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);

    res.json({ posts, total: posts.length });
  } catch (error) {
    console.error('[ERROR] Failed to fetch posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Force refresh influencer data
router.post('/:username/refresh', async (req, res) => {
  const { username } = req.params;
  console.log(`[INFO] Refreshing influencer: ${username}`);

  try {
    const scraper = new InstagramScraper();
    const scrapedData = await scraper.scrapeProfile(username);

    if (!scrapedData || !Array.isArray(scrapedData.posts)) scrapedData.posts = [];

    const analytics = AnalyticsService.calculateEngagementMetrics(
      scrapedData.posts,
      scrapedData.followersCount || 0
    );
    const demographics = AnalyticsService.generateDemographics();

    const influencer = await Influencer.findOneAndUpdate(
      { username },
      {
        ...scrapedData,
        analytics: { ...analytics, lastUpdated: new Date() },
        demographics,
        lastScraped: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Profile refreshed successfully', data: influencer });
  } catch (error) {
    console.error('[ERROR] Failed to refresh profile:', error);
    res.status(500).json({ error: 'Failed to refresh profile' });
  }
});

export default router;
