'use client';

import { Task } from '@/types';
import ToggleCompleted from './ToggleCompleted';
import { Star } from 'lucide-react';

type Props = {
  task: Task;
  toggleTask: (id: number) => void;
  toggleStarred?: (id: number) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TaskItem({ task, toggleTask, toggleStarred, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded shadow-sm text-sm mb-2 transition-colors ${
        task.completed ? 'bg-gray-200 dark:bg-blue-950 text-gray-500 line-through' : 'bg-blue-950 text-white'
      }`}
    >
      {/* Complete toggle */}
      <div className="flex items-center gap-3">
        <ToggleCompleted completed={task.completed} onToggle={() => toggleTask(task.id)} />
        <span>{task.title}</span>
      </div>

      {/* Star toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleStarred?.(task.id);
        }}
        className="text-yellow-400 hover:text-yellow-300"
      >
        <Star fill={task.starred ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}