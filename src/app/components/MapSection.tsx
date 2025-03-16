'use client';
import dynamic from 'next/dynamic';
import { MapPlaceholder } from './MapPlaceholder';
import { useInView } from 'react-intersection-observer';

const MapIframe = dynamic(() => import('./MapIframe'), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

const MapSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      id="map-section"
      className="w-full bg-white py-12 px-4 md:px-8"
    >
      <div className="container mx-auto mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#218CE9]">
          Карта наших скважин по Республике Карелия
        </h2>
        <p className="mt-2 text-gray-600">
          Более 1200 реализованных проектов в разных районах республики
        </p>
      </div>
      {inView && <MapIframe />}
    </section>
  );
};

export default MapSection;