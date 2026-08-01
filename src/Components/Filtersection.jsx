"use client";

import React from "react";
import { useRouter } from "next/navigation";

const filterData = [
  { name: "Pharmacist", img: "/Assets/pharmacist.jpg" },
  { name: "Doctor", img: "/Assets/doctor.webp" },
  { name: "Dentist", img: "/Assets/dentist.webp" },
  { name: "Nursing", img: "/Assets/nursing.webp" },
  { name: "Physiotherapist", img: "/Assets/physiotherapist.webp" },
  { name: "Optometrist", img: "/Assets/optometrist.webp" },
  { name: "Job Assistance", img: "/Assets/job-assisstance.webp" },
  { name: "Other Professionals", img: "/Assets/healthcare.webp" },
];
const FilterSection = () => {
  const router = useRouter();

  const handlePreviewClick = (name) => {
    router.push(`/preview/${encodeURIComponent(name)}`);
  };

  return (
    <div className="h-full p-8 mt-20 ">
      <h1 className="text-center text-3xl font-semibold">Our Courses</h1>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-4 overflow-auto z-0 relative p-4">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="w-full h-full border border-[#00D9B7] flex flex-col justify-between"
          >
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <img
                  src={data.img}
                  alt={data.name}
                  className="mb-4 rounded-md bg-white max-sm:w-[70vw] w-full sm:h-[300px] object-cover"
                />
                <div className="text-center min-h-[3rem] flex items-center justify-center">
                  <h5 className="text-lg font-semibold text-[#030A21]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>{data.name}</h5>
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 w-full bg-[#00D9B7] font-semibold text-[#030A21] text-sm sm:text-base rounded-md hover:bg-[#00D9B7] cursor-pointer"
                onClick={() => handlePreviewClick(data.name)}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
