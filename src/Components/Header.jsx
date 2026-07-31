"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const getTabClass = (path, end = false) => {
    const isActive = end ? pathname === path : pathname.startsWith(path);
    return `block rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive 
        ? "bg-[#00D9B7] text-[#030A21] shadow-sm" 
        : "text-slate-700 hover:bg-[#00D9B7]/15 hover:text-[#030A21]"
    }`;
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md px-6 sm:px-12 py-3.5 border-b border-slate-100 shadow-xs">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src="/Assets/logo.svg"
          width={130}
          height={36}
          className="cursor-pointer h-9 w-auto object-contain"
          alt="Academically"
          onClick={() => router.push("/")}
        />
        <ul className="flex items-center gap-2 sm:gap-3">
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