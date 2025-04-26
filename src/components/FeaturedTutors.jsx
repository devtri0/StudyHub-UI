import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch("https://studyhub-api-p0q4.onrender.com/tutors");
        if (!response.ok) {
          throw new Error("Failed to fetch tutors");
        }
        const data = await response.json();
        setTutors(data.data || []); // Changed from data.tutors to data.data
      } catch (err) {
        setError(err.message);
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    if (tutors.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 3) % tutors.length
        );
      }, 5000); // Rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [tutors]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p>Loading tutors...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  // Get current tutors to display (3 at a time)
  const visibleTutors = [];
  for (let i = 0; i < Math.min(3, tutors.length); i++) {
    const index = (currentIndex + i) % tutors.length;
    visibleTutors.push(tutors[index]);
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 font-serif">Featured Tutors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated tutors who are experts in their fields
            and passionate about helping students succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visibleTutors.map((tutor, index) => (
            <div
              key={tutor._id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={tutor.photo || "https://via.placeholder.com/300"}
                  alt={`${tutor.firstName} ${tutor.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">
                  {tutor.firstName} {tutor.lastName}
                </h3>
                <p className="text-gray-600 mb-1">
                  Subjects: {tutor.subjects?.map(s => s.name).join(", ") || "Not specified"}
                </p>
                <p className="text-gray-600 mb-1">
                  Teaching Style: {tutor.teachingStyle || "Not specified"}
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