import React, { useState } from "react";

const TutorCard = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [availability, setAvailability] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const subjects = [
    "English",
    "Maths",
    "Physics",
    "Economics",
    "Chemistry",
    "French",
    "Biology",
    "Computer Science",
  ];

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleAvailabilityChange = (timeSlot) => {
    setAvailability((prev) => ({
      ...prev,
      [timeSlot]: !prev[timeSlot],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif">
        Filter for a Tutor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Subject Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Subject</h3>
          <div className="border rounded p-2">
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Availability Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <div className="space-y-2">
            {["morning", "afternoon", "evening"].map((slot) => (
              <div key={slot} className="flex items-center">
                <input
                  type="checkbox"
                  id={slot}
                  checked={availability[slot]}
                  onChange={() => handleAvailabilityChange(slot)}
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor={slot} className="text-sm capitalize">
                  {slot} (
                  {slot === "morning"
                    ? "6am - 12pm"
                    : slot === "afternoon"
                    ? "12pm - 6pm"
                    : "6pm - 12am"}
                  )
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
