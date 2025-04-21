// Tutors.js
import React, { useState, useEffect } from "react";
import TutorCard from "../components/TutorCard";
import TutorsGrid from "../components/TutorsGrid";
import axios from "axios";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    subject: "",
    availability: {
      morning: false,
      afternoon: false,
      evening: false
    }
  });

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://studyhub-api-p0q4.onrender.com/tutors");
        setTutors(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredTutors = tutors.filter(tutor => {
    // Subject filter
    if (filters.subject && !tutor.subjects?.some(sub => sub.name === filters.subject)) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading tutors: {error}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <TutorCard 
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      <TutorsGrid tutors={filteredTutors} />
    </div>
  );
};

export default Tutors;