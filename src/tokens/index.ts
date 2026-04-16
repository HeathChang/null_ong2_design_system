/**
 * 디자인 토큰 — TypeScript 상수
 * CSS 변수와 1:1 대응한다.
 * 런타임에서 토큰 값이 필요할 때 사용한다.
 */

/** 스페이싱 토큰 맵 → CSS 변수 참조 */
export const SPACING = {
  '0': 'var(--ds-spacing-0)',
  px: 'var(--ds-spacing-px)',
  '0.5': 'var(--ds-spacing-0-5)',
  '1': 'var(--ds-spacing-1)',
  '2': 'var(--ds-spacing-2)',
  '3': 'var(--ds-spacing-3)',
  '4': 'var(--ds-spacing-4)',
  '5': 'var(--ds-spacing-5)',
  '6': 'var(--ds-spacing-6)',
  '8': 'var(--ds-spacing-8)',
  '10': 'var(--ds-spacing-10)',
  '12': 'var(--ds-spacing-12)',
  '16': 'var(--ds-spacing-16)',
  xs: 'var(--ds-spacing-xs)',
  sm: 'var(--ds-spacing-sm)',
  md: 'var(--ds-spacing-md)',
  lg: 'var(--ds-spacing-lg)',
  xl: 'var(--ds-spacing-xl)',
  '2xl': 'var(--ds-spacing-2xl)',
} as const;

/** 반경 토큰 맵 */
export const RADIUS = {
  none: 'var(--ds-radius-none)',
  sm: 'var(--ds-radius-sm)',
  md: 'var(--ds-radius-md)',
  lg: 'var(--ds-radius-lg)',
  xl: 'var(--ds-radius-xl)',
  '2xl': 'var(--ds-radius-2xl)',
  full: 'var(--ds-radius-full)',
} as const;

/** 폰트 크기 토큰 맵 */
export const FONT_SIZE = {
  xs: 'var(--ds-font-size-xs)',
  sm: 'var(--ds-font-size-sm)',
  base: 'var(--ds-font-size-base)',
  lg: 'var(--ds-font-size-lg)',
  xl: 'var(--ds-font-size-xl)',
  '2xl': 'var(--ds-font-size-2xl)',
  '3xl': 'var(--ds-font-size-3xl)',
  '4xl': 'var(--ds-font-size-4xl)',
} as const;

/** 폰트 두께 토큰 맵 */
export const FONT_WEIGHT = {
  normal: 'var(--ds-font-weight-normal)',
  medium: 'var(--ds-font-weight-medium)',
  semibold: 'var(--ds-font-weight-semibold)',
  bold: 'var(--ds-font-weight-bold)',
} as const;

/** z-index 토큰 맵 */
export const Z_INDEX = {
  base: 'var(--ds-z-base)',
  dropdown: 'var(--ds-z-dropdown)',
  sticky: 'var(--ds-z-sticky)',
  overlay: 'var(--ds-z-overlay)',
  modal: 'var(--ds-z-modal)',
  toast: 'var(--ds-z-toast)',
} as const;

export type SpacingKey = keyof typeof SPACING;
export type RadiusKey = keyof typeof RADIUS;
export type FontSizeKey = keyof typeof FONT_SIZE;
export type FontWeightKey = keyof typeof FONT_WEIGHT;
export type ZIndexKey = keyof typeof Z_INDEX;
