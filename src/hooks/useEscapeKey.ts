import { useEffect, useRef } from 'react';

/**
 * 활성화된 오버레이 스택.
 * 마지막에 등록된(= 가장 위에 있는) 항목만 ESC에 반응한다.
 * 모달 위에 모달, 모달 안에 드롭다운처럼 겹친 상황에서
 * ESC 한 번에 전부 닫히는 것을 막는다.
 */
const escapeStack: Array<() => void> = [];
let isListening = false;

function handleDocumentKeyDown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') return;
  // 다른 레이어(예: floating-ui useDismiss)가 이미 처리했으면 중복 실행하지 않는다.
  if (event.defaultPrevented) return;

  const top = escapeStack[escapeStack.length - 1];
  if (top === undefined) return;
  top();
}

function startListening(): void {
  if (isListening) return;
  document.addEventListener('keydown', handleDocumentKeyDown);
  isListening = true;
}

function stopListening(): void {
  if (!isListening) return;
  document.removeEventListener('keydown', handleDocumentKeyDown);
  isListening = false;
}

/**
 * ESC 키 입력 시 핸들러를 호출하는 훅.
 * 모달, 드롭다운, 토스트 등 닫기 동작에 사용한다.
 *
 * 겹친 오버레이 중 **가장 마지막에 활성화된 것 하나만** 반응한다.
 */
export function useEscapeKey(isActive: boolean, onEscape: () => void): void {
  // 핸들러 identity가 매 렌더 바뀌어도 리스너를 재등록하지 않도록 ref로 고정한다.
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!isActive) return;
    if (typeof document === 'undefined') return;

    const entry = (): void => {
      onEscapeRef.current();
    };
    escapeStack.push(entry);
    startListening();

    return () => {
      const index = escapeStack.lastIndexOf(entry);
      if (index !== -1) escapeStack.splice(index, 1);
      if (escapeStack.length === 0) stopListening();
    };
  }, [isActive]);
}
