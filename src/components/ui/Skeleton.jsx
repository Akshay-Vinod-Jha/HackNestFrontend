export default function Skeleton({ className = '', variant = 'rectangular', width, height }) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  
  const variants = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded',
  };
  
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;
  
  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      style={style}
      aria-hidden="true"
    />
  );
}
