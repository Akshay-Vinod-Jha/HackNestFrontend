export default function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[360px] flex flex-col animate-pulse">
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-5">
               <div className="space-y-3 w-full">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
               </div>
            </div>
            
            <div className="space-y-4 mt-auto pt-2">
               <div className="h-4 bg-gray-100 rounded-lg w-2/3"></div>
               <div className="h-4 bg-gray-100 rounded-lg w-3/4"></div>
               <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex gap-2">
             <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
             <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
