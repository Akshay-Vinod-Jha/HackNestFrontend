import TimelineEvent from './TimelineEvent';
import { FiActivity } from 'react-icons/fi';

export default function TimelineCard({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <FiActivity className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Activity Yet</h3>
        <p className="text-gray-500 font-medium max-w-md">
          Your timeline is empty. Complete your profile, join teams, and participate in hackathons to see activity here!
        </p>
      </div>
    );
  }

  return (
    <div className="relative pt-4">
      <div className="space-y-6">
        {events.map((event, index) => (
          <TimelineEvent key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  );
}
