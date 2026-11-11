export default function CourseDetailsLoading() {
  return (
    <div className="flex-col items-center mt-20 justify-center w-[85%] mx-auto animate-pulse pb-20">
      <div className="w-full h-[55vh] max-sm:h-[32vh] bg-slate-200 rounded-xl mb-8" />
      <div className="h-9 w-2/3 bg-slate-200 rounded-lg mb-4" />
      <div className="space-y-2 mb-10">
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-4/6 bg-slate-200 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-teal-50/70 p-6 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-teal-100" />
            <div className="h-6 w-28 bg-teal-100 rounded" />
            <div className="h-4 w-24 bg-teal-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

