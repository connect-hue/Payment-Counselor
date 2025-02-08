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

const counselors = [{ name: "Manish", id: "2234", designation: "Sales", contact: "manish@example.com" }];

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
