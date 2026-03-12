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
      className="w-full bg-gradient-to-b from-white to-[#F8FBFF] py-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Decorative background elements to make it "not dry" */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#218CE9]/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#218CE9]/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="container mx-auto mb-10 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] leading-tight">
          География наших <span className="text-[#218CE9]">скважин</span>
        </h2>
        <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto mt-4 rounded-full" />
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          Более <span className="font-bold text-[#218CE9]">1200</span> объектов по всей Карелии. 
          Найдите свою скважину на интерактивной карте.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#218CE9] to-[#1a6bb8] rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative shadow-2xl rounded-2xl overflow-hidden transition-all duration-700 ease-in-out">
          {inView && <MapIframe />}
        </div>
      </div>
    </section>
  );
};

export default MapSection;