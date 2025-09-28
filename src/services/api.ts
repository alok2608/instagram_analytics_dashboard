const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getInfluencer(username: string) {
    const response = await fetch(`${API_BASE_URL}/influencers/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch influencer: ${response.statusText}`);
    }
    return response.json();
  },

  async getAnalytics(username: string) {
    const response = await fetch(`${API_BASE_URL}/influencers/${username}/analytics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }
    return response.json();
  },

  async getPosts(username: string, limit = 10, type = 'all') {
    const response = await fetch(`${API_BASE_URL}/influencers/${username}/posts?limit=${limit}&type=${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return response.json();
  },

  async refreshProfile(username: string) {
    const response = await fetch(`${API_BASE_URL}/influencers/${username}/refresh`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Failed to refresh profile: ${response.statusText}`);
    }
    return response.json();
  },
};