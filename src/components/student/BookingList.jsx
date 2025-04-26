import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiBook, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiXCircle, 
  FiLoader,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiInfo
} from 'react-icons/fi';

const BookingCard = ({ booking }) => {
  const bookingDate = new Date(booking.date);
  const isPastBooking = bookingDate < new Date() && booking.status !== 'completed';
  const isToday = bookingDate.toDateString() === new Date().toDateString();

  const statusConfig = {
    pending: {
      icon: <FiLoader className="mr-1" />,
      color: 'bg-yellow-100 text-yellow-800',
    },
    confirmed: {
      icon: <FiCheckCircle className="mr-1" />,
      color: 'bg-green-100 text-green-800',
    },
    rejected: {
      icon: <FiXCircle className="mr-1" />,
      color: 'bg-red-100 text-red-800',
    },
    completed: {
      icon: <FiCheckCircle className="mr-1" />,
      color: 'bg-blue-100 text-blue-800',
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 ${
      isPastBooking ? 'opacity-75 border-l-4 border-gray-300' : ''
    } ${isToday ? 'border-l-4 border-blue-500' : ''}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <img 
              src={booking.tutor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.tutor?.firstName+' '+booking.tutor?.lastName)}`} 
              alt={`${booking.tutor?.firstName} ${booking.tutor?.lastName}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="ml-3">
              <h3 className="font-bold text-gray-800">{booking.subject}</h3>
              <p className="text-sm text-gray-600">
                With {booking.tutor?.firstName} {booking.tutor?.lastName}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            statusConfig[booking.status]?.color || 'bg-gray-100 text-gray-800'
          }`}>
            {statusConfig[booking.status]?.icon}
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center text-sm text-gray-700">
            <FiCalendar className="mr-2 text-blue-500" />
            <span>{bookingDate.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FiClock className="mr-2 text-blue-500" />
            <span>{booking.timeSlot.start} - {booking.timeSlot.end}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <FiMail className="mr-2 text-blue-500" />
            <span>{booking.tutor?.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <FiPhone className="mr-2 text-blue-500" />
            <span>{booking.tutor?.phone}</span>
          </div>
          
          {booking.meetingDetails?.link && (
            <div className="mt-2">
              <a
                href={booking.meetingDetails.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-1 px-3 rounded"
              >
                <FiExternalLink className="mr-1" />
                Join {booking.meetingDetails.platform || 'Meeting'}
              </a>
              {booking.meetingDetails?.instructions && (
                <p className="text-xs text-gray-500 mt-1">
                  <FiInfo className="inline mr-1" />
                  {booking.meetingDetails.instructions}
                </p>
              )}
            </div>
          )}
        </div>

        {isPastBooking && booking.status !== 'completed' && (
          <div className="mt-2 flex items-center text-xs text-red-500">
            <FiAlertCircle className="mr-1" />
            This session has passed but wasn't marked as completed
          </div>
        )}
      </div>
    </div>
  );
};

const BookingSection = ({ title, bookings, color }) => {
  if (bookings.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-3 pb-2 border-b-2 ${color}`}>
        {title} <span className="text-gray-500">({bookings.length})</span>
      </h3>
      <div className="space-y-3">
        {bookings.map(booking => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const BookingList = () => {
  const [bookings, setBookings] = useState({
    upcoming: [],
    completed: [],
    pending: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          throw new Error('Please login to view your bookings');
        }

        const user = JSON.parse(userData);
        if (!user?._id) {
          throw new Error('Invalid user session');
        }

        const response = await axios.get(
          `https://studyhub-api-p0q4.onrender.com/bookings/student/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          }
        );
        
        if (response.data?.success && response.data.data) {
          setBookings(response.data.data);
        } else {
          throw new Error('Could not load booking data');
        }
      } catch (err) {
        console.error('Booking fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load bookings');
        
        if (err.response?.status === 401) {
          localStorage.clear();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-red-50 border-l-4 border-red-500 rounded">
        <div className="flex items-center mb-2">
          <FiAlertCircle className="text-red-500 mr-2" />
          <h3 className="text-red-800 font-medium">Error loading bookings</h3>
        </div>
        <p className="text-red-700 mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const allBookings = [
    ...bookings.upcoming,
    ...bookings.completed,
    ...bookings.pending,
    ...bookings.rejected
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      <BookingSection
        title="Upcoming Sessions"
        bookings={bookings.upcoming}
        color="border-blue-500"
      />

      <BookingSection
        title="Pending Approval"
        bookings={bookings.pending}
        color="border-yellow-500"
      />

      <BookingSection
        title="Completed Sessions"
        bookings={bookings.completed}
        color="border-green-500"
      />

      <BookingSection
        title="Rejected Sessions"
        bookings={bookings.rejected}
        color="border-red-500"
      />

      {allBookings.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FiBook className="mx-auto text-4xl text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No bookings yet</h3>
          <p className="text-gray-500 mt-1">Book your first session to get started!</p>
        </div>
      )}
    </div>
  );
};

export default BookingList;