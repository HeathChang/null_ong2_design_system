import type { ElementType } from 'react';
import type { PolymorphicProps } from '../../../types';

const CONTAINER_MAX_WIDTHS = ['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
type ContainerMaxWidth = (typeof CONTAINER_MAX_WIDTHS)[number];

interface ContainerOwnProps {
  /** 최대 너비 */
  maxWidth?: ContainerMaxWidth;
}

type ContainerProps<TElement extends ElementType = 'div'> = PolymorphicProps<
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
export function Container<TElement extends ElementType = 'div'>({
  as,
  maxWidth = 'lg',
  className,
  ...props
}: ContainerProps<TElement>) {
  const Component = (as ?? 'div') as ElementType;

  const classNames = [
    'ds-container',
    `ds-container--${maxWidth}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames} {...props} />;
}
