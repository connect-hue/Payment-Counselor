import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../utils/apiClient";
import AdminNav from "../Components/AdminNav";
import { formatS3Url } from "../utils/s3Helpers";

const AdminBrochuresDashboard = () => {
  const [brochures, setBrochures] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("sortOrder"); // "sortOrder" | "name" | "updatedAt"
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  // Quick Preview Modal state
  const [previewBrochure, setPreviewBrochure] = useState(null);

  // Deletion Confirmation state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Sync state
  const [syncing, setSyncing] = useState(false);

  const router = useRouter();

  const fetchSessionAndBrochures = async () => {
    try {
      setLoading(true);
      const sessionData = await apiClient.get("/api/admin/auth/me");
      setAdmin(sessionData.admin);

      const query = [];
      if (search) query.push(`search=${encodeURIComponent(search)}`);
      if (statusFilter !== "all") query.push(`status=${statusFilter}`);
      if (categoryFilter !== "all") query.push(`category=${encodeURIComponent(categoryFilter)}`);
      if (locationFilter !== "all") query.push(`location=${encodeURIComponent(locationFilter)}`);

      const queryString = query.length > 0 ? `?${query.join("&")}` : "";
      const brochureList = await apiClient.get(`/api/admin/brochures${queryString}`);
      setBrochures(brochureList);
      setError("");
    } catch (err) {
      console.error(err);
      if (err.message.includes("Authentication required") || err.message.includes("Session expired")) {
        router.push("/admin/login");
      } else {
        setError(err.message || "Failed to load brochures dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndBrochures();
  }, [search, statusFilter, categoryFilter, locationFilter]);

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const updated = await apiClient.patch(`/api/admin/brochures/${id}/publish`, {
        isPublished: !currentStatus,
      });
      setBrochures(brochures.map((b) => (b._id === id ? updated : b)));
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDeleteClick = (brochure) => {
    setDeleteCandidate(brochure);
    setDeleteConfirmName("");
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmName.trim().toLowerCase() !== deleteCandidate.name.trim().toLowerCase()) {
      alert("Course name does not match. Deletion aborted.");
      return;
    }

    setDeleting(true);
    try {
      await apiClient.delete(`/api/admin/brochures/${deleteCandidate._id}`);
      setBrochures(brochures.filter((b) => b._id !== deleteCandidate._id));
      setDeleteCandidate(null);
      alert("Brochure deleted successfully.");
    } catch (err) {
      alert("Failed to delete brochure: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleSyncDefaults = async () => {
    if (!confirm("Sync/Restore default course brochures catalog from repository?")) return;
    try {
      setSyncing(true);
      const res = await apiClient.post("/api/admin/brochures/seed", {});
      alert(res.message || "Catalog synced successfully!");
      fetchSessionAndBrochures();
    } catch (err) {
      alert("Failed to sync catalog: " + err.message);
    } finally {
      setSyncing(false);
    }
  };

  // Unique categories and locations from current dataset for dynamic filters
  const categoriesList = Array.from(new Set(brochures.map((b) => b.category).filter(Boolean))).sort();
  const locationsList = Array.from(new Set(brochures.map((b) => b.location).filter(Boolean))).sort();

  // Sorting
  const sortedBrochures = [...brochures].sort((a, b) => {
    if (sortBy === "sortOrder") {
      return (a.sortOrder || 0) - (b.sortOrder || 0);
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === "updatedAt") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  const totalCount = brochures.length;
  const publishedCount = brochures.filter((b) => b.isPublished).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNav admin={admin} title="Brochure & Course Management" />

      <main className="max-w-7xl mx-auto pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        {/* Top Action Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-[#030A21]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Brochures Directory
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add, remove, replace, and edit course brochures, PDFs, fees, and program details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncDefaults}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors disabled:opacity-50"
              title="Sync initial brochure catalog"
            >
              <svg className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {syncing ? "Syncing..." : "Sync Catalog"}
            </button>

            <button
              onClick={() => router.push("/admin/brochures/new")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00D9B7] text-[#030A21] font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#00c4a5] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add New Brochure
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Brochures</p>
              <h3 className="text-2xl font-extrabold text-[#030A21] mt-1">{totalCount}</h3>
            </div>
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-[#00D9B7]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Published</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{publishedCount}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Drafts / Inactive</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{draftCount}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Categories</p>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">{categoriesList.length}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <input
                type="text"
                placeholder="Search course, category, fees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] focus:border-transparent"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
              >
                <option value="all">All Locations</option>
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
              >
                <option value="all">All Status</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
              >
                <option value="sortOrder">Sort Order</option>
                <option value="name">Name (A-Z)</option>
                <option value="category">Category</option>
                <option value="updatedAt">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-500 font-bold ml-4">✕</button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-xs">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00D9B7] border-t-transparent mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">Loading brochures catalog...</p>
          </div>
        ) : sortedBrochures.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-xs">
            <div className="w-16 h-16 bg-teal-50 text-[#00D9B7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No brochures found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              No course brochures match your current search or filter criteria.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setLocationFilter("all");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 font-medium"
              >
                Reset Filters
              </button>
              <button
                onClick={() => router.push("/admin/brochures/new")}
                className="px-4 py-2 bg-[#00D9B7] text-[#030A21] rounded-lg text-sm font-semibold hover:bg-[#00c4a5]"
              >
                Add Brochure
              </button>
            </div>
          </div>
        ) : (
          /* Main Brochures Table */
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Brochure / Image
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Course Name & Slug
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category & Location
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fees & Duration
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Brochure Link / PDF
                    </th>
                    <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedBrochures.map((item) => {
                    const brochureImageUrl = formatS3Url(item.brochure) || "/CourseImage/OPRA EXAM Preparation Course.svg";

                    return (
                      <tr key={item._id} className="hover:bg-gray-50/70 transition-colors">
                        {/* Image / Thumbnail */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div
                            className="w-16 h-14 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer group relative"
                            onClick={() => setPreviewBrochure(item)}
                            title="Click to view full preview"
                          >
                            <img
                              src={brochureImageUrl}
                              alt={item.name}
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.target.src = "/Assets/logo.svg";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>
                        </td>

                        {/* Name & Slug */}
                        <td className="px-4 py-4">
                          <div className="max-w-xs">
                            <h4
                              className="text-sm font-semibold text-[#030A21] line-clamp-2 hover:text-[#00D9B7] cursor-pointer"
                              onClick={() => router.push(`/admin/brochures/${item._id}`)}
                            >
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 font-mono">
                                /{item.slug}
                              </span>
                              <Link
                                href={`/${item.slug}`}
                                target="_blank"
                                className="text-gray-400 hover:text-teal-600"
                                title="Open public course page"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </td>

                        {/* Category & Location */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">
                              {item.category}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs text-gray-600 bg-gray-100">
                              📍 {item.location}
                            </span>
                          </div>
                        </td>

                        {/* Fees & Duration */}
                        <td className="px-4 py-4 whitespace-nowrap text-xs">
                          <div className="space-y-0.5">
                            {item.audfees && (
                              <div className="font-semibold text-gray-900">
                                {item.audfees}
                              </div>
                            )}
                            {item.inrfees && (
                              <div className="text-gray-600">
                                {item.inrfees}
                              </div>
                            )}
                            <div className="text-gray-500 text-[11px]">
                              ⏱ {item.duration || "4 Months"} • 👥 {item.students || "1000+"}
                            </div>
                          </div>
                        </td>

                        {/* Brochure Link / PDF */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item.brochureLink ? (
                            <a
                              href={item.brochureLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              View Brochure
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No document link</span>
                          )}
                        </td>

                        {/* Status Toggle */}
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleTogglePublish(item._id, item.isPublished)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                              item.isPublished
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            title="Click to toggle Published/Draft"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.isPublished ? "bg-emerald-500" : "bg-gray-400"
                              }`}
                            />
                            {item.isPublished ? "Published" : "Draft"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 whitespace-nowrap text-right text-xs font-medium">
                          <div className="flex items-center justify-end gap-2">
                            {/* Edit / Replace Button */}
                            <button
                              onClick={() => router.push(`/admin/brochures/${item._id}`)}
                              className="px-2.5 py-1.5 bg-gray-100 hover:bg-[#00D9B7] text-gray-700 hover:text-[#030A21] rounded-lg transition-colors flex items-center gap-1"
                              title="Edit / Replace Brochure details"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Edit / Replace</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteClick(item)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete brochure"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span>Showing {sortedBrochures.length} of {totalCount} total courses/brochures</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-gray-700 font-medium"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Quick Preview Modal */}
      {previewBrochure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setPreviewBrochure(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={formatS3Url(previewBrochure.brochure) || "/CourseImage/OPRA EXAM Preparation Course.svg"}
                  alt={previewBrochure.name}
                  className="w-full rounded-xl border border-teal-200 bg-teal-50/20 object-contain p-2"
                />
              </div>

              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                      {previewBrochure.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-600">
                      {previewBrochure.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#030A21]">{previewBrochure.name}</h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-4 leading-relaxed">
                    {previewBrochure.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-400 block">AUD Fees</span>
                      <span className="font-semibold text-gray-800">{previewBrochure.audfees || "N/A"}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-400 block">INR Fees</span>
                      <span className="font-semibold text-gray-800">{previewBrochure.inrfees || "N/A"}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-400 block">Duration</span>
                      <span className="font-semibold text-gray-800">{previewBrochure.duration || "4 Months"}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-400 block">Enrolled</span>
                      <span className="font-semibold text-gray-800">{previewBrochure.students || "1000+"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewBrochure(null);
                      router.push(`/admin/brochures/${previewBrochure._id}`);
                    }}
                    className="flex-1 px-4 py-2 bg-[#00D9B7] text-[#030A21] font-semibold text-xs rounded-lg hover:bg-[#00c4a5]"
                  >
                    Edit Brochure
                  </button>
                  {previewBrochure.brochureLink && (
                    <a
                      href={previewBrochure.brochureLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-xs rounded-lg hover:bg-gray-200"
                    >
                      Open PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900">Delete Brochure / Course</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-800">{deleteCandidate.name}</span>? This will also remove any uploaded brochure image and PDF files from storage.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Type <span className="text-red-600">"{deleteCandidate.name}"</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmName}
                onChange={(e) => setDeleteConfirmName(e.target.value)}
                placeholder={deleteCandidate.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={
                  deleting ||
                  deleteConfirmName.trim().toLowerCase() !== deleteCandidate.name.trim().toLowerCase()
                }
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {deleting && <span className="animate-spin">⏳</span>}
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrochuresDashboard;
