'use client';

import { useEffect } from 'react';
import { useResizableSidebar } from '@/hooks/useResizableSidebar';
import { Task } from '@/types';
import { Trash2 } from 'lucide-react';
import ToggleCompleted from './ToggleCompleted';

export default function TaskSidebar({
  task,
  onClose,
  toggleTask,
  setSidebarWidth,
}: {
  task: Task;
  onClose: () => void;
  toggleTask: (id: number) => void;
  setSidebarWidth: (w: number) => void;
}) {
  const { sidebarRef, onMouseDown, width } = useResizableSidebar('right');

  useEffect(() => {
    setSidebarWidth(width);
  }, [width, setSidebarWidth]);

  return (
    <aside
      ref={sidebarRef}
      className="bg-white dark:bg-gray-900 border-l p-4 shadow-lg flex flex-col justify-between transition-[width] duration-300 min-h-screen fixed top-0 right-0 z-20"
      style={{ width }}
    >
      <div>
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <ToggleCompleted
            completed={task.completed}
            onToggle={() => toggleTask(task.id)}
          />
          <h2 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : ''}`}>
            {task.title}
          </h2>
        </div>

        {/* Steps */}
      </div>

      {/* Footer with Close + Delete */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          &lt; Back
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 />
        </button>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize z-30"
        style={{ userSelect: 'none' }}
      />
    </aside>
  );
}
