import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';
import { mergeAriaDescribedBy } from '../../../internal/mergeAriaDescribedBy';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 레이블 */
  label?: string;
  /** 힌트 메시지 */
  hint?: string;
  /** 에러 메시지 (있으면 에러 상태로 렌더링) */
  error?: string;
  /** 필수 여부 */
  required?: boolean;
}

/**
 * 텍스트 입력 컴포넌트
 *
 * `id`를 넘기지 않아도 내부에서 고유 id를 생성해 레이블·힌트·에러를 연결한다.
 *
 * @example
 * <Input label="이메일" type="email" placeholder="example@mail.com" required />
 * <Input label="비밀번호" type="password" error="비밀번호가 올바르지 않습니다" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, required, id, className, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    const hasError = error !== undefined && error !== '';
    // id 생략 시 레이블 연결이 끊기고 describedby id가 중복되므로 항상 고유 id를 확보한다.
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    // 소비자가 넘긴 aria-describedby를 덮어쓰지 않고 합친다.
    const describedBy = mergeAriaDescribedBy(
      hasError ? errorId : hint !== undefined ? hintId : undefined,
      ariaDescribedBy,
    );

    const inputClassNames = [
      'ds-input',
      hasError && 'ds-input--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="ds-field">
        {label !== undefined && (
          <Label htmlFor={inputId} {...(required === true && { required })}>
            {label}
          </Label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClassNames}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          required={required}
          {...props}
        />
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

Input.displayName = 'Input';
