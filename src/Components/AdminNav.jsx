import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiClient } from "../utils/apiClient";

const AdminNav = ({ admin, title = "Admin Panel", subtitle = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/admin/auth/logout");
      router.push("/admin/login");
    } catch (err) {
      alert("Failed to logout: " + err.message);
    }
  };

  const isPlacements = pathname?.startsWith("/admin/placements");
  const isBrochures = pathname?.startsWith("/admin/brochures");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/admin/placements" className="flex items-center gap-3">
              <img
                className="h-9 w-auto"
                src="/Assets/logo.svg"
                alt="Academically Logo"
                onError={(e) => {
                  e.target.src = "/Assets/logo.webp";
                }}
              />
            </Link>
            <div className="border-l border-gray-300 pl-3">
              <h1
                className="text-lg sm:text-xl font-bold text-[#030A21]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {title}
              </h1>
              {subtitle ? (
                <p className="text-xs text-gray-500">{subtitle}</p>
              ) : admin ? (
                <p className="text-xs text-gray-500">
                  Logged in as <span className="font-semibold text-gray-700">{admin.name}</span> ({admin.role})
                </p>
              ) : null}
            </div>
          </div>

          {/* Navigation Tabs & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Nav Tabs */}
            <nav className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
              <Link
                href="/admin/placements"
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isPlacements
                    ? "bg-[#00D9B7] text-[#030A21] shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Placements
              </Link>
              <Link
                href="/admin/brochures"
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isBrochures
                    ? "bg-[#00D9B7] text-[#030A21] shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Brochures & Courses
              </Link>
            </nav>

            {/* View Live Site Link */}
            <Link
              href="/"
              target="_blank"
              className="text-xs sm:text-sm text-gray-600 hover:text-[#00D9B7] font-medium px-2 py-1 rounded hover:bg-gray-50 flex items-center gap-1"
            >
              <span>View Site</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNav;
