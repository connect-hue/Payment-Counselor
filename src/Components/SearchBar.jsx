import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search courses..."
        className="w-1/2 p-2 border border-gray-300 rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
