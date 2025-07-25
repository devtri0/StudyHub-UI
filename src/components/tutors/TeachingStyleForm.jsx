import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TeachingStyleForm = ({ tutorData, tutorId, token, setTutorData }) => {
  const [formData, setFormData] = useState({
    teachingStyle: "",
    subjects: []
  });
  const [newSubject, setNewSubject] = useState({
    name: "",
    level: "SHS"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (tutorData) {
      setFormData({
        teachingStyle: tutorData.teachingStyle || "",
        subjects: tutorData.subjects || []
      });
    }
  }, [tutorData]);

  const teachingStyles = [
    "Student-Centered",
    "Interactive Methods",
    "Engaging Methods",
    "Personalized Approaches",
    "Knowledge Empowerment",
    "Visual Learning",
    "Hands-on Practice",
    "Discussion Based",
    "Problem Solving",
    "Lecture Style",
    "Game Based"
  ];

  const subjectOptions = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "ICT",
    "Integrated Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Accounting",
    "Business",
    "Geography",
    "History",
    "Government",
    "French",
    "Ga",
    "Twi",
    "Ewe",
    "Fante",
    "Other"
  ];

  const levelOptions = ["JHS", "SHS", "Tertiary"];

  const handleTeachingStyleChange = (e) => {
    setFormData(prev => ({ ...prev, teachingStyle: e.target.value }));
  };

  const handleNewSubjectChange = (e) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: value }));
  };

  const addSubject = () => {
    if (newSubject.name && !formData.subjects.some(s => s.name === newSubject.name)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, { ...newSubject }]
      }));
      setNewSubject({ name: "", level: "SHS" });
    }
  };

  const removeSubject = (subjectName) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.name !== subjectName)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `https://studyhub-api-p0q4.onrender.com/tutor/style/${tutorId}`,
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
        ...response.data
      });

      toast.success("Teaching profile updated successfully!");
    } catch (error) {
      console.error("Error updating teaching style:", error);
      toast.error(error.response?.data?.message || "Failed to update teaching profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Update Teaching Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teaching Style
          </label>
          <select
            value={formData.teachingStyle}
            onChange={handleTeachingStyleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select your teaching style</option>
            {teachingStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjects You Teach
          </label>
          
          {formData.subjects.length > 0 && (
            <div className="mb-4 space-y-2">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{subject.name}</span> 
                    <span className="ml-2 text-sm text-gray-500">({subject.level})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubject(subject.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <select
                name="name"
                value={newSubject.name}
                onChange={handleNewSubjectChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select subject</option>
                {subjectOptions.map(subject => (
                  <option key={subject} value={subject} disabled={formData.subjects.some(s => s.name === subject)}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <select
                name="level"
                value={newSubject.level}
                onChange={handleNewSubjectChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {levelOptions.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <button
              type="button"
              onClick={addSubject}
              disabled={!newSubject.name}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Subject
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={isSubmitting || !formData.teachingStyle || formData.subjects.length === 0}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition ${
            isSubmitting || !formData.teachingStyle || formData.subjects.length === 0 ? "opacity-75 cursor-not-allowed" : ""
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
            "Save Teaching Profile"
          )}
        </button>
      </div>
    </form>
  );
};

export default TeachingStyleForm;