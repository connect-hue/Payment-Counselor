"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isPlacementsActive = pathname?.startsWith("/placements");
  const isCoursesActive = pathname === "/" || pathname?.startsWith("/courses");

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-3.5 border-b border-slate-100 shadow-xs">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/Assets/logo.svg"
            width={160}
            height={42}
            className="cursor-pointer h-9 sm:h-10 w-auto object-contain"
            alt="Academically Global Healthcare Academy"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-4 sm:gap-8">
          <li>
            <Link
              href="/"
              className={`relative py-1 text-sm font-bold transition-all ${
                isCoursesActive
                  ? "text-[#00D9B7]"
                  : "text-slate-800 hover:text-[#00D9B7]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Courses
              {isCoursesActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00D9B7] rounded-full"></span>
              )}
            </Link>
          </li>

          <li>
            <Link
              href="/placements"
              className={`relative py-1 text-sm font-bold transition-all ${
                isPlacementsActive
                  ? "text-[#00D9B7]"
                  : "text-slate-800 hover:text-[#00D9B7]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Placements
              {isPlacementsActive && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2.5px] bg-[#00D9B7] rounded-full"></span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;