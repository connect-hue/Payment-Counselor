import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from "/Assets/logo.svg"
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#FFFFFF] text-black p-4 px-16 mb-4 fixed top-0 left-0 w-full shadow-md max-sm:px-4 z-50 ">
      <nav className="flex justify-between items-center">
        <img src={logo} width={100} height={100} className="mr-auto" onClick={() => navigate('/')} />
        <ul className="flex sm:gap-6 gap-2 justify-center text-[#1E1E1E] ml-auto w-full">
          {/* <Link to="/">
            <li
              className="cursor-pointer px-4 py-2 rounded hover:bg-[#0FB995] hover:text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Courses
            </li>
          </Link> */}
          {/* <Link to="/counselors">
            <li
              className="cursor-pointer px-4 py-2 rounded hover:bg-[#0FB995] hover:text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Counselors
            </li>
          </Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
