import React, { useState } from "react";

const CounselorList = ({ counselors }) => {
  const [flippedCounselorId, setFlippedCounselorId] = useState(null);

  const handleFlip = (id) => {
    setFlippedCounselorId(flippedCounselorId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {counselors.map((counselor) => (
        <div key={counselor.id} className="relative w-full h-64 perspective">
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
              <p >Qualification: {counselor.qualifications}</p>
              <p>Experience: {counselor.experience}</p>
              <p >Bio:{counselor.bio}</p>
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
