import React from "react";

const CourseDetails = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg relative">
        <button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold">{course.name}</h2>
        <p className="mt-2">{course.description}</p>
        <p className="mt-2"><strong>Fees:</strong> {course.fees}</p>
        <p className="mt-2"><strong>Students:</strong> {course.students}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
