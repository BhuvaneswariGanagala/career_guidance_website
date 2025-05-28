
import React, { useState } from 'react';

const Collapsible = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-3 h-full relative' >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer select-none bg-indigo-100 rounded-md px-3 py-2 hover:bg-indigo-200 transition"
      >
        <span className="mr-2 text-indigo-600 font-semibold">
          {isOpen ? '▼' : '▶️'}
        </span>
        <span className="font-semibold text-indigo-700 capitalize">{label}</span>
      </div>
      {isOpen && (
        <div className="pl-6 mt-2 border-l-2 border-indigo-300">
          {children}
        </div>
      )}
    </div>
  );
};

const renderValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      typeof item === 'object' ? (
        <Collapsible key={index} label="">
          {renderValue(item)}
        </Collapsible>
      ) : (
        <div key={index} className="text-gray-800 py-1">{item}</div>
      )
    ));
  } else if (typeof value === 'object' && value !== null) {
    return Object.entries(value).map(([k, v]) => (
      <Collapsible key={k} label={k.replace(/_/g, ' ')}>
        {renderValue(v)}
      </Collapsible>
    ));
  }
  return <div className="text-gray-800 py-1">{value}</div>;
};

export { Collapsible, renderValue };
// import React, { useState } from 'react';

//  const Collapsible = ({ label, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mb-3">
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center cursor-pointer select-none bg-indigo-100 rounded-md px-3 py-2 hover:bg-indigo-200 transition"
//       >
//         <span className="mr-2 text-indigo-600 font-semibold">
//           {isOpen ? '▼' : '▶️'}
//         </span>
//         <span className="font-semibold text-indigo-700 capitalize">{label}</span>
//       </div>
//       {isOpen && (
//         <div className="pl-6 mt-2 border-l-2 border-indigo-300">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

//  const renderValue = (value) => {
//   if (Array.isArray(value)) {
//     return value.map((item, index) => (
//       typeof item === 'object' ? (
//         <Collapsible key={index} label="">
//           {renderValue(item)}
//         </Collapsible>
//       ) : (
//         <div key={index} className="text-gray-800 py-1">{item}</div>
//       )
//     ));
//   } else if (typeof value === 'object' && value !== null) {
//     return Object.entries(value).map(([k, v]) => (
//       <Collapsible key={k} label={k.replace(/_/g, ' ')}>
//         {renderValue(v)}
//       </Collapsible>
//     ));
//   }
//   return <div className="text-gray-800 py-1">{value}</div>;
// };
// export { Collapsible, renderValue };