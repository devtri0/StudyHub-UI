// src/components/student/StudyGroupCard.jsx
import React from "react";
import { FiUsers, FiCalendar, FiBook } from "react-icons/fi";

const StudyGroupCard = ({ group, onJoin }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative h-40 bg-gray-100">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://source.unsplash.com/random/300x200/?study";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{group.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FiBook className="mr-1" /> {group.subject}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiUsers className="mr-2" />
          <span>{group.members} members</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FiCalendar className="mr-2" />
          <span>Next: {group.nextSession}</span>
        </div>
        
        <button
          onClick={onJoin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Join Group
        </button>
      </div>
    </div>
  );
};

export default StudyGroupCard;