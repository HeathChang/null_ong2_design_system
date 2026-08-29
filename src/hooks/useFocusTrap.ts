import { useEffect } from 'react';
import type { RefObject } from 'react';

/** 포커스 가능한 요소 셀렉터 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * 컨테이너 내부로 포커스를 가두는 훅.
 * 모달, 다이얼로그 등 사용자가 컨테이너 밖으로 Tab을 통해 빠져나가면 안 되는 경우 사용한다.
 *
 * - 활성화 시: `initialFocus`가 있으면 그 요소로, 없으면 첫 포커스 가능 요소로 이동
 * - 비활성화 시: 이전 포커스 요소로 복원
 * - Tab / Shift+Tab으로 마지막/첫 요소에서 순환
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  options: { initialFocus?: RefObject<HTMLElement | null> } = {},
): void {
  const { initialFocus } = options;

  useEffect(() => {
    if (!isActive) return;
    const container = ref.current;
    if (!container) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    function getFocusableElements(): HTMLElement[] {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
    }

    // 첫 진입 시 포커스 이동.
    // 확인 다이얼로그처럼 특정 버튼에서 시작해야 하는 경우를 위해 지정할 수 있게 한다.
    const requested = initialFocus?.current ?? null;
    if (requested !== null && container.contains(requested)) {
      requested.focus();
    } else {
      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        focusables[0]?.focus();
      } else {
        container.focus();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      const elements = getFocusableElements();
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [ref, isActive, initialFocus]);
}
