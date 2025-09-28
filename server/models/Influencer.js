// server/models/Influencer.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['image', 'video', 'carousel'], required: true },
  mediaUrl: { type: String, required: true },
  thumbnailUrl: String,
  caption: String,
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  timestamp: { type: Date, required: true },

  // AI Analysis Results
  analysis: {
    keywords: [String],
    vibe: {
      type: String,
      enum: ['casual', 'aesthetic', 'luxury', 'energetic', 'minimal', 'artistic', 'professional']
    },
    quality: {
      lighting: { type: Number, min: 0, max: 10 },
      composition: { type: Number, min: 0, max: 10 },
      visualAppeal: { type: Number, min: 0, max: 10 }
    },
    objects: [String],
    colors: [String],
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] }
  }
}, { timestamps: true });

const influencerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: String,
  biography: String,
  profilePicUrl: String,
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },

  // Analytics
  analytics: {
    avgLikesPerPost: { type: Number, default: 0 },
    avgCommentsPerPost: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
    lastUpdated: Date
  },

  // Demographics (bonus feature)
  demographics: {
    ageGroups: [{
      range: String,
      percentage: Number
    }],
    genderSplit: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    },
    topLocations: [String]
  },

  posts: [postSchema],

  lastScraped: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for performance
influencerSchema.index({ username: 1 });
influencerSchema.index({ 'posts.timestamp': -1 });

const Influencer = mongoose.model('Influencer', influencerSchema);

export default Influencer;
