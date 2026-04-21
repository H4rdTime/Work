'use client';

import { FiSend } from 'react-icons/fi';

interface ScrollToPriceButtonProps {
    variant?: 'default' | 'white';
    label?: string;
}

const ScrollToPriceButton = ({ variant = 'default', label }: ScrollToPriceButtonProps) => {
    const handleClick = () => {
        const el = document.getElementById('price-form-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const buttonText = label || (variant === 'default' ? 'Рассчитать стоимость' : 'Оставить заявку');

    if (variant === 'white') {
        return (
            <button
                onClick={handleClick}
                className="inline-flex items-center gap-2 bg-white text-[#218CE9] font-bold px-8 py-4 rounded-full
                           hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105
                           text-lg shadow-md"
            >
                <FiSend className="text-lg" />
                {buttonText}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#218CE9] text-white font-bold
                       px-8 py-4 rounded-full hover:bg-[#1a70c0] hover:shadow-lg transition-all duration-300
                       transform hover:scale-[1.02] text-lg"
        >
            <FiSend className="text-lg" />
            {buttonText}
        </button>
    );
};

export default ScrollToPriceButton;
