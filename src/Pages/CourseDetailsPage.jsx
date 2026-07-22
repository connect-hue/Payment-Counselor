import { useLocation } from "react-router-dom";

function CourseDetailsPage() {
    const location = useLocation();
    const coursesData = location.state?.course;
    const pathName = location.pathname;

    const coursesObject = [
        {
            "name": "OPRA Exam Preparation Course",
            "category": "Australia",
            "description": "Pass the Overseas Pharmacist Readiness Assessment (OPRA) exam on your first attempt with the best online OPRA coaching. Our OPRA preparation course includes online classes, extensive study resources, and AI-driven mock tests, making it the ideal OPRA Exam Preparation Course for international pharmacists seeking to move to and practise in Australia. Enrol in our trusted course today and confidently pass the Overseas Pharmacist Readiness Assessment (OPRA) exam with ease.",
            "brochure": "/CourseImage/OPRA EXAM Preparation Course.svg",
            "brochureLink": "https://drive.google.com/file/d/1ow4QJwEtS4gYfahsSkL4Uldf6b0wcEbJ/view?usp=drive_link",
            "duration": "4 Months",
            "audfees": "2400 AUD",
            "inrfees": "1,34,095 INR",
            "students": "1500+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/BGqIOppn2my3OG7VuqtmfGWKPh01c5oXK2FuCgmE.jpg",
            "link": "https://youtu.be/N3gZs_jLqrk",
            "pathname": "/opra-exam-preparation-course"
        },
        {
            "name": "GPAT Exam Preparation Course",
            "category": "Pharmacist",
            "description": "Pass the Graduate Pharmacy Aptitude Test (GPAT) on your first attempt with our comprehensive GPAT Preparation Course! Designed for BPharm graduates aiming to pursue an MPharm program, this course offers everything you need to succeed: complete study materials, interactive online classes, previous year question banks, AI-driven mock tests, and more. With our GPAT Preparation Course, you'll be fully prepared to excel in the GPAT and secure admission to the top MPharmacy colleges in India. Enrol today to achieve your academic and career goals!",
            "brochure": "/CourseImage/GPAT EXAM.svg",
            "audfees": "275 AUD",
            "inrfees": "14,999 INR",
            "brochureLink": "https://drive.google.com/file/d/106Qfy88o6slPT4HAbD939fjAymtSayvn/view?usp=drive_link",
            "duration": "4 Months",
            "students": "2000+",
            "location": "India",
            "courseImage": "https://assets.academically.com/course/znGUIriWGLvKqjy9Q3XqLbo9xSGZPelBPJ17qwdZ.jpg",
            "link": "https://youtu.be/4e3jHkSHUgo",
            "pathname": "/gpat-exam-preparation-course"
        },
        {
            "name": "OPRA Exam Crash Course",
            "category": "Pharmacist",
            "description": "The OPRA preparation crash course by Academically is a cost-effective way to clear the Knowledge Assessment of Pharmaceutical Sciences (OPRA) Exam. This course offers you all the resources you need without having to go anywhere.",
            "brochure": "/CourseImage/OPRA EXAM CRASH COURSE.svg",
            "brochureLink": "https://drive.google.com/file/d/1ow4QJwEtS4gYfahsSkL4Uldf6b0wcEbJ/view?usp=drive_link",
            "duration": "4 Months",
            "audfees": "2000 AUD",
            "inrfees": "1,10,000 INR",
            "students": "800+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/m9OxRX1uyBiNmDXBsDZ4QxExXFnbpwfxy2jXEAC8.jpg",
            "link": "https://youtu.be/N3gZs_jLqrk",
            "pathname": "/opra-exam-crash-course"
        },
        {
            "name": "NIPER JEE Exam Preparation Course",
            "category": "Pharmacist",
            "description": "Enrolling in Academically's NIPER JEE Preparation Course can help you pass the National Institutes of Pharmaceutical Education and Research Joint Entrance Exam (NIPER JEE) on the first attempt. Study materials, recorded and live lectures, AI-powered practice exams, and individualized coaching are all available in this extensive course. You will be well-prepared for the test with our NIPER JEE Preparation Course, increasing your chances of getting accepted into this highly prestigious institution.",
            "brochure": "/CourseImage/NIPER JEE EXAM Preparation Course.svg",
            "audfees": "275 AUD",
            "inrfees": "14,999 INR",
            "brochureLink": "https://drive.google.com/file/d/106Qfy88o6slPT4HAbD939fjAymtSayvn/view?usp=drive_link",
            "duration": "4 Months",
            "students": "1200+",
            "location": "India",
            "courseImage": "https://assets.academically.com/course/bDMKepLpAmoRMxuo80So3VfZo6Evo0z8b8Y2pLfi.jpg",
            "link": "https://youtu.be/RrmAJdaIWrA",
            "pathname": "/niper-jee-exam-preparation-course"
        },
        {
            "name": "New Zealand OPRA Exam Coaching and Preparation Course",
            "category": "Pharmacist",
            "description": "Best NZ OPRA Exam Coaching around the globe. Crack the OPRA Exam on your first attempt through our specialised online classes, tailored study materials, and AI-based OPRA mock tests for pharmacists aspiring to make a career in New Zealand (NZ).",
            "brochure": "/CourseImage/New Zealand OPRA EXAM COURSE.svg",
            "audfees": "2400 AUD",
            "inrfees": "1,34,095 INR",
            "brochureLink": "https://drive.google.com/file/d/1ow4QJwEtS4gYfahsSkL4Uldf6b0wcEbJ/view?usp=drive_link",
            "duration": "4 Months",
            "students": "1000+",
            "location": "New Zealand",
            "courseImage": "https://assets.academically.com/course/cnO0YNVGd0uU9X7K2ujYelMGUyIK4VUseKmi64z5.jpg",
            "link": "https://youtu.be/4bhDplI-XSY",
            "pathname": "/new-zealand-opra-exam-coaching-and-preparation-course"
        },
        {
            "name": "PSI Pharmacy Equivalence Exam (TCQR)",
            "category": "Pharmacist",
            "description": "Clear the Pharmaceutical Society of Ireland Equivalence Examination on your first attempt with our online course designed for professional pharmacists trying to migrate to Ireland.",
            "brochure": "/CourseImage/PSI Pharmacy Equivalence EXAM.svg",
            "audfees": "2400 AUD",
            "inrfees": "1,34,660 INR",
            "brochureLink": "https://drive.google.com/file/d/1svnbByUb_lFx9HKnAvAy0LWvoMxOLSXr/view?usp=drive_link",
            "duration": "4 Months",
            "students": "900+",
            "location": "Ireland",
            "courseImage": "https://assets.academically.com/course/MfoqqJ3CMVO7gmN5MUjaYxtGTB3UII89r7XxbWpn.jpg",
            "link": "https://youtu.be/btnftDz7mfU",
            "pathname": "/psi-pharmacy-equivalence-exam-tcqr"
        },
        {
            "name": "SPLE Preparation Course",
            "category": "Pharmacist",
            "description": "Clear the Saudi Pharmacist Licensure Examination on your first attempt with our online course designed for professional pharmacists trying to migrate to Saudi Arabia.",
            "brochure": "/CourseImage/SPLE EXAM.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "duration": "6 Months",
            "students": "1100+",
            "location": "Saudi Arabia",
            "courseImage": "https://assets.academically.com/course/YykiyUJwc4EK6LzpIwA8VFqnNDZRmyzHGaO8UKNV.jpg",
            "link": "https://youtu.be/As36LK4QRD8",
            "pathname": "/sple-preparation-course"
        },
        {
            "name": "Oman Prometric Exam Preparation Course for Pharmacists",
            "category": "Pharmacist",
            "description": "Pass the Oman Prometric Exam for pharmacists on your first attempt with the Best Oman Pharmacist Exam Coaching—comprehensive online classes, study materials, and AI-based mock tests. Our Oman Pharmacy Preparation course is designed for experienced pharmacists who want to migrate to and practice pharmacy in Oman. Clear the Omani Examination for Pharmacists with confidence and ease. Join our proven program today!",
            "brochure": "/CourseImage/OMAN Prometric Exam.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "duration": "6 Months",
            "students": "700+",
            "location": "Oman",
            "courseImage": "https://assets.academically.com/course/AFOWNHSXuVtInHEkOx6Oe5uOsTw2O2eJ5EGuitKl.jpg",
            "link": "https://youtu.be/HJDO7abS9mg",
            "pathname": "/oman-prometric-exam-preparation-course-for-pharmacists"
        },
        {
            "name": "DHA Exam Preparation Course for Pharmacists",
            "category": "Pharmacist",
            "description": "Get the best coaching for the Dubai Health Authority (DHA) Exam to become a licensed pharmacist in Dubai. For pharmacists who want to make their career in Dubai, our specialised online classes, tailored study materials, and AI-based mock tests are designed to help you crack the DHA Exam on your first attempt.",
            "brochure": "/CourseImage/DHA EXAM Preparation Course for Pharmacists.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "duration": "6 Months",
            "students": "1300+",
            "location": "Dubai",
            "courseImage": "https://assets.academically.com/course/drff20EUtbGOhOoPnkuTd3GHUTeNlvjarWmVFwWa.jpg",
            "link": "https://youtu.be/7aEgg4qJAzc",
            "pathname": "/dha-exam-preparation-course-for-pharmacists"
        },
        {
            "name": "Australian Pharmacy Intern Written & Oral Exam Preparation Course",
            "category": "Pharmacist",
            "description": "Clear the pharmacist Intern Oral Exam on your first attempt through our specialised online course tailored for pharmacists aspiring to make a career in Australia.",
            "brochure": "/CourseImage/Australian Pharmacy Intern.svg",
            "audfees": "2400 AUD",
            "inrfees": "1,30,000 INR",
            "duration": "4 Months",
            "brochureLink": "",
            "students": "1200+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/drff20EUtbGOhOoPnkuTd3GHUTeNlvjarWmVFwWa.jpg",
            "link": "",
            "pathname": "/australian-pharmacy-intern-written-oral-exam-preparation-course"
        },
        {
            "name": "PEBC Exam Preparation Course",
            "category": "Pharmacist",
            "description": "Clear the Pharmacy Examining Board of Canada (PEBC) Exam on your first attempt through our specialised online course tailored for pharmacists aspiring to make a career in Canada.",
            "brochure": "/CourseImage/PEBC EXAM.svg",
            "audfees": "2000 AUD",
            "inrfees": "1,12,500 INR",
            "duration": "6 Months",
            "brochureLink": "",
            "students": "1400+",
            "location": "Canada",
            "courseImage": "https://assets.academically.com/course/uGf0baDvk8uaj1L2oLdZUtYQP2p1ICB2eTrR7lYv.jpg",
            "link": "https://assets.academically.com/course/pebc-exam-preparation-course/1711966574.mp4",
            "pathname": "/pebc-exam-preparation-course"
        },
        {
            "name": "MOH Exam Preparation Course",
            "category": "Pharmacist",
            "description": "Pass the Ministry of Health (MOH) Exam on your first try with our comprehensive courses for Doctors, Dentists, Nurses, Pharmacists, and Lab Technicians. Make your dream career in the United Arab Emirates (UAE) with us.",
            "brochure": "/CourseImage/MOH EXAM.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "students": "900+",
            "location": "UAE",
            "courseImage": "https://assets.academically.com/course/2Df2QwQCYShiDZhjlhabz6UWlClET58m9RZpqNXg.jpg",
            "link": "https://youtu.be/V0JOB_gw_pA",
            "pathname": "/moh-exam-preparation-course"
        },
        {
            "name": "Qatar Prometric Exam Preparation Course for Pharmacists",
            "category": "Pharmacist",
            "description": "Pass the Qatar Prometric Exam for pharmacists on your first attempt with the best Qatar Pharmacist Exam Coaching. You will get comprehensive online classes, study materials, and AI-based mock tests in this. Our Qatar Prometric Exam Preparation course is designed for experienced pharmacists looking to migrate and practice pharmacy in Qatar, where the pharmacist's salary in Qatar is tax-free and has many additional benefits. Clear the Qatar Examination for Pharmacists with confidence and ease. Join our proven program today!",
            "brochure": "/CourseImage/Qatar Prometric Exam.svg",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "students": "1100+",
            "location": "Qatar",
            "courseImage": "https://assets.academically.com/course/r4Eb70XRkw5gyqqaqIP7AWMO7ZXhN755l9q5hVVg.jpg",
            "link": "",
            "pathname": "/qatar-prometric-exam-preparation-course-for-pharmacists"
        },
        {
            "name": "Kuwait MOH Pharmacy Exam Coaching & Preparation Course",
            "category": "Pharmacist",
            "description": "Pass the Kuwait MOH Exam for pharmacists on your first attempt with the best MOH Pharmacist Exam Coaching for Kuwait. In this course, you will get comprehensive online classes, study materials, and AI-based mock tests. Our Kuwait MOH Exam Preparation course is designed for experienced pharmacists who want to migrate to and practise pharmacy in Kuwait. Clear the Kuwait MOH Exam for Pharmacists with confidence and ease. Enrol today and start your journey to a pharmacy career in Kuwait!",
            "brochure": "/CourseImage/Kuwait EXAM Preparation Course.svg",
            "inrfees": "1000 KWD",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "students": "1100+",
            "location": "Kuwait",
            "courseImage": "https://assets.academically.com/course/5Kh5xBsKwd9dfM965hje1SDL6sDykJrc928kWQlC.jpg",
            "link": "",
            "pathname": "/kuwait-moh-pharmacy-exam-coaching-preparation-course"
        },
        {
            "name": "Bahrain Pharmacy Licensure Examination (BPLE) Preparation Course",
            "category": "Pharmacist",
            "description": "Clear the Bahrain Pharmacy Licensure Examination (BPLE) exam on your first attempt with the best online BPLE coaching. Our BPLE preparation course includes online classes, extensive study resources, and AI-driven mock tests, making it the ideal BPLE Preparation Course for international pharmacists seeking to move to and practise in Bahrain. Enrol in our trusted course today and easily pass the Bahrain Pharmacy Licensure Examination (BPLE) exam for pharmacists.",
            "brochure": "/CourseImage/bple.svg",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1BV3mlG4tNjnAkArcdpZvRPZLT3rbHHKG/view?usp=drive_link",
            "students": "1000+",
            "location": "Bahrain",
            "courseImage": "https://assets.academically.com/course/BdxK898fP2ymxKOLL2hSW3BLVBoKB5QR6GeGlkMg.jpg",
            "link": "",
            "pathname": "/bahrain-pharmacy-licensure-examination-bple-preparation-course"
        },
        {
            "name": "NCLEX Exam Preparation Course",
            "category": "Nursing",
            "description": "Clear the National Council Licensure Examination for Registered Nurses (NCLEX-RN) on your first attempt with our online course designed for professional nurses trying to migrate to Australia, the USA, Canada, Ireland, the Netherlands or any other country.",
            "brochure": "/CourseImage/NCLEX.svg",
            "audfees": "1000 AUD",
            "inrfees": "55,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1Of9aZ0npo37z21DpgMnmn8liNtMTXBAD/view?usp=drive_link",
            "students": "1800+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/eUHZuvpIssBu2lIQCgp3QMF63tLSKeUdTHqVEs8E.jpg",
            "link": "https://youtu.be/2ScjWYC885E",
            "pathname": "/nclex-exam-preparation-course"
        },
        {
            "name": "NCLEX Exam Preparation Crash Course",
            "category": "Nursing",
            "description": "An easy and cost-effective course to help you clear the NCLEX exam at your own pace, in your own time. Academically has curated this compact yet comprehensive online course to help global nursing professionals clear the National Council Licensure Examination for Registered Nurses (NCLEX-RN).",
            "brochure": "/CourseImage/NCLEXExamCrashCourse.svg",
            "audfees": "1000 AUD",
            "inrfees": "55,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1Of9aZ0npo37z21DpgMnmn8liNtMTXBAD/view?usp=drive_link",
            "students": "1200+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/yaTA4NGPm0EEEn2PCHwnN18MNTpUOXjKdOnZS43p.jpg",
            "link": "https://youtu.be/2ScjWYC885E",
            "pathname": "/nclex-exam-preparation-crash-course"
        },
        {
            "name": "APC Written Assessment Preparation Course",
            "category": "Physiotherapist",
            "description": "Clear the Australian Physiotherapy Council Exam on your first attempt with our preparation course tailored to meet the needs of qualified physiotherapists planning to migrate to Australia.",
            "brochure": "/CourseImage/APC Exam Course.svg",
            "audfees": "3200 AUD",
            "inrfees": "1,75,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1OuAl68yWmiQbD428R7yvRN3BsFmcjCRn/view?usp=drive_link",
            "students": "1300+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/JktyX0uJZ2uZJTJtxGlGFwDu4byvfHZBKUUvsOrL.jpg",
            "link": "https://youtu.be/PmYNLZTnieU",
            "pathname": "/apc-written-assessment-preparation-course"
        },
        {
            "name": "HCPC Registration for Physiotherapists",
            "category": "Physiotherapist",
            "description": "To become a registered physiotherapist in the United Kingdom, you must register with the Health and Care Professions Council (HCPC). The HCPC Registration Guidance Program by Academically offers a specially designed, step-by-step guide to help you through the registration process for HCPC and become a registered physiotherapist in the United Kingdom.",
            "brochure": "/CourseImage/HCPC Exam Course.svg",
            "audfees": "1500 AUD for UK + 1000 AUD for NZ ",
            "inrfees": "82,500 INR for UK + 55,000 INR for NZ ",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1gsTV2o3UNDhTXQ8ZL92pVX53eL_PMvIc/view?usp=drive_link",
            "students": "1000+",
            "location": "United Kingdom",
            "link": "",
            "courseImage": "https://assets.academically.com/course/I6iG9xSILdzU9gMVSxjayAeCKuXa4Kea3dZVsJbE.jpg",
            "pathname": "/hcpc-registration-for-physiotherapists"
        },
        {
            "name": "GULF Physiotherapist Exam Preparation Course",
            "category": "Physiotherapist",
            "description": "Clear physiotherapy licensure exams for Gulf countries like UAE, Qatar, Kuwait, Bahrain & Abu Dhabi on your first attempt with expert online coaching. Learn through live classes by Gulf-registered physiotherapists, get study materials, AI-powered mock tests, case-based practice, expert guidance & community support and everything you need to confidently pass exams. Enroll today and prepare to practice in Gulf countries with confidence.",
            "brochure": "/CourseImage/Physiotherapy.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1PYiu2D1fMJ1z4r8UYjI0Y1AyvEFAgR9i/view",
            "students": "1200+",
            "location": "Dubai",
            "courseImage": "https://assets.academically.com/course/I6iG9xSILdzU9gMVSxjayAeCKuXa4Kea3dZVsJbE.jpg",
            "link": "",
            "pathname": "/dha-exam-preparation-course-for-physiotherapists"
        },
        {
            "name": "AMC Exam Preparation Course",
            "category": "Medical Doctor",
            "description": "Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease.",
            "brochure": "/CourseImage/AMCexam.svg",
            "audfees": "3200 AUD",
            "inrfees": "1,75,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1a5ZSYUWph8B7qRHsyoJh0na47PoO3B1S/view?usp=drive_link",
            "students": "1800+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/6HH1R0honlPjXvd2eSMeIXlo42F7hE2jyFUxhJuT.jpg",
            "link": "https://youtu.be/cyKpBv_xGl0",
            "pathname": "/amc-exam-preparation-course"
        },
        {
            "name": "AMC Clinical Exam Preparation Course",
            "category": "Medical Doctor",
            "description": "Pass the Australian Medical Council (AMC) Clinical Exam on your first attempt with the best online coaching. Our course aims to prepare candidates for the AMC 2 Clinical Examination with proper clinical skills like taking patient history, performing physical exams, making accurate diagnoses, and managing cases according to Australian Medical Council guidelines. The course also focuses on practising effective communication skills and building confidence for the AMC Clinical Exam with Adaptive AI-driven AMC clinical tests and role plays with tutors. Enrol in our trusted program today and confidently tackle the Australian Medical Council Clinical Exam (AMC 2)—the best online AMC 2 coaching for Australia.",
            "brochure": "/CourseImage/AMCclinical.svg",
            "audfees": "3200 AUD",
            "inrfees": "1,75,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1a5ZSYUWph8B7qRHsyoJh0na47PoO3B1S/view?usp=drive_link",
            "students": "1500+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/p7GoxJNPDkWSm0m7mEbJ6h1kxZOT5pOI9F378Uvp.jpg",
            "link": "",
            "pathname": "/amc-clinical-exam-preparation-course"
        },
        {
            "name": "NZREX Clinical Exam Preparation Course",
            "category": "Medical Doctor",
            "description": "Qualify New Zealand Registration Exam (NZREX) with Academically's NZREX clinical Exam preparation course. This course prepares doctors for the NZREX Clinical Examination by developing vital clinical skills, practising effective communication and refining diagnostic skills for the Clinical Exam. This is done with exam-specific role plays with tutors and Adaptive AI-driven NZREX clinical tests. Enrol in our trusted program today and confidently take the New Zealand Registration Exam (NZREX) with the best online NZREX Preparation Course.",
            "brochure": "/CourseImage/nzrex.svg",
            "inrfees": "1,75,000 INR",
            "audfees": "3200 AUD",
            "duration": "6 Months",
            "brochureLink": "",
            "students": "1300+",
            "location": "New Zealand",
            "courseImage": "https://assets.academically.com/course/QdMWDIuzD5KjNlJdLKFwm2OD22qgOgsyGcGdlXNq.jpg",
            "link": "https://youtu.be/ImJ4T04FKwg",
            "pathname": "/nzrex-clinical-exam-preparation-course"
        },
        {
            "name": "USMLE Exam Preparation Course",
            "category": "Medical Doctor",
            "description": "Clear the United States Medical Licensing Examination (USMLE) on your first attempt with our online course designed for professional doctors trying to migrate to the USA.",
            "brochure": "/CourseImage/USMLE.svg",
            "audfees": "1200 AUD",
            "inrfees": "66,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1RjG0BO2Hldzq0Qzni9_WHsh1aR1u4Tn6/view?usp=drive_link",
            "students": "1900+",
            "location": "USA",
            "courseImage": "https://assets.academically.com/course/XHXAY21uDL1oeBxgMbmvK0RfdhQqHZlw2EhYnYx4.jpg",
            "link": "https://youtu.be/4fIn4F4jl2k",
            "pathname": "/usmle-exam-preparation-course"
        },
        {
            "name": "PLAB Exam Preparation Course",
            "category": "Medical Doctor",
            "description": "Ace the Professional and Linguistic Assessments Board (PLAB) test on your first attempt with our online course designed for professional doctors trying to migrate to the UK.",
            "brochure": "/CourseImage/PLAB.svg",
            "audfees": "2000 AUD",
            "inrfees": "1,10,000 INR",
            "duration": "6 Months",
            "brochureLink": "",
            "students": "1400+",
            "location": "UK",
            "courseImage": "https://assets.academically.com/course/pULmrKfQOLAW8d4lLeorWxBV9C2QMYAR1r5RMZo8.jpg",
            "link": "https://youtu.be/5yxr-9ZkHfo",
            "pathname": "/plab-exam-preparation-course"
        },
        {
            "name": "AMC Exam Preparation Crash Course",
            "category": "Medical Doctor",
            "description": "Ace the Australian Medical Council Exam (AMC) on your first attempt with our tailored preparatory course. Our AMC Exam Preparation Crash Course is designed to optimise your success in the AMC exam and set you on the path to a rewarding medical career in Australia.",
            "brochure": "/CourseImage/AMCcrash.svg",
            "audfees": "2000 AUD",
            "inrfees": "1,10,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1a5ZSYUWph8B7qRHsyoJh0na47PoO3B1S/view?usp=drive_link",
            "students": "1200+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/y7QITDwO2KA6SoIdRwDjdHcPixZyQm0vxJhuXd6b.jpg",
            "link": "https://youtu.be/cyKpBv_xGl0",
            "pathname": "/amc-exam-preparation-crash-course"
        },
        {
            "name": "GRMLE Exam Preparation Course for Doctors",
            "category": "Medical Doctor",
            "description": "Get the best coaching for the Dubai Health Authority (DHA) Exam to become a licensed doctor in Dubai. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect DHA Exam Preparation Course for international doctors aiming to migrate to and practice in Dubai.",
            "brochure": "/CourseImage/Doctor.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "",
            "students": "1200+",
            "location": "ALL",
            "courseImage": "https://assets.academically.com/course/drff20EUtbGOhOoPnkuTd3GHUTeNlvjarWmVFwWa.jpg",
            "link": "",
            "pathname": "/dha-exam-preparation-course-for-doctors"
        },
        {
            "name": "ADC Exam Preparation Course",
            "category": "Dentist",
            "description": "Pass the Australian Dental Council (ADC) Exam on your first attempt with the best ADC coaching by Academically. Our comprehensive online classes, extensive study materials, and AI-based mock tests make our ADC Exam Preparation course ideal for experienced dentists wanting to migrate to and practice in Australia. Join our proven program today and clear the Australian Dental Council Exam confidently and easily.",
            "brochure": "/CourseImage/ADC.svg",
            "audfees": "3200 AUD",
            "inrfees": "1,75,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1l8peBzG9nLpVUbi20GPgHDKi7QLGniSU/view?usp=drive_link",
            "students": "1600+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/2ngM4jvRs9Smdj32jISWAqAcnreAqvHCqcAghSr8.jpg",
            "link": "https://assets.academically.com/course/adc-exam-preparation-course/1719553756.mp4",
            "pathname": "/adc-exam-preparation-course"
        },
        {
            "name": "OCANZ's COE Exam Preparation Course",
            "category": "Optometrist",
            "description": "Ace the Competency in Optometry (COE) Examination on your first attempt through our specialised online course tailored for optometrists aspiring to make a career in Australia.",
            "brochure": "/CourseImage/OCANZ.svg",
            "audfees": "2000 AUD",
            "inrfees": "1,10,000 INR",
            "duration": "6 Months",
            "brochureLink": "https://drive.google.com/file/d/1yZ0YJpy-o4Cgt4m8BA8wEtIdFOU7dahy/view?usp=drive_link",
            "students": "1300+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/h7hHislDKvVpwiwd6CBenl4O0lIwNqdIlwZCmY1F.jpg",
            "link": "https://youtu.be/d_a16bfimtQ",
            "pathname": "/ocanzs-coe-exam-preparation-course"
        },
        {
            "name": "DOH Exam Preparation Course",
            "category": "Healthcare Professionals",
            "description": "Ace the Department of Health (DOH) Exam on your first try with our comprehensive courses for Doctors, Dentists, Nurses, Pharmacists, and Lab Technicians. Make your dream career in Abu Dhabi with us.",
            "brochure": "/CourseImage/DOH Exam Course.svg",
            "audfees": "637 AUD",
            "inrfees": "35,000 INR",
            "duration": "6 Months",
            "brochureLink": "",
            "students": "1500+",
            "location": "Global",
            "courseImage": "https://assets.academically.com/course/EvRS0d9tDPit7SfgfCO2iV9xlVojGyn1ibec0S2d.jpg",
            "link": "https://youtu.be/1sdqo4e97HE",
            "pathname": "/doh-exam-preparation-course"
        },
        {
            "name": "Clinical Drug Development",
            "category": "Job Assistance",
            "description": "Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease.",
            "brochure": "/CourseImage/CDD.png",
            "audfees": "2400 AUD",
            "inrfees": "1,50,000 INR",
            "duration": "4 Months",
            "brochureLink": "https://drive.google.com/file/d/1-gfbOnONXifTnE4Pfb8zFdHNdeHv_HF8/view?usp=sharing",
            "students": "500+",
            "location": "Australia",
            "courseImage": "https://assets.academically.com/course/6HH1R0honlPjXvd2eSMeIXlo42F7hE2jyFUxhJuT.jpg",
            "link": "",
            "pathname": "/clinical-drug-development"
        },
        {
            "name": "Medical Science Liaison (MSL)",
            "category": "Job Assistance",
            "description": "",
            "brochure": "/CourseImage/Clinical-Drug-Development.png",
            "audfees": "2400 AUD",
            "inrfees": "1,50,000 INR",
            "duration": "4 Months",
            "brochureLink": "https://drive.google.com/file/d/1n5avgRWW5kWNSWubSZF7cYMTLAiQKHM9/view",
            "students": "500+",
            "location": "India",
            "courseImage": "https://assets.academically.com/course/6HH1R0honlPjXvd2eSMeIXlo42F7hE2jyFUxhJuT.jpg",
            "link": "",
            "pathname": "/medical-science-liaison-(msl)"
        }
    ];

    // Find the course that matches the slug (case-insensitive comparison)
    const coursed = coursesData || coursesObject.find(course => (course.pathname) == pathName);
    const getYouTubeEmbedURL = (url) => {
        try {
            const parsedUrl = new URL(url);
            const videoId = parsedUrl.searchParams.get("v");
            if (!videoId && parsedUrl.hostname === "youtu.be") {
                return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
            }
            return `https://www.youtube.com/embed/${videoId}`;
        } catch (error) {
            console.error("Invalid YouTube URL", error);
            return "";
        }
    };

    const Tile = ({ icon, heading, subtext, link }) => (
        <div
            className="flex flex-col items-center text-center p-4 lg:p-6 xl:p-8 rounded-2xl w-full"
            style={{ background: "rgba(153, 246, 228, 0.3)" }}
        >
            <div className="mb-4 w-20 h-20 xl:w-24 xl:h-24">{icon}</div>
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold">{heading}</h3>
            <p className="text-md lg:text-lg xl:text-xl">
                {link ? <a href={link} className="underline" target="_blank">Click here</a> : subtext}
            </p>
        </div>
    );

    return (
        <div className="flex-col items-center mt-4 justify-center w-[85%] mx-auto">
            {/* YouTube Embed or Course Image */}
            <div className="flex justify-center items-center w-full max-sm:mt-10 max-sm:mb-6">
                {["/clinical-drug-development", "/clinical-drug-development/", "/medical-science-liaison-(msl)", "/medical-science-liaison-(msl)/"].includes(pathName) ? (
                    <img
                        src={pathName.includes("msl") ? "/CourseImage/MSL.png" : (coursed?.location === "India" ? "/CourseImage/Clinical-Drug-Development.png" : "/CourseImage/CDD.png")}
                        alt={coursed?.name || "Course Image"}
                        className="w-full h-[90vh] max-sm:h-[40vh] rounded-xl shadow-lg scale-75 max-sm:scale-100 max-sm:mt-14 object-contain"
                    />
                ) : (
                    <iframe
                        src={getYouTubeEmbedURL(coursed?.link)}
                        title="YouTube Video"
                        className="w-full h-[90vh] max-sm:h-[40vh] rounded-xl shadow-lg scale-75 max-sm:scale-100 max-sm:mt-14"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Course Heading */}
            <h1 className="text-2xl lg:text-4xl font-semibold  text-[#3C3C3C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                {coursed?.name}
            </h1>
            <p className="mb-10 text-[#4E5566]" style={{ fontFamily: "Outfit, sans-serif" }}>
                {coursed?.description}
            </p>

            {/* Grid Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
                <Tile
                    icon={<svg width="135" height="94" viewBox="0 0 135 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-20 md:h-16 h-12">
                        <path d="M11.9913 0C5.41867 0 0 5.48789 0 12.1444V81.8556C0 88.5121 5.41867 94 11.9913 94H122.3C128.872 94 134.28 88.5121 134.28 81.8556V61.9927H134.286V61.7749V32.0356V31.8125V12.1455C134.286 5.48895 128.872 0.00106095 122.305 0.00106095L11.9913 0ZM11.9913 8.50003H27.0459C25.336 18.1157 17.8821 25.6429 8.39241 27.3864V12.1448C8.39241 10.0517 9.92447 8.50003 11.9913 8.50003ZM35.4965 8.50003H98.7515C100.624 22.7529 111.818 34.0844 125.886 35.9816V58.0124C111.828 59.9142 100.645 71.2459 98.7569 85.4885H35.4965C33.6134 71.2615 22.4351 59.9245 8.39241 58.0124V35.9871C22.4507 34.0746 33.6232 22.743 35.4965 8.50003ZM107.24 8.50003H122.305C124.372 8.50003 125.893 10.0513 125.893 12.1444V27.3914C116.399 25.6596 108.945 18.1215 107.24 8.50003ZM67.1273 25.3519C55.3722 25.3519 45.7519 35.0951 45.7519 47.0004C45.7519 58.9057 55.3722 68.649 67.1273 68.649C78.8825 68.649 88.5337 58.9057 88.5337 47.0004C88.5337 35.0951 78.882 25.3519 67.1273 25.3519ZM67.1273 33.8519C74.3452 33.8519 80.1414 39.6904 80.1414 47.0004C80.1414 54.3104 74.3452 60.1383 67.1273 60.1383C59.9095 60.1383 54.1551 54.3104 54.1551 47.0004C54.1551 39.6904 59.9095 33.8519 67.1273 33.8519ZM125.893 66.6089V81.856C125.893 83.9491 124.372 85.4898 122.305 85.4898H107.251C108.971 75.8794 116.414 68.3415 125.899 66.6034L125.893 66.6089ZM8.39375 66.6143C17.8724 68.3621 25.3164 75.8899 27.0419 85.4898H11.9926C9.92581 85.4898 8.39416 83.9492 8.39416 81.856L8.39375 66.6143Z" fill="#030A21" />
                    </svg>}
                    heading={coursed?.audfees}
                    subtext="Student Fees (AUD)"
                />
                <Tile
                    icon={<svg width="82" height="120" viewBox="0 0 82 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-20 md:h-16 h-12">
                        <path d="M72.1896 14.9211H19.0052L64.7079 0.304255C66.481 -0.259184 68.2857 -0.0366519 69.8175 0.94345C71.3545 1.92829 72.1886 3.38186 72.1886 5.08172L72.1896 14.9211ZM27.059 90.7351H14.7466C14.6942 90.7351 14.6365 90.7635 14.5997 90.7967C14.563 90.8298 14.5315 90.8819 14.5315 90.9292V102.047C14.5315 102.099 14.563 102.146 14.5997 102.179C14.6365 102.217 14.6942 102.241 14.7466 102.241H27.059C27.1167 102.241 27.1692 102.222 27.2059 102.179C27.2479 102.146 27.2741 102.099 27.2741 102.047V90.9292C27.2741 90.8819 27.2531 90.8298 27.2059 90.7967C27.1692 90.7635 27.122 90.7351 27.059 90.7351ZM27.059 63.6468H14.7466C14.6942 63.6468 14.6365 63.6752 14.5997 63.7084C14.563 63.7415 14.5315 63.7936 14.5315 63.841V74.9583C14.5315 75.0104 14.563 75.0578 14.5997 75.0909C14.6365 75.1288 14.6942 75.1525 14.7466 75.1525H27.059C27.1167 75.1525 27.1692 75.1335 27.2059 75.0909C27.2479 75.0578 27.2741 75.0104 27.2741 74.9583V63.841C27.2741 63.7936 27.2531 63.7415 27.2059 63.7084C27.1692 63.6705 27.122 63.6468 27.059 63.6468ZM82 25.0107V113.774C82 117.197 78.8996 120 75.112 120H6.89844C3.10562 120 0 117.197 0 113.774V25.0107C0 21.5875 3.10562 18.7939 6.89844 18.7939H75.1067C78.9047 18.7939 82 21.5922 82 25.0107ZM31.5647 90.9291C31.5647 89.8116 31.0558 88.7984 30.2374 88.0597C29.4296 87.3211 28.3017 86.8713 27.0584 86.8713H14.746C13.5079 86.8713 12.3853 87.3211 11.5669 88.0597C10.7485 88.7984 10.2502 89.8116 10.2502 90.9291V102.046C10.2502 103.169 10.7485 104.187 11.5669 104.916C12.3853 105.654 13.5079 106.114 14.746 106.114H27.0584C28.3017 106.114 29.4295 105.654 30.2374 104.916C31.0558 104.187 31.5647 103.169 31.5647 102.046V90.9291ZM31.5647 63.8359C31.5647 62.7185 31.0558 61.7053 30.2374 60.9666C29.4296 60.228 28.3017 59.7782 27.0584 59.7782H14.746C13.5079 59.7782 12.3853 60.228 11.5669 60.9666C10.7485 61.7052 10.2502 62.7185 10.2502 63.8359V74.9533C10.2502 76.0754 10.7485 77.0934 11.5669 77.8226C12.3853 78.5612 13.5079 79.0158 14.746 79.0158H27.0584C28.3017 79.0158 29.4295 78.5565 30.2374 77.8226C31.0558 77.0935 31.5647 76.0755 31.5647 74.9533V63.8359ZM31.5647 36.7428C31.5647 35.6254 31.0558 34.6121 30.2374 33.8735C29.4296 33.1348 28.3017 32.685 27.0584 32.685H14.746C13.5079 32.685 12.3853 33.1348 11.5669 33.8735C10.7485 34.6121 10.2502 35.6253 10.2502 36.7428V47.8554C10.2502 48.9776 10.7485 49.9955 11.5669 50.7247C12.3853 51.4634 13.5079 51.9226 14.746 51.9226H27.0584C28.3017 51.9226 29.4295 51.4634 30.2374 50.7247C31.0558 49.9956 31.5647 48.9776 31.5647 47.8554V36.7428ZM55.5434 101.146C55.5434 100.076 54.5782 99.2046 53.403 99.2046H40.4769C39.2913 99.2046 38.3365 100.076 38.3365 101.146C38.3365 102.216 39.2965 103.078 40.4769 103.078H53.403C54.5834 103.078 55.5434 102.216 55.5434 101.146ZM71.7639 91.8326C71.7639 90.7625 70.8091 89.8912 69.6234 89.8912H40.4769C39.2913 89.8912 38.3365 90.7625 38.3365 91.8326C38.3365 92.9026 39.2965 93.7644 40.4769 93.7644H69.6181C70.8037 93.7644 71.7639 92.9027 71.7639 91.8326ZM40.4766 75.9854H53.4028C54.5831 75.9854 55.5432 75.1142 55.5432 74.0535C55.5432 72.9835 54.5779 72.1122 53.4028 72.1122H40.4766C39.2911 72.1122 38.3362 72.9834 38.3362 74.0535C38.3362 75.1189 39.291 75.9854 40.4766 75.9854ZM71.7639 64.7403C71.7639 63.6702 70.8091 62.799 69.6234 62.799H40.4769C39.2913 62.799 38.3365 63.6702 38.3365 64.7403C38.3365 65.8103 39.2965 66.6721 40.4769 66.6721H69.6181C70.8037 66.6721 71.7639 65.8104 71.7639 64.7403ZM40.4766 48.898H53.4028C54.5831 48.898 55.5432 48.0268 55.5432 46.9661C55.5432 45.896 54.5779 45.0248 53.4028 45.0248H40.4766C39.2911 45.0248 38.3362 45.896 38.3362 46.9661C38.3362 48.0267 39.291 48.898 40.4766 48.898ZM71.7639 37.6481C71.7639 36.578 70.8091 35.7068 69.6234 35.7068L40.4769 35.7115C39.2913 35.7115 38.3365 36.5827 38.3365 37.6528C38.3365 38.7182 39.2965 39.5847 40.4769 39.5847L69.6181 39.58C70.8037 39.58 71.7639 38.7135 71.7639 37.6481ZM27.0577 36.5544H14.7453C14.6928 36.5544 14.6351 36.5828 14.5984 36.6159C14.5617 36.6491 14.5302 36.6964 14.5302 36.7485V47.8611C14.5302 47.9132 14.5617 47.9606 14.5984 47.9937C14.6351 48.0316 14.6928 48.0553 14.7453 48.0553H27.0577C27.1154 48.0553 27.1678 48.0363 27.2045 47.9937C27.2465 47.9606 27.2727 47.9132 27.2727 47.8611V36.7485C27.2727 36.6964 27.2518 36.6491 27.2045 36.6159C27.1678 36.578 27.1206 36.5544 27.0577 36.5544Z" fill="black" />
                    </svg>}
                    heading={coursed?.inrfees}
                    subtext="Student Fees (INR)"
                />
                <Tile
                    icon={<svg width="112" height="124" viewBox="0 0 112 124" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-20 md:h-16 h-12">
                        <path d="M55.9058 63.8637C72.4115 63.8637 85.8375 46.3711 85.8375 29.8908C85.8375 13.4105 72.4115 0 55.9058 0C39.4 0 25.9727 13.4105 25.9727 29.8908C25.9754 46.3697 39.4014 63.8637 55.9058 63.8637Z" fill="#030A21" />
                        <path d="M81.3807 64.7816C86.0305 67.7981 89.2336 72.8392 89.7309 78.649C93.7053 79.5382 96.6877 83.0855 96.6877 87.3194C96.6877 92.2223 92.6928 96.2114 87.7827 96.2114C82.8727 96.2114 78.8777 92.2223 78.8777 87.3194C78.8777 83.1635 81.7534 79.6737 85.6181 78.7038C85.0455 73.3275 81.4794 68.8419 76.6214 66.9239L56.4988 85.7517L36.1105 66.6736C30.5839 68.5368 26.567 73.6736 26.3725 79.7667C27.1657 80.2263 27.8069 80.9377 28.2001 81.7995C31.1278 83.1785 33.7116 86.0814 35.6912 90.2141C36.0228 90.9104 36.0653 91.6957 35.8228 92.4125C37.0092 95.4618 37.6873 98.7942 37.6873 101.593C37.6873 105.515 37.6873 109.224 33.4061 110.176C32.9417 110.562 32.3621 110.772 31.7525 110.772H28.8906C27.4562 110.772 26.2889 109.606 26.2889 108.175L26.2917 108.073C26.3465 106.693 27.5041 105.577 28.8906 105.577H31.7511C32.0443 105.577 32.3306 105.626 32.606 105.723C32.78 105.674 32.8348 105.633 32.8348 105.633C33.1526 105.069 33.1526 102.722 33.1526 101.595C33.1526 99.3209 32.5827 96.5753 31.584 94.024C31.0647 93.7299 30.6469 93.2853 30.3893 92.7477C28.6535 89.1211 26.2958 86.7791 24.3791 86.7791C22.4187 86.7791 19.9431 89.3112 18.2169 93.0773C17.9347 93.6902 17.4401 94.1909 16.8304 94.4891C15.9276 96.931 15.4317 99.444 15.4317 101.593C15.4317 102.54 15.4317 105.053 15.7947 105.642C15.7988 105.642 15.8797 105.692 16.1071 105.748C16.403 105.634 16.7208 105.575 17.0387 105.575H19.9047C21.2418 105.575 22.3557 106.592 22.4913 107.911L22.5064 108.072C22.5064 109.606 21.3391 110.772 19.9061 110.772H17.0401C16.4715 110.772 15.9221 110.584 15.47 110.238C13.8329 109.93 12.6793 109.209 11.9491 108.035C11.0641 106.616 10.9025 104.753 10.9025 101.593C10.9025 98.8202 11.5436 95.6287 12.7081 92.5794C12.5369 91.9269 12.5944 91.2456 12.878 90.6314C14.0918 87.9829 15.6344 85.7148 17.3387 84.0745C18.2758 83.173 19.2827 82.448 20.3363 81.9186C20.7336 80.9938 21.4213 80.2359 22.2639 79.7558C22.4228 73.4219 25.793 67.8829 30.8154 64.6913C13.1602 68.7776 0 84.5615 0 103.43C0 114.303 25.0299 123.12 55.907 123.12C86.7826 123.12 111.814 114.303 111.814 103.43C111.814 84.6983 98.8428 69.0033 81.3807 64.7816Z" fill="#030A21" />
                        <path d="M87.7819 91.4235C90.0518 91.4235 91.8919 89.586 91.8919 87.3195C91.8919 85.0529 90.0518 83.2155 87.7819 83.2155C85.512 83.2155 83.6719 85.0529 83.6719 87.3195C83.6719 89.586 85.512 91.4235 87.7819 91.4235Z" fill="#030A21" />
                    </svg>}
                    heading={coursed?.students}
                    subtext="Students Enrolled"
                />
                <Tile
                    icon={<svg width="82" height="120" viewBox="0 0 82 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-20 md:h-16 h-12">
                        <path d="M72.1896 14.9211H19.0052L64.7079 0.304255C66.481 -0.259184 68.2857 -0.0366519 69.8175 0.94345C71.3545 1.92829 72.1886 3.38186 72.1886 5.08172L72.1896 14.9211ZM27.059 90.7351H14.7466C14.6942 90.7351 14.6365 90.7635 14.5997 90.7967C14.563 90.8298 14.5315 90.8819 14.5315 90.9292V102.047C14.5315 102.099 14.563 102.146 14.5997 102.179C14.6365 102.217 14.6942 102.241 14.7466 102.241H27.059C27.1167 102.241 27.1692 102.222 27.2059 102.179C27.2479 102.146 27.2741 102.099 27.2741 102.047V90.9292C27.2741 90.8819 27.2531 90.8298 27.2059 90.7967C27.1692 90.7635 27.122 90.7351 27.059 90.7351ZM27.059 63.6468H14.7466C14.6942 63.6468 14.6365 63.6752 14.5997 63.7084C14.563 63.7415 14.5315 63.7936 14.5315 63.841V74.9583C14.5315 75.0104 14.563 75.0578 14.5997 75.0909C14.6365 75.1288 14.6942 75.1525 14.7466 75.1525H27.059C27.1167 75.1525 27.1692 75.1335 27.2059 75.0909C27.2479 75.0578 27.2741 75.0104 27.2741 74.9583V63.841C27.2741 63.7936 27.2531 63.7415 27.2059 63.7084C27.1692 63.6705 27.122 63.6468 27.059 63.6468ZM82 25.0107V113.774C82 117.197 78.8996 120 75.112 120H6.89844C3.10562 120 0 117.197 0 113.774V25.0107C0 21.5875 3.10562 18.7939 6.89844 18.7939H75.1067C78.9047 18.7939 82 21.5922 82 25.0107ZM31.5647 90.9291C31.5647 89.8116 31.0558 88.7984 30.2374 88.0597C29.4296 87.3211 28.3017 86.8713 27.0584 86.8713H14.746C13.5079 86.8713 12.3853 87.3211 11.5669 88.0597C10.7485 88.7984 10.2502 89.8116 10.2502 90.9291V102.046C10.2502 103.169 10.7485 104.187 11.5669 104.916C12.3853 105.654 13.5079 106.114 14.746 106.114H27.0584C28.3017 106.114 29.4295 105.654 30.2374 104.916C31.0558 104.187 31.5647 103.169 31.5647 102.046V90.9291ZM31.5647 63.8359C31.5647 62.7185 31.0558 61.7053 30.2374 60.9666C29.4296 60.228 28.3017 59.7782 27.0584 59.7782H14.746C13.5079 59.7782 12.3853 60.228 11.5669 60.9666C10.7485 61.7052 10.2502 62.7185 10.2502 63.8359V74.9533C10.2502 76.0754 10.7485 77.0934 11.5669 77.8226C12.3853 78.5612 13.5079 79.0158 14.746 79.0158H27.0584C28.3017 79.0158 29.4295 78.5565 30.2374 77.8226C31.0558 77.0935 31.5647 76.0755 31.5647 74.9533V63.8359ZM31.5647 36.7428C31.5647 35.6254 31.0558 34.6121 30.2374 33.8735C29.4296 33.1348 28.3017 32.685 27.0584 32.685H14.746C13.5079 32.685 12.3853 33.1348 11.5669 33.8735C10.7485 34.6121 10.2502 35.6253 10.2502 36.7428V47.8554C10.2502 48.9776 10.7485 49.9955 11.5669 50.7247C12.3853 51.4634 13.5079 51.9226 14.746 51.9226H27.0584C28.3017 51.9226 29.4295 51.4634 30.2374 50.7247C31.0558 49.9956 31.5647 48.9776 31.5647 47.8554V36.7428ZM55.5434 101.146C55.5434 100.076 54.5782 99.2046 53.403 99.2046H40.4769C39.2913 99.2046 38.3365 100.076 38.3365 101.146C38.3365 102.216 39.2965 103.078 40.4769 103.078H53.403C54.5834 103.078 55.5434 102.216 55.5434 101.146ZM71.7639 91.8326C71.7639 90.7625 70.8091 89.8912 69.6234 89.8912H40.4769C39.2913 89.8912 38.3365 90.7625 38.3365 91.8326C38.3365 92.9026 39.2965 93.7644 40.4769 93.7644H69.6181C70.8037 93.7644 71.7639 92.9027 71.7639 91.8326ZM40.4766 75.9854H53.4028C54.5831 75.9854 55.5432 75.1142 55.5432 74.0535C55.5432 72.9835 54.5779 72.1122 53.4028 72.1122H40.4766C39.2911 72.1122 38.3362 72.9834 38.3362 74.0535C38.3362 75.1189 39.291 75.9854 40.4766 75.9854ZM71.7639 64.7403C71.7639 63.6702 70.8091 62.799 69.6234 62.799H40.4769C39.2913 62.799 38.3365 63.6702 38.3365 64.7403C38.3365 65.8103 39.2965 66.6721 40.4769 66.6721H69.6181C70.8037 66.6721 71.7639 65.8104 71.7639 64.7403ZM40.4766 48.898H53.4028C54.5831 48.898 55.5432 48.0268 55.5432 46.9661C55.5432 45.896 54.5779 45.0248 53.4028 45.0248H40.4766C39.2911 45.0248 38.3362 45.896 38.3362 46.9661C38.3362 48.0267 39.291 48.898 40.4766 48.898ZM71.7639 37.6481C71.7639 36.578 70.8091 35.7068 69.6234 35.7068L40.4769 35.7115C39.2913 35.7115 38.3365 36.5827 38.3365 37.6528C38.3365 38.7182 39.2965 39.5847 40.4769 39.5847L69.6181 39.58C70.8037 39.58 71.7639 38.7135 71.7639 37.6481ZM27.0577 36.5544H14.7453C14.6928 36.5544 14.6351 36.5828 14.5984 36.6159C14.5617 36.6491 14.5302 36.6964 14.5302 36.7485V47.8611C14.5302 47.9132 14.5617 47.9606 14.5984 47.9937C14.6351 48.0316 14.6928 48.0553 14.7453 48.0553H27.0577C27.1154 48.0553 27.1678 48.0363 27.2045 47.9937C27.2465 47.9606 27.2727 47.9132 27.2727 47.8611V36.7485C27.2727 36.6964 27.2518 36.6491 27.2045 36.6159C27.1678 36.578 27.1206 36.5544 27.0577 36.5544Z" fill="black" />
                    </svg>}
                    heading={coursed?.duration}
                    subtext="Course Duration"
                />

                <Tile
                    icon={<svg width="82" height="120" viewBox="0 0 82 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:h-20 md:h-16 h-12">
                        <path d="M72.1896 14.9211H19.0052L64.7079 0.304255C66.481 -0.259184 68.2857 -0.0366519 69.8175 0.94345C71.3545 1.92829 72.1886 3.38186 72.1886 5.08172L72.1896 14.9211ZM27.059 90.7351H14.7466C14.6942 90.7351 14.6365 90.7635 14.5997 90.7967C14.563 90.8298 14.5315 90.8819 14.5315 90.9292V102.047C14.5315 102.099 14.563 102.146 14.5997 102.179C14.6365 102.217 14.6942 102.241 14.7466 102.241H27.059C27.1167 102.241 27.1692 102.222 27.2059 102.179C27.2479 102.146 27.2741 102.099 27.2741 102.047V90.9292C27.2741 90.8819 27.2531 90.8298 27.2059 90.7967C27.1692 90.7635 27.122 90.7351 27.059 90.7351ZM27.059 63.6468H14.7466C14.6942 63.6468 14.6365 63.6752 14.5997 63.7084C14.563 63.7415 14.5315 63.7936 14.5315 63.841V74.9583C14.5315 75.0104 14.563 75.0578 14.5997 75.0909C14.6365 75.1288 14.6942 75.1525 14.7466 75.1525H27.059C27.1167 75.1525 27.1692 75.1335 27.2059 75.0909C27.2479 75.0578 27.2741 75.0104 27.2741 74.9583V63.841C27.2741 63.7936 27.2531 63.7415 27.2059 63.7084C27.1692 63.6705 27.122 63.6468 27.059 63.6468ZM82 25.0107V113.774C82 117.197 78.8996 120 75.112 120H6.89844C3.10562 120 0 117.197 0 113.774V25.0107C0 21.5875 3.10562 18.7939 6.89844 18.7939H75.1067C78.9047 18.7939 82 21.5922 82 25.0107ZM31.5647 90.9291C31.5647 89.8116 31.0558 88.7984 30.2374 88.0597C29.4296 87.3211 28.3017 86.8713 27.0584 86.8713H14.746C13.5079 86.8713 12.3853 87.3211 11.5669 88.0597C10.7485 88.7984 10.2502 89.8116 10.2502 90.9291V102.046C10.2502 103.169 10.7485 104.187 11.5669 104.916C12.3853 105.654 13.5079 106.114 14.746 106.114H27.0584C28.3017 106.114 29.4295 105.654 30.2374 104.916C31.0558 104.187 31.5647 103.169 31.5647 102.046V90.9291ZM31.5647 63.8359C31.5647 62.7185 31.0558 61.7053 30.2374 60.9666C29.4296 60.228 28.3017 59.7782 27.0584 59.7782H14.746C13.5079 59.7782 12.3853 60.228 11.5669 60.9666C10.7485 61.7052 10.2502 62.7185 10.2502 63.8359V74.9533C10.2502 76.0754 10.7485 77.0934 11.5669 77.8226C12.3853 78.5612 13.5079 79.0158 14.746 79.0158H27.0584C28.3017 79.0158 29.4295 78.5565 30.2374 77.8226C31.0558 77.0935 31.5647 76.0755 31.5647 74.9533V63.8359ZM31.5647 36.7428C31.5647 35.6254 31.0558 34.6121 30.2374 33.8735C29.4296 33.1348 28.3017 32.685 27.0584 32.685H14.746C13.5079 32.685 12.3853 33.1348 11.5669 33.8735C10.7485 34.6121 10.2502 35.6253 10.2502 36.7428V47.8554C10.2502 48.9776 10.7485 49.9955 11.5669 50.7247C12.3853 51.4634 13.5079 51.9226 14.746 51.9226H27.0584C28.3017 51.9226 29.4295 51.4634 30.2374 50.7247C31.0558 49.9956 31.5647 48.9776 31.5647 47.8554V36.7428ZM55.5434 101.146C55.5434 100.076 54.5782 99.2046 53.403 99.2046H40.4769C39.2913 99.2046 38.3365 100.076 38.3365 101.146C38.3365 102.216 39.2965 103.078 40.4769 103.078H53.403C54.5834 103.078 55.5434 102.216 55.5434 101.146ZM71.7639 91.8326C71.7639 90.7625 70.8091 89.8912 69.6234 89.8912H40.4769C39.2913 89.8912 38.3365 90.7625 38.3365 91.8326C38.3365 92.9026 39.2965 93.7644 40.4769 93.7644H69.6181C70.8037 93.7644 71.7639 92.9027 71.7639 91.8326ZM40.4766 75.9854H53.4028C54.5831 75.9854 55.5432 75.1142 55.5432 74.0535C55.5432 72.9835 54.5779 72.1122 53.4028 72.1122H40.4766C39.2911 72.1122 38.3362 72.9834 38.3362 74.0535C38.3362 75.1189 39.291 75.9854 40.4766 75.9854ZM71.7639 64.7403C71.7639 63.6702 70.8091 62.799 69.6234 62.799H40.4769C39.2913 62.799 38.3365 63.6702 38.3365 64.7403C38.3365 65.8103 39.2965 66.6721 40.4769 66.6721H69.6181C70.8037 66.6721 71.7639 65.8104 71.7639 64.7403ZM40.4766 48.898H53.4028C54.5831 48.898 55.5432 48.0268 55.5432 46.9661C55.5432 45.896 54.5779 45.0248 53.4028 45.0248H40.4766C39.2911 45.0248 38.3362 45.896 38.3362 46.9661C38.3362 48.0267 39.291 48.898 40.4766 48.898ZM71.7639 37.6481C71.7639 36.578 70.8091 35.7068 69.6234 35.7068L40.4769 35.7115C39.2913 35.7115 38.3365 36.5827 38.3365 37.6528C38.3365 38.7182 39.2965 39.5847 40.4769 39.5847L69.6181 39.58C70.8037 39.58 71.7639 38.7135 71.7639 37.6481ZM27.0577 36.5544H14.7453C14.6928 36.5544 14.6351 36.5828 14.5984 36.6159C14.5617 36.6491 14.5302 36.6964 14.5302 36.7485V47.8611C14.5302 47.9132 14.5617 47.9606 14.5984 47.9937C14.6351 48.0316 14.6928 48.0553 14.7453 48.0553H27.0577C27.1154 48.0553 27.1678 48.0363 27.2045 47.9937C27.2465 47.9606 27.2727 47.9132 27.2727 47.8611V36.7485C27.2727 36.6964 27.2518 36.6491 27.2045 36.6159C27.1678 36.578 27.1206 36.5544 27.0577 36.5544Z" fill="black" />
                    </svg>}
                    heading="Brochure"
                    link={coursed?.brochureLink}
                />
            </div>
        </div>
    );
}

export default CourseDetailsPage;
