import React, { useState, useEffect, useCallback } from 'react';
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
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiInfo
} from 'react-icons/fi';

const StatusBadge = ({ status }) => {
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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
      {statusConfig[status]?.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const BookingCard = React.memo(({ booking }) => {
  const [expanded, setExpanded] = useState(false);
  const bookingDate = new Date(booking.date);
  const isPastBooking = bookingDate < new Date() && booking.status !== 'completed';
  const isToday = bookingDate.toDateString() === new Date().toDateString();

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg ${
      isPastBooking ? 'opacity-75 border-l-4 border-gray-300' : ''
    } ${isToday ? 'border-l-4 border-blue-500' : ''}`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img 
              src={booking.tutor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.tutor?.firstName+' '+booking.tutor?.lastName)}`} 
              alt={`${booking.tutor?.firstName} ${booking.tutor?.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.tutor?.firstName+' '+booking.tutor?.lastName)}`;
              }}
            />
            <div className="ml-4">
              <h3 className="font-bold text-gray-800">{booking.subject}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <FiUser className="mr-1" />
                {booking.tutor?.firstName} {booking.tutor?.lastName}
              </p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-700">
            <FiCalendar className="mr-2 text-blue-500" />
            <span>{bookingDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiClock className="mr-2 text-blue-500" />
            <span>{booking.timeSlot.start} - {booking.timeSlot.end}</span>
          </div>
        </div>

        {booking.meetingDetails?.link && (
          <a
            href={booking.meetingDetails.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200 mb-3 flex items-center justify-center"
          >
            <FiExternalLink className="mr-2" />
            Join {booking.meetingDetails.platform || 'Meeting'}
          </a>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
        >
          {expanded ? (
            <>
              <FiChevronUp className="mr-1" />
              Show less details
            </>
          ) : (
            <>
              <FiChevronDown className="mr-1" />
              Show more details
            </>
          )}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <FiInfo className="mr-1" />
              Booking Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tutor Information</h5>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Email:</span> {booking.tutor?.email}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Phone:</span> {booking.tutor?.phone}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Verified:</span> {booking.tutor?.isVerified ? 'Yes' : 'No'}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Meeting Information</h5>
                {booking.meetingDetails?.instructions && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Instructions:</span> {booking.meetingDetails.instructions}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Created:</span> {new Date(booking.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Last Updated:</span> {new Date(booking.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {isPastBooking && booking.status !== 'completed' && (
          <div className="mt-3 flex items-center text-sm text-red-500">
            <FiAlertCircle className="mr-1" />
            This session has passed but wasn't marked as completed
          </div>
        )}
      </div>
    </div>
  );
});

const BookingSection = ({ title, bookings, icon, color }) => {
  if (bookings.length === 0) return null;

  return (
    <div className="mb-8">
      <div className={`flex items-center mb-4 pb-2 border-b-2 ${color.border}`}>
        {icon}
        <h3 className="text-xl font-semibold ml-2">
          {title} <span className="text-gray-500">({bookings.length})</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    pending: 0,
    completed: 0,
    rejected: 0
  });

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
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
        setStats({
          total: response.data.count,
          upcoming: response.data.data.upcoming.length,
          pending: response.data.data.pending.length,
          completed: response.data.data.completed.length,
          rejected: response.data.data.rejected.length
        });
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
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-700">Loading your bookings</h3>
        <p className="text-gray-500">Please wait while we fetch your schedule</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <FiAlertCircle className="text-red-500 text-2xl mr-2" />
            <h3 className="text-lg font-medium text-red-800">Unable to load bookings</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiLoader className="mr-2" />
              Try Again
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <FiUser className="mr-2" />
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Study Sessions</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full md:w-auto">
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">{stats.total}</div>
            <div className="text-xs">Total</div>
          </div>
          <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">{stats.upcoming}</div>
            <div className="text-xs">Upcoming</div>
          </div>
          <div className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">{stats.pending}</div>
            <div className="text-xs">Pending</div>
          </div>
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">{stats.rejected}</div>
            <div className="text-xs">Rejected</div>
          </div>
          <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">{stats.completed}</div>
            <div className="text-xs">Completed</div>
          </div>
        </div>
      </div>

      <BookingSection
        title="Upcoming Sessions"
        bookings={bookings.upcoming}
        icon={<FiCalendar className="text-2xl text-blue-500" />}
        color={{ border: 'border-blue-500' }}
      />

      <BookingSection
        title="Pending Approval"
        bookings={bookings.pending}
        icon={<FiLoader className="text-2xl text-yellow-500" />}
        color={{ border: 'border-yellow-500' }}
      />

      <BookingSection
        title="Completed Sessions"
        bookings={bookings.completed}
        icon={<FiCheckCircle className="text-2xl text-green-500" />}
        color={{ border: 'border-green-500' }}
      />

      <BookingSection
        title="Rejected Sessions"
        bookings={bookings.rejected}
        icon={<FiXCircle className="text-2xl text-red-500" />}
        color={{ border: 'border-red-500' }}
      />

      {stats.total === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <FiBook className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No bookings yet</h3>
          <p className="text-gray-400 mt-2">Schedule your first session with a tutor to get started!</p>
          <button
            onClick={() => window.location.href = '/find-tutor'}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find a Tutor
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingList;