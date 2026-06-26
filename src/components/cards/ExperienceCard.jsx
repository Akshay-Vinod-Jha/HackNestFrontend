export default function ExperienceCard({ experience }) {
  const displayExp = Array.isArray(experience) && experience.length > 0 ? experience : [];
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        Professional Experience
      </h2>
      {displayExp.length > 0 ? (
        <div className="space-y-6">
          {displayExp.map((exp, index) => (
            <div key={index} className="flex gap-5 relative group">
              <div className="mt-1 flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-sm z-10 group-hover:scale-125 transition-transform"></div>
                {index !== displayExp.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-1 absolute top-3 bottom-0"></div>}
              </div>
              <div className="pb-4 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{exp.company || 'Unknown Company'}</h3>
                  <span className="text-xs font-semibold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full w-max mt-1 sm:mt-0">
                    {exp.startDate || 'Past'} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{exp.role || 'Role'}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{exp.description || 'No description provided.'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No experience recorded.</p>
        </div>
      )}
    </div>
  );
}
