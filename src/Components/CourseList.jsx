import React, { useState } from "react";
import CourseCard from "./CourseCard";
import CourseDetails from "./CourseDetails";



const CourseList = ({ courses = [] }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className={`p-8 ${courses.length > 4 ? '' : 'h-screen'} `}>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-4 overflow-auto z-0 relative p-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} onClick={() => setSelectedCourse(course)} />
        ))}
      </div>
      {selectedCourse && (
        <CourseDetails course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default CourseList;
