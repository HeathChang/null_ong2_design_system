import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { useDsStrings } from '../../../i18n';

export const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
type AvatarSize = (typeof AVATAR_SIZES)[number];

export const AVATAR_SHAPES = ['circle', 'square'] as const;
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

/**
 * 문자열을 사람이 보는 "글자" 단위로 쪼갠다.
 *
 * `String.prototype.slice`나 `[0]`은 UTF-16 코드 유닛 단위라
 * 이모지처럼 서로게이트 쌍인 글자를 반으로 잘라 깨진 문자를 만든다.
 * (`'👩‍💻 개발자'` → `'\uD83D개'`)
 */
function toGraphemes(value: string): string[] {
  const Segmenter = (
    Intl as typeof Intl & {
      Segmenter?: new (
        locale?: string,
        options?: { granularity: 'grapheme' },
      ) => { segment: (input: string) => Iterable<{ segment: string }> };
    }
  ).Segmenter;

  // Intl.Segmenter는 ZWJ로 이어진 이모지(👩‍💻)까지 한 글자로 묶어준다.
  if (Segmenter !== undefined) {
    const segmenter = new Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(value), (part) => part.segment);
  }
  // 없으면 코드포인트 단위로만 자른다. 최소한 서로게이트는 쪼개지지 않는다.
  return Array.from(value);
}

/** 이름에서 최대 2글자의 이니셜을 추출한다. */
function getInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return '';

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return toGraphemes(parts[0] ?? '')
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  const first = toGraphemes(parts[0] ?? '')[0] ?? '';
  const last = toGraphemes(parts[parts.length - 1] ?? '')[0] ?? '';
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
  // 실패한 URL 자체를 기억한다. boolean 플래그로 두면 src가 새 값으로 바뀌어도
  // 실패 상태가 남아 정상 이미지가 영영 이니셜로 대체된다.
  const strings = useDsStrings();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const showImage = src !== undefined && src !== '' && failedSrc !== src;
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
          onError={() => setFailedSrc(src ?? null)}
        />
      ) : (
        <span
          className="ds-avatar__initials"
          role="img"
          aria-label={alt ?? name ?? strings.avatarFallback}
        >
          {initials !== '' ? initials : '?'}
        </span>
      )}
    </span>
  );
}
