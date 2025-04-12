import React from "react";
import { useNavigate } from "react-router-dom";
import Pharmacist from '/Assets/pharmacist.jpg';
import Doctor from '/Assets/doctor.jpg';
import Dentist from '/Assets/dentist.jpg';
import Nursing from '/Assets/nurses.jpg';
import Physiotherapist from '/Assets/physiotherapist.jpg';
import Optometrist from '/Assets/optometrist.jpg';
import Veterinary from '/Assets/labtech.jpg';
import Other from '/Assets/healthcare.png';

const filterData = [
  { name: "Pharmacist", img: Pharmacist },
  { name: "Doctor", img: Doctor },
  { name: "Dentist", img: Dentist },
  { name: "Nursing", img: Nursing },
  { name: "Physiotherapist", img: Physiotherapist },
  { name: "Optometrist", img: Optometrist },
  { name: "Veterinary", img: Veterinary },
  { name: "Other Professionals", img: Other },
];
const FilterSection = () => {
  const navigate = useNavigate();

  const handlePreviewClick = (name) => {
    navigate(`/preview/${encodeURIComponent(name)}`);
  };


  return (
    <div className="h-full p-8 mt-20 ">
      <h1 className="text-center text-3xl font-semibold">Our Courses</h1>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-4 overflow-auto z-0 relative p-4">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="w-full h-100 max-sm:h-110 border border-[#00D9B7]  "
          >
            <div className="p-4 flex flex-col ">
              <img
                src={data.img}
                alt={data.name}
                className="mb-4 rounded-md bg-white max-sm:w-[70vw] w-full h-[250px] object-cover"
              />
              <div className="text-center">
                <h5 className="text-lg font-semibold text-[#030A21]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>{data.name}</h5>
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
