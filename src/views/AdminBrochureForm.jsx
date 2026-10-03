import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "../utils/apiClient";
import AdminNav from "../Components/AdminNav";
import { formatS3Url } from "../utils/s3Helpers";
import { slugify } from "../utils/slugify";

const PRESET_CATEGORIES = [
  "Pharmacist",
  "Doctor",
  "Dentist",
  "Nursing",
  "Physiotherapist",
  "Optometrist",
  "Job Assistance",
  "Healthcare Professionals",
  "Other Professionals",
];

const PRESET_LOCATIONS = [
  "Australia",
  "New Zealand",
  "India",
  "USA",
  "UK",
  "Ireland",
  "Canada",
  "Dubai",
  "Saudi Arabia",
  "Oman",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "UAE",
  "Global",
];

const AdminBrochureForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const router = useRouter();

  // Basic Details
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Pharmacist");
  const [customCategory, setCustomCategory] = useState("");
  const [location, setLocation] = useState("Australia");
  const [customLocation, setCustomLocation] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("4 Months");
  const [audfees, setAudfees] = useState("");
  const [inrfees, setInrfees] = useState("");
  const [students, setStudents] = useState("1000+");

  // Brochure Preview Image (Upload or URL)
  const [brochureImageFile, setBrochureImageFile] = useState(null);
  const [brochureImageUrl, setBrochureImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Brochure PDF / Download Link (Upload or URL)
  const [brochurePdfFile, setBrochurePdfFile] = useState(null);
  const [brochureLinkUrl, setBrochureLinkUrl] = useState("");

  // Extra Media
  const [courseImageUrl, setCourseImageUrl] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Publishing
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  // Status and Admin
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [lastEditedBy, setLastEditedBy] = useState("");

  // Fetch admin session & existing brochure data if editing
  useEffect(() => {
    const init = async () => {
      try {
        const sessionData = await apiClient.get("/api/admin/auth/me");
        setAdmin(sessionData.admin);

        if (isEditMode) {
          setFetching(true);
          const data = await apiClient.get(`/api/admin/brochures/${id}`);
          setName(data.name || "");
          setSlug(data.slug || "");

          if (PRESET_CATEGORIES.includes(data.category)) {
            setCategory(data.category);
          } else {
            setCategory("Custom");
            setCustomCategory(data.category || "");
          }

          if (PRESET_LOCATIONS.includes(data.location)) {
            setLocation(data.location);
          } else {
            setLocation("Custom");
            setCustomLocation(data.location || "");
          }

          setDescription(data.description || "");
          setDuration(data.duration || "4 Months");
          setAudfees(data.audfees || "");
          setInrfees(data.inrfees || "");
          setStudents(data.students || "1000+");

          const formattedImage = formatS3Url(data.brochure) || "";
          setBrochureImageUrl(formattedImage);
          setImagePreview(formattedImage);

          const formattedDoc = formatS3Url(data.brochureLink) || "";
          setBrochureLinkUrl(formattedDoc);

          setCourseImageUrl(data.courseImage || "");
          setVideoLink(data.link || "");
          setSortOrder(data.sortOrder || 0);
          setIsPublished(data.isPublished !== false);

          setLastEditedBy(data.updatedByName || data.createdByName || "");
        }
      } catch (err) {
        console.error(err);
        if (err.message?.includes("Authentication required")) {
          router.push("/admin/login");
        } else {
          setError(err.message || "Failed to load brochure details.");
        }
      } finally {
        setFetching(false);
      }
    };

    init();
  }, [id, isEditMode]);

  // Handle Name change and auto-slugify if not manually edited
  const handleNameChange = (val) => {
    setName(val);
    if (!isEditMode && (!slug || slug === slugify(name))) {
      setSlug(slugify(val));
    }
  };

  // Image file handler
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image exceeds 10MB limit.");
        return;
      }
      setBrochureImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // PDF file handler
  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert("PDF document exceeds 25MB limit.");
        return;
      }
      setBrochurePdfFile(file);
    }
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a course name.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    const finalCategory = category === "Custom" ? customCategory.trim() : category;
    const finalLocation = location === "Custom" ? customLocation.trim() : location;

    if (!finalCategory) {
      alert("Please specify a category.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("slug", (slug || slugify(name)).trim());
      formData.append("category", finalCategory);
      formData.append("location", finalLocation);
      formData.append("description", description.trim());
      formData.append("duration", duration.trim());
      formData.append("audfees", audfees.trim());
      formData.append("inrfees", inrfees.trim());
      formData.append("students", students.trim());
      formData.append("brochure", brochureImageUrl.trim());
      formData.append("brochureLink", brochureLinkUrl.trim());
      formData.append("courseImage", courseImageUrl.trim());
      formData.append("link", videoLink.trim());
      formData.append("sortOrder", sortOrder);
      formData.append("isPublished", isPublished);

      if (brochureImageFile) {
        formData.append("brochureImageFile", brochureImageFile);
      }

      if (brochurePdfFile) {
        formData.append("brochurePdfFile", brochurePdfFile);
      }

      if (isEditMode) {
        await apiClient.patch(`/api/admin/brochures/${id}`, formData, true);
        alert("Brochure updated successfully!");
      } else {
        await apiClient.post("/api/admin/brochures", formData, true);
        alert("Brochure created successfully!");
      }

      router.push("/admin/brochures");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save brochure.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminNav admin={admin} title="Loading Brochure..." />
        <div className="max-w-4xl mx-auto p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00D9B7] border-t-transparent mb-4"></div>
          <p className="text-gray-500 text-sm">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminNav
        admin={admin}
        title={isEditMode ? "Edit / Replace Brochure" : "Add New Brochure"}
        subtitle={lastEditedBy ? `Last modified by ${lastEditedBy}` : ""}
      />

      <main className="max-w-7xl mx-auto pb-20 pt-8 px-4 sm:px-6 lg:px-8">
        {/* Back navigation & title */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/brochures")}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to brochures"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#030A21]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {isEditMode ? "Edit / Replace Brochure" : "Create New Brochure"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {isEditMode
                  ? "Update program details, replace brochure thumbnail or upload a new PDF document."
                  : "Fill in course info, fee structure, and attach brochure assets."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/brochures")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 bg-[#00D9B7] text-[#030A21] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#00c4a5] shadow-xs disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <span className="animate-spin">⏳</span>}
              {loading ? "Saving..." : isEditMode ? "Save Changes" : "Create Brochure"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-500 font-bold ml-4">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form (2 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* 1. Basic Course Details Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#030A21] border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-50 text-[#00D9B7] flex items-center justify-center text-xs font-bold">1</span>
                General Course Information
              </h3>

              <div className="space-y-4">
                {/* Course Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Course / Exam Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. OPRA Exam Preparation Course"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL Slug (Unique path)
                  </label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-xs text-gray-500 font-mono">
                      /
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      placeholder="opra-exam-preparation-course"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-r-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                    />
                  </div>
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="Custom">+ Other (Type Custom)</option>
                    </select>

                    {category === "Custom" && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category"
                        className="mt-2 w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Location / Region <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7] bg-white text-gray-700"
                    >
                      {PRESET_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                      <option value="Custom">+ Other (Type Custom)</option>
                    </select>

                    {location === "Custom" && (
                      <input
                        type="text"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        placeholder="Enter custom location"
                        className="mt-2 w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                      />
                    )}
                  </div>
                </div>

                {/* Course Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Course Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed description of the exam, course features, and syllabus..."
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Fees & Program Details Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#030A21] border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-50 text-[#00D9B7] flex items-center justify-center text-xs font-bold">2</span>
                Pricing & Program Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* AUD Fees */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Student Fees (AUD / International)
                  </label>
                  <input
                    type="text"
                    value={audfees}
                    onChange={(e) => setAudfees(e.target.value)}
                    placeholder="e.g. 2400 AUD"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* INR Fees */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Student Fees (INR / Local)
                  </label>
                  <input
                    type="text"
                    value={inrfees}
                    onChange={(e) => setInrfees(e.target.value)}
                    placeholder="e.g. 1,34,095 INR"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Months or 6 Months"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* Students Enrolled */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Students Enrolled Counter
                  </label>
                  <input
                    type="text"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    placeholder="e.g. 1500+"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Brochure Assets & Files (Image Preview & PDF) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#030A21] border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-50 text-[#00D9B7] flex items-center justify-center text-xs font-bold">3</span>
                Brochure Assets (Image Preview & PDF Document)
              </h3>

              {/* Brochure Image Thumbnail Section */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-700">
                  Brochure Preview Image / SVG (Displayed on Cards & Course Page)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload Option */}
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#00D9B7] rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 relative">
                    <input
                      type="file"
                      accept="image/*,.svg,.webp"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <svg className="w-7 h-7 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs font-medium text-gray-700">
                        {brochureImageFile ? brochureImageFile.name : "Upload new image/SVG file"}
                      </p>
                      <p className="text-[11px] text-gray-400">SVG, PNG, JPG, WebP up to 10MB</p>
                    </div>
                  </div>

                  {/* URL Input Option */}
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">
                      Or specify Image URL / Path:
                    </label>
                    <input
                      type="text"
                      value={brochureImageUrl}
                      onChange={(e) => {
                        setBrochureImageUrl(e.target.value);
                        if (!brochureImageFile) setImagePreview(e.target.value);
                      }}
                      placeholder="/CourseImage/OPRA EXAM Preparation Course.svg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                    />
                    {imagePreview && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
                        <span>✓ Asset selected</span>
                        <button
                          type="button"
                          onClick={() => {
                            setBrochureImageFile(null);
                            setBrochureImageUrl("");
                            setImagePreview("");
                          }}
                          className="text-red-500 hover:underline text-[11px]"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Brochure PDF Document Section */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-700">
                  Brochure PDF Document / Download Link
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PDF File Upload */}
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#00D9B7] rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <svg className="w-7 h-7 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-xs font-medium text-gray-700">
                        {brochurePdfFile ? brochurePdfFile.name : "Upload PDF Brochure to S3"}
                      </p>
                      <p className="text-[11px] text-gray-400">PDF documents up to 25MB</p>
                    </div>
                  </div>

                  {/* Drive or PDF link */}
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">
                      Or direct Google Drive / PDF URL:
                    </label>
                    <input
                      type="url"
                      value={brochureLinkUrl}
                      onChange={(e) => setBrochureLinkUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/... or https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                    />
                    {brochureLinkUrl && (
                      <div className="mt-2 flex items-center gap-2">
                        <a
                          href={brochureLinkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-teal-600 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link ↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Media & Video Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#030A21] border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-50 text-[#00D9B7] flex items-center justify-center text-xs font-bold">4</span>
                Video & Media Links
              </h3>

              <div className="space-y-4">
                {/* Video Link */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    YouTube / Intro Video URL
                  </label>
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* Course Banner Image */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Course Banner Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={courseImageUrl}
                    onChange={(e) => setCourseImageUrl(e.target.value)}
                    placeholder="https://assets.academically.com/course/..."
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>
              </div>
            </div>

            {/* 5. Publishing Settings */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#030A21] border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-50 text-[#00D9B7] flex items-center justify-center text-xs font-bold">5</span>
                Publishing & Ordering
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Sort Order */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Sort Order (Lower numbers appear first)
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9B7]"
                  />
                </div>

                {/* Status Toggle */}
                <div className="pt-4 sm:pt-0">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-5 h-5 text-[#00D9B7] rounded focus:ring-[#00D9B7] border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-900 block">
                        Publish on Live Website
                      </span>
                      <span className="text-xs text-gray-500">
                        {isPublished ? "Visible to students and counselors" : "Saved as hidden draft"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/brochures")}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#00D9B7] text-[#030A21] rounded-lg text-sm font-bold hover:bg-[#00c4a5] shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <span className="animate-spin">⏳</span>}
                {loading ? "Saving Brochure..." : isEditMode ? "Save Changes" : "Create & Publish"}
              </button>
            </div>
          </form>

          {/* Right Column: Interactive Live Card Preview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs sticky top-24">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D9B7] animate-pulse"></span>
                Live Public Card Preview
              </h3>

              {/* Simulated Course Card */}
              <div className="border border-[#00D9B7] rounded-lg overflow-hidden flex flex-col justify-between bg-white shadow-xs">
                <div className="p-4 flex flex-col h-full justify-between">
                  <div>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={name || "Course preview"}
                        className="mb-3 rounded-md bg-white w-full h-44 object-contain p-1 border border-gray-100"
                        onError={(e) => {
                          e.target.src = "/CourseImage/OPRA EXAM Preparation Course.svg";
                        }}
                      />
                    ) : (
                      <div className="mb-3 rounded-md bg-gray-100 h-44 flex flex-col items-center justify-center text-gray-400 p-4 border border-dashed border-gray-300">
                        <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">No image selected</span>
                      </div>
                    )}

                    <div className="text-left min-h-[3rem] flex items-center">
                      <h4 className="font-semibold text-base text-[#030A21] line-clamp-2">
                        {name || "Course / Exam Title"}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      <span
                        className="text-gray-700 px-2 py-1 rounded"
                        style={{ background: "rgba(153, 246, 228, 0.4)" }}
                      >
                        📍 {category === "Custom" ? customLocation || "Location" : location}
                      </span>
                      {(audfees || inrfees) && (
                        <span
                          className="text-gray-700 px-2 py-1 rounded font-medium"
                          style={{ background: "rgba(153, 246, 228, 0.4)" }}
                        >
                          💰 {audfees || inrfees}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="px-4 py-2 w-full bg-[#00D9B7] font-semibold text-[#030A21] text-xs text-center rounded-md">
                      Preview Course Page
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Info */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold text-gray-700">{category === "Custom" ? customCategory || "Custom" : category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-gray-700">{duration || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Brochure Document:</span>
                  <span className="font-semibold text-gray-700">{brochurePdfFile ? "Uploaded PDF" : brochureLinkUrl ? "Link Attached" : "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Publish Status:</span>
                  <span className={`font-semibold ${isPublished ? "text-emerald-600" : "text-amber-600"}`}>
                    {isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminBrochureForm;
