"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

// Realistic upskilling placements data representing different medical categories.
const placementCards = [
  {
    id: 1,
    name: "Dr. Saif Haque",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Saif.webp",
    companies: ["Bajaj General Insurance"],
    story: "After eight years of pursuing MBBS at Shihezi University, China, graduating with a Certificate of Merit, learning Mandarin, and developing a deep understanding of healthcare and mental wellbeing, I returned to India with dreams of practicing medicine. However, setbacks in FMGE and AMC attempts left me uncertain about my future. That changed when I discovered Academically. Through personalised guidance, they helped me recognise that my communication skills, personality, and medical background were a perfect fit for a career as a Medical Affairs Professional. The industry-focused training, real-world case discussions, and sessions with experienced Medical Affairs professionals prepared me for a path I never knew existed. Today, I proudly graduate with my Executive Program in Medical Affairs — a journey that started with uncertainty and transformed into a career with purpose. Sometimes, one conversation can change everything.",
  },
  {
    id: 2,
    name: "Dr. Samir Patwa",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Dr. Samir.webp",
    companies: ["Bajaj General Insurance"],
    story: "After years of navigating different paths — from pursuing medicine in India, completing my pre-med and MBBS in the Philippines, preparing for USMLE and FMGE, and working with underserved communities at Tweet Foundation — I was searching for a career that truly connected all my experiences. That clarity came when I discovered Medical Affairs through Academically. The mentorship, real-world case discussions, industry sessions, and practical learning helped me understand that my medical background, communication skills, and passion for healthcare could come together in this role. Today, I proudly completed the Executive Program in Medical Affairs — a journey from Kolkata to the Philippines, from uncertainty to purpose, and finally towards a career path that feels truly mine.",
    location: "Sydney, Australia",
  },
  {
    id: 3,
    name: "Salman Junaid",
    qualification: "Pharm. D",
    package: "8 LPA and 7 LPA",
    image: "/Assets/Salman.webp",
    companies: ["Oviyia Medsafe", "Salocin"],
    story: "After years of exploring different career paths across clinical pharmacy, clinical research, and international experience, I finally found the clarity I was searching for. Academically helped me transform my skills through expert guidance, mock interviews, and a practical capstone project. Within 30 days, I secured an offer as a Pharmacovigilance Associate at Oviya Medsafe with an 8 LPA package. This journey gave me the confidence to step forward as a skilled and industry-ready professional, and I’ll always be grateful for the support.",
  },
  {
    id: 4,
    name: "Dr. Apurvakumar Patel",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/ApurvaKumar.webp",
    companies: ["Bajaj General Insurance"],
    story: "My dream was always to become a doctor. When NEET didn’t work out, I pursued MBBS at Weifang Medical University, China, where I learned the true meaning of patient care. After graduation, returning to India brought a new challenge — clearing FMGE, a difficult transition from a different medical curriculum. When I discovered Academically, I found an alternative path that allowed me to continue using my medical knowledge and create a larger impact. The Executive Program in Clinical Drug Development gave me the industry exposure, personalised guidance, mock interviews, and practical experience needed to build confidence. Today, after a transformative 4-month journey, I graduate with new skills, knowledge, and a clear career direction. This is just the beginning, and I’ll always be grateful to Academically for helping me find my path.",
  },
  {
    id: 5,
    name: "Dr. Laxmi Bhardwaj",
    qualification: "MBBS, DNB, MBA",
    package: "32 LPA, 18 LPA",
    image: "/Assets/Laxmi.webp",
    companies: ["Tata Consultancy Services", "Fresenius Kabi"],
    story: "After years of building a successful career as an MBBS, DNB doctor, I reached a point where I had to choose between my professional responsibilities and being present for my family. I never wanted to leave medicine — I just needed a better way to balance my passion and my life. Academically helped me discover the possibilities beyond traditional clinical practice. Through structured counselling, mock interviews, capstone projects, and industry-focused training, I gained the confidence to transition into clinical research and drug safety. Today, I have secured a Clinical Safety Physician role at Tata Consultancy Services with a 32 LPA package. I haven’t stepped away from medicine — I’ve expanded my role as a doctor and found a path where career growth and personal life can truly coexist.",
  },
  {
    id: 6,
    name: "Dr. Shruti Vinod Ugemuge",
    qualification: "MBBS",
    role: "Optometrist",
    package: "21 LPA",
    image: "/Assets/Shruti.webp",
    companies: ["Accenture"],
    story: "After 15 years as a family physician following my graduation from SRTR Medical College, Ambejogai in 2010, I realised I wanted to explore new possibilities while creating a better balance between my career and family. My journey into pharmacovigilance showed me that the skills I developed in clinical practice — patient care, treatment monitoring, and understanding drug responses — were already the foundation of drug safety. Through Academically’s Executive Program on Clinical Drug Development, with industry-focused learning and personalised guidance, I successfully transitioned into a new field. Today, I celebrate this new chapter, knowing that my 15 years of medicine were not the end of my journey, but the foundation for what comes next.",
  },
  {
    id: 7,
    name: "Dr. Krishna Priya C.C.",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Priya.webp",
    companies: ["Bajaj General Insurance"],
    story: "I never took the easy path. I completed my MBBS from Metropolitan University School of Medicine in Antigua and Barbuda, gained clinical exposure at Sentara Norfolk Hospital, Jackson Park Hospital, and Fortis International, and returned to India because this was where I wanted to build my life. However, after an unsuccessful FMGE attempt, I realised that my international experience alone was not enough to create a clear career path. Then I discovered Dr. Akram Ahmad’s Instagram reel on high-paying non-clinical roles and connected with Academically. Drug Safety and Pharmacovigilance immediately felt right because it allowed me to apply my clinical knowledge, patient-safety understanding, and documentation skills. Through personalised tutorials, real-world case discussions, industry-focused faculty, and sessions with leaders such as the Vice President of Cipla, I gained the practical understanding needed for the Indian pharmaceutical industry. Within just 30 days, I secured a ₹13 LPA role. Today, I am graduating with confidence and gratitude to Academically for helping me bring my global experience back home and turn it into a meaningful career.",
  },
  {
    id: 8,
    name: "Dr. Chirankanth",
    qualification: "MBBS",
    package: "6 LPA",
    image: "/Assets/Chirankanth.webp",
    companies: ["Vizen Pharmaceuticals"],
    story: "I never planned to study medicine in China, but when opportunities in India were limited, I found my path at China Three Gorges University in Yichang, where I spent five challenging yet meaningful years pursuing my dream. Returning to India felt like starting over, and despite having a medical degree and knowledge, I lacked clear direction in a highly competitive healthcare industry. Then I discovered Academically on Instagram and learned how my medical background could be valuable in Drug Safety and Pharmacovigilance. I enrolled in their Executive Program in Clinical Drug Development, where the industry-focused curriculum, mock interviews, capstone project, real-world exposure, and personalised guidance helped me grow from a student into a confident professional. Today, as I graduate, I finally have clarity, confidence, and a strong sense of where I belong. I am a survivor. Thank you, Academically.",
  },
 {
    id: 9,
    name: "Dr. Pragya Mishra",
    qualification: "MBBS",
    package: "18 LPA",
    image: "/Assets/Pragya.webp",
    companies: ["Accenture"],
    story: "After completing my MBBS and internship at Mahadevappa Rampure Medical College, I expected my next step to become clear, but instead I felt uncertain about where I truly belonged. Although my clinical rotations proved that I was capable, I realised that routine patient care was not where my curiosity was strongest. I wanted to understand why drugs fail, how adverse reactions are reported, who manages safety data, and how decisions are made to protect patients. After nearly two years of searching, I found Academically and discovered Pharmacovigilance. The industry-focused training, sessions with working drug safety professionals, guest experts from Eversana and Pfizer, and personalised one-to-one tutorials gave me both clarity and confidence. I realised that pharmacovigilance has the power to impact millions of patients and was exactly where I was meant to be. Today, I am graduating, and Academically has made sure I walk through the right door fully prepared.",
  },
   {
    id: 10,
    name: "Dr. Charmi Kosaraju",
    qualification: "MBBS, MD",
    package: "13 LPA",
    image: "/Assets/Charmi.webp",
    companies: ["Bajaj General Insurance"],
    story: "Five years in anaesthesia taught me the responsibility of protecting a patient’s life, but between ICU shifts, operation theatres, and my journey from Assistant Professor to Associate Professor, I began to feel that I was not using my full potential. I wanted to move beyond keeping individual patients safe during surgery and contribute to the safety of thousands through Drug Safety and Pharmacovigilance. Although the field had always interested me, I did not know how to transition until a friend recommended Academically after attending their webinar. Their counselling gave me the clarity I needed, and the Drug Safety Physician and Pharmacovigilance course transformed the way I viewed medicine. The mock interviews, capstone project, personalised guidance, one-to-one tutorials, industry guest lectures, and faculty currently working in drug safety helped me build confidence and direction. Today, as I graduate, I am grateful to Academically for showing me that my clinical experience was not a limitation but a strong foundation for the journey ahead. My story is just beginning, with many more opportunities and miles to go.",
  },
   {
    id: 11,
    name: "Dr. Lamiya",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Lamiya.webp",
    companies: ["Bajaj General Insurance"],
    story: "I have never taken the straight road, and every unconventional choice has shaped my journey. I began with a Bachelor of Science in Psychology from AMA Computer College in Manila because I wanted to understand people before treating them, and later completed my MBBS from AMA School of Medicine, gained clinical experience at Pasay City General Hospital, and cleared the challenging FMGE after returning to India. However, the available opportunities did not reflect the years of effort, sacrifice, and unique combination of psychology and clinical training I had built. Then I discovered Academically through an Instagram webinar on upskilling and non-clinical careers. Their counselling introduced me to Drug Safety and Pharmacovigilance, a field that perfectly connected my knowledge of human behaviour, medicine, clinical trials, and patient safety. The real-world case discussions, one-to-one tutorials, industry-focused faculty, and guest sessions with experts from Pfizer, Eversana, Cipla, AstraZeneca, and other leading organisations helped me understand how my background could become a strength. Today, I am graduating with a Postgraduate Certification in Drug Safety Physician and Pharmacovigilance, grateful to Academically for showing me that every winding road was leading me here. Soon, you will see me entering the pharmaceutical industry as a Drug Safety Physician or Medical Reviewer.",
  },
   {
    id: 12,
    name: "Dr. Athira R K",
    qualification: "MBBS",
    package: "8.5 LPA",
    image: "/Assets/Athira.webp",
    companies: ["Trust Hospital"],
    story: "Dr. Athira Ravi, a Kochi-based doctor, believed she was living her dream after completing her MBBS from Sree Mookambika Institute of Medical Sciences, earning certifications in Functional Medicine Clinical Nutrition and Diabetology, working as a Casualty Medical Officer, and teaching Pharmacology. However, after marriage, long night duties, unpredictable shifts, and the pressure of emergency care made it difficult to balance her professional and personal life. She did not want to leave medicine but lacked clarity about alternative career paths. That changed when she discovered Academically. Through personalised training, expert guidance, mock interviews, industry-focused modules, and a capstone project, she learned to present her clinical experience differently and prepare for better opportunities. Although she initially explored Drug Safety and Pharmacovigilance, the programme opened wider possibilities and helped her secure an ₹8.5 LPA role at a leading hospital in Kochi, offering greater growth, stability, and work-life balance. She did not leave medicine; she redefined how she practised it and created a career that could exist alongside the life she wanted.",
  },
   {
    id: 13,
    name: "Shazia Mulla",
    qualification: "M.Pharm",
    package: "5 LPA",
    image: "/Assets/Shazia.webp",
    companies: ["Salocin"],
    story: "I completed my B.Pharm from KLE College of Pharmacy in 2023 and, like many pharmacy graduates, enrolled in M.Pharm because I lacked a clear career direction. I chose Pharmacology because I was genuinely interested in toxicology, research, data analysis, method development, and understanding how drugs affect living systems. However, seeing highly qualified seniors struggle even after completing PhDs made me question whether collecting more degrees was the right path. One evening, I came across Dr. Akram from Academically Global speaking about how pharmacy graduates often remain trapped in an academic cycle while the industry moves ahead. His explanation of Drug Safety and Pharmacovigilance immediately connected with my background and interests. After speaking with the Academically team, I realised that my scientific knowledge was highly relevant to adverse-event monitoring, ICSR processing, MedDRA coding, regulatory reporting, and real-world patient safety. The industry-focused programme, practical case scenarios, and guidance from professionals helped bridge the gap between academia and industry. Today, I am graduating with a Postgraduate Certification in Drug Safety and Pharmacovigilance, prepared not for another examination, but for a meaningful career where my scientific work can directly protect patients.",
  },
   {
    id: 14,
    name: "Harshal Sanjay Barne",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Harshal.webp",
    companies: ["Bajaj General Insurance"],
    story: "I am Dr. Harshal Sanjay Barne, an MBBS graduate from Caucasus International University, Tbilisi, Georgia, with three years of clinical training across leading hospitals. My medical education helped me develop strong clinical reasoning, patient-management, communication, teamwork, and adaptability skills. I also contributed to a published case report on a rare dermatological condition, which strengthened my interest in research and scientific communication. My passion for understanding therapies, following evolving medical evidence, and simplifying complex information led me towards Medical Affairs. I am currently completing industry-focused MSL training at Academically Global Healthcare Academy. Through clinical rotations, conferences, workshops, presentations, and multicultural teamwork, I have developed discipline, resilience, ethical responsibility, and confidence under pressure. My goal is to build a successful career in Medical Affairs where I can combine my medical knowledge, research experience, presentation abilities, and communication skills to contribute to healthcare on a broader scale while continuing to learn, collaborate, and grow with a positive attitude.",
  },
   {
    id: 15,
    name: "Jetty Harsha Kumar",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/Jetty.webp",
    companies: ["IKS Health and Bajaj General Insurance"],
    story: "I come from a family of doctors, so becoming one always felt inevitable, but after NEET-UG did not work out, I pursued my MBBS at European University in Tbilisi, Georgia. Returning to Kadapa, I faced repeated challenges with FMGE and gradually began questioning whether the clinical path was truly right for me. The thought of choosing differently was difficult, especially in a family where everyone had followed the same profession. Then I discovered a reel by Dr. Akram Ahmad about non-clinical careers for doctors and learned that many people with similar backgrounds had built successful careers in the pharmaceutical industry. After a detailed counselling session with Academically, I confidently explained the opportunities, scope, and future of Medical Affairs and MSL roles to my parents, who supported my decision to enrol in the Executive Program in Medical Affairs. Through interactions with industry leaders from organisations such as Cipla and Pfizer, personalised mentorship, and practical industry guidance, I gained clarity and confidence that no traditional classroom had provided. Today, I am graduating and have secured a ₹7.5 LPA role at IKS Health. In a family where everyone followed the same path, I chose differently, and I am grateful to Academically for showing me that choosing another direction can also lead to success.",
  },
   {
    id: 16,
    name: "M. Seshaphani Shabarishwara",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Seshphani.webp",
    companies: ["Salocin"],
    story: "I come from Gooty, a small city in Andhra Pradesh where pharmacy is one of the most common career paths, and after completing my Pharm. D, I felt my options were limited to opening a medical store, pursuing a PhD, or entering academics. None of these paths offered the clarity, affordability, or certainty I was looking for, and because no one around me had chosen a different route, I felt completely stuck. One evening, while scrolling through Instagram, I came across a reel by Dr. Akram Ahmad featuring Salman Junaid, who had completed Academically’s MSL course and secured an ₹8 LPA job. I contacted Academically the same day, and after understanding my background and personality, the counsellor introduced me to careers in Medical Affairs, Drug Safety, and Pharmacovigilance. I chose Medical Science Liaison because it immediately felt right. The course was unlike a traditional classroom, with faculty who had real experience handling KOL interactions, representing leading pharmaceutical brands, and managing industry challenges. Practical sessions and the capstone project gave me the confidence to think and perform like an industry professional. Just one month after graduating, I was hired by Salocin as an MSL at ₹5 LPA. A month earlier, I believed I had reached a dead end; today, I have the confidence to evaluate opportunities because I know more will come. One different decision took me somewhere no one around me expected me to be.",
  },
   {
    id: 17,
    name: "Mohammed Khinath Shezan",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/khinath.webp",
    companies: ["Bajaj General Insurance"],
    story: "In my family, becoming a doctor was not just a dream but an expectation. When my NEET-UG results did not go as planned, I pursued my MBBS from Shihezi University in China and returned to India to face the difficult FMGE journey. After repeated unsuccessful attempts, I began working across Janaraksha Multi Specialty Hospital, Malar Hospital, and Kuppaishetty Health Clinic, but I gradually realised that the reality of being a duty doctor did not match the future I wanted. While searching for alternatives, I discovered Academically’s free career counselling, where I learned that my medical knowledge could be applied in the pharmaceutical industry through Medical Affairs and Medical Science Liaison roles. I enrolled in the Executive Program in Medical Affairs and MSL, where experienced industry professionals, practical sessions, and a real-world capstone project helped me understand KOL engagement, scientific communication, and how pharmaceutical decisions impact millions of patients. Today, I am graduating with clarity, confidence, and a career path that offers both professional respect and growth. Academically showed me that there was another way, and for the first time since returning from China, I know exactly where I am headed.",
  },
   {
    id: 18,
    name: "Vineet",
    qualification: "BSc, MBBS, MPH",
    package: "13 LPA",
    image: "/Assets/Vineet.webp",
    companies: ["Bajaj General Insurance"],
    story: "",
  },
   {
    id: 19,
    name: "Oshin Nirmal Neha",
    qualification: "MBBS",
    package: "11 LPA",
    image: "/Assets/NehaNirmal.webp",
    companies: ["AIIMS Delhi(Oncology)"],
    story: "",
  },
   {
    id: 20,
    name: "Uday Mudhol",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Uday.webp",
    companies: ["Salocin and IQVIA"],
    story: "I am Dr. Uday, a Pharm. D graduate from Rajiv Gandhi University of Health Sciences with a strong interest in clinical science, patient safety, research, and scientific communication. During my academic journey, I completed a thesis on Drug Utilization Evaluation in chronic kidney disease patients, focusing on renal dose adjustment, which strengthened my understanding of renal pharmacology, evidence-based prescribing, data interpretation, and individualized therapy. I also worked on two clinical case reports, developing skills in literature review, scientific writing, critical analysis, and medical documentation. Regular interactions with physicians during my research helped me discover my passion for scientific exchange and showed me how pharmacy knowledge can support clinical decision-making. Presenting disease-state topics at medical conferences further improved my confidence and ability to communicate complex information clearly to healthcare professionals. These experiences led me to explore Medical Affairs and the Medical Science Liaison role, where scientific expertise, KOL engagement, research understanding, and communication come together. I subsequently completed formal MSL training covering medical strategy, scientific exchange, compliance, and stakeholder engagement. Today, I am prepared to build a successful career in Medical Affairs by combining my PharmD foundation, research experience, presentation skills, and commitment to evidence-based patient care while continuing to learn, collaborate, and contribute meaningfully to the healthcare community.",
  },
{
    id: 21,
    name: "Ayesha Naureen",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/ayesha.webp",
    companies: ["Bajaj General Insurance"],
    story: "I am Dr. Ayeshaa Naureen, an MBBS graduate from NRI Medical College, Visakhapatnam, who completed a 12-month internship at Siddhartha Government Medical College, Vijayawada. Coming from a humble family, my medical journey involved significant personal and financial sacrifices, which shaped me into a calm, patient, and resilient person. After my internship, I worked night shifts as a junior doctor at Ramesh Cardiac Centre, served for two years as a Government Medical Officer at a Primary Health Centre, and later worked under an endocrinologist at Aster Hospitals in Bengaluru. I also performed COVID-19 duties for nearly a year. After marriage and the birth of my daughter, balancing demanding clinical responsibilities with my personal life began affecting my health and work-life balance. While exploring alternative career opportunities, I discovered Academically Global Healthcare Academy and enrolled in its Medical Affairs and Medical Science Liaison training programme. The course strengthened my understanding of Medical Affairs, scientific communication, teamwork, leadership, evidence-based medicine, and industry expectations while helping me apply my clinical experience beyond traditional hospital practice. I am sincerely grateful to Academically and especially to Dr. Ateeb, Dr. Nishtha, Dr. Skanda, and Dr. Jatin for their personalised guidance, mentorship, and commitment to making me industry-ready for a meaningful career in Medical Affairs.",
  },
  {
    id: 22,
    name: "Nilesh Vijay Wani",
    qualification: "MBBS",
    package: "13 LPA",
    image: "/Assets/nilesh.webp",
    companies: ["Bajaj General Insurance"],
    story: "I am Dr. Nilesh Wani, an MBBS graduate from Jalalabad State Medical University, Kyrgyzstan. My journey began with a strong interest in science, sports, and learning, but several difficult experiences, including witnessing a medical emergency and losing my mother to kidney failure, inspired me to pursue medicine and understand diseases more deeply. Despite financial challenges and limited family support, my father and I arranged loans to fund my medical education abroad. During MBBS, I actively visited hospitals and libraries beyond regular classes to gain practical knowledge, particularly in neurology, nephrology, cardiology, and pharmacology. After returning to India, I completed observerships under specialists and worked in a medical store, where I became increasingly concerned about medication side effects, irrational prescribing, and the need for stronger drug-safety systems. This led me to explore careers in Medical Affairs and Clinical Research, and I discovered Academically Global through YouTube. I enrolled in its industry-focused programme to pursue my goal of understanding medicines, clinical trials, safety data, and scientific communication. The faculty and mentors helped me improve my communication, recognise my strengths and weaknesses, adapt to professional situations, and gain confidence. My life has been full of challenges, but every experience has strengthened my determination to build a meaningful career where I can contribute to safer medicines and better patient outcomes.",
  },
  {
    id: 23,
    name: "Deekshitha",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/Deekshitha.webp",
    companies: ["Mitocon"],
    story: "",
  },
 {
    id: 24,
    name: "Uday Mudhol",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/",
    companies: ["Salocin and IQVIA"],
    story: "",
  },
  {
    id: 25,
    name: "Uday Mudhol",
    qualification: "Pharm. D",
    package: "5 LPA",
    image: "/Assets/",
    companies: ["Salocin and IQVIA"],
    story: "",
  },


];

