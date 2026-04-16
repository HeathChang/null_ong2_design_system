import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** 셀렉트 레이블 */
  label?: string;
  /** 선택 옵션 목록 */
  options: SelectOption[];
  /** 힌트 메시지 */
  hint?: string;
  /** 에러 메시지 */
  error?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 기본 플레이스홀더 옵션 텍스트 */
  placeholder?: string;
}

/**
 * 드롭다운 선택 컴포넌트
 *
 * @example
 * <Select
 *   label="국가"
 *   options={[{ value: 'kr', label: '대한민국' }]}
 *   onChange={handleChange}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      hint,
      error,
      required,
      placeholder,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const hasError = error !== undefined && error !== '';

    const selectClassNames = [
      'ds-select',
      hasError && 'ds-select--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="ds-field">
        {label !== undefined && (
          <Label htmlFor={id} {...(required === true && { required })}>
            {label}
          </Label>
        )}
        <div className="ds-select-wrapper">
          <select
            ref={ref}
            id={id}
            className={selectClassNames}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${id}-error`
                : hint !== undefined
                  ? `${id}-hint`
                  : undefined
            }
            required={required}
            {...props}
          >
            {placeholder !== undefined && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled === true}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {hasError && (
          <p id={`${id}-error`} className="ds-field-error" role="alert">
            {error}
          </p>
        )}
        {!hasError && hint !== undefined && (
          <p id={`${id}-hint`} className="ds-field-hint">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
