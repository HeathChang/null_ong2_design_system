import { forwardRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

const SWITCH_SIZES = ['sm', 'md', 'lg'] as const;
type SwitchSize = (typeof SWITCH_SIZES)[number];

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  /** 스위치 레이블 */
  label?: string;
  /** 스위치 크기 */
  size?: SwitchSize;
  /** 상태 변경 핸들러 */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ON/OFF 토글 스위치 컴포넌트.
 * Checkbox와 달리 즉시 반영되는 설정에 사용한다.
 *
 * @example
 * <Switch label="알림 받기" checked={enabled} onChange={setEnabled} />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, size = 'md', onChange, disabled, className, id, ...props }, ref) => {
    const wrapperClassNames = [
      'ds-switch-wrapper',
      `ds-switch-wrapper--${size}`,
      disabled === true && 'ds-switch-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange?.(event.target.checked, event);
    }

    return (
      <label className={wrapperClassNames} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          className="ds-switch__input"
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <span className="ds-switch__track" aria-hidden="true">
          <span className="ds-switch__thumb" />
        </span>
        {label !== undefined && <span className="ds-switch__label">{label}</span>}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
