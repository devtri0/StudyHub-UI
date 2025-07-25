import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiBook,
  FiLogOut,
  FiClock,
  FiAward,
  FiBookmark,
  FiUsers,
  FiMessageSquare,
  FiShare2,
  FiDollarSign,
  FiBarChart2,
  FiFileText,
  FiBriefcase,
  FiSettings,
  FiTarget,
  FiTrendingUp,
  FiStar
} from "react-icons/fi";
import { FaChalkboardTeacher, FaCoins, FaTrophy, FaGraduationCap, FaMedal, FaRegLightbulb, FaChartLine, FaPuzzlePiece, FaBrain } from "react-icons/fa";

// Components
import ProfileManage from "../components/tutors/ProfileManage";
import AvailabilitySettings from "../components/tutors/AvailabilitySettings";
import TeachingStyleForm from "../components/tutors/TeachingStyleForm";
import ProgressTracker from "../components/tutors/ProgressTracker";
import EarningsDashboard from "../components/tutors/EarningsDashboard";
import GroupTeachingPanel from "../components/tutors/GroupTeachingPanel";
import TutorChat from "../components/tutors/TutorChat";
import ReferralProgram from "../components/tutors/ReferralProgram";
import AchievementBadge from "../components/tutors/AchievementBadge";

const TutorDash = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockGroups = [
    {
      id: 1,
      name: "Advanced Calculus Group",
      subject: "Mathematics",
      members: 12,
      nextSession: "Tomorrow, 3:00 PM",
      image: "https://source.unsplash.com/random/300x200/?math"
    },
    {
      id: 2,
      name: "Literature Club",
      subject: "English",
      members: 8,
      nextSession: "Friday, 5:00 PM",
      image: "https://source.unsplash.com/random/300x200/?books"
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "John Smith",
      preview: "About our session tomorrow...",
      time: "10:30 AM",
      unread: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      sender: "Study Group: Calculus",
      preview: "New document shared...",
      time: "Yesterday",
      unread: false,
      avatar: "https://ui-avatars.com/api/?name=Calculus+Group&background=random"
    }
  ];

  // Get authentication data
  const user = JSON.parse(localStorage.getItem("user"));
  const tutorId = user?.id;
  const token = localStorage.getItem("token");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    setIsUploadingImage(true);

    try {
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

      // Update local storage with new user data
      const updatedUser = {
        ...user,
        photo: response.data.url || URL.createObjectURL(file),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update the tutor data with the new image
      setTutorData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          image: response.data.url || URL.createObjectURL(file),
        },
      }));

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const fetchTutorData = async () => {
  try {
    const [userData, profileData, availabilityData, styleData, bookingsData] =
      await Promise.all([
        axios.get("https://studyhub-api-p0q4.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://studyhub-api-p0q4.onrender.com/tutor/profile/${tutorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://studyhub-api-p0q4.onrender.com/tutor/ava/${tutorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://studyhub-api-p0q4.onrender.com/tutor/style/${tutorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("https://studyhub-api-p0q4.onrender.com/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

    // Transform data into consistent format with enhanced fields
    const transformedData = {
      profile: {
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
        email: userData.data.email,
        phone: userData.data.phone,
        bio: profileData.data.bio || "No bio provided",
        education: profileData.data.education || ["No education provided"],
        specialization: profileData.data.specialization || [],
        experience: profileData.data.experience || [],
        languages: profileData.data.languages || [],
        location: profileData.data.location || {
          address: "",
          city: "",
          region: "",
          gpsAddress: ["", ""],
        },
        image: userData.data.photo || user?.photo || "/profile.jpg",
        ratingsAverage: profileData.data?.ratingsAverage || 0,
        ratingsQuantity: profileData.data?.ratingsQuantity || 0,
        certifications: profileData.data?.certifications || [
          { name: "Teaching Certification", date: "2022-01-15", issuer: "Education Board" }
        ],
        workExperience: profileData.data?.workExperience || [
          { position: "Math Tutor", institution: "City College", duration: "2019-2022" }
        ]
      },
      availability: {
        generalAvailability: availabilityData.data?.generalAvailability || {
          weekdays: { start: "09:00", end: "17:00" },
          weekends: { start: "10:00", end: "15:00" },
        },
        specificSlots: availabilityData.data?.specificSlots || [],
      },
      teachingStyle: {
        approach: styleData.data?.teachingStyle || "No teaching style provided",
        methods: styleData.data?.methods || ["No methods specified"],
        experience: profileData.data?.experience || "No experience provided",
        specialties: styleData.data?.subjects?.map((s) => `${s.name} (${s.level})`).join(", ") || "No specialties provided",
      },
      bookings: Array.isArray(bookingsData.data) 
        ? bookingsData.data
            .filter((b) => b.tutor === tutorId || b.tutor?.id === tutorId)
            .map((booking) => ({
              id: booking.id,
              student: booking.student?.name || "Anonymous Student",
              date: new Date(booking.date).toLocaleDateString(),
              time: `${booking.time}`,
              subject: booking.subject || "No subject specified",
              status: booking.status || "pending",
            }))
        : [],
      earnings: {
        total: 1250, // In a real app, this would come from the API
        completedSessions: 24,
        pendingWithdrawal: 350,
        history: [
          { date: "2023-05-01", amount: 50, description: "Session with John" },
          { date: "2023-05-03", amount: 75, description: "Group session" }
        ]
      },
      // Enhanced gamification system
      gamification: {
        level: Math.floor((24) / 5) + 1,
        xp: {
          current: 243,
          nextLevel: 300
        },
        teachingPoints: 1250,
        streaks: {
          currentStreak: 4,
          longestStreak: 7
        },
        questsCompleted: 8,
        questsAvailable: 4,
        achievements: [
          { id: 1, name: "First Session", icon: "🏅", description: "Complete your first tutoring session", earned: true, date: "2023-01-05", xpReward: 50 },
          { id: 2, name: "5-Star Rating", icon: "⭐", description: "Receive a 5-star rating from a student", earned: true, date: "2023-02-12", xpReward: 100 },
          { id: 3, name: "Group Leader", icon: "👑", description: "Successfully lead a group of 5+ students", earned: false, progress: 3, target: 5, xpReward: 150 },
          { id: 4, name: "Subject Expert", icon: "📚", description: "Complete 10 sessions in your main subject", earned: true, date: "2023-03-20", xpReward: 200 },
          { id: 5, name: "Weekend Warrior", icon: "🏆", description: "Teach 5 sessions on weekends", earned: false, progress: 3, target: 5, xpReward: 100 },
          { id: 6, name: "Master Mentor", icon: "🔮", description: "Achieve an average rating of 4.8+ over 10 sessions", earned: false, progress: 4.7, target: 4.8, xpReward: 250 }
        ],
        badges: [
          { id: 1, name: "Math Master", color: "blue", earned: true },
          { id: 2, name: "Literature Guru", color: "purple", earned: false },
          { id: 3, name: "Science Wizard", color: "green", earned: true }
        ],
        dailyGoals: {
          sessionsCompleted: 2,
          sessionsTarget: 3,
          studentsHelped: 5,
          studentsTarget: 5
        }
      }
    };

    setTutorData(transformedData);
    setLoading(false);
  } catch (err) {
    console.error("Fetch error:", err);
    toast.error(err.response?.data?.message || "Failed to load tutor data");
    setLoading(false);

    if (err.response?.status === 401) {
      localStorage.clear();
      navigate("/login");
    }
  }
};

  useEffect(() => {
    if (!token || !tutorId) {
      navigate("/login");
      return;
    }
    fetchTutorData();
  }, [tutorId, token, navigate]);

  const handleBookingAction = async (bookingId, action) => {
    try {
      const validActions = ["confirmed", "rejected", "cancelled", "completed"];
      if (!validActions.includes(action)) {
        throw new Error(`Invalid action: ${action}`);
      }

      const response = await axios.patch(
        `https://studyhub-api-p0q4.onrender.com/manage/${bookingId}`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking ${action} successfully`);
      fetchTutorData(); // Refresh data
      return response.data;
    } catch (error) {
      console.error(`Booking ${action} error:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} booking`);
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateTutorData = (updatedData) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...currentUser,
      firstName: updatedData.profile?.firstName || currentUser.firstName,
      lastName: updatedData.profile?.lastName || currentUser.lastName,
      phone: updatedData.profile?.phone || currentUser.phone,
      photo: updatedData.profile?.image || currentUser.photo,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setTutorData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const calculateProfileCompletion = () => {
    if (!tutorData) return 0;
    
    const requiredFields = [
      tutorData.profile.firstName,
      tutorData.profile.lastName,
      tutorData.profile.email,
      tutorData.profile.bio,
      tutorData.profile.education?.length > 0,
      tutorData.profile.specialization?.length > 0,
      tutorData.profile.experience?.length > 0,
      tutorData.availability.generalAvailability,
      tutorData.teachingStyle.approach,
      tutorData.teachingStyle.methods?.length > 0
    ];
    
    const completedFields = requiredFields.filter(Boolean).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-blue-600 font-semibold text-lg">Loading your teaching dashboard...</p>
        </div>
      </div>
    );
  }

  if (!tutorData) return null;

  const profileCompletion = calculateProfileCompletion();
  const xpProgress = (tutorData.gamification.xp.current / tutorData.gamification.xp.nextLevel) * 100;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
      >
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`md:w-72 bg-white shadow-xl z-40 transition-all duration-300 ease-in-out
        ${showMobileSidebar ? 'fixed inset-y-0 left-0 w-72' : 'fixed inset-y-0 -left-72 md:left-0 w-72'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-1">
                <div className="rounded-full overflow-hidden w-full h-full border-2 border-white">
                  <img
                    src={tutorData.profile.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=T+U&background=0061ff&color=fff";
                    }}
                  />
                </div>
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition border border-gray-100">
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
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                )}
              </label>
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center">
              {tutorData.profile.firstName} {tutorData.profile.lastName}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-2">
              {tutorData.profile.email}
            </p>
            
            {/* Level Badge */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md mb-4">
              Level {tutorData.gamification.level} Educator
            </div>
            
            {/* XP Progress */}
            <div className="w-full space-y-1">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>XP: {tutorData.gamification.xp.current}</span>
                <span>{tutorData.gamification.xp.nextLevel} XP needed for Level {tutorData.gamification.level + 1}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Teaching Points */}
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg mt-4 w-full">
              <FaCoins className="text-yellow-500 mr-2" />
              <span className="font-semibold text-gray-700">{tutorData.gamification.teachingPoints} Teaching Points</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            <button
              onClick={() => {
                setActiveSection("dashboard"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "dashboard" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiHome className="mr-3 h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("profile"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "profile" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiUser className="mr-3 h-5 w-5" />
              <span className="font-medium">Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("availability"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "availability" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiCalendar className="mr-3 h-5 w-5" />
              <span className="font-medium">Availability</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("teachingStyle"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "teachingStyle" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FaChalkboardTeacher className="mr-3 h-5 w-5" />
              <span className="font-medium">Teaching Style</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("earnings"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "earnings" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiDollarSign className="mr-3 h-5 w-5" />
              <span className="font-medium">Earnings</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("groups"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "groups" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiUsers className="mr-3 h-5 w-5" />
              <span className="font-medium">Group Teaching</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("messages"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "messages" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiMessageSquare className="mr-3 h-5 w-5" />
              <span className="font-medium">Messages</span>
              {mockMessages.filter(m => m.unread).length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {mockMessages.filter(m => m.unread).length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveSection("achievements"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "achievements" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiAward className="mr-3 h-5 w-5" />
              <span className="font-medium">Achievements</span>
            </button>

            <button
              onClick={() => {
                setActiveSection("referrals"); 
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeSection === "referrals" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <FiShare2 className="mr-3 h-5 w-5" />
              <span className="font-medium">Refer & Earn</span>
            </button>
          </nav>

          {/* Streak Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-amber-800">Teaching Streak</h3>
              <span className="text-amber-600 font-semibold">{tutorData.gamification.streaks.currentStreak} days</span>
            </div>
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 flex-1 rounded-full ${
                    i < tutorData.gamification.streaks.currentStreak 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                      : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-xs text-amber-700 mt-2">
              {tutorData.gamification.streaks.currentStreak === 7 
                ? "Impressive! You've completed a full week streak!" 
                : `Complete ${7 - tutorData.gamification.streaks.currentStreak} more days to earn a 50 XP bonus!`}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center px-4 py-3 text-gray-700 hover:text-red-600 transition-all rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100"
          >
            <FiLogOut className="mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-72 overflow-y-auto">
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                {activeSection === "dashboard" && (
                  <>
                    <FiHome className="mr-3 text-blue-600" />
                    Tutor Dashboard
                  </>
                )}
                {activeSection === "profile" && (
                  <>
                    <FiUser className="mr-3 text-blue-600" />
                    Profile Management
                  </>
                )}
                {activeSection === "availability" && (
                  <>
                    <FiCalendar className="mr-3 text-blue-600" />
                    Availability Settings
                  </>
                )}
                {activeSection === "teachingStyle" && (
                  <>
                    <FaChalkboardTeacher className="mr-3 text-blue-600" />
                    Teaching Style
                  </>
                )}
                {activeSection === "earnings" && (
                  <>
                    <FiDollarSign className="mr-3 text-blue-600" />
                    Earnings
                  </>
                )}
                {activeSection === "groups" && (
                  <>
                    <FiUsers className="mr-3 text-blue-600" />
                    Group Teaching
                  </>
                )}
                {activeSection === "messages" && (
                  <>
                    <FiMessageSquare className="mr-3 text-blue-600" />
                    Messages
                  </>
                )}
                {activeSection === "achievements" && (
                  <>
                    <FiAward className="mr-3 text-blue-600" />
                    Achievements & Badges
                  </>
                )}
                {activeSection === "referrals" && (
                  <>
                    <FiShare2 className="mr-3 text-blue-600" />
                    Refer & Earn
                  </>
                )}
              </h1>
              <p className="text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            {/* Stats Indicators */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                <FaGraduationCap className="text-blue-600 mr-2" />
                <div>
                  <div className="text-xs text-blue-600 font-medium">Level</div>
                  <div className="font-bold text-gray-800">{tutorData.gamification.level}</div>
                </div>
              </div>
              
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                <FiTarget className="text-green-600 mr-2" />
                <div>
                  <div className="text-xs text-green-600 font-medium">XP</div>
                  <div className="font-bold text-gray-800">{tutorData.gamification.xp.current}/{tutorData.gamification.xp.nextLevel}</div>
                </div>
              </div>
              
              <div className="flex items-center bg-purple-50 px-4 py-2 rounded-xl border border-purple-100">
                <FaCoins className="text-purple-600 mr-2" />
                <div>
                  <div className="text-xs text-purple-600 font-medium">Points</div>
                  <div className="font-bold text-gray-800">{tutorData.gamification.teachingPoints}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeSection === "dashboard" && (
          <div className="space-y-8">
            {/* Daily Goals Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FiTarget className="mr-2 text-blue-600" /> Daily Teaching Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Sessions Completed</span>
                    <span className="font-bold text-blue-600">{tutorData.gamification.dailyGoals.sessionsCompleted}/{tutorData.gamification.dailyGoals.sessionsTarget}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${(tutorData.gamification.dailyGoals.sessionsCompleted / tutorData.gamification.dailyGoals.sessionsTarget) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {tutorData.gamification.dailyGoals.sessionsCompleted === tutorData.gamification.dailyGoals.sessionsTarget 
                      ? "Goal achieved! +20 XP bonus earned" 
                      : `Complete ${tutorData.gamification.dailyGoals.sessionsTarget - tutorData.gamification.dailyGoals.sessionsCompleted} more session(s) to earn a 20 XP bonus`}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Students Helped</span>
                    <span className="font-bold text-blue-600">{tutorData.gamification.dailyGoals.studentsHelped}/{tutorData.gamification.dailyGoals.studentsTarget}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full" 
                      style={{ width: `${(tutorData.gamification.dailyGoals.studentsHelped / tutorData.gamification.dailyGoals.studentsTarget) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {tutorData.gamification.dailyGoals.studentsHelped === tutorData.gamification.dailyGoals.studentsTarget 
                      ? "Goal achieved! +15 XP bonus earned" 
                      : `Help ${tutorData.gamification.dailyGoals.studentsTarget - tutorData.gamification.dailyGoals.studentsHelped} more student(s) to earn a 15 XP bonus`}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-blue-100">
                <div className="flex items-start">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mr-4">
                    <FiCalendar className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Upcoming Sessions</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {tutorData.bookings.filter(b => b.status === "confirmed").length}
                    </h3>
                    <p className="text-xs text-blue-600 mt-1">
                      +5 XP per completed session
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-md border border-green-100">
                <div className="flex items-start">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mr-4">
                    <FiDollarSign className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Earnings</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      ${tutorData.earnings?.total || 0}
                    </h3>
                    <p className="text-xs text-green-600 mt-1">
                      Exchange points for rewards
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl shadow-md border border-amber-100">
                <div className="flex items-start">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white mr-4">
                    <FiStar className="text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Rating</p>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      {tutorData.profile.ratingsAverage || "N/A"}
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.round(tutorData.profile.ratingsAverage || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </h3>
                    <p className="text-xs text-amber-600 mt-1">
                      {tutorData.profile.ratingsQuantity || 0} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FiBookmark className="mr-2 text-blue-600" /> Upcoming Sessions
              </h2>
              
              {tutorData.bookings.length > 0 ? (
                <div className="space-y-4">
                  {tutorData.bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="border border-gray-100 p-5 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 hover:border-blue-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-gray-800">{booking.student}</h4>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <FiCalendar className="mr-1" />
                            <span>{booking.date}</span>
                            <span className="mx-2">•</span>
                            <FiClock className="mr-1" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-700">
                            <FaChalkboardTeacher className="mr-2 text-blue-600" />
                            <span>{booking.subject}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                            booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {booking.status}
                          </span>
                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleBookingAction(booking.id, "confirmed")}
                              className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                            >
                              Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center mt-6">
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto">
                      View All Sessions
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-blue-50/50 rounded-xl border border-blue-100">
                  <FiCalendar className="w-12 h-12 mx-auto text-blue-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No upcoming sessions</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Your schedule is clear. Update your availability to attract more students.
                  </p>
                  <button className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-shadow">
                    Update Availability
                  </button>
                </div>
              )}
            </div>

            {/* Achievement Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiAward className="mr-2 text-blue-600" /> Achievement Progress
                </h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorData.gamification.achievements
                  .filter(a => !a.earned)
                  .slice(0, 2)
                  .map(achievement => (
                    <div key={achievement.id} className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-amber-50 to-amber-100/30">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                          {achievement.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-800">{achievement.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-amber-800">Progress</span>
                              <span className="font-medium">{achievement.progress}/{achievement.target}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" 
                                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-amber-700 font-medium">
                            +{achievement.xpReward} XP reward upon completion
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <h3 className="text-base font-semibold text-gray-700 w-full mb-1">Recently Earned:</h3>
                {tutorData.gamification.achievements
                  .filter(a => a.earned)
                  .slice(0, 3)
                  .map(achievement => (
                    <div key={achievement.id} className="border border-gray-100 rounded-full px-4 py-2 flex items-center bg-gradient-to-r from-emerald-50 to-emerald-100/30">
                      <div className="mr-2 text-lg">{achievement.icon}</div>
                      <div className="font-medium text-gray-800 text-sm">{achievement.name}</div>
                      <div className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">+{achievement.xpReward} XP</div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Teaching Quests */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaBrain className="mr-2 text-blue-600" /> Teaching Quests
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-blue-100 rounded-xl p-5 bg-gradient-to-br from-blue-50 to-blue-100/30">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <FaPuzzlePiece className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Subject Master</h4>
                      <p className="text-sm text-gray-600 mb-3">Complete 5 sessions in your primary subject area this week</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <div className="relative h-4 w-4 mr-2">
                          <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-50"></div>
                          <div className="relative rounded-full bg-blue-600 h-4 w-4"></div>
                        </div>
                        Active Quest • 3/5 completed
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-purple-100 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-purple-100/30">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <FaRegLightbulb className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Knowledge Sharer</h4>
                      <p className="text-sm text-gray-600 mb-3">Create and share a study resource with your students</p>
                      <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                        Start Quest
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto">
                  View All Quests ({tutorData.gamification.questsAvailable} available)
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Management */}
        {activeSection === "profile" && (
          <ProfileManage
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            onUpdate={handleUpdateTutorData}
          />
        )}

        {/* Availability Settings */}
        {activeSection === "availability" && (
          <AvailabilitySettings
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            onUpdate={handleUpdateTutorData}
          />
        )}

        {/* Teaching Style */}
        {activeSection === "teachingStyle" && (
          <TeachingStyleForm
            tutorData={tutorData}
            tutorId={tutorId}
            token={token}
            onUpdate={handleUpdateTutorData}
          />
        )}

        {/* Earnings Dashboard */}
        {activeSection === "earnings" && (
          <EarningsDashboard earnings={tutorData.earnings} />
        )}

        {/* Group Teaching */}
        {activeSection === "groups" && (
          <GroupTeachingPanel 
            groups={mockGroups} 
            tutorId={tutorId} 
            onGroupCreated={() => fetchTutorData()} 
          />
        )}

        {/* Messages */}
        {activeSection === "messages" && (
          <TutorChat messages={mockMessages} tutorId={tutorId} />
        )}

        {/* Achievements */}
        {activeSection === "achievements" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Achievement Collection</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorData.gamification.achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-xl p-5 transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-md' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mr-4 text-2xl ${
                        achievement.earned ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{achievement.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Earned on {achievement.date}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{achievement.progress}/{achievement.target}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-2 text-xs text-amber-700 font-medium">
                          {achievement.earned ? 'Reward earned' : ''} +{achievement.xpReward} XP
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Teaching Badges</h2>
              
              <div className="flex flex-wrap gap-6">
                {tutorData.gamification.badges.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`w-40 py-6 px-4 border rounded-xl flex flex-col items-center transition-all duration-300 ${
                      badge.earned 
                        ? `bg-gradient-to-br from-${badge.color}-50 to-${badge.color}-100/30 border-${badge.color}-200 shadow-md` 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      badge.earned ? `bg-gradient-to-br from-${badge.color}-500 to-${badge.color}-600 text-white` : 'bg-gray-200 text-gray-400'
                    }`}>
                      {badge.name.substring(0, 1)}
                    </div>
                    <h4 className="font-bold text-gray-800 text-center">{badge.name}</h4>
                    <div className={`mt-2 text-xs font-medium text-center ${
                      badge.earned ? `text-${badge.color}-700` : 'text-gray-500'
                    }`}>
                      {badge.earned ? 'Earned' : 'Locked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Referral Program */}
        {activeSection === "referrals" && (
          <ReferralProgram user={user} tutorId={tutorId} />
        )}
      </main>
      
      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default TutorDash;