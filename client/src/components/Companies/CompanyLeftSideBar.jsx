


// src/components/CompanyLeftSidebar.jsx
import React from 'react';

const extraFields = [
    "agriculture",
    "architecture",
    "banking",
    "defence",
    "designing",
    "doctor",
    "engineering",
    "finance",
    "hotel management",
    "insurance",
    "journalism",
    "language translator",
    "law and government",
    "literature",
    "politics",
    "skilled trades",
    "sports",
    "teachers"
];

const CompanyLeftSidebar = ({ selected, onSelect}) => {
  const allOptions = extraFields; // Combine both!

  return (
    <div className="h-screen sticky top-0 bg-white rounded-lg shadow p-4 overflow-y-auto">
      <h3 className="text-lg font-bold text-indigo-700 mb-3">Explore Paths</h3>
      {allOptions.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`block w-full text-left px-3 py-2 rounded-md mb-1 
            ${selected === option ? 'bg-indigo-200 text-indigo-800 font-semibold' : 'hover:bg-indigo-100 text-gray-700'}`}
        >
          {option.replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  );
};

export default CompanyLeftSidebar;
