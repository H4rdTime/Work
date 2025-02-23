'use client'
import React, { useState, useEffect, useCallback } from "react"; // Добавлен useCallback
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { FiSearch, FiShoppingCart, FiUser, FiClock, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Image from "next/image";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Оберните функцию в useCallback
  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]); // Укажите зависимости

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]); // Добавьте зависимость

  const navLinks = [
    { href: "/", text: "Главная" },
    { href: "/services", text: "Услуги" },
    { href: "/equipment", text: "Оборудование" },
    { href: "/about", text: "О нас" },
    { href: "/projects", text: "Проекты" },
    { href: "/contacts", text: "Контакты" },
  ];

  return (
    <>
      {/* Верхняя контактная панель */}
      <div className={`sticky top-0 z-50 bg-white border-b transition-transform duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center text-sm text-gray-600 text-center md:justify-between">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <FiPhone className="mr-1" />
              <a href="tel:8142270545" className="hover:text-[#218CE9]">8 (8142) 27-05-45</a>
              <span className="hidden md:inline mx-2">|</span>
              <a href="tel:8142330090" className="hover:text-[#218CE9]">8 (8142) 33-00-90</a>
            </div>
            <div className="flex items-center">
              <FiMail className="mr-1" />
              <a href="mailto:info@aqua-ptz.ru" className="hover:text-[#218CE9]">info@aqua-ptz.ru</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>пн—пт: 09:00—18:00</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-1" />
              <span>Петрозаводск, ул. Коммунистов, д.50, стр.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Основной header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Левая часть */}
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <BurgerMenu />
              </div>
              <Link href="/" className="relative h-12 w-40">
                <Image
                  src="/images/logo-aqu-servise.png"
                  alt="АкваСервис"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Центральная навигация */}
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

            {/* Правая часть */}
            <div className="flex items-center gap-2 md:gap-4">
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

              <button className="md:hidden text-[#218CE9] p-1">
                <FiSearch size={24} />
              </button>

              <Link href="/cart" className="p-1 text-gray-700 hover:text-[#218CE9]">
                <FiShoppingCart size={24} />
              </Link>

              <Link href="/profile" className="p-1 text-gray-700 hover:text-[#218CE9]">
                <FiUser size={24} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
