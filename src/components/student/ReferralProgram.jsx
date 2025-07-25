// src/components/student/ReferralProgram.jsx
import React from "react";
import { FiShare2, FiCopy } from "react-icons/fi";

const ReferralProgram = ({ user }) => {
  const referralLink = `https://studyhub.com/signup?ref=${user._id}`;
  
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
          Invite friends to join StudyHub and earn rewards for each successful referral!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
          <p className="text-gray-700">Friends Referred</p>
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
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <p>Share your unique referral link with friends</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <p>Your friend signs up using your link</p>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <p>You both earn 100 points when they book their first session</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReferralProgram;