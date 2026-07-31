"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Rocket, 
  Award, 
  Handshake, 
  ArrowRight, 
  ShieldCheck, 
  X,
  Building2
} from "lucide-react";
import { apiClient } from "../utils/apiClient";
import { formatS3Url } from "../utils/s3Helpers";

// Extended realistic upskilling placements data matching backup database
const placementCards = [
  {
    id: 1,
    name: "Dr. Saif Haque",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Saif.webp",
    companies: ["Bajaj General Insurance"],
    category: "Medical Affairs",
    story: "After eight years of pursuing MBBS at Shihezi University, China, graduating with a Certificate of Merit, learning Mandarin, and developing a deep understanding of healthcare...",
  },
  {
    id: 2,
    name: "Dr. Samir Patwa",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Samir.webp",
    companies: ["Bajaj General Insurance"],
    category: "Medical Affairs",
    story: "After years of navigating different paths — from pursuing medicine in India, completing my pre-med and MBBS in the Philippines, preparing for USMLE and FMGE...",
    location: "Sydney, Australia",
  },
  {
    id: 3,
    name: "Salman Junaid",
    qualification: "Pharm. D",
    package: "8 LPA and 7 LPA",
    image: "/Assets/Salman.webp",
    companies: ["Oviyia Medsafe", "Salocin"],
    category: "Pharmacovigilance",
    story: "After years of exploring different career paths across clinical pharmacy, clinical research, and international experience, I finally found the clarity...",
  },
  {
    id: 4,
    name: "Dr. Apurvakumar Patel",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/ApurvaKumar.webp",
    companies: ["Bajaj General Insurance"],
    category: "Freshers",
    story: "My dream was always to become a doctor. When NEET didn't work out, I pursued MBBS at Weifang Medical University, China...",
  },
  {
    id: 5,
    name: "Dr. Laxmi Bhardwaj",
    qualification: "MBBS, DNB, MBA",
    package: "32 LPA, 18 LPA",
    image: "/Assets/Laxmi.webp",
    companies: ["Tata Consultancy Services", "Fresenius Kabi"],
    category: "Clinical Research",
    story: "After years of building a successful career as an MBBS, DNB doctor, I reached a point where I had to choose between my professional responsibilities...",
  },
  {
    id: 6,
    name: "Dr. Shruti Vinod Ugemuge",
    qualification: "MBBS",
    package: "21 LPA",
    image: "/Assets/Shruti.webp",
    companies: ["Accenture"],
    category: "Pharmacovigilance",
    story: "After 15 years as a family physician following my graduation from SRTR Medical College, Ambejogai in 2010, I realised I wanted to explore new possibilities...",
  },
  {
    id: 7,
    name: "Dr. Krishna Priya C.C.",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Priya.webp",
    companies: ["Bajaj General Insurance"],
    category: "Pharmacovigilance",
    story: "I never took the easy path. I completed my MBBS from Metropolitan University School of Medicine in Antigua and Barbuda...",
  },
  {
    id: 8,
    name: "Dr. Chirankanth",
    qualification: "MBBS",
    package: "6 LPA",
    image: "/Assets/Chirankanth.webp",
    companies: ["Vizen Pharmaceuticals"],
    category: "Freshers",
    story: "I never planned to study medicine in China, but when opportunities in India were limited, I found my path at China Three Gorges University...",
  },
  {
    id: 9,
    name: "Dr. Pragya Mishra",
    qualification: "MBBS",
    package: "18 LPA",
    image: "/Assets/Pragya.webp",
    companies: ["Accenture"],
    category: "Pharmacovigilance",
    story: "After completing my MBBS and internship at Mahadevappa Rampure Medical College, I expected my next step to become clear...",
  },
  {
    id: 10,
    name: "Dr. Charmi Kosaraju",
    qualification: "MBBS, MD",
    package: "13 LPA",
    image: "/Assets/Charmi.webp",
    companies: ["Bajaj General Insurance"],
    category: "Experienced",
    story: "Five years in anaesthesia taught me the responsibility of protecting a patient’s life, but between ICU shifts, operation theatres...",
  },
  {
    id: 11,
    name: "Dr. Lamiya",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Lamiya.webp",
    companies: ["Bajaj General Insurance"],
    category: "Pharmacovigilance",
    story: "I have never taken the straight road, and every unconventional choice has shaped my journey. I began with a Bachelor of Science in Psychology...",
  },
  {
    id: 12,
    name: "Dr. Athira R K",
    qualification: "MBBS",
    package: "8.5 LPA",
    image: "/Assets/Athira.webp",
    companies: ["Trust Hospital"],
    category: "Experienced",
    story: "Dr. Athira Ravi, a Kochi-based doctor, believed she was living her dream after completing her MBBS from Sree Mookambika Institute...",
  },
  {
    id: 13,
    name: "Shazia Mulla",
    qualification: "M.Pharm",
    package: "5 LPA",
    image: "/Assets/Shazia.webp",
    companies: ["Salocin"],
    category: "Pharmacovigilance",
    story: "I completed my B.Pharm from KLE College of Pharmacy in 2023 and, like many pharmacy graduates, enrolled in M.Pharm...",
  },
  {
    id: 14,
    name: "Harshal Sanjay Barne",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Harshal.webp",
    companies: ["Bajaj General Insurance"],
    category: "Medical Affairs",
    story: "I am Dr. Harshal Sanjay Barne, an MBBS graduate from Caucasus International University, Tbilisi, Georgia...",
  },
  {
    id: 15,
    name: "Jetty Harsha Kumar",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Jetty.webp",
    companies: ["IKS Health"],
    category: "Medical Affairs",
    story: "I come from a family of doctors, so becoming one always felt inevitable, but after NEET-UG did not work out...",
  },
  {
    id: 16,
    name: "M. Seshaphani Shabarishwara",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Seshphani.webp",
    companies: ["Salocin"],
    category: "Medical Affairs",
    story: "I come from Gooty, a small city in Andhra Pradesh where pharmacy is one of the most common career paths...",
  },
  {
    id: 17,
    name: "Mohammed Khinath Shezan",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/khinath.webp",
    companies: ["Bajaj General Insurance"],
    category: "Medical Affairs",
    story: "In my family, becoming a doctor was not just a dream but an expectation. When my NEET-UG results did not go as planned...",
  },
  {
    id: 18,
    name: "Vineet",
    qualification: "BSc, MBBS, MPH",
    package: "13 LPA",
    image: "/Assets/Vineet.webp",
    companies: ["Bajaj General Insurance"],
    category: "Freshers",
    story: "Achieved remarkable career growth with industry-focused training and placement support through Academically.",
  },
  {
    id: 19,
    name: "Oshin Nirmal Neha",
    qualification: "MBBS",
    package: "11 LPA",
    image: "/Assets/NehaNirmal.webp",
    companies: ["AIIMS Delhi"],
    category: "Clinical Research",
    story: "Successfully transitioned into high-impact oncology research at AIIMS Delhi with comprehensive guidance and capstone project exposure.",
  },
  {
    id: 20,
    name: "Uday Mudhol",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Uday.webp",
    companies: ["Salocin"],
    category: "Medical Affairs",
    story: "I am Dr. Uday, a Pharm. D graduate from Rajiv Gandhi University of Health Sciences with a strong interest in clinical science...",
  },
  {
    id: 21,
    name: "Ayesha Naureen",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/ayesha.webp",
    companies: ["Bajaj General Insurance"],
    category: "Medical Affairs",
    story: "I am Dr. Ayesha Naureen, an MBBS graduate from NRI Medical College, Visakhapatnam, who completed a 12-month internship...",
  },
  {
    id: 22,
    name: "Nilesh Vijay Wani",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/nilesh.webp",
    companies: ["Bajaj General Insurance"],
    category: "Experienced",
    story: "I am Dr. Nilesh Wani, an MBBS graduate from Jalalabad State Medical University, Kyrgyzstan...",
  },
  {
    id: 23,
    name: "Deekshitha",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Deekshitha.webp",
    companies: ["Mitocon"],
    category: "Pharmacovigilance",
    story: "Transformed Pharm. D background into a rewarding pharmacovigilance role through Academically's practical capstone training.",
  }
];

