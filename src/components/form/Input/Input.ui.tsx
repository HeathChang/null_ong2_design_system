import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';

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
 * @example
 * <Input label="이메일" type="email" placeholder="example@mail.com" required />
 * <Input label="비밀번호" type="password" error="비밀번호가 올바르지 않습니다" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, required, id, className, ...props }, ref) => {
    const hasError = error !== undefined && error !== '';
    const inputId = id;

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
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : hint !== undefined
                ? `${inputId}-hint`
                : undefined
          }
          required={required}
          {...props}
        />
        {hasError && (
          <p id={`${inputId}-error`} className="ds-field-error" role="alert">
            {error}
          </p>
        )}
        {!hasError && hint !== undefined && (
          <p id={`${inputId}-hint`} className="ds-field-hint">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
