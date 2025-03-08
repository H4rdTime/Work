// src/app/components/PriceForm.tsx
'use client';
import { useState, useCallback } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiCheckCircle, FiX } from 'react-icons/fi';
import { IMaskInput } from 'react-imask';

interface YandexSuggestion {
    title?: {
        text: string;
    };
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const PriceForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedName, setSubmittedName] = useState('');

    const fetchAddressSuggestions = useCallback(async (query: string, signal?: AbortSignal) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`/api/yandexSuggest?query=${encodeURIComponent(query)}`, {
                signal
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            const suggestions = (data.results || [])
                .map((item: YandexSuggestion) => item.title?.text || '')
                .filter(Boolean);

            setAddressSuggestions(suggestions);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error("Ошибка получения подсказок:", error);
            }
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            console.error("Не настроены параметры Supabase");
            return;
        }

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=representation"
                },
                body: JSON.stringify({ name, phone, email, address })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setSubmittedName(name);
            setIsModalOpen(true);
            setName('');
            setPhone('');
            setEmail('');
            setAddress('');
            setAddressSuggestions([]);
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
        }
    }, [name, phone, email, address]);

    const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);

        const controller = new AbortController();
        fetchAddressSuggestions(value, controller.signal);

        return () => controller.abort();
    }, [fetchAddressSuggestions]);

    return (
        <section id="price-form-section" className="container mx-auto px-4 py-8 relative">
            {/* Модальное окно */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-[#666] hover:text-[#218CE9]"
                        >
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

            {/* Форма */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] mb-4 text-center">
                Оставьте заявку
            </h2>

            <div className="bg-[#F5F5F5] rounded-xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    {/* Поля формы */}
                    {[
                        {
                            icon: FiUser,
                            placeholder: 'Ваше имя',
                            value: name,
                            component: (
                                <IMaskInput
                                    mask={/^[A-Za-zА-Яа-яЁё\s]*$/}
                                    placeholder= 'Ваше имя'
                                    onAccept={(value) => setName(value)}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            ),
                            required: true
                        },
                        {
                            icon: FiPhone,
                            placeholder: '+7 (___) ___-____',
                            value: phone,
                            component: (
                                <IMaskInput
                                    mask="+7 (000) 000-0000"
                                    placeholder="+7 (___) ___-____" // Исправлено здесь
                                    onAccept={(value) => setPhone(value.toString())}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            ),
                            required: true
                        },
                        {
                            icon: FiMail,
                            placeholder: 'Ваш email',
                            value: email,
                            component: (
                                <IMaskInput
                                    mask={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/}
                                    placeholder= 'Ваш email'
                                    onAccept={(value) => setEmail(value)}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            ),
                            required: true
                        },
                        {
                            icon: FiMapPin,
                            placeholder: 'Адрес проведения работ',
                            value: address,
                            onChange: handleAddressChange,
                            suggestions: addressSuggestions
                        }
                    ].map((field, index) => (
                        <div key={index} className="relative">
                            <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                            {field.component || (
                                <input
                                    type={field.value || 'text'}
                                    placeholder={field.placeholder}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required={field.required}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                            {field.suggestions && field.suggestions.length > 0 && (
                                <ul className="absolute bg-white border border-[#ddd] rounded-lg mt-2 w-full shadow-md z-10">
                                    {field.suggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
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
                    ))}

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