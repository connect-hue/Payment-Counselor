export default function PreviewLoading() {
  return (
    <div className="p-8 mt-24 max-w-7xl mx-auto animate-pulse">
      <div className="h-10 w-1/2 mx-auto bg-slate-200 rounded-lg mb-8" />
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-11 w-28 bg-slate-200 rounded-md" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 bg-white">
            <div className="h-44 w-full bg-slate-200 rounded-md" />
            <div className="h-5 w-4/5 bg-slate-200 rounded" />
            <div className="h-5 w-2/3 bg-slate-200 rounded" />
            <div className="flex gap-2">
              <div className="h-7 w-20 bg-teal-50 rounded" />
              <div className="h-7 w-24 bg-teal-50 rounded" />
            </div>
            <div className="h-10 w-full bg-teal-100 rounded-md mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

