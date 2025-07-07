'use client';

import { useTasks } from '@/hooks/useTasks';
import TaskPageView from '@/components/TaskPageView';

export default function StarredPage() {
  const { tasks, setTasks } = useTasks();

  return (
    <TaskPageView
      title="Starred"
      tasks={tasks}
      setTasks={setTasks}
      filter={(task) => task.starred}
    />
  );
}