import { forwardRef } from 'react';
import type { CSSProperties, ElementType, ForwardedRef } from 'react';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types';
import type { RadiusKey, SpacingKey } from '../../../tokens';
import { RADIUS, SPACING } from '../../../tokens';
import { withDisplayName } from '../../../internal/withDisplayName';

interface BoxOwnProps {
  /** 패딩 (4방향) */
  padding?: SpacingKey;
  /** 패딩 (수평) */
  paddingX?: SpacingKey;
  /** 패딩 (수직) */
  paddingY?: SpacingKey;
  /** 마진 (4방향) */
  margin?: SpacingKey;
  /** 마진 (수평) */
  marginX?: SpacingKey;
  /** 마진 (수직) */
  marginY?: SpacingKey;
  /** border-radius */
  borderRadius?: RadiusKey;
  /** display */
  display?: CSSProperties['display'];
  /** position */
  position?: CSSProperties['position'];
  /** background-color (CSS 변수 또는 색상값) */
  bg?: string;
  /** width */
  width?: CSSProperties['width'];
  /** height */
  height?: CSSProperties['height'];
  /** overflow */
  overflow?: CSSProperties['overflow'];
}

export type BoxProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  BoxOwnProps
>;

/**
 * 범용 레이아웃 컨테이너 컴포넌트.
 * `as` prop으로 렌더링 요소를 변경할 수 있다.
 *
 * @example
 * <Box padding="md" borderRadius="lg" bg="var(--ds-color-neutral-50)">
 *   콘텐츠
 * </Box>
 */
export const Box = /* @__PURE__ */ withDisplayName(
  /* @__PURE__ */ forwardRef(function Box(
  {
  as,
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  borderRadius,
  display,
  position,
  bg,
  width,
  height,
  overflow,
  style,
  ...props
}: BoxProps<ElementType>,
  ref: ForwardedRef<unknown>,
) {
  const Component: ElementType = as ?? 'div';

  const inlineStyle: CSSProperties = {
    ...(padding !== undefined && { padding: SPACING[padding] }),
    ...(paddingX !== undefined && {
      paddingLeft: SPACING[paddingX],
      paddingRight: SPACING[paddingX],
    }),
    ...(paddingY !== undefined && {
      paddingTop: SPACING[paddingY],
      paddingBottom: SPACING[paddingY],
    }),
    ...(margin !== undefined && { margin: SPACING[margin] }),
    ...(marginX !== undefined && {
      marginLeft: SPACING[marginX],
      marginRight: SPACING[marginX],
    }),
    ...(marginY !== undefined && {
      marginTop: SPACING[marginY],
      marginBottom: SPACING[marginY],
    }),
    ...(borderRadius !== undefined && { borderRadius: RADIUS[borderRadius] }),
    ...(display !== undefined && { display }),
    ...(position !== undefined && { position }),
    ...(bg !== undefined && { backgroundColor: bg }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(overflow !== undefined && { overflow }),
    ...style,
  };

  return <Component style={inlineStyle} {...props} ref={ref} />;
}),
  'Box',
) as unknown as PolymorphicComponent<'div', BoxOwnProps>;
