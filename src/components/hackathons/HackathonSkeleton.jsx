export default function HackathonSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 h-[280px] flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4 gap-3">
              <div className="space-y-3 w-full">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-100 rounded-lg w-20 shrink-0"></div>
            </div>
            
            <div className="space-y-4 mt-auto">
              <div className="h-4 bg-gray-100 rounded-lg w-2/3"></div>
              <div className="h-4 bg-gray-100 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-50 bg-gray-50/50">
            <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
