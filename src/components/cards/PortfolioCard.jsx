import React from 'react';
import { FiGithub, FiLinkedin, FiGlobe, FiFileText, FiVideo, FiLink } from 'react-icons/fi';

export default function PortfolioCard({ portfolio }) {
  const links = Array.isArray(portfolio) && portfolio.length > 0 ? portfolio : [];
  
  const getIconForType = (type) => {
    switch (type) {
      case 'GITHUB': return <FiGithub className="w-5 h-5" />;
      case 'LINKEDIN': return <FiLinkedin className="w-5 h-5" />;
      case 'PORTFOLIO': return <FiGlobe className="w-5 h-5" />;
      case 'RESUME': return <FiFileText className="w-5 h-5" />;
      case 'PROJECT_DEMO': return <FiVideo className="w-5 h-5" />;
      default: return <FiLink className="w-5 h-5" />;
    }
  };

  const getFormatForType = (type) => {
    switch (type) {
      case 'GITHUB': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', label: 'GitHub' };
      case 'LINKEDIN': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', label: 'LinkedIn' };
      case 'PORTFOLIO': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', label: 'Portfolio' };
      case 'RESUME': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', label: 'Resume' };
      case 'PROJECT_DEMO': return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', label: 'Demo Video' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', label: 'Other Link' };
    }
  };

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
            const type = typeof link === 'object' ? link.type : 'OTHER';
            const format = getFormatForType(type);
            
            return (
              <li key={index}>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group flex items-center gap-4 p-4 rounded-xl border ${format.border} hover:shadow-sm transition-all`}
                >
                  <div className={`w-10 h-10 rounded-xl ${format.bg} ${format.text} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                    {getIconForType(type)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold text-gray-900">{format.label}</span>
                    <span className="text-xs font-medium text-gray-500 truncate group-hover:text-blue-600 transition-colors">
                      {url.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
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
