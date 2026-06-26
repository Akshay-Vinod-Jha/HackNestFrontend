import WelcomeCard from '../../components/cards/WelcomeCard';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <WelcomeCard userName="Alex Developer" />
      
      {/* 
        This is a placeholder for the rest of the dashboard layout.
        The backend metrics and recommendations will be integrated here in future tasks. 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-96 flex items-center justify-center border-dashed">
          <p className="text-gray-400 font-medium text-lg">Main Dashboard Content Area</p>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-96 flex items-center justify-center border-dashed">
          <p className="text-gray-400 font-medium text-lg">Sidebar Content Area</p>
        </div>
      </div>
    </div>
  );
}
