// components/Pagination.js
import React from "react";

const Pagination = ({
  tutorsPerPage,
  totalTutors,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTutors / tutorsPerPage);

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Logic to determine which page numbers to show (for many pages)
  const getVisiblePageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }

    // Always show first, last, current, and one page on each side of current if possible
    const visiblePages = new Set();
    visiblePages.add(1);
    visiblePages.add(totalPages);
    visiblePages.add(currentPage);

    if (currentPage > 1) visiblePages.add(currentPage - 1);
    if (currentPage < totalPages) visiblePages.add(currentPage + 1);

    return [...visiblePages].sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePageNumbers();

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only 1 page
  }

  return (
    <div className="flex justify-center mt-8 mb-12">
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {visiblePages.map((number, index) => {
          // Add ellipsis if there's a gap
          if (index > 0 && number > visiblePages[index - 1] + 1) {
            return (
              <React.Fragment key={`ellipsis-${index}`}>
                <span className="px-3 py-2 text-gray-500">...</span>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {number}
                </button>
              </React.Fragment>
            );
          }

          return (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-2 rounded-md ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {number}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
