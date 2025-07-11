'use client';

import TaskPageView from '@/components/TaskPageView';
import { useLists } from '@/contexts/ListsContext';

export default function StarredPage() {
  const { tasksByList, setTasksForList } = useLists();

  const starredTasks = Object.values(tasksByList).flat().filter(t => t.starred);

  const setTasks: React.Dispatch<React.SetStateAction<typeof starredTasks>> = (value) => {
    const updated = typeof value === 'function' ? value(starredTasks) : value;

    updated.forEach(updatedTask => {
      const listId = Object.entries(tasksByList).find(([_, tasks]) =>
        tasks.some(t => t.id === updatedTask.id)
      )?.[0];

      if (listId) {
        const id = Number(listId);
        const newTasks = tasksByList[id].map(t => t.id === updatedTask.id ? updatedTask : t);
        setTasksForList(id, newTasks);
      }
    });
  };

  return (
    <TaskPageView
      title="Starred"
      tasks={starredTasks}
      setTasks={setTasks}
    />
  );
}