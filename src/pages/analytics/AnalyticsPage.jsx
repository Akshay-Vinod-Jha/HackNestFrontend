import { useEffect } from 'react';
import useAnalytics from '../../hooks/useAnalytics';
import StatisticsGrid from '../../components/analytics/StatisticsGrid';
import TrustSummaryCard from '../../components/analytics/TrustSummaryCard';
import { FiAlertCircle, FiBarChart2 } from 'react-icons/fi';

export default function AnalyticsPage() {
  const { analytics, isLoading, error, fetchProfileAnalytics } = useAnalytics();

  useEffect(() => {
    fetchProfileAnalytics().catch(() => {});
  }, [fetchProfileAnalytics]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-10"></div>
        <div className="h-64 bg-gray-200 rounded-3xl w-full mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-28 bg-gray-100 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  if (error && !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg">
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load analytics.'}</span>
        </div>
      </div>
    );
  }

  if (!analytics && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <FiBarChart2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Analytics Available</h3>
          <p className="text-gray-500 font-medium max-w-md">
            Start participating in hackathons and joining teams to generate profile analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen space-y-10">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Analytics Overview</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl">
          Track your progress, platform engagement, and overall performance metrics.
        </p>
      </div>

      <section>
        <TrustSummaryCard analytics={analytics} />
      </section>

      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Engagement Statistics</h2>
        <StatisticsGrid analytics={analytics} />
      </section>
    </div>
  );
}
