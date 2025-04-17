import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  return (
    <section id="availability" className="bg-white p-4 md:p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 font-serif">
        Set Your Availability
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Coming Soon: Calendar integration!
      </p>
      <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded p-4 md:p-6 text-center text-gray-400">
        <CalendarIcon size={40} className="mx-auto mb-4" />
        <p>Calendar View Placeholder</p>
      </div>
    </section>
  );
};

export default Calendar;
