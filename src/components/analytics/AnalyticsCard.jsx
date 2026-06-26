export default function AnalyticsCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 h-full">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-black text-gray-900 leading-none mb-2">{value}</p>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
      </div>
    </div>
  );
}
