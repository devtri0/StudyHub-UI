import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProfileTab1 from "./ProfileTab1";

const ProfileManage = ({ tutorData, setTutorData, tutorId, token }) => {
  // Main form state 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    education: [""],
    specialization: [""],
    languages: [""],
    experience: [""],
    location: {
      type: "Point",
      gpsAddress: ["", ""],
      address: "",
      city: "",
      region: "",
    },
  });

  // Temporary states for array fields
  const [tempEducation, setTempEducation] = useState("");
  const [tempSpecialization, setTempSpecialization] = useState("");
  const [tempLanguage, setTempLanguage] = useState("");
  const [tempExperience, setTempExperience] = useState("");

  // UI state
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  useEffect(() => {
    if (tutorData?.profile) {
      const { profile } = tutorData;
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        photo: profile.photo || profile.image || "",
        bio: profile.bio || "",
        education: profile.education || [""],
        specialization: profile.specialization || [""],
        languages: profile.languages || [""],
        experience: profile.experience || [""],
        location: profile.location || {
          type: "Point",
          gpsAddress: ["", ""],
          address: "",
          city: "",
          region: "",
        },
      });
      setPreviewImage(profile.photo || profile.image || "");
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

  // Handle adding items to array fields with validation
  const handleAddToArray = (field, value, setter) => {
    if (!value.trim()) {
      toast.error("Please enter a value before adding");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    setter("");
  };

  // Handle removing items from array fields
  const handleRemoveFromArray = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);

    if (newArray.length === 0) {
      newArray.push("");
    }
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };


  const handleProfileSubmit = async () => {
    setIsSubmitting(true);

    try {
      
      const userUpdateData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        photo: formData.photo,
      };

      const cleanArray = (arr) => arr.filter((item) => item.trim() !== "");

      const tutorUpdateData = {
        bio: formData.bio.trim(),
        education: cleanArray(formData.education),
        specialization: cleanArray(formData.specialization),
        languages: cleanArray(formData.languages),
        experience: cleanArray(formData.experience),
        location: {
          type: "Point",
          gpsAddress: formData.location.gpsAddress.map((coord) =>
            coord.toString()
          ),
          address: formData.location.address,
          city: formData.location.city,
          region: formData.location.region,
        },
      };

      if (!userUpdateData.firstName || !userUpdateData.lastName) {
        throw new Error("First name and last name are required");
      }

      if (
        tutorUpdateData.education.length === 0 ||
        tutorUpdateData.specialization.length === 0 ||
        tutorUpdateData.languages.length === 0 ||
        tutorUpdateData.experience.length === 0
      ) {
        throw new Error("All array fields must have at least one valid entry");
      }

      // First PATCH request to update user profile
      const userResponse = await axios.patch(
        "https://studyhub-api-p0q4.onrender.com/update/profile",
        userUpdateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Second PATCH request to update tutor profile
      const tutorResponse = await axios.patch(
        `https://studyhub-api-p0q4.onrender.com/tutor/profile/${tutorId}`,
        tutorUpdateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update local state with responses - with proper checks
      setTutorData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          firstName: userResponse.data?.firstName || formData.firstName,
          lastName: userResponse.data?.lastName || formData.lastName,
          phone: userResponse.data?.phone || formData.phone,
          photo: userResponse.data?.photo || formData.photo,
          bio: tutorResponse.data?.bio || formData.bio,
          education: tutorResponse.data?.education || formData.education,
          specialization:
            tutorResponse.data?.specialization || formData.specialization,
          languages: tutorResponse.data?.languages || formData.languages,
          experience: tutorResponse.data?.experience || formData.experience,
          location: tutorResponse.data?.location || formData.location,
        },
      }));

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tab Content */}
        <div className="p-6 space-y-6">
          <ProfileTab1
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
            handleAddToArray={handleAddToArray}
            handleRemoveFromArray={handleRemoveFromArray}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleProfileSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition font-medium flex items-center disabled:opacity-75"
          >
            {isSubmitting ? (
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

export default ProfileManage;
