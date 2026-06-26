export default function HackathonsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Hackathons</h1>
        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
          Create Hackathon
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        <p className="text-gray-500 font-bold text-lg mb-2">Hackathon Catalog Placeholder</p>
        <p className="text-gray-400">UI implementation pending next task.</p>
      </div>
    </div>
  );
}
