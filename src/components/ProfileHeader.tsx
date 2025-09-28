import React from 'react';
import { CheckCircle, Users, Image, UserPlus } from 'lucide-react';
import { InfluencerData } from '../types';

interface ProfileHeaderProps {
  influencer: InfluencerData;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ influencer }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={influencer.profilePicUrl}
            alt={`${influencer.username} profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-purple-400 to-pink-400 p-1"
          />
          {influencer.isVerified && (
            <CheckCircle className="absolute -bottom-2 -right-2 h-8 w-8 text-blue-500 bg-white rounded-full" />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {influencer.displayName}
            </h1>
            <p className="text-xl text-gray-600 mb-4">@{influencer.username}</p>
            
            {influencer.biography && (
              <p className="text-gray-700 leading-relaxed max-w-2xl whitespace-pre-line">
                {influencer.biography}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image className="h-6 w-6 text-purple-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {formatNumber(influencer.postsCount)}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Posts</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {formatNumber(influencer.followersCount)}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Followers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <UserPlus className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {formatNumber(influencer.followingCount)}
                </span>
              </div>
              <p className="text-gray-600 font-medium">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;