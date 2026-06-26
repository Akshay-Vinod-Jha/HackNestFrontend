import { useEffect, useState } from 'react';

export default function TrustScoreCircle({ score = 0, size = 120, strokeWidth = 10 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  let color = 'text-emerald-500';
  let bgColor = 'text-emerald-50';
  
  if (score < 50) {
    color = 'text-rose-500';
    bgColor = 'text-rose-50';
  } else if (score < 75) {
    color = 'text-amber-500';
    bgColor = 'text-amber-50';
  } else if (score < 90) {
    color = 'text-blue-500';
    bgColor = 'text-blue-50';
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute top-0 left-0 transform -rotate-90" width={size} height={size}>
        <circle
          className={bgColor}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${color.replace('text-', 'text-').replace('-500', '-600')}`}>
          {animatedScore}
        </span>
      </div>
    </div>
  );
}
