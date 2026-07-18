import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Realistic upskilling placements data representing different medical categories.
const placementCards = [
  {
    id: 1,
    name: "Dr. Saif Haque",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Saif.jpeg",
    companies: ["Bajaj General Insurance"],
    story: "After eight years of pursuing MBBS at Shihezi University, China, graduating with a Certificate of Merit, learning Mandarin, and developing a deep understanding of healthcare and mental wellbeing, I returned to India with dreams of practicing medicine. However, setbacks in FMGE and AMC attempts left me uncertain about my future. That changed when I discovered Academically. Through personalised guidance, they helped me recognise that my communication skills, personality, and medical background were a perfect fit for a career as a Medical Science Liaison. The industry-focused training, real-world case discussions, and sessions with experienced MSL professionals prepared me for a path I never knew existed. Today, I proudly graduate with my Postgraduate Certification in Medical Science Liaison — a journey that started with uncertainty and transformed into a career with purpose. Sometimes, one conversation can change everything.",
  },
  {
    id: 2,
    name: "Dr. Samir Patwa",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Samir.jpeg",
    companies: ["Bajaj General Insurance"],
    story: "After years of navigating different paths — from pursuing medicine in India, completing my pre-med and MBBS in the Philippines, preparing for USMLE and FMGE, and working with underserved communities at Tweet Foundation — I was searching for a career that truly connected all my experiences. That clarity came when I discovered Medical Science Liaison through Academically. The mentorship, real-world case discussions, industry sessions, and practical learning helped me understand that my medical background, communication skills, and passion for healthcare could come together in this role. Today, I proudly complete my Postgraduate Certification in Medical Science Liaison and Medical Affairs — a journey from Kolkata to the Philippines, from uncertainty to purpose, and finally towards a career path that feels truly mine.",
    location: "Sydney, Australia",
  },
  {
    id: 3,
    name: "Salman Junaid",
    qualification: "Pharma.D.",
    package: "8 LPA and 7 LPA",
    image: "/Assets/Dr. Salman Junaid.jpeg",
    companies: ["Oviyia Medsafe", "Salocin"],
    story: "After years of exploring different career paths across clinical pharmacy, clinical research, and international experience, I finally found the clarity I was searching for. Academically helped me transform my skills through expert guidance, mock interviews, and a practical capstone project. Within 30 days, I secured an offer as a Pharmacovigilance Associate at Oviya Medsafe with an 8 LPA package. This journey gave me the confidence to step forward as a skilled and industry-ready professional, and I’ll always be grateful for the support.",
  },
  {
    id: 4,
    name: "Dr. Apurvakumar Patel",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Apurva.jpeg",
    companies: ["Bajaj General Insurance"],
    story: "My dream was always to become a doctor. When NEET didn’t work out, I pursued MBBS at Weifang Medical University, China, where I learned the true meaning of patient care. After graduation, returning to India brought a new challenge — clearing FMGE, a difficult transition from a different medical curriculum. When I discovered Academically, I found an alternative path that allowed me to continue using my medical knowledge and create a larger impact. The Postgraduate Certification in Drug Safety Physician and Pharmacovigilance gave me the industry exposure, personalised guidance, mock interviews, and practical experience needed to build confidence. Today, after a transformative 4-month journey, I graduate with new skills, knowledge, and a clear career direction. This is just the beginning, and I’ll always be grateful to Academically for helping me find my path.",
  },
  {
    id: 5,
    name: "Dr. Laxmi Bhardwaj",
    qualification: "MBBS, DNB, MBA",
    package: "32 LPA, 18 LPA",
    image: "/Assets/Dr. Laxmi.jpeg",
    companies: ["Tata Consultancy Services", "Fresenius Kabi"],
    story: "After years of building a successful career as an MBBS, DNB doctor, I reached a point where I had to choose between my professional responsibilities and being present for my family. I never wanted to leave medicine — I just needed a better way to balance my passion and my life. Academically helped me discover the possibilities beyond traditional clinical practice. Through structured counselling, mock interviews, capstone projects, and industry-focused training, I gained the confidence to transition into clinical research and drug safety. Today, I have secured a Clinical Safety Physician role at Tata Consultancy Services with a 32 LPA package. I haven’t stepped away from medicine — I’ve expanded my role as a doctor and found a path where career growth and personal life can truly coexist.",
  },
  {
    id: 6,
    name: "Dr. Shruti Vinod Ugemuge",
    qualification: "MBBS",
    role: "Optometrist",
    package: "21 LPA",
    image: "/Assets/Dr. Shruti.jpeg",
    companies: ["Accenture"],
    story: "After 15 years as a family physician following my graduation from SRTR Medical College, Ambejogai in 2010, I realised I wanted to explore new possibilities while creating a better balance between my career and family. My journey into pharmacovigilance showed me that the skills I developed in clinical practice — patient care, treatment monitoring, and understanding drug responses — were already the foundation of drug safety. Through Academically’s Drug Safety Physician and Pharmacovigilance Program, with industry-focused learning and personalised guidance, I successfully transitioned into a new field. Today, I celebrate this new chapter, knowing that my 15 years of medicine were not the end of my journey, but the foundation for what comes next.",
  },
  {
    id: 7,
    name: "Dr. Priya",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Priya.jpeg",
    companies: ["Bajaj General Insurance"],
    story: "After years of building a successful career as an MBBS, DNB doctor, I reached a point where I had to choose between my professional responsibilities and being present for my family. I never wanted to leave medicine — I just needed a better way to balance my passion and my life. Academically helped me discover the possibilities beyond traditional clinical practice. Through structured counselling, mock interviews, capstone projects, and industry-focused training, I gained the confidence to transition into clinical research and drug safety. Today, I have secured a Clinical Safety Physician role at Tata Consultancy Services with a 32 LPA package. I haven’t stepped away from medicine — I’ve expanded my role as a doctor and found a path where career growth and personal life can truly coexist.",
  },
  {
    id: 8,
    name: "Dr. Chirankanth",
    qualification: "MBBS",
    package: "6 LPA",
    image: "/Assets/Dr. Priya.jpeg",
    companies: ["Bajaj General Insurance"],
    story: "After years of building a successful career as an MBBS, DNB doctor, I reached a point where I had to choose between my professional responsibilities and being present for my family. I never wanted to leave medicine — I just needed a better way to balance my passion and my life. Academically helped me discover the possibilities beyond traditional clinical practice. Through structured counselling, mock interviews, capstone projects, and industry-focused training, I gained the confidence to transition into clinical research and drug safety. Today, I have secured a Clinical Safety Physician role at Tata Consultancy Services with a 32 LPA package. I haven’t stepped away from medicine — I’ve expanded my role as a doctor and found a path where career growth and personal life can truly coexist.",
  },
];

