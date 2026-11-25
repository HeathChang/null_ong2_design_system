import { forwardRef } from 'react';
import type { CSSProperties, ElementType, ForwardedRef } from 'react';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types';
import type { SpacingKey } from '../../../tokens';
import { SPACING } from '../../../tokens';
import { withDisplayName } from '../../../internal/withDisplayName';

interface StackOwnProps {
  /** 자식 요소 간 간격 */
  spacing?: SpacingKey;
  /** 방향 (기본값: column) */
  direction?: 'column' | 'row';
  /** align-items */
  align?: CSSProperties['alignItems'];
  /** justify-content */
  justify?: CSSProperties['justifyContent'];
}

export type StackProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  StackOwnProps
>;

/**
 * 자식 요소를 일정 간격으로 쌓아 배치하는 컴포넌트
 *
 * @example
 * <Stack spacing="md">
 *   <div>첫 번째</div>
 *   <div>두 번째</div>
 *   <div>세 번째</div>
 * </Stack>
 */
export const Stack = /* @__PURE__ */ withDisplayName(
  /* @__PURE__ */ forwardRef(function Stack(
  {
  as,
  spacing = 'md',
  direction = 'column',
  align,
  justify,
  style,
  ...props
}: StackProps<ElementType>,
  ref: ForwardedRef<unknown>,
) {
  const Component: ElementType = as ?? 'div';

  const inlineStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: SPACING[spacing],
    ...(align !== undefined && { alignItems: align }),
    ...(justify !== undefined && { justifyContent: justify }),
    ...style,
  };

  return <Component style={inlineStyle} {...props} ref={ref} />;
}),
  'Stack',
) as unknown as PolymorphicComponent<'div', StackOwnProps>;
