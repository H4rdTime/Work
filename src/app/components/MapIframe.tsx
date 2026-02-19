'use client';

const MapIframe = () => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
      <iframe
        // Вставили новую ссылку сюда:
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A95d2f0f3be09ca55c72c8e561b9e3b003bd8b74eb1b814f40a597f930c58ecb3&amp;source=constructor"
        className="absolute top-0 left-0 w-full h-full"
        title="Карта скважин"
        loading="lazy"
      />
    </div>
  );
};

export default MapIframe;