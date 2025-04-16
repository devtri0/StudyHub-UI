import React from "react";
import { useParams } from "react-router";
import image from "../assets/images/T1.jpg";
import image1 from "../assets/images/T4.jpg";
import image2 from "../assets/images/T2.jpg";
import image3 from "../assets/images/T5.jpg";
import image4 from "../assets/images/T3.jpg";
import image5 from "../assets/images/T6.jpg";

const tutors = [
  {
    id: "1",
    name: "Emily Johnson",
    subject: "Biology and Social Science",
    image: image,
    bio: `With a solid educational foundation and a passion for imparting knowledge, Emily is committed to helping students excel in Biology and Social Science. She graduated from Stanford University with a degree in Education and believes in making learning enriching and fun.`,
    qualifications: [
      "Master of Arts in Teaching",
      "Bachelor of Science in Biology",
      "ESL Certification",
    ],
    review: {
      student: "Angel Williams",
      feedback:
        "The course was incredibly insightful and made learning enjoyable!",
    },
  },
  {
    id: "2",
    name: "Michael Smith",
    subject: "Chemistry & Physics",
    image: image1,
    bio: `Michael brings a hands-on approach to learning science. He’s known for blending theory with real-world experiments and graduated from MIT.`,
    qualifications: ["Ph.D. in Chemistry", "Science Educator Award 2022"],
    review: {
      student: "Lucas Tran",
      feedback:
        "Michael broke down complex topics into simple bits. Amazing experience!",
    },
  },
  {
    id: "3",
    name: "Sarah Brown",
    subject: "English and History",
    image: image2,
    bio: `Sarah makes literature come alive and helps students critically explore the past. She holds a degree in English from Oxford University.`,
    qualifications: ["B.A. in English", "TEFL Certified"],
    review: {
      student: "Linda Mensah",
      feedback: "Her lessons are fun and full of creative ideas!",
    },
  },
  {
    id: "4",
    name: "James Wilson",
    subject: "Computer Science and Math",
    image: image3,
    bio: `James makes literature come alive and helps students critically explore the past. She holds a degree in English from Oxford University.`,
    qualifications: ["B.A. in English", "TEFL Certified"],
    review: {
      student: "Peter Wilson",
      feedback: "His lessons are full of creative ideas!",
    },
  },
  {
    id: "5",
    name: "Jessica Lee",
    subject: "Art and Music",
    image: image4,
    bio: `Jessica makes literature come alive and helps students critically explore the past. She holds a degree in English from Oxford University.`,
    qualifications: ["B.A. in English", "TEFL Certified"],
    review: {
      student: "Enoch Darko",
      feedback: "Her lessons are fun and interesting",
    },
  },
  {
    id: "6",
    name: "William Davis",
    subject: "Economics and Business",
    image: image5,
    bio: `William makes literature come alive and helps students critically explore the past. She holds a degree in English from Oxford University.`,
    qualifications: ["B.A. in English", "TEFL Certified"],
    review: {
      student: "Araba Golightly",
      feedback:
        "I liked how he was patient while he explained key concepts to me!",
    },
  },
];

const TutorProfile = () => {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === id);

  if (!tutor) return <div className="p-4">Tutor not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-16">
      <div className="flex flex-col items-center text-center mb-10">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mb-4 object-cover shadow"
        />
        <h1 className="text-2xl sm:text-3xl font-bold">{tutor.name}</h1>
        <p className="text-gray-600 text-sm sm:text-base">{tutor.subject}</p>
      </div>

      <section className="mb-12 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 font-serif">
          Tutor Biography
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {tutor.bio}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-center font-serif">
          Qualifications & Certifications
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base px-4 sm:px-12">
          {tutor.qualifications.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12 bg-gray-100 px-6 py-5 rounded shadow-sm text-center">
        <h3 className="text-lg font-medium mb-2 font-serif">
          Student Testimonial
        </h3>
        <p className="italic text-gray-600 text-sm sm:text-base">
          “{tutor.review.feedback}”
        </p>
        <p className="mt-2 text-sm text-gray-500">– {tutor.review.student}</p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2 font-serif">
          Book Your Session
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Choose your preferred date and time to connect with your tutor.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
          Book Now
        </button>
      </section>
    </div>
  );
};

export default TutorProfile;
