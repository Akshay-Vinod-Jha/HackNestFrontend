export default function FullScreenLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: 'color-mix(in srgb, var(--clay-surface) 80%, transparent)' }}
    >
      <div
        className="flex flex-col items-center space-y-4 p-6 rounded-2xl"
        style={{
          background: 'var(--clay-surface)',
          boxShadow: 'var(--clay-shadow-md)',
          border: '1px solid var(--clay-border-light)',
        }}
      >
        <svg 
          className="animate-spin h-12 w-12"
          style={{ color: 'var(--clay-primary)' }}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="font-medium animate-pulse" style={{ color: 'var(--clay-text-secondary)' }}>Loading...</p>
      </div>
    </div>
  );
}
