'use client';
import { useState, useCallback, useEffect } from 'react';
import { FiUser, FiPhone, FiMapPin, FiCheckCircle, FiX, FiChevronDown, FiUpload } from 'react-icons/fi';
import { IMaskInput } from 'react-imask';

interface YandexSuggestion {
    title?: {
        text: string;
    };
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const PriceForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [isSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');
    const [preferredContact, setPreferredContact] = useState('');

    const services = [
        'Консультация',
        'Бурение скважины',
        'Установка систем водоочистки', // <-- Изменено для ясности
        'Монтаж канализации',
        'Подбор оборудования',
        'Химический анализ воды', // <-- Изменено для ясности
    ];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.size > 5 * 1024 * 1024) {
            setFileError('Максимальный размер файла - 5MB');
            return;
        }

        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.includes(selectedFile.type)) {
            setFileError('Допустимые форматы: PDF, JPEG, PNG, DOCX');
            return;
        }

        setFile(selectedFile);
        setFileError('');
    };

    useEffect(() => {
        // Очищать файл только если выбранная услуга НЕ "Химический анализ воды"
        if (selectedService !== 'Химический анализ воды') {
            setFile(null);
            setFileError('');
        }
    }, [selectedService]);

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

    const validateForm = useCallback(() => {
        const errors = [];
        if (!name.trim()) errors.push('Имя');
        if (!phone.match(/^\+7 \(\d{3}\) \d{3}-\d{4}$/)) errors.push('Телефон');
        if (!address.trim()) errors.push('Адрес');
        if (!preferredContact.trim()) errors.push('Способ связи');
        return errors;
    }, [name, phone, address, preferredContact]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedService === 'Очистка воды') {
            if (!file) {
                setFileError('Необходимо прикрепить файл анализа');
                return;
            }
            if (fileError) return;
        }

        const errors = validateForm();
        if (errors.length > 0) {
            alert('Пожалуйста, проверьте следующие поля: ' + errors.join(', '));
            return;
        }

        let fileUrl = '';
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const uploadData = await uploadResponse.json();
                fileUrl = uploadData.url;
            } catch (error) {
                console.error('Ошибка загрузки файла:', error);
                alert('Ошибка при загрузке файла');
                return;
            }
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
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    service: selectedService,
                    file_url: fileUrl,
                    preferred_contact: preferredContact
                })
            });

            if (!response.ok) throw new Error(await response.text());

            await fetch('/api/telegramNotify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    service: selectedService,
                    file_url: fileUrl,
                    preferred_contact: preferredContact
                })
            });

            setSubmittedName(name);
            setIsModalOpen(true);
            resetForm();
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
        }
    }, [name, phone, address, validateForm, file, fileError, selectedService, preferredContact]);

    const resetForm = () => {
        setName('');
        setPhone('');
        setAddress('');
        setAddressSuggestions([]);
        setPreferredContact('');
    };

    const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);

        const controller = new AbortController();
        fetchAddressSuggestions(value, controller.signal);

        return () => controller.abort();
    }, [fetchAddressSuggestions]);

    return (
        <section id="price-form-section" className="container mx-auto px-4 py-8 relative">
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

            <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] mb-4 text-center">
                Оставьте заявку
            </h2>

            <div className="bg-[#F5F5F5] rounded-xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <div className="relative">
                        <label className="block text-sm font-medium text-[#666] mb-2 ml-4">
                            Выберите услугу
                        </label>
                        <div className="relative">
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#218CE9]/20 rounded-[62px]
                        bg-white text-gray-700 focus:ring-2 focus:ring-[#218CE9]
                        appearance-none focus:outline-none"
                                required
                            >
                                <option value="">-- Выберите услугу --</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service}>{service}</option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        </div>
                        {/* --- НАЧАЛО ДОБАВЛЕННОГО БЛОКА ПОДСКАЗКИ О ФАЙЛЕ --- */}
                        <p className="text-xs text-gray-500 mt-2 ml-4 flex items-center">
                            <FiUpload className="w-4 h-4 mr-1 text-[#218CE9] flex-shrink-0" />
                            Для услуги <span className="text-gray-700 ml-1 mr-1 font-semibold">{'Химический анализ воды'}</span> вы сможете прикрепить файл с результатами.
                        </p>
                        {/* --- КОНЕЦ ДОБАВЛЕННОГО БЛОКА --- */}
                    </div>

                    {/* Новое поле для выбора способа связи */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-[#666] mb-2 ml-4">
                            Выберите предпочитаемый способ связи
                        </label>
                        <div className="relative">
                            <select
                                value={preferredContact}
                                onChange={(e) => setPreferredContact(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#218CE9]/20 rounded-[62px] bg-white text-gray-700 focus:ring-2 focus:ring-[#218CE9] appearance-none focus:outline-none"
                                required
                            >
                                <option value="">-- Выберите способ связи --</option>
                                <option value="phone">Звонок по номеру телефона</option>
                                <option value="telegram">Telegram</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666]" />
                        </div>
                    </div>

                    {[
                        {
                            icon: FiUser,
                            placeholder: 'Ваше имя',
                            component: (
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                    required
                                />
                            )
                        },
                        {
                            icon: FiPhone,
                            placeholder: 'Телефон',
                            component: (
                                <IMaskInput
                                    mask={'+7 (000) 000-0000'}
                                    placeholder="Телефон"
                                    value={phone}
                                    onAccept={value => setPhone(value)}
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

                    {/* Блок для прикрепления файла (только для "Химический анализ воды") */}
                    <div className="relative">
                        {selectedService === 'Химический анализ воды' && (
                            <>
                                <label htmlFor="fileInput" className="text-sm font-medium text-[#218CE9] mb-2 ml-4 flex items-center gap-2 cursor-pointer">
                                    <FiUpload className="w-5 h-5 mr-1" />
                                    <span>Прикрепить файл с результатами анализа воды *</span>
                                </label>
                                <p className="text-xs text-gray-500 mb-2 ml-4">
                                    Это поможет подобрать систему водоочистки. Допустимые форматы: PDF, DOC, DOCX, JPG, PNG.
                                </p>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="w-full opacity-0 absolute z-20 cursor-pointer h-full"
                                        id="fileInput"
                                        accept=".pdf,.doc,.docx,image/*"
                                        required={selectedService === 'Химический анализ воды'}
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="block w-full pl-12 pr-4 py-4 border-2 border-[#218CE9]/20 rounded-[62px] bg-white text-gray-400 cursor-pointer group-hover:border-[#218CE9]/40 transition-all items-center gap-2 justify-center"
                                    >
                                        <FiUpload className="w-6 h-6 mr-2 text-[#218CE9]" />
                                        {file ? file.name : 'Выберите файл или перетащите сюда'}
                                    </label>
                                </div>
                            </>
                        )}

                        {fileError && (
                            <p className="text-red-500 text-sm mt-2 ml-4">{fileError}</p>
                        )}

                        {file && (
                            <p className="text-green-600 text-sm mt-2 ml-4">
                                ✓ Файл загружен: {file.name}
                            </p>
                        )}
                    </div>

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
