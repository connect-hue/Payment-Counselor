import React from "react";
import { useNavigate } from "react-router-dom";
const filterData = [
  { name: "Pharmacist", img: "/Assets/pharmacist.jpg" },
  { name: "Nursing", img: "/Assets/nurses.jpg" },
  { name: "Physiotherapist", img: "/Assets/physiotherapist.jpg" },
  { name: "Medical Doctor", img: "/Assets/doctor.jpg" },
  { name: "Dentist", img: "/Assets/dentist.jpg" },
  { name: "Veterinary", img: "/Assets/labtech.jpg" },
  { name: "Optometrist", img: "/Assets/optometrist.jpg" },
  { name: "Healthcare Professionals", img: "/Assets/healthcare.png" },
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
