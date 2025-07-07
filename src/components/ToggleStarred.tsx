'use client';

import { Star } from 'lucide-react';

export default function ToggleStarred({
  starred,
  onToggle,
}: {
  starred: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="text-yellow-400 hover:text-yellow-300"
      title={starred ? 'Unstar task' : 'Star task'}
    >
      <Star fill={starred ? 'currentColor' : 'none'} />
    </button>
  );
}