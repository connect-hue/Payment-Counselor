import React, { useState } from "react";
import userImage from '../assets/user.jpg';
import imageCourse from '../assets/imagecourse.png'
const counselors = [
  {
    name: 'Anshika Bhandari',
    id: 'IT05',
    designation: 'Counselor',
    qualifications: ['Dentist'],
    experience: '2 years in academic counseling',
    contact: 'anshikab@academically.com',
    userImage: '/Counsellors/Anshika Bhandari - FRONT.jpg',
    counselorImage: '/CounselorsImages/anshika1.png',
    bio: 'Anshika is committed to guiding students in choosing the right academic paths.'
  },
  {
    name: 'Suryasnata Mukherjee',
    id: '1072',
    designation: 'Counselor',
    qualifications: ['Dentist', 'Pharmacist'],
    experience: '4 years in counseling and mentoring',
    contact: 'suryasnatam@academically.com',
    userImage: '/Counsellors/Suryasnata Mukherjee - FRONT.jpg',
    counselorImage: '/CounselorsImages/suryasnata1.png',
    bio: 'Suryasnata excels in student psychology and provides personalized support.'
  },
  {
    name: 'Sadaf Fatima',
    id: '1120',
    designation: 'Counselor',
    qualifications: ['Dentist', 'Pharmacist'],
    experience: '3 years in international education consulting',
    contact: 'sadaff@academically.com',
    userImage: '/Counsellors/Sadaf Fatima - FRONT.jpg',
    counselorImage: '/CounselorsImages/sadaf.png',
    bio: 'Sadaf helps students navigate international education opportunities.'
  },
  {
    name: 'Muskaan Gupta',
    id: '1070',
    designation: 'Counselor',
    qualifications: ['Doctor'],
    experience: '2.5 years in student counseling',
    contact: 'muskaang@academically.com',
    userImage: '/Counsellors/Muskaan Gupta - FRONT.jpg',
    counselorImage: '/CounselorsImages/muskan2.png',
    bio: 'Muskaan is passionate about connecting students with the right programs.'
  },
  {
    name: 'Sneha Pandey',
    id: '1077',
    designation: 'Counselor',
    qualifications: ['Doctor', 'Pharmacist'],
    experience: '3 years in technical sales and consulting',
    contact: 'snehap@academically.com',
    userImage: '/Counsellors/Sneha Pandey - FRONT.jpg',
    counselorImage: '/CounselorsImages/sneha1.png',
    bio: 'Sneha specializes in technical sales and has worked with several tech companies. She is dedicated to understanding clients’ needs and providing them with the best solutions.'
  },
  {
    name: 'Aditya Kumar Singh',
    id: 'Not in the list',
    designation: 'Counselor',
    qualifications: ['Doctor'],
    experience: '4 years in education and HR advisory',
    contact: 'aditya.singh@academically.com',
    userImage: '/Counsellors/Aditya Kumar Singh - FRONT.jpg',
    counselorImage: '/CounselorsImages/aditya1.png',
    bio: 'Aditya provides expert advice in academic and career planning.'
  },
  {
    name: 'Abhilasha Sharma',
    id: '1119',
    designation: 'Counselor',
    qualifications: ['Dentist'],
    experience: '5 years in student mentoring',
    contact: 'abhilashas@academically.com',
    userImage: '/Counsellors/Abhilasha Sharma - FRONT.jpg',
    counselorImage: '/CounselorsImages/abhilasha.png',
    bio: 'Abhilasha supports students through mental health and career guidance.'
  },
  {
    name: 'Manish Bora',
    id: '1069',
    designation: 'Counselor',
    qualifications: ['Pharmacist'],
    experience: '5 years in sales and counseling',
    contact: 'manishb@academically.com',
    userImage: '/Counsellors/Manish Bora  - FRONT.jpg',
    counselorImage: '',
    bio: 'Manish has extensive experience in sales and customer relationship management. He is passionate about helping individuals make informed decisions about their careers.'
  },
  {
    name: 'Syed Saif Imam',
    id: '1117',
    designation: '*** id card not found',
    qualifications: ['Pharmacist'],
    experience: '3 years in career coaching',
    contact: 'saifs@academically.com',
    userImage: '',
    counselorImage: '/CounselorsImages/syed.png',
    bio: 'Syed Saif Imam works closely with students on career path alignment.'
  },

  {
    name: 'MOHD ZAID KHAN',
    id: '1T01',
    designation: 'Counselor',
    qualifications: ['Pharmacist'],
    experience: '3 years in student support',
    contact: 'zaidk@academically.com',
    userImage: '/Counsellors/Mohd Zaid Khan - FRONT.jpg',
    counselorImage: '/CounselorsImages/zaid.png',
    bio: 'Zaid helps streamline admission and counseling processes.'
  },

  {
    name: 'Asra Mansuri',
    id: 'IT04',
    userImage: '/Counsellors/Asra Mansuri - FRONT.jpg',
    designation: 'Counselor',
    qualifications: ['Pharmacist', 'Optometrist'],
    experience: '2.5 years in student support',
    contact: 'asram@academically.com',
    counselorImage: '/CounselorsImages/asra.png',
    bio: 'Asra Mansuri provides empathetic and insightful guidance to students.'
  },
  {
    name: 'Eesha',
    id: '1118',
    designation: 'Counselor',
    qualifications: ['Physiotherapist'],
    experience: '2 years in student services',
    contact: 'eeshas@academically.com',
    userImage: '/Counsellors/Eesha - FRONT.jpg',
    counselorImage: '/CounselorsImages/eesha.png',
    bio: 'Eesha actively works with students to improve career outcomes.'
  },
  {
    name: 'Surya Pratap Singh',
    id: 'XXXX14',
    designation: 'Counselor',
    qualifications: ['Physiotherapist'],
    experience: '6 years in advising roles',
    contact: 'suryas@academically.com',
    counselorImage: '/CounselorsImages/surya.png',
    userImage: '',
    bio: 'Surya Pratap ensures students receive the best opportunities abroad.'
  },
  {
    name: 'Dilpreet Singh',
    id: '1067',
    designation: 'Counselor',
    qualifications: ['Physiotherapist', 'Pharmacist'],
    experience: '4 years in academic consulting',
    contact: 'dilpreets@academically.com',
    userImage: '/Counsellors/Dilpreet Singh - FRONT.jpg',
    counselorImage: '/CounselorsImages/dilpreet.png',
    bio: 'Dilpreet is focused on results-driven career counseling.'
  },
  {
    name: 'Rajdeep A',
    id: '1093',
    designation: 'Counselor',
    qualifications: ['Physiotherapist', 'Pharmacist'],
    experience: '8 years in sales and management',
    contact: 'rajdeepa@academically.com',
    userImage: '/Counsellors/Rajdeep Auravindam  - FRONT.jpg',
    counselorImage: '/CounselorsImages/rajdeep1.png',
    bio: 'Rajdeep has 8 years of experience in sales and management, specializing in customer relations and goal-oriented solutions.'
  },
  {
    name: 'Surbhi Chandan',
    id: '1099',
    designation: 'Counselor',
    qualifications: ['Physiotherapist', 'Pharmacist'],
    experience: '3 years in HR and academic support',
    contact: 'surbhic@academically.com',
    userImage: '/Counsellors/Surbhi Chandan - FRONT.jpg',
    counselorImage: '/CounselorsImages/surbhi.png',
    bio: 'Surbhi brings a unique blend of HR expertise and student engagement.'
  },
  {
    name: 'Manas Vikas ',
    id: '1047',
    designation: 'Counselor',
    qualifications: ['Doctor'],
    experience: '2 years in career support',
    contact: 'manasv@academically.com',
    userImage: '/Counsellors/Manas Vikas - FRONT.jpg',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  },
  {
    name: 'Swati Periwal',
    id: '1049',
    designation: 'Counselor',
    qualifications: ['Doctor'],
    experience: '2 years in career support',
    contact: 'swatip@academically.com',
    userImage: '/Counsellors/Swati Periwal - FRONT.jpg',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  },
  {
    name: 'Nasreen Hussain ',
    id: '1017',
    designation: 'Wrong Id Card',
    qualifications: ['Doctor', 'Dentist'],
    experience: '2 years in career support',
    contact: 'nasreen@academically.com',
    userImage: '',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  },
  {
    name: 'Mayank Mrinal ',
    id: '1004',
    designation: 'Counselor',
    qualifications: ['Doctor', 'Dentist'],
    experience: '2 years in career support',
    contact: 'mayank@academically.com',
    userImage: '/Counsellors/Mayank Mrinal - FRONT.jpg',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  }
  ,
  {
    name: 'Sana khan',
    id: '1029',
    designation: 'Counselor',
    qualifications: ['Doctor', 'Physiotherapist'],
    experience: '2 years in career support',
    contact: 'sanak@academically.com',
    userImage: '/Counsellors/Sana khan - FRONT.jpg',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  }
  ,
  {
    name: 'B.Vasantha kumar',
    id: '1046',
    designation: 'Counselor',
    qualifications: ['Dentist', 'Optometrist', 'Dentist'],
    experience: '2 years in career support',
    contact: 'vasanthak@academically.com',
    userImage: '/Counsellors/B.Vasantha Kumar  -FRONT.jpg',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  },
  {
    name: 'Harita',
    id: 'Not found',
    designation: 'Counselor',
    qualifications: ['Doctor'],
    experience: '2 years in career support',
    contact: 'Not Found',
    userImage: '',
    bio: 'Asra is known for her personalized approach and student-first mindset.'
  }
];
const filterData = [
  { name: "All" },
  { name: "Pharmacist" },
  { name: "Nursing" },
  { name: "Physiotherapist" },
  { name: "Doctor" },
  { name: "Dentist" },
  // { name: "Veterinary" },
  { name: "Optometrist" },
  { name: "Other Professionals" },
];


const CounselorList = () => {

  const [flippedCounselorId, setFlippedCounselorId] = useState(null);
  const [filteredCounselor, setFilteredCounsellor] = useState(counselors);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFlip = (id) => {
    setFlippedCounselorId(flippedCounselorId === id ? null : id);
  };

  const handleFilterClick = (counsellorCourse) => {
    setSelectedFilter(counsellorCourse);
    if (counsellorCourse === "All") {
      setFilteredCounsellor(counselors);
    } else {
      const filtered = counselors.filter((course) => course.qualifications.includes(counsellorCourse));
      setFilteredCounsellor(filtered);
    }
  };

  return (
    <div className="mt-26">
      <div className="flex items-center justify-center gap-x-4 mb-6 flex-wrap gap-y-4 px-4">
        {filterData.map((filter) => (
          <button
            key={filter.name}
            className={`xl:px-8 px-6 py-3 border border-[#0FB995] text-sm sm:text-base rounded-md ${selectedFilter === filter.name ? "bg-[#0FB995] text-white" : "text-black"
              }`}
            onClick={() => handleFilterClick(filter.name)}
          >
            {filter.name}
          </button>
        ))}
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4 py-4  w-full relative ${filteredCounselor.length <= 4 ? 'min-h-[calc(100vh-160px)]' : ''
        }`}>
        {filteredCounselor.map((counselor) => (
          <div key={counselor.id} className="w-full lg:h-[29rem] h-[28rem] perspective-1000">
            <div
              className={`w-full h-full transition-all duration-500 ease-in-out transform ${flippedCounselorId === counselor.id ? "rotate-y-180" : ""
                }`}
              style={{
                transformStyle: "preserve-3d",
                position: "relative"
              }}
            >
              {/* Front of the Card */}
              <div
                className="absolute border-2 border-[#00D9B7] inset-0 w-full h-full p-4 rounded-xl shadow-lg bg-white flex flex-col justify-between backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)"
                }}
              >
                <div className="lg:h-[60%] md:h-[45%] h-[55%] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={counselor.counselorImage}
                    alt={counselor.name}
                    className="w-full h-full object-fit"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between pt-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{counselor.name}</h3>

                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#030A21" />
                        </svg>
                        <span className="text-[12px] xl:text-[15px]"> {counselor.id}</span>
                      </p>

                      <p className="flex items-center gap-2 text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12Z" fill="#030A21" />
                        </svg>
                        <span className="text-[12px] xl:text-[15px]">{counselor.designation}</span>
                      </p>

                      <p className="flex items-center gap-2 text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#030A21" />
                        </svg>
                        <span className="text-[12px] xl:text-[15px]">{counselor.contact}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="w-full h-px bg-gray-300 my-4"></div>
                    <button
                      onClick={() => handleFlip(counselor.id)}
                      className="w-full py-3 bg-[#00D9B7] hover:bg-[#00c7a8] text-gray-900 font-semibold rounded-lg transition-colors duration-200"
                    >
                      View ID Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Back of the Card */}
              <div
                className="absolute border-2 border-[#00D9B7] inset-0 w-full h-full p-4 rounded-xl shadow-lg bg-white flex items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={counselor.userImage}
                    className="w-full h-full object-contain rounded-lg"
                    alt={`${counselor.name}'s ID Card`}
                  />
                  <button
                    onClick={() => handleFlip(counselor.id)}
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D9B7" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorList;
