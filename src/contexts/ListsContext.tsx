'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '@/types';

type List = { id: number; name: string };

type ListsContextType = {
  lists: List[];
  addList: (newList: { id: number; name: string }) => void;
  deleteList: (id: number) => void;
  renameList: (id: number, newName: string) => void;
  tasksByList: { [listId: number]: Task[] };
  setTasksForList: (listId: number, tasks: Task[]) => void;
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export function useLists() {
  const context = useContext(ListsContext);
  if (!context) throw new Error('useLists must be used within ListsProvider');
  return context;
}

export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<List[]>([
    { id: 1, name: 'Tasks' },
  ]);

  const [tasksByList, setTasksByList] = useState<{ [listId: number]: Task[] }>({
    1: [],
  });

  const [loading, setLoading] = useState(true);

  // On mount, load from localStorage
  useEffect(() => {
    const savedLists = localStorage.getItem('lists');
    const savedTasks = localStorage.getItem('tasksByList');
    if (savedLists) setLists(JSON.parse(savedLists));
    if (savedTasks) setTasksByList(JSON.parse(savedTasks));
    setLoading(false);
  }, []);

  // Save lists and tasks to localStorage upon change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('lists', JSON.stringify(lists));
      localStorage.setItem('tasksByList', JSON.stringify(tasksByList));
    }
  }, [lists, tasksByList, loading]);

  const addList = (newList: { id: number; name: string }) => {
    setLists(prev => [...prev, newList]);
    setTasksByList(prev => ({ ...prev, [newList.id]: [] }));
  };

  const deleteList = (id: number) => {
    if (id === 1) return; // Don't delete default Tasks list
    setLists(prev => prev.filter(list => list.id !== id));
    setTasksByList(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const renameList = (id: number, newName: string) => {
    setLists(prev => prev.map(list => list.id === id ? { ...list, name: newName } : list));
  };

  const setTasksForList = (listId: number, tasks: Task[]) => {
    setTasksByList(prev => ({ ...prev, [listId]: tasks }));
  };

  if (loading) { // Avoids flash upon reloading
    return null;
  }

  return (
    <ListsContext.Provider value={{
      lists,
      addList,
      deleteList,
      renameList,
      tasksByList,
      setTasksForList
    }}>
      {children}
    </ListsContext.Provider>
  );
}
