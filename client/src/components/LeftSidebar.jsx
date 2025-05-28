


import { useAuth } from "../store/auth";
import { useState } from "react";
import { cardsData } from '../data/cardsData';
import { Layers, User, ArrowDownCircle } from "lucide-react"; // 🆕 Icons
import competitiveExams from '../data/competitive_exams_data.json';

// Extract titles from cardsData
const extraFields = cardsData.map(card => card.title);
const examOptions = competitiveExams.map(exam => exam.exam_name);

const LeftSidebar = ({ selected, onSelect, options }) => {
  const { user } = useAuth();
  const firstLetter = user?.username?.charAt(0).toUpperCase();
  const [showFields, setShowFields] = useState(false);

  const handleFieldClick = () => {
    setShowFields(!showFields);
    onSelect('field');
  };

  return (
    <div className="h-screen  bg-gradient-to-b from-white via-indigo-50 to-pink-50 rounded-2xl shadow-lg p-4 overflow-y-auto relative border border-indigo-100">

      {/* User Info */}
      {user && (
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-md">
            {firstLetter}
          </div>
          <p className="mt-2 font-semibold text-indigo-800 text-sm flex justify-center items-center gap-1">
            <User size={16} /> {user.username}
          </p>
        </div>
      )}

      {/* Heading */}
      <h3 className="text-xl font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1 flex items-center gap-2">
        <Layers size={20} className="text-pink-500" /> Explore Paths
      </h3>

      {/* Category Buttons */}
      <div className="space-y-1">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`block w-full text-left px-3 py-2 rounded-md capitalize transition duration-200 text-sm font-medium
              ${selected === option
                ? 'bg-indigo-200 text-indigo-900 font-semibold'
                : 'hover:bg-indigo-100 text-gray-700'}`}
          >
            {option.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      {/* Career Fields Dropdown */}
      <div className="mt-5">
        <button
          onClick={handleFieldClick}
          className="flex items-center w-full text-left px-3 py-2 rounded-md capitalize font-semibold text-indigo-700 hover:bg-indigo-100 transition text-sm"
        >
          <ArrowDownCircle className={`mr-2 transition-transform ${showFields ? 'rotate-180' : ''}`} size={18} />
          Career Fields
        </button>

        {showFields && (
          <div className="pl-4 mt-2 space-y-1">
            {extraFields.map((field) => (
              <button
                key={field}
                onClick={() => onSelect(field)}
                className={`block w-full text-left px-3 py-1 rounded-md capitalize transition duration-200 text-xs font-medium
            ${selected === field
                    ? 'bg-pink-200 text-pink-900 font-semibold'
                    : 'hover:bg-pink-100 text-gray-700'}`}
              >
                {field}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Competitive Exams Dropdown */}
      <div className="mt-6">
        <h4 className="text-md font-bold text-indigo-600 mb-1 border-b border-indigo-200 pb-1">Competitive Exams</h4>
        <div className="pl-2 space-y-1">
          {examOptions.map((exam) => (
            <button
              key={exam}
              onClick={() => onSelect(exam)}
              className={`block w-full text-left px-3 py-1 rounded-md capitalize transition duration-200 text-sm font-medium ${selected === exam
                ? 'bg-purple-200 text-purple-900 font-semibold'
                : 'hover:bg-purple-100 text-gray-700'
                }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
};

export default LeftSidebar;


