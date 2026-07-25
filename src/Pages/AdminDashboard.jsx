import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

const AdminDashboard = () => {
  const [placements, setPlacements] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Search, Status, and Sort state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("sortOrder"); // "sortOrder" or "name" or "updatedAt"
  
  // Modal Preview state
  const [previewPlacement, setPreviewPlacement] = useState(null);
  
  // Deletion Confirmation state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchSessionAndPlacements = async () => {
    try {
      setLoading(true);
      const sessionData = await apiClient.get("/api/admin/auth/me");
      setAdmin(sessionData.admin);
      
      const query = [];
      if (search) query.push(`search=${encodeURIComponent(search)}`);
      if (statusFilter !== "all") query.push(`status=${statusFilter}`);
      
      const queryString = query.length > 0 ? `?${query.join("&")}` : "";
      const placementList = await apiClient.get(`/api/admin/placements${queryString}`);
      setPlacements(placementList);
      setError("");
    } catch (err) {
      console.error(err);
      if (err.message.includes("Authentication required") || err.message.includes("Session expired")) {
        navigate("/admin/login");
      } else {
        setError(err.message || "Failed to load placements dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndPlacements();
  }, [search, statusFilter, navigate]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/admin/auth/logout");
      navigate("/admin/login");
    } catch (err) {
      alert("Failed to logout: " + err.message);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const updated = await apiClient.patch(`/api/admin/placements/${id}/publish`, {
        isPublished: !currentStatus,
      });
      // Update local state
      setPlacements(placements.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDeleteClick = (placement) => {
    setDeleteCandidate(placement);
    setDeleteConfirmName("");
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmName !== deleteCandidate.name) {
      alert("Candidate name does not match. Deletion aborted.");
      return;
    }

    setDeleting(true);
    try {
      await apiClient.delete(`/api/admin/placements/${deleteCandidate._id}`);
      setPlacements(placements.filter((p) => p._id !== deleteCandidate._id));
      setDeleteCandidate(null);
      alert("Placement record deleted successfully.");
    } catch (err) {
      alert("Failed to delete placement: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Reorder sorting logic locally based on sorting control
  const sortedPlacements = [...placements].sort((a, b) => {
    if (sortBy === "sortOrder") {
      return a.sortOrder - b.sortOrder;
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "updatedAt") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  const totalCount = placements.length;
  const publishedCount = placements.filter((p) => p.isPublished).length;
  const draftCount = totalCount - publishedCount;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16 pt-24 px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-8">
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-auto"
            src="/Assets/logo.svg"
            alt="Academically Logo"
            onError={(e) => {
              e.target.src = "/Assets/logo.webp";
            }}
          />
          <div>
            <h1
              className="text-2xl font-bold text-[#030A21]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Placement Management
            </h1>
            {admin && (
              <p className="text-xs text-gray-500 mt-0.5">
                Logged in as: <span className="font-semibold text-gray-700">{admin.name}</span> ({admin.role})
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/admin/placements/new")}
            className="px-4 py-2 bg-[#00D9B7] text-[#030A21] font-bold text-sm rounded-lg hover:bg-[#00D9B7]/95 transition-all shadow-sm cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            + Add Placement
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 text-gray-700 bg-white text-sm font-semibold rounded-lg hover:bg-gray-55 transition-all cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Placements</span>
          <span className="text-3xl font-extrabold text-[#030A21] mt-2">{totalCount}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Published</span>
          <span className="text-3xl font-extrabold text-teal-600 mt-2">{publishedCount}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Drafts</span>
          <span className="text-3xl font-extrabold text-amber-500 mt-2">{draftCount}</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* Filter controls */}
        <div className="p-5 border-b border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gray-50/50">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search by candidate or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm text-[#030A21]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-[#00D9B7] focus:border-[#00D9B7] text-xs text-[#030A21] font-semibold"
              >
                <option value="all">All</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-[#00D9B7] focus:border-[#00D9B7] text-xs text-[#030A21] font-semibold"
              >
                <option value="sortOrder">Display Order</option>
                <option value="name">Name</option>
                <option value="updatedAt">Last Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="p-16 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00D9B7]"></div>
          </div>
        ) : sortedPlacements.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-gray-500 font-semibold text-lg">No placement records found.</p>
            <p className="text-xs text-gray-450 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/70">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Qualification</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Companies</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Packages</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Display Order</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPlacements.map((placement) => (
                    <tr key={placement._id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={placement.imageUrl}
                            alt={placement.name}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <div className="text-sm font-semibold text-[#030A21]">{placement.name}</div>
                            {placement.role && (
                              <div className="text-xs text-[#00D9B7] font-medium">{placement.role}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{placement.qualification}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {placement.companies.map((company) => (
                            <span key={company} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-[#17264B] font-bold">
                              {company}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {placement.packages.map((pkg) => (
                            <span key={pkg} className="rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-700 font-bold">
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-[#030A21]">
                        {placement.sortOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleTogglePublish(placement._id, placement.isPublished)}
                          className={`inline-flex px-2.5 py-1 text-xs font-bold leading-5 rounded-full border cursor-pointer hover:opacity-85 ${
                            placement.isPublished
                              ? "bg-teal-50 text-teal-800 border-teal-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {placement.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setPreviewPlacement(placement)}
                            className="px-2.5 py-1 text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100/50 cursor-pointer"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => navigate(`/admin/placements/${placement._id}/edit`)}
                            className="px-2.5 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(placement)}
                            className="px-2.5 py-1 text-xs text-red-650 bg-red-50 border border-red-200 rounded hover:bg-red-100/50 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View */}
            <div className="block lg:hidden divide-y divide-gray-200">
              {sortedPlacements.map((placement) => (
                <div key={placement._id} className="p-5 hover:bg-gray-50/50 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={placement.imageUrl}
                      alt={placement.name}
                      className="h-12 w-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#030A21]">{placement.name}</h4>
                      <p className="text-xs text-gray-500">{placement.qualification}</p>
                      {placement.role && (
                        <span className="inline-block mt-0.5 text-[10px] text-[#00D9B7] bg-[#00D9B7]/5 px-1.5 py-0.5 rounded font-semibold">
                          {placement.role}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 bg-gray-50 p-3 rounded-lg text-xs">
                    <div>
                      <span className="font-bold text-gray-500 block mb-0.5 uppercase text-[10px]">Companies</span>
                      <div className="flex flex-wrap gap-1">
                        {placement.companies.map((c) => (
                          <span key={c} className="bg-white border border-gray-200 px-1.5 py-0.5 rounded font-bold text-[#17264B]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-gray-500 block mb-0.5 uppercase text-[10px]">Packages</span>
                      <div className="flex flex-wrap gap-1">
                        {placement.packages.map((p) => (
                          <span key={p} className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-gray-500 block mb-0.5 uppercase text-[10px]">Display Order</span>
                      <span className="font-bold text-[#030A21]">{placement.sortOrder}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-500 block mb-0.5 uppercase text-[10px]">Status</span>
                      <button
                        onClick={() => handleTogglePublish(placement._id, placement.isPublished)}
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border cursor-pointer ${
                          placement.isPublished
                            ? "bg-teal-50 text-teal-800 border-teal-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {placement.isPublished ? "Published" : "Draft"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end pt-2">
                    <button
                      onClick={() => setPreviewPlacement(placement)}
                      className="flex-1 py-1.5 text-center text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100/50 cursor-pointer"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => navigate(`/admin/placements/${placement._id}/edit`)}
                      className="flex-1 py-1.5 text-center text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(placement)}
                      className="flex-1 py-1.5 text-center text-xs text-red-650 bg-red-50 border border-red-200 rounded hover:bg-red-100/50 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details Preview Modal */}
      {previewPlacement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setPreviewPlacement(null)}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all">
            <button
              onClick={() => setPreviewPlacement(null)}
              className="absolute right-4 top-4 cursor-pointer text-2xl font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start text-center sm:text-left">
                <img
                  src={previewPlacement.imageUrl}
                  alt={previewPlacement.name}
                  className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-[#00D9B7] object-cover shadow-md"
                />
                <div className="flex-1 mt-2 sm:mt-0">
                  <h2
                    className="text-2xl font-bold text-[#030A21]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {previewPlacement.name}
                  </h2>
                  <p
                    className="text-sm font-semibold text-[#00D9B7] uppercase tracking-wide mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {previewPlacement.role}
                  </p>
                  <p
                    className="text-sm text-gray-500 mt-0.5"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {previewPlacement.qualification}
                  </p>
                  <div
                    className="mt-3 inline-block rounded-md bg-[#F7DD4B]/20 px-3 py-1 text-sm font-bold text-[#17264B]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {previewPlacement.packages.join(" & ")}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold text-gray-700">Placed At</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {previewPlacement.companies.map((company) => (
                    <span
                      key={company}
                      className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-[#17264B]"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-gray-700">Success Story</h3>
                <div className="mt-2 rounded-lg border-l-4 border-[#00D9B7] bg-gray-50 p-4 italic text-sm text-gray-600 leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap">
                  "{previewPlacement.successStory}"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => !deleting && e.target === e.currentTarget && setDeleteCandidate(null)}
        >
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-[#030A21]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Confirm Placement Deletion
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              This action cannot be undone. To permanently delete the placement record for{" "}
              <span className="font-bold text-[#030A21]">{deleteCandidate.name}</span>, please type their exact candidate name below.
            </p>

            <div className="mt-4">
              <input
                type="text"
                value={deleteConfirmName}
                onChange={(e) => setDeleteConfirmName(e.target.value)}
                placeholder="Type candidate name to confirm..."
                className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm"
                disabled={deleting}
              />
            </div>

            <div className="mt-6 flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-xs font-semibold cursor-pointer"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting || deleteConfirmName !== deleteCandidate.name}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
