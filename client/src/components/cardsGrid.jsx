import React, { useState } from "react";
import { cardsData } from "../data/cardsData";
import jobData from "../data/jobs_data.json";

const CardsGrid = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleExploreMore = (card) => {
    setSelectedCard(card);
  };

  const handleGoBack = () => {
    setSelectedCard(null);
  };
  if (selectedCard) {

    const formatTitleToKey = (title) => {
      return title.replace(/\s+/g, "_"); // replaces spaces with underscores
    };

    const categoryKey = formatTitleToKey(selectedCard.title); // "Law_And_Government"
    const jobsForCategory = jobData[categoryKey] || [];

    return (

      <div className="max-w-6xl mx-auto bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-lg p-8 mt-6">
        <div className="mb-6">
          <button
            onClick={handleGoBack}
            className="text-indigo-700 font-semibold hover:underline hover:text-indigo-900 transition flex items-center"
          >
            ⬅️ Go Back to Fields
          </button>
        </div>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
          {/* Image */}
          <img
            src={`/images/${selectedCard.image}`}
            alt={selectedCard.title}
            className="w-150 h-50 object-cover  shadow-xl border-4 border-indigo-300"
          />

          {/* Title and Description */}
          <div className="text-center lg:text-center">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 text-transparent bg-clip-text mb-3">
              {selectedCard.title}
            </h2>
            <p className="text-gray-700 text-lg italic">{selectedCard.description}</p>
          </div>
        </div>

        {/* More Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-inner border border-indigo-100 mb-10">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">About This Field:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {selectedCard.moreInfo.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>

        {/* Jobs List Section */}
        {jobsForCategory.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Job Opportunities</h3>
            {jobsForCategory.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl border-l-4 border-indigo-500">
                <div className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg sm:text-xl font-semibold px-5 py-2 rounded-full shadow-md mb-4 border-2 border-white">
                  🌟 {job.job_name}
                </div>
                <p className="text-gray-700 mb-3">{job.job_description}</p>

                <div className="mb-2">
                  <strong className="text-indigo-600">Eligibility:</strong> {job.eligibility}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <strong className="text-indigo-600">Skills Required:</strong>
                    <ul className="list-disc pl-5 text-gray-600">
                      {job.skills_required.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-indigo-600">Education Path:</strong>
                    <ul className="list-disc pl-5 text-gray-600">
                      {job.education_path.map((edu, idx) => (
                        <li key={idx}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <strong className="text-indigo-600">Related Exams:</strong>
                    <ul className="list-disc pl-5 text-gray-600">
                      {job.related_exams.map((exam, idx) => (
                        <li key={idx}>{exam}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-indigo-600">Career Growth:</strong>
                    <ul className="list-disc pl-5 text-gray-600">
                      {job.career_growth.map((growth, idx) => (
                        <li key={idx}>{growth}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <strong className="text-indigo-600">Companies Hiring:</strong>
                  <ul className="list-disc pl-5 text-gray-600">
                    {job.companies_hiring.map((company, idx) => (
                      <li key={idx}>{company}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-right text-indigo-700 font-semibold mt-4">
                  💰 Salary: {job.salary_range}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleGoBack}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition"
          >
            ⬅️ Go Back To Fields
          </button>
        </div>
      </div>
    );
  }


  // Default: show all cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-6">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md overflow-hidden "
        >
          <img
            src={`/images/${card.image}`}
            alt={card.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-center">{card.title}</h2>
            <h4 className="text-gray-600">{card.description}</h4>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleExploreMore(card)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Explore More
              </button>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsGrid;
