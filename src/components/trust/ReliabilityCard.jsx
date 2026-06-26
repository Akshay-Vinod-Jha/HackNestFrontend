import { FiActivity } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ReliabilityCard({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  // Convert 1-5 scale to percentage for width, but cap at 100%
  const percentage = Math.min((animatedScore / 5) * 100, 100);

  let barColor = 'bg-gray-400';
  let textColor = 'text-gray-900';

  if (score >= 4.5) {
    barColor = 'bg-blue-500';
    textColor = 'text-blue-600';
  } else if (score >= 3.5) {
    barColor = 'bg-amber-400';
    textColor = 'text-amber-600';
  } else {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-600';
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <FiActivity className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Reliability</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-4xl font-black ${textColor}`}>{animatedScore.toFixed(1)}</span>
          <span className="text-gray-400 font-bold mb-1">/ 5.0</span>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <p className="text-gray-500 font-medium text-sm">
        Measures consistency in delivering work on time and attending meetings.
      </p>
    </div>
  );
}
