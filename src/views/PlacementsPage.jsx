"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Rocket, 
  Award, 
  Handshake, 
  ArrowRight, 
  ShieldCheck, 
  X,
  Building2,
  CheckCircle2
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
      className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#F0FDFB]/70 via-[#F8FAFC] to-[#F8FAFC] text-slate-900 overflow-x-hidden relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO PLACEMENT HEADER SECTION (Matching uploaded photo) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 pt-4 sm:pt-6">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E6F8F5] border border-[#00D9B7]/40 text-[#00A88F] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-5 self-start shadow-2xs">
              <div className="w-4 h-4 rounded-full border border-[#00A88F] flex items-center justify-center p-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A88F]" />
              </div>
              <span>VERIFIED CAREER OUTCOMES</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] mb-4">
              Healthcare Careers,<br />
              <span className="bg-gradient-to-r from-[#00D9B7] via-[#00C4A7] to-[#00A88F] bg-clip-text text-transparent">
                Transformed.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl">
              Real professionals. Real career transitions. Proven industry outcomes.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#placements-grid"
                className="bg-[#00D9B7] hover:bg-[#00C4A7] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md shadow-[#00D9B7]/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Success Stories</span>
                <ArrowRight className="w-4.5 h-4.5 text-white" />
              </a>
              <Link
                href="/"
                className="border-2 border-[#00D9B7] text-[#00A88F] hover:bg-[#00D9B7]/10 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all"
              >
                View Career Programs
              </Link>
            </div>

            {/* Footer Stats Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 text-xs sm:text-sm font-semibold pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00D9B7]" />
                <span><strong className="text-slate-900 font-bold">500+</strong> professionals trained</span>
              </div>
              <span className="text-slate-300 font-bold">•</span>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#00D9B7]" />
                <span><strong className="text-slate-900 font-bold">100+</strong> career transitions</span>
              </div>
              <span className="text-slate-300 font-bold">•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00D9B7]" />
                <span><strong className="text-slate-900 font-bold">50+</strong> hiring partners</span>
              </div>
            </div>
          </div>

          {/* Right Cards Visual Showcase Column */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Background Ambient Glow & Mesh Elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E6F8F5]/80 via-[#F0FDFB] to-[#E6F3FF]/70 rounded-3xl -rotate-1 transform scale-105 blur-xs"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#00D9B7]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>

            {/* 3 Overlapping Doctor Image Cards */}
            <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-4 pb-2 px-2 sm:px-4">
              
              {/* CARD 1 (Left - Male Doctor) */}
              <div className="relative flex flex-col items-center">
                <div className="w-full h-56 sm:h-72 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden bg-gradient-to-b from-[#A5F3FC]/70 via-[#67E8F9] to-[#06B6D4] shadow-md border-2 border-white relative group">
                  <img
                    src="/Assets/Dr. Samir.webp"
                    alt="Dr. Samir Patwa"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Floating KPI Badge 1 */}
                <div className="w-[115%] sm:w-auto -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md shadow-xl border border-slate-100/90 rounded-2xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 z-20">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#E6F8F5] text-[#00A88F] flex items-center justify-center flex-shrink-0 font-extrabold text-xs sm:text-sm">
                    ₹
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">32 LPA</p>
                    <p className="text-[9px] sm:text-[11px] font-semibold text-slate-500 whitespace-nowrap">Highest Package</p>
                  </div>
                </div>
              </div>

              {/* CARD 2 (Center Prominent - Female Doctor) */}
              <div className="relative flex flex-col items-center z-10">
                <div className="w-full h-64 sm:h-84 rounded-t-[70px] sm:rounded-t-[100px] rounded-b-2xl overflow-hidden bg-gradient-to-b from-[#BFDBFE]/80 via-[#93C5FD] to-[#3B82F6] shadow-xl border-2 border-white relative group">
                  <img
                    src="/Assets/Laxmi.webp"
                    alt="Dr. Laxmi Bhardwaj"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Floating KPI Badge 2 */}
                <div className="w-[115%] sm:w-auto -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md shadow-xl border border-slate-100/90 rounded-2xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 z-20">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">100+</p>
                    <p className="text-[9px] sm:text-[11px] font-semibold text-slate-500 whitespace-nowrap">Career Transitions</p>
                  </div>
                </div>
              </div>

              {/* CARD 3 (Right - Male Doctor) */}
              <div className="relative flex flex-col items-center">
                <div className="w-full h-56 sm:h-72 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden bg-gradient-to-b from-[#C7D2FE]/70 via-[#A5B4FC] to-[#6366F1] shadow-md border-2 border-white relative group">
                  <img
                    src="/Assets/ApurvaKumar.webp"
                    alt="Dr. Apurvakumar Patel"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Floating KPI Badge 3 */}
                <div className="w-[115%] sm:w-auto -mt-6 sm:-mt-8 bg-white/95 backdrop-blur-md shadow-xl border border-slate-100/90 rounded-2xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 z-20">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#6366F1]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">50+</p>
                    <p className="text-[9px] sm:text-[11px] font-semibold text-slate-500 whitespace-nowrap">Hiring Partners</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* STUDENT PLACEMENTS CARDS GRID */}
        <section id="placements-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
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