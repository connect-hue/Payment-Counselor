import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className= "bg-blue-300 text-black p-4 px-16 mb-4 fixed top-0 left-0 w-full shadow-md max-sm:px-4 ">
      <nav className="flex justify-between items-center">
        <img src="./Assets/logo.svg" width={100} height={100} className="mr-auto" />
        <ul className="flex gap-6 ml-auto">
          <Link to="/">
            <li className="cursor-pointer px-4 py-2 rounded hover:bg-blue-500">Courses</li>
          </Link>
          <Link to="/counselors">
            <li className="cursor-pointer px-4 py-2 rounded hover:bg-blue-500">Counselors</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
