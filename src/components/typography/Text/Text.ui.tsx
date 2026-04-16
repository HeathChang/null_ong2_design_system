import type { CSSProperties, ElementType } from 'react';
import type { FontSizeKey, FontWeightKey } from '../../../tokens';
import type { PolymorphicProps } from '../../../types';
import { FONT_SIZE, FONT_WEIGHT } from '../../../tokens';

const TEXT_COLORS = [
  'default',
  'muted',
  'primary',
  'success',
  'warning',
  'danger',
] as const;
type TextColor = (typeof TEXT_COLORS)[number];

const COLOR_VAR: Record<TextColor, string> = {
  default: 'var(--ds-color-neutral-900)',
  muted: 'var(--ds-color-neutral-500)',
  primary: 'var(--ds-color-primary-600)',
  success: 'var(--ds-color-success-text)',
  warning: 'var(--ds-color-warning-text)',
  danger: 'var(--ds-color-danger-text)',
};

interface TextOwnProps {
  /** 폰트 크기 */
  size?: FontSizeKey;
  /** 폰트 두께 */
  weight?: FontWeightKey;
  /** 텍스트 색상 */
  color?: TextColor;
  /** 텍스트 정렬 */
  align?: CSSProperties['textAlign'];
  /** 줄 수 초과 시 말줄임표 */
  truncate?: boolean;
}

type TextProps<TElement extends ElementType = 'p'> = PolymorphicProps<
  TElement,
  TextOwnProps
>;

/**
 * 본문 텍스트 컴포넌트. `as` prop으로 렌더링 요소를 변경할 수 있다.
 *
 * @example
 * <Text size="sm" color="muted">부가 설명</Text>
 * <Text as="span" weight="bold">강조 텍스트</Text>
 */
export function Text<TElement extends ElementType = 'p'>({
  as,
  size = 'base',
  weight = 'normal',
  color = 'default',
  align,
  truncate = false,
  className,
  style,
  ...props
}: TextProps<TElement>) {
  const Component = (as ?? 'p') as ElementType;

  const inlineStyle: CSSProperties = {
    fontSize: FONT_SIZE[size],
    fontWeight: FONT_WEIGHT[weight],
    color: COLOR_VAR[color],
    textAlign: align,
    ...(truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...style,
  };

  const classNames = ['ds-text', className].filter(Boolean).join(' ');

  return <Component className={classNames} style={inlineStyle} {...props} />;
}
