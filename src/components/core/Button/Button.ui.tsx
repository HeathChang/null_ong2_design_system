import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '../../feedback/Spinner';

const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

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
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled === true || isLoading;

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
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Spinner
            size="sm"
            label="로딩 중"
          />
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
