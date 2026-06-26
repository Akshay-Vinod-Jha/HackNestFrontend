import { useSearchParams } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

export default function HackathonSorting() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      const [sortBy, sortDirection] = value.split(':');
      newParams.set('sortBy', sortBy);
      newParams.set('sortDirection', sortDirection);
    } else {
      newParams.delete('sortBy');
      newParams.delete('sortDirection');
    }
    
    // Reset page whenever sorting changes
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const currentSortBy = searchParams.get('sortBy');
  const currentSortDirection = searchParams.get('sortDirection');
  const currentValue = currentSortBy ? `${currentSortBy}:${currentSortDirection}` : '';

  return (
    <div className="relative inline-flex items-center">
      <select 
        value={currentValue}
        onChange={handleSortChange}
        className="pl-4 pr-10 py-3 sm:py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium text-gray-700 text-sm appearance-none cursor-pointer min-w-[200px]"
      >
        <option value="">Default Sort</option>
        <option value="registrationDeadline:asc">Registration Deadline (Soonest)</option>
        <option value="registrationDeadline:desc">Registration Deadline (Latest)</option>
        <option value="createdAt:desc">Created Date (Newest)</option>
        <option value="createdAt:asc">Created Date (Oldest)</option>
        <option value="minTeamSize:asc">Team Size (Smallest)</option>
        <option value="minTeamSize:desc">Team Size (Largest)</option>
        <option value="status:asc">Status (A-Z)</option>
      </select>
      <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
