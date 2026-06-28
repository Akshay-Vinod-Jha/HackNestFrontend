export default function AnalyticsCard({ analytics }) {
  const metrics = [
    { label: 'Total Hackathons', value: analytics?.totalHackathons || 0, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: 'Teams Joined', value: analytics?.totalTeamsJoined || 0, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'Teams Led', value: analytics?.totalTeamsLed || 0, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { label: 'Applications', value: analytics?.totalApplications || 0, color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100' },
    { label: 'Invitations', value: analytics?.totalInvitations || 0, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
    { label: 'Achievements', value: analytics?.totalAchievements || 0, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-full">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        Overview Analytics
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center ${metric.bg} bg-opacity-70 transition-transform`}>
            <span className={`text-2xl font-black ${metric.color} mb-1.5`}>{metric.value}</span>
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
