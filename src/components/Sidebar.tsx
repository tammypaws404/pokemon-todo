'use client';

import { useState } from 'react';
import { useResizableSidebar } from '@/hooks/useResizableSidebar';
import Link from 'next/link';
import {
  Home,
  Calendar,
  Star,
  Sun,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  ListChecks,
  Egg,
  ShoppingCart,
  BookOpen,
} from 'lucide-react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const { sidebarRef, onMouseDown } = useResizableSidebar();

  const toggle = () => setOpen(!open);

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

      {/* Collapse Button */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>
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
            className="bg-transparent outline-none text-sm flex-1"
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
        <SidebarItem icon={<ListChecks />} label="Tasks" open={open} href="/tasks" />
        <SidebarItem icon={<ListChecks />} label="List 1" open={open} href="/lists/list-1" />
        <SidebarItem icon={<ListChecks />} label="List 2" open={open} href="/lists/list-2" />
        <SidebarItem icon={<Plus />} label="Add List" open={open} href="/lists/new" />
      </nav>
    </aside>
  );
}

import { usePathname } from 'next/navigation';

function SidebarItem({
  icon,
  label,
  open,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center w-full gap-2 px-2 py-2 rounded transition-colors hover:no-underline
        ${isActive ? 'bg-green-300 dark:bg-gray-700 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-700'}
      `}
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );
}