'use client'
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { FiSearch, FiShoppingCart, FiUser, FiClock, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Image from "next/image";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  const navLinks = [
    { href: "/", text: "Главная" },
    { href: "/services", text: "Услуги" },
    { href: "/equipment", text: "Оборудование" },
    { href: "/about", text: "О нас" },
    { href: "/contacts", text: "Контакты" },
  ];

  return (
    <>
      {/* Верхняя контактная панель */}
      <div className={`sticky top-0 z-50 bg-white border-b transition-transform duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center text-[11px] sm:text-sm text-gray-600 text-center gap-x-3 gap-y-1 md:justify-between">
          {/* <Link href="/" className="relative h-10 w-28 md:h-12 md:w-40">
            <Image
              src="/images/logo.png" // Путь к вашему логотипу
              alt="АкваСервис"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100px, 150px" // Адаптивные размеры
            />
          </Link> */}
          {/* Левый блок - Телефоны */}
          <div className="flex items-center space-x-1.5">
            <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
            <div className="flex divide-x divide-gray-400">
              <a href="tel:8142270545" className="hover:text-[#218CE9] px-1.5">27-05-45</a>
              <a href="tel:8142330090" className="hover:text-[#218CE9] px-1.5">33-00-90</a>
            </div>
          </div>

          {/* Центр - Время работы */}
          <div className="flex items-center space-x-1.5">
            <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>пн-пт: 09:00–18:00</span>
          </div>

          {/* Правый блок - Адрес и почта */}
          <div className="flex items-center space-x-1.5">
            <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate  sm:max-w-none">ул. Коммунистов, 50/2</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
            <a href="mailto:info@aqua-ptz.ru" className="hover:text-[#218CE9] truncate max-w-[120px]">info@aqua-ptz.ru</a>
          </div>

        </div>
      </div>

      {/* Основной header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Левая часть */}
            <div className="flex items-center gap-2 md:gap-4">
              <BurgerMenu />
              <Link href="/" className="relative h-10 w-28 md:h-12 md:w-40">
                <Image
                  src="/images/logo-aqu-servise.png"
                  alt="АкваСервис"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Центральная навигация (только для десктопа) */}
            <nav className="hidden md:flex items-center gap-4 mx-6 flex-1 justify-end">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg xs:text-base sm:text-sm font-medium text-gray-700 hover:text-[#218CE9] transition-colors whitespace-nowrap"
                >
                  {link.text}
                </Link>
              ))}
            </nav>


            {/* Мобильный поиск */}
            {showMobileSearch && (
              <form
                onSubmit={handleSearch}
                className="absolute top-full left-0 right-0 bg-white p-2 shadow-md md:hidden"
              >
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <FiSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Поиск..."
                    className="bg-transparent w-full focus:outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            )}

            {/* Правая часть */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="md:hidden text-[#218CE9] p-1"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <FiSearch size={20} />
              </button>

              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-[240px]">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Поиск услуг..."
                  className="bg-transparent w-full focus:outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Link href="/cart" className="p-1 text-gray-700 hover:text-[#218CE9]">
                  <FiShoppingCart size={20} className="md:w-6 md:h-6" />
                </Link>

                <Link href="/profile" className="p-1 text-gray-700 hover:text-[#218CE9]">
                  <FiUser size={20} className="md:w-6 md:h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;