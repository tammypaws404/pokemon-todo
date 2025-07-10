'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  href: string;
};

export default function SidebarItem({ icon, label, open, href }: Props) {
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
      {open && <span className="flex-1 truncate">{label}</span>}
    </Link>
  );
}