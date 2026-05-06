import { useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useControllable } from '../../../hooks/useControllable';

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
  /** 접근성 레이블 */
  ariaLabel?: string;
}

/**
 * 슬라이드를 한 번에 하나씩 보여주는 캐루셀 컴포넌트.
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
  ariaLabel = '캐루셀',
}: CarouselProps) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = useControllable({
    value: index,
    defaultValue: defaultIndex,
    ...(onChange !== undefined && { onChange }),
  });

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
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  // 자동 재생
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    if (total <= 1) return;

    const timer = setInterval(() => {
      goToRef.current(activeRef.current + 1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, total]);

  if (total === 0) return null;

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === total - 1;
  const canGoPrev = loop || !isFirst;
  const canGoNext = loop || !isLast;

  return (
    <div className="ds-carousel" role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="ds-carousel__viewport">
        <div
          className="ds-carousel__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="ds-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}`}
              aria-hidden={i !== activeIndex}
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
              aria-label="이전 슬라이드"
              onClick={() => goTo(activeIndex - 1)}
              disabled={!canGoPrev}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M12.78 4.72a.75.75 0 010 1.06L8.56 10l4.22 4.22a.75.75 0 11-1.06 1.06l-4.75-4.75a.75.75 0 010-1.06l4.75-4.75a.75.75 0 011.06 0z" />
              </svg>
            </button>
            <button
              type="button"
              className="ds-carousel__arrow ds-carousel__arrow--next"
              aria-label="다음 슬라이드"
              onClick={() => goTo(activeIndex + 1)}
              disabled={!canGoNext}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M7.22 4.72a.75.75 0 011.06 0l4.75 4.75a.75.75 0 010 1.06l-4.75 4.75a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.78a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {showIndicators && total > 1 && (
        <div className="ds-carousel__indicators" role="tablist" aria-label="슬라이드 선택">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`슬라이드 ${i + 1}`}
              className={`ds-carousel__indicator${i === activeIndex ? ' ds-carousel__indicator--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
