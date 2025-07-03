import { useRef, useCallback } from 'react';

export function useResizableSidebar(direction: 'left' | 'right' = 'left') {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = useCallback((e: MouseEvent | React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const startWidth = sidebar.offsetWidth;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const newWidth = direction === 'left' 
        ? startWidth + dx // Left sidebar: drag right to expand
        : startWidth - dx; // Right sidebar: drag left to expand

      sidebar.style.width = `${Math.max(200, Math.min(newWidth, 500))}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [direction]);

  return { sidebarRef, onMouseDown };
}
