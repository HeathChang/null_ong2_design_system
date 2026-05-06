import { useEffect } from 'react';

/**
 * ESC 키 입력 시 핸들러를 호출하는 훅.
 * 모달, 드롭다운, 토스트 등 닫기 동작에 사용한다.
 */
export function useEscapeKey(
  isActive: boolean,
  onEscape: () => void,
): void {
  useEffect(() => {
    if (!isActive) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onEscape();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape]);
}
