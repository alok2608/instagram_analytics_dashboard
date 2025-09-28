import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Users, Globe, Calendar } from 'lucide-react';
import { Demographics } from '../types';

interface DemographicsCardProps {
  demographics: Demographics;
}

const DemographicsCard: React.FC<DemographicsCardProps> = ({ demographics }) => {
  const genderData = {
    labels: ['Female', 'Male', 'Other'],
    datasets: [
      {
        data: [demographics.genderSplit.female, demographics.genderSplit.male, demographics.genderSplit.other],
        backgroundColor: ['#EC4899', '#3B82F6', '#6B7280'],
        borderWidth: 0,
      },
    ],
  };

  const ageData = {
    labels: demographics.ageGroups.map(group => group.range),
    datasets: [
      {
        label: 'Percentage',
        data: demographics.ageGroups.map(group => group.percentage),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-purple-500 mr-2" />
        <h3 className="text-2xl font-semibold text-gray-900">Audience Demographics</h3>
      </div>
      
      <div className="space-y-8">
        {/* Gender Split */}
        <div>
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Gender Distribution</h4>
          </div>
          <div className="h-64">
            <Doughnut data={genderData} options={chartOptions} />
          </div>
        </div>

        {/* Age Groups */}
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Age Distribution</h4>
          </div>
          <div className="h-64">
            <Bar data={ageData} options={barOptions} />
          </div>
        </div>

        {/* Top Locations */}
        <div>
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Top Locations</h4>
          </div>
          <div className="space-y-3">
            {demographics.topLocations.map((location, index) => (
              <div key={location} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-900 font-medium">{location}</span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                    style={{ width: `${100 - index * 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicsCard;