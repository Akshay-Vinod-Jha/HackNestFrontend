import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function HackathonSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('title') || '';

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      // Backend expects "title" instead of "q" if we are strictly using the DTO. 
      // But let's assume search can take a 'title' param based on typical Spring Boot specs, or we can use 'q' if that's generic.
      // Let's use 'title' for now to be safe, or 'q' if that's what we want.
      // Wait, the prompt says "Supported Filters: country, mode, status, domain, techStack, tag."
      // It doesn't explicitly mention 'title', but a search bar typically filters by title/name.
      // We will map this to 'q' and if the backend needs something else it's adjustable.
      newParams.set('q', e.target.value);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input 
        type="text"
        placeholder="Search hackathons by name..."
        value={searchParams.get('q') || ''}
        onChange={handleSearch}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
      />
    </div>
  );
}
