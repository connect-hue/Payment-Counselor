import React, { useState } from "react";
import userImage from '../assets/user.jpg';
import imageCourse from '../assets/imagecourse.png'
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
  },
  {
    name: 'Rajdeep',
    id: '9012',
    designation: 'Sales',
    qualifications: 'BBA in Sales and Marketing',
    experience: '8 years in sales and management',
    contact: 'rajdeep@example.com',
    bio: 'Rajdeep has 8 years of experience in sales and management, specializing in customer relations and goal-oriented solutions.'
  },
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
  },
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
  },
];
const CounselorList = () => {

  const [flippedCounselorId, setFlippedCounselorId] = useState(null);

  const handleFlip = (id) => {
    setFlippedCounselorId(flippedCounselorId === id ? null : id);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-24 overflow-auto z-0 relative p-4">
      {counselors.map((counselor) => (
        <div key={counselor.id} className="w-full h-112 max-sm:h-124">
          <div
            className={` w-full h-full transition-transform duration-500 transform ${flippedCounselorId === counselor.id ? "rotate-y-180" : ""
              }`}
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {/* Front of the Card */}
            <div
              className="absolute border border-[#00D9B7]  inset-0 w-full h-full p-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={imageCourse}
                alt="Course Description"
                className="h-[80%] rounded "
              />
              <h3 className="text-2xl font-semibold mt-3 mb-3">{counselor.name}</h3>
              <p className="flex gap-x-2 items-center mb-1">
                <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.64453" y="2.05579" width="24.2843" height="15.8376" fill="#00D9B7" fill-opacity="0.13" />
                  <path d="M24.736 1H2.47029C1.44663 1 0.589844 1.83003 0.589844 2.88045V17.1807C0.589844 18.2043 1.41988 19.0611 2.47029 19.0611H24.7083C25.7598 19.0611 26.5888 18.2033 26.5888 17.1807L26.5898 2.88045C26.5898 1.85679 25.7596 1 24.736 1ZM25.6217 17.1527C25.6217 17.6501 25.2066 18.0651 24.7093 18.0651H2.47013C1.97274 18.0651 1.58552 17.6501 1.58552 17.1805V2.88026C1.58552 2.38287 2.00054 1.99565 2.47013 1.99565H24.7358C25.2332 1.99565 25.6204 2.41066 25.6204 2.88026L25.6217 17.1527Z" fill="#030A21" stroke="#030A21" stroke-width="0.8" />
                  <path d="M22.8556 9.63H14.0599C13.7829 9.63 13.5625 9.85142 13.5625 10.1274C13.5625 10.4044 13.7839 10.6248 14.0599 10.6248H22.8556C23.1326 10.6248 23.353 10.4034 23.353 10.1274C23.353 9.85036 23.1316 9.63 22.8556 9.63Z" fill="#030A21" stroke="#030A21" stroke-width="0.5" />
                  <path d="M20.1729 12.2294H14.0599C13.7829 12.2294 13.5625 12.4508 13.5625 12.7268C13.5625 13.0038 13.7839 13.2241 14.0599 13.2241H20.1729C20.4499 13.2241 20.6703 13.0027 20.6703 12.7268C20.6703 12.4508 20.4488 12.2294 20.1729 12.2294Z" fill="#030A21" stroke="#030A21" stroke-width="0.5" />
                  <path d="M22.8556 7.05737H14.0599C13.7829 7.05737 13.5625 7.27879 13.5625 7.55476C13.5625 7.83179 13.7839 8.05214 14.0599 8.05214H22.8556C23.1326 8.05214 23.353 7.83073 23.353 7.55476C23.3262 7.27879 23.1316 7.05737 22.8556 7.05737Z" fill="#030A21" stroke="#030A21" stroke-width="0.5" />
                  <path d="M8.23049 10.0172C9.75154 10.0172 10.9967 8.77215 10.9967 7.251C10.9967 5.72995 9.75165 4.5127 8.23049 4.5127C6.70945 4.5127 5.49219 5.75777 5.49219 7.251C5.49219 8.74422 6.70945 10.0172 8.23049 10.0172ZM8.23049 5.50862C9.22633 5.50862 10.0286 6.31086 10.0286 7.27888C10.0286 8.27471 9.22633 9.07695 8.23049 9.07695C7.23465 9.07695 6.46023 8.27471 6.46023 7.27888C6.46023 6.28304 7.23465 5.50862 8.23049 5.50862Z" fill="#030A21" stroke="#030A21" stroke-width="0.5" />
                  <path d="M8.2295 10.3765C6.01641 10.3765 4.24609 12.1745 4.24609 14.3867V15.051C4.24609 15.328 4.46751 15.5484 4.74348 15.5484C5.02051 15.5484 5.24086 15.3269 5.24086 15.051V14.3867C5.24086 12.7266 6.59611 11.3447 8.25628 11.3447C9.91646 11.3447 11.2983 12.7 11.2983 14.3867V15.051C11.2983 15.328 11.5197 15.5484 11.7957 15.5484C12.0727 15.5484 12.293 15.3269 12.293 15.051V14.3867C12.2396 12.1469 10.4416 10.3765 8.2295 10.3765Z" fill="#030A21" stroke="#030A21" stroke-width="0.5" />
                </svg>
                {counselor.id}
              </p>
              <p className="flex gap-x-2 items-center mb-1">
                <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.58984" y="4" width="23" height="15" fill="#00D9B7" fill-opacity="0.13" />
                  <path d="M24.3284 10.9242C23.9244 10.9242 23.6466 11.202 23.6466 11.606V18.9292C23.6466 19.207 23.4699 19.3585 23.2173 19.3585H2.9648C2.68703 19.3585 2.53551 19.1818 2.53551 18.9292V11.606C2.53551 11.202 2.25773 10.9242 1.85369 10.9242C1.44965 10.9242 1.17188 11.202 1.17188 11.606V18.9292C1.17188 19.9646 1.9547 20.7474 2.99006 20.7474H23.2426C24.2779 20.7474 25.0608 19.9646 25.0608 18.9292V11.606C25.0355 11.202 24.7577 10.9242 24.3284 10.9242Z" fill="#030A21" stroke="#030A21" stroke-width="0.4" />
                  <path d="M23.7717 3.04545H17.5848V2.69192C17.5848 1.73232 16.8525 1 15.8929 1H10.2868C9.32722 1 8.59489 1.73232 8.59489 2.69192V3.04545H2.40803C1.37267 3.04545 0.589844 3.82828 0.589844 4.86364V8.47475C0.589844 9.30808 1.17065 10.0404 1.97873 10.2172L10.8424 12.1869V13.3737C10.8424 13.702 11.0696 13.9293 11.3979 13.9293H14.7818C15.11 13.9293 15.3373 13.702 15.3373 13.3737V12.1869L24.201 10.2172C25.009 10.0404 25.5898 9.28283 25.5898 8.47475V4.86364C25.5898 3.82828 24.807 3.04545 23.7717 3.04545ZM24.201 8.4495C24.201 8.67677 24.0747 8.85354 23.8474 8.87879L15.3373 10.798V10.4444V9.9899C15.3373 9.66162 15.11 9.43434 14.7818 9.43434H11.3979C11.0696 9.43434 10.8424 9.66162 10.8424 9.9899V10.4444V10.798L2.30702 8.87879C2.105 8.85354 1.97873 8.67677 1.97873 8.4495V4.86364C1.97873 4.58586 2.1555 4.43434 2.40803 4.43434H23.7717C24.0494 4.43434 24.201 4.61111 24.201 4.86364V8.4495Z" fill="#030A21" stroke="#030A21" stroke-width="0.4" />
                </svg>
                {counselor.designation}
              </p>
              <p className="flex gap-x-2 items-center mb-5">
                <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.589844" y="2" width="23" height="15" fill="#00D9B7" fill-opacity="0.13" />
                  <path d="M2.93467 1C1.6337 1 0.589844 2.09423 0.589844 3.40894V15.5819C0.589844 16.8966 1.6337 18 2.93467 18H22.2795C23.5805 18 24.6243 16.8966 24.6243 15.5819V3.40894C24.6243 2.09423 23.5805 1 22.2795 1H2.93467ZM2.93467 2.17241H22.2795C22.453 2.17241 22.6168 2.22238 22.7649 2.29147L13.3307 11.2495C12.8977 11.6606 12.3356 11.6606 11.9018 11.2495L2.44923 2.29147C2.59737 2.22238 2.76118 2.17241 2.93467 2.17241ZM1.78058 3.27155L8.45785 9.60077L1.89049 16.159C1.80825 15.9882 1.76226 15.7927 1.76226 15.5819V3.40894C1.76226 3.36134 1.77618 3.31742 1.78058 3.27155ZM23.4336 3.27155C23.4383 3.31742 23.4518 3.36134 23.4518 3.40894V15.5819C23.4518 15.7896 23.4036 15.9808 23.3235 16.1498L16.7745 9.59159L23.4336 3.27155ZM15.9228 10.4068L22.3345 16.8276C22.316 16.8276 22.2981 16.8276 22.2795 16.8276H2.93467C2.91914 16.8276 2.90419 16.8276 2.88889 16.8276L9.30967 10.4159L11.0958 12.1013C11.9465 12.9077 13.2862 12.9088 14.1367 12.1013L15.9228 10.4068Z" fill="#030A21" stroke="#030A21" stroke-width="0.4" />
                </svg>
                {counselor.contact}
              </p>
              <div className="w-full h-1 border border-dashed mb-2" />
              <button
                onClick={() => handleFlip(counselor.id)}
                className="mt-2 px-4 py-2 bg-[#00D9B7] text-black font-semibold rounded"
              >
                View Id Card
              </button>
            </div>

            {/* Back of the Card */}
            <div
              className="relative border border-[#00D9B7]  inset-0 w-full h-full p-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* <h3 className="text-xl font-semibold">{counselor.name}</h3>
              <p >ID: {counselor.id}</p> */}
              <img src={userImage} className="h-[100%]  object-contain rounded w-full"></img>
              <button
                onClick={() => handleFlip(counselor.id)}
                className=" absolute top-0 right-0 px-4 py-2 text-[#00D9B7] rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounselorList;
