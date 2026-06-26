import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function EmptyTeamState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-200">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <FiUsers className="w-10 h-10 text-gray-300" />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3">No teams found</h2>
      <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
        We couldn't find any teams matching your current filters. Try adjusting your search criteria or create your own team.
      </p>
      <Link 
        to="/teams/create"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95"
      >
        Create a Team
      </Link>
    </div>
  );
}
