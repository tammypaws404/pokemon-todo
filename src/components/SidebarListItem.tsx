'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ListChecks } from 'lucide-react';
import SidebarItem from './SidebarItem';

type Props = {
  list: { id: number; name: string };
  open: boolean;
  onDelete: () => void;
  onRename: (newName: string) => void;
  renamingListId: number | null;
  setRenamingListId: (id: number | null) => void;
  canDelete: boolean;
};

export default function SidebarListItem({ list, open, onDelete, onRename, renamingListId, setRenamingListId, canDelete }: Props) {
  const [name, setName] = useState(list.name);
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === `/lists/${list.id}`;
  const isRenaming = renamingListId === list.id;

  const handleRename = () => {
    if (name.trim() !== '' && name !== list.name) {
      onRename(name.trim());
    } else {
      setName(list.name);
    }
    setRenamingListId(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  // Clear context menu by clicking elsewhere
  useEffect(() => {
    if (!showMenu) return;
  
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div onContextMenu={handleContextMenu} className="relative group">
      {isRenaming ? (
        <div className={`flex items-center w-full gap-2 px-2 py-2 rounded transition-colors hover:no-underline
          ${isActive ? 'bg-green-300 dark:bg-gray-700 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-700'}
        `}>
          <ListChecks />
          {open && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                else if (e.key === 'Escape') {
                  setRenamingListId(null);
                  setName(list.name);
                }
              }}
              autoFocus
              className="bg-transparent outline-none text-sm flex-1"
            />
          )}
        </div>
      ) : (
        <div onDoubleClick={() => setRenamingListId(list.id)}>
          <SidebarItem
            icon={<ListChecks />}
            label={list.name}
            open={open}
            href={`/lists/${list.id}`}
          />
        </div>
      )}

      {/* Context Menu */}
      {showMenu && open && (
        <div
          ref={menuRef}
          className="absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md text-sm right-2 mt-1"
        >
          <button
            onClick={() => { setShowMenu(false); setRenamingListId(list.id); }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            Rename
          </button>

          {canDelete && ( // prevent deleting the default Tasks list
            <button
              onClick={() => { setShowMenu(false); onDelete(); }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}