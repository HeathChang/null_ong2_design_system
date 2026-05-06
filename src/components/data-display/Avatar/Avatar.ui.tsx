import { useState } from 'react';
import type { HTMLAttributes } from 'react';

const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
type AvatarSize = (typeof AVATAR_SIZES)[number];

const AVATAR_SHAPES = ['circle', 'square'] as const;
type AvatarShape = (typeof AVATAR_SHAPES)[number];

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 이미지 URL */
  src?: string;
  /** alt 텍스트 + 이미지 실패 시 이니셜 생성에 사용 */
  name?: string;
  /** 이미지 alt (지정 시 우선) */
  alt?: string;
  /** 크기 */
  size?: AvatarSize;
  /** 형태 */
  shape?: AvatarShape;
}

/** 이름에서 최대 2글자의 이니셜을 추출한다. */
function getInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return '';

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return (parts[0] ?? '').slice(0, 2).toUpperCase();
  }
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

/**
 * 사용자 식별을 위한 아바타 컴포넌트.
 * 이미지 우선, 실패 시 이니셜로 fallback한다.
 *
 * @example
 * <Avatar src="/me.jpg" name="홍길동" />
 * <Avatar name="John Doe" size="lg" />
 */
export function Avatar({
  src,
  name,
  alt,
  size = 'md',
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = src !== undefined && src !== '' && !imageFailed;
  const initials = name !== undefined ? getInitials(name) : '';

  const classNames = [
    'ds-avatar',
    `ds-avatar--${size}`,
    `ds-avatar--${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {showImage ? (
        <img
          className="ds-avatar__img"
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          className="ds-avatar__initials"
          aria-label={alt ?? name ?? '사용자 아바타'}
        >
          {initials !== '' ? initials : '?'}
        </span>
      )}
    </span>
  );
}