const PlacementCard = ({ placement, onPreview }) => (
  <div className="w-full border border-[#00D9B7] bg-white shadow-sm flex flex-col h-full">
    <div className="p-4 flex flex-col h-full">
      {/* Image Container with Badges */}
      <div className="relative mb-4 overflow-hidden rounded-md bg-gray-50 flex-shrink-0">
        <img
          src={placement.image}
          alt={placement.name}
          className="w-full h-[300px] object-cover"
        />
        {/* Companies badges overlaid on top-right of image */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {placement.companies.map((company) => (
            <span
              key={company}
              className="rounded bg-white/95 px-3 py-1.5 text-xs font-bold text-[#17264B] shadow-sm border border-gray-100/50"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* Main Details */}
      <div className="text-center flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-semibold text-[#030A21] mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {placement.name}
          </h3>
          <p
            className="text-sm font-medium text-gray-500 mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {placement.qualification}
          </p>
        </div>

        {/* Package & Preview Button */}
        <div>
          <div
            className="mb-3 text-lg font-bold text-[#17264B] bg-[#F7DD4B]/20 py-2 rounded-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {placement.package}
          </div>
          <button
            onClick={() => onPreview(placement)}
            className="w-full px-4 py-2 bg-[#00D9B7] font-semibold text-[#030A21] text-sm sm:text-base rounded-md hover:bg-[#00D9B7]/90 transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PlacementsPage = () => {
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => setSelectedPlacement(null);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPlacement(null);
    }
  };

  return (
    <main className="min-h-screen px-8 pt-28 pb-12 max-sm:px-4 bg-[#F8FAFC]" aria-labelledby="placements-title">
      <h1
        id="placements-title"
        className="mb-8 text-center text-3xl font-semibold text-[#030A21]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Upskilling Placements
      </h1>

      {/* Grid containing the cards */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-4">
        {placementCards.map((placement) => (
          <PlacementCard
            key={placement.id}
            placement={placement}
            onPreview={setSelectedPlacement}
          />
        ))}
      </section>

      {/* Details Modal */}
      {selectedPlacement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 cursor-pointer text-2xl font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="p-6 sm:p-8">
              {/* Header Info */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start text-center sm:text-left">
                <img
                  src={selectedPlacement.image}
                  alt={selectedPlacement.name}
                  className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-[#00D9B7] object-cover shadow-md"
                />
                <div className="flex-1 mt-2 sm:mt-0">
                  <h2
                    className="text-2xl font-bold text-[#030A21]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selectedPlacement.name}
                  </h2>
                  <p
                    className="text-sm font-semibold text-[#00D9B7] uppercase tracking-wide mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selectedPlacement.role}
                  </p>
                  <p
                    className="text-sm text-gray-500 mt-0.5"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selectedPlacement.qualification}
                  </p>
                  <div
                    className="mt-3 inline-block rounded-md bg-[#F7DD4B]/20 px-3 py-1 text-sm font-bold text-[#17264B]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selectedPlacement.package}
                  </div>
                </div>
              </div>

              {/* Companies Placed In */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold text-gray-700">Placed At</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPlacement.companies.map((company) => (
                    <span
                      key={company}
                      className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-[#17264B]"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* Success Story */}
              <div className="mt-5">
                <h3 className="text-sm font-bold text-gray-700">Success Story</h3>
                <div className="mt-2 rounded-lg border-l-4 border-[#00D9B7] bg-gray-50 p-4 italic text-sm text-gray-600 leading-relaxed">
                  "{selectedPlacement.story}"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PlacementsPage;