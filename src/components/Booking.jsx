import React from "react";

const Booking = () => {
  return (
    <section id="bookings" className="bg-white p-4 md:p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 font-serif">
        Upcoming Bookings
      </h2>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="p-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="p-2 whitespace-nowrap text-sm">
                  April 18, 2025
                </td>
                <td className="p-2 whitespace-nowrap text-sm">10:00 AM</td>
                <td className="p-2 whitespace-nowrap text-sm">Linda Mensah</td>
                <td className="p-2 whitespace-nowrap text-sm">English</td>
              </tr>
              <tr>
                <td className="p-2 whitespace-nowrap text-sm">
                  April 19, 2025
                </td>
                <td className="p-2 whitespace-nowrap text-sm">2:00 PM</td>
                <td className="p-2 whitespace-nowrap text-sm">Peter Wilson</td>
                <td className="p-2 whitespace-nowrap text-sm">
                  Computer Science
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Booking;
