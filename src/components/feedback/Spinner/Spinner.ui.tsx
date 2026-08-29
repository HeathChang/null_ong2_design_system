import type { HTMLAttributes } from 'react';
import { useDsStrings } from '../../../i18n';

export const SPINNER_SIZES = ['xs', 'sm', 'md', 'lg'] as const;
type SpinnerSize = (typeof SPINNER_SIZES)[number];

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  /** 스크린 리더를 위한 레이블 (기본: 로케일의 "로딩 중") */
  label?: string;
}

/**
 * 로딩 상태를 표시하는 회전 스피너 컴포넌트
 */
export function Spinner({
  size = 'md',
  label,
  className,
  ...props
}: SpinnerProps) {
  const strings = useDsStrings();
  const classNames = ['ds-spinner', `ds-spinner--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      role="status"
      aria-label={label ?? strings.loading}
      className={classNames}
      {...props}
    />
  );
}
