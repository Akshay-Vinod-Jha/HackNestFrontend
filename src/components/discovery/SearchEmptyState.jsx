import { FiSearch } from 'react-icons/fi';

export default function SearchEmptyState({ query, tab }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
        <FiSearch className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-500 font-medium max-w-md">
        We couldn't find any {tab} matching <span className="font-bold text-gray-700">"{query}"</span>. 
        Try adjusting your filters or searching with different keywords.
      </p>
    </div>
  );
}
