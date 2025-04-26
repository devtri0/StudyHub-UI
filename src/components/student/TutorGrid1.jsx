import React from "react";
import { Link } from "react-router-dom";

const TutorsGrid = ({ tutors = [], onViewProfile }) => {
  // If tutors is null or undefined, show loading state
  if (tutors === null || tutors === undefined) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading tutors...</p>
        </div>
      </div>
    );
  }

  // If tutors is an empty array
  if (tutors.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-10">
          <p className="text-gray-500">No tutors available at the moment</p>
          <p className="text-gray-400 text-sm mt-2">
            Please check back later or contact support
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Tutor Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={tutor.photo || "https://via.placeholder.com/200"}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
            </div>

            {/* Tutor Info */}
            <div className="p-4">
              <h3 className="font-medium text-lg">
                {tutor.firstName} {tutor.lastName}
              </h3>
              <div className="text-sm text-gray-600 mt-1">
                {tutor.subjects?.length > 0 ? (
                  <p>
                    <span className="font-medium">Subjects: </span>
                    {tutor.subjects.map((sub) => sub.name).join(", ")}
                  </p>
                ) : (
                  <p className="text-gray-400">No subjects listed</p>
                )}

                <p className="mt-1 text-gray-500">
                  <span className="font-medium">Teaching Style: </span>
                  {tutor.teachingStyle || (
                    <span className="text-gray-400">Not specified</span>
                  )}
                </p>
              </div>

              <button
                onClick={() => onViewProfile(tutor)}
                className="block mt-3 w-full text-center py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors font-medium text-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsGrid;