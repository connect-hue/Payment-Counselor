import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, onPreview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.name} course={course} onClick={onPreview} />
      ))}
    </div>
  );
};

export default CourseList;
