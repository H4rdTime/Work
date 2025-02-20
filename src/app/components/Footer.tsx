// src/app/components/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full px-4 py-8">
      <div className="border-b border-black border-opacity-10 mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 bg-[#F5F5F5] rounded-xl p-6 shadow-lg">
        {/* Колонка "Компания" */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#218CE9] mb-3">КОМПАНИЯ</h3>
          <ul className="space-y-2">
            {['О нас', 'Услуги', 'Наши работы', 'Вакансии'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[#666] hover:text-[#218CE9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка "Помощь" */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#218CE9] mb-3">ПОМОЩЬ</h3>
          <ul className="space-y-2">
            {['Поддержка клиентов', 'Условия сотрудничества', 'Политика конфиденциальности', 'Частые вопросы'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[#666] hover:text-[#218CE9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка "Ресурсы" */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#218CE9] mb-3">РЕСУРСЫ</h3>
          <ul className="space-y-2">
            {['Free eBook', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[#666] hover:text-[#218CE9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка "FAQ" */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#218CE9] mb-3">FAQ</h3>
          <ul className="space-y-2">
            {['Account', 'Manage Deliveries', 'Orders', 'Payment'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[#666] hover:text-[#218CE9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-black border-opacity-10 pt-6">
        <p className="text-center text-[#666] text-sm">
          АкваСервис © 2000-2025, All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
