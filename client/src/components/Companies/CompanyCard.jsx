


import React from 'react';
import { FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';

const CompanyCard = (company) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <img
            src={ company.image || "https://via.placeholder.com/150" }
            alt= { company.company_name }
            className="w-8 h-8"
          />
          <h2 className="text-xl font-semibold">{ company.company_name }</h2>
        </div>
        <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full">Technology</span>
      </div>

      {/* Opportunities */}
      <div className="mb-3">
        <h3 className="font-semibold text-md mb-1">Opportunities</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {company.opportunities && company.opportunities.length > 0 ? (
            company.opportunities.map((opportunity, idx) => (
              <li key={idx}>{opportunity}</li>
            ))
          ) : (
            <li>No opportunities listed</li>
          )}
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold text-md mb-1">Job Roles</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {company.job_roles && company.job_roles.length > 0 ? (
            company.job_roles.map((job_role, idx) => (
              <li key={idx}>{job_role}</li>
            ))
          ) : (
            <li>No job roles listed</li>
          )}
        </ul>
      </div>

      {/* Recruitment Process */}
      <div className="mb-3">
        <h3 className="font-semibold text-md mb-1">Recruitment Process</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {company.recruitment_process && company.recruitment_process.length > 0 ? (
            company.recruitment_process.map((process, idx) => (
              <li key={idx}>{process}</li>
            ))
          ) : (
            <li>No process listed</li>
          )}
        </ul>
      </div>

      {/* Location & Icons */}
      <div>
        <h3 className="font-semibold text-md mb-1">Location</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          {company.location && company.location.length > 0 ? (
            company.location.map((location, idx) => (
              <li key={idx}>{location}</li>
            ))
          ) : (
            <li>No location listed</li>
          )}
        </ul>
        <div className="flex justify-end gap-4 mt-1">
          {company.socialmedia_links.linkedin && (
            <a href={company.socialmedia_links.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-700 cursor-pointer" size={20} />
            </a>
          )}
          {company.socialmedia_links.twitter && (
            <a href={company.socialmedia_links.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-400 cursor-pointer" size={20} />
            </a>
          )}
          {company.socialmedia_links.website && (
            <a href={company.socialmedia_links.website} target="_blank" rel="noopener noreferrer">
              <FaLink className="text-gray-600 cursor-pointer" size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
