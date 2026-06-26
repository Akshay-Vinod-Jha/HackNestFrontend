export default function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm h-80 animate-pulse flex flex-col">
          <div className="flex gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gray-200"></div>
            <div className="flex-1 space-y-3 py-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-5/6"></div>
            <div className="h-3 bg-gray-100 rounded w-4/6"></div>
          </div>
          <div className="pt-6 mt-auto">
            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
