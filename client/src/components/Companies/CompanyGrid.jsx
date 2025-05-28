// src/components/CompanyGrid.jsx
import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyGrid = ({ companies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
      {companies.map(company => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
};

export default CompanyGrid;
