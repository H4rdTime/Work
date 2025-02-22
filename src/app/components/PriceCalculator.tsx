'use client'
import React, { useState } from 'react';

const PriceCalculator = () => {
    const [equipment] = useState(false)
    const [waterCleaning] = useState(false)
    const [depth] = useState(30)
    const [type] = useState<'sand' | 'artesian'>('sand')

    const CASING_PRICES = {
        steel: 500,
        plastic: 300,
        asbestos: 200
    };

    const calculatePrice = () => {
        const basePrice = type === 'sand' ? 2000 : 3500
        const depthPrice = depth * (type === 'sand' ? 1500 : 3000)
        const casingPrice = CASING_PRICES.steel * depth
        const equipmentPrice = equipment ? 25000 : 0
        const cleaningPrice = waterCleaning ? 30000 : 0

        return (basePrice + depthPrice + casingPrice + equipmentPrice + cleaningPrice).toLocaleString('ru-RU')
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="border-t border-[#218CE9]/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-[#218CE9]">Итого:</span>
                    <span className="text-2xl font-bold text-[#218CE9]">{calculatePrice()} ₽</span>
                </div>
            </div>
        </section>
    )
}

export default PriceCalculator;