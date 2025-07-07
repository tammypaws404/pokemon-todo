'use client';

import { useTasks } from '@/hooks/useTasks';
import TaskPageView from '@/components/TaskPageView';

export default function HomePage() {
  const { tasks, setTasks } = useTasks();

  return (
    <TaskPageView
      title="Tasks"
      tasks={tasks}
      setTasks={setTasks}
    />
  );
}