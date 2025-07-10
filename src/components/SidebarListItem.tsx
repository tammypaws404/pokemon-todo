'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ListChecks } from 'lucide-react';
import SidebarItem from './SidebarItem';

type Props = {
  list: { id: number; name: string };
  open: boolean;
  onDelete: () => void;
  onRename: (newName: string) => void;
  canDelete: boolean;
};

export default function SidebarListItem({ list, open, onDelete, onRename, canDelete }: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(list.name);
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === `/lists/${list.id}`;

  const handleDoubleClick = () => {
    setIsRenaming(true);
  };

  const handleRename = () => {
    setIsRenaming(false);
    if (name.trim() !== '' && name !== list.name) {
      onRename(name.trim());
    } else {
      setName(list.name);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

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
                  setIsRenaming(false);
                  setName(list.name);
                }
              }}
              autoFocus
              className="bg-transparent outline-none text-sm flex-1"
            />
          )}
        </div>
      ) : (
        <div onDoubleClick={handleDoubleClick}>
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
          className="absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md text-sm right-2 mt-1"
          onMouseLeave={() => setShowMenu(false)}
        >
          <button
            onClick={() => { setShowMenu(false); setIsRenaming(true); }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
          >
            Rename
          </button>

          {list.id !== 1 && ( // prevent deleting the default Tasks list
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