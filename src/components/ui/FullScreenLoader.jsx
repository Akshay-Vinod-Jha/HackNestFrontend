export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Minimal pulsing text instead of giant spinner */}
        <div className="text-xl font-extrabold text-gray-900 tracking-tight animate-pulse duration-1000">
          HackNest
        </div>
      </div>
    </div>
  );
}
