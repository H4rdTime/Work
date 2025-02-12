// src/app/components/Header.tsx
'use client'
import React, { useState } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi"; // Добавляем новые иконки

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md md:flex-nowrap">
      {/* Лого и бургер-меню */}
      <div className="flex items-center md:w-auto">
        <BurgerMenu />
        <h1 className="ml-2 font-bold text-xl md:text-2xl text-[#218CE9]"> 
          АкваСервис
        </h1>
      </div>
      <div className="flex items-center space-x-4 mt-2 md:mt-0 md:w-auto">

      {/* Поисковая строка (для десктопа) */}
      <form 
        onSubmit={handleSearch}
        className="hidden md:flex items-center bg-white/20 rounded-lg px-4 py-2 w-[400px]"
      >
        <FiSearch className="text-white mr-2" />
        <input
          type="text"
          placeholder="Поиск услуг..."
          className="bg-transparent w-full focus:outline-none text-[#218CE9] placeholder-[#218CE9]/70"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Иконки управления */}
        {/* Иконка поиска для мобильных */}
        <button 
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden text-[#218CE9]"
        >
          <FiSearch size={24} />
        </button>

        <Link href="/cart" className="text-[#218CE9] hover:text-[#218CE9]/80">
          <FiShoppingCart size={24} />
        </Link>
        <Link href="/profile" className="text-[#218CE9] hover:text-[#218CE9]/80">
          <FiUser size={24} />
        </Link>
      </div>

      {/* Мобильный поиск (раскрывающийся) */}
      {searchOpen && (
        <form 
          onSubmit={handleSearch}
          className="w-full mt-2 md:hidden"
        >
          <div className="flex items-center bg-[#218CE9]/20 rounded-lg px-4 py-2">
            <FiSearch className="text-white mr-2" />
            <input
              type="text"
              placeholder="Поиск услуг..."
              className="bg-transparent w-full focus:outline-none text-[#218CE9] placeholder-[#218CE9]/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      )}
    </header>
  );
};

export default Header;