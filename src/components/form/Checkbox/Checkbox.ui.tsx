import { forwardRef, useId } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** 체크박스 레이블 */
  label?: string;
  /** 체크 상태 변경 핸들러 */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 체크박스 컴포넌트
 *
 * @example
 * <Checkbox label="이용약관에 동의합니다" checked={agreed} onChange={setAgreed} />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, onChange, disabled, className, id, ...props }, ref) => {
    // id 생략 시에도 레이블이 명시적으로 연결되도록 고유 id를 확보한다.
    const autoId = useId();
    const checkboxId = id ?? autoId;

    const wrapperClassNames = [
      'ds-checkbox-wrapper',
      disabled === true && 'ds-checkbox-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange?.(event.target.checked, event);
    }

    return (
      <label className={wrapperClassNames} htmlFor={checkboxId}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="ds-checkbox"
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        {label !== undefined && <span>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
