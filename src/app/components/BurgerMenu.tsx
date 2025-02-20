"use client";

import { useState } from "react";
import Link from "next/link";

interface BurgerMenuProps {
    className?: string; // Добавляем принятие className
  }

const BurgerMenu: React.FC<BurgerMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Кнопка-бургер */}
      <button onClick={toggleMenu} className="p-2 focus:outline-none">
        <svg
          className="w-6 h-6 text-[#218CE9]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <ul className="py-1">
            <li>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
                Главная
              </Link>
            </li>
            <li>
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-200">
                О нас
              </Link>
            </li>
            <li>
              <Link href="/services" className="block px-4 py-2 hover:bg-gray-200">
                Услуги
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block px-4 py-2 hover:bg-gray-200">
                Контакты
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
