'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Task } from '@/types';
import TaskSidebar from '@/components/TaskSidebar';
import StatusBar from '@/components/StatusBar';

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
        <div className="flex-1 overflow-y-auto p-4">
          {uncompleted.map(task => (
            <TaskItem key={task.id} task={task} toggleTask={toggleTask} onClick={() => setSelectedTaskId(task.id)} />
          ))}

          {completed.length > 0 && (
            <>
              <button
                onClick={() => setShowCompleted(prev => !prev)}
                className="flex items-center gap-1 text-sm text-gray-400 mb-2 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <span className="text-xs">
                  {showCompleted ? '▼' : '▲'}
                </span>
                <span>Completed ({completed.length})</span>
              </button>

              {showCompleted &&
                completed.map(task => (
                  <TaskItem key={task.id} task={task} toggleTask={toggleTask} onClick={() => setSelectedTaskId(task.id)} />
                ))}
            </>
          )}

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

function TaskItem({ task, toggleTask, onClick }: { task: Task; toggleTask: (id: number) => void; onClick?: () => void }) {
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
