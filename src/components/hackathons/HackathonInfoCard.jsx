import { FiInfo, FiTag, FiCpu, FiGlobe } from 'react-icons/fi';

export default function HackathonInfoCard({ hackathon }) {
  if (!hackathon) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-full">
      <div className="mb-8">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2 mb-4">
          <FiInfo className="w-5 h-5 text-blue-600" />
          About this Hackathon
        </h2>
        <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">
          {hackathon.description || 'No detailed description provided by the organizer.'}
        </p>
      </div>

      <div className="space-y-6 pt-6 border-t border-gray-100">
        {hackathon.domains && hackathon.domains.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <FiGlobe className="w-4 h-4 text-gray-400" /> Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {hackathon.domains.map(domain => (
                <span key={domain} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        )}

        {hackathon.techStacks && hackathon.techStacks.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <FiCpu className="w-4 h-4 text-gray-400" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {hackathon.techStacks.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {hackathon.tags && hackathon.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <FiTag className="w-4 h-4 text-gray-400" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {hackathon.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
