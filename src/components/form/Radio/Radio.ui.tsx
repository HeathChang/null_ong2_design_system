import { forwardRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** 라디오 레이블 */
  label?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 라디오 버튼 컴포넌트
 * 동일한 `name`을 가진 Radio 그룹 중 하나를 선택할 수 있다.
 *
 * @example
 * <Radio name="color" value="red" label="빨강" checked={color === 'red'} onChange={setColor} />
 * <Radio name="color" value="blue" label="파랑" checked={color === 'blue'} onChange={setColor} />
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, onChange, disabled, className, id, ...props }, ref) => {
    const wrapperClassNames = [
      'ds-radio-wrapper',
      disabled === true && 'ds-radio-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange?.(event.target.value, event);
    }

    return (
      <label className={wrapperClassNames} htmlFor={id}>
        <input
          ref={ref}
          type="radio"
          id={id}
          className="ds-radio"
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        {label !== undefined && <span>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
