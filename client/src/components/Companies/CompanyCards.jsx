import React from 'react';
import CompanyGrid from './CompanyGrid'; // Ensure this path is correct
import companiesData from '../../data/companies_data.json'; // path must be correct

const CompanyCards = ({ field }) => {
  const data = companiesData[field];

  if (!data) {
    return <div className="text-red-500 p-4">No career data found for "{field}".</div>;
  }

  // If a single card, wrap it in an array
  const companies = Array.isArray(data) ? data : [data];

  return <CompanyGrid companies={companies} />;
};

export default CompanyCards;
