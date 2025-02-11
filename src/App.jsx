import { BrowserRouter, Route, Routes } from "react-router-dom";

import Filter from "./Components/Filter";
import Footer from "./Components/Footer";
import React, { useState } from "react";
import Header from "./Components/Header";
// import SearchBar from "./Components/SearchBar";

import CourseList from "./Components/CourseList";

import CounselorList from "./Components/CounselorList";

import "./global.css";
import FilterSection from "./Components/Filtersection";
import CourseDetailsPage from "./Pages/CourseDetailsPage";



// const filterData = [
//   { name: "Medical Doctor", img: "./Assets/doctor.jpg" },
//   { name: "Dentist", img: "./Assets/dentist.jpg" },
//   { name: "Pharmacist", img: "./Assets/pharmacist.jpg" },
//   { name: "Nurses", img: "./Assets/nurses.jpg" },
//   { name: "Physiotherapist", img: "./Assets/physiotherapist.jpg" },
//   { name: "Optometrist", img: "./Assets/optometrist.jpg" },
//   { name: "Lab Technician", img: "./Assets/labtech.jpg" }
// ];
// const counselors = [
//   { 
//       name: 'Manish', 
//       id: '2234', 
//       designation: 'Sales', 
//       qualifications: 'MBA in Marketing', 
//       experience: '5 years in sales and counseling', 
//       contact: 'manish@example.com',
//       bio: 'Manish has extensive experience in sales and customer relationship management. He is passionate about helping individuals make informed decisions about their careers.'
//   },
//   { 
//       name: 'Sneha', 
//       id: '5678', 
//       designation: 'Sales', 
//       qualifications: 'B.Tech in Computer Science', 
//       experience: '3 years in technical sales and consulting', 
//       contact: 'sneha@example.com',
//       bio: 'Sneha specializes in technical sales and has worked with several tech companies. She is dedicated to understanding clients’ needs and providing them with the best solutions.'
//   },
//   { 
//       name: 'Rajdeep', 
//       id: '9012', 
//       designation: 'Sales', 
//       qualifications: 'BBA in Sales and Marketing', 
//       experience: '8 years in sales and management', 
//       contact: 'rajdeep@example.com',
//       bio: 'Rajdeep brings 8 years of experience in sales and management. He has a deep understanding of customer behavior and works closely with clients to help them achieve their goals.'
//   }
// ];
function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <>

            <>
              <FilterSection />
              {/* <SearchBar /> */}
              {/* <CourseList courses={courses}   /> */}
            </>



          </>
        } />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/counselors" element={<CounselorList />} />

        <Route path="/preview/:name" element={<Filter />} />
        <Route path="/:courseName" element={<CourseDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
