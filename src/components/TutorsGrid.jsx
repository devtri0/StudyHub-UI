import React from "react";
import { Link } from "react-router-dom";

const TutorsGrid = ({ tutors }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-30">
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

                {/* Teaching Style */}
                <p className="mt-1 text-gray-500">
                  <span className="font-medium">Teaching Style: </span>
                  {tutor.teachingStyle || (
                    <span className="text-gray-400">Not specified</span>
                  )}
                </p>
              </div>

              <Link
                to={`/tutors/${tutor._id}`}
                className="block mt-3 w-full text-center py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors font-medium text-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsGrid;
