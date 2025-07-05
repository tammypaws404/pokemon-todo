'use client';

import { useState } from 'react';
import { Task } from '@/types';
import TaskList from '@/components/TaskList';
import TaskSidebar from '@/components/TaskSidebar';
import StatusBar from '@/components/StatusBar';

export default function StarredPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskSidebarWidth, setTaskSidebarWidth] = useState(320);

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

  const starredTasks = tasks.filter(task => task.starred);

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
              tasks={starredTasks}
              toggleTask={toggleTask}
              toggleStarred={toggleStarred}
              setSelectedTaskId={setSelectedTaskId}
              selectedTaskId={selectedTaskId}
              showCompleted={true}
              setShowCompleted={() => {}}
            />
          </div>
        </div>

        {selectedTaskId !== null && (
          <TaskSidebar
            task={starredTasks.find(t => t.id === selectedTaskId)!}
            onClose={() => setSelectedTaskId(null)}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            setSidebarWidth={setTaskSidebarWidth}
          />
        )}
      </div>
    </div>
  );
}