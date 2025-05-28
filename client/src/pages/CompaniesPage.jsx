// src/pages/Companies.jsx

import React, { useState } from 'react';
import CompanyLeftSideBar from '../components/Companies/CompanyLeftSideBar';
import RightPanel from '../components/RightPanel';
import CompanyCards from '../components/Companies/CompanyCards';

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
  "teaching"
];

export const CompaniesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('agriculture');

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-pink-50 font-sans">
      <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto px-4 py-6">

        {/* Left Sidebar */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 h-fit md:h-screen">
          <CompanyLeftSideBar
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-6 lg:col-span-8 max-h-[calc(100vh)] overflow-y-auto pr-1">
          <CompanyCards field={selectedCategory} />
        </div>

        {/* Right Panel */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 hidden md:block">
          <RightPanel />
        </div>

      </div>
    </div>
  );
};
