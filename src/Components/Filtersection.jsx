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
    <div className="xl:h-screen p-8 mt-20">
      <h1 className="text-center text-3xl font-semibold">Our Courses</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="flex-shrink-0 border-[#00D9B7] sm:w-72 md:w-84 xl:w-98 border rounded-lg shadow hover:shadow-lg "
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
                className="mt-4 px-4 py-2 w-full bg-[#00D9B7] font-semibold text-[#030A21] text-sm sm:text-base rounded-md hover:bg-[#00D9B7]"
                onClick={() => handlePreviewClick(data.name)} // Pass item's ID
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
