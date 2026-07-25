"use client";

import { useEffect } from "react";

const imagesToPreload = [
  '/CourseImage/ADC.svg',
  '/CourseImage/CDD.png',
  '/CourseImage/Clinical-Drug-Development.png',
  '/CourseImage/MSL.png',
  '/CourseImage/AMCclinical.svg',
  '/CourseImage/AMCcrash.svg',
  '/CourseImage/AMCexam.svg',
  '/CourseImage/APC Exam Course.svg',
  '/CourseImage/Australian Pharmacy Intern.svg',
  '/CourseImage/bple.svg',
  '/CourseImage/DHA EXAM Preparation Course for Pharmacists.svg',
  '/CourseImage/DOH Exam Course.svg',
  '/CourseImage/GPAT EXAM.svg',
  '/CourseImage/Gpat.png',
  '/CourseImage/HCPC Exam Course.svg',
  '/CourseImage/Kuwait EXAM Preparation Course.svg',
  '/CourseImage/MOH EXAM.svg',
  '/CourseImage/NCLEX.svg',
  '/CourseImage/NCLEXExamCrashCourse.svg',
  '/CourseImage/New Zealand OPRA EXAM COURSE.svg',
  '/CourseImage/newzealandopra.png',
  '/CourseImage/NIPER JEE EXAM Preparation Course.svg',
  '/CourseImage/Niper.png',
  '/CourseImage/niper.svg',
  '/CourseImage/nzrex.svg',
  '/CourseImage/OCANZ.svg',
  '/CourseImage/OMAN Prometric Exam.svg',
  '/CourseImage/OPRA EXAM CRASH COURSE.svg',
  '/CourseImage/OPRA EXAM Preparation Course.svg',
  '/CourseImage/Opra.png',
  '/CourseImage/opracrash.png',
  '/CourseImage/PEBC EXAM.svg',
  '/CourseImage/PLAB.svg',
  '/CourseImage/USMLE.svg',
  '/CourseImage/SPLE EXAM.svg',
  '/Qatar Primetric Exam.svg',
  '/CourseImage/Qatar Primetric Exam.svg',
  '/PSI Pharmacy Equivalence EXAM.svg',
  '/CourseImage/PSI Pharmacy Equivalence EXAM.svg',
  '/CounselorsImages/image (1).png',
  '/CounselorsImages/image (2).png',
  '/CounselorsImages/image (3).png',
  '/CounselorsImages/image (4).png',
  '/CounselorsImages/image (5).png',
  '/CounselorsImages/image (6).png',
  '/CounselorsImages/image (7).png',
  '/CounselorsImages/image (8).png',
  '/CounselorsImages/image (9).png',
  '/CounselorsImages/image (10).png',
  '/Assets/dentist.jpg',
  '/Assets/doctor.jpg',
  '/Assets/healthcare.jpg',
  '/Assets/labtech.png',
  '/Assets/logo.svg',
  '/Assets/nursing.jpg',
  '/Assets/optometrist.jpg',
  '/Assets/pharmacist.jpg',
  '/Assets/physiotherapist.jpg'
];

export default function PreloadImages() {
  useEffect(() => {
    const activeLinks = [];
    imagesToPreload.forEach((img) => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = img;
      preloadLink.as = 'image';
      document.head.appendChild(preloadLink);
      activeLinks.push(preloadLink);
    });

    return () => {
      activeLinks.forEach((link) => {
        try {
          document.head.removeChild(link);
        } catch (e) {
          // Ignore if already removed
        }
      });
    };
  }, []);

  return null;
}
