import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProfileTab from "./ProfileTab";
import AvailabilityTab from "./AvailabilityTab";
import TeachingStyleTab from "./TeachingStyleTab";
import { handleImageUpload } from "./ProfileManagementUtils";
import { useNavigate } from "react-router-dom";

const ProfileManagement = ({ tutorData, setTutorData }) => {
  const navigate = useNavigate();
  // Main form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    education: [],
    specialization: [],
    languages: [],
    experience: [],
    location: {
      type: "Point",
      gpsAddress: ["", ""],
      address: "",
      city: "",
      region: "",
    },
    availability: {
      generalAvailability: {
        weekdays: { start: "09:00", end: "17:00" },
        weekends: { start: "10:00", end: "15:00" },
        notes: "",
      },
      specificSlots: [],
    },
    teachingStyle: {
      style: "",
      subjects: [],
    },
  });

  // Temporary states for array fields
  const [tempEducation, setTempEducation] = useState("");
  const [tempSpecialization, setTempSpecialization] = useState("");
  const [tempLanguage, setTempLanguage] = useState("");
  const [tempExperience, setTempExperience] = useState("");
  const [tempSubject, setTempSubject] = useState({ name: "", level: "SHS" });
  const [tempSlot, setTempSlot] = useState({
    day: "Mon",
    date: "",
    start: "",
    end: "",
  });

  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState({
    profile: false,
    availability: false,
    teachingStyle: false,
  });


  // Initialize form data
  useEffect(() => {
    if (tutorData?.profile) {
      setFormData((prev) => ({
        ...prev,
        firstName: tutorData.profile.firstName || "",
        lastName: tutorData.profile.lastName || "",
        email: tutorData.profile.email || "",
        phone: tutorData.profile.phone || "",
        photo: tutorData.profile.image || "",
        bio: tutorData.profile.bio || "",
        education: Array.isArray(tutorData.profile.education)
          ? tutorData.profile.education
          : [tutorData.profile.education].filter(Boolean),
        specialization: tutorData.profile.specialization || [],
        languages: tutorData.profile.languages || [],
        experience: Array.isArray(tutorData.profile.experience)
          ? tutorData.profile.experience
          : [tutorData.profile.experience].filter(Boolean),
        location: tutorData.profile.location || prev.location,
        availability: tutorData.profile.availability || prev.availability,
        teachingStyle: {
          style: tutorData.profile.teachingStyle?.approach || "",
          subjects: tutorData.profile.teachingStyle?.subjects || [],
        },
      }));
      setPreviewImage(tutorData.profile.image || "");
    }
  }, [tutorData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else if (name.includes("availability.")) {
      const path = name.split(".");
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [path[1]]:
            path.length > 3
              ? {
                  ...prev.availability[path[1]],
                  [path[2]]: {
                    ...prev.availability[path[1]][path[2]],
                    [path[3]]: value,
                  },
                }
              : {
                  ...prev.availability[path[1]],
                  [path[2]]: value,
                },
        },
      }));
    } else if (name.includes("teachingStyle.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        teachingStyle: {
          ...prev.teachingStyle,
          [field]: value,
        },
      }));
    } else if (name === "gpsLat" || name === "gpsLng") {
      const newGps = [...formData.location.gpsAddress];
      if (name === "gpsLat") newGps[0] = value;
      if (name === "gpsLng") newGps[1] = value;

      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          gpsAddress: newGps,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle subject changes
  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setTempSubject((prev) => ({ ...prev, [name]: value }));
  };

  // Add subject to form data
  const handleAddSubject = () => {
    if (tempSubject.name) {
      setFormData((prev) => ({
        ...prev,
        teachingStyle: {
          ...prev.teachingStyle,
          subjects: [...prev.teachingStyle.subjects, tempSubject],
        },
      }));
      setTempSubject({ name: "", level: "SHS" });
    }
  };

  // Remove subject from form data
  const handleRemoveSubject = (index) => {
    setFormData((prev) => ({
      ...prev,
      teachingStyle: {
        ...prev.teachingStyle,
        subjects: prev.teachingStyle.subjects.filter((_, i) => i !== index),
      },
    }));
  };

  // Handle slot changes
  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setTempSlot((prev) => ({ ...prev, [name]: value }));
  };

  // Add time slot to form data
  const handleAddSlot = () => {
    if (tempSlot.start && tempSlot.end) {
      const newSlot = {
        start: tempSlot.start,
        end: tempSlot.end,
      };

      const dayIndex = formData.availability.specificSlots.findIndex(
        (slot) =>
          slot.day === tempSlot.day &&
          (!tempSlot.date || slot.date === tempSlot.date)
      );

      if (dayIndex >= 0) {
        const updatedSlots = [...formData.availability.specificSlots];
        updatedSlots[dayIndex].slots.push(newSlot);
        setFormData((prev) => ({
          ...prev,
          availability: {
            ...prev.availability,
            specificSlots: updatedSlots,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          availability: {
            ...prev.availability,
            specificSlots: [
              ...prev.availability.specificSlots,
              {
                day: tempSlot.day,
                date: tempSlot.date || undefined,
                slots: [newSlot],
              },
            ],
          },
        }));
      }

      setTempSlot({ day: "Mon", date: "", start: "", end: "" });
    }
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const updatedSlots = [...formData.availability.specificSlots];
    updatedSlots[dayIndex].slots.splice(slotIndex, 1);

    if (updatedSlots[dayIndex].slots.length === 0) {
      updatedSlots.splice(dayIndex, 1);
    }

    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        specificSlots: updatedSlots,
      },
    }));
  };

