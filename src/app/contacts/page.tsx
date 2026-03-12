'use client';

import React from 'react';
import Script from 'next/script';
import { FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PriceForm from '../components/PriceForm';

const Contacts = () => {
    return (
        <main>
            <Script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'ContactPage',
                  name: 'Контакты АкваСервис',
                  description: 'Контактная информация и форма обратной связи',
                  url: 'https://aqua-service-karelia.ru/contacts',
                  mainEntity: {
                    '@type': 'LocalBusiness',
                    name: 'АкваСервис Карелия',
                    telephone: '+7-921-',
                    address: {
                      '@type': 'PostalAddress',
                      addressCountry: 'RU',
                      addressRegion: 'Карелия',
                    },
                  },
                }),
              }}
            />
            <Header />
            <section className="container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
                    Контакты
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Карта */}
                    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa5d1ac1797b0f6495261d3999174b7537d534d7820055f091a55f92f5dbc663e&amp;source=constructor"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            title="Расположение офиса"
                        />
                    </div>

                    {/* Контактная информация */}
                    <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-[#218CE9] mb-4">Наш офис</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-center gap-2">
                                <FiMapPin className="text-[#218CE9]" />
                                <span>Петрозаводск, ул. Коммунистов, д.50, стр.15</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone className="text-[#218CE9]" />
                                <a href="tel:+78142270545" className="hover:text-[#218CE9]">8 (8142) 27-05-45</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone className="text-[#218CE9]" />
                                <a href="tel:+78142330090" className="hover:text-[#218CE9]">8 (8142) 33-00-90</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiMail className="text-[#218CE9]" />
                                <a href="mailto:aquaptz@mail.ru" className="hover:text-[#218CE9]">aquaptz@mail.ru</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#218CE9]" />
                                <span>пн—пт: 09:00 – 17:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PriceForm />
            <Footer />
        </main>

    );
};

export default Contacts;
