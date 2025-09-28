// server/services/analyticsService.js
class AnalyticsService {
  static calculateEngagementMetrics(posts, followersCount) {
    if (!posts || posts.length === 0) {
      return {
        avgLikesPerPost: 0,
        avgCommentsPerPost: 0,
        engagementRate: 0,
      };
    }

    const totalLikes = posts.reduce((sum, post) => sum + (post.likesCount || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);

    const avgLikesPerPost = Math.round(totalLikes / posts.length);
    const avgCommentsPerPost = Math.round(totalComments / posts.length);

    // Engagement Rate = (Average Likes + Average Comments) / Followers * 100
    const engagementRate =
      followersCount > 0
        ? Number(((avgLikesPerPost + avgCommentsPerPost) / followersCount * 100).toFixed(2))
        : 0;

    return {
      avgLikesPerPost,
      avgCommentsPerPost,
      engagementRate,
    };
  }

  static getEngagementTrend(posts) {
    return posts
      .slice(0, 10)
      .map((post) => ({
        date: post.timestamp,
        likes: post.likesCount,
        comments: post.commentsCount,
        engagement: post.likesCount + post.commentsCount,
      }))
      .reverse();
  }

  static getContentAnalysis(posts) {
    const vibeDistribution = {};
    const keywordFrequency = {};
    const qualityMetrics = { lighting: 0, composition: 0, visualAppeal: 0 };

    posts.forEach((post) => {
      if (post.analysis) {
        // Vibe distribution
        const vibe = post.analysis.vibe;
        vibeDistribution[vibe] = (vibeDistribution[vibe] || 0) + 1;

        // Keywords frequency
        if (post.analysis.keywords) {
          post.analysis.keywords.forEach((keyword) => {
            keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
          });
        }

        // Quality metrics
        if (post.analysis.quality) {
          qualityMetrics.lighting += post.analysis.quality.lighting || 0;
          qualityMetrics.composition += post.analysis.quality.composition || 0;
          qualityMetrics.visualAppeal += post.analysis.quality.visualAppeal || 0;
        }
      }
    });

    const postCount = posts.length || 1;
    return {
      vibeDistribution,
      topKeywords: Object.entries(keywordFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
      avgQuality: {
        lighting: Number((qualityMetrics.lighting / postCount).toFixed(1)),
        composition: Number((qualityMetrics.composition / postCount).toFixed(1)),
        visualAppeal: Number((qualityMetrics.visualAppeal / postCount).toFixed(1)),
      },
    };
  }

  static generateDemographics() {
    // Generate realistic demographic data for demonstration
    return {
      ageGroups: [
        { range: '18-24', percentage: 28 },
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 22 },
        { range: '45-54', percentage: 12 },
        { range: '55+', percentage: 3 },
      ],
      genderSplit: {
        male: Math.floor(Math.random() * 30) + 25,
        female: Math.floor(Math.random() * 30) + 45,
        other: Math.floor(Math.random() * 5) + 2,
      },
      topLocations: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'],
    };
  }
}

export default AnalyticsService;
