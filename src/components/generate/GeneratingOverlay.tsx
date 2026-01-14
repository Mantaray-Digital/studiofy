'use client';

export function GeneratingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600">
      {/* Spinner */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <svg
            className="w-full h-full animate-spin"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M25 5C36.0457 5 45 13.9543 45 25"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <p className="text-white text-lg font-medium">Generating..</p>
      </div>
    </div>
  );
}
