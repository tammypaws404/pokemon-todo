'use client';

import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      setTasks(prev => [input.trim(), ...prev]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="p-3 bg-blue-950 text-white rounded shadow-sm text-sm mb-2"
          >
            {task}
          </div>
        ))}
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
