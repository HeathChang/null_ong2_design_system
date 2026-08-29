import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';
import { mergeAriaDescribedBy } from '../../../internal/mergeAriaDescribedBy';

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
  /**
   * 기본 플레이스홀더 옵션 텍스트.
   * `value`/`defaultValue`를 주지 않으면 이 옵션이 초기 선택 상태가 된다.
   */
  placeholder?: string;
}

/**
 * 드롭다운 선택 컴포넌트
 *
 * `id`를 넘기지 않아도 내부에서 고유 id를 생성해 레이블·힌트·에러를 연결한다.
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
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const hasError = error !== undefined && error !== '';
    /*
     * HTML 사양상 브라우저는 초기 선택에서 disabled 옵션을 건너뛴다.
     * 그래서 placeholder만 넣으면 첫 실제 옵션이 선택된 채로 그려지고
     * placeholder는 한 번도 보이지 않는다. 명시적으로 빈 값을 초기 선택으로 지정한다.
     */
    const needsPlaceholderDefault =
      placeholder !== undefined &&
      props.value === undefined &&
      props.defaultValue === undefined;
    // id 생략 시 레이블 연결이 끊기고 describedby id가 중복되므로 항상 고유 id를 확보한다.
    const autoId = useId();
    const selectId = id ?? autoId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;
    // 소비자가 넘긴 aria-describedby를 덮어쓰지 않고 합친다.
    const describedBy = mergeAriaDescribedBy(
      hasError ? errorId : hint !== undefined ? hintId : undefined,
      ariaDescribedBy,
    );

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
          <Label htmlFor={selectId} {...(required === true && { required })}>
            {label}
          </Label>
        )}
        <div className="ds-select-wrapper">
          <select
            ref={ref}
            id={selectId}
            className={selectClassNames}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            required={required}
            {...(needsPlaceholderDefault && { defaultValue: '' })}
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
          <p id={errorId} className="ds-field-error" role="alert">
            {error}
          </p>
        )}
        {!hasError && hint !== undefined && (
          <p id={hintId} className="ds-field-hint">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
