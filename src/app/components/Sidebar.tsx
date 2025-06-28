'use client';

import { useState } from 'react';
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

    const toggle = () => setOpen(!open);

    return (
        <aside className={`bg-white dark:bg-gray-900 text-black dark:text-white p-3 border-r transition-all duration-300 ${open ? 'w-64' : 'w-16'} min-h-screen`}>
        {/* Collapse button */}
        <div className="flex justify-between items-center mb-4">
            <button onClick={toggle}>
            {open ? <ChevronLeft /> : <ChevronRight />}
            </button>
        </div>

        {/* Search Bar */}
        <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded mb-4 p-2 transition-all duration-300 ${open ? 'gap-2' : 'justify-center'}`}>
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
            <SidebarItem icon={<Home />} label="Home" open={open} />
            <SidebarItem icon={<Sun />} label="My Day" open={open} />
            <SidebarItem icon={<Star />} label="Starred" open={open} />
            <SidebarItem icon={<Calendar />} label="Calendar" open={open} />
        </nav>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Pokémon section */}
        <nav className="space-y-2 text-sm">
            <SidebarItem icon={<BookOpen />} label="Pokemon" open={open} />
            <SidebarItem icon={<Egg />} label="PokeEggs" open={open} />
            <SidebarItem icon={<ShoppingCart />} label="PokeMart" open={open} />
        </nav>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Lists section */}
        <nav className="space-y-2 text-sm">
            <SidebarItem icon={<ListChecks />} label="Tasks" open={open} />
            {/* Replace with dynamic list later */}
            <SidebarItem icon={<ListChecks />} label="List 1" open={open} />
            <SidebarItem icon={<ListChecks />} label="List 2" open={open} />
            <SidebarItem icon={<Plus />} label="Add List" open={open} />
        </nav>
        </aside>
    );
}

function SidebarItem({ icon, label, open }: { icon: React.ReactNode; label: string; open: boolean }) {
    return (
        <a href="#" className="flex items-center gap-2 px-2 py-1 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:no-underline transition">
        {icon}
        {open && <span>{label}</span>}
        </a>
    );
}
