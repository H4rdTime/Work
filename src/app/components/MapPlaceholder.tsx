'use client';

export const MapPlaceholder = () => {
  return (
    <div className="w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[3/2] bg-gray-100/50 rounded-2xl animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-gray-400">
        <svg className="w-12 h-12 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
        <span className="text-sm font-medium">Загрузка карты...</span>
      </div>
    </div>
  );
};
