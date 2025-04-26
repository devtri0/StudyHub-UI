import React, { useState } from 'react';
import { FiX, FiClock } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingModal = ({ tutor, onClose, currentUser }) => {
  const [formData, setFormData] = useState({
    subject: tutor.subjects?.[0]?.name || '',
    date: new Date(),
    startTime: '',
    endTime: '',
    platform: 'Google Meet',
    instructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        tutor: tutor._id,
        student: currentUser._id,
        subject: formData.subject,
        date: formData.date,
        timeSlot: {
          start: formData.startTime,
          end: formData.endTime
        },
        meetingDetails: {
          platform: formData.platform,
          instructions: formData.instructions
        }
      };

      const response = await axios.post(
        'https://studyhub-api-p0q4.onrender.com/bookings',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        onClose(true);
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Book Session with {tutor.firstName} {tutor.lastName}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {tutor.subjects?.map((subject, index) => (
                <option key={index} value={subject.name}>
                  {subject.name} ({subject.level})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Time Slot */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time, index) => (
                    <option key={`start-${index}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time, index) => (
                    <option key={`end-${index}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special requirements..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;