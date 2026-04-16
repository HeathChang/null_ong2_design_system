import type { CSSProperties, HTMLAttributes } from 'react';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
type HeadingLevel = (typeof HEADING_LEVELS)[number];

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const LEVEL_TO_SIZE: Record<HeadingLevel, keyof typeof FONT_SIZE> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
} as const;

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
  // as에서 숫자만 추출하여 레벨 파악
  const level = Number(Component[1]) as HeadingLevel;
  const resolvedSize = size ?? LEVEL_TO_SIZE[level];

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
