export default function AdminBrochuresLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-pulse">
      <div className="h-16 bg-white border-b border-gray-200" />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-gray-200">
          <div className="space-y-2">
            <div className="h-7 w-56 bg-slate-200 rounded" />
            <div className="h-4 w-80 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-36 bg-slate-200 rounded-lg" />
            <div className="h-10 w-36 bg-teal-100 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-white border border-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-white border border-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

