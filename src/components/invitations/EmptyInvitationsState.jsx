import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function EmptyInvitationsState() {
  return (
    <div className="text-center py-24 px-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm max-w-3xl mx-auto">
      <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <FiMail className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-3">No Invitations Yet</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        You haven't received any team invitations yet. Make sure your profile is up to date and your skills are visible to team leaders!
      </p>
      <Link 
        to="/profile"
        className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 gap-2"
      >
        Update Profile
      </Link>
    </div>
  );
}
