export default function Logo({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke={color} 
      strokeLinejoin="round" 
      strokeLinecap="round" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HackNest Logo"
    >
      <polygon points="50,10 84.6,30 84.6,70 50,90 15.4,70 15.4,30" strokeWidth="8" />
      <polygon points="50,25 71.6,37.5 71.6,62.5 50,75 28.4,62.5 28.4,37.5" strokeWidth="6" />
      <circle cx="50" cy="50" r="8" fill={color} stroke="none" />
    </svg>
  );
}
