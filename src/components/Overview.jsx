// import React from "react";
// import image1 from "../assets/images/overview.jpg";
// import { Link } from "react-router-dom";

// const Overview = () => {
//   return (
//     <section className="w-full px-3 sm:px-4 py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Background decorative elements (smaller) */}
//       <div className="absolute top-6 left-6 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
//       <div className="absolute bottom-6 right-6 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center px-4 md:px-8 relative z-10">
//         {/* Text Content */}
//         <div className="space-y-6">
//           <div className="relative inline-block">
//             <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg border border-blue-200/50">
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Why Choose Us
//               </span>
//             </div>
//             <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-30"></div>
//           </div>

//           {/* Reduced heading font size */}
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
//             Connect.
//             <br />
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent relative">
//               Learn. Excel
//               <div className="absolute -bottom-1 left-0 w-12 h-0.75 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//             </span>
//           </h2>

//           {/* Why Choose Us - Three Point Write-up */}
//           <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
//             <li><b>Personalized Learning:</b> Connect with tutors who understand your unique needs.</li>
//             <li><b>Trusted Tutors:</b> Access vetted and experienced educators.</li>
//             <li><b>Flexible Learning:</b> Learn at your own pace, anytime, anywhere.</li>
//           </ul>

//           {/* Stats Grid - Adjusted number sizes and padding */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
//             <div className="group relative bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1500+</div>
//               <div className="text-xxs md:text-xs text-gray-600 font-medium mt-1">Active Students</div>
//               <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
//             </div>

//             <div className="group relative bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">200+</div>
//               <div className="text-xxs md:text-xs text-gray-600 font-medium mt-1">Qualified Tutors</div>
//               <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-60"></div>
//             </div>

//             <div className="group relative bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">98%</div>
//               <div className="text-xxs md:text-xs text-gray-600 font-medium mt-1">Satisfaction Rate</div>
//               <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-500 rounded-full animate-pulse opacity-60"></div>
//             </div>

//             <div className="group relative bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-xl shadow-xl border border-gray-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24/7</div>
//               <div className="text-xxs md:text-xs text-gray-600 font-medium mt-1">Availability</div>
//               <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 pt-6">
//             <Link
//               to="/signup"
//               className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 text-center overflow-hidden"
//             >
//               <span className="relative z-10">Join Now - It's Free</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//             </Link>

//             <Link
//               to="/tutors"
//               className="group relative bg-white/80 backdrop-blur-sm hover:bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xl hover:shadow-2xl border-2 border-blue-200 hover:border-blue-300 text-center transform hover:-translate-y-0.5"
//             >
//               <span className="relative z-10">Browse Tutors</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//             </Link>
//           </div>
//         </div>

//         {/* Image - Ensuring proper display */}
//         <div className="relative">
//           {/* Decorative background */}
//           <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-20 animate-pulse"></div>

//           <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
//             <img
//               src={image1}
//               alt="Tutor and student engaged in learning"
//               className="w-full h-auto object-cover rounded-xl"
//               onError={(e) => {
//                 console.error("Image failed to load", e);
//                 e.target.src = "https://via.placeholder.com/500x300?text=Image+Not+Available";
//               }}
//               onLoad={() => console.log("Image loaded successfully")}
//             />
//           </div>

//           {/* Floating decorative elements (smaller) */}
//           <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce opacity-80"></div>
//           <div className="absolute -top-1 -right-4 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: "0.5s" }}></div>
//           <div className="absolute -bottom-4 -left-1 w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: "1s" }}></div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .shadow-2xl {
//           box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Overview;