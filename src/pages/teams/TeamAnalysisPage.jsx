import { useParams } from 'react-router-dom';

export default function TeamAnalysisPage() {
  const { id } = useParams();
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Team Analysis: {id}</h1>
      <p className="text-gray-500 font-medium">This is a placeholder for the Team Analysis page.</p>
    </div>
  );
}
