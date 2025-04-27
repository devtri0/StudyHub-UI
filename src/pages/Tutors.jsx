import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TutorCard from "../components/TutorCard";
import TutorsGrid from "../components/TutorsGrid";
import Pagination from "../components/Pagination";
import axios from "axios";
import { toast } from "react-toastify";

const Tutors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);
  const [count, setCount] = useState(0);
  
  // Filter states
  const [filters, setFilters] = useState({
    subject: "",
    availability: {
      morning: false,
      afternoon: false,
      evening: false,
    },
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage] = useState(4); // Show 4 tutors per page

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        
        // Check if we have filtered tutors from navigation state
        if (location.state?.tutors) {
          setTutors(location.state.tutors);
          setFilterLevel(location.state.filterLevel);
          setCount(location.state.count);
          setLoading(false);
          return;
        }

        // Otherwise fetch all tutors
        const response = await axios.get(
          "https://studyhub-api-p0q4.onrender.com/tutors"
        );
        
        if (response.data.success) {
          setTutors(response.data.data);
          setCount(response.data.data.length);
        } else {
          throw new Error(response.data.message || "Failed to fetch tutors");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch tutors");
        toast.error("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [location.state]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredTutors = tutors.filter((tutor) => {
    // Subject filter
    if (
      filters.subject &&
      !tutor.style?.subjects?.some((sub) => 
        sub.name.toLowerCase().includes(filters.subject.toLowerCase())
      )
    ) {
      return false;
    }

    // Level filter (from navbar)
    if (filterLevel && 
        !tutor.style?.subjects?.some((sub) => 
          sub.level === filterLevel
        )) {
      return false;
    }

    // Availability filter
    if (filters.availability.morning || 
        filters.availability.afternoon || 
        filters.availability.evening) {
      const availability = tutor.availability?.generalAvailability;
      if (!availability) return false;

      const morningAvailable = availability.weekdays.start <= "12:00" || 
                              availability.weekends.start <= "12:00";
      const afternoonAvailable = (availability.weekdays.start <= "15:00" && 
                                availability.weekdays.end >= "15:00") ||
                               (availability.weekends.start <= "15:00" && 
                                availability.weekends.end >= "15:00");
      const eveningAvailable = availability.weekdays.end >= "18:00" || 
                              availability.weekends.end >= "18:00";

      if (filters.availability.morning && !morningAvailable) return false;
      if (filters.availability.afternoon && !afternoonAvailable) return false;
      if (filters.availability.evening && !eveningAvailable) return false;
    }

    return true;
  });

  // Get current tutors for pagination
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredTutors.length / tutorsPerPage))
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const clearFilters = () => {
    setFilterLevel(null);
    setFilters({
      subject: "",
      availability: {
        morning: false,
        afternoon: false,
        evening: false,
      },
    });
    navigate("/tutors"); // This will trigger a fresh fetch
  };

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
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
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
    <div className="container mx-auto px-4 py-8">
      {/* Filter Header */}
      <div className="mb-8">
        {filterLevel ? (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Showing {filteredTutors.length} {filteredTutors.length === 1 ? 'tutor' : 'tutors'} for {filterLevel} level
            </h2>
            <button 
              onClick={clearFilters}
              className="text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <h2 className="text-2xl font-bold mb-6">
            {filteredTutors.length} {filteredTutors.length === 1 ? 'Tutor' : 'Tutors'} Available
          </h2>
        )}
      </div>

      {/* Tutor Card with Filters */}
      <TutorCard 
        onFilterChange={handleFilterChange} 
        currentFilters={filters} 
        currentLevel={filterLevel}
      />

      {/* Tutors Grid */}
      {filteredTutors.length > 0 ? (
        <>
          <TutorsGrid tutors={currentTutors} />
          <Pagination
            tutorsPerPage={tutorsPerPage}
            totalTutors={filteredTutors.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No tutors match your filters</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Tutors;