export default function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 flex flex-col h-[400px] animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded-lg w-1/2 mb-8"></div>
          
          <div className="h-16 bg-gray-50 rounded-2xl mb-6"></div>
          
          <div className="space-y-4 mb-6 flex-1">
            <div className="h-4 bg-gray-100 rounded-lg w-1/3"></div>
            <div className="flex gap-2">
               <div className="h-6 w-16 bg-gray-100 rounded-lg"></div>
               <div className="h-6 w-20 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-100 mt-auto flex gap-3">
             <div className="h-10 bg-gray-100 rounded-xl flex-1"></div>
             <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
