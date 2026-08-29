import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useControllable } from '../../../hooks/useControllable';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useDsFormat, useDsStrings } from '../../../i18n';

export interface CarouselProps {
  /** 슬라이드 콘텐츠 배열 */
  items: ReactNode[];
  /** 현재 슬라이드 인덱스 (controlled) */
  index?: number;
  /** 초기 슬라이드 인덱스 (uncontrolled) */
  defaultIndex?: number;
  /** 인덱스 변경 핸들러 */
  onChange?: (index: number) => void;
  /** 자동 재생 간격(ms). 0이면 비활성 (기본: 0) */
  autoPlayInterval?: number;
  /** 무한 순환 (기본: true) */
  loop?: boolean;
  /** 좌우 화살표 표시 (기본: true) */
  showArrows?: boolean;
  /** 인디케이터 점 표시 (기본: true) */
  showIndicators?: boolean;
  /** 캐루셀 영역의 접근성 레이블 (기본: 로케일의 "캐루셀") */
  ariaLabel?: string;
}

/**
 * React 18 타입 정의에는 `inert`가 없다.
 * 화면 밖 슬라이드를 탭 순서와 접근성 트리에서 완전히 제외하기 위해 속성으로 직접 넘긴다.
 */
function inertProps(isInert: boolean): Record<string, string> {
  return isInert ? { inert: '' } : {};
}

/**
 * 슬라이드를 한 번에 하나씩 보여주는 캐루셀 컴포넌트.
 *
 * - 화면 밖 슬라이드는 `inert`로 탭 순서에서 제외된다 (링크·버튼이 들어 있어도 안전).
 * - 자동 재생은 마우스 오버·포커스·정지 버튼으로 멈출 수 있고,
 *   OS의 "동작 줄이기" 설정이 켜져 있으면 처음부터 재생하지 않는다 (WCAG 2.2.2).
 *
 * @example
 * <Carousel
 *   items={[
 *     <img src="/1.jpg" alt="슬라이드 1" />,
 *     <img src="/2.jpg" alt="슬라이드 2" />,
 *   ]}
 *   autoPlayInterval={3000}
 * />
 */