const getPackageValue = (pkgString) => {
  if (!pkgString) return 0;
  const numbers = pkgString.match(/[\d.]+/g);
  if (!numbers) return 0;
  return Math.max(...numbers.map(Number));
};

const sortedPlacementCards = [...placementCards].sort((a, b) => 
  getPackageValue(b.package) - getPackageValue(a.package)
);

const SkeletonCard = () => (
  <div className="w-full border border-[#00D9B7]/25 bg-white shadow-sm flex flex-col h-full animate-pulse">
    <div className="p-4 flex flex-col h-full">
      <div className="w-full h-[300px] bg-gray-100 rounded-md mb-4 flex-shrink-0"></div>
      <div className="text-center flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="h-5 bg-gray-150 rounded-md w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-150 rounded-md w-1/2 mx-auto"></div>
        </div>
        <div>
          <div className="h-10 bg-gray-150 rounded-md w-full mb-3"></div>
          <div className="h-10 bg-gray-150 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const PlacementCard = ({ placement, onPreview }) => {
  const imageSrc = placement.imageUrl || placement.image;
  const packageText = Array.isArray(placement.packages) ? placement.packages.join(" & ") : (placement.package || "");

  return (
    <div className="w-full border border-[#00D9B7] bg-white shadow-sm flex flex-col h-full">
      <div className="p-4 flex flex-col h-full">
        {/* Image Container with Badges */}
        <div className="relative mb-4 overflow-hidden rounded-md bg-gray-50 flex-shrink-0">
          <img
            src={imageSrc}
            alt={placement.imageAlt || placement.name}
            className="w-full h-[300px] object-cover"
            loading="lazy"
          />
          {/* Companies badges overlaid on top-right of image */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            {(placement.companies || []).map((company) => (
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
              {packageText}
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
};

const PlacementsPage = ({ initialPlacements = [] }) => {
  const [placements, setPlacements] = useState(initialPlacements.length > 0 ? initialPlacements : []);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [loading, setLoading] = useState(initialPlacements.length === 0);

  useEffect(() => {
    if (initialPlacements.length === 0) {
      const fetchPlacements = async () => {
        try {
          setLoading(true);
          const data = await apiClient.get("/api/placements");
          if (data && data.length > 0) {
            setPlacements(data);
          } else {
            console.warn("No placement records returned by API, using hardcoded fallback.");
            setPlacements(sortedPlacementCards);
          }
        } catch (err) {
          console.error("API error loading placements, using hardcoded fallback:", err);
          setPlacements(sortedPlacementCards);
        } finally {
          setLoading(false);
        }
      };
      fetchPlacements();
    }
  }, [initialPlacements]);

  const handleCloseModal = () => setSelectedPlacement(null);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPlacement(null);
    }
  };

  const modalImageSrc = selectedPlacement ? (selectedPlacement.imageUrl || selectedPlacement.image) : "";
  const modalPackageText = selectedPlacement ? (Array.isArray(selectedPlacement.packages) ? selectedPlacement.packages.join(" & ") : (selectedPlacement.package || "")) : "";
  const modalStoryText = selectedPlacement ? (selectedPlacement.successStory || selectedPlacement.story) : "";

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
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          placements.map((placement) => (
            <PlacementCard
              key={placement._id || placement.id}
              placement={placement}
              onPreview={setSelectedPlacement}
            />
          ))
        )}
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
                  src={modalImageSrc}
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
                  {selectedPlacement.role && (
                    <p
                      className="text-sm font-semibold text-[#00D9B7] uppercase tracking-wide mt-1"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {selectedPlacement.role}
                    </p>
                  )}
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
                    {modalPackageText}
                  </div>
                </div>
              </div>

              {/* Companies Placed In */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold text-gray-700">Placed At</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(selectedPlacement.companies || []).map((company) => (
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
                <div className="mt-2 rounded-lg border-l-4 border-[#00D9B7] bg-gray-50 p-4 italic text-sm text-gray-600 leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre-wrap">
                  "{modalStoryText}"
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