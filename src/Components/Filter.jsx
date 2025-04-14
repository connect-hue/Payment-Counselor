import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";

const filterData = [
  { name: "All" },
  { name: "New Zealand" },
  { name: "Australia" },
  { name: "United States" },
  { name: "India" }
];

const coursesObject = {
  'Pharmacist': [
    {
      name: 'OPRA Exam Preparation Course',
      category: 'Australia',
      description: 'Pass the Overseas Pharmacist Readiness Assessment (OPRA) exam on your first attempt with the best online OPRA coaching. Our OPRA preparation course includes online classes, extensive study resources, and AI-driven mock tests, making it the ideal OPRA Exam Preparation Course for international pharmacists seeking to move to and practise in Australia. Enrol in our trusted course today and confidently pass the Overseas Pharmacist Readiness Assessment (OPRA) exam with ease.',
      brochure: '/CourseImage/Opra.png',
      brochureLink: 'https://drive.google.com/file/d/1YvkL3hdh2qgQfLkpfVXfZeEcXQ84RLJk/view?usp=sharing',
      fees: '1200 AUD',
      students: '1500+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/BGqIOppn2my3OG7VuqtmfGWKPh01c5oXK2FuCgmE.jpg',
      link: 'https://youtu.be/N3gZs_jLqrk'
    },
    {
      name: 'GPAT Exam Preparation Course',
      category: 'Pharmacist',
      description: 'Pass the Graduate Pharmacy Aptitude Test (GPAT) on your first attempt with our comprehensive GPAT Preparation Course! Designed for BPharm graduates aiming to pursue an MPharm program, this course offers everything you need to succeed: complete study materials, interactive online classes, previous year question banks, AI-driven mock tests, and more. With our GPAT Preparation Course, you\'ll be fully prepared to excel in the GPAT and secure admission to the top MPharmacy colleges in India. Enrol today to achieve your academic and career goals!',
      brochure: '/CourseImage/Gpat.png',
      fees: '8000 INR',
      brochureLink: 'https://drive.google.com/file/d/1epgTbFXvkxsXpo8thIZhDSrypxi6hmv8/view?usp=sharing',
      students: '2000+',
      location: 'India',
      courseImage: 'https://assets.academically.com/course/znGUIriWGLvKqjy9Q3XqLbo9xSGZPelBPJ17qwdZ.jpg',
      link: 'https://youtu.be/4e3jHkSHUgo'
    },
    {
      name: 'OPRA Exam Crash Course',
      category: 'Pharmacist',
      description: 'The OPRA preparation crash course by Academically is a cost-effective way to clear the Knowledge Assessment of Pharmaceutical Sciences (OPRA) Exam. This course offers you all the resources you need without having to go anywhere.',
      brochure: '/CourseImage/opracrash.png',
      brochureLink: 'https://drive.google.com/file/d/1YvkL3hdh2qgQfLkpfVXfZeEcXQ84RLJk/view?usp=sharing',
      fees: '600 AUD',
      students: '800+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/m9OxRX1uyBiNmDXBsDZ4QxExXFnbpwfxy2jXEAC8.jpg',
      link: 'https://youtu.be/N3gZs_jLqrk'
    },
    {
      name: 'NIPER JEE Exam Preparation Course',
      category: 'Pharmacist',
      description: 'Enrolling in Academically\'s NIPER JEE Preparation Course can help you pass the National Institutes of Pharmaceutical Education and Research Joint Entrance Exam (NIPER JEE) on the first attempt. Study materials, recorded and live lectures, AI-powered practice exams, and individualized coaching are all available in this extensive course. You will be well-prepared for the test with our NIPER JEE Preparation Course, increasing your chances of getting accepted into this highly prestigious institution.',
      brochure: './client/public/Assets/Courses/niper_jee.jpeg',
      fees: '9000 INR',
      brochureLink: 'https://drive.google.com/file/d/1epgTbFXvkxsXpo8thIZhDSrypxi6hmv8/view?usp=sharing',
      students: '1200+',
      location: 'India',
      courseImage: 'https://assets.academically.com/course/bDMKepLpAmoRMxuo80So3VfZo6Evo0z8b8Y2pLfi.jpg',
      link: 'https://youtu.be/RrmAJdaIWrA'
    },
    {
      name: 'New Zealand OPRA Exam Coaching and Preparation Course',
      category: 'Pharmacist',
      description: 'Best NZ OPRA Exam Coaching around the globe. Crack the OPRA Exam on your first attempt through our specialised online classes, tailored study materials, and AI-based OPRA mock tests for pharmacists aspiring to make a career in New Zealand (NZ).',
      brochure: '/CourseImage/newzealandopra.png',
      fees: '1300 NZD',
      brochureLink: 'https://drive.google.com/file/d/1YvkL3hdh2qgQfLkpfVXfZeEcXQ84RLJk/view?usp=sharing',// new brochure
      students: '1000+',
      location: 'New Zealand',
      courseImage: 'https://assets.academically.com/course/cnO0YNVGd0uU9X7K2ujYelMGUyIK4VUseKmi64z5.jpg',
      link: 'https://youtu.be/4bhDplI-XSY'
    },
    {
      name: 'PSI Pharmacy Equivalence Exam (TCQR)',
      category: 'Pharmacist',
      description: 'Clear the Pharmaceutical Society of Ireland Equivalence Examination on your first attempt with our online course designed for professional pharmacists trying to migrate to Ireland.',
      brochure: './client/public/Assets/Courses/psi_exam.jpeg',
      fees: '1100 EUR',
      brochureLink: '', //fill this
      students: '900+',
      location: 'Ireland',
      courseImage: 'https://assets.academically.com/course/MfoqqJ3CMVO7gmN5MUjaYxtGTB3UII89r7XxbWpn.jpg',
      link: 'https://youtu.be/btnftDz7mfU'
    },
    // {
    //   name: 'Pharmaceutical Calculations Course',
    //   category: 'Pharmacist',
    //   description: 'Pharmaceutical Calculations is a vital course that equips students with mathematical skills and problem-solving abilities. Enrol in this course by Academically to ace the section on pharmaceutical calculation in the KAPS, PEBC, DHA exam, and other pharmacy exams you are preparing for.',
    //   brochure: './client/public/Assets/Courses/pharma_calculations.jpeg',
    //   fees: '500 USD',
    //   brochureLink: '',
    //   students: '1500+',
    //   location: 'Global',
    //   courseImage: 'https://assets.academically.com/course/baIzQaTTfk0phRiTD5JFpOi4iHpTfQD7IgxXWaWM.jpg',
    //   link: 'https://youtu.be/jDOV5ZXpZHE'
    // },
    {
      name: 'SPLE Preparation Course',
      category: 'Pharmacist',
      description: 'Clear the Saudi Pharmacist Licensure Examination on your first attempt with our online course designed for professional pharmacists trying to migrate to Saudi Arabia.',
      brochure: './client/public/Assets/Courses/sple_exam.jpeg',
      fees: '1400 SAR',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '1100+',
      location: 'Saudi Arabia',
      courseImage: 'https://assets.academically.com/course/YykiyUJwc4EK6LzpIwA8VFqnNDZRmyzHGaO8UKNV.jpg',
      link: 'https://youtu.be/As36LK4QRD8'
    },
    {
      name: 'Oman Prometric Exam Preparation Course for Pharmacists',
      category: 'Pharmacist',
      description: 'Pass the Oman Prometric Exam for pharmacists on your first attempt with the Best Oman Pharmacist Exam Coaching—comprehensive online classes, study materials, and AI-based mock tests. Our Oman Pharmacy Preparation course is designed for experienced pharmacists who want to migrate to and practice pharmacy in Oman. Clear the Omani Examination for Pharmacists with confidence and ease. Join our proven program today!',
      brochure: './client/public/Assets/Courses/oman_prometric.jpeg',
      fees: '800 OMR',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '700+',
      location: 'Oman',
      courseImage: 'https://assets.academically.com/course/AFOWNHSXuVtInHEkOx6Oe5uOsTw2O2eJ5EGuitKl.jpg',
      link: 'https://youtu.be/HJDO7abS9mg'
    },
    {
      name: 'DHA Exam Preparation Course for Pharmacists',
      category: 'Pharmacist',
      description: 'Get the best coaching for the Dubai Health Authority (DHA) Exam to become a licensed pharmacist in Dubai. For pharmacists who want to make their career in Dubai, our specialised online classes, tailored study materials, and AI-based mock tests are designed to help you crack the DHA Exam on your first attempt.',
      brochure: './client/public/Assets/Courses/dha_exam.jpeg',
      fees: '950 AED',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '1300+',
      location: 'Dubai',
      courseImage: 'https://assets.academically.com/course/drff20EUtbGOhOoPnkuTd3GHUTeNlvjarWmVFwWa.jpg',
      link: 'https://youtu.be/7aEgg4qJAzc'
    },
    {
      name: 'Australian Pharmacy Intern Written & Oral Exam Preparation Course',
      category: 'Pharmacist',
      description: 'Clear the pharmacist Intern Oral Exam on your first attempt through our specialised online course tailored for pharmacists aspiring to make a career in Australia.',
      brochure: './client/public/Assets/Courses/australian_pharmacy_intern.jpeg',
      fees: '1000 AUD',
      brochureLink: '',
      students: '1200+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/drff20EUtbGOhOoPnkuTd3GHUTeNlvjarWmVFwWa.jpg',
      link: ''
    },
    {
      name: 'PEBC Exam Preparation Course',
      category: 'Pharmacist',
      description: 'Clear the Pharmacy Examining Board of Canada (PEBC) Exam on your first attempt through our specialised online course tailored for pharmacists aspiring to make a career in Canada.',
      brochure: './client/public/Assets/Courses/pebc_exam.jpeg',
      fees: '1100 CAD',
      brochureLink: '',
      students: '1400+',
      location: 'Canada',
      courseImage: 'https://assets.academically.com/course/uGf0baDvk8uaj1L2oLdZUtYQP2p1ICB2eTrR7lYv.jpg',
      link: 'https://assets.academically.com/course/pebc-exam-preparation-course/1711966574.mp4'
    },
    {
      name: 'MOH Exam Preparation Course',
      category: 'Pharmacist',
      description: 'Pass the Ministry of Health (MOH) Exam on your first try with our comprehensive courses for Doctors, Dentists, Nurses, Pharmacists, and Lab Technicians. Make your dream career in the United Arab Emirates (UAE) with us.',
      brochure: './client/public/Assets/Courses/moh_exam.jpeg',
      fees: '900 AED',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing', //confirm
      students: '900+',
      location: 'UAE',
      courseImage: 'https://assets.academically.com/course/2Df2QwQCYShiDZhjlhabz6UWlClET58m9RZpqNXg.jpg',
      link: 'https://youtu.be/V0JOB_gw_pA'
    },
    {
      name: 'Qatar Prometric Exam Preparation Course for Pharmacists',
      category: 'Pharmacist',
      description: 'Pass the Qatar Prometric Exam for pharmacists on your first attempt with the best Qatar Pharmacist Exam Coaching. You will get comprehensive online classes, study materials, and AI-based mock tests in this. Our Qatar Prometric Exam Preparation course is designed for experienced pharmacists looking to migrate and practice pharmacy in Qatar, where the pharmacist\'s salary in Qatar is tax-free and has many additional benefits. Clear the Qatar Examination for Pharmacists with confidence and ease. Join our proven program today!',
      brochure: './client/public/Assets/Courses/qatar_prometric.jpeg',
      fees: '950 QAR',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '1100+',
      location: 'Qatar',
      courseImage: 'https://assets.academically.com/course/r4Eb70XRkw5gyqqaqIP7AWMO7ZXhN755l9q5hVVg.jpg',
      link: ''
    },
    {
      name: 'Kuwait MOH Pharmacy Exam Coaching & Preparation Course',
      category: 'Pharmacist',
      description: 'Pass the Kuwait MOH Exam for pharmacists on your first attempt with the best MOH Pharmacist Exam Coaching for Kuwait. In this course, you will get comprehensive online classes, study materials, and AI-based mock tests. Our Kuwait MOH Exam Preparation course is designed for experienced pharmacists who want to migrate to and practise pharmacy in Kuwait. Clear the Kuwait MOH Exam for Pharmacists with confidence and ease. Enrol today and start your journey to a pharmacy career in Kuwait!',
      brochure: './client/public/Assets/Courses/kuwait_moh_exam.jpeg',
      fees: '1000 KWD',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '1100+',
      location: 'Kuwait',
      courseImage: 'https://assets.academically.com/course/5Kh5xBsKwd9dfM965hje1SDL6sDykJrc928kWQlC.jpg',
      link: ''
    },
    {
      name: 'Bahrain Pharmacy Licensure Examination (BPLE) Preparation Course',
      category: 'Pharmacist',
      description: 'Clear the Bahrain Pharmacy Licensure Examination (BPLE) exam on your first attempt with the best online BPLE coaching. Our BPLE preparation course includes online classes, extensive study resources, and AI-driven mock tests, making it the ideal BPLE Preparation Course for international pharmacists seeking to move to and practise in Bahrain. Enrol in our trusted course today and easily pass the Bahrain Pharmacy Licensure Examination (BPLE) exam for pharmacists.',
      brochure: './client/public/Assets/Courses/bple_exam.jpeg',
      fees: '1100 BHD',
      brochureLink: 'https://drive.google.com/file/d/17ecwcMLhSrCFgg8dpsFstphQ73QkbjdL/view?usp=sharing',
      students: '1000+',
      location: 'Bahrain',
      courseImage: 'https://assets.academically.com/course/BdxK898fP2ymxKOLL2hSW3BLVBoKB5QR6GeGlkMg.jpg',
      link: ''
    }
  ],
  'Nursing': [
    {
      name: 'NCLEX Exam Preparation Course',
      category: 'Nursing',
      description: 'Clear the National Council Licensure Examination for Registered Nurses (NCLEX-RN) on your first attempt with our online course designed for professional nurses trying to migrate to Australia, the USA, Canada, Ireland, the Netherlands or any other country.',
      brochure: './client/public/Assets/Courses/nclex_exam.jpeg',
      fees: '1000 USD',
      brochureLink: 'https://drive.google.com/file/d/1xuZHGUemWWy7FVnNhdKc_wo_1cbbpfyh/view?usp=sharing',
      students: '1800+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/eUHZuvpIssBu2lIQCgp3QMF63tLSKeUdTHqVEs8E.jpg',
      link: 'https://youtu.be/2ScjWYC885E'
    },
    {
      name: 'NCLEX Exam Preparation Crash Course',
      category: 'Nursing',
      description: 'An easy and cost-effective course to help you clear the NCLEX exam at your own pace, in your own time. Academically has curated this compact yet comprehensive online course to help global nursing professionals clear the National Council Licensure Examination for Registered Nurses (NCLEX-RN).',
      brochure: './client/public/Assets/Courses/nclex_crash_course.jpeg',
      fees: '700 USD',
      brochureLink: 'https://drive.google.com/file/d/1xuZHGUemWWy7FVnNhdKc_wo_1cbbpfyh/view?usp=sharing',
      students: '1200+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/yaTA4NGPm0EEEn2PCHwnN18MNTpUOXjKdOnZS43p.jpg',
      link: 'https://youtu.be/2ScjWYC885E'
    }
  ],
  'Physiotherapist': [
    {
      name: 'APC Written Assessment Preparation Course',
      category: 'Physiotherapist',
      description: 'Clear the Australian Physiotherapy Council Exam on your first attempt with our preparation course tailored to meet the needs of qualified physiotherapists planning to migrate to Australia.',
      brochure: './client/public/Assets/Courses/apc_written_assessment.jpeg',
      fees: '1100 AUD',
      brochureLink: 'https://drive.google.com/file/d/1rr2fXpuH9IevWQUtvOVN4_Srjj6DMvKG/view?usp=sharing',
      students: '1300+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/JktyX0uJZ2uZJTJtxGlGFwDu4byvfHZBKUUvsOrL.jpg',
      link: 'https://youtu.be/PmYNLZTnieU'
    },
    {
      name: 'HCPC Registration for Physiotherapists',
      category: 'Physiotherapist',
      description: 'To become a registered physiotherapist in the United Kingdom, you must register with the Health and Care Professions Council (HCPC). The HCPC Registration Guidance Program by Academically offers a specially designed, step-by-step guide to help you through the registration process for HCPC and become a registered physiotherapist in the United Kingdom.',
      brochure: './client/public/Assets/Courses/hcpc_registration.jpeg',
      fees: '900 GBP',
      brochureLink: 'https://drive.google.com/file/d/1ZVY-F0MLCpihgSpSYUvgqMNw6fy-DNwj/view?usp=sharing',
      students: '1000+',
      location: 'United Kingdom',
      link: '',
      courseImage: 'https://assets.academically.com/course/I6iG9xSILdzU9gMVSxjayAeCKuXa4Kea3dZVsJbE.jpg'
    }
  ],
  'Doctor': [
    {
      name: 'AMC Exam Preparation Course',
      category: 'Medical Doctor',
      description: 'Clear the Australian Medical Council (AMC) Exam on your first attempt with the top-notch and best AMC coaching online. Our program features comprehensive online classes, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enroll in our proven program today and pass the Australian Medical Council Exam with confidence and ease.',
      brochure: './client/public/Assets/Courses/amc_exam.jpeg',
      fees: '1500 AUD',
      brochureLink: 'https://drive.google.com/file/d/1o5NU0HKJ6bfl_ySgikZBoFIV7P40hANm/view?usp=sharing',
      students: '1800+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/6HH1R0honlPjXvd2eSMeIXlo42F7hE2jyFUxhJuT.jpg',
      link: 'https://youtu.be/cyKpBv_xGl0'
    },
    {
      name: 'AMC Clinical Exam Preparation Course',
      category: 'Medical Doctor',
      description: 'Pass the Australian Medical Council (AMC) Clinical Exam on your first attempt with the best online coaching. Our course aims to prepare candidates for the AMC 2 Clinical Examination with proper clinical skills like taking patient history, performing physical exams, making accurate diagnoses, and managing cases according to Australian Medical Council guidelines. The course also focuses on practising effective communication skills and building confidence for the AMC Clinical Exam with Adaptive AI-driven AMC clinical tests and role plays with tutors. Enrol in our trusted program today and confidently tackle the Australian Medical Council Clinical Exam (AMC 2)—the best online AMC 2 coaching for Australia.',
      brochure: './client/public/Assets/Courses/amc_clinical_exam.jpeg',
      fees: '1800 AUD',
      brochureLink: 'https://drive.google.com/file/d/1o5NU0HKJ6bfl_ySgikZBoFIV7P40hANm/view?usp=sharing',
      students: '1500+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/p7GoxJNPDkWSm0m7mEbJ6h1kxZOT5pOI9F378Uvp.jpg',
      link: ''
    },
    {
      name: 'NZREX Clinical Exam Preparation Course',
      category: 'Medical Doctor',
      description: 'Qualify New Zealand Registration Exam (NZREX) with Academically’s NZREX clinical Exam preparation course. This course prepares doctors for the NZREX Clinical Examination by developing vital clinical skills, practising effective communication and refining diagnostic skills for the Clinical Exam. This is done with exam-specific role plays with tutors and Adaptive AI-driven NZREX clinical tests. Enrol in our trusted program today and confidently take the New Zealand Registration Exam (NZREX) with the best online NZREX Preparation Course.',
      brochure: './client/public/Assets/Courses/nzrex_exam.jpeg',
      fees: '1700 NZD',
      brochureLink: '',//after brochure
      students: '1300+',
      location: 'New Zealand',
      courseImage: 'https://assets.academically.com/course/QdMWDIuzD5KjNlJdLKFwm2OD22qgOgsyGcGdlXNq.jpg',
      link: 'https://youtu.be/ImJ4T04FKwg'
    },
    {
      name: 'USMLE Exam Preparation Course',
      category: 'Medical Doctor',
      description: 'Clear the United States Medical Licensing Examination (USMLE) on your first attempt with our online course designed for professional doctors trying to migrate to the USA.',
      brochure: './client/public/Assets/Courses/usmle_exam.jpeg',
      fees: '2000 USD',
      brochureLink: 'https://drive.google.com/file/d/14obSmIapndrgt3sLuLxrfESc224aACt8/view?usp=sharing',
      students: '1900+',
      location: 'USA',
      courseImage: 'https://assets.academically.com/course/XHXAY21uDL1oeBxgMbmvK0RfdhQqHZlw2EhYnYx4.jpg',
      link: 'https://youtu.be/4fIn4F4jl2k'
    },
    {
      name: 'PLAB Exam Preparation Course',
      category: 'Medical Doctor',
      description: 'Ace the Professional and Linguistic Assessments Board (PLAB) test on your first attempt with our online course designed for professional doctors trying to migrate to the UK.',
      brochure: './client/public/Assets/Courses/plab_exam.jpeg',
      fees: '1600 GBP',
      brochureLink: '',
      students: '1400+',
      location: 'UK',
      courseImage: 'https://assets.academically.com/course/pULmrKfQOLAW8d4lLeorWxBV9C2QMYAR1r5RMZo8.jpg',
      link: 'https://youtu.be/5yxr-9ZkHfo'
    },
    {
      name: 'AMC Exam Preparation Crash Course',
      category: 'Medical Doctor',
      description: 'Ace the Australian Medical Council Exam (AMC) on your first attempt with our tailored preparatory course. Our AMC Exam Preparation Crash Course is designed to optimise your success in the AMC exam and set you on the path to a rewarding medical career in Australia.',
      brochure: './client/public/Assets/Courses/amc_crash_course.jpeg',
      fees: '1400 AUD',
      brochureLink: 'https://drive.google.com/file/d/1o5NU0HKJ6bfl_ySgikZBoFIV7P40hANm/view?usp=sharing',
      students: '1200+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/y7QITDwO2KA6SoIdRwDjdHcPixZyQm0vxJhuXd6b.jpg',
      link: 'https://youtu.be/cyKpBv_xGl0'
    }
  ],
  'Dentist': [
    {
      name: 'ADC Exam Preparation Course',
      category: 'Dentist',
      description: 'Pass the Australian Dental Council (ADC) Exam on your first attempt with the best ADC coaching by Academically. Our comprehensive online classes, extensive study materials, and AI-based mock tests make our ADC Exam Preparation course ideal for experienced dentists wanting to migrate to and practice in Australia. Join our proven program today and clear the Australian Dental Council Exam confidently and easily.',
      brochure: './client/public/Assets/Courses/adc_exam.jpeg',
      fees: '1800 AUD',
      brochureLink: 'https://drive.google.com/file/d/1AK9-DuVkdzY3EvXlKLAPBVhVNiDxCGhZ/view?usp=sharing',
      students: '1600+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/2ngM4jvRs9Smdj32jISWAqAcnreAqvHCqcAghSr8.jpg',
      link: 'https://assets.academically.com/course/adc-exam-preparation-course/1719553756.mp4'
    }
  ],
  // 'Veterinary': [
  //   {
  //     name: 'Australasian Veterinary Examination (AVE) Preparation Course',
  //     category: 'Veterinary',
  //     description: 'Achieve success on your first attempt at the Australasian Veterinary Examination (AVE) with our comprehensive online course tailored for experienced veterinary doctors pursuing migration to Australia.',
  //     brochure: './client/public/Assets/Courses/ave_exam.jpeg',
  //     fees: '1900 AUD',
  //     brochureLink: '',
  //     students: '1400+',
  //     location: 'Australia',
  //     courseImage: 'https://assets.academically.com/course/BdxK898fP2ymxKOLL2hSW3BLVBoKB5QR6GeGlkMg.jpg',
  //     link: ''
  //   }
  // ],
  'Optometrist': [
    {
      name: "OCANZ's COE Exam Preparation Course",
      category: 'Optometrist',
      description: "Ace the Competency in Optometry (COE) Examination on your first attempt through our specialised online course tailored for optometrists aspiring to make a career in Australia.",
      brochure: './client/public/Assets/Courses/coe_exam.jpeg',
      fees: '1700 AUD',
      brochureLink: 'https://drive.google.com/file/d/1PSo5lFWQPRRkd1HypWu5eXMUPi2HUMKz/view?usp=sharing',
      students: '1300+',
      location: 'Australia',
      courseImage: 'https://assets.academically.com/course/h7hHislDKvVpwiwd6CBenl4O0lIwNqdIlwZCmY1F.jpg',
      link: 'https://youtu.be/d_a16bfimtQ'
    }
  ],

  'Other Professionals': [
    {
      name: 'DOH Exam Preparation Course',
      category: 'Healthcare Professionals',
      description: 'Ace the Department of Health (DOH) Exam on your first try with our comprehensive courses for Doctors, Dentists, Nurses, Pharmacists, and Lab Technicians. Make your dream career in Abu Dhabi with us.',
      brochure: './client/public/Assets/Courses/doh_exam.jpeg',
      fees: '1600 AED',
      brochureLink: '',
      students: '1500+',
      location: 'Global',
      courseImage: 'https://assets.academically.com/course/EvRS0d9tDPit7SfgfCO2iV9xlVojGyn1ibec0S2d.jpg',
      link: 'https://youtu.be/1sdqo4e97HE'
    }
  ]
};
const Filter = () => {
  const { name } = useParams();
  const courses = coursesObject[name] || [];
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (location) => {
    setSelectedFilter(location);
    if (location === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.location === location);
      setFilteredCourses(filtered);
    }
  };

  return (
    <>
      <h1 className="text-2xl mt-24 font-bold px-4">{name}</h1>
      {courses.length > 2 &&
        <div
          className="flex-wrap justify-center gap-2 sm:gap-4 mb-8 max-lg:hidden flex"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {filterData.map((filter) => (
            <button
              key={filter.name}
              className={`xl:px-8 px-6 py-3 border border-[#0FB995] text-sm sm:text-base rounded-md ${selectedFilter === filter.name ? "bg-[#0FB995] text-white" : "text-black"
                }`}
              onClick={() => handleFilterClick(filter.name)}
            >
              {filter.name}
            </button>
          ))}
        </div>}
      <SearchBar />
      <CourseList courses={filteredCourses} />
    </>
  );
};

export default Filter;
