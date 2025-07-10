'use client';

import { useParams } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import TaskPageView from '@/components/TaskPageView';

export default function ListPage() {
  const { tasks, setTasks } = useTasks();
  const params = useParams();
  const listId = params.id as string;

  const title = listId === '1' ? 'Tasks' : `List ${listId}`;

  return (
    <TaskPageView
      title={title}
      tasks={tasks}
      setTasks={setTasks}
    />
  );
}