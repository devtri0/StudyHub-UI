import React from 'react';
import { FiAward } from 'react-icons/fi';

const AchievementBadge = ({ achievement }) => {
  return (
    <div className={`p-4 rounded-lg border ${achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
      <div className="flex items-center">
        <div className={`text-3xl mr-4 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`}>
          {achievement.icon || <FiAward />}
        </div>
        <div>
          <h4 className={`font-medium ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
            {achievement.name}
          </h4>
          <p className="text-sm text-gray-500">
            {achievement.earned ? 'Earned' : 'Locked'}
          </p>
          {achievement.description && (
            <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;