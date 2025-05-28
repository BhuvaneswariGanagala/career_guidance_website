


// src/components/CollegeLeftSidebar.jsx
import React, { useState } from 'react';
import { FaUniversity, FaBars, FaTimes } from 'react-icons/fa';

const CollegeLeftSidebar = ({ colleges, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex items-center justify-between bg-indigo-800 text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaUniversity /> Colleges
        </h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar for mobile and desktop */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-800 to-indigo-600 text-white p-4 z-50 shadow-lg overflow-y-auto`}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaUniversity /> Colleges
        </h2>
        <ul className="space-y-3">
          {colleges.map((college, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(index);
                setIsOpen(false); // close on mobile after select
              }}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                selected === index
                  ? 'bg-white text-indigo-800 font-semibold'
                  : 'hover:bg-indigo-700'
              }`}
            >
              {college.college_name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CollegeLeftSidebar;


// // src/components/CollegeLeftSidebar.jsx
// import React from 'react';
// import { FaUniversity } from 'react-icons/fa';

// const CollegeLeftSidebar = ({ colleges, selected, onSelect }) => {
//   return (
// <div className="hidden md:block h-screen w-72 bg-gradient-to-b from-indigo-800 to-indigo-600 text-white p-4 sticky top-0 shadow-lg overflow-y-auto">
//   <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//     <FaUniversity /> Colleges
//   </h2>
//   <ul className="space-y-3">
//     {colleges.map((college, index) => (
//       <li
//         key={index}
//         onClick={() => onSelect(index)}
//         className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
//           selected === index
//             ? 'bg-white text-indigo-800 font-semibold'
//             : 'hover:bg-indigo-700'
//         }`}
//       >
//         {college.college_name}
//       </li>
//     ))}
//   </ul>
// </div>
//   );
//   };
// export default CollegeLeftSidebar;