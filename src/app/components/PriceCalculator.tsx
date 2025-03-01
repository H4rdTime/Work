'use client'
import React, { useState } from 'react';

const PriceCalculator = () => {
    const [equipment, setEquipment] = useState(false);
    const [waterCleaning, setWaterCleaning] = useState(false);
    const [depth, setDepth] = useState(30);
    const [type, setType] = useState<'sand' | 'artesian'>('sand');
    const [casingMaterial, setCasingMaterial] = useState<'steel' | 'plastic' | 'asbestos'>('steel');

    const CASING_PRICES = {
        steel: 500,
        plastic: 300,
        asbestos: 200
    };

    const calculatePrice = () => {
        const basePrice = type === 'sand' ? 2000 : 3500;
        const depthPrice = depth * (type === 'sand' ? 1500 : 3000);
        const casingPrice = CASING_PRICES[casingMaterial] * depth;
        const equipmentPrice = equipment ? 25000 : 0;
        const cleaningPrice = waterCleaning ? 30000 : 0;

        return (basePrice + depthPrice + casingPrice + equipmentPrice + cleaningPrice).toLocaleString('ru-RU');
    };

    return (
        <section className="container mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-8 text-center">
                Калькулятор стоимости скважины
            </h2>
            
            <div className="space-y-8 max-w-md mx-auto">
                {/* Тип скважины */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">Тип скважины:</label>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value as 'sand' | 'artesian')}
                        className="w-full p-3 border-2 border-[#218CE9]/20 rounded-lg text-lg focus:ring-2 focus:ring-[#218CE9]"
                    >
                        <option value="sand">Песчаная</option>
                        <option value="artesian">Артезианская</option>
                    </select>
                </div>

                <div className="border-t border-[#218CE9]/20"></div>

                {/* Материал трубы */}
                <div className="space-y-4 pt-4">
                    <label className="block text-lg font-medium text-gray-700">Материал обсадной трубы:</label>
                    <select 
                        value={casingMaterial}
                        onChange={(e) => setCasingMaterial(e.target.value as any)}
                        className="w-full p-3 border-2 border-[#218CE9]/20 rounded-lg text-lg focus:ring-2 focus:ring-[#218CE9]"
                    >
                        <option value="steel">Сталь</option>
                        <option value="plastic">Пластик</option>
                        <option value="asbestos">Асбест</option>
                    </select>
                </div>

                <div className="border-t border-[#218CE9]/20"></div>

                {/* Глубина скважины */}
                <div className="space-y-4 pt-4">
                    <label className="block text-lg font-medium text-gray-700">
                        Глубина скважины: <span className="text-[#218CE9] font-bold">{depth} м</span>
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="200"
                        value={depth}
                        onChange={(e) => setDepth(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>10 м</span>
                        <span>200 м</span>
                    </div>
                </div>

                <div className="border-t border-[#218CE9]/20"></div>

                {/* Дополнительные опции */}
                <div className="space-y-4 pt-4">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={equipment}
                            onChange={(e) => setEquipment(e.target.checked)}
                            className="form-checkbox h-6 w-6 text-[#218CE9] rounded focus:ring-[#218CE9]"
                        />
                        <span className="text-lg text-gray-700">Насосное оборудование (+25 000 ₽)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={waterCleaning}
                            onChange={(e) => setWaterCleaning(e.target.checked)}
                            className="form-checkbox h-6 w-6 text-[#218CE9] rounded focus:ring-[#218CE9]"
                        />
                        <span className="text-lg text-gray-700">Система очистки воды (+30 000 ₽)</span>
                    </label>
                </div>

                {/* Итоговая цена */}
                <div className="border-t border-[#218CE9]/20 pt-6 mt-6">
                    <div className="flex justify-between items-center">
                        <span className="text-xl md:text-2xl font-bold text-[#218CE9]">Итого:</span>
                        <span className="text-2xl md:text-3xl font-bold text-[#218CE9]">
                            {calculatePrice()} ₽
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceCalculator;