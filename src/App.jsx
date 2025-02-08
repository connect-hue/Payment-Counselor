import React, { useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Filter from "./Components/Filter";
import CourseList from "./Components/CourseList";
import CourseDetails from "./Components/CourseDetails";
import CounselorList from "./Components/CounselorList";
import Footer from "./Components/Footer";
import "./global.css";

const courses = [
  { name: "AMC Exam", category: "Doctor", description: "Top AMC coaching...", brochure: "./doctor.jpg", fees: "1000 AUD", students: "1000+" },
  { name: "Pharmacy Exam", category: "Pharmacist", description: "Best Pharmacy prep...", brochure: "./pharmacist.jpg", fees: "800 AUD", students: "800+" }
];

const counselors = [
  { 
      name: 'Manish', 
      id: '2234', 
      designation: 'Sales', 
      qualifications: 'MBA in Marketing', 
      experience: '5 years in sales and counseling', 
      contact: 'manish@example.com',
      bio: 'Manish has extensive experience in sales and customer relationship management. He is passionate about helping individuals make informed decisions about their careers.'
  },
  { 
      name: 'Sneha', 
      id: '5678', 
      designation: 'Sales', 
      qualifications: 'B.Tech in Computer Science', 
      experience: '3 years in technical sales and consulting', 
      contact: 'sneha@example.com',
      bio: 'Sneha specializes in technical sales and has worked with several tech companies. She is dedicated to understanding clients’ needs and providing them with the best solutions.'
  },
  { 
      name: 'Rajdeep', 
      id: '9012', 
      designation: 'Sales', 
      qualifications: 'BBA in Sales and Marketing', 
      experience: '8 years in sales and management', 
      contact: 'rajdeep@example.com',
      bio: 'Rajdeep brings 8 years of experience in sales and management. He has a deep understanding of customer behavior and works closely with clients to help them achieve their goals.'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div>
      <Header setActiveTab={setActiveTab} />
      {activeTab === "courses" && (
        <>
          <SearchBar />
          <Filter filterData={courses} />
          <CourseList courses={courses} onPreview={setSelectedCourse} />
        </>
      )}
      {activeTab === "counselors" && <CounselorList counselors={counselors} />}
      {selectedCourse && <CourseDetails course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      <Footer />
    </div>
  );
}

export default App;
