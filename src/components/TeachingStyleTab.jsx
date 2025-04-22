import React from "react";

const TeachingStyleTab = ({
  formData,
  handleChange,
  tempSubject,
  handleSubjectChange,
  handleAddSubject,
  handleRemoveSubject
}) => {
  return (
    <div className="space-y-8">
      {/* Teaching Style Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Teaching Approach
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Style *
          </label>
          <select
            name="teachingStyle.style"
            value={formData.teachingStyle.style}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your teaching style</option>
            <option value="Student-Centered">Student-Centered</option>
            <option value="Interactive Methods">Interactive Methods</option>
            <option value="Engaging Methods">Engaging Methods</option>
            <option value="Personalized Approaches">Personalized Approaches</option>
            <option value="Knowledge Empowerment">Knowledge Empowerment</option>
            <option value="Visual Learning">Visual Learning</option>
            <option value="Hands-on Practice">Hands-on Practice</option>
            <option value="Discussion Based">Discussion Based</option>
            <option value="Problem Solving">Problem Solving</option>
            <option value="Lecture Style">Lecture Style</option>
            <option value="Game Based">Game Based</option>
          </select>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Subjects You Teach
        </h3>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                name="name"
                value={tempSubject.name}
                onChange={handleSubjectChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="ICT">ICT</option>
                <option value="Integrated Science">Integrated Science</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Economics">Economics</option>
                <option value="Accounting">Accounting</option>
                <option value="Business">Business</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Government">Government</option>
                <option value="French">French</option>
                <option value="Ga">Ga</option>
                <option value="Twi">Twi</option>
                <option value="Ewe">Ewe</option>
                <option value="Fante">Fante</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                name="level"
                value={tempSubject.level}
                onChange={handleSubjectChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="JHS">JHS</option>
                <option value="SHS">SHS</option>
                <option value="Tertiary">Tertiary</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddSubject}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Subject
              </button>
            </div>
          </div>
        </div>

        {formData.teachingStyle.subjects.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-md font-medium text-gray-700">Your Subjects</h4>
            {formData.teachingStyle.subjects.map((subject, index) => (
              <div key={`${subject.name}-${subject.level}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className="text-xs text-gray-500 ml-2 bg-blue-100 px-2 py-1 rounded-full">{subject.level}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachingStyleTab;