// src/app/components/PriceForm.tsx
'use client'
import React from 'react'
import { FiUser, FiPhone, FiCheckCircle, FiX } from 'react-icons/fi'
import { IMaskInput } from 'react-imask'

const PriceForm = () => {
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const formattedName = inputValue
            .toLowerCase()
            .replace(/^(.)/, (match) => match.toUpperCase())
            .replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')
        setName(formattedName)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsModalOpen(true)
        setName('')
        setPhone('')
    }

    return (
        <section className="container mx-auto px-4 py-8 relative">
            {/* Модальное окно */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-[90%] relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-[#666] hover:text-[#218CE9]"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="text-center">
                            <FiCheckCircle
                                className="text-[#218CE9] w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-2xl font-bold text-[#218CE9] mb-2">
                                Заявка принята!
                            </h3>
                            <p className="text-[#666]">
                                Спасибо, {name}! Мы свяжемся с вами<br />
                                по номеру {phone} в ближайшее время
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="border-b border-black border-opacity-10 mb-8"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] mb-4 text-center">
                УЗНАЙТЕ ТОЧНУЮ СТОИМОСТЬ<br />
                СКВАЖИНЫ ЗА 2 МИНУТЫ
            </h2>

            <div className="bg-[#F5F5F5] rounded-xl mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-[#666] mb-8">
                        Оставьте телефон — инженер перезвонит,<br />
                        уточнит детали и назовет цену!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className="w-full pl-12 pr-4 py-4 border border-[#ddd] rounded-[62px] focus:outline-none focus:border-[#218CE9]"
                                required
                                value={name}
                                onChange={handleNameChange}
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

                        <button
                            type="submit"
                            className="w-full bg-[#218CE9] text-white py-4 rounded-[62px] font-bold hover:bg-[#1a70c0] transition-colors"
                        >
                            Узнать стоимость
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default PriceForm