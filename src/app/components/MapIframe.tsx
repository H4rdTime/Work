'use client';

const MapIframe = () => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9c2ce5f3f93b1220e44539e76f2fae4b500f45a0280f9c51d63abbfd1dfa625&amp;source=constructor"
        className="absolute top-0 left-0 w-full h-full"
        title="Карта"
        loading="lazy"
      />
    </div>
  );
};

export default MapIframe;
