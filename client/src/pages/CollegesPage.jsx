import React, { useState, useMemo, useEffect } from 'react';
import collegesData from '../data/colleges_data.json';
import {
  FaUniversity, FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope,
  FaAward, FaBook, FaTools, FaChalkboardTeacher, FaCertificate,
  FaUserGraduate, FaBuilding, FaLink, FaSearch, FaTimes
} from 'react-icons/fa';
import CollegeLeftSidebar from '../components/CollegeLeftSidebar';

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredColleges = useMemo(() => {
    if (!searchTerm.trim()) return collegesData;
    const lowerSearch = searchTerm.toLowerCase();
    return collegesData.filter(college =>
      college.college_name.toLowerCase().includes(lowerSearch) ||
      college.location.city.toLowerCase().includes(lowerSearch) ||
      college.location.state.toLowerCase().includes(lowerSearch) ||
      college.location.country.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  useEffect(() => {
    if (selectedIndex >= filteredColleges.length) {
      setSelectedIndex(0);
    }
  }, [filteredColleges, selectedIndex]);

  const selectedCollege = filteredColleges[selectedIndex] || null;

  return (
    
    <div className="flex flex-col h-screen md:flex-row min-h-screen not-last:bg-gradient-to-br from-indigo-50 to-purple-100 font-sans overflow-y-auto">
      <div className="flex flex-1 max-w-7xl mx-auto rounded-2xl shadow-xl bg-white flex-col md:flex-row overflow-hidden">

        {/* Sidebar */}
        <div className="border-indigo-100 md:border-r overflow-x-auto md:overflow-y-auto border-b md:border-b-0 bg-indigo-50 flex md:flex-col scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
          <CollegeLeftSidebar
            colleges={filteredColleges}
            selected={selectedIndex}
            onSelect={setSelectedIndex}
            className="flex md:flex-col"
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6">
          {/* Search Bar */}
          <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl flex items-center px-4 py-2 mb-6">
            <FaSearch className="text-indigo-500 mr-3 text-lg shrink-0" />
            <input
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search colleges by name, city, or state..."
              className="flex-grow text-base sm:text-lg px-3 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-gray-400 hover:text-indigo-500 transition shrink-0"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* College Details */}
          {selectedCollege ? (
            <article className="p-4 sm:p-8 space-y-6 max-w-6xl mx-auto">

              {/* Header */}
              <header>
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-1 flex items-center gap-3 flex-wrap">
                  <FaUniversity className="flex-shrink-0" /> {selectedCollege.college_name}
                </h1>
                <p className="text-gray-600 flex items-center gap-2 flex-wrap">
                  <FaMapMarkerAlt /> {selectedCollege.location.city}, {selectedCollege.location.state}, {selectedCollege.location.country}
                </p>
                <p className="text-sm text-gray-500 mt-1">Established in {selectedCollege.established_year}</p>
              </header>

              {/* Grid Sections */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                {/* Accreditation */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaAward /> Accreditation</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedCollege.accreditation.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>

                {/* Courses */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaBook /> Courses</h2>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">🎓 Undergraduate:</p>
                    {selectedCollege.courses_offered.undergraduate.map((c, i) => <p key={i} className="ml-4">• {c.course_name}</p>)}
                    <p className="font-medium mt-2">🎓 Postgraduate:</p>
                    {selectedCollege.courses_offered.postgraduate.map((c, i) => <p key={i} className="ml-4">• {c.course_name}</p>)}
                    <p className="font-medium mt-2">📜 Diploma/Certificate:</p>
                    {selectedCollege.courses_offered.diploma_certificate.map((c, i) => <p key={i} className="ml-4">• {c.course_name}</p>)}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaTools /> Facilities</h2>
                  <ul className="grid grid-cols-2 gap-1 text-gray-700 list-disc list-inside">
                    {selectedCollege.facilities.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                {/* Placements */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaChalkboardTeacher /> Placements</h2>
                  <div className="text-gray-700">
                    <p>🎯 <strong>Highest Package:</strong> {selectedCollege.placement_info.highest_package_lpa} LPA</p>
                    <p>📈 <strong>Average Package:</strong> {selectedCollege.placement_info.average_package_lpa} LPA</p>
                    <p>✅ <strong>Placement %:</strong> {selectedCollege.placement_info.placement_percentage}%</p>
                    <p>🏢 <strong>Top Recruiters:</strong> {selectedCollege.placement_info.top_recruiters.join(', ')}</p>
                  </div>
                </div>

                {/* Scholarships */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaCertificate /> Scholarships</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedCollege.scholarships.map((sch, i) => <li key={i}>{sch}</li>)}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaEnvelope /> Contact</h2>
                  <div className="text-gray-700 space-y-1 break-words">
                    <p><FaGlobe className="inline mr-1" /> <a href={selectedCollege.contact_info.website} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{selectedCollege.contact_info.website}</a></p>
                    <p><FaPhone className="inline mr-1" /> {selectedCollege.contact_info.phone}</p>
                    <p><FaEnvelope className="inline mr-1" /> {selectedCollege.contact_info.email}</p>
                  </div>
                </div>

                {/* Clubs & Fests */}
                <div className="sm:col-span-2">
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaUserGraduate /> Clubs & Fests</h2>
                  <p><strong>Technical:</strong> {selectedCollege.clubs_activities.technical_clubs.join(', ')}</p>
                  <p><strong>Cultural:</strong> {selectedCollege.clubs_activities.cultural_clubs.join(', ')}</p>
                  <p><strong>Fests:</strong> {selectedCollege.clubs_activities.fests.join(', ')}</p>
                  <p><strong>Entrepreneurship Cell:</strong> {selectedCollege.clubs_activities.entrepreneurship_cell ? 'Yes' : 'No'}</p>
                </div>

                {/* Gallery */}
                {/* Gallery */}
                <div className="sm:col-span-2">
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2"><FaBuilding /> Gallery</h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {selectedCollege.media.photos.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Campus photo ${i + 1}`}
                        className="w-full max-w-xs h-32 sm:h-40 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                  <a
                    href={selectedCollege.media.video_tour_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-blue-700 underline text-sm"
                  >
                    <FaLink /> Watch Virtual Tour
                  </a>
                </div>


              </section>
            </article>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-xl p-4">
              No colleges found matching your search.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollegesPage;
