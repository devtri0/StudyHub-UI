import React from "react";
import { Link } from "react-router";
import image from "../assets/images/T1.jpg";
import image1 from "../assets/images/T4.jpg";
import image2 from "../assets/images/T2.jpg";
import image3 from "../assets/images/T5.jpg";
import image4 from "../assets/images/T3.jpg";
import image5 from "../assets/images/T6.jpg";

const TutorsGrid = () => {
  const tutors = [
    {
      id: "1",
      name: "Emily Johnson",
      subjects: ["Math", "Physics"],
      availability: "Mon-Fri, 3-6 PM",
      image: image,
    },
    {
      id: "2",
      name: "Michael Smith",
      subjects: ["Chemistry", "Biology"],
      availability: "Sat-Sun, 1-4 PM",
      image: image1,
    },
    {
      id: "3",
      name: "Sarah Brown",
      subjects: ["English", "History"],
      availability: "Mon-Fri, 1-5 PM",
      image: image2,
    },
    {
      id: "4",
      name: "James Wilson",
      subjects: ["Computer Science", "Math"],
      availability: "Wed-Fri, 2-7 PM",
      image: image3,
    },
    {
      id: "5",
      name: "Jessica Lee",
      subjects: ["Art", "Music"],
      availability: "Mon-Sat, 10-3 PM",
      image: image4,
    },
    {
      id: "6",
      name: "William Davis",
      subjects: ["Economics", "Business"],
      availability: "Tue-Thurs, 4-8 PM",
      image: image5,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-30">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Tutor Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={tutor.image}
                alt={`${tutor.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tutor Info */}
            <div className="p-4">
              <h3 className="font-medium text-lg">{tutor.name}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>
                  <span className="font-medium">Subjects: </span>
                  {tutor.subjects.join(", ")}
                </p>
                <p className="mt-1">
                  <span className="font-medium">Availability: </span>
                  {tutor.availability}
                </p>
              </div>
              <Link
                to={`/tutors/${tutor.id}`}
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
