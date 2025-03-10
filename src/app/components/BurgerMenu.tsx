// BurgerMenu.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaVk } from "react-icons/fa";

interface NavLink {
  href: string;
  text: string;
}

interface BurgerMenuProps {
  navLinks: NavLink[];
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none text-[#218CE9] hover:text-[#1a6fb9] transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeMenu}>
          <div
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-[#218CE9] transition-colors"
              >
                ✕
              </button>
            </div>

            <ul className="py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-6 py-3 text-gray-700 hover:bg-[#218CE9]/10 hover:text-[#218CE9] transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacts"
                  onClick={closeMenu}
                  className="block px-6 py-3 mt-2 bg-[#218CE9] text-white hover:bg-[#1a6fb9]"
                >
                  Оставить заявку
                </Link>
              </li>
            </ul>

            <div className="flex justify-between gap-4 mt-4 px-6">
              <a href="https://vk.com/aquaservice_ptz" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaVk className="w-10 h-10" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaTelegram className="w-10 h-10" />
              </a>
              <a href="https://www.instagram.com/aquaservice.ptz/" target="_blank" rel="noopener" className="text-[#218CE9] hover:text-[#1a6fb9]">
                <FaInstagram className="w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;