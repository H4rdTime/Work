// components/MapSection.tsx
import React from "react";

const MapSection = () => {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] mb-6 text-center">
          Карта глубин скважин в вашем регионе
        </h2>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9c2ce5f3f93b1220e44539e76f2fae4b500f45a0280f9c51d63abbfd1dfa625&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            title="Интерактивная карта глубин скважин"
            loading="lazy"
          />
        </div>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Используйте масштабирование для просмотра деталей
        </p>
      </div>
    </section>
  );
};

export default MapSection;