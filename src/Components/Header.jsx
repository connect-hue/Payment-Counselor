"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getTabClass = (path, end = false) => {
    const isActive = end ? pathname === path : pathname.startsWith(path);
    return `block rounded px-4 py-2 ${
      isActive ? "bg-[#0FB995] text-white" : "hover:bg-[#0FB995] hover:text-white"
    }`;
  };

  return (
    <header className="fixed top-0 left-0 z-50 mb-4 w-full bg-white p-4 px-16 text-black shadow-md max-sm:px-4">
      <nav className="flex items-center justify-between">
        <img
          src="/Assets/logo.svg"
          width={100}
          height={100}
          className="cursor-pointer"
          alt="Academically"
          onClick={() => router.push("/")}
        />
        <ul className="ml-auto flex items-center gap-2 text-[#1E1E1E] sm:gap-4">
          <li>
            <Link href="/" className={getTabClass("/", true)} style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Courses
            </Link>
          </li>
          <li>
            <Link href="/placements" className={getTabClass("/placements")} style={{ fontFamily: "'Poppins', sans-serif" }}>
              Placements
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;