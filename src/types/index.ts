export type { PolymorphicProps, PolymorphicRef } from './polymorphic';

/** 공통 크기 타입 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 공통 스페이싱 토큰 타입 */
export type SpacingToken =
  | '0'
  | 'px'
  | '0.5'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

/** 공통 반경 토큰 타입 */
export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** 공통 색상 시맨틱 타입 */
export type SemanticColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';
