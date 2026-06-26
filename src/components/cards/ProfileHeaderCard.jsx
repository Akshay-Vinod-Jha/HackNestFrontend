export default function ProfileHeaderCard({ profile }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md">
      <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-4xl font-extrabold uppercase shadow-inner shrink-0">
        {profile?.fullName?.charAt(0) || profile?.username?.charAt(0) || 'U'}
      </div>
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {profile?.fullName || 'Anonymous User'}
        </h1>
        <p className="text-lg text-blue-600 font-medium mt-1">
          {profile?.title || 'HackNest Member'}
        </p>
        <p className="text-sm text-gray-500 mt-2 flex items-center justify-center md:justify-start gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {profile?.location || 'Location Not Set'}
        </p>
      </div>
    </div>
  );
}
