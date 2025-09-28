import { useState } from 'react';
import { Instagram, RefreshCw, AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProfileHeader from './components/ProfileHeader';
import EngagementDashboard from './components/EngagementDashboard';
import PostGrid from './components/PostGrid';
import DemographicsCard from './components/DemographicsCard';
import { api } from './services/api';
import { InfluencerData, AnalyticsData } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [influencer, setInfluencer] = useState<InfluencerData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Searching for: ${username}`);
      const [influencerData, analyticsData] = await Promise.all([
        api.getInfluencer(username),
        api.getAnalytics(username)
      ]);
      
      setInfluencer(influencerData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!influencer) return;
    
    setRefreshing(true);
    try {
      await api.refreshProfile(influencer.username);
      await handleSearch(influencer.username);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const imagePosts = influencer?.posts.filter(post => post.type === 'image').slice(0, 12) || [];
  const videoPosts = influencer?.posts.filter(post => post.type === 'video').slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Instagram className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Instagram Influencer Analyzer
              </h1>
            </div>
            {influencer && (
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Any Instagram Influencer
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get deep insights into engagement metrics, content analysis, audience demographics, and more
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Analyzing profile and gathering insights...</p>
          </div>
        )}

        {/* Results */}
        {influencer && analytics && !loading && (
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader influencer={influencer} />

            {/* Analytics Dashboard */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
              <EngagementDashboard analytics={analytics} />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posts */}
              <div className="lg:col-span-2">
                <PostGrid posts={imagePosts} title="Recent Posts" />
              </div>

              {/* Demographics */}
              <div>
                <DemographicsCard demographics={analytics.demographics} />
              </div>
            </div>

            {/* Video Content */}
            {videoPosts.length > 0 && (
              <PostGrid posts={videoPosts} title="Recent Videos & Reels" />
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!influencer && !loading && !error && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <Instagram className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Start Your Analysis
              </h3>
              <p className="text-gray-600 mb-8">
                Enter an Instagram username above to begin analyzing their profile, engagement metrics, 
                content quality, and audience insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="h-8 w-8 bg-blue-500 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Profile Analysis</h4>
                  <p className="text-sm text-gray-600">Complete profile overview with follower insights</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="h-8 w-8 bg-purple-500 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content AI Analysis</h4>
                  <p className="text-sm text-gray-600">AI-powered content classification and quality scoring</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="h-8 w-8 bg-green-500 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Demographics</h4>
                  <p className="text-sm text-gray-600">Audience demographics and engagement patterns</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Built with React, Node.js, and MongoDB - Comprehensive Instagram Analytics Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;