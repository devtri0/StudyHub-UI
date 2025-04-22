import React from "react";
import { Check, X, Clock as ClockIcon, Calendar as CalendarIcon } from "lucide-react";

const BookingManagement = ({ bookings, onBookingAction }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{booking.student}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <CalendarIcon className="mr-2" size={16} />
              {booking.date}
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <ClockIcon className="mr-2" size={16} />
              {booking.time}
            </div>
            <p className="text-sm text-gray-700 mb-4">Subject: {booking.subject}</p>
            
            <div className="flex space-x-2">
              {booking.status === 'pending' && (
                <>
                  <button 
                    onClick={() => onBookingAction(booking.id, 'confirmed')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm flex items-center justify-center"
                  >
                    <Check className="mr-1" size={16} /> Confirm
                  </button>
                  <button 
                    onClick={() => onBookingAction(booking.id, 'cancelled')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm flex items-center justify-center"
                  >
                    <X className="mr-1" size={16} /> Decline
                  </button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <button 
                  onClick={() => onBookingAction(booking.id, 'cancelled')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm flex items-center justify-center"
                >
                  <X className="mr-1" size={16} /> Cancel
                </button>
              )}
              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-1 px-3 rounded text-sm">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement