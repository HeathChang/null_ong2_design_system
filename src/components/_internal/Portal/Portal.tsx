import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  /** 포탈 컨테이너 (기본값: document.body) */
  container?: HTMLElement;
}

/**
 * 자식 요소를 DOM 트리의 다른 위치(기본값: body)에 렌더링한다.
 * SSR 환경에서는 마운트 후에만 렌더한다.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = container ?? document.body;
  return createPortal(children, target);
}
