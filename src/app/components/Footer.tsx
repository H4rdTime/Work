// src/app/components/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { FiPhone, FiMapPin, FiMail, FiClock } from 'react-icons/fi'
import { FaVk, FaTelegram, FaInstagram } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12 ">
        {/* Основные разделы */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-8 mb-12">
          {/* Контакты */}
          <div className="">
            <h3 className="text-xl font-bold text-[#218CE9] mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-[#218CE9] mt-1" />
                <div>
                  <p className="text-gray-600">
                    г. Петрозаводск, <br /> ул. Коммунистов, 50/2
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-[#218CE9]" />
                <div className="flex gap-4">
                  <a href="tel:8142270545" className="text-gray-600 hover:text-[#218CE9]">27-05-45</a>
                  <a href="tel:8142330090" className="text-gray-600 hover:text-[#218CE9]">33-00-90</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-[#218CE9]" />
                <a href="mailto:info@aqua-ptz.ru" className="text-gray-600 hover:text-[#218CE9]">
                  info@aqua-ptz.ru
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-[#218CE9]" />
                <p className="text-gray-600">пн-пт: 09:00–18:00</p>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-xl font-bold text-[#218CE9] mb-4">Навигация</h3>
            <ul className="space-y-3">
              {[
                { href: '/', text: 'Главная' },
                { href: '/services', text: 'Услуги' },
                { href: '/equipment', text: 'Оборудование' },
                { href: '/blog', text: 'Блог' },
                { href: '/contacts', text: 'Контакты' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#218CE9] transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Документы */}
          {/* <div>
            <h3 className="text-xl font-bold text-[#218CE9] mb-4">Документы</h3>
            <ul className="space-y-3">
              {[
                { href: '/privacy', text: 'Политика конфиденциальности' },
                { href: '/terms', text: 'Пользовательское соглашение' },
                { href: '/guarantee', text: 'Гарантии и возврат' },
                { href: '/license', text: 'Лицензии' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#218CE9] transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Соцсети */}
          <div>
            <h3 className="text-xl font-bold text-[#218CE9] mb-4">Мы в соцсетях</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaVk  className="w-10 h-10" />, href: '/vk', label: 'ВКонтакте' },
                { icon: <FaTelegram className="w-10 h-10" />, href: '/telegram', label: 'Telegram' },
                { icon: <FaInstagram className="w-10 h-10" />, href: '/instagram', label: 'Instagram' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-2xl text-gray-600 hover:text-[#218CE9] transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


        {/* Копирайт */}
        <div className="border-t border-black border-opacity-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2000-{new Date().getFullYear()} ООО «АкваСервис». Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer