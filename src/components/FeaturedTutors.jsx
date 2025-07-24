import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react"; // Make sure lucide-react is installed

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [usdToGhsRate, setUsdToGhsRate] = useState(12.15); // Initialize with a default value

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch("https://studyhub-api-p0q4.onrender.com/tutors");
        if (!response.ok) {
          throw new Error("Failed to fetch tutors");
        }
        const data = await response.json();
        setTutors(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchExchangeRate = async () => {
      // Replace with your actual exchange rate API endpoint
      // This is a placeholder and might not work as is
      try {
        // const response = await fetch("YOUR_EXCHANGE_RATE_API_ENDPOINT");
        // const data = await response.json();
        // setUsdToGhsRate(data.rate); // Adjust based on the API response structure

        // For demonstration purposes, let's assume a fixed rate
        setUsdToGhsRate(12.15);
      } catch (error) {
        console.error("Failed to fetch exchange rate, using default:", error);
        // Optionally, handle the error (e.g., display a message)
      }
    };

    fetchTutors();
    fetchExchangeRate(); // Fetch exchange rate when component mounts
  }, []);

  // Auto-slide effect when not hovering and more than 3 tutors
  useEffect(() => {
    if (tutors.length > 3 && !isHovering) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % (tutors.length - 2) // Logic to loop the visible window
        );
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [tutors, isHovering]); // Re-run effect if tutors or hover state changes

  const nextTutor = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (tutors.length - 2)
    );
  };

  const prevTutor = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      // Handle wrap-around for previous button
      return newIndex < 0 ? (tutors.length - 3) : newIndex; // (length - 3) ensures last possible starting index for 3 visible cards
    });
  };

  // Loading State
  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Featured Tutors</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">Discover top educators shaping future leaders.</p>
            <div className="flex justify-center mt-3">
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-3 animate-pulse border border-gray-100">
                <div className="h-24 bg-gray-200 rounded-xl mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4 text-center">
          <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md">
            <p className="text-red-800 text-sm font-semibold mb-1">Oops! Something went wrong.</p>
            <p className="text-red-700 mb-2 text-xs">We couldn't load the tutors at the moment. Please try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No Tutors State
  if (tutors.length === 0) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4 text-center">
          <p className="text-gray-600 text-sm font-medium">No tutors available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  // Main Content
  const visibleTutors = tutors.slice(currentIndex, currentIndex + 3);
  // Adjust visibleTutors if there are fewer than 3 at the end to loop correctly
  if (visibleTutors.length < 3 && tutors.length > 3) {
    const remaining = 3 - visibleTutors.length;
    visibleTutors.push(...tutors.slice(0, remaining));
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white to-blue-50 overflow-hidden"> {/* Increased padding, subtle gradient, overflow-hidden for nav buttons */}
      <div className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-6"> {/* More bottom margin */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight"> {/* Bigger, bolder, tighter spacing */}
            Meet Our Expert <span className="text-blue-600">Tutors</span>
          </h2>
          <p className="text-sm md:text-md text-gray-700 max-w-3xl mx-auto leading-relaxed"> {/* Larger text, darker color, better line height */}
            Learn from the best – our tutors are handpicked for their expertise, passion, and commitment to student success.
          </p>
          <div className="flex justify-center mt-3">
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div> {/* Thicker, slightly longer underline */}
          </div>
        </div>

        <div 
          className="relative px-4 lg:px-0" // Add padding to make space for arrows
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {tutors.length > 3 && ( // Only show arrows if there are more than 3 tutors to scroll
            <>
              <button 
                onClick={prevTutor}
                className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-2 z-20 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Bigger padding, stronger shadow, focus styles
                aria-label="Previous tutors"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" /> {/* Larger icon */}
              </button>
              <button 
                onClick={nextTutor}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-2 z-20 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Bigger padding, stronger shadow, focus styles
                aria-label="Next tutors"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" /> {/* Larger icon */}
              </button>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-transform duration-500 ease-in-out"> {/* Increased gap, added transition for smooth sliding */}
            {visibleTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005] hover:shadow-xl border border-gray-100" // More rounded, stronger shadow, subtle scale and richer shadow on hover
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={tutor.photo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"}
                    alt={`${tutor.firstName} ${tutor.lastName}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" // Image scales more on card hover
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Ensure images fit well
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"; // Fallback image
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-4"> {/* Stronger gradient */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} // Larger stars
                        />
                      ))}
                      <span className="ml-1 text-white text-sm font-semibold">4.8</span> {/* Larger, bolder rating */}
                    </div>
                  </div>
                </div>
                <div className="p-2"> {/* Increased padding */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight"> {/* Larger, bolder name */}
                    {tutor.firstName} {tutor.lastName}
                  </h3>
                  <p className="text-blue-700 font-semibold text-sm mb-1"> {/* Bolder subjects */}
                    {tutor.subjects?.map(s => s.name).join(", ") || "Diverse Subjects"}
                  </p>
                  <p className="text-gray-700 text-xs mb-1 line-clamp-3 leading-relaxed"> {/* Larger text, better line height, more lines for bio */}
                    {tutor.bio || `Passionate educator specializing in ${tutor.subjects?.map(s => s.name).join(", ") || "various subjects"}. Dedicated to helping students achieve their academic goals.`}
                  </p>
                  <div className="flex justify-between items-center pt-1 border-t border-gray-100"> {/* Added top border for separation */}
                    <div>
                      <span className="text-gray-900 font-extrabold text-lg">
                        {`GHS ${isNaN(tutor.hourlyRate * usdToGhsRate) ? 'N/A' : (tutor.hourlyRate * usdToGhsRate).toFixed(2)}`}
                      </span> {/* Larger, extra bold price in GHS */}
                      <span className="text-gray-500 text-xs"> / hour</span>
                    </div>
                    <Link
                      to={`/tutors/${tutor._id}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center group transition-colors duration-200" // Bolder, larger text, group for arrow animation
                    >
                      View Profile
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" /> {/* Larger arrow, subtle slide on hover */}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8"> {/* More top margin */}
          <Link
            to="/tutors"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-sm" // Bigger, bolder, more rounded, richer gradient, richer shadow, subtle lift
          >
            Browse All Tutors
            <ArrowRight className="ml-1 h-4 w-4" /> {/* Larger arrow */}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;