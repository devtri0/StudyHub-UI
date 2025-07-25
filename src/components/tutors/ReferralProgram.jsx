import React from 'react';
import { FiShare2, FiCopy, FiUsers, FiAward } from 'react-icons/fi';

const ReferralProgram = ({ user, tutorId }) => {
  const referralLink = `https://studyhub.com/signup?ref=${tutorId}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiShare2 className="text-yellow-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Refer & Earn</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Invite students to join StudyHub and earn rewards for each successful referral!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
          <p className="text-gray-700">Students Referred</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">500</div>
          <p className="text-gray-700">Points Earned</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
          <p className="text-gray-700">Rewards Unlocked</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Referral Link</h3>
        <div className="flex">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md flex items-center"
          >
            <FiCopy className="mr-2" />
            Copy
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Share Via</h3>
        <div className="flex space-x-3">
          <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>
          <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
          <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </button>
          <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <p>Share your unique referral link with students</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <p>Student signs up using your link and books a session</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <p>You earn 100 points when they complete their first session</p>
          </li>
        </ul>
      </div>
      
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <FiAward className="text-yellow-500 mr-2" /> Current Rewards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-yellow-200 bg-white rounded-lg p-3">
            <h4 className="font-medium mb-1">3 Referrals</h4>
            <p className="text-sm text-gray-600">$10 credit</p>
          </div>
          <div className="border border-yellow-200 bg-white rounded-lg p-3">
            <h4 className="font-medium mb-1">5 Referrals</h4>
            <p className="text-sm text-gray-600">Featured tutor spot</p>
          </div>
          <div className="border border-yellow-200 bg-white rounded-lg p-3">
            <h4 className="font-medium mb-1">10 Referrals</h4>
            <p className="text-sm text-gray-600">$50 credit</p>
          </div>
          <div className="border border-yellow-200 bg-white rounded-lg p-3">
            <h4 className="font-medium mb-1">20 Referrals</h4>
            <p className="text-sm text-gray-600">Premium tutor badge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;