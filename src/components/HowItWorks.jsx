import React from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Users,
  CheckCircle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

// Using placeholder URLs from online resources for Ghanaian imagery and AI concepts
const heroImageURL = "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg"; // Example: student studying
const studentStepImageURL = "https://images.pexels.com/photos/1181342/pexels-photo-1181342.jpeg"; // Example: group of students
const tutorStepImageURL = "https://images.pexels.com/photos/2377168/pexels-photo-2377168.jpeg"; // Example: friendly tutor
const aiAssistantIconURL = "https://cdn-icons-png.flaticon.com/512/4185/4185430.png"; // Example: AI concept icon

const HowItWorks = () => {
  return (
    <section className="w-full px-2 sm:px-3 py-8 md:py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute top-5 left-5 w-48 h-48 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute bottom-5 right-5 w-48 h-48 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center px-3 md:px-4 relative z-10">
        {/* Text Content Column */}
        <div className="space-y-4 lg:text-left text-center">
          {/* "Why Choose Us" badge */}
          <div className="relative inline-block mx-auto lg:mx-0">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold shadow-md border border-blue-200/50 inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </div>
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Connect.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent relative">
              Learn. Excel
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            TutorKonnet is your premier online learning hub, connecting you with expert tutors and study partners to unlock your academic potential.
          </p>

          {/* Stats Grid (mimicking Overview's stats) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            <div className="group relative bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <GraduationCap className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1500+</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5">Active Students</div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BookOpen className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <div className="text-xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">200+</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5">Qualified Tutors</div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CheckCircle className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
              <div className="text-xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">98%</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5">Satisfaction Rate</div>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Calendar className="h-6 w-6 mx-auto mb-1 text-purple-600" />
              <div className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5">Availability</div>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="lg:flex justify-center items-center hidden">
          <img
            src={heroImageURL}
            alt="Happy Ghanaian student learning"
            className="rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </div>

      {/* Actual "How It Works" Content Section */}
      <section className="mt-10 px-3 sm:px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* How It Works Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight text-center mb-6 font-heading">
            ✨ How TutorKonnet Works
          </h2>

          {/* For Students Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center justify-center lg:justify-start font-heading">
              <GraduationCap className="mr-2 h-6 w-6 text-blue-500" /> 👨‍🎓 For Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Sign Up & Set Goals */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <h4 className="text-lg font-semibold text-gray-800">Sign Up & Set Goals</h4>
                <p className="text-xs text-gray-600 mt-1">Create a free account, choose your level, subjects, and learning style.</p>
              </div>

              {/* Find Verified Tutors */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-800">Find Verified Tutors</h4>
                <p className="text-xs text-gray-600 mt-1">Use filters to search for qualified tutors by subject, location, and pricing.</p>
              </div>

              {/* Book a Session Instantly */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Calendar className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <h4 className="text-lg font-semibold text-gray-800">Book a Session Instantly</h4>
                <p className="text-xs text-gray-600 mt-1">Choose your tutor, check their schedule, and book a session at your convenience.</p>
              </div>

              {/* Join Study Groups */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <h4 className="text-lg font-semibold text-gray-800">Join Study Groups</h4>
                <p className="text-xs text-gray-600 mt-1">Collaborate with students from your school or across Ghana.</p>
              </div>
            </div>
          </div>

          {/* For Tutors Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center justify-center lg:justify-start font-heading">
              <GraduationCap className="mr-2 h-6 w-6 text-blue-500" /> 👩‍🏫 For Tutors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Apply as a Tutor */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <h4 className="text-lg font-semibold text-gray-800">Apply as a Tutor</h4>
                <p className="text-xs text-gray-600 mt-1">Submit your profile, credentials, and availability.</p>
              </div>

              {/* Earn by Teaching */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-800">Earn by Teaching</h4>
                <p className="text-xs text-gray-600 mt-1">Set your hourly rate, manage your bookings, and teach virtually or in-person.</p>
              </div>

              {/* Grow Your Reputation */}
              <div className="group relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Calendar className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <h4 className="text-lg font-semibold text-gray-800">Grow Your Reputation</h4>
                <p className="text-xs text-gray-600 mt-1">Build trust through ratings and reviews and increase your income.</p>
              </div>
            </div>
            {/* Image for tutor section */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <img
                src={tutorStepImageURL}
                alt="Friendly Ghanaian tutor"
                className="rounded-3xl shadow-xl w-full md:w-3/4 lg:w-1/2"
                style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'cover' }} // Added inline styles
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Failed"; // Placeholder
                }}
              />
            </div>
          </div>

          {/* AI Assistance Section */}
          <div className="mb-12 py-6 px-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center font-heading">
              <img src={aiAssistantIconURL} alt="AI Assistant Icon" className="h-6 w-6 mr-2" /> 🤝 Built-in AI Assistance
            </h3>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 text-sm">
              <li>Get AI-powered tutor recommendations based on your goals and learning style.</li>
              <li>Access an AI assistant for quick answers, past questions, and topic explanations.</li>
              <li>Tutors can use AI tools to generate lesson plans and student feedback summaries.</li>
            </ul>
          </div>

          {/* Safe, Flexible, and Easy to Use Section */}
          <div className="py-6 px-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center font-heading">
              <ShieldCheck className="h-6 w-6 mr-2 text-orange-500" /> 🔐 Safe, Flexible, and Easy to Use
            </h3>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 text-sm">
              <li>Secure payments powered by Flutterwave or Paystack</li>
              <li>Accessible from mobile or desktop</li>
              <li>Verified profiles and real user reviews</li>
            </ul>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .font-heading {
          font-family: 'Poppins', sans-serif; /* Example of a modern font */
        }
        .font-sans {
          font-family: 'Inter', sans-serif; /* Example of a modern font */
        }
        /* Ensure the icons match the size and color of the Overview example */
        .text-blue-600 { color: #4299e1; } /* Example Tailwind blue-600 */
        .text-green-600 { color: #38a169; } /* Example Tailwind green-600 */
        .text-yellow-600 { color: #d69e2e; } /* Example Tailwind yellow-600 */
        .text-purple-600 { color: #9f7aea; } /* Example Tailwind purple-600 */
        .text-blue-500 { color: #3b82f6; } /* Example Tailwind blue-500 */
        .text-blue-700 { color: #1d4ed8; } /* Example Tailwind blue-700 */
        .text-orange-700 { color: #dd6b20; } /* Example Tailwind orange-700 */
        .text-orange-500 { color: #f59e0b; } /* Example Tailwind orange-500 */
      `}</style>
    </section>
  );
};

export default HowItWorks;