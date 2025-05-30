import React, { useState, useEffect, useRef } from "react";

import data from '../data/awarenessData.json';
import competitiveExams from '../data/competitive_exams_data.json';
import LeftSidebar from '../components/LeftSidebar';
import RightPanel from '../components/RightPanel';
import CardsGrid from '../components/cardsGrid';
import { renderValue } from '../components/Collapsible';
import { BookOpen, Info, GraduationCap } from 'lucide-react';


export const AwarenessPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('after_10th');
  const [showOnlyCards, setShowOnlyCards] = useState(false);
  
  useEffect(() => {
  const alertShown = sessionStorage.getItem("awarenessAlertShown");
  if (!alertShown) {
    alert("Explore various career paths by selecting options from the left sidebar!");
    sessionStorage.setItem("awarenessAlertShown", "true");
  }
}, []);


  const handleSelect = (category) => {
    if (category === 'field') {
      setShowOnlyCards(true);
    }
    setSelectedCategory(category);
  };

  const handleGoBack = () => {
    setShowOnlyCards(false);
    setSelectedCategory('after_10th');
  };

  const selectedExamData = competitiveExams.find(
    exam => exam.exam_name === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-pink-50 font-sans">
      <div className={`grid ${showOnlyCards ? 'grid-cols-1' : 'grid-cols-12'} gap-4 max-w-screen-xl mx-auto px-4 py-6`}>
        
        {/* Left Sidebar */}
        {!showOnlyCards && (
          <div className="col-span-12 md:col-span-3 lg:col-span-2 h-screen">
            <LeftSidebar
              selected={selectedCategory}
              onSelect={handleSelect}
              options={Object.keys(data)} 
            />
          </div>
        )}

        {/* Main Content */}
        <div className={showOnlyCards ? 'col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-8 max-h-[calc(120vh-8rem)] overflow-y-auto pr-1'}>
          
          {selectedCategory === 'field' ? (
            <>
              <CardsGrid />
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleGoBack}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md"
                >
                  ⬅ Go Back
                </button>
              </div>
            </>
          ) : selectedExamData ? (
            <>
              {/* Sticky Heading */}
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg px-4 py-3 border-b border-indigo-200 rounded-t-xl shadow-sm">
                <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  {selectedExamData.exam_name}
                </h1>
              </div>

              {/* Exam Details */}
              <div className="mt-6 grid gap-6">
                {Object.entries(selectedExamData).map(([key, value], index) => (
                  <div
                    key={index}
                    className="bg-white border-l-4 border-indigo-500 p-5 shadow-md rounded-xl hover:shadow-xl transition duration-300"
                  >
                    <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2 capitalize">
                      {key.toLowerCase().includes('eligibility') ? (
                        <GraduationCap className="text-indigo-500" />
                      ) : key.toLowerCase().includes('purpose') ? (
                        <Info className="text-purple-500" />
                      ) : (
                        <BookOpen className="text-indigo-600" />
                      )}
                      {key.replace(/_/g, ' ')}
                    </h2>
                    <div className="text-gray-700 text-base leading-relaxed">
                      {renderValue(value)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            data[selectedCategory] &&
            Object.entries(data[selectedCategory]).map(([key, value]) => (
              <div
                key={key}
                className="bg-white shadow-md border-l-4 border-indigo-500 p-5 rounded-xl mb-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2 capitalize">
                  {key.toLowerCase().includes('eligibility') ? (
                    <GraduationCap className="text-indigo-500" />
                  ) : key.toLowerCase().includes('purpose') ? (
                    <Info className="text-purple-500" />
                  ) : (
                    <BookOpen className="text-indigo-600" />
                  )}
                  {key.replace(/_/g, ' ')}
                </h2>
                <div className="text-gray-700 text-base leading-relaxed">
                  {renderValue(value)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Panel */}
        {!showOnlyCards && (
          <div className="col-span-12 md:col-span-3 lg:col-span-2 hidden md:block">
            <RightPanel />
          </div>
        )}
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import data from '../data/awarenessData.json';
// import competitiveExams from '../data/competitive_exams_data.json';
// import LeftSidebar from '../components/LeftSidebar';
// import RightPanel from '../components/RightPanel';
// import CardsGrid from '../components/cardsGrid';
// import { renderValue } from '../components/Collapsible';
// import { BookOpen, Info, GraduationCap } from 'lucide-react';

// export const AwarenessPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('after_10th');
//   const [showOnlyCards, setShowOnlyCards] = useState(false);

//   const handleSelect = (category) => {
//     if (category === 'field') {
//       setShowOnlyCards(true);
//     } else {
//       setShowOnlyCards(false);
//       setSelectedCategory(category);
//     }
//   };

//   const handleGoBack = () => {
//     setShowOnlyCards(false);
//     setSelectedCategory('after_10th');
//   };

//   const selectedExamData = competitiveExams.find(
//     (exam) => exam.exam_name === selectedCategory
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 font-sans">
//       <div className={`grid ${showOnlyCards ? 'grid-cols-1' : 'grid-cols-12'} gap-6 max-w-screen-xl mx-auto px-6 py-8`}>

//         {/* Left Sidebar */}
//         {!showOnlyCards && (
//           <div className="col-span-12 md:col-span-3 lg:col-span-2">
//             <LeftSidebar
//               selected={selectedCategory}
//               onSelect={handleSelect}
//               options={Object.keys(data).concat(competitiveExams.map(e => e.exam_name))}
//             />
//           </div>
//         )}

//         {/* Main Content */}
//         <div className={showOnlyCards ? 'col-span-12' : 'col-span-12 md:col-span-7 lg:col-span-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1'}>
//           {selectedCategory === 'field' ? (
//             <>
//               <CardsGrid />
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleGoBack}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md"
//                 >
//                   ⬅ Go Back
//                 </button>
//               </div>
//             </>
//           ) : selectedExamData ? (
//             <>
//               <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2 border-indigo-200">
//                 📘 {selectedExamData.exam_name}
//               </h1>
//               <div className="grid gap-6">
//                 {Object.entries(selectedExamData).map(([key, value], index) => (
//                   <div
//                     key={index}
//                     className="bg-white border-l-4 border-indigo-500 p-5 shadow-md rounded-xl hover:shadow-xl transition duration-300"
//                   >
//                     <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2 capitalize">
//                       {key.toLowerCase().includes('eligibility') ? (
//                         <GraduationCap className="text-indigo-500" />
//                       ) : key.toLowerCase().includes('purpose') ? (
//                         <Info className="text-purple-500" />
//                       ) : (
//                         <BookOpen className="text-indigo-600" />
//                       )}
//                       {key.replace(/_/g, ' ')}
//                     </h2>
//                     <div className="text-gray-700 text-base leading-relaxed">
//                       {renderValue(value)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             data[selectedCategory] &&
//             Object.entries(data[selectedCategory]).map(([key, value]) => (
//               <div
//                 key={key}
//                 className="bg-white shadow-md border-l-4 border-indigo-500 p-5 rounded-xl mb-6 hover:shadow-xl transition"
//               >
//                 <h2 className="text-xl font-semibold text-indigo-800 mb-2 flex items-center gap-2 capitalize">
//                   {key.toLowerCase().includes('eligibility') ? (
//                     <GraduationCap className="text-indigo-500" />
//                   ) : key.toLowerCase().includes('purpose') ? (
//                     <Info className="text-purple-500" />
//                   ) : (
//                     <BookOpen className="text-indigo-600" />
//                   )}
//                   {key.replace(/_/g, ' ')}
//                 </h2>
//                 <div className="text-gray-700 text-base leading-relaxed">
//                   {renderValue(value)}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Panel */}
//         {!showOnlyCards && (
//           <div className="col-span-12 md:col-span-2 hidden md:block">
//             <RightPanel />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
