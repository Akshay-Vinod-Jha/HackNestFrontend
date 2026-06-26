export default function PortfolioCard({ portfolio }) {
  const links = Array.isArray(portfolio) && portfolio.length > 0 ? portfolio : [];
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all hover:shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
        Portfolio Links
      </h2>
      {links.length > 0 ? (
        <ul className="space-y-4">
          {links.map((link, index) => {
            const url = typeof link === 'string' ? link : link.url;
            const title = typeof link === 'string' ? link : (link.title || url);
            return (
              <li key={index}>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all break-all"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                    {title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No links added yet.</p>
        </div>
      )}
    </div>
  );
}
