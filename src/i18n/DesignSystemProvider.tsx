import { createContext, useContext, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, DS_LOCALES, formatString } from './strings';
import type { DsLocale, DsStrings } from './strings';

const StringsContext = createContext<DsStrings | undefined>(undefined);

export interface DesignSystemProviderProps {
  children: ReactNode;
  /** 내장 로케일 (기본: 'ko') */
  locale?: DsLocale;
  /** 개별 문자열 덮어쓰기. 지정한 키만 교체되고 나머지는 로케일 값을 쓴다. */
  strings?: Partial<DsStrings>;
}

/**
 * 컴포넌트 내장 문자열의 언어를 지정한다.
 *
 * 감싸지 않아도 한국어로 동작하므로 필수는 아니다.
 * 자동 감지는 하지 않는다 — SSR 하이드레이션 불일치를 만들기 때문이다.
 *
 * @example
 * <DesignSystemProvider locale="en">
 *   <App />
 * </DesignSystemProvider>
 *
 * @example 일부만 교체
 * <DesignSystemProvider locale="en" strings={{ close: 'Dismiss' }}>
 *   <App />
 * </DesignSystemProvider>
 */
export function DesignSystemProvider({
  children,
  locale = DEFAULT_LOCALE,
  strings,
}: DesignSystemProviderProps) {
  /*
   * `strings`를 인라인 객체로 넘기는 것이 자연스러운 사용법인데
   * (`strings={{ close: 'Dismiss' }}`), 그러면 렌더마다 새 객체가 되어
   * context 값도 매번 바뀌고 하위 트리 전체가 memo를 무시하고 다시 그려진다.
   * 내용이 같으면 이전 객체를 그대로 재사용해 identity를 고정한다.
   */
  const stableStrings = useShallowStable(strings);

  const value = useMemo<DsStrings>(
    () => ({ ...DS_LOCALES[locale], ...stableStrings }),
    [locale, stableStrings],
  );

  return <StringsContext.Provider value={value}>{children}</StringsContext.Provider>;
}

/** 얕은 비교로 내용이 같으면 이전 참조를 유지한다. */
function useShallowStable(
  value: Partial<DsStrings> | undefined,
): Partial<DsStrings> | undefined {
  const ref = useRef(value);
  if (!isShallowEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}

function isShallowEqual(
  a: Partial<DsStrings> | undefined,
  b: Partial<DsStrings> | undefined,
): boolean {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  const aKeys = Object.keys(a) as Array<keyof DsStrings>;
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => Object.is(a[key], b[key]));
}

/**
 * 내장 UI 문자열을 읽는다.
 * Provider가 없으면 기본 로케일 문자열을 반환하므로 어디서든 안전하게 쓸 수 있다.
 */
export function useDsStrings(): DsStrings {
  return useContext(StringsContext) ?? DS_LOCALES[DEFAULT_LOCALE];
}

/**
 * 자리표시자를 치환한 문자열을 만드는 헬퍼.
 *
 * @example
 * const t = useDsFormat();
 * t('carouselGoToSlide', { index: 3 });  // '슬라이드 3'
 */
export function useDsFormat(): (
  key: keyof DsStrings,
  values: Record<string, string | number>,
) => string {
  const strings = useDsStrings();
  return (key, values) => formatString(strings[key], values);
}
