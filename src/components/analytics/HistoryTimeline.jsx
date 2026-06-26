import HistoryCard from './HistoryCard';

export default function HistoryTimeline({ historyData }) {
  if (!historyData || historyData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
        <h3 className="text-xl font-extrabold text-gray-900 mb-2">No History Found</h3>
        <p className="text-gray-500 font-medium">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-indigo-100 hidden md:block"></div>

      <div className="space-y-6 relative">
        {historyData.map((item, index) => (
          <div key={item.id || index} className="relative flex items-center md:pl-16">
            
            {/* Timeline Dot */}
            <div className="absolute left-[22px] w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_0_4px_white] hidden md:block border-2 border-white z-10"></div>
            
            <div className="w-full">
              <HistoryCard historyItem={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
