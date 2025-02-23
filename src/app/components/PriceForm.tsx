// src/app/components/PriceForm.tsx
'use client';

import React, { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiCheckCircle, FiX } from 'react-icons/fi';
import { IMaskInput } from 'react-imask';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Используем ANON_KEY

const PriceForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    
    interface YandexSuggestion {
        title?: {
            text: string;
        };
    }

    const fetchAddressSuggestions = async (query: string) => {
        if (query.length < 3) return;
        try {
            const response = await fetch(`/api/yandexSuggest?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log("Ответ Yandex Suggest API:", data);
            if (data.results && Array.isArray(data.results)) {
                // Используем поле title.text для получения названия подсказки
                const suggestions = data.results.map((item: YandexSuggestion) => item.title?.text || '');
                setAddressSuggestions(suggestions.filter((s: string) => s));
            } else {
                console.warn("Структура ответа не соответствует ожиданиям:", data);
                setAddressSuggestions([]);
            }
        } catch (error) {
            console.error("Ошибка получения адресных подсказок:", error);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        fetchAddressSuggestions(newAddress);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            console.error("Supabase URL или API ключ не найдены.");
            return;
        }

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=representation"
                },
                body: JSON.stringify({ name, phone, email, address })
            });

            if (res.ok) {
                setSubmittedName(name);
                setIsModalOpen(true);
                setName('');
                setPhone('');
                setEmail('');
                setAddress('');
                setAddressSuggestions([]);
            } else {
                console.error("Ошибка отправки формы:", await res.text());
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    };

    return (
        <section className="container mx-auto px-4 py-8 relative">
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-[#666] hover:text-[#218CE9]">
                            <FiX size={24} />
                        </button>
                        <div className="text-center">
                            <FiCheckCircle className="text-[#218CE9] w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-[#218CE9] mb-2">Заявка принята!</h3>
                            <p className="text-[#666]">Спасибо, {submittedName}! Мы свяжемся с вами в ближайшее время.</p>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] mb-4 text-center">Оставьте заявку</h2>

            <div className="bg-[#F5F5F5] rounded-xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        <IMaskInput
                            mask="+7 (000) 000-0000"
                            placeholder="+7 (___) ___-____"
                            className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                            required
                            value={phone}
                            onAccept={(value) => setPhone(value.toString())}
                        />
                    </div>

                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input
                            type="email"
                            placeholder="Ваш email"
                            className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input
                            type="text"
                            placeholder="Ваш адрес"
                            className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                            value={address}
                            onChange={handleAddressChange}
                        />
                        {addressSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-[#ddd] rounded-lg mt-2 w-full shadow-md">
                                {addressSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-[#f0f0f0] cursor-pointer"
                                        onClick={() => {
                                            setAddress(suggestion);
                                            setAddressSuggestions([]);
                                        }}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#218CE9] text-white py-4 rounded-[62px] font-bold hover:bg-[#1a70c0] transition-colors"
                    >
                        Отправить заявку
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PriceForm;
