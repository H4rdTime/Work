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
    const [isSubmitting] = useState(false);

    // Запрос подсказок адреса
    const fetchAddressSuggestions = useCallback(async (query: string, signal?: AbortSignal) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`/api/yandexSuggest?query=${encodeURIComponent(query)}`, { signal });

            if (!response.ok) throw new Error(`HTTP error ${response.status}`);

            const data = await response.json();
            const suggestions = (data.results || [])
                .map((item: YandexSuggestion) => item.title?.text || '')
                .filter(Boolean);

            setAddressSuggestions(suggestions);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error("Ошибка подсказок:", error);
            }
        }
    }, []);

    // Валидация формы
    const validateForm = useCallback(() => {
        const errors = [];
        if (!name.trim()) errors.push('Имя');
        if (!phone.match(/^\+7 \(\d{3}\) \d{3}-\d{4}$/)) errors.push('Телефон');
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push('Email');
        if (!address.trim()) errors.push('Адрес');
        return errors;
    }, [name, phone, email, address]);

    // Отправка формы
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        // Валидация формы
        const errors = validateForm();
        if (errors.length > 0) {
            alert('Пожалуйста, проверьте следующие поля: ' + errors.join(', '));
            return;
        }

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            console.error("Не настроены параметры Supabase");
            return;
        }

        try {
            // Отправляем данные заявки в Supabase
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

            // После успешного сохранения в базе, отправляем уведомление в Telegram
            const telegramResponse = await fetch('/api/telegramNotify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, address })
            });

            const telegramResult = await telegramResponse.json();
            if (!telegramResult.success) {
                console.error("Ошибка уведомления в Telegram:", telegramResult.error);
            }

            // Обновляем UI: показываем модальное окно и очищаем поля формы
            setSubmittedName(name);
            setIsModalOpen(true);

            // Сброс формы
            resetForm();
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
        }
    }, [name, phone, email, address, validateForm]);

    // Сброс формы
    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setAddressSuggestions([]);
    };

    // Изменение адреса
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
                    onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] relative">
                        <button onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-[#666] hover:text-[#218CE9]">
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
                    {[
                        {
                            icon: FiUser,
                            placeholder: 'Ваше имя',
                            component: (
                                <IMaskInput
                                    mask={/^[A-Za-zА-Яа-яЁё\s-]*$/}
                                    placeholder="Ваше имя"
                                    value={name}
                                    onAccept={(value) => setName(value)}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            )
                        },
                        {
                            icon: FiPhone,
                            placeholder: '+7 (___) ___-____',
                            component: (
                                <IMaskInput
                                    mask="+7 (000) 000-0000"
                                    placeholder="+7 (___) ___-____"
                                    value={phone}
                                    onAccept={(value) => setPhone(value.toString())}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            )
                        },
                        {
                            icon: FiMail,
                            placeholder: 'Ваш email',
                            component: (
                                <IMaskInput
                                    mask={/^[\w-.@]*$/} // Маска для email
                                    placeholder="Ваш email"
                                    value={email}
                                    onAccept={(value) => {
                                        if (value.length <= 254) setEmail(value);
                                    }}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />

                            )
                        },
                        {
                            icon: FiMapPin,
                            placeholder: 'Адрес проведения работ',
                            component: (
                                <input
                                    type="text"
                                    placeholder="Адрес проведения работ"
                                    value={address}
                                    onChange={handleAddressChange}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            ),
                            suggestions: addressSuggestions
                        }
                    ].map((field, index) => (
                        <div key={index} className="relative">
                            <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                            {field.component}
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
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-[62px] font-bold transition-colors ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#218CE9] text-white hover:bg-[#1a70c0]'
                            }`}
                    >
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PriceForm;