import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiPlus, FiBook } from 'react-icons/fi';

const GroupTeachingPanel = ({ groups, tutorId, onGroupCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    maxMembers: 10,
    schedule: ''
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    const createdGroup = {
      id: Math.max(...groups.map(g => g.id), 0) + 1,
      ...newGroup,
      members: 1,
      nextSession: newGroup.schedule,
      image: `https://source.unsplash.com/random/300x200/?${newGroup.subject}`
    };
    
    onGroupCreated(createdGroup);
    setShowCreateForm(false);
    setNewGroup({
      name: '',
      subject: '',
      maxMembers: 10,
      schedule: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Study Groups</h2>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" /> Create Group
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4">Create New Study Group</h3>
          <form onSubmit={handleCreateGroup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Members</label>
                <select
                  value={newGroup.maxMembers}
                  onChange={(e) => setNewGroup({...newGroup, maxMembers: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[5, 10, 15, 20].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({...newGroup, schedule: e.target.value})}
                  placeholder="e.g. Every Tuesday at 6 PM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map(group => (
            <div key={group.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              <div className="h-40 bg-gray-200 relative">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://source.unsplash.com/random/300x200/?education';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{group.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <FiBook className="mr-1" /> {group.subject}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiUsers className="mr-2" />
                  <span>{group.members} members</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiCalendar className="mr-2" />
                  <span>Next: {group.nextSession}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                    Manage
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded text-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">You haven't created any study groups yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupTeachingPanel;