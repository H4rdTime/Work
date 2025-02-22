// src/app/components/Header.tsx
'use client'
import React, { useState } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Ссылки для навигации
  const navLinks = [
    { href: "/services", text: "Услуги" },
    { href: "/about", text: "О нас" },
    { href: "/projects", text: "Проекты" },
    { href: "/contacts", text: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="  px-4">
        <div className="flex items-center justify-between h-16">
          {/* Левая часть: лого и мобильное меню */}
          <div className="flex items-center gap-4">
            {/* Оборачиваем бургер-меню в блок, который скрыт на md и выше */}
            <div className="md:hidden">
              <BurgerMenu />
            </div>
            <Link href="/" className="text-2xl font-bold text-[#218CE9]">
              АкваСервис
            </Link>
          </div>

          {/* Центральная часть: навигация (только для десктопа) */}
          <nav className="hidden md:flex items-center gap-6 mx-6 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-gray-700 hover:text-[#218CE9] transition-colors font-medium"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Правая часть: иконки и поиск */}
          <div className="flex items-center gap-2 md:gap-4"> {/* Добавляем адаптивные отступы */}
            {/* Поиск для десктопа */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full transition-all focus-within:bg-white focus-within:ring-2 ring-[#218CE9]"
            >
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Поиск услуг..."
                className="bg-transparent w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Кнопка поиска для мобильной версии */}
            <button className="md:hidden text-[#218CE9] p-1"> {/* Добавляем padding */}
              <FiSearch size={24} />
            </button>

            <Link href="/cart" className="p-1 text-gray-700 hover:text-[#218CE9]"> {/* Добавляем padding */}
              <FiShoppingCart size={24} />
            </Link>

            <Link href="/profile" className="p-1 text-gray-700 hover:text-[#218CE9]"> {/* Добавляем padding */}
              <FiUser size={24} />
            </Link>
          </div>
        </div>

        {/* Мобильный поиск */}
        <form onSubmit={handleSearch} className="md:hidden my-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Поиск услуг..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

      </div>
    </header>
  );
};

export default Header;
