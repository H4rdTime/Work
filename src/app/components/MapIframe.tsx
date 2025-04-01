'use client';

const MapIframe = () => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A935501884654b56b8adabbe548e6fbefbcb498b5067ecb1ba8aeb2bd6724ea4e&amp;source=constructor"
        className="absolute top-0 left-0 w-full h-full"
        title="Карта"
        loading="lazy"
      />
    </div>
  );
};

export default MapIframe;
