import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 텍스트에리어 레이블 */
  label?: string;
  /** 힌트 메시지 */
  hint?: string;
  /** 에러 메시지 */
  error?: string;
  /** 필수 여부 */
  required?: boolean;
}

/**
 * 여러 줄 텍스트 입력 컴포넌트
 *
 * @example
 * <Textarea label="설명" rows={5} placeholder="내용을 입력하세요" />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, required, id, className, ...props }, ref) => {
    const hasError = error !== undefined && error !== '';

    const textareaClassNames = [
      'ds-textarea',
      hasError && 'ds-textarea--error',
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
        <textarea
          ref={ref}
          id={id}
          className={textareaClassNames}
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
        />
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

Textarea.displayName = 'Textarea';