export function Carousel({
  items,
  index,
  defaultIndex = 0,
  onChange,
  autoPlayInterval = 0,
  loop = true,
  showArrows = true,
  showIndicators = true,
  ariaLabel,
}: CarouselProps) {
  const total = items.length;
  const baseId = useId();
  const strings = useDsStrings();
  const format = useDsFormat();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useControllable({
    value: index,
    defaultValue: defaultIndex,
    ...(onChange !== undefined && { onChange }),
  });

  /** 사용자가 정지 버튼으로 명시적으로 멈춘 상태 */
  const [isStoppedByUser, setIsStoppedByUser] = useState(false);
  /** 마우스 오버·포커스로 일시적으로 멈춘 상태 */
  const [isInteracting, setIsInteracting] = useState(false);

  const canAutoPlay = autoPlayInterval > 0 && total > 1 && !prefersReducedMotion;
  const isPlaying = canAutoPlay && !isStoppedByUser && !isInteracting;

  /**
   * 렌더링에 쓰는 인덱스.
   *
   * controlled `index`, `defaultIndex`, 또는 items 길이가 줄어든 경우 등
   * 범위를 벗어난 값이 그대로 들어올 수 있다. 그대로 두면
   * `translateX(-900%)`처럼 빈 화면이 되거나 `translateX(--500%)`처럼
   * 아예 무효한 CSS가 나가고, 모든 슬라이드가 aria-hidden이 되어 아무것도 읽히지 않는다.
   */
  const safeIndex = total === 0 ? 0 : Math.min(Math.max(Math.trunc(activeIndex), 0), total - 1);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      if (next < 0) {
        setActiveIndex(loop ? total - 1 : 0);
      } else if (next >= total) {
        setActiveIndex(loop ? 0 : total - 1);
      } else {
        setActiveIndex(next);
      }
    },
    [total, loop, setActiveIndex],
  );

  const goToRef = useRef(goTo);
  goToRef.current = goTo;
  const activeRef = useRef(safeIndex);
  activeRef.current = safeIndex;

  // 자동 재생
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      goToRef.current(activeRef.current + 1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlayInterval]);

  /**
   * 인디케이터는 roving tabindex(활성 항목만 tabIndex=0)를 쓰므로
   * 방향키로 나머지 항목에 도달할 수 있어야 한다. tablist 규약대로 이동 즉시 선택한다.
   *
   * 핸들러는 tablist 컨테이너가 아니라 각 버튼에 붙인다 —
   * 포커스를 받지 않는 요소에 키 핸들러를 두면 실제로 동작하지 않는 경로가 생긴다.
   */
  function handleIndicatorKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const keyToNextIndex: Record<string, number | undefined> = {
      ArrowRight: safeIndex + 1,
      ArrowDown: safeIndex + 1,
      ArrowLeft: safeIndex - 1,
      ArrowUp: safeIndex - 1,
      Home: 0,
      End: total - 1,
    };
    const target = keyToNextIndex[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const wrapped = ((target % total) + total) % total;
    goTo(wrapped);
    // goTo 직후에는 아직 새 인디케이터가 tabIndex=0이 아니므로 DOM에서 직접 포커스를 옮긴다.
    const tablist = event.currentTarget.closest('[role="tablist"]');
    if (tablist === null) return;
    const indicators = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    indicators[wrapped]?.focus();
  }

  if (total === 0) return null;

  const isFirst = safeIndex === 0;
  const isLast = safeIndex === total - 1;
  const canGoPrev = loop || !isFirst;
  const canGoNext = loop || !isLast;

  return (
    <div
      className="ds-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? strings.carousel}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
    >
      <div
        className="ds-carousel__viewport"
        aria-live={isPlaying ? 'off' : 'polite'}
        aria-atomic="false"
      >
        <div
          className="ds-carousel__track"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              id={`${baseId}-slide-${i}`}
              className="ds-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={format('carouselSlide', { index: i + 1, total })}
              aria-hidden={i !== safeIndex}
              {...inertProps(i !== safeIndex)}
            >
              {item}
            </div>
          ))}
        </div>

        {showArrows && total > 1 && (
          <>
            <button
              type="button"
              className="ds-carousel__arrow ds-carousel__arrow--prev"
              aria-label={strings.carouselPrevious}
              onClick={() => goTo(safeIndex - 1)}
              disabled={!canGoPrev}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M12.78 4.72a.75.75 0 010 1.06L8.56 10l4.22 4.22a.75.75 0 11-1.06 1.06l-4.75-4.75a.75.75 0 010-1.06l4.75-4.75a.75.75 0 011.06 0z" />
              </svg>
            </button>
            <button
              type="button"
              className="ds-carousel__arrow ds-carousel__arrow--next"
              aria-label={strings.carouselNext}
              onClick={() => goTo(safeIndex + 1)}
              disabled={!canGoNext}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M7.22 4.72a.75.75 0 011.06 0l4.75 4.75a.75.75 0 010 1.06l-4.75 4.75a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.78a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {(showIndicators || canAutoPlay) && total > 1 && (
        <div className="ds-carousel__controls">
          {canAutoPlay && (
            <button
              type="button"
              className="ds-carousel__playback"
              aria-label={isStoppedByUser ? strings.carouselPlay : strings.carouselPause}
              aria-pressed={isStoppedByUser}
              onClick={() => setIsStoppedByUser((stopped) => !stopped)}
            >
              {isStoppedByUser ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <path d="M4 2.5v9l7-4.5-7-4.5z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <path d="M3.5 2.5h2.5v9H3.5v-9zm4.5 0h2.5v9H8v-9z" />
                </svg>
              )}
            </button>
          )}

          {showIndicators && (
            <div
              className="ds-carousel__indicators"
              role="tablist"
              aria-label={strings.carouselPagination}
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === safeIndex}
                  aria-controls={`${baseId}-slide-${i}`}
                  aria-label={format('carouselGoToSlide', { index: i + 1 })}
                  tabIndex={i === safeIndex ? 0 : -1}
                  className={`ds-carousel__indicator${i === safeIndex ? ' ds-carousel__indicator--active' : ''}`}
                  onClick={() => goTo(i)}
                  onKeyDown={handleIndicatorKeyDown}
                >
                  <span className="ds-carousel__indicator-dot" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
