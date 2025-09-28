import React, { useState } from 'react';
import { Heart, MessageCircle, Play, Calendar, Eye } from 'lucide-react';
import { Post } from '../types';

interface PostGridProps {
  posts: Post[];
  title: string;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, title }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getVibeColor = (vibe: string) => {
    const colors = {
      casual: 'bg-blue-100 text-blue-800',
      aesthetic: 'bg-purple-100 text-purple-800',
      luxury: 'bg-yellow-100 text-yellow-800',
      energetic: 'bg-red-100 text-red-800',
      minimal: 'bg-gray-100 text-gray-800',
      artistic: 'bg-indigo-100 text-indigo-800',
      professional: 'bg-green-100 text-green-800'
    };
    return colors[vibe as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.mediaUrl}
              alt="Post"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Type indicator */}
            <div className="absolute top-3 right-3">
              {post.type === 'video' && (
                <div className="bg-black bg-opacity-70 rounded-full p-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
              {post.type === 'carousel' && (
                <div className="bg-black bg-opacity-70 rounded-full px-2 py-1">
                  <span className="text-white text-xs font-medium">1/n</span>
                </div>
              )}
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                <div className="flex items-center justify-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-1" />
                    <span className="font-semibold">{formatNumber(post.likesCount)}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    <span className="font-semibold">{formatNumber(post.commentsCount)}</span>
                  </div>
                  {post.viewsCount > 0 && (
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 mr-1" />
                      <span className="font-semibold">{formatNumber(post.viewsCount)}</span>
                    </div>
                  )}
                </div>
                {post.analysis?.vibe && (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getVibeColor(post.analysis.vibe)}`}>
                    {post.analysis.vibe}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
            <div className="relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
              >
                <span className="text-xl">&times;</span>
              </button>
              
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={selectedPost.mediaUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Post Details</h4>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(selectedPost.timestamp)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="h-5 w-5 text-red-500 mr-1" />
                        <span className="font-semibold">{formatNumber(selectedPost.likesCount)}</span>
                      </div>
                      <p className="text-sm text-gray-600">Likes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <MessageCircle className="h-5 w-5 text-blue-500 mr-1" />
                        <span className="font-semibold">{formatNumber(selectedPost.commentsCount)}</span>
                      </div>
                      <p className="text-sm text-gray-600">Comments</p>
                    </div>
                    {selectedPost.viewsCount > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-5 w-5 text-green-500 mr-1" />
                          <span className="font-semibold">{formatNumber(selectedPost.viewsCount)}</span>
                        </div>
                        <p className="text-sm text-gray-600">Views</p>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  {selectedPost.caption && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Caption</h5>
                      <p className="text-gray-700 leading-relaxed">{selectedPost.caption}</p>
                    </div>
                  )}

                  {/* AI Analysis */}
                  {selectedPost.analysis && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">AI Analysis</h5>
                      
                      {selectedPost.analysis.vibe && (
                        <div className="mb-3">
                          <span className="text-sm text-gray-600 mr-2">Vibe:</span>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getVibeColor(selectedPost.analysis.vibe)}`}>
                            {selectedPost.analysis.vibe}
                          </span>
                        </div>
                      )}

                      {selectedPost.analysis.keywords && selectedPost.analysis.keywords.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm text-gray-600 block mb-2">Keywords:</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedPost.analysis.keywords.map((keyword, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                #{keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedPost.analysis.objects && selectedPost.analysis.objects.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm text-gray-600 block mb-2">Objects Detected:</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedPost.analysis.objects.map((object, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                {object}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedPost.analysis.quality && (
                        <div>
                          <span className="text-sm text-gray-600 block mb-2">Quality Scores:</span>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Lighting:</span>
                              <span className="text-sm font-medium">{selectedPost.analysis.quality.lighting}/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Composition:</span>
                              <span className="text-sm font-medium">{selectedPost.analysis.quality.composition}/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Visual Appeal:</span>
                              <span className="text-sm font-medium">{selectedPost.analysis.quality.visualAppeal}/10</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGrid;