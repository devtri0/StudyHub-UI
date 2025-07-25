import React from 'react';
import { FiDollarSign, FiCreditCard, FiBarChart2, FiCalendar } from 'react-icons/fi';

const EarningsDashboard = ({ earnings }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiDollarSign className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-bold">${earnings?.total || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiCalendar className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Completed Sessions</p>
              <h3 className="text-2xl font-bold">{earnings?.completedSessions || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FiCreditCard className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Available for Withdrawal</p>
              <h3 className="text-2xl font-bold">${earnings?.pendingWithdrawal || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FiBarChart2 className="mr-2" /> Earnings History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {earnings?.history?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Request Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;