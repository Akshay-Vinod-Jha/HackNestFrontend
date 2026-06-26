import { useEffect, useState } from 'react';

export default function MatchScoreCircle({ score = 0, size = 60, strokeWidth = 6 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Simple spring-like animation effect
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
  if (score < 70) {
    color = 'text-amber-500';
    bgColor = 'text-amber-50';
  }
  if (score < 40) {
    color = 'text-gray-400';
    bgColor = 'text-gray-50';
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Circle */}
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
        {/* Animated Progress Circle */}
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
      {/* Score Text */}
      <span className={`absolute font-black text-xs ${color.replace('text-', 'text-').replace('-500', '-700')}`}>
        {animatedScore}%
      </span>
    </div>
  );
}
