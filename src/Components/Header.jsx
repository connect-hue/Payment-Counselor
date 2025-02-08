import React from "react";

const Header = ({ setActiveTab }) => {
  return (
    <header className="bg-blue-900 text-white p-4">
      <nav className="flex justify-center">
        <ul className="flex gap-6">
          <li
            className="cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </li>
          <li
            className="cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setActiveTab("counselors")}
          >
            Counselors
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
