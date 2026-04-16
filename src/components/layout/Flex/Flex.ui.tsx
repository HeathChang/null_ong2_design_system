import type { CSSProperties, ElementType } from 'react';
import type { PolymorphicProps } from '../../../types';
import type { SpacingKey } from '../../../tokens';
import { SPACING } from '../../../tokens';

interface FlexOwnProps {
  /** flex-direction */
  direction?: CSSProperties['flexDirection'];
  /** align-items */
  align?: CSSProperties['alignItems'];
  /** justify-content */
  justify?: CSSProperties['justifyContent'];
  /** flex-wrap */
  wrap?: CSSProperties['flexWrap'];
  /** gap */
  gap?: SpacingKey;
  /** column-gap */
  columnGap?: SpacingKey;
  /** row-gap */
  rowGap?: SpacingKey;
  /** flex */
  flex?: CSSProperties['flex'];
}

type FlexProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  FlexOwnProps
>;

/**
 * Flexbox 레이아웃 컴포넌트
 *
 * @example
 * <Flex align="center" justify="between" gap="md">
 *   <span>왼쪽</span>
 *   <span>오른쪽</span>
 * </Flex>
 */
export function Flex<TElement extends ElementType = 'div'>({
  as,
  direction,
  align,
  justify,
  wrap,
  gap,
  columnGap,
  rowGap,
  flex,
  style,
  ...props
}: FlexProps<TElement>) {
  const Component = (as ?? 'div') as ElementType;

  const inlineStyle: CSSProperties = {
    display: 'flex',
    ...(direction !== undefined && { flexDirection: direction }),
    ...(align !== undefined && { alignItems: align }),
    ...(justify !== undefined && { justifyContent: justify }),
    ...(wrap !== undefined && { flexWrap: wrap }),
    ...(gap !== undefined && { gap: SPACING[gap] }),
    ...(columnGap !== undefined && { columnGap: SPACING[columnGap] }),
    ...(rowGap !== undefined && { rowGap: SPACING[rowGap] }),
    ...(flex !== undefined && { flex }),
    ...style,
  };

  return <Component style={inlineStyle} {...props} />;
}
