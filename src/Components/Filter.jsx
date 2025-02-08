import React from "react";

const Filter = ({ filterData, onFilter }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 my-4">
      {filterData.map((filter) => (
        <button
          key={filter.name}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => onFilter(filter.name)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};

export default Filter;
