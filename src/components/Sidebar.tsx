'use client';

import { useState, useEffect } from 'react';
import { useResizableSidebar } from '@/hooks/useResizableSidebar';
import SidebarListItem from './SidebarListItem';
import SidebarItem from './SidebarItem';
import { useLists } from '@/contexts/ListsContext';
import {
  Home, Calendar, Star, Sun, Search, ChevronLeft, ChevronRight,
  Plus, Egg, ShoppingCart, BookOpen, Moon
} from 'lucide-react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { sidebarRef, onMouseDown } = useResizableSidebar();
  const { lists, addList, deleteList, renameList } = useLists();  
  const toggleSidebar = () => setOpen(!open);

  useEffect(() => {
    // On mount, check saved theme in localStorage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
  
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDarkMode(isDark);
  };  

  return (
    <aside
      ref={sidebarRef}
      className={`bg-gray-50 dark:bg-gray-900 text-black dark:text-white p-3 border-r transition-all duration-300 min-h-screen relative`}
      style={{ width: open ? '256px' : '64px' }}
    >
      {/* Resize Handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 right-0 h-full w-1 cursor-ew-resize z-50"
      />

      {/* Collapse Button + Theme Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleSidebar}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {open && (
          <button
            onClick={toggleTheme}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div
        className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded mb-4 p-2 transition-all duration-300 ${
          open ? 'gap-2' : 'justify-center'
        }`}
      >
        <Search className="w-4 h-4 text-gray-500" />
        {open && (
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm flex-1 placeholder-gray-500 dark:placeholder-gray-400"
          />
        )}
      </div>

      {/* Nav section */}
      <nav className="space-y-2 text-sm">
        <SidebarItem icon={<Home />} label="Home" open={open} href="/" />
        <SidebarItem icon={<Sun />} label="My Day" open={open} href="/my-day" />
        <SidebarItem icon={<Star />} label="Starred" open={open} href="/starred" />
        <SidebarItem icon={<Calendar />} label="Calendar" open={open} href="/calendar" />
      </nav>

      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      {/* Pokémon section */}
      <nav className="space-y-2 text-sm">
        <SidebarItem icon={<BookOpen />} label="Pokédex" open={open} href="/pokedex" />
        <SidebarItem icon={<Egg />} label="PokéEggs" open={open} href="/eggs" />
        <SidebarItem icon={<ShoppingCart />} label="PokéMart" open={open} href="/pokemart" />
      </nav>

      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      {/* Lists section */}
      <nav className="space-y-2 text-sm">
        {lists.map(list => (
          <SidebarListItem
            key={list.id}
            list={list}
            open={open}
            onDelete={() => deleteList(list.id)}
            onRename={(newName) => renameList(list.id, newName)}
            canDelete={list.id !== 1}
          />
        ))}

        <button
          onClick={addList}
          className="flex items-center w-full gap-2 px-2 py-2 rounded text-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Plus />
          {open && <span>Add List</span>}
        </button>
      </nav>
    </aside>
  );
}