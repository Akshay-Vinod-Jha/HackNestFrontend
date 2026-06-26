export default function InvitationSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-3 flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/3"></div>
        </div>
        <div className="h-8 w-24 bg-gray-200 rounded-xl shrink-0"></div>
      </div>
      <div className="space-y-3 mt-6">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-50 flex gap-3">
        <div className="h-10 bg-gray-100 rounded-xl flex-1"></div>
        <div className="h-10 bg-gray-100 rounded-xl flex-1"></div>
      </div>
    </div>
  );
}
