'use client'

import { useParams } from 'next/navigation';
import TaskPageView from '@/components/TaskPageView';
import { useLists } from '@/contexts/ListsContext';
import { Task } from '@/types';

export default function ListPage() {
  const { id } = useParams();
  const listId = Number(id);

  const { lists, tasksByList, setTasksForList } = useLists();
  const list = lists.find(l => l.id === listId);
  const tasks = tasksByList[listId] ?? [];

  const setTasks: React.Dispatch<React.SetStateAction<Task[]>> = (value) => {
    const updated = typeof value === 'function' ? value(tasks) : value;
    setTasksForList(listId, updated);
  };

  return (
    <TaskPageView
      title={list?.name || 'List'}
      tasks={tasks}
      setTasks={setTasks}
    />
  );
}