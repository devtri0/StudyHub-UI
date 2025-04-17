import React from "react";
import { ArrowRight } from "lucide-react";
import image1 from "../assets/images/T4.jpg";
import image2 from "../assets/images/T2.jpg";
import image3 from "../assets/images/T5.jpg";

const FeaturedTutors = () => {
  // Sample tutor data - in a real app, this would come from props or API
  const featuredTutors = [
    {
      id: 1,
      name: "Stephen Appiah",
      subject: "Mathematics",
      expertise: "Calculus",
      image: image1,
    },
    {
      id: 2,
      name: "Sarah Lee",
      subject: "Physics",
      expertise: "Quantum Physics",
      image: image2,
    },
    {
      id: 3,
      name: "Edward Addo",
      subject: "Chemistry",
      expertise: "Organic Chemistry",
      image: image3,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Featured Tutors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated tutors who are experts in their fields
            and passionate about helping students succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-top object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{tutor.name}</h3>
                <p className="text-gray-600 mb-1">Subject: {tutor.subject}</p>
                <p className="text-gray-600 mb-4">
                  Expertise: {tutor.expertise}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/tutors"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Browse More
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
