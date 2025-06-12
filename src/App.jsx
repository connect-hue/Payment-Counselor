import { BrowserRouter, Route, Routes } from "react-router-dom";
import Filter from "./Components/Filter";
import Footer from "./Components/Footer";
import { useEffect } from "react";
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

  const imagesToPreload = [
    '/CourseImage/ADC.svg',
    '/CourseImage/AMCclinical.svg',
    '/CourseImage/AMCcrash.svg',
    '/CourseImage/AMCexam.svg',
    '/CourseImage/APC Exam Course.svg',
    '/CourseImage/Australian Pharmacy Intern.svg',
    '/CourseImage/bple.svg',
    '/CourseImage/DHA EXAM Preparation Course for Pharmacists.svg',
    '/CourseImage/DOH Exam Course.svg',
    '/CourseImage/GPAT EXAM.svg',
    '/CourseImage/Gpat.png',
    '/CourseImage/HCPC Exam Course.svg',
    '/CourseImage/Kuwait EXAM Preparation Course.svg',
    '/CourseImage/MOH EXAM.svg',
    '/CourseImage/NCLEX.svg',
    '/CourseImage/NCLEXExamCrashCourse.svg',
    '/CourseImage/New Zealand OPRA EXAM COURSE.svg',
    '/CourseImage/newzealandopra.png',
    '/CourseImage/NIPER JEE EXAM Preparation Course.svg',
    '/CourseImage/Niper.png',
    '/CourseImage/niper.svg',
    '/CourseImage/nzrex.svg',
    '/CourseImage/OCANZ.svg',
    '/CourseImage/OMAN Prometric Exam.svg',
    '/CourseImage/OPRA EXAM CRASH COURSE.svg',
    '/CourseImage/OPRA EXAM Preparation Course.svg',
    '/CourseImage/Opra.png',
    '/CourseImage/opracrash.png',
    '/CourseImage/PEBC EXAM.svg',
    '/CourseImage/PLAB.svg',
    '/CourseImage/USMLE.svg',
    '/CourseImage/SPLE EXAM.svg',
    '/CourseImage/Qatar Primetric Exam.svg',
    '/CourseImage/PSI Pharmacy Equivalence EXAM.svg',
    '/CounselorsImages/image (1).png',
    '/CounselorsImages/image (2).png',
    '/CounselorsImages/image (3).png',
    '/CounselorsImages/image (4).png',
    '/CounselorsImages/image (5).png',
    '/CounselorsImages/image (6).png',
    '/CounselorsImages/image (7).png',
    '/CounselorsImages/image (8).png',
    '/CounselorsImages/image (9).png',
    '/CounselorsImages/image (10).png',
    '/Assets/dentist.png',
    '/Assets/doctor.png',
    '/Assets/healthcare.png',
    '/Assets/labtech.png',
    '/Assets/logo.svg',
    '/Assets/nurses.png',
    '/Assets/optometrist.png',
    '/Assets/pharmacist.png',
    '/Assets/physiotherapist.png'
  ];

  useEffect(() => {
    // Preload each image in the imagesToPreload array
    imagesToPreload.forEach((img) => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = img;
      preloadLink.as = 'image';
      document.head.appendChild(preloadLink);

      // Cleanup the preload link on unmount
      return () => {
        document.head.removeChild(preloadLink);
      };
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <>

            <div className="">
              <FilterSection />
              {/* <SearchBar /> */}
              {/* <CourseList courses={courses}   /> */}
            </div>



          </>
        } />
        <Route path="/courses" element={<CourseList />} />
        {/* <Route path="/counselors" element={<CounselorList />} /> */}

        <Route path="/preview/:name" element={<Filter />} />
        <Route path="/:courseName" element={<CourseDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
