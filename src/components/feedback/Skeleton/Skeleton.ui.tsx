import type { CSSProperties, HTMLAttributes } from 'react';

const SKELETON_VARIANTS = ['rectangular', 'text', 'circle'] as const;
type SkeletonVariant = (typeof SKELETON_VARIANTS)[number];

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** 너비 (px 숫자 또는 CSS 문자열) */
  width?: number | string;
  /** 높이 (px 숫자 또는 CSS 문자열) */
  height?: number | string;
  /** 형태 변형 */
  variant?: SkeletonVariant;
}

function resolveSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

/**
 * 콘텐츠 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export function Skeleton({
  width,
  height,
  variant = 'rectangular',
  className,
  style,
  ...props
}: SkeletonProps) {
  const classNames = [
    'ds-skeleton',
    variant === 'text' && 'ds-skeleton--text',
    variant === 'circle' && 'ds-skeleton--circle',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inlineStyle: CSSProperties = {
    width: resolveSize(width),
    height: resolveSize(height),
    ...style,
  };

  return (
    <span
      className={classNames}
      style={inlineStyle}
      aria-hidden="true"
      {...props}
    />
  );
}
