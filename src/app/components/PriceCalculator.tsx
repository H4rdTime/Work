// src/app/components/PriceCalculator.tsx
'use client'
import React, { useState } from 'react'

const PriceCalculator = () => {
    const [depth, setDepth] = useState(30)
    const [type, setType] = useState('sand')
    const [casingType, setCasingType] = useState('steel')
    const [equipment, setEquipment] = useState(false)
    const [waterCleaning, setWaterCleaning] = useState(false)

    // Цены за метр для разных типов труб (актуальные на 2024 год)
    const CASING_PRICES = {
        steel: 500,     // Стальная труба
        plastic: 300,   // Пластиковая труба
        asbestos: 200   // Асбоцементная труба
    }

    const calculatePrice = () => {
        const basePrice = type === 'sand' ? 2000 : 3500
        const depthPrice = depth * (type === 'sand' ? 1500 : 3000)
        const casingPrice = CASING_PRICES[casingType] * depth
        const equipmentPrice = equipment ? 25000 : 0
        const cleaningPrice = waterCleaning ? 30000 : 0
        
        return (basePrice + depthPrice + casingPrice + equipmentPrice + cleaningPrice).toLocaleString('ru-RU')
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="border-b border-black border-opacity-10 mb-6"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
                РАСЧЕТ СТОИМОСТИ
            </h2>

            <div className="max-w-md mx-auto bg-[#F5F5F5] rounded-xl p-6 shadow-lg">
                {/* Выбор типа скважины */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#218CE9] mb-3">Тип скважины</h3>
                    <div className="grid gap-3">
                        <button
                            onClick={() => setType('sand')}
                            className={`w-full p-3 text-left rounded-lg transition-all ${
                                type === 'sand' 
                                    ? 'bg-[#218CE9] text-white'
                                    : 'bg-white hover:bg-[#218CE9]/10'
                            }`}
                        >
                            Песчаная (до 30 метров)
                        </button>
                        <button
                            onClick={() => setType('artesian')}
                            className={`w-full p-3 text-left rounded-lg transition-all ${
                                type === 'artesian'
                                    ? 'bg-[#218CE9] text-white'
                                    : 'bg-white hover:bg-[#218CE9]/10'
                            }`}
                        >
                            Артезианская (до 150 метров)
                        </button>
                    </div>
                </div>

                {/* Выбор обсадной трубы */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#218CE9] mb-3">Тип обсадной трубы</h3>
                    <div className="grid gap-3">
                        {Object.entries(CASING_PRICES).map(([key, price]) => (
                            <button
                                key={key}
                                onClick={() => setCasingType(key)}
                                className={`w-full p-3 text-left rounded-lg transition-all ${
                                    casingType === key
                                        ? 'bg-[#218CE9] text-white'
                                        : 'bg-white hover:bg-[#218CE9]/10'
                                }`}
                            >
                                {{
                                    steel: 'Стальные (+500₽/м)',
                                    plastic: 'Пластиковые (+300₽/м)',
                                    asbestos: 'Асбоцементные (+200₽/м)'
                                }[key]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Слайдер глубины */}
                <div className="mb-6">
                    <div className="flex justify-between mb-3">
                        <h3 className="text-lg font-bold text-[#218CE9]">Глубина</h3>
                        <span className="text-[#666]">{depth} метров</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max={type === 'sand' ? 30 : 150}
                        value={depth}
                        onChange={(e) => setDepth(Number(e.target.value))}
                        className="w-full h-2 bg-[#218CE9]/20 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Дополнительное оборудование */}
                <div className="mb-8 space-y-4">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={equipment}
                            onChange={(e) => setEquipment(e.target.checked)}
                            className="w-5 h-5 text-[#218CE9] rounded focus:ring-[#218CE9]"
                        />
                        <span className="text-[#666]">Монтаж насосного оборудования (+25 000 ₽)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={waterCleaning}
                            onChange={(e) => setWaterCleaning(e.target.checked)}
                            className="w-5 h-5 text-[#218CE9] rounded focus:ring-[#218CE9]"
                        />
                        <span className="text-[#666]">Очистка воды (+30 000 ₽)</span>
                    </label>
                </div>

                {/* Итоговая цена */}
                <div className="border-t border-[#218CE9]/20 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-[#218CE9]">Итого:</span>
                        <span className="text-2xl font-bold text-[#218CE9]">{calculatePrice()} ₽</span>
                    </div>
                    <button className="w-full bg-[#218CE9] text-white font-bold text-lg rounded-[62px] py-3 hover:bg-[#1a70c0] transition-colors">
                        Оставить заявку
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PriceCalculator