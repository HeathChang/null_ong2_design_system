import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { ButtonHTMLAttributes, FocusEvent, ReactNode } from 'react';
import { Spinner } from '../../feedback/Spinner';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 시각적 스타일 */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 로딩 상태 (스피너 표시 + 인터랙션 비활성화) */
  isLoading?: boolean;
  /** 버튼 텍스트 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 버튼 텍스트 오른쪽 아이콘 */
  rightIcon?: ReactNode;
}

/**
 * 사용자 액션을 트리거하는 버튼 컴포넌트
 *
 * `isLoading`이 끝나면 로딩 직전에 포커스를 갖고 있던 경우 포커스를 되돌려준다.
 * (disabled가 되는 순간 브라우저가 포커스를 body로 날려 키보드 사용자가 위치를 잃는 문제)
 *
 * @example
 * <Button variant="primary" onClick={handleSubmit}>저장</Button>
 * <Button variant="danger" isLoading={isDeleting}>삭제</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      className,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled === true || isLoading;

    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const hadFocusRef = useRef(false);
    const wasDisabledRef = useRef(isDisabled);

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        nodeRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref !== null) ref.current = node;
      },
      [ref],
    );

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLButtonElement>) => {
        hadFocusRef.current = true;
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLButtonElement>) => {
        // disabled로 바뀌면서 브라우저가 강제로 뺏은 포커스라면 "가지고 있었다"로 유지한다.
        hadFocusRef.current = event.currentTarget.disabled;
        onBlur?.(event);
      },
      [onBlur],
    );

    useEffect(() => {
      const wasDisabled = wasDisabledRef.current;
      wasDisabledRef.current = isDisabled;
      if (isDisabled || !wasDisabled) return;
      if (!hadFocusRef.current) return;
      hadFocusRef.current = false;

      const node = nodeRef.current;
      if (node === null) return;
      // 그 사이 앱이 다른 곳으로 포커스를 옮겼다면 뺏어오지 않는다.
      const active = document.activeElement;
      if (active !== null && active !== document.body) return;
      node.focus();
    }, [isDisabled]);

    const classNames = [
      'ds-btn',
      `ds-btn--${variant}`,
      `ds-btn--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={setRefs}
        className={classNames}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          leftIcon !== undefined && (
            <span className="ds-btn__icon" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        <span>{children}</span>
        {!isLoading && rightIcon !== undefined && (
          <span className="ds-btn__icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
