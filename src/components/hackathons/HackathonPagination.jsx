import { useSearchParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HackathonPagination({ pagination, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!pagination || pagination.totalPages <= 1) return null;

  const currentPage = pagination.page || 0;
  const totalPages = pagination.totalPages;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
    // Smooth scroll to top when paginating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-100">
      <button
        disabled={currentPage === 0 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98]"
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <span className="text-sm font-bold text-gray-600 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
        Page <span className="text-gray-900">{currentPage + 1}</span> of {totalPages}
      </span>
      
      <button
        disabled={currentPage >= totalPages - 1 || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98]"
        aria-label="Next page"
      >
        <FiChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
