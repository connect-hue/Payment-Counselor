import React from "react";

// Edit each object below to add a placement recipient's information.
const placementCards = [
  {
    id: 1,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
  {
    id: 2,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
  {
    id: 3,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
  {
    id: 4,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
  {
    id: 5,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
  {
    id: 6,
    name: "Candidate Name",
    qualification: "Qualification",
    role: "Job Role",
    package: "Package",
    image: "/Assets/nursing.jpg",
    companies: ["Company One", "Company Two"],
  },
];

const PlacementCard = ({ placement }) => (
  <article className="overflow-hidden rounded-2xl border border-[#00D9B7] bg-[#0A1222] shadow-lg">
    <div className="relative">
      <img src={placement.image} alt={placement.name} className="h-80 w-full object-cover" />
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        {placement.companies.map((company) => (
          <span key={company} className="rounded bg-white px-3 py-2 text-xs font-bold text-[#17264B] shadow">
            {company}
          </span>
        ))}
      </div>
    </div>
    <div className="border-t border-slate-500 px-5 py-4 text-white">
      <h2 className="text-3xl font-bold leading-tight">{placement.name}</h2>
      <p className="mt-1 text-base font-semibold text-slate-200">{placement.qualification}</p>
      <p className="mt-2 text-sm font-bold uppercase text-[#00D9B7]">{placement.role}</p>
    </div>
    <div className="bg-[#F7DD4B] px-5 py-3 text-center text-2xl font-bold text-[#17264B]">
      {placement.package}
    </div>
  </article>
);

const PlacementsPage = () => (
  <main className="min-h-screen px-8 pt-28 pb-12 max-sm:px-4" aria-labelledby="placements-title">
    <h1 id="placements-title" className="mb-8 text-center text-3xl font-semibold">
      Upskilling Placements
    </h1>
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {placementCards.map((placement) => (
        <PlacementCard key={placement.id} placement={placement} />
      ))}
    </section>
  </main>
);

export default PlacementsPage;