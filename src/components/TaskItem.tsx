'use client';

import { Check } from 'lucide-react';
import { Task } from '@/types';

type Props = {
  task: Task;
  toggleTask: (id: number) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TaskItem({ task, toggleTask, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded shadow-sm text-sm mb-2 transition-colors ${
        task.completed ? 'bg-gray-200 dark:bg-blue-950 text-gray-500 line-through' : 'bg-blue-950 text-white'
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevents sidebar from opening when checkbox clicked
          toggleTask(task.id);
        }}
        className={`w-5 h-5 flex items-center justify-center border rounded-full transition-colors ${
          task.completed
            ? 'bg-blue-800 border-blue-800 text-white'
            : 'border-white'
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>
      <span>{task.title}</span>
    </div>
  );
}