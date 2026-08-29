import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { Label } from '../../typography/Label';
import { mergeAriaDescribedBy } from '../../../internal/mergeAriaDescribedBy';

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
 * `id`를 넘기지 않아도 내부에서 고유 id를 생성해 레이블·힌트·에러를 연결한다.
 *
 * @example
 * <Textarea label="설명" rows={5} placeholder="내용을 입력하세요" />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, required, id, className, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    const hasError = error !== undefined && error !== '';
    const autoId = useId();
    const textareaId = id ?? autoId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;
    // 소비자가 넘긴 aria-describedby를 덮어쓰지 않고 합친다.
    const describedBy = mergeAriaDescribedBy(
      hasError ? errorId : hint !== undefined ? hintId : undefined,
      ariaDescribedBy,
    );

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
          <Label htmlFor={textareaId} {...(required === true && { required })}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClassNames}
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

Textarea.displayName = 'Textarea';
