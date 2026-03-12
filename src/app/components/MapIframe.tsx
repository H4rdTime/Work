'use client';
import { useState } from 'react';
import { FiMap } from 'react-icons/fi';

const MapIframe = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
      onClick={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A95d2f0f3be09ca55c72c8e561b9e3b003bd8b74eb1b814f40a597f930c58ecb3&amp;source=constructor"
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}
        title="Карта скважин"
        loading="lazy"
      />
      
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 cursor-pointer group transition-all duration-300">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <FiMap className="w-8 h-8 text-[#218CE9]" />
          </div>
          <span className="mt-4 px-6 py-2 bg-[#218CE9] text-white rounded-full font-medium shadow-md">
            Нажмите, чтобы взаимодействовать
          </span>
        </div>
      )}
    </div>
  );
};

export default MapIframe;