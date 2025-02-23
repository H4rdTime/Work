'use client';

import React from 'react';
import { FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacts = () => {
    return (
        <main>
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
                                <span>Петрозаводск, ул. Коммунистов, д.50, стр.2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone className="text-[#218CE9]" />
                                <a href="tel:8142270545" className="hover:text-[#218CE9]">8 (8142) 27-05-45</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone className="text-[#218CE9]" />
                                <a href="tel:8142330090" className="hover:text-[#218CE9]">8 (8142) 33-00-90</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiMail className="text-[#218CE9]" />
                                <a href="mailto:info@aqua-ptz.ru" className="hover:text-[#218CE9]">info@aqua-ptz.ru</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#218CE9]" />
                                <span>пн—пт: 09:00—18:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>

    );
};

export default Contacts;
