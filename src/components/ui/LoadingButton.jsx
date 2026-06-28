export default function LoadingButton({ 
  children, 
  isLoading, 
  disabled, 
  className = "", 
  ...props 
}) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative inline-flex items-center justify-center transition-all duration-150 ease-out ${className} ${(isLoading || disabled) ? 'opacity-70 cursor-wait' : 'active:scale-[0.98]'}`}
      {...props}
    >
      <span className={`inline-flex items-center justify-center gap-2 transition-opacity duration-200 ${isLoading ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
}
