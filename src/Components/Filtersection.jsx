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
  { name: "Healthcare Professionals", img: "/Assets/optometrist.jpg" },
];
const FilterSection = () => {
  const navigate = useNavigate();

  const handlePreviewClick = (name) => {
    navigate(`/preview/${encodeURIComponent(name)}`);
  };


  return (
    <div className="xl:h-screen">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4  p-8 mt-24">
        {filterData.map((data, index) => (
          <div
            key={index}
            className="flex-shrink-0   border-dashed border-blue-600 sm:w-48 md:w-72 border rounded-lg shadow hover:shadow-lg "
          >
            <div className="p-4 flex flex-col ">
              <img
                src={data.img}
                alt={data.name}
                className="mb-4 rounded-md bg-white border-8 max-sm:w-[70vw] w-full h-[120px] border-[#0074FE] object-cover"
              />
              <div className="text-center">
                <h6 className="text-base font-medium">{data.name}</h6>
              </div>
              <button
                className="mt-4 px-4 py-2 w-full bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600"
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
