/**
 * Polymorphic 컴포넌트 타입 유틸리티
 * `as` prop을 통해 렌더링되는 HTML 요소 또는 컴포넌트를 변경할 수 있다.
 *
 * 사용 예:
 *   <Box as="section" ...>
 *   <Box as={Link} href="..." ...>
 */
import type { ComponentPropsWithRef, ElementType, ReactElement } from 'react';

/** `as` prop 타입 정의 */
type AsProp<TElement extends ElementType> = {
  as?: TElement;
};

/**
 * Polymorphic 컴포넌트 props 타입
 *
 * TElement: 렌더링할 HTML 요소 또는 컴포넌트 타입
 * TProps: 컴포넌트 고유 props
 *
 * TElement의 기본 props와 TProps를 병합하되,
 * TProps가 우선순위를 갖는다.
 */
export type PolymorphicProps<
  TElement extends ElementType,
  TProps = Record<string, never>,
> = TProps &
  AsProp<TElement> &
  Omit<ComponentPropsWithRef<TElement>, keyof TProps | 'as'>;

/** Polymorphic ref 타입 */
export type PolymorphicRef<TElement extends ElementType> =
  ComponentPropsWithRef<TElement>['ref'];

/**
 * `as`에 따라 props 타입이 달라지는 컴포넌트의 호출 시그니처.
 *
 * `forwardRef`는 제네릭을 보존하지 못해 결과를 이 타입으로 다시 좁힌다.
 * (ref를 실제로 전달하려면 React 18에서는 forwardRef가 필요하다)
 */
export type PolymorphicComponent<
  TDefault extends ElementType,
  TProps = Record<string, never>,
> = <TElement extends ElementType = TDefault>(
  props: PolymorphicProps<TElement, TProps>,
) => ReactElement | null;
