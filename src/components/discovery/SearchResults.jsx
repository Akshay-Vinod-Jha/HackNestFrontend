import UserCard from '../users/UserCard';
import TeamCard from '../teams/TeamCard';
import HackathonCard from '../hackathons/HackathonCard';
import SearchSkeleton from './SearchSkeleton';
import SearchEmptyState from './SearchEmptyState';

export default function SearchResults({ tab, results, isLoading, query }) {
  if (isLoading) {
    return <SearchSkeleton />;
  }

  if (!results || results.length === 0) {
    return <SearchEmptyState tab={tab} query={query} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item) => {
        if (tab === 'students') {
          return <UserCard key={item.id} user={item} />;
        }
        if (tab === 'teams') {
          return <TeamCard key={item.id} team={item} />;
        }
        if (tab === 'hackathons') {
          return <HackathonCard key={item.id} hackathon={item} />;
        }
        return null;
      })}
    </div>
  );
}
