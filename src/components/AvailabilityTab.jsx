import React from "react";

const AvailabilityTab = ({
  formData,
  handleChange,
  tempSlot,
  handleSlotChange,
  handleAddSlot,
  handleRemoveSlot
}) => {
  return (
    <div className="space-y-8">
      {/* General Availability Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          General Availability
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-700 mb-3">Weekdays</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  name="availability.generalAvailability.weekdays.start"
                  value={formData.availability.generalAvailability.weekdays.start}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  name="availability.generalAvailability.weekdays.end"
                  value={formData.availability.generalAvailability.weekdays.end}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-700 mb-3">Weekends</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  name="availability.generalAvailability.weekends.start"
                  value={formData.availability.generalAvailability.weekends.start}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  name="availability.generalAvailability.weekends.end"
                  value={formData.availability.generalAvailability.weekends.end}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability Notes
          </label>
          <textarea
            name="availability.generalAvailability.notes"
            value={formData.availability.generalAvailability.notes || ""}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special notes about your availability..."
            maxLength="500"
          />
        </div>
      </div>

      {/* Specific Time Slots Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Specific Time Slots
        </h3>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select
                name="day"
                value={tempSlot.day}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date (optional)</label>
              <input
                type="number"
                name="date"
                min="1"
                max="31"
                value={tempSlot.date}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Day of month"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="start"
                value={tempSlot.start}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="end"
                value={tempSlot.end}
                onChange={handleSlotChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddSlot}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Time Slot
          </button>
        </div>

        {formData.availability.specificSlots.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="text-md font-medium text-gray-700">Your Specific Slots</h4>
            {formData.availability.specificSlots.map((daySlot, dayIndex) => (
              <div key={`${daySlot.day}-${daySlot.date || 'general'}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="font-medium mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {daySlot.day} {daySlot.date ? `(Date: ${daySlot.date})` : ''}
                </div>
                <div className="space-y-2">
                  {daySlot.slots.map((slot, slotIndex) => (
                    <div key={`${slot.start}-${slot.end}`} className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-sm">
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityTab;