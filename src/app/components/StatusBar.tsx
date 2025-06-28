'use client';

export default function StatusBar() {
  return (
    <div className="flex justify-end items-center gap-4 p-4 border-b">
      <div className="flex items-center gap-1">
        <img src="/pokeball.png" alt="Pokémon" className="w-5 h-5" />
        <span>10</span>
      </div>
      <div className="flex items-center gap-1">
        <img src="/coin.png" alt="Coins" className="w-5 h-5" />
        <span>25</span>
      </div>
    </div>
  );
}
