import { useEffect } from 'react';
import type { RefObject } from 'react';

/** 디자인 시스템이 body 최상위에 띄우는 레이어 표식. 배경 처리에서 제외한다. */
const LAYER_SELECTOR = '[data-ds-layer]';

/**
 * 모달이 열려 있는 동안 배경 콘텐츠를 보조기술로부터 감춘다.
 *
 * 포커스 트랩은 Tab 이동만 막는다. 스크린리더 사용자는 로터/스와이프로
 * 배경을 그대로 읽을 수 있으므로 `aria-hidden` + `inert`를 함께 건다.
 *
 * 토스트 컨테이너처럼 `data-ds-layer`가 붙은 오버레이 레이어는 건드리지 않는다.
 */
export function useInertBackground(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
): void {
  useEffect(() => {
    if (!isActive) return;
    if (typeof document === 'undefined') return;

    const active = ref.current;
    if (active === null) return;

    const restore: Array<() => void> = [];

    for (const child of Array.from(document.body.children)) {
      if (child.contains(active)) continue;
      if (child.matches(LAYER_SELECTOR) || child.querySelector(LAYER_SELECTOR) !== null) {
        continue;
      }
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') continue;

      const previousAriaHidden = child.getAttribute('aria-hidden');
      const previousInert = child.getAttribute('inert');
      child.setAttribute('aria-hidden', 'true');
      child.setAttribute('inert', '');

      restore.push(() => {
        if (previousAriaHidden === null) child.removeAttribute('aria-hidden');
        else child.setAttribute('aria-hidden', previousAriaHidden);
        if (previousInert === null) child.removeAttribute('inert');
        else child.setAttribute('inert', previousInert);
      });
    }

    return () => {
      for (const undo of restore) undo();
    };
  }, [ref, isActive]);
}
