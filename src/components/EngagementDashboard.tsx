import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Heart, MessageCircle, BarChart3 } from 'lucide-react';
import { AnalyticsData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementDashboardProps {
  analytics: AnalyticsData;
}

const EngagementDashboard: React.FC<EngagementDashboardProps> = ({ analytics }) => {
  const engagementTrendData = {
    labels: analytics.engagementTrend.map(item => 
      new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Likes',
        data: analytics.engagementTrend.map(item => item.likes),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
      {
        label: 'Comments',
        data: analytics.engagementTrend.map(item => item.comments),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const vibeData = {
    labels: Object.keys(analytics.contentAnalysis.vibeDistribution),
    datasets: [
      {
        data: Object.values(analytics.contentAnalysis.vibeDistribution),
        backgroundColor: [
          '#3B82F6',
          '#8B5CF6',
          '#06D6A0',
          '#F59E0B',
          '#EF4444',
          '#EC4899',
        ],
        borderWidth: 0,
      },
    ],
  };

  const keywordData = {
    labels: analytics.contentAnalysis.topKeywords.slice(0, 8).map(([keyword]) => keyword),
    datasets: [
      {
        label: 'Frequency',
        data: analytics.contentAnalysis.topKeywords.slice(0, 8).map(([, count]) => count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg Likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.basic.avgLikesPerPost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg Comments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.basic.avgCommentsPerPost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.basic.engagementRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Engagement Trend</h3>
          </div>
          <div className="h-64">
            <Line data={engagementTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Content Vibes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Content Vibes</h3>
          <div className="h-64">
            <Doughnut data={vibeData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Keywords</h3>
        <div className="h-64">
          <Bar data={keywordData} options={chartOptions} />
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Content Quality Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-yellow-500"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${analytics.contentAnalysis.avgQuality.lighting * 10}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {analytics.contentAnalysis.avgQuality.lighting}/10
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Lighting</h4>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-500"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${analytics.contentAnalysis.avgQuality.composition * 10}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {analytics.contentAnalysis.avgQuality.composition}/10
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Composition</h4>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${analytics.contentAnalysis.avgQuality.visualAppeal * 10}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {analytics.contentAnalysis.avgQuality.visualAppeal}/10
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Visual Appeal</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementDashboard;