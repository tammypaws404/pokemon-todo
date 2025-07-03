'use client';

import { Task } from '@/types';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import ToggleCompleted from './ToggleCompleted';
import { useResizableSidebar } from '@/hooks/useResizableSidebar';

export default function TaskSidebar({
  task,
  onClose,
  toggleTask,
  setSidebarWidth
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
    <div
      ref={sidebarRef}
      className="fixed right-0 top-0 h-full bg-white dark:bg-gray-900 border-l p-4 shadow-lg flex flex-col justify-between"
      style={{ width }}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize z-50"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <ToggleCompleted completed={task.completed} onToggle={() => toggleTask(task.id)} />
          <h2 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : ''}`}>{task.title}</h2>
        </div>

        {/* Steps */}
      </div>

      <div className="flex justify-between pt-4">
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
    </div>
  );
}
