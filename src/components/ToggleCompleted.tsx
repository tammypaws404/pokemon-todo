'use client';

import { Check } from 'lucide-react';

export default function ToggleCompleted ({
  completed,
  onToggle,
}: {
  completed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`w-5 h-5 flex items-center justify-center border rounded-full transition-colors ${
        completed
          ? 'bg-blue-800 border-blue-800 text-white'
          : 'border-white dark:border-gray-400'
      }`}
    >
      {completed && <Check size={14} />}
    </button>
  );
}
