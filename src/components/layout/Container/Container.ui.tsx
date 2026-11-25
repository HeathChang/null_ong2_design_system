import { forwardRef } from 'react';
import type { ElementType, ForwardedRef } from 'react';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types';
import { withDisplayName } from '../../../internal/withDisplayName';

export const CONTAINER_MAX_WIDTHS = ['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
type ContainerMaxWidth = (typeof CONTAINER_MAX_WIDTHS)[number];

interface ContainerOwnProps {
  /** 최대 너비 */
  maxWidth?: ContainerMaxWidth;
}

export type ContainerProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  ContainerOwnProps
>;

/**
 * 콘텐츠 최대 너비를 제한하고 가운데 정렬하는 컨테이너 컴포넌트
 *
 * @example
 * <Container maxWidth="lg">
 *   <main>페이지 콘텐츠</main>
 * </Container>
 */
export const Container = /* @__PURE__ */ withDisplayName(
  /* @__PURE__ */ forwardRef(function Container(
  {
  as,
  maxWidth = 'lg',
  className,
  ...props
}: ContainerProps<ElementType>,
  ref: ForwardedRef<unknown>,
) {
  const Component: ElementType = as ?? 'div';

  const classNames = [
    'ds-container',
    `ds-container--${maxWidth}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames} {...props} ref={ref} />;
}),
  'Container',
) as unknown as PolymorphicComponent<'div', ContainerOwnProps>;
