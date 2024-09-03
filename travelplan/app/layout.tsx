'use client';

import Link from 'next/link';
import './globals.css';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en" className="font-sans">
      <body className="bg-white m-0 p-0">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex-grow"></div>
          <Link href="/" className="flex-grow-0">
            <img src="/logo.png" alt="Site Logo" className="mx-auto max-w-[120px] md:max-w-[150px]" />
          </Link>
          <div className="flex-grow text-right">
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </header>

        <nav className={`${menuOpen ? 'block' : 'hidden'} md:flex bg-blue-700 p-2 shadow-md text-white text-sm md:text-base justify-center md:justify-between items-center`}>
          <ul className="list-none flex flex-col md:flex-row justify-center gap-4 md:gap-8 p-0 m-0 w-full md:w-auto">
            <li className="nav-item">
              <Link href="/shared-plans" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                공유계획
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/personal-plans" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                개인계획
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/transport-info" className="font-bold no-underline p-2 hover:text-blue-800 transition-colors">
                교통편 정보
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
