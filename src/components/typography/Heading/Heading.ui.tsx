import type { CSSProperties, HTMLAttributes } from 'react';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** 태그별 기본 시각 크기. `size`를 주면 이 값은 무시된다. */
const TAG_TO_SIZE: Record<HeadingTag, keyof typeof FONT_SIZE> = {
  h1: '4xl',
  h2: '3xl',
  h3: '2xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'base',
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 헤딩 레벨 (h1 ~ h6). 시각적 크기와 독립적으로 설정 가능 */
  as?: HeadingTag;
  /** 시각적 크기 (as와 독립적으로 설정 가능) */
  size?: keyof typeof FONT_SIZE;
  /** 텍스트 색상 */
  color?: string;
  /** 텍스트 정렬 */
  align?: CSSProperties['textAlign'];
}

/**
 * 섹션 제목을 나타내는 헤딩 컴포넌트
 *
 * @example
 * <Heading as="h1">메인 제목</Heading>
 * <Heading as="h2" size="xl">시각적으로 작은 h2</Heading>
 */
export function Heading({
  as: Component = 'h2',
  size,
  color,
  align,
  className,
  style,
  ...props
}: HeadingProps) {
  const resolvedSize = size ?? TAG_TO_SIZE[Component];

  const inlineStyle: CSSProperties = {
    fontSize: FONT_SIZE[resolvedSize],
    fontWeight: FONT_WEIGHT.bold,
    color: color ?? 'var(--ds-color-neutral-900)',
    textAlign: align,
    ...style,
  };

  const classNames = ['ds-heading', className].filter(Boolean).join(' ');

  return <Component className={classNames} style={inlineStyle} {...props} />;
}
