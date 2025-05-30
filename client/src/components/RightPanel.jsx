import React from 'react';

const RightPanel = () => {
  return (
    <div className="sticky top-20 bg-white rounded-lg shadow p-4 text-sm">
      <h3 className="text-lg font-bold text-indigo-700 mb-3">Helpful Links</h3>
      <ul className="space-y-1 text-indigo-600">
        <li><a href="https://www.buddy4study.com/" className="hover:underline">Scholarship Info</a></li>
        <li><a href="https://www.topuniversities.com/university-rankings" className="hover:underline">Universities Ranking</a></li>
        <li><a href="https://www.mynextmove.org/" className="hover:underline">My Next Move</a></li>
        <li><a href="https://www.youth4work.com/" className="hover:underline">Showcase Your Talent</a></li>
      </ul>
    </div>
  );
};

export default RightPanel;


// import React from 'react';

// const RightPanel = () => {
//   return (
//     <div className="sticky top-4 bg-white rounded-lg shadow p-4">
//       <h3 className="text-lg font-bold text-indigo-700 mb-2">Helpful Links</h3>
//       <ul className="text-sm text-indigo-600 space-y-1">
//         <li><a href="#" className="hover:underline">Scholarship Info</a></li>
//         <li><a href="#" className="hover:underline">Top Courses</a></li>
//         <li><a href="#" className="hover:underline">Career Guidance</a></li>
//         <li><a href="#" className="hover:underline">Mock Tests</a></li>
//       </ul>
//     </div>
//   );
// };

// export default RightPanel;
