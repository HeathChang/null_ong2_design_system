import { useCallback, useId, useMemo, useRef, useState } from 'react';
import type { MouseEvent, ReactNode, RefObject } from 'react';
import { Portal } from '../../_internal/Portal';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useInertBackground } from '../../../hooks/useInertBackground';
import { useDsStrings } from '../../../i18n';

export const MODAL_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
type ModalSize = (typeof MODAL_SIZES)[number];

export interface ModalProps {
  /** 열림 상태 */
  isOpen: boolean;
  /** 닫기 핸들러 (ESC, 오버레이 클릭, 닫기 버튼) */
  onClose: () => void;
  /** 모달 제목 */
  title?: string;
  /** 모달 본문 */
  children: ReactNode;
  /** 푸터 (버튼 그룹 등) */
  footer?: ReactNode;
  /** 크기 */
  size?: ModalSize;
  /** 오버레이 클릭으로 닫기 (기본: true) */
  closeOnOverlayClick?: boolean;
  /** ESC 키로 닫기 (기본: true) */
  closeOnEscape?: boolean;
  /** 닫기 버튼 표시 여부 (기본: true) */
  showCloseButton?: boolean;
  /**
   * 열릴 때 포커스를 받을 요소.
   * 지정하지 않으면 다이얼로그 안 첫 포커스 가능 요소(보통 닫기 버튼)로 간다.
   * 확인 다이얼로그에서 "취소"에 먼저 포커스를 두는 등에 쓴다.
   */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * 모달 다이얼로그 컴포넌트.
 *
 * 기본으로 포커스 트랩 + ESC 닫기 + 오버레이 클릭 닫기 + 배경 스크롤 잠금 +
 * 배경 보조기술 차단을 제공한다.
 *
 * @example
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="확인">
 *   정말 삭제하시겠습니까?
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  initialFocusRef,
}: ModalProps) {
  /*
   * Portal은 SSR 안전을 위해 마운트 후에야 자식을 렌더한다.
   * 그래서 평범한 useRef를 쓰면 Modal의 effect가 도는 시점에 ref.current가 아직 null이고,
   * 포커스 트랩·배경 차단이 조용히 건너뛰어진다.
   * 노드를 state로 잡아 ref 객체 identity를 바꿔 effect가 다시 돌게 한다.
   */
  const [dialogNode, setDialogNode] = useState<HTMLDivElement | null>(null);
  const dialogRef = useMemo(() => ({ current: dialogNode }), [dialogNode]);
  const strings = useDsStrings();
  const titleId = useId();
  const bodyId = useId();
  // 오버레이 클릭 판정은 "누른 지점"부터 봐야 한다.
  // 본문에서 텍스트를 드래그하다 오버레이에서 손을 떼면 click이 오버레이에서 발생해
  // 의도치 않게 닫히고 입력 내용이 사라진다.
  const isPointerDownOnOverlay = useRef(false);

  // 겹친 오버레이 중 가장 위에 있는 것만 ESC에 반응한다 (useEscapeKey 내부 스택).
  useEscapeKey(isOpen && closeOnEscape, onClose);
  useFocusTrap(dialogRef, isOpen, { ...(initialFocusRef !== undefined && { initialFocus: initialFocusRef }) });
  useBodyScrollLock(isOpen);
  useInertBackground(dialogRef, isOpen);

  const handleOverlayPointerDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    isPointerDownOnOverlay.current = event.target === event.currentTarget;
  }, []);

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const startedOnOverlay = isPointerDownOnOverlay.current;
      isPointerDownOnOverlay.current = false;
      if (!closeOnOverlayClick) return;
      if (!startedOnOverlay) return;
      if (event.target !== event.currentTarget) return;
      onClose();
    },
    [closeOnOverlayClick, onClose],
  );

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="ds-modal-overlay"
        data-ds-layer="modal"
        onMouseDown={handleOverlayPointerDown}
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          ref={setDialogNode}
          className={`ds-modal ds-modal--${size}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title !== undefined ? titleId : undefined}
          aria-describedby={bodyId}
          tabIndex={-1}
        >
          {(title !== undefined || showCloseButton) && (
            <div className="ds-modal__header">
              {title !== undefined && (
                <h2 id={titleId} className="ds-modal__title">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="ds-modal__close"
                  aria-label={strings.close}
                  onClick={onClose}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div id={bodyId} className="ds-modal__body">
            {children}
          </div>
          {footer !== undefined && (
            <div className="ds-modal__footer">{footer}</div>
          )}
        </div>
      </div>
    </Portal>
  );
}
