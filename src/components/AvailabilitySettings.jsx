import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AvailabilitySettings = ({ tutorData, tutorId, token, setTutorData }) => {
  
  const defaultFormData = {
    generalAvailability: {
      weekdays: { start: "09:00", end: "17:00" },
      weekends: { start: "10:00", end: "15:00" },
      notes: ""
    },
    specificSlots: []
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (tutorData?.availability) {
      setFormData({
        generalAvailability: {
          ...defaultFormData.generalAvailability,
          ...tutorData.availability.generalAvailability
        },
        specificSlots: tutorData.availability.specificSlots || []
      });
    }
  }, [tutorData]);

  const handleGeneralAvailabilityChange = (dayType, field, value) => {
    setFormData(prev => ({
      ...prev,
      generalAvailability: {
        ...prev.generalAvailability,
        [dayType]: {
          ...prev.generalAvailability[dayType],
          [field]: value
        }
      }
    }));
  };

  const handleNotesChange = (e) => {
    setFormData(prev => ({
      ...prev,
      generalAvailability: {
        ...prev.generalAvailability,
        notes: e.target.value
      }
    }));
  };

  const addSpecificSlot = () => {
    setFormData(prev => ({
      ...prev,
      specificSlots: [
        ...prev.specificSlots,
        {
          day: "Mon",
          date: new Date().getDate(),
          slots: [{ start: "10:00", end: "12:00" }]
        }
      ]
    }));
  };

  const updateSpecificSlot = (index, field, value) => {
    const updatedSlots = [...formData.specificSlots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setFormData(prev => ({ ...prev, specificSlots: updatedSlots }));
  };

  const addSlotToSpecificDay = (index) => {
    const updatedSlots = [...formData.specificSlots];
    updatedSlots[index].slots = [
      ...updatedSlots[index].slots,
      { start: "10:00", end: "12:00" }
    ];
    setFormData(prev => ({ ...prev, specificSlots: updatedSlots }));
  };

  const updateSlotTime = (dayIndex, slotIndex, field, value) => {
    const updatedSlots = [...formData.specificSlots];
    updatedSlots[dayIndex].slots[slotIndex] = {
      ...updatedSlots[dayIndex].slots[slotIndex],
      [field]: value
    };
    setFormData(prev => ({ ...prev, specificSlots: updatedSlots }));
  };

  const removeSpecificSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      specificSlots: prev.specificSlots.filter((_, i) => i !== index)
    }));
  };

  const removeSlotFromDay = (dayIndex, slotIndex) => {
    const updatedSlots = [...formData.specificSlots];
    updatedSlots[dayIndex].slots = updatedSlots[dayIndex].slots.filter((_, i) => i !== slotIndex);
    setFormData(prev => ({ ...prev, specificSlots: updatedSlots }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `https://studyhub-api-p0q4.onrender.com/tutor/ava/${tutorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTutorData({
        ...tutorData,
        availability: response.data
      });

      toast.success("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error(error.response?.data?.message || "Failed to update availability");
    } finally {
      setIsSubmitting(false);
    }
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Availability Settings</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">General Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-3">Weekdays (Mon-Fri)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.generalAvailability.weekdays.start}
                  onChange={(e) => handleGeneralAvailabilityChange("weekdays", "start", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.generalAvailability.weekdays.end}
                  onChange={(e) => handleGeneralAvailabilityChange("weekdays", "end", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-3">Weekends (Sat-Sun)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.generalAvailability.weekends.start}
                  onChange={(e) => handleGeneralAvailabilityChange("weekends", "start", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.generalAvailability.weekends.end}
                  onChange={(e) => handleGeneralAvailabilityChange("weekends", "end", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            value={formData.generalAvailability.notes || ""}
            onChange={handleNotesChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Any special notes about your availability..."
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Specific Date Exceptions</h3>
          <button
            type="button"
            onClick={addSpecificSlot}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200"
          >
            Add Exception
          </button>
        </div>

        {formData.specificSlots.length > 0 ? (
          <div className="space-y-4">
            {formData.specificSlots.map((daySlot, dayIndex) => (
              <div key={dayIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Day</label>
                    <select
                      value={daySlot.day}
                      onChange={(e) => updateSpecificSlot(dayIndex, "day", e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Date (1-31)</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={daySlot.date}
                      onChange={(e) => updateSpecificSlot(dayIndex, "date", parseInt(e.target.value))}
                      className="p-2 border border-gray-300 rounded-md w-16"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSpecificSlot(dayIndex)}
                    className="text-red-500 hover:text-red-700 self-end"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-3">
                  {daySlot.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Start</label>
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateSlotTime(dayIndex, slotIndex, "start", e.target.value)}
                          className="p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">End</label>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateSlotTime(dayIndex, slotIndex, "end", e.target.value)}
                          className="p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      {daySlot.slots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSlotFromDay(dayIndex, slotIndex)}
                          className="text-red-500 hover:text-red-700 self-end"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addSlotToSpecificDay(dayIndex)}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add another time slot
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No specific date exceptions added yet.</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default AvailabilitySettings;