import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";

const filterData = [
  { name: "All" },
  { name: "New Zealand" },
  { name: "Australia" },
  { name: "United States" },
  { name: "India" }
];

const courses = [
  { name: 'AMC Exam Preparation Course', category: 'Doctor', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '1000 AUD', students: '1000+' },
  { name: 'Pharmacy Exam', category: 'Pharmacist', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '800 AUD', students: '800+' },
  { name: 'Nursing Exam', category: 'Nurses', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '700 AUD', students: '700+' },
  { name: 'AMC Exam Preparation Course', category: 'Doctor', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '1000 AUD', students: '1000+' },
  { name: 'Pharmacy Exam', category: 'Pharmacist', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '800 AUD', students: '800+' },
  { name: 'Nursing Exam', category: 'Nurses', description: ' Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease', brochure: './client/public/Assets/Courses/06-trinity college dublin.jpeg', fees: '700 AUD', students: '700+' }
];

const Filter = () => {
  const { name } = useParams();  
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (location) => {
    setSelectedFilter(location);
    if (location === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.country === location);
      setFilteredCourses(filtered);
    }
  };

  return (
    <>
      <h1 className="text-2xl mt-24 font-bold px-4">{name}</h1> 
      <SearchBar/>
      <div className="flex justify-center flex-wrap gap-4 my-4">
        {filterData.map((filter) => (
          <button
            key={filter.name}
            className={`px-4 py-2 rounded-md hover:bg-blue-600 text-white ${selectedFilter === filter.name ? "bg-blue-700" : "bg-blue-500"}`}
            onClick={() => handleFilterClick(filter.name)}
          >
            {filter.name}
          </button>
        ))}
      </div>
      <CourseList courses={filteredCourses} />
    </>
  );
};

export default Filter;
