import type { HTMLAttributes, ReactNode } from 'react';

const BADGE_VARIANTS = [
  'neutral',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const;
type BadgeVariant = (typeof BADGE_VARIANTS)[number];

const BADGE_SIZES = ['sm', 'md'] as const;
type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 시각적 스타일 */
  variant?: BadgeVariant;
  /** 크기 */
  size?: BadgeSize;
  /** 점 형태로 렌더링 (텍스트 없이 알림 표시) */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * 상태나 카운트를 표시하는 작은 라벨 컴포넌트.
 *
 * @example
 * <Badge variant="success">활성</Badge>
 * <Badge variant="danger" dot />
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const classNames = [
    'ds-badge',
    `ds-badge--${variant}`,
    `ds-badge--${size}`,
    dot && 'ds-badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {!dot && children}
    </span>
  );
}
