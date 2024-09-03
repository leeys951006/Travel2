'use client';

import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import './globals.css';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en" className="font-sans">
      <body className="bg-white m-0 p-0">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex justify-center flex-grow">
            <Link href="/" className="flex-grow-0">
              <img src="/logo.png" alt="Site Logo" className="mx-auto max-w-[120px] md:max-w-[150px]" />
            </Link>
          </div>
          <div className="hidden md:flex text-right items-center justify-end space-x-4">
            <LoginButton />
          </div>
          <div className="md:hidden">
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-8 h-8 text-[#1B6AB3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* 모바일 버전 사이드바 */}
        <nav
          className={`fixed top-0 right-0 h-full bg-white text-[#1B6AB3] text-sm shadow-md transition-transform transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } w-[250px] md:hidden border-l border-[#CFCFCF] rounded-tl-lg rounded-bl-lg`}
        >
          {/* 로그인 버튼 */}
          <div className="p-4 border-b border-[#CFCFCF]">
            <LoginButton />
          </div>

          {/* 닫기 버튼 */}
          {menuOpen && (
            <button className="absolute bottom-4 left-4 p-2 text-[#1B6AB3]" onClick={() => setMenuOpen(false)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6l6 6-6 6"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l6 6-6 6"></path>
              </svg>
            </button>
          )}

          <ul className="list-none flex flex-col justify-center gap-4 p-4 m-0">
            <li className="nav-item">
              <Link href="/my-plans" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                나의 계획
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/transport-info" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                교통 정보
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/guidebook" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                가이드북
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/festival-info" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                축제 정보
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/travel-insurance" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                여행자 보험
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/essentials" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                필수 용품
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/community" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                커뮤니티
              </Link>
            </li>
          </ul>
        </nav>

        {/* PC 버전 네비게이션 */}
        <nav className="hidden md:flex bg-[#1B6AB3] p-2 shadow-md text-white text-sm md:text-base justify-start items-center">
          <ul className="list-none flex flex-row gap-8 p-0 m-0 mx-auto">
            <li className="nav-item">
              <Link href="/my-plans" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                나의 계획
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/transport-info" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                교통 정보
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/guidebook" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                가이드북
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/festival-info" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                축제 정보
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/travel-insurance" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                여행자 보험
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/essentials" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                필수 용품
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/community" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                커뮤니티
              </Link>
            </li>
          </ul>
        </nav>

        <main className="p-4 md:p-8">{children}</main>
        <footer className="text-center p-4 bg-gray-200">
          <p>© 2024 My Next.js Site</p>
        </footer>
      </body>
    </html>
  );
}
