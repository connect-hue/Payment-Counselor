import React from "react";

const CounselorList = ({ counselors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {counselors.map((counselor) => (
        <div key={counselor.id} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{counselor.name}</h3>
          <p>{counselor.designation}</p>
          <p>{counselor.contact}</p>
        </div>
      ))}
    </div>
  );
};

export default CounselorList;
