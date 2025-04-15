import React, { useState } from "react";

const TutorCard = () => {
  // State for selected values
  const [selectedSubject, setSelectedSubject] = useState("");
  const [availability, setAvailability] = useState({
    morning: false,
    afternoon: false,
    evening: true,
  });
  const [rating, setRating] = useState({
    fourPointFive: false,
    four: true,
    threePointFive: false,
  });

  // Available subjects
  const subjects = [
    "English language and literature",
    "Mathematics",
    // Add more subjects as needed
  ];

  // Handle subject change
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  // Handle availability checkbox changes
  const handleAvailabilityChange = (timeSlot) => {
    setAvailability({
      ...availability,
      [timeSlot]: !availability[timeSlot],
    });
  };

  // Handle rating checkbox changes
  const handleRatingChange = (ratingValue) => {
    setRating({
      ...rating,
      [ratingValue]: !rating[ratingValue],
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-25">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif">
        Filter for a Tutor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Subject Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Subject</h3>
          <div className="relative">
            <div className="border rounded p-2 flex items-center justify-between cursor-pointer">
              <span className="text-gray-500">Select Subject</span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>

          {/* Display selected subjects */}
          <div className="mt-2">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="text-sm py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubjectChange(subject)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Availability Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="morning"
                className="w-4 h-4 mr-2"
                checked={availability.morning}
                onChange={() => handleAvailabilityChange("morning")}
              />
              <label htmlFor="morning" className="text-sm">
                Morning (6am - 12pm)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="afternoon"
                className="w-4 h-4 mr-2"
                checked={availability.afternoon}
                onChange={() => handleAvailabilityChange("afternoon")}
              />
              <label htmlFor="afternoon" className="text-sm">
                Afternoon (12pm - 6pm)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="evening"
                className="w-4 h-4 mr-2"
                checked={availability.evening}
                onChange={() => handleAvailabilityChange("evening")}
              />
              <label htmlFor="evening" className="text-sm">
                Evening (6pm - 12am)
              </label>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Rating</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fourPointFive"
                className="w-4 h-4 mr-2"
                checked={rating.fourPointFive}
                onChange={() => handleRatingChange("fourPointFive")}
              />
              <label htmlFor="fourPointFive" className="text-sm">
                4.5 stars & above
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="four"
                className="w-4 h-4 mr-2"
                checked={rating.four}
                onChange={() => handleRatingChange("four")}
              />
              <label htmlFor="four" className="text-sm">
                4 stars & above
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="threePointFive"
                className="w-4 h-4 mr-2"
                checked={rating.threePointFive}
                onChange={() => handleRatingChange("threePointFive")}
              />
              <label htmlFor="threePointFive" className="text-sm">
                3.5 stars & above
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
