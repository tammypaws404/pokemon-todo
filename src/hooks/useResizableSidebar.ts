import { useRef, useCallback, useState } from 'react';

export function useResizableSidebar(direction: 'left' | 'right' = 'left') {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(320); // initial width

  const onMouseDown = useCallback((e: MouseEvent | React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const startWidth = sidebar.offsetWidth;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const newWidth = direction === 'left' ? startWidth + dx : startWidth - dx;
      const clamped = Math.max(200, Math.min(newWidth, 500));

      sidebar.style.width = `${clamped}px`;
      setWidth(clamped);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [direction]);

  return { sidebarRef, onMouseDown, width };
}