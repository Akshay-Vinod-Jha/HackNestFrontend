import { FiClock, FiCheck, FiX } from 'react-icons/fi';

export default function InvitationStatusBadge({ status }) {
  if (status === 'ACCEPTED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-wider shrink-0">
        <FiCheck className="w-3.5 h-3.5" /> Accepted
      </span>
    );
  }
  
  if (status === 'REJECTED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-black uppercase tracking-wider shrink-0">
        <FiX className="w-3.5 h-3.5" /> Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-black uppercase tracking-wider shrink-0">
      <FiClock className="w-3.5 h-3.5" /> Pending
    </span>
  );
}
