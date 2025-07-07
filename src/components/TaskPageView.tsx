'use client';

import { useState } from 'react';
import { Task } from '@/types';
import TaskList from '@/components/TaskList';
import TaskSidebar from '@/components/TaskSidebar';
import StatusBar from '@/components/StatusBar';

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  title: string;
  filter?: (task: Task) => boolean;
};

export default function TaskPageView({ tasks, setTasks, title, filter }: Props) {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [taskSidebarWidth, setTaskSidebarWidth] = useState(320);
  const [input, setInput] = useState('');

  const filteredTasks = filter ? tasks.filter(filter) : tasks;

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleStarred = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, starred: !task.starred } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <div
          className="flex-1 flex flex-col transition-all duration-300"
          style={{
            marginRight: selectedTaskId !== null ? `${taskSidebarWidth}px` : 0,
          }}
          onClick={() => setSelectedTaskId(null)}
        >
          <StatusBar />

          <div className="flex-1 overflow-y-auto p-4">
            <TaskList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              toggleStarred={toggleStarred}
              setSelectedTaskId={setSelectedTaskId}
              selectedTaskId={selectedTaskId}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
            />
          </div>

          <div className="border-t p-4 bg-white dark:bg-gray-900">
            <input
              type="text"
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim() !== '') {
                  const newTask: Task = {
                    id: Date.now(),
                    title: input.trim(),
                    completed: false,
                    starred: title === 'Starred', // Default to true if on Starred page
                  };
                  setTasks((prev) => [newTask, ...prev]);
                  setInput('');
                }
              }}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

        </div>

        {selectedTaskId !== null && (
          <TaskSidebar
            task={filteredTasks.find(t => t.id === selectedTaskId)!}
            onClose={() => setSelectedTaskId(null)}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            setSidebarWidth={setTaskSidebarWidth}
            toggleStarred={toggleStarred}
          />
        )}
      </div>
    </div>
  );
}