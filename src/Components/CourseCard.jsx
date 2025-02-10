import React from "react";
import { Link } from "react-router-dom";


const CourseCard = ({ course, onClick }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 shadow-md text-center">
      <img src={course.brochure} alt={course.name} className="w-full h-32 object-cover rounded-md" />
      <h3 className="font-semibold text-lg mt-2">{course.name}</h3>
      <p className="text-gray-600 text-sm">{course.category}</p>
      <p className="text-gray-600 text-sm">{course.fees}</p>
      <Link to={`/${course.name}`} state={{course}}>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        
      >
        Preview
      </button>
      </Link>
    </div>
  );
};

export default CourseCard;
