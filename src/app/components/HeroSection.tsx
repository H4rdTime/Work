// src/app/components/HeroSection.tsx
// ⚡ Серверный компонент — framer-motion заменён на CSS-анимации (экономия ~32KB)
import Image from 'next/image'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const HeroSection = () => {
    return (
        <section
            className="relative h-auto pt-12 pb-12 lg:h-screen lg:pt-0 lg:pb-0 lg:min-h-[600px] lg:max-h-[900px] flex items-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 40%, #0A2A55 0%, #020F24 100%)',
            }}
        >
            {/* Fractal noise texture overlay — subtle engineering feel */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' opacity='0.05' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle light glow accent */}
            <div
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
                style={{
                    background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
                    {/* Left — Text & CTA */}
                    <div className="hero-animate space-y-5 md:space-y-6 order-1">

                        {/* Heading */}
                        <h1
                            className="hero-animate hero-animate-d1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase text-white leading-none tracking-tight"
                        >
                            Бурение скважин{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#218CE9] to-cyan-400">
                                в Карелии
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="hero-animate hero-animate-d2 text-xl sm:text-2xl text-blue-200/90 font-light max-w-lg"
                        >
                            Вода на участке за <span className="font-semibold text-white">48 часов</span>
                        </p>

                        {/* Benefits list + CTA as a tight block */}
                        <div className="space-y-8">
                            <ul className="space-y-2.5">
                                {[
                                    'Опыт более 10 лет',
                                    'Гарантия на все работы',
                                    'Оборудование Премиум-класса',
                                ].map((item, index) => (
                                    <li
                                        key={item}
                                        className={`hero-animate-left flex items-center gap-3`}
                                        style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#218CE9]/20 ring-1 ring-[#218CE9]/40 flex-shrink-0">
                                            <FiCheckCircle className="text-[#218CE9] text-sm" />
                                        </span>
                                        <span className="text-white/90 text-base sm:text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA button — якорная ссылка, не нужен JS */}
                            <div className="hero-animate hero-animate-d6">
                                <a
                                    href="#price-form-section"
                                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600
                                    hover:from-orange-600 hover:to-orange-700
                                    text-white text-lg font-bold
                                    px-8 py-4 sm:px-10 sm:py-5
                                    rounded-xl sm:rounded-2xl
                                    shadow-lg shadow-orange-500/30
                                    hover:shadow-xl hover:shadow-orange-500/40
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    w-full sm:w-auto justify-center sm:justify-start"
                                >
                                    Рассчитать стоимость
                                    <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — GIANT image */}
                    <div
                        className="hero-animate-right hidden lg:flex order-2 justify-center items-center relative z-10"
                    >
                        <div className="relative w-[120%] xl:w-[130%] aspect-[4/3] -ml-24 xl:-ml-40">
                            <Image
                                src="/images/herosectionbackground.svg"
                                alt="Буровая установка — бурение скважин в Карелии"
                                fill
                                priority
                                className="object-contain object-center scale-120 drop-shadow-2xl"
                                style={{
                                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020F24] to-transparent pointer-events-none z-20" />
        </section>
    )
}

export default HeroSection
