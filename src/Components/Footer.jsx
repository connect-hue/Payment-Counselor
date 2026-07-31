"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#030A21] text-white p-4 text-center">
      &copy; 2026 Academically. All Rights Reserved.
    </footer>
  );
};

export default Footer;
