'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setIsDark(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'About', href: '/about', icon: '👤' },
    { label: 'Work', href: '/work', icon: '🔲' },
    { label: 'Blog', href: '/blog', icon: '📄' },
    { label: 'Gallery', href: '/gallery', icon: '🖼️' },
    { label: 'Language', href: '/language', icon: '🌐' },
  ];

  return (
    <nav
      className="
        fixed 
        bottom-4 left-1/2 -translate-x-1/2
        md:top-4 md:bottom-auto
        bg-white dark:bg-black border border-gray-300 dark:border-gray-700 
        rounded-full shadow-lg px-4 py-2 
        flex items-center justify-center gap-2 
        text-sm text-gray-700 dark:text-gray-200
      "
    >
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
  );
}
