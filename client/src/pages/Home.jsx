import { FaQuestionCircle, FaImage, FaUsers, FaUniversity, FaRegComments } from "react-icons/fa";
import { FiBriefcase, FiBookOpen } from "react-icons/fi";


import {
  Bot,
  BookOpenCheck,
  GraduationCap,
  Landmark,
  Briefcase,
  MessageSquare
} from "lucide-react";

export const Home = () => {
  return (
    <>
      <div className="text-center py-20 px-4 bg-gradient-to-br from-blue-100 via-white to-orange-100 shadow-inner">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-md">
          <span className="text-blue-600">#NO.1 FREE app</span> for <br />
          <span className="text-orange-500">career guidance and planning</span>
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base md:text-lg">
          Empower your journey. Discover your future. Plan smart with our expert tools.
        </p>

        <div className="flex justify-center">
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transform transition duration-300 ease-in-out text-white font-semibold py-3 px-8 rounded-full shadow-lg">
            Download MY CAREER COMPASS
          </button>
        </div>
      </div>


      <section className="flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <button className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-full italic">
            <span className="text-white">Know Before You Go 🌍</span>
          </button>
          <h1 className="text-3xl md:text-5xl font-bold">
            Every dream needs a direction. Find yours and move{" "}
            <span className="text-blue-400">Forward</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Choosing the right career is one of the most important decisions in life.
            With the right direction, you can turn your dreams into reality.
            Our platform helps you explore courses, skills, and opportunities.
            Discover what suits you best — based on your interests and strengths.
            Let us help you take the first confident step toward your future.
          </p>
        </div>

        {/* Right Images */}
        <div className="flex gap-2 md:gap-4 mt-4 ml-12">
          <img
            src="/images/girl.jpeg"
            alt="Career Guidance"
            className="w-[133px] md:w-[200px] h-[200px] md:h-[300px] object-contain rounded-2xl shadow-lg border-2 border-blue-400"
          />
          <img
            src="/images/laptop.png"
            alt="Learning"
            className="w-[133px] md:w-[200px] h-[200px] md:h-[300px] object-contain rounded-2xl shadow-lg border-2 border-blue-400"
          />
          <img
            src="/images/walk.png"
            alt="Path"
            className="w-[133px] md:w-[200px] h-[200px] md:h-[300px] object-contain rounded-2xl shadow-lg border-2 border-blue-400"
          />
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-14 bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-md">

        {/* Left Side - Chatbot Content */}
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-3">
            <Bot className="text-blue-600 w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-800">Your Personal Career Chatbot</h2>
          </div>
          <p className="text-gray-600 text-lg">
            🤖 Got questions about careers, colleges, exams, or future paths?
            <br />
            Our smart AI chatbot is here 24/7 to help you make informed decisions – instantly and accurately.
          </p>

          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
            <MessageSquare className="w-5 h-5" />
            Start Chatting
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/images/chatbot.jpeg"
            alt="Chatbot Assistant"
            className="w-[220px] h-auto rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-14 bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-md">

        {/* Left Side - Image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/images/fields.jpeg" // Replace with your image path
            alt="Career Guidance"
            className="w-[220px] h-auto rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-blue-600 w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-800">Career Guidance & Competitive Exams</h2>
          </div>
          <p className="text-gray-600 text-lg">
            Explore various career options across fields like Engineering, Medicine, Arts, and more.
            <br />
            Get detailed information on important competitive exams, eligibility, preparation tips, and future opportunities.
            <br />
            Our app helps you choose the best career path with expert guidance and personalized advice.
          </p>

          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
            <FiBookOpen className="w-5 h-5" />
            Explore Careers
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-yellow-50 to-blue-100 p-6 rounded-2xl shadow-xl m-4">

        {/* Left content */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-blue-800">🎓  Community</h2>
          <p className="text-gray-700 text-lg">
            Our app includes a supportive <span className="font-semibold text-indigo-700">Community</span> where you can:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <FaQuestionCircle className="text-blue-600" />
              Ask questions about courses, colleges, and career paths.
            </li>
            <li className="flex items-center gap-2">
              <FaImage className="text-green-600" />
              Upload documents, study materials, or infographics.
            </li>
            <li className="flex items-center gap-2">
              <FaUniversity className="text-purple-600" />
              Discuss entrance exams, cutoffs, and admissions.
            </li>
            <li className="flex items-center gap-2">
              <FaUsers className="text-pink-600" />
              Connect with peers, mentors, and alumni.
            </li>
            <li className="flex items-center gap-2">
              <FaRegComments className="text-yellow-600" />
              Share your journey and guide others.
            </li>
          </ul>
          <p className="text-md text-gray-600">
            🌟 Build your career with the power of community, conversation, and collaboration.
          </p>
        </div>

        {/* Right image */}
        <div className="flex justify-end mt-6 md:mt-0">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src="/images/community.jpeg"
              alt="Career Guidance Community"
              className="w-full md:w-[200px] h-auto rounded-xl shadow-lg"
            />
            <img
              src="/images/community_2.jpeg"
              alt="Career Guidance Community"
              className="w-full md:w-[200px] h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

      </div>
      <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 mt-12 rounded-t-3xl shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">My Career Compass</h3>
          <p className="text-sm mt-1">Empowering your career journey.</p>
          <div className="mt-6 text-xs text-blue-200">
            &copy; {new Date().getFullYear()} My Career Compass. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};
