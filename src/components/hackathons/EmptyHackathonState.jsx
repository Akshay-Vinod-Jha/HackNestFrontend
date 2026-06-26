export default function EmptyHackathonState() {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm p-16 text-center max-w-3xl mx-auto mt-8">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3">No Hackathons Found</h2>
      <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
        There are currently no hackathons available that match your criteria. Check back later or try adjusting your filters.
      </p>
    </div>
  );
}
