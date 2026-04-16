import { useCallback, useState } from 'react';

/**
 * Controlled/Uncontrolled 상태를 통합 관리하는 훅
 * - controlled: 외부에서 value를 관리 (value + onChange 모두 제공)
 * - uncontrolled: 내부에서 상태 관리 (defaultValue만 제공)
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
