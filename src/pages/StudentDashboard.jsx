import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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
  FiUsers,
  FiMessageSquare,
  FiShare2,
  FiAward,
  FiBook,
  FiVideo,
  FiBarChart2,
  FiTarget,
  FiTrendingUp,
  FiBell,
  FiStar,
  FiZap,
  FiBookOpen,
  FiClock,
  FiEdit3,
} from "react-icons/fi";
import { FaCoins, FaTrophy, FaFire, FaGem, FaMedal, FaRocket, FaBolt } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

// Components
import BookingModal from "../components/student/BookingModal";
import TutorsGrid from "../components/student/TutorGrid1";
import TutorInformation from "../components/student/TutorInformation";
import BookingList from "../components/student/BookingList";
import StudyGroupCard from "../components/student/StudyGroupCard";
import ChatWindow from "../components/student/ChatWindow";
import ReferralProgram from "../components/student/ReferralProgram";
import AchievementBadge from "../components/student/AchievementBadge";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: "",
    createdAt: "",
    points: 0,
    level: 1,
    achievements: [],
    streak: 0,
    studyHours: 0,
    completedSessions: 0,
    nextGoal: 1000,
    xp: 750,
    weeklyGoal: 20,
    weeklyProgress: 14,
    rank: "Bronze Scholar",
    badges: [],
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
  const [studyGroups, setStudyGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Enhanced gamification data
  const gamificationData = {
    dailyQuests: [
      { id: 1, title: "Complete 1 Study Session", progress: 1, target: 1, reward: 50, completed: true },
      { id: 2, title: "Join Study Group Discussion", progress: 0, target: 1, reward: 25, completed: false },
      { id: 3, title: "Review Notes for 30 mins", progress: 15, target: 30, reward: 30, completed: false },
    ],
    weeklyMissions: [
      { id: 1, title: "Complete 5 Sessions", progress: 3, target: 5, reward: 200, deadline: "3 days" },
      { id: 2, title: "Help 2 Classmates", progress: 1, target: 2, reward: 150, deadline: "5 days" },
    ],
    achievements: [
      { id: 1, name: "First Steps", description: "Complete your first session", icon: "🎯", earned: true, rarity: "common" },
      { id: 2, name: "Study Streak", description: "Study for 7 days straight", icon: "🔥", earned: true, rarity: "rare" },
      { id: 3, name: "Knowledge Seeker", description: "Complete 50 sessions", icon: "📚", earned: false, rarity: "epic" },
      { id: 4, name: "Community Leader", description: "Help 20 students", icon: "👑", earned: false, rarity: "legendary" },
    ],
    skillTree: [
      { id: 1, skill: "Mathematics", level: 5, xp: 850, maxXp: 1000, unlocked: true },
      { id: 2, skill: "Science", level: 3, xp: 450, maxXp: 600, unlocked: true },
      { id: 3, skill: "English", level: 2, xp: 200, maxXp: 400, unlocked: true },
      { id: 4, skill: "History", level: 0, xp: 0, maxXp: 200, unlocked: false },
    ],
  };

  // Mock data with enhanced structure
  const mockStudyGroups = [
    {
      id: 1,
      name: "Advanced Calculus Study Group",
      subject: "Mathematics",
      members: 12,
      nextSession: "Tomorrow, 3:00 PM",
      image: "https://source.unsplash.com/random/300x200/?math",
      difficulty: "Advanced",
      xpReward: 75,
    },
    {
      id: 2,
      name: "Literature Discussion Club",
      subject: "English",
      members: 8,
      nextSession: "Friday, 5:00 PM",
      image: "https://source.unsplash.com/random/300x200/?books",
      difficulty: "Intermediate",
      xpReward: 50,
    },
    {
      id: 3,
      name: "Physics Lab Study Group",
      subject: "Physics",
      members: 15,
      nextSession: "Wednesday, 2:00 PM",
      image: "https://source.unsplash.com/random/300x200/?physics",
      difficulty: "Advanced",
      xpReward: 85,
    },
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "You've earned the 'Study Streak' badge",
      time: "2 min ago",
      read: false,
      icon: <FaTrophy className="text-yellow-500" />,
    },
    {
      id: 2,
      type: "session",
      title: "Session Starting Soon",
      message: "Your Math session with Dr. Smith starts in 15 minutes",
      time: "15 min ago",
      read: false,
      icon: <FiClock className="text-blue-500" />,
    },
    {
      id: 3,
      type: "quest",
      title: "Daily Quest Complete!",
      message: "You've completed today's study session quest",
      time: "1 hour ago",
      read: true,
      icon: <FiTarget className="text-green-500" />,
    },
  ];

  // Enhanced leaderboard with more gamification
  const mockLeaderboard = [
    {
      id: 1,
      name: "Alex Johnson",
      points: 1250,
      level: 12,
      streak: 15,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rank: "Diamond Scholar",
      badge: "🏆",
    },
    {
      id: 2,
      name: "Maria Garcia",
      points: 1150,
      level: 11,
      streak: 12,
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rank: "Gold Scholar",
      badge: "🥇",
    },
    {
      id: 3,
      name: "Current User",
      points: 980,
      level: 8,
      streak: 7,
      avatar: currentUser.photo,
      rank: "Silver Scholar",
      badge: "🥈",
    },
    {
      id: 4,
      name: "James Wilson",
      points: 875,
      level: 7,
      streak: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rank: "Bronze Scholar",
      badge: "🥉",
    },
  ];

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
        points: userData.points || 980,
        level: userData.level || 8,
        xp: userData.xp || 750,
        streak: userData.streak || 7,
        studyHours: userData.studyHours || 45,
        completedSessions: userData.completedSessions || 23,
        nextGoal: userData.nextGoal || 1000,
        weeklyGoal: userData.weeklyGoal || 20,
        weeklyProgress: userData.weeklyProgress || 14,
        rank: userData.rank || "Silver Scholar",
        achievements: userData.achievements || gamificationData.achievements,
        badges: userData.badges || ["🔥", "📚", "⭐"],
      });

      setEditData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
      });

      setNotifications(mockNotifications);
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
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://studyhub-api-p0q4.onrender.com/tutors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const tutorsData = response.data?.data || response.data || [];
      setTutors(Array.isArray(tutorsData) ? tutorsData : []);

      if (tutorsData.length === 0) {
        toast.info("No tutors found in the system");
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
      toast.error(error.response?.data?.message || "Failed to load tutors");
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://studyhub-api-p0q4.onrender.com/bookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(error.response?.data?.message || "Failed to load bookings");
      setBookings([]);
    }
  };

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
    setStudyGroups(mockStudyGroups);
    setLeaderboard(mockLeaderboard);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleViewTutorProfile = (tutor) => {
    setSelectedTutor(tutor);
    setActiveTab("tutorProfile");
  };

  const handleBackToTutors = () => {
    setSelectedTutor(null);
    setActiveTab("tutors");
  };

  const handleOpenBooking = (tutor) => {
    setSelectedTutorForBooking(tutor);
    setShowBookingModal(true);
  };

  const handleJoinGroup = (groupId) => {
    const group = studyGroups.find((g) => g.id === groupId);
    setCurrentUser(prev => ({
      ...prev,
      xp: prev.xp + group.xpReward,
      points: prev.points + group.xpReward,
    }));
    toast.success(
      `🎉 Joined ${group.name}! +${group.xpReward} XP earned!`
    );
  };

  const handleStartChat = (chatId) => {
    setActiveChat(chatId);
    setActiveTab("chat");
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case "Diamond Scholar": return "from-purple-400 to-pink-400";
      case "Gold Scholar": return "from-yellow-400 to-orange-400";
      case "Silver Scholar": return "from-gray-400 to-gray-500";
      case "Bronze Scholar": return "from-orange-600 to-yellow-600";
      default: return "from-blue-400 to-blue-500";
    }
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    if (percentage >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-3 right-3 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        {sidebarOpen ? <FiX className="h-4 w-4" /> : <FiHome className="h-4 w-4" />}
      </button>

      {/* Enhanced Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transform transition-all duration-300 ease-in-out
        fixed md:static inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-md z-40 overflow-y-auto`}
      >
        {/* Enhanced User Profile with Gamification */}
        <div className="p-3 border-b border-gray-200/50">
          <div className="flex flex-col items-center">
            {/* Profile Picture with Level Ring */}
            <div className="relative mb-2">
              <div className={`absolute -inset-1 bg-gradient-to-r ${getRankColor(currentUser.rank)} rounded-full animate-pulse opacity-75`}></div>
              <div className="relative bg-white rounded-full p-0.5">
                <img
                  src={currentUser.photo}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-16 h-16 rounded-full object-cover shadow-md"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}&background=random`;
                  }}
                />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[0.6rem] font-black px-2 py-0.5 rounded-full flex items-center shadow-md">
                    <FaTrophy className="mr-0.5" /> {currentUser.level}
                  </div>
                </div>
              </div>
              <label className="absolute bottom-1 right-1 bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full shadow-md cursor-pointer hover:shadow-lg transform hover:scale-110 transition-all duration-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploadingImage}
                />
                {isUploadingImage ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiUpload className="w-3 h-3 text-white" />
                )}
              </label>
            </div>

            {/* User Info */}
            <h2 className="text-base font-bold text-gray-800 text-center">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <p className="text-gray-600 text-xs mb-1">{currentUser.email}</p>
            
            {/* Rank Badge */}
            <div className={`mb-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRankColor(currentUser.rank)} text-white font-bold text-xs shadow-md`}>
              {currentUser.rank}
            </div>

            {/* Gamification Stats */}
            <div className="w-full space-y-2">
              {/* XP Progress */}
              <div className="bg-gray-50 rounded-xl p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[0.7rem] font-semibold text-gray-700">XP Progress</span>
                  <span className="text-[0.7rem] font-bold text-blue-600">{currentUser.xp}/{currentUser.nextGoal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentUser.xp / currentUser.nextGoal) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-xl text-white text-center">
                  <FaFire className="mx-auto mb-0.5" size={12} />
                  <div className="text-[0.6rem] font-bold">{currentUser.streak}</div>
                  <div className="text-[0.6rem] opacity-90">Streak</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl text-white text-center">
                  <FaCoins className="mx-auto mb-0.5" size={12} />
                  <div className="text-[0.6rem] font-bold">{currentUser.points}</div>
                  <div className="text-[0.6rem] opacity-90">Points</div>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-xl text-white text-center">
                  <FiClock className="mx-auto mb-0.5" size={12} />
                  <div className="text-[0.6rem] font-bold">{currentUser.studyHours}h</div>
                  <div className="text-[0.6rem] opacity-90">Study</div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-gray-50 rounded-xl p-2">
                <h4 className="text-[0.7rem] font-semibold text-gray-700 mb-1">Recent Badges</h4>
                <div className="flex justify-center space-x-1">
                  {currentUser.badges.map((badge, index) => (
                    <span key={index} className="text-xl">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="p-2 space-y-1">
          {[
            { id: "dashboard", icon: FiHome, label: "Dashboard", badge: null },
            { id: "tutors", icon: FiUser, label: "Find Tutors", badge: null },
            { id: "myClasses", icon: FiBook, label: "My Classes", badge: bookings.length },
            { id: "studyGroups", icon: FiUsers, label: "Study Groups", badge: null },
            { id: "quests", icon: FiTarget, label: "Daily Quests", badge: "NEW" },
            { id: "progress", icon: FiBarChart2, label: "Progress", badge: null },
            { id: "messages", icon: FiMessageSquare, label: "Messages", badge: notifications.filter(n => !n.read).length },
            { id: "achievements", icon: FiAward, label: "Achievements", badge: null },
            { id: "referrals", icon: FiShare2, label: "Refer & Earn", badge: null },
            { id: "bookings", icon: FiCalendar, label: "My Bookings", badge: null },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex items-center">
                <item.icon className="mr-2 text-sm" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-xxs font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === item.id 
                    ? "bg-white/20" 
                    : item.badge === "NEW" 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Settings and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200/50 bg-white/90 backdrop-blur">
          <div className="space-y-1">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-full flex items-center px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
            >
              <FiSettings className="mr-2 text-sm" />
              <span className="font-medium text-sm">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <FiLogOut className="mr-2 text-sm" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden relative">
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black text-gray-800 mb-0.5">
                {activeTab === "dashboard" && "Welcome Back! 👋"}
                {activeTab === "tutors" && "Find Your Perfect Tutor"}
                {activeTab === "tutorProfile" && "Tutor Profile"}
                {activeTab === "myClasses" && "Your Learning Journey"}
                {activeTab === "studyGroups" && "Study Together, Grow Together"}
                {activeTab === "quests" && "Daily Quests & Missions"}
                {activeTab === "progress" && "Your Learning Progress"}
                {activeTab === "messages" && "Messages & Communications"}
                {activeTab === "achievements" && "Your Achievements"}
                {activeTab === "referrals" && "Refer Friends & Earn"}
                {activeTab === "bookings" && "Your Bookings"}
              </h1>
              <p className="text-gray-600 text-sm">
                {activeTab === "dashboard" && `Level ${currentUser.level} • ${currentUser.rank}`}
                {activeTab === "tutors" && "Discover amazing tutors to accelerate your learning"}
                {activeTab === "myClasses" && "Track your sessions and progress"}
                {activeTab === "studyGroups" && "Join collaborative learning groups"}
                {activeTab === "quests" && "Complete quests to earn XP and rewards"}
                {activeTab === "progress" && "Monitor your learning statistics"}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <FiBell className="text-gray-600" size={16} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-md border border-gray-200 z-40">
                    <div className="p-2 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-2 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              {notification.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                              <p className="text-xs text-gray-600">{notification.message}</p>
                              <p className="text-[0.6rem] text-gray-400 mt-0.5">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Quick Stats */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-xl shadow-md">
                  <FaCoins className="mr-1" size={12} />
                  <span className="font-bold text-xs">{currentUser.points}</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-xl shadow-md">
                  <FaFire className="mr-1" size={12} />
                  <span className="font-bold text-xs">{currentUser.streak}</span>
                </div>
              </div>

              {/* User Avatar */}
              <div className="flex items-center">
                <img
                  src={currentUser.photo}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-10 h-10 rounded-full object-cover ring-4 ring-blue-500/20 shadow-md"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}&background=random`;
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Enhanced Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Banner with Daily Quest */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Good to see you, {currentUser.firstName}! 🌟</h2>
                      <p className="text-blue-100 mb-4">You're on a {currentUser.streak}-day learning streak! Keep it up!</p>
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <span className="text-sm font-medium">Next Level: {currentUser.nextGoal - currentUser.xp} XP to go</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <span className="text-sm font-medium">Rank: {currentUser.rank}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-6xl mb-2">🚀</div>
                      <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/30 transition-colors">
                        View Daily Quest
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Study Hours",
                    value: currentUser.studyHours,
                    subtitle: "This month",
                    icon: FiClock,
                    color: "from-blue-500 to-cyan-500",
                    bgColor: "bg-blue-50",
                    change: "+12%",
                  },
                  {
                    title: "Completed Sessions",
                    value: currentUser.completedSessions,
                    subtitle: "Total sessions",
                    icon: FiCheck,
                    color: "from-green-500 to-emerald-500",
                    bgColor: "bg-green-50",
                    change: "+8%",
                  },
                  {
                    title: "Study Streak",
                    value: currentUser.streak,
                    subtitle: "Days in a row",
                    icon: FaFire,
                    color: "from-orange-500 to-red-500",
                    bgColor: "bg-orange-50",
                    change: "+1",
                  },
                  {
                    title: "Total XP",
                    value: currentUser.xp.toLocaleString(),
                    subtitle: "Experience points",
                    icon: FaRocket,
                    color: "from-purple-500 to-pink-500",
                    bgColor: "bg-purple-50",
                    change: "+156",
                  },
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bgColor} p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                        <stat.icon className="text-xl" />
                      </div>
                      <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-800 mb-1">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Daily Quests Preview */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl text-white mr-4">
                      <FiTarget className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Daily Quests</h2>
                      <p className="text-gray-600">Complete quests to earn XP and rewards</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab("quests")}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gamificationData.dailyQuests.map((quest) => (
                    <div key={quest.id} className={`p-6 rounded-2xl border-2 ${quest.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-all`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-800">{quest.title}</h3>
                        {quest.completed && <FiCheck className="text-green-500 text-xl" />}
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{quest.progress}/{quest.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${quest.completed ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-1000`}
                            style={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Reward</span>
                        <div className="flex items-center">
                          <FaCoins className="text-yellow-500 mr-1" />
                          <span className="font-bold text-yellow-600">{quest.reward} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Upcoming Sessions */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl text-white mr-4">
                      <FiVideo className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
                      <p className="text-gray-600">Your scheduled learning sessions</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab("myClasses")}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    View All Sessions
                  </button>
                </div>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking, index) => (
                    <div
                      key={booking._id}
                      className="flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:shadow-md transition-all"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mr-4">
                        <FiVideo className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {booking.tutorName || "Tutor Session"}
                        </h3>
                        <p className="text-gray-600">
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </p>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                          {booking.subject || "General Tutoring"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right mr-4">
                          <div className="text-sm text-gray-500">Earn up to</div>
                          <div className="flex items-center">
                            <FaCoins className="text-yellow-500 mr-1" />
                            <span className="font-bold text-yellow-600">50 XP</span>
                          </div>
                        </div>
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                          Join Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Groups and Leaderboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Study Groups */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-2xl text-white mr-4">
                        <FiUsers className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Study Groups</h2>
                        <p className="text-gray-600">Join collaborative learning</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab("studyGroups")}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {studyGroups.slice(0, 2).map((group) => (
                      <div key={group.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-800">{group.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              group.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                              group.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {group.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{group.members} members • {group.nextSession}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaCoins className="text-yellow-500 mr-1" />
                              <span className="font-bold text-yellow-600">{group.xpReward} XP</span>
                            </div>
                            <button 
                              onClick={() => handleJoinGroup(group.id)}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                            >
                              Join Group
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Leaderboard */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl text-white mr-4">
                      <FaTrophy className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Leaderboard</h2>
                      <p className="text-gray-600">See how you rank</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {leaderboard.map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center p-4 rounded-2xl transition-all ${
                          user.name === "Current User"
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-8 text-center mr-4">
                          {index < 3 ? (
                            <span className="text-2xl">{user.badge}</span>
                          ) : (
                            <span className="font-bold text-gray-500">#{index + 1}</span>
                          )}
                        </div>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className={`font-bold ${user.name === "Current User" ? "text-blue-600" : "text-gray-800"}`}>
                            {user.name}
                          </h3>
                          <div className="flex items-center space-x-3 text-sm">
                            <span className="text-gray-600">Lvl {user.level}</span>
                            <span className="flex items-center">
                              <FaFire className="text-orange-500 mr-1" />
                              {user.streak}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <FaCoins className="text-yellow-500 mr-1" />
                            <span className="font-bold text-gray-800">{user.points.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-500">{user.rank}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Quests View */}
          {activeTab === "quests" && (
            <div className="space-y-8">
              {/* Daily Quests Section */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl text-white mr-4">
                    <FiTarget className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">Daily Quests</h2>
                    <p className="text-gray-600">Complete these quests before midnight to earn rewards!</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {gamificationData.dailyQuests.map((quest) => (
                    <div key={quest.id} className={`p-6 rounded-3xl border-2 transition-all hover:shadow-lg ${
                      quest.completed 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black text-gray-800 text-lg">{quest.title}</h3>
                        {quest.completed && (
                          <div className="bg-green-500 p-2 rounded-full">
                            <FiCheck className="text-white text-xl" />
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">Progress</span>
                          <span className="font-bold">{quest.progress}/{quest.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              quest.completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                            }`}
                            style={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaCoins className="text-yellow-500 mr-2 text-xl" />
                          <span className="font-black text-yellow-600 text-lg">{quest.reward} XP</span>
                        </div>
                        {!quest.completed && (
                          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-all">
                            Start Quest
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Missions */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl text-white mr-4">
                    <FaRocket className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">Weekly Missions</h2>
                    <p className="text-gray-600">Bigger challenges, bigger rewards!</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gamificationData.weeklyMissions.map((mission) => (
                    <div key={mission.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border-2 border-purple-200 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black text-gray-800 text-xl">{mission.title}</h3>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                          {mission.deadline} left
                        </span>
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">Progress</span>
                          <span className="font-bold">{mission.progress}/{mission.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000"
                            style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaGem className="text-purple-500 mr-2 text-xl" />
                          <span className="font-black text-purple-600 text-xl">{mission.reward} XP</span>
                        </div>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                          Continue Mission
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress View */}
          {activeTab === "progress" && (
            <div className="space-y-8">
              {/* Overall Progress */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h2 className="text-3xl font-black text-gray-800 mb-8">Your Learning Progress</h2>
                
                {/* XP Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Level Progress</h3>
                    <span className="text-lg font-bold text-blue-600">Level {currentUser.level}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 relative"
                        style={{ width: `${(currentUser.xp / currentUser.nextGoal) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600">{currentUser.xp} XP</span>
                      <span className="text-gray-600">{currentUser.nextGoal} XP</span>
                    </div>
                  </div>
                </div>

                {/* Skill Tree */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Skill Tree</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gamificationData.skillTree.map((skill) => (
                      <div key={skill.id} className={`p-6 rounded-2xl border-2 transition-all ${
                        skill.unlocked 
                          ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200 opacity-50'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-800 text-lg">{skill.skill}</h4>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                            Level {skill.level}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>XP Progress</span>
                            <span>{skill.xp}/{skill.maxXp}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                skill.unlocked ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-300'
                              }`}
                              style={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        {!skill.unlocked && (
                          <p className="text-sm text-gray-500">Complete more sessions to unlock</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Goal */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Weekly Goal</h3>
                  <span className="text-lg font-bold text-green-600">{currentUser.weeklyProgress}/{currentUser.weeklyGoal} hours</span>
                </div>
                <div className="relative mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${(currentUser.weeklyProgress / currentUser.weeklyGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {currentUser.weeklyGoal - currentUser.weeklyProgress > 0 
                    ? `${currentUser.weeklyGoal - currentUser.weeklyProgress} hours left to reach your weekly goal!`
                    : "🎉 Congratulations! You've achieved your weekly goal!"
                  }
                </p>
              </div>
            </div>
          )}

          {/* Achievements View */}
          {activeTab === "achievements" && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl text-white mr-4">
                    <FiAward className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">Your Achievements</h2>
                    <p className="text-gray-600">Unlock badges and earn rewards for your accomplishments</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gamificationData.achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-6 rounded-3xl border-2 transition-all hover:shadow-lg ${
                      achievement.earned 
                        ? achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                          : achievement.rarity === 'epic' ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300'
                          : achievement.rarity === 'rare' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
                          : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}>
                      <div className="text-center">
                        <div className="text-6xl mb-4">{achievement.icon}</div>
                        <h3 className="font-black text-gray-800 text-xl mb-2">{achievement.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-800'
                            : achievement.rarity === 'epic' ? 'bg-indigo-100 text-indigo-800'
                            : achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                          }`}>
                            {achievement.rarity}
                          </span>
                          {achievement.earned && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                              ✓ Earned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other existing views (tutors, myClasses, etc.) remain the same */}
          {activeTab === "tutors" && (
            <TutorsGrid
              tutors={tutors}
              onViewProfile={handleViewTutorProfile}
              onBookSession={handleOpenBooking}
            />
          )}

          {activeTab === "tutorProfile" && selectedTutor && (
            <div className="relative">
              <button
                onClick={handleBackToTutors}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-bold"
              >
                <FiArrowLeft className="mr-2" />
                Back to Tutors
              </button>
              <TutorInformation
                tutor={selectedTutor}
                onBookSession={() => {
                  setSelectedTutorForBooking(selectedTutor);
                  setShowBookingModal(true);
                }}
              />
            </div>
          )}

          {activeTab === "myClasses" && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h2 className="text-3xl font-black text-gray-800 mb-8">Your Learning Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border-2 border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-blue-300"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                        <h3 className="font-black text-xl mb-2">
                          {booking.tutorName || "Tutor Session"}
                        </h3>
                        <p className="text-blue-100">
                          {booking.subject || "General Tutoring"}
                        </p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3 mb-6">
                          <p className="flex items-center text-gray-700">
                            <FiCalendar className="mr-3 text-blue-500" />
                            <span className="font-medium">Date:</span>
                            <span className="ml-2">{new Date(booking.date).toLocaleDateString()}</span>
                          </p>
                          <p className="flex items-center text-gray-700">
                            <FiClock className="mr-3 text-blue-500" />
                            <span className="font-medium">Time:</span>
                            <span className="ml-2">{booking.time}</span>
                          </p>
                          <p className="flex items-center text-gray-700">
                            <FiBookOpen className="mr-3 text-blue-500" />
                            <span className="font-medium">Status:</span>
                            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                              booking.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {booking.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-bold transition-all hover:shadow-lg transform hover:scale-105">
                            Join Session
                          </button>
                          <button className="flex-1 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 py-3 px-4 rounded-xl font-bold transition-all">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements</h2>
                <div className="flex flex-wrap gap-4">
                  {currentUser.achievements.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "studyGroups" && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-3xl font-black text-gray-800 mb-2">Study Groups</h2>
                    <p className="text-gray-600">Join collaborative learning groups and earn bonus XP</p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Create New Group
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyGroups.map((group) => (
                    <div key={group.id} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-blue-300">
                      <div className="relative h-48 overflow-hidden">
                        <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                            group.difficulty === 'Advanced' ? 'bg-red-500 text-white' :
                            group.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          }`}>
                            {group.difficulty}
                          </span>
                          <h3 className="font-black text-white text-lg">{group.name}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-blue-600 font-bold">{group.subject}</span>
                          <div className="flex items-center">
                            <FaCoins className="text-yellow-500 mr-1" />
                            <span className="font-bold text-yellow-600">{group.xpReward} XP</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{group.members} members • {group.nextSession}</p>
                        <button 
                          onClick={() => handleJoinGroup(group.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg transform hover:scale-105"
                        >
                          Join Group
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs (messages, referrals, bookings) - keeping existing structure but with enhanced styling */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="flex h-[600px]">
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                  </div>
                  <div className="overflow-y-auto h-full">
                    {/* Message list implementation */}
                  </div>
                </div>
                <div className="w-2/3 flex flex-col">
                  {/* Chat implementation */}
                </div>
              </div>
            </div>
          )}

          {activeTab === "referrals" && <ReferralProgram user={currentUser} />}
          {activeTab === "bookings" && <BookingList bookings={bookings} />}
        </main>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          tutor={selectedTutorForBooking}
          onClose={(success) => {
            setShowBookingModal(false);
            if (success) {
              fetchBookings();
              // Award XP for booking
              setCurrentUser(prev => ({
                ...prev,
                xp: prev.xp + 25,
                points: prev.points + 25,
              }));
              toast.success("🎉 Session booked! +25 XP earned!");
            }
          }}
          currentUser={currentUser}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Update Profile</h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      setEditData({ ...editData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      setEditData({ ...editData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <label className="cursor-pointer bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-xl hover:from-blue-200 hover:to-purple-200 transition-all flex items-center justify-center">
                    <FiUpload className="mr-2" />
                    Upload New Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploadingImage && (
                    <span className="block text-sm text-gray-500 mt-2">
                      Uploading...
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all flex items-center shadow-lg hover:shadow-xl"
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