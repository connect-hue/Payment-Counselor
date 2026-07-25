import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

const AdminPlacementForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([""]);
  const [packages, setPackages] = useState([""]);
  const [successStory, setSuccessStory] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");

  // UI State
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Load existing placement details if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchPlacement = async () => {
        try {
          setFetching(true);
          const data = await apiClient.get(`/api/admin/placements/${id}`);
          setName(data.name);
          setQualification(data.qualification);
          setRole(data.role || "");
          setCompanies(data.companies && data.companies.length > 0 ? data.companies : [""]);
          setPackages(data.packages && data.packages.length > 0 ? data.packages : [""]);
          setSuccessStory(data.successStory);
          setImageAlt(data.imageAlt || "");
          setSortOrder(data.sortOrder);
          setIsPublished(data.isPublished);
          setExistingImageUrl(data.imageUrl);
          setImagePreview(data.imageUrl);
        } catch (err) {
          setError(err.message || "Failed to load placement details.");
        } finally {
          setFetching(false);
        }
      };
      fetchPlacement();
    }
  }, [id, isEditMode]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image exceeds 5MB size limit.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // repeatable inputs for Companies
  const handleCompanyChange = (index, value) => {
    const newCompanies = [...companies];
    newCompanies[index] = value;
    setCompanies(newCompanies);
  };

  const addCompany = () => setCompanies([...companies, ""]);
  
  const removeCompany = (index) => {
    if (companies.length > 1) {
      setCompanies(companies.filter((_, i) => i !== index));
    }
  };

  // repeatable inputs for Packages
  const handlePackageChange = (index, value) => {
    const newPackages = [...packages];
    newPackages[index] = value;
    setPackages(newPackages);
  };

  const addPackage = () => setPackages([...packages, ""]);

  const removePackage = (index) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };

  // Form submission handler
  const handleSubmit = async (e, forcePublish = null) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      setError("Candidate name is required.");
      return;
    }

    const filteredCompanies = companies.map((c) => c.trim()).filter(Boolean);
    const filteredPackages = packages.map((p) => p.trim()).filter(Boolean);

    if (filteredCompanies.length === 0) {
      setError("At least one company is required.");
      return;
    }
    if (filteredPackages.length === 0) {
      setError("At least one package is required.");
      return;
    }
    if (!successStory.trim()) {
      setError("Success story is required.");
      return;
    }
    if (!isEditMode && !imageFile) {
      setError("Candidate image is required for new records.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("qualification", qualification.trim());
    formData.append("role", role.trim());
    formData.append("companies", JSON.stringify(filteredCompanies));
    formData.append("packages", JSON.stringify(filteredPackages));
    formData.append("successStory", successStory.trim());
    formData.append("imageAlt", imageAlt.trim());
    formData.append("sortOrder", sortOrder);
    formData.append("isPublished", forcePublish !== null ? forcePublish : isPublished);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEditMode) {
        await apiClient.patch(`/api/admin/placements/${id}`, formData, true);
        alert("Placement updated successfully.");
      } else {
        await apiClient.post("/api/admin/placements", formData, true);
        alert("Placement created successfully.");
      }
      navigate("/admin/placements");
    } catch (err) {
      setError(err.message || "Failed to save placement.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00D9B7]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/placements")}
            className="text-sm font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
          >
            &larr; Back to Dashboard
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sm:p-8">
          <h1
            className="text-2xl font-bold text-[#030A21] mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {isEditMode ? "Edit Placement Record" : "Add New Placement Record"}
          </h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
              <p className="text-sm font-semibold text-red-750">{error}</p>
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Uploader */}
              <div className="flex flex-col">
                <label className="block text-sm font-bold text-gray-700 mb-2">Candidate Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-all relative min-h-[220px]">
                  {imagePreview ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 rounded-full object-cover border-4 border-[#00D9B7] shadow"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(existingImageUrl || "");
                        }}
                        className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                      >
                        Reset Image
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-1 text-xs text-gray-550">Drag and drop or click to upload</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-[11px] text-gray-400 mt-1">
                  Supported formats: JPEG, PNG, WebP. Max file size: 5MB.
                </span>
              </div>

              {/* Core fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="candidate-name" className="block text-sm font-bold text-gray-700 mb-1">
                    Candidate Name *
                  </label>
                  <input
                    id="candidate-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                    placeholder="e.g. Dr. Saif Haque"
                  />
                </div>

                <div>
                  <label htmlFor="candidate-qualification" className="block text-sm font-bold text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    id="candidate-qualification"
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                    placeholder="e.g. MBBS, DNB"
                  />
                </div>

                <div>
                  <label htmlFor="candidate-role" className="block text-sm font-bold text-gray-700 mb-1">
                    Placement Role
                  </label>
                  <input
                    id="candidate-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                    placeholder="e.g. Optometrist, Drug Safety Physician"
                  />
                </div>
              </div>
            </div>

            {/* Repeatable Companies Inputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">Placed Companies *</label>
                <button
                  type="button"
                  onClick={addCompany}
                  className="text-xs text-[#00D9B7] font-bold hover:underline cursor-pointer"
                >
                  + Add Company
                </button>
              </div>
              <div className="space-y-2">
                {companies.map((company, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => handleCompanyChange(index, e.target.value)}
                      placeholder="e.g. Bajaj General Insurance"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                    />
                    {companies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCompany(index)}
                        className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100/50 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Repeatable Packages Inputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">Salary Packages *</label>
                <button
                  type="button"
                  onClick={addPackage}
                  className="text-xs text-[#00D9B7] font-bold hover:underline cursor-pointer"
                >
                  + Add Package
                </button>
              </div>
              <div className="space-y-2">
                {packages.map((pkg, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={pkg}
                      onChange={(e) => handlePackageChange(index, e.target.value)}
                      placeholder="e.g. 13 LPA"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                    />
                    {packages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePackage(index)}
                        className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100/50 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="success-story" className="block text-sm font-bold text-gray-700">Success Story *</label>
                <span className="text-xs text-gray-400 font-semibold">{successStory.length} characters</span>
              </div>
              <textarea
                id="success-story"
                rows={6}
                required
                value={successStory}
                onChange={(e) => setSuccessStory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm leading-relaxed"
                placeholder="Write candidate success story here..."
              ></textarea>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150">
              <div>
                <label htmlFor="image-alt" className="block text-sm font-bold text-gray-700 mb-1">Image Alt Text</label>
                <input
                  id="image-alt"
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                  placeholder="e.g. Dr. Saif Haque headshot"
                />
              </div>

              <div>
                <label htmlFor="display-order" className="block text-sm font-bold text-gray-700 mb-1">Display Order (Sort Order)</label>
                <input
                  id="display-order"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#00D9B7] focus:border-[#00D9B7] text-sm"
                  placeholder="e.g. 0, 1, 2"
                />
              </div>
            </div>

            {/* Publication Settings */}
            <div className="flex items-center gap-2 pt-2">
              <input
                id="published-status"
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 text-[#00D9B7] focus:ring-[#00D9B7] border-gray-300 rounded"
              />
              <label htmlFor="published-status" className="text-sm font-bold text-gray-700 cursor-pointer">
                Publish Immediately (Uncheck to save as Draft)
              </label>
            </div>

            {/* Control buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-gray-150">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="px-4 py-2 border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Preview Placement Modal
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/admin/placements")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-semibold cursor-pointer"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(null, false)}
                  className="px-4 py-2 border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100/50 rounded-lg text-sm font-semibold cursor-pointer"
                  disabled={loading}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00D9B7] text-[#030A21] font-bold rounded-lg text-sm hover:bg-[#00D9B7]/95 transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Saving..." : isEditMode ? "Save Changes" : "Publish"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Preview component */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setPreviewOpen(false)}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute right-4 top-4 cursor-pointer text-2xl font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start text-center sm:text-left">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={name || "Candidate"}
                    className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-[#00D9B7] object-cover shadow-md"
                  />
                ) : (
                  <div className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-[#00D9B7] bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold font-mono">
                    NO IMAGE
                  </div>
                )}
                <div className="flex-1 mt-2 sm:mt-0">
                  <h2
                    className="text-2xl font-bold text-[#030A21]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {name || "Candidate Name"}
                  </h2>
                  <p
                    className="text-sm font-semibold text-[#00D9B7] uppercase tracking-wide mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {role || "Candidate Role"}
                  </p>
                  <p
                    className="text-sm text-gray-500 mt-0.5"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {qualification || "Candidate Qualification"}
                  </p>
                  <div
                    className="mt-3 inline-block rounded-md bg-[#F7DD4B]/20 px-3 py-1 text-sm font-bold text-[#17264B]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {packages.filter(Boolean).join(" & ") || "No package"}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold text-gray-700">Placed At</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {companies.filter(Boolean).map((company) => (
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
                  {successStory ? `"${successStory}"` : "No success story entered yet."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminPlacementForm;
