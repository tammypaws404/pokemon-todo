'use client';

import { useState } from 'react';
import { Task } from '@/types';
import TaskSidebar from '@/components/TaskSidebar';
import StatusBar from '@/components/StatusBar';
import TaskList from '@/components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: input.trim(),
        completed: false,
      };
      setTasks(prev => [newTask, ...prev]);
      setInput('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const uncompleted = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <div className={`flex-1 flex flex-col h-full transition-all duration-300 ${selectedTaskId !== null ? 'mr-80' : ''}`}>
      <StatusBar />
      <div className="flex-1 flex flex-col">
        {/* Task List */}
        <div
          className="flex-1 overflow-y-auto p-4"
          onClick={() => setSelectedTaskId(null)}
        >
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            setSelectedTaskId={setSelectedTaskId}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            selectedTaskId={selectedTaskId}
          />
        </div>

        {/* Input Bar */}
        <div className="border-t p-4 bg-white dark:bg-gray-900">
          <input
            type="text"
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Right Sidebar */}
        {selectedTaskId !== null && (
          <TaskSidebar
            task={tasks.find(t => t.id === selectedTaskId)!}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </div>
  );
}