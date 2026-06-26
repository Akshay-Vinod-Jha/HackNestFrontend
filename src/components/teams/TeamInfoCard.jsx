export default function TeamInfoCard({ team }) {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 h-full">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">About the Team</h2>
      <div className="prose prose-blue max-w-none text-gray-600">
        <p className="whitespace-pre-wrap leading-relaxed font-medium">
          {team.description || 'No description provided for this team.'}
        </p>
      </div>
    </div>
  );
}
