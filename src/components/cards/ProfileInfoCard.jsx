export default function ProfileInfoCard({ profile }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all hover:shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Basic Information
      </h2>
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Bio</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            {profile?.bio || 'No bio provided yet.'}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Email Address</h3>
          <p className="text-gray-900 font-medium text-sm">{profile?.email || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Member Since</h3>
          <p className="text-gray-900 font-medium text-sm">
            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
          </p>
        </div>
      </div>
    </div>
  );
}
