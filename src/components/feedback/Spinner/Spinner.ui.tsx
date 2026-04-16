import type { HTMLAttributes } from 'react';

const SPINNER_SIZES = ['xs', 'sm', 'md', 'lg'] as const;
type SpinnerSize = (typeof SPINNER_SIZES)[number];

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** 스크린 리더를 위한 레이블 */
  label?: string;
}

/**
 * 로딩 상태를 표시하는 회전 스피너 컴포넌트
 */
export function Spinner({
  size = 'md',
  label = '로딩 중',
  className,
  ...props
}: SpinnerProps) {
  const classNames = ['ds-spinner', `ds-spinner--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      role="status"
      aria-label={label}
      className={classNames}
      {...props}
    />
  );
}
