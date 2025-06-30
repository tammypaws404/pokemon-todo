'use client';

export default function StatusBar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      {/* Page title */}
      <h2 className="text-xl font-semibold">Tasks</h2>

      {/* Pokeball + Coin */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <img src="/images/pokeball.png" alt="Pokémon" className="w-6 h-6 filter invert brightness-0" />
          <span>10</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/images/coins.png" alt="Coins" className="w-6 h-6 filter invert brightness-0" />
          <span>25</span>
        </div>
      </div>
    </div>
  );
}