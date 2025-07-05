'use client';

import TaskItem from './TaskItem';
import { Task } from '@/types';

type TaskListProps = {
  tasks: Task[];
  toggleTask: (id: number) => void;
  toggleStarred?: (id: number) => void;
  selectedTaskId: number | null;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>;
  showCompleted: boolean;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskList({
  tasks,
  toggleTask,
  toggleStarred,
  selectedTaskId,
  setSelectedTaskId,
  showCompleted,
  setShowCompleted,
}: TaskListProps) {
  const uncompleted = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <div
      className="flex-1 overflow-y-auto"
      onClick={() => setSelectedTaskId(null)}
    >
      {uncompleted.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          toggleStarred={toggleStarred}
          onClick={(e) => {
            e.stopPropagation(); // prevent parent click
            setSelectedTaskId(prev => (prev === task.id ? null : task.id));
          }}
        />
      ))}

      {completed.length > 0 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent closing sidebar when clicking button
              setShowCompleted(prev => !prev);
            }}
            className="flex items-center gap-1 text-sm text-gray-400 mb-2 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <span className="text-xs">{showCompleted ? '▼' : '▲'}</span>
            <span>Completed ({completed.length})</span>
          </button>

          {showCompleted &&
            completed.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                toggleStarred={toggleStarred}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTaskId(prev => (prev === task.id ? null : task.id));
                }}
              />
            ))}
        </>
      )}
    </div>
  );
}