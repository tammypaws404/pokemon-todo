'use client';
import { IconPokeball, IconCoins } from '@tabler/icons-react';

export default function StatusBar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      {/* Page title */}
      <h2 className="text-xl font-semibold">Tasks</h2>

      {/* Pokeball + Coin */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <IconPokeball className="w-6 h-6 text-black dark:text-white" />
          <span>10</span>
        </div>
        <div className="flex items-center gap-1">
        <IconCoins className="w-6 h-6 text-black dark:text-white" />
          <span>25</span>
        </div>
      </div>
    </div>
  );
}