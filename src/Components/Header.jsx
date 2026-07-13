import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/Assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const tabClass = ({ isActive }) =>
    `block rounded px-4 py-2 ${isActive ? "bg-[#0FB995] text-white" : "hover:bg-[#0FB995] hover:text-white"}`;

  return (
    <header className="fixed top-0 left-0 z-50 mb-4 w-full bg-white p-4 px-16 text-black shadow-md max-sm:px-4">
      <nav className="flex items-center justify-between">
        <img
          src={logo}
          width={100}
          height={100}
          className="cursor-pointer"
          alt="Academically"
          onClick={() => navigate("/")}
        />
        <ul className="ml-auto flex items-center gap-2 text-[#1E1E1E] sm:gap-4">
          <li>
            <NavLink to="/" end className={tabClass} style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/placements" className={tabClass} style={{ fontFamily: "'Poppins', sans-serif" }}>
              Placements
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;