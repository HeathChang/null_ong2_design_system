import { useCallback, useRef, useState } from 'react';

/** 개발 모드에서만 경고한다. 번들러가 프로덕션 빌드에서 통째로 제거한다. */
function isDevelopment(): boolean {
  try {
    return (
      typeof process !== 'undefined' &&
      process.env !== undefined &&
      process.env['NODE_ENV'] !== 'production'
    );
  } catch {
    return false;
  }
}

/**
 * Controlled/Uncontrolled 상태를 통합 관리하는 훅
 * - controlled: 외부에서 value를 관리 (value + onChange 모두 제공)
 * - uncontrolled: 내부에서 상태 관리 (defaultValue만 제공)
 *
 * 도중에 모드가 바뀌면(`value`가 값 ↔ undefined로 오감) 상태 출처가 뒤바뀌어
 * "왜 값이 안 바뀌지" 류의 추적하기 어려운 버그가 된다. 개발 모드에서 경고한다.
 */
export function useControllable<TValue>(options: {
  value: TValue | undefined;
  defaultValue: TValue;
  onChange?: (value: TValue) => void;
}): [TValue, (value: TValue) => void] {
  const { value: controlledValue, defaultValue, onChange } = options;

  const [uncontrolledValue, setUncontrolledValue] = useState<TValue>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const wasControlled = useRef(isControlled);
  if (isDevelopment() && wasControlled.current !== isControlled) {
    const from = wasControlled.current ? 'controlled' : 'uncontrolled';
    const to = isControlled ? 'controlled' : 'uncontrolled';
    // 디버깅 로그가 아니라 잘못된 사용을 알리는 개발 모드 전용 진단이다.
    console.warn(
      `[null_ong2-design-system] 컴포넌트가 ${from}에서 ${to}로 바뀌었습니다.\n` +
        `value를 undefined로 되돌리거나 뒤늦게 지정하면 상태 출처가 뒤바뀝니다. ` +
        `한 가지 방식만 유지하세요 (value+onChange 또는 defaultValue).`,
    );
    wasControlled.current = isControlled;
  }

  const handleChange = useCallback(
    (nextValue: TValue) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, handleChange];
}