// Profile submit handler
const handleProfileSubmit = async () => {
  setIsSubmitting(prev => ({ ...prev, profile: true }));
  const token = localStorage.getItem("token");

  try {
    const userProfileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      photo: formData.photo
    };

    const tutorProfileData = {
      bio: formData.bio,
      education: formData.education,
      specialization: formData.specialization,
      languages: formData.languages,
      experience: formData.experience,
      location: formData.location
    };

    const [userRes, tutorRes] = await Promise.all([
      axios.patch(
        "https://studyhub-api-p0q4.onrender.com/update/profile",
        userProfileData,
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      axios.post(
        "https://studyhub-api-p0q4.onrender.com/tutor/profile",
        tutorProfileData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ]);

    setTutorData?.(prev => ({
      ...prev,
      profile: {
        ...prev?.profile,
        firstName: userRes.user.firstName,
        lastName: userRes.user.lastName,
        phone: userRes.user.phone,
        image: userRes.user.photo,
        bio: tutorRes.bio,
        education: tutorRes.education,
        specialization: tutorRes.specialization,
        languages: tutorRes.languages,
        experience: tutorRes.experience,
        location: tutorRes.location
      }
    }));

    toast.success("Profile information saved successfully!");
  } catch (err) {
    console.error("Error updating profile:", err);
    toast.error(err.response?.data?.message || "Failed to update profile");
  } finally {
    setIsSubmitting(prev => ({ ...prev, profile: false }));
  }
};

// Availability submit handler
const handleAvailabilitySubmit = async () => {
  setIsSubmitting(prev => ({ ...prev, availability: true }));
  const token = localStorage.getItem("token");

  try {
    const availabilityData = formData.availability;
    const response = await axios.post(
      "https://studyhub-api-p0q4.onrender.com/tutor/ava",
      availabilityData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTutorData?.(prev => ({
      ...prev,
      profile: {
        ...prev?.profile,
        availability: response.data
      }
    }));

    toast.success("Availability saved successfully!");
  } catch (err) {
    console.error("Error updating availability:", err);
    toast.error(err.response?.data?.message || "Failed to update availability");
  } finally {
    setIsSubmitting(prev => ({ ...prev, availability: false }));
  }
};

// Teaching style submit handler
const handleTeachingStyleSubmit = async () => {
  setIsSubmitting(prev => ({ ...prev, teachingStyle: true }));
  const token = localStorage.getItem("token");

  try {
    const teachingStyleData = {
      teachingStyle: formData.teachingStyle.style,
      subjects: formData.teachingStyle.subjects
    };

    const response = await axios.post(
      "https://studyhub-api-p0q4.onrender.com/tutor/style",
      teachingStyleData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTutorData?.(prev => ({
      ...prev,
      profile: {
        ...prev?.profile,
        teachingStyle: {
          approach: response.data.teachingStyle,
          subjects: response.data.subjects
        }
      }
    }));

    toast.success("Teaching style saved successfully! Redirecting...");
    navigate("/tutordash"); 
    
  } catch (err) {
    console.error("Error updating teaching style:", err);
    toast.error(err.response?.data?.message || "Failed to update teaching style");
  } finally {
    setIsSubmitting(prev => ({ ...prev, teachingStyle: false }));
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with profile image */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center">
          <div className="relative mr-6">
            <img
              src={previewImage || "/default-profile.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(
                    e,
                    setIsUploading,
                    setFormData,
                    setPreviewImage,
                    toast
                  )
                }
                className="hidden"
              />
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {formData.firstName || "Your"} {formData.lastName || "Profile"}
            </h1>
            <p className="text-blue-100">Manage your tutor profile settings</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("availability")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === "availability"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Availability
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("teachingStyle")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === "teachingStyle"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              Teaching Style
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6">
          {activeTab === "profile" && (
            <ProfileTab
              formData={formData}
              handleChange={handleChange}
              tempEducation={tempEducation}
              setTempEducation={setTempEducation}
              tempSpecialization={tempSpecialization}
              setTempSpecialization={setTempSpecialization}
              tempLanguage={tempLanguage}
              setTempLanguage={setTempLanguage}
              tempExperience={tempExperience}
              setTempExperience={setTempExperience}
              handleAddToArray={(field, value, setter) => {
                if (value.trim()) {
                  setFormData((prev) => ({
                    ...prev,
                    [field]: [...prev[field], value.trim()],
                  }));
                  setter("");
                }
              }}
              handleRemoveFromArray={(field, index) => {
                setFormData((prev) => ({
                  ...prev,
                  [field]: prev[field].filter((_, i) => i !== index),
                }));
              }}
            />
          )}

          {activeTab === "availability" && (
            <AvailabilityTab
              formData={formData}
              handleChange={handleChange}
              tempSlot={tempSlot}
              handleSlotChange={handleSlotChange}
              handleAddSlot={handleAddSlot}
              handleRemoveSlot={handleRemoveSlot}
            />
          )}

          {activeTab === "teachingStyle" && (
            <TeachingStyleTab
              formData={formData}
              handleChange={handleChange}
              tempSubject={tempSubject}
              handleSubjectChange={handleSubjectChange}
              handleAddSubject={handleAddSubject}
              handleRemoveSubject={handleRemoveSubject}
            />
          )}
        </div>

        {/* Save Button for current tab */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => {
              if (activeTab === "profile") return handleProfileSubmit();
              if (activeTab === "availability")
                return handleAvailabilitySubmit();
              if (activeTab === "teachingStyle")
                return handleTeachingStyleSubmit();
            }}
            disabled={isSubmitting[activeTab]}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition font-medium flex items-center disabled:opacity-75"
          >
            {isSubmitting[activeTab] ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
