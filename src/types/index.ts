export interface Post {
  id: string;
  type: 'image' | 'video' | 'carousel';
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  timestamp: string;
  analysis?: {
    keywords: string[];
    vibe: string;
    quality: {
      lighting: number;
      composition: number;
      visualAppeal: number;
    };
    objects: string[];
    colors: string[];
    sentiment: string;
  };
}

export interface InfluencerData {
  username: string;
  displayName: string;
  biography: string;
  profilePicUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  analytics: {
    avgLikesPerPost: number;
    avgCommentsPerPost: number;
    engagementRate: number;
    lastUpdated: string;
  };
  demographics: Demographics;
  posts: Post[];
  lastScraped: string;
}

export interface Demographics {
  ageGroups: Array<{
    range: string;
    percentage: number;
  }>;
  genderSplit: {
    male: number;
    female: number;
    other: number;
  };
  topLocations: string[];
}

export interface AnalyticsData {
  basic: {
    avgLikesPerPost: number;
    avgCommentsPerPost: number;
    engagementRate: number;
  };
  engagementTrend: Array<{
    date: string;
    likes: number;
    comments: number;
    engagement: number;
  }>;
  contentAnalysis: {
    vibeDistribution: Record<string, number>;
    topKeywords: Array<[string, number]>;
    avgQuality: {
      lighting: number;
      composition: number;
      visualAppeal: number;
    };
  };
  demographics: Demographics;
}