import { FiAward, FiDownload, FiExternalLink } from 'react-icons/fi';

export default function CertificateCard({ title, issuer, date, verifyUrl }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all h-full flex flex-col group relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border-2 border-amber-50 shadow-inner">
          <FiAward className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 leading-tight mb-1 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm font-bold text-gray-500">{issuer}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          {date}
        </span>
        <div className="flex gap-2">
          {verifyUrl && (
            <a href={verifyUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
