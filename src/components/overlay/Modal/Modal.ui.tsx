import { useId, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Portal } from '../../_internal/Portal';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useFocusTrap } from '../../../hooks/useFocusTrap';

const MODAL_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
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
}

/**
 * 모달 다이얼로그 컴포넌트.
 * 포커스 트랩 + ESC 닫기 + 오버레이 클릭 닫기를 기본 지원한다.
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
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const bodyId = useId();

  useEscapeKey(isOpen && closeOnEscape, onClose);
  useFocusTrap(dialogRef, isOpen);

  if (!isOpen) return null;

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <Portal>
      <div
        className="ds-modal-overlay"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          ref={dialogRef}
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
                  aria-label="닫기"
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
