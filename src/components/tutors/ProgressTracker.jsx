import React from 'react';
import { FiCheckCircle, FiAward } from 'react-icons/fi';

const ProgressTracker = ({ completion }) => {
  const getProgressColor = () => {
    if (completion < 30) return 'bg-red-400';
    if (completion < 70) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const getProgressMessage = () => {
    if (completion < 30) return 'Just getting started!';
    if (completion < 70) return 'Almost there!';
    if (completion < 100) return 'Looking great!';
    return 'Profile complete!';
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <FiAward className="mr-2 text-yellow-500" />
          Profile Completion
        </h2>
        <span className="text-lg font-bold">{completion}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
        <div 
          className={`h-4 rounded-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${completion}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{getProgressMessage()} Complete your profile to get more students.</p>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <FiCheckCircle className={`mr-2 ${completion >= 50 ? 'text-green-500' : 'text-gray-300'}`} />
          <span className={completion >= 50 ? 'font-medium' : 'text-gray-500'}>Basic Information</span>
        </div>
        <div className="flex items-center">
          <FiCheckCircle className={`mr-2 ${completion >= 70 ? 'text-green-500' : 'text-gray-300'}`} />
          <span className={completion >= 70 ? 'font-medium' : 'text-gray-500'}>Teaching Details</span>
        </div>
        <div className="flex items-center">
          <FiCheckCircle className={`mr-2 ${completion >= 90 ? 'text-green-500' : 'text-gray-300'}`} />
          <span className={completion >= 90 ? 'font-medium' : 'text-gray-500'}>Certifications</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;