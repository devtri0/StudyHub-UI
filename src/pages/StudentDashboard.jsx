import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import BookingModal from "../components/student/BookingModal";
import TutorsGrid from "../components/student/TutorGrid1";
import TutorInformation from "../components/student/TutorInformation";
import BookingList from "../components/student/BookingList";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiSettings,
  FiArrowLeft,
  FiUpload,
  FiCheck,
  FiX,
} from "react-icons/fi";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("tutors");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: "",
    createdAt: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
const [selectedTutorForBooking, setSelectedTutorForBooking] = useState(null);

const handleOpenBooking = (tutor) => {
  setSelectedTutorForBooking(tutor);
  setShowBookingModal(true);
};

{showBookingModal && (
    <BookingModal
      tutor={selectedTutorForBooking}
      onClose={(success) => {
        setShowBookingModal(false);
        if (success) {
          // Optionally refresh bookings list
          fetchBookings();
        }
      }}
      currentUser={currentUser}
    />
  )}

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://studyhub-api-p0q4.onrender.com/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Directly access the response data (no .data.data)
      const userData = response.data;

      if (!userData) {
        throw new Error("No user data received");
      }

      setCurrentUser({
        _id: userData._id || userData.id || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        photo:
          userData.photo ||
          `https://ui-avatars.com/api/?name=${
            userData.firstName?.charAt(0) || ""
          }${userData.lastName?.charAt(0) || ""}&background=random`,
        createdAt: userData.createdAt || new Date().toISOString(),
      });

      setEditData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response?.data?.message || "Failed to load user data");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTutors = async () => {
    try {
      setLoading(true); // Set loading to true when starting fetch
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://studyhub-api-p0q4.onrender.com/tutors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Make sure we're getting the data in the expected format
      const tutorsData = response.data?.data || response.data || [];
      setTutors(Array.isArray(tutorsData) ? tutorsData : []);
      
      if (tutorsData.length === 0) {
        toast.info("No tutors found in the system");
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
      toast.error(error.response?.data?.message || "Failed to load tutors");
      setTutors([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings data
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://studyhub-api-p0q4.onrender.com/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(error.response?.data?.message || "Failed to load bookings");
    }
  };

  // Handle profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    setIsUploadingImage(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://studyhub-api-p0q4.onrender.com/update/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update current user state with new photo
      setCurrentUser((prev) => ({
        ...prev,
        photo: response.data.photo || URL.createObjectURL(file),
      }));

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message || "Failed to upload profile picture"
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "https://studyhub-api-p0q4.onrender.com/update/profile",
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update current user with new data
      setCurrentUser((prev) => ({
        ...prev,
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
      }));

      toast.success("Profile updated successfully!");
      setShowSettingsModal(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchTutors();
    fetchBookings();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle tutor profile view
  const handleViewTutorProfile = (tutor) => {
    setSelectedTutor(tutor);
    setActiveTab("tutorProfile");
  };

  // Handle back to tutors
  const handleBackToTutors = () => {
    setSelectedTutor(null);
    setActiveTab("tutors");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-transform duration-200 ease-in-out
        fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4 z-40`}
      >
        {/* User Profile */}
        <div className="flex flex-col items-center py-6 border-b border-blue-700">
          <div className="relative mb-4">
            <img
              src={currentUser.photo}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-md"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName.charAt(
                  0
                )}${currentUser.lastName.charAt(0)}&background=random`;
              }}
            />
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploadingImage}
              />
              {isUploadingImage ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiUpload className="w-5 h-5 text-blue-600" />
              )}
            </label>
          </div>
          <h2 className="text-xl font-semibold">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p className="text-blue-200 text-sm">{currentUser.email}</p>
          <span className="mt-2 px-3 py-1 bg-blue-700 rounded-full text-xs font-medium">
            Student Account
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          <button
            onClick={() => {
              setSelectedTutor(null);
              setActiveTab("tutors");
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeTab === "tutors"
                ? "bg-blue-700"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <FiHome className="mr-3 text-lg" />
            <span>Find Tutors</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeTab === "bookings"
                ? "bg-blue-700"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <FiCalendar className="mr-3 text-lg" />
            <span>My Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeTab === "profile"
                ? "bg-blue-700"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <FiUser className="mr-3 text-lg" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setShowSettingsModal(true)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeTab === "settings"
                ? "bg-blue-700"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <FiSettings className="mr-3 text-lg" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 transition-all"
          >
            <FiLogOut className="mr-3 text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === "tutors" && "Find Tutors"}
              {activeTab === "tutorProfile" && "Tutor Profile"}
              {activeTab === "bookings" && "My Bookings"}
              {activeTab === "profile" && "My Profile"}
              {activeTab === "messages" && "Messages"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  src={currentUser.photo}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName.charAt(
                      0
                    )}${currentUser.lastName.charAt(0)}&background=random`;
                  }}
                />
                <span className="ml-2 font-medium hidden md:inline">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {activeTab === "tutors" && (
            <TutorsGrid
              tutors={tutors}
              onViewProfile={handleViewTutorProfile}
            />
          )}

          {activeTab === "tutorProfile" && selectedTutor && (
            <div className="relative">
              <button
                onClick={handleBackToTutors}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
              >
                <FiArrowLeft className="mr-2" />
                Back to Tutors
              </button>
              <TutorInformation tutor={selectedTutor} />
            </div>
          )}

          {activeTab === "bookings" && <BookingList bookings={bookings} />}

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="relative mb-4 md:mb-0 md:mr-6">
                  <img
                    src={currentUser.photo}
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName.charAt(
                        0
                      )}${currentUser.lastName.charAt(0)}&background=random`;
                    }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentUser.firstName} {currentUser.lastName}
                  </h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <strong>First Name:</strong> {currentUser.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {currentUser.lastName}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {currentUser.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Account Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> {currentUser.email}
                    </p>
                    <p>
                      <strong>Account Type:</strong> Student
                    </p>
                    <p>
                      <strong>Member Since:</strong>{" "}
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Update Profile
              </h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      setEditData({ ...editData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      setEditData({ ...editData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <label className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition">
                      <FiUpload className="inline mr-2" />
                      Upload New Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {isUploadingImage && (
                      <span className="ml-2 text-sm text-gray-500">
                        Uploading...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <FiCheck className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;