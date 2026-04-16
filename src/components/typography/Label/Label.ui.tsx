import type { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** 필수 입력 여부 (빨간 별표 표시) */
  required?: boolean;
}

/**
 * 폼 입력 요소와 연결하는 레이블 컴포넌트
 *
 * @example
 * <Label htmlFor="email" required>이메일</Label>
 * <input id="email" type="email" />
 */
export function Label({ required, children, className, ...props }: LabelProps) {
  const classNames = ['ds-label', className].filter(Boolean).join(' ');

  return (
    <label className={classNames} {...props}>
      {children}
      {required === true && (
        <span className="ds-label__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
