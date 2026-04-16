import type { CSSProperties, ElementType } from 'react';
import type { PolymorphicProps } from '../../../types';
import type { SpacingKey } from '../../../tokens';
import { SPACING } from '../../../tokens';

interface GridOwnProps {
  /** 열 개수 또는 CSS grid-template-columns 값 */
  columns?: number | string;
  /** 행 개수 또는 CSS grid-template-rows 값 */
  rows?: number | string;
  /** 전체 gap */
  gap?: SpacingKey;
  /** 열 간격 */
  columnGap?: SpacingKey;
  /** 행 간격 */
  rowGap?: SpacingKey;
  /** align-items */
  align?: CSSProperties['alignItems'];
  /** justify-items */
  justify?: CSSProperties['justifyItems'];
}

type GridProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  GridOwnProps
>;

function resolveGridTemplate(value: number | string): string {
  if (typeof value === 'number') return `repeat(${value}, minmax(0, 1fr))`;
  return value;
}

/**
 * CSS Grid 레이아웃 컴포넌트
 *
 * @example
 * <Grid columns={3} gap="md">
 *   <div>셀 1</div>
 *   <div>셀 2</div>
 *   <div>셀 3</div>
 * </Grid>
 */
export function Grid<TElement extends ElementType = 'div'>({
  as,
  columns,
  rows,
  gap,
  columnGap,
  rowGap,
  align,
  justify,
  style,
  ...props
}: GridProps<TElement>) {
  const Component = (as ?? 'div') as ElementType;

  const inlineStyle: CSSProperties = {
    display: 'grid',
    ...(columns !== undefined && {
      gridTemplateColumns: resolveGridTemplate(columns),
    }),
    ...(rows !== undefined && {
      gridTemplateRows: resolveGridTemplate(rows),
    }),
    ...(gap !== undefined && { gap: SPACING[gap] }),
    ...(columnGap !== undefined && { columnGap: SPACING[columnGap] }),
    ...(rowGap !== undefined && { rowGap: SPACING[rowGap] }),
    ...(align !== undefined && { alignItems: align }),
    ...(justify !== undefined && { justifyItems: justify }),
    ...style,
  };

  return <Component style={inlineStyle} {...props} />;
}
