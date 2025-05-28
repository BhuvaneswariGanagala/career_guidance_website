// src/components/CollegeDetails.jsx
import React from 'react';

const CollegeDetails = ({ college }) => {
  if (!college) return <div>Select a college to view details.</div>;

  const {
    college_name,
    type,
    established_year,
    location,
    contact_info,
    accreditation,
    courses_offered,
    admission_details,
    facilities,
    rankings_reviews,
    placement_info,
    scholarships,
    clubs_activities,
    media
  } = college;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-800 mb-2">{college_name}</h1>
      <p className="text-gray-700">Established: {established_year} | Type: {type}</p>
      <p className="text-gray-700">
        Location: {location.city}, {location.state}, {location.country}
      </p>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Accreditations</h2>
      <ul className="list-disc ml-6 text-gray-600">{accreditation.map((acc, i) => <li key={i}>{acc}</li>)}</ul>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Courses Offered</h2>
      <div>
        <h3 className="font-semibold mt-2">Undergraduate:</h3>
        {courses_offered.undergraduate.map((course, i) => (
          <p key={i} className="ml-4">🎓 {course.course_name}</p>
        ))}
        <h3 className="font-semibold mt-2">Postgraduate:</h3>
        {courses_offered.postgraduate.map((course, i) => (
          <p key={i} className="ml-4">🎓 {course.course_name}</p>
        ))}
        <h3 className="font-semibold mt-2">Diploma & Certificate:</h3>
        {courses_offered.diploma_certificate.map((course, i) => (
          <p key={i} className="ml-4">🎓 {course.course_name}</p>
        ))}
      </div>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Contact Info</h2>
      <p>📧 {contact_info.email}</p>
      <p>📞 {contact_info.phone}</p>
      <p>🌐 <a href={contact_info.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{contact_info.website}</a></p>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Facilities</h2>
      <ul className="list-disc ml-6 text-gray-600">{facilities.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Placements</h2>
      <p>🎯 Highest Package: {placement_info.highest_package_lpa} LPA</p>
      <p>📈 Average: {placement_info.average_package_lpa} LPA</p>
      <p>✅ Placement Rate: {placement_info.placement_percentage}%</p>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Scholarships</h2>
      <ul className="list-disc ml-6 text-gray-600">{scholarships.map((sch, i) => <li key={i}>{sch}</li>)}</ul>

      <h2 className="text-xl mt-4 font-semibold text-indigo-700">Media</h2>
      <div className="flex gap-4 mt-2 flex-wrap">
        {media.photos.map((url, i) => (
          <img key={i} src={url} alt="Campus" className="w-40 h-24 object-cover rounded" />
        ))}
      </div>
      <p className="mt-2"><a href={media.video_tour_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">🎥 Virtual Tour</a></p>
    </div>
  );
};

export default CollegeDetails;
