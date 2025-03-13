'use client';
import dynamic from 'next/dynamic';
import { MapPlaceholder } from './MapPlaceholder';
import { useInView } from 'react-intersection-observer';

// Динамически импортируем MapIframe, который теперь экспортируется по умолчанию
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
    <section ref={ref} className="w-full bg-white py-12 px-4 md:px-8">
      {inView && <MapIframe />}
    </section>
  );
};

export default MapSection;
