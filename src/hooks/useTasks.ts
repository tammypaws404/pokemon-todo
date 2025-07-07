import { useState } from 'react';
import { Task } from '@/types';

const globalTasks: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>> | null;
} = {
  tasks: [],
  setTasks: null,
};

export function useTasks() {
  const [tasks, _setTasks] = useState<Task[]>(globalTasks.tasks);
  globalTasks.setTasks = _setTasks;

  const setTasks = (newTasks: Task[] | ((prev: Task[]) => Task[])) => {
    if (typeof newTasks === 'function') {
      globalTasks.tasks = (newTasks as any)(globalTasks.tasks);
    } else {
      globalTasks.tasks = newTasks;
    }
    if (globalTasks.setTasks) {
      globalTasks.setTasks(globalTasks.tasks);
    }
  };

  return { tasks: globalTasks.tasks, setTasks };
}