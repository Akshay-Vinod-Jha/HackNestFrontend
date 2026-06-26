import { FiTarget } from 'react-icons/fi';

export default function SkillRadarCard({ skills = {} }) {
  // Take top 5 skills, or fill with placeholders if fewer
  const skillEntries = Object.entries(skills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  while (skillEntries.length < 5) {
    skillEntries.push([`Skill ${skillEntries.length + 1}`, 0]);
  }

  const size = 200;
  const center = size / 2;
  const maxRadius = size / 2 - 30; // Padding for text
  
  // Math for 5 points
  const getCoordinates = (value, index, total, maxVal = 5) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / maxVal) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const levels = [1, 2, 3, 4, 5];

  // Polygon points for the actual data
  const dataPoints = skillEntries.map(([, val], i) => getCoordinates(val, i, 5));
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center justify-between">
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
          <FiTarget className="w-5 h-5 text-purple-500" />
        </div>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Skill Radar</h2>
      </div>

      <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center mt-4">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Draw background concentric pentagons */}
          {levels.map(level => {
            const bgPoints = Array.from({ length: 5 }).map((_, i) => getCoordinates(level, i, 5)).map(p => `${p.x},${p.y}`).join(' ');
            return (
              <polygon
                key={level}
                points={bgPoints}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="1.5"
              />
            );
          })}
          
          {/* Draw axes */}
          {Array.from({ length: 5 }).map((_, i) => {
            const edge = getCoordinates(5, i, 5);
            return (
              <line key={i} x1={center} y1={center} x2={edge.x} y2={edge.y} stroke="#f3f4f6" strokeWidth="1.5" />
            );
          })}

          {/* Draw Data Polygon */}
          <polygon
            points={dataPolygon}
            fill="rgba(168, 85, 247, 0.2)"
            stroke="#a855f7"
            strokeWidth="2"
            className="transition-all duration-1000 ease-out"
          />

          {/* Draw Data Points */}
          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#a855f7" />
          ))}

          {/* Draw Labels */}
          {skillEntries.map(([name], i) => {
            // Slightly extended radius for text
            const labelPos = getCoordinates(6.2, i, 5); 
            // Adjust text anchor based on x position
            let anchor = 'middle';
            if (labelPos.x < center - 10) anchor = 'end';
            if (labelPos.x > center + 10) anchor = 'start';
            
            return (
              <text
                key={i}
                x={labelPos.x}
                y={labelPos.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="text-[10px] font-bold fill-gray-500 uppercase tracking-wider"
              >
                {name.substring(0, 10)}{name.length > 10 ? '...' : ''}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
