// Header.tsx
'use client'
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { FiPhone, FiClock, FiMapPin, FiMail } from "react-icons/fi";
import Image from "next/image";
import { FaInstagram, FaTelegram, FaVk } from "react-icons/fa";

const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    { href: "/projects", text: "Проекты" },
    { href: "/about", text: "О нас" },
    { href: "/blog", text: "Блог" },
    { href: "/contacts", text: "Контакты" },
  ];

  return (
    <>
      {/* Верхняя контактная панель */}
      <div className={`sticky top-0 z-50 bg-white border-b transition-transform duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center text-[11px] sm:text-sm text-gray-600 text-center gap-x-3 gap-y-1 md:justify-between">
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
              <div className="lg:hidden">
                <BurgerMenu navLinks={navLinks} />
              </div>

              <Link href="/" className="relative h-10 w-28 md:h-12 md:w-40">
                <Image
                  src="/images/logo-aqu-servise.png"
                  alt="АкваСервис бурение скважин Петрозаводск"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 160px) 100vw, 50vw"
                />
              </Link>
            </div>

            {/* Центральная навигация */}
            <nav
              aria-label="Основное меню"
              className="hidden lg:flex items-center gap-3 mx-3 flex-1 justify-end">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-clamp font-medium text-gray-700 hover:text-[#218CE9] transition-colors whitespace-nowrap"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 px-4">
              <a href="https://vk.com/aquaservice_ptz" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaVk className="w-7 h-7" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaTelegram className="w-7 h-7" />
              </a>
              <a href="https://www.instagram.com/aquaservice.ptz/" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaInstagram className="w-7 h-7" />
              </a>
            </div>
            {/* Кнопка заявки */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/contacts"
                className="bg-[#218CE9] text-white px-6 py-2 rounded-lg hover:bg-[#1a6fb9] transition-colors whitespace-nowrap "
              >
                Оставить заявку
              </Link>
            </div>


          </div>
        </div>
      </header>
    </>
  );
};

export default Header;