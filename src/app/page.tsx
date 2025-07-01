'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

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
    <div className="flex flex-col flex-1 h-full">
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4">
        {uncompleted.map(task => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
        ))}

        {completed.length > 0 && (
          <>
            <div className="text-sm text-gray-500 mb-2">Completed</div>
            {completed.map(task => (
              <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
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
    </div>
  );
}

function TaskItem({ task, toggleTask }: { task: Task; toggleTask: (id: number) => void }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded shadow-sm text-sm mb-2 transition-colors ${
        task.completed ? 'bg-gray-200 dark:bg-blue-950 text-gray-500 line-through' : 'bg-blue-950 text-white'
      }`}
    >
      <button
        onClick={() => toggleTask(task.id)}
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