// Helper component for stylized company badges matching reference screenshot 1
const CompanyBadge = ({ company }) => {
  const comp = (company || "").trim();
  let logoElem = null;

  if (comp.toLowerCase().includes("bajaj")) {
    logoElem = (
      <span className="w-5 h-5 rounded-full bg-[#004B87] text-white flex items-center justify-center font-black text-[10px]">
        B
      </span>
    );
  } else if (comp.toLowerCase().includes("oviya") || comp.toLowerCase().includes("medsafe")) {
    logoElem = (
      <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center p-[3px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="3.5" stroke="white" strokeWidth="2" />
        </svg>
      </span>
    );
  } else if (comp.toLowerCase().includes("accenture")) {
    logoElem = (
      <span className="w-5 h-5 rounded-full bg-[#A855F7] text-white flex items-center justify-center font-black text-[11px]">
        &gt;
      </span>
    );
  } else if (comp.toLowerCase().includes("tata") || comp.toLowerCase().includes("tcs")) {
    logoElem = (
      <span className="w-5 h-5 rounded-full bg-[#002F6C] text-white flex items-center justify-center font-black text-[10px]">
        T
      </span>
    );
  } else if (comp.toLowerCase().includes("vizen")) {
    logoElem = (
      <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-black text-[9px]">
        V
      </span>
    );
  } else {
    logoElem = (
      <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center">
        <Building2 className="w-3 h-3 text-white" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-2.5">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs flex-shrink-0">
        {logoElem}
      </div>
      <span className="text-white font-medium text-xs sm:text-sm tracking-tight truncate max-w-[140px] sm:max-w-[160px]">
        {comp}
      </span>
    </div>
  );
};

// Skeleton loading card
const SkeletonCard = () => (
  <div className="w-full bg-[#16273D] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between h-[230px] animate-pulse">
    <div className="flex justify-between items-start gap-3">
      <div className="w-3/5 space-y-3">
        <div className="w-24 h-5 bg-slate-700/60 rounded-md"></div>
        <div className="w-32 h-6 bg-slate-700/60 rounded-md"></div>
        <div className="w-20 h-4 bg-slate-700/60 rounded-md"></div>
        <div className="w-full h-10 bg-slate-700/40 rounded-md"></div>
      </div>
      <div className="w-2/5 h-40 bg-slate-700/60 rounded-lg"></div>
    </div>
    <div className="w-full h-8 bg-slate-700/50 rounded-lg mt-2"></div>
  </div>
);

// Sleek Dual-Column Placement Card matching original code schema
const PlacementCard = ({ placement, onPreview }) => {
  const imageSrc = formatS3Url(placement.imageUrl || placement.image) || "/Assets/doctor.webp";
  const packageText = Array.isArray(placement.packages) 
    ? placement.packages.join(" & ") 
    : (placement.package || "");
  const storyText = placement.story || placement.successStory || "Achieved remarkable career growth with industry-focused training and placement support.";
  const primaryCompany = (placement.companies && placement.companies.length > 0) 
    ? placement.companies[0] 
    : "Hiring Partner";

  return (
    <div 
      className="bg-gradient-to-br from-[#16273D] via-[#121F33] to-[#0E1726] rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full relative"
      onClick={() => onPreview(placement)}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top Main Section */}
      <div className="p-4 sm:p-4.5 pt-4 pb-3 flex flex-row items-stretch justify-between gap-2 flex-grow relative min-h-[195px]">
        {/* Left Column (Text Details) */}
        <div className="w-[56%] sm:w-[58%] flex flex-col justify-between z-20 pr-1">
          <div>
            {/* Company Badge */}
            <CompanyBadge company={primaryCompany} />

            {/* Student Name */}
            <h3 className="text-white font-bold text-base sm:text-[17px] tracking-tight leading-snug mb-0.5">
              {placement.name}
            </h3>

            {/* Qualification */}
            <p className="text-slate-400 text-[11px] sm:text-xs font-normal mb-2.5">
              {placement.qualification}
            </p>
          </div>

          {/* Story Quote Excerpt */}
          <p className="text-slate-300/90 text-[11px] leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal opacity-90">
            {storyText}
          </p>
        </div>

        {/* Right Column (Seamless Student Photo Cutout - No Gray Box) */}
        <div className="absolute top-0 right-0 w-[48%] sm:w-[50%] h-full overflow-hidden rounded-tr-2xl pointer-events-none z-10">
          <img
            src={imageSrc}
            alt={placement.imageAlt || placement.name}
            className="w-full h-full object-cover object-top filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600";
            }}
          />
          
          {/* Seamless Blue Tint & Overlay */}
          <div className="absolute inset-0 bg-[#121F33]/20 mix-blend-color"></div>
          
          {/* Left Edge Soft Dissolve Gradient */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-[#121F33] via-[#121F33]/70 to-transparent"></div>
          
          {/* Bottom Edge Fade into Footer */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0E1726] via-[#0E1726]/80 to-transparent"></div>
          
          {/* Top Edge Soft Vignette */}
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#16273D]/50 to-transparent"></div>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="bg-[#0A111C]/90 border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between z-20">
        {/* Package Pill */}
        <div className="bg-[#00D9B7] hover:bg-[#00C4A5] text-[#030A21] px-3 py-1 rounded-lg text-xs font-extrabold shadow-md shadow-[#00D9B7]/25 flex items-center gap-1">
          ₹ {packageText ? packageText : "Placed"}
        </div>

        {/* Action Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(placement);
          }}
          className="text-slate-200 group-hover:text-white font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View Success Story</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const PlacementsPage = ({ initialPlacements = [] }) => {
  const [placements, setPlacements] = useState(
    initialPlacements && initialPlacements.length > 0 ? initialPlacements : placementCards
  );
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (initialPlacements && initialPlacements.length > 0) {
      setPlacements(initialPlacements);
    }
    
    // Fetch real-time database placements from API
    async function loadDatabasePlacements() {
      try {
        const response = await fetch("/api/placements");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setPlacements(data);
          }
        }
      } catch (err) {
        console.error("Failed to load database placements from API:", err);
      }
    }

    loadDatabasePlacements();
  }, [initialPlacements]);

  const filterTabs = [
    "All", 
    "Medical Affairs", 
    "Clinical Research", 
    "Pharmacovigilance", 
    "Freshers", 
    "Experienced"
  ];

  // Dynamic filter logic
  const filteredPlacements = placements.filter((item) => {
    if (activeTab === "All") return true;
    const cat = item.category || "";
    const role = (item.role || "").toLowerCase();
    const qual = (item.qualification || "").toLowerCase();
    const story = (item.story || item.successStory || "").toLowerCase();

    if (activeTab === "Medical Affairs") {
      return cat === "Medical Affairs" || role.includes("medical affairs") || story.includes("medical affairs");
    }
    if (activeTab === "Clinical Research") {
      return cat === "Clinical Research" || role.includes("clinical research") || story.includes("clinical research");
    }
    if (activeTab === "Pharmacovigilance") {
      return cat === "Pharmacovigilance" || role.includes("pharmacovigilance") || story.includes("pharmacovigilance");
    }
    if (activeTab === "Freshers") {
      return cat === "Freshers" || qual.includes("mbbs") || qual.includes("pharm. d");
    }
    if (activeTab === "Experienced") {
      return cat === "Experienced" || qual.includes("md") || qual.includes("dnb");
    }
    return true;
  });

  const handleCloseModal = () => setSelectedPlacement(null);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPlacement(null);
    }
  };

  const modalImageSrc = selectedPlacement 
    ? formatS3Url(selectedPlacement.imageUrl || selectedPlacement.image) || "/Assets/doctor.webp"
    : "";
  const modalPackageText = selectedPlacement 
    ? (Array.isArray(selectedPlacement.packages) ? selectedPlacement.packages.join(" & ") : (selectedPlacement.package || "")) 
    : "";
  const modalStoryText = selectedPlacement 
    ? (selectedPlacement.successStory || selectedPlacement.story) 
    : "";

  return (
    <main 
      className="min-h-screen pt-28 pb-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F5F3FF] via-[#F8FAFC] to-[#F8FAFC] text-slate-900 overflow-x-hidden relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background Graphic Decoration (Shield with growth arrow top right) */}
      <div className="absolute top-12 right-6 md:right-16 pointer-events-none opacity-80 hidden md:block z-0">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-purple-200/40 rounded-full blur-3xl"></div>
          
          {/* Decorative Floating Shield Graphic */}
          <div className="relative z-10 transform translate-x-4 -translate-y-2">
            <svg width="220" height="200" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Shield Outline */}
              <path d="M120 20 C160 20, 200 35, 200 75 C200 135, 120 180, 120 180 C120 180, 40 135, 40 75 C40 35, 80 20, 120 20 Z" 
                stroke="url(#shield_grad)" strokeWidth="3" strokeDasharray="6 6" fill="url(#shield_fill)" fillOpacity="0.1" />
              {/* Inner Plus / Cross */}
              <path d="M120 50 V100 M95 75 H145" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              {/* Upward Growth Arrow */}
              <path d="M70 140 Q130 110 180 40 M180 40 H150 M180 40 V70" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="shield_grad" x1="40" y1="20" x2="200" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DDD6FE" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="shield_fill" x1="40" y1="20" x2="200" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EDE9FE" />
                  <stop offset="1" stopColor="#C4B5FD" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subtle Ambient Circles */}
          <div className="absolute top-4 left-2 w-10 h-10 border-2 border-purple-200/60 rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-6 h-6 border-2 border-indigo-200/50 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO HEADER SECTION */}
        <section className="relative mb-8 text-left">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#00D9B7]/15 border border-[#00D9B7]/30 text-[#008F78] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#008F78]" />
            <span>CAREER OUTCOMES</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-2">
                Student Success Stories
              </h1>
              <p className="text-slate-500 text-base sm:text-lg font-normal">
                Real professionals. Real career transformations.
              </p>
            </div>

            {/* Live Floating Badge Animation */}
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#00D9B7]/30 shadow-lg shadow-[#00D9B7]/10 self-start lg:self-auto transition-transform hover:scale-105 cursor-default">
              <div className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9B7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D9B7]"></span>
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-[#008F78] flex items-center gap-1">
                  <span>✨ 100% Placement Assistance</span>
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Verified Alumni Career Outcomes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FLOATING STATS KPI BAR */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-900/5 border border-slate-100 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 divide-slate-100">
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pr-4">
              <div className="w-11 h-11 rounded-xl bg-[#00D9B7]/15 border border-[#00D9B7]/25 flex items-center justify-center text-[#008F78] flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">500+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Professionals Trained</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-4 sm:border-l sm:border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-[#00D9B7]/15 border border-[#00D9B7]/25 flex items-center justify-center text-[#008F78] flex-shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">100+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Career Transitions</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-4 sm:border-l sm:border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-[#00D9B7]/15 border border-[#00D9B7]/25 flex items-center justify-center text-[#008F78] flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">32 LPA</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Highest Package</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 sm:pl-4 sm:border-l sm:border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-[#00D9B7]/15 border border-[#00D9B7]/25 flex items-center justify-center text-[#008F78] flex-shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">50+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Hiring Partners</p>
              </div>
            </div>
          </div>
        </section>


        {/* STUDENT PLACEMENTS CARDS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredPlacements.length > 0 ? (
            filteredPlacements.map((placement) => (
              <PlacementCard
                key={placement._id || placement.id}
                placement={placement}
                onPreview={setSelectedPlacement}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium">
              No placement records found under this filter category.
            </div>
          )}
        </section>

        {/* SUCCESS STORY DETAIL MODAL */}
        {selectedPlacement && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl transition-all">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute right-5 top-5 z-10 cursor-pointer w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left border-b border-slate-100 pb-6">
                  <img
                    src={modalImageSrc}
                    alt={selectedPlacement.name}
                    className="w-28 h-28 flex-shrink-0 rounded-2xl object-cover object-top border-4 border-purple-100 shadow-md bg-slate-100"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600";
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                      {selectedPlacement.role && (
                        <span className="bg-purple-100 text-[#7C3AED] px-3 py-1 rounded-full text-xs font-bold">
                          {selectedPlacement.role}
                        </span>
                      )}
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                        ₹ {modalPackageText || "Placed"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedPlacement.name}
                    </h2>

                    <p className="text-sm font-medium text-slate-500 mt-1">
                      {selectedPlacement.qualification}
                    </p>

                    {selectedPlacement.location && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        📍 {selectedPlacement.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Companies Placed In */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Placed At
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedPlacement.companies || []).map((company) => (
                      <CompanyBadge key={company} company={company} />
                    ))}
                  </div>
                </div>

                {/* Success Story Content */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Full Success Story
                  </h3>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 italic text-sm text-slate-700 leading-relaxed max-h-[260px] overflow-y-auto whitespace-pre-wrap">
                    "{modalStoryText}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlacementsPage;