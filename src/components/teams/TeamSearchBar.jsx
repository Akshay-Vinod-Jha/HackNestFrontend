import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function TeamSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('q', e.target.value);
    } else {
      newParams.delete('q');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input 
        type="text"
        placeholder="Search teams by name..."
        value={searchParams.get('q') || ''}
        onChange={handleSearch}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
      />
    </div>
  );
}
