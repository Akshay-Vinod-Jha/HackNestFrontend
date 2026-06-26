import LeaderboardTable from './LeaderboardTable';
import LeaderboardUserCard from './LeaderboardUserCard';

export default function LeaderboardCard({ users, page, size }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative z-10">
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <LeaderboardTable users={users} page={page} size={size} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4 p-4">
        {!users || users.length === 0 ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            No users found on this leaderboard.
          </div>
        ) : (
          users.map((user, index) => (
            <LeaderboardUserCard key={user.id} user={user} rank={(page * size) + index + 1} />
          ))
        )}
      </div>

    </div>
  );
}
