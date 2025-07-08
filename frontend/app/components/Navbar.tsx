'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() { // สร้างฟังก์ชัน Navbar
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => { // เรียกใช้ฟังก์ชัน useEffect สำหรับการตั้งค่า theme
    const theme = localStorage.getItem('theme') || 'light';
    setIsDark(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  useEffect(() => { // เรียกใช้ฟังก์ชัน useEffect สำหรับการอัปเดตเวลา
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('th-TH', { hour12: false, timeZone: 'Asia/Bangkok' });
      setCurrentTime(timeString);
    };

    updateClock(); // เรียกใช้ฟังก์ชัน updateClock
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => { // ฟังก์ชันสำหรับการสลับ theme
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'About', href: '/about', icon: '👤' },
    { label: 'Projects', href: '/Projects', icon: '🔲' },
    { label: 'Blog', href: '/blog', icon: '📄' },
    { label: 'Gallery', href: '/gallery', icon: '🖼️' },
  ];

  return (
    <header className="w-full flex items-center justify-between p-4 "> 
      {/* Left: Portfolio Title */}
      <div className="text-sm font-semibold hidden md:inline">My-Portfolio</div>

      {/* Center: Navbar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2
      md:static md:translate-x-0 md:bottom-auto
      flex items-center gap-2 px-4 py-2 
      bg-white dark:bg-black border border-gray-300 dark:border-gray-700 
      rounded-full shadow-lg">

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col md:flex-row items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span>{item.icon}</span>
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}

        <button
          onClick={toggleTheme}
          className="ml-1 p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Right: Clock */}
      <div className="text-sm font-mono hidden md:inline">{currentTime}</div>
    </header>
  );
}
