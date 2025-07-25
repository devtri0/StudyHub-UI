// src/components/student/AchievementBadge.jsx
import React from "react";

const AchievementBadge = ({ achievement }) => {
  return (
    <div className={`p-4 rounded-lg border ${achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200 opacity-50"}`}>
      <div className="flex items-center">
        <div className={`text-2xl mr-3 ${achievement.earned ? "text-yellow-500" : "text-gray-400"}`}>
          {achievement.icon}
        </div>
        <div>
          <h4 className={`font-medium ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
            {achievement.name}
          </h4>
          <p className="text-sm text-gray-500">
            {achievement.earned ? "Earned" : "Locked"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;