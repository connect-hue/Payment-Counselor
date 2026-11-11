export default function PlacementsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-12 bg-[#F8FAFC] animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-6 space-y-4">
            <div className="h-7 w-48 bg-teal-100 rounded-full" />
            <div className="h-14 w-5/6 bg-slate-200 rounded-xl" />
            <div className="h-6 w-2/3 bg-slate-200 rounded-lg" />
            <div className="flex gap-4 pt-2">
              <div className="h-12 w-48 bg-teal-200 rounded-xl" />
              <div className="h-12 w-44 bg-slate-200 rounded-xl" />
            </div>
          </div>
          <div className="lg:col-span-6 h-72 bg-slate-200 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

