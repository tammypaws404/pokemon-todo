'use client';

import { Task } from '@/types';
import ToggleCompleted from './ToggleCompleted';
import { Star } from 'lucide-react';
import ToggleStarred from './ToggleStarred';

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
      className={`flex justify-between items-center p-3 rounded shadow-sm text-sm mb-2 transition-colors ${
        task.completed
          ? 'bg-gray-200 dark:bg-blue-950 text-gray-500 line-through'
          : 'bg-blue-950 text-white'
      }`}
    >
      {/* Checkbox + title */}
      <div className="flex items-center gap-3">
        <ToggleCompleted completed={task.completed} onToggle={() => toggleTask(task.id)} />
        <span>{task.title}</span>
      </div>

      {/* Star button */}
      <ToggleStarred
        starred={task.starred ?? false}
        onToggle={() => toggleStarred?.(task.id)}
      />
    </div>
  );
}
