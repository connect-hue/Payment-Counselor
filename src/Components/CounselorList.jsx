import React, { useState } from "react";
import userImage from '../assets/user.jpg';

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
      bio: 'Rajdeep has 8 years of experience in sales and management, specializing in customer relations and goal-oriented solutions.'
  }
];
const CounselorList = () => {
  
    const [flippedCounselorId, setFlippedCounselorId] = useState(null);
  
    const handleFlip = (id) => {
      setFlippedCounselorId(flippedCounselorId === id ? null : id);
    };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  mt-[5%] h-[79vh] ">
      {counselors.map((counselor) => (
        <div key={counselor.id} className="relative w-full h-64 perspective ">
          <div
            className={`relative w-full h-full transition-transform duration-500 transform ${
              flippedCounselorId === counselor.id ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front of the Card */}
            <div
              className="absolute inset-0 w-full h-full p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <h3 className="text-xl font-semibold">{counselor.name}</h3>
              <p>Id:{counselor.id}</p>
              <p>Designation:{counselor.designation}</p>
              <p>Contact:{counselor.contact}</p>
              <button
                onClick={() => handleFlip(counselor.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Enquire
              </button>
            </div>

            {/* Back of the Card */}
            <div
              className="absolute inset-0 w-full h-full p-4 border rounded-lg shadow-md bg-white flex flex-col justify-start items-start rotate-y-180"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3 className="text-xl font-semibold">{counselor.name}</h3>
              <p >ID: {counselor.id}</p>
              <img src={userImage} className="h-20"></img>
              <button
                onClick={() => handleFlip(counselor.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounselorList;
