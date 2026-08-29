import { useEffect } from 'react';

/**
 * 여러 오버레이가 동시에 열려도 하나의 잠금으로 취급하기 위한 참조 카운트.
 * 마지막 오버레이가 닫힐 때만 원래 상태로 되돌린다.
 */
let lockCount = 0;

interface SavedBodyState {
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  paddingRight: string;
  scrollY: number;
}

let saved: SavedBodyState | null = null;

/**
 * 스크롤바가 사라지면서 생기는 레이아웃 점프(가로 흔들림)를 보정한다.
 *
 * 레이아웃 엔진이 없는 환경(jsdom 등)에서는 clientWidth가 0이라
 * innerWidth 전체가 스크롤바 폭으로 계산된다. 그런 경우 보정하지 않는다.
 */
function getScrollbarWidth(): number {
  const viewportWidth = document.documentElement.clientWidth;
  if (viewportWidth <= 0) return 0;
  return Math.max(0, window.innerWidth - viewportWidth);
}

function lock(): void {
  const { body } = document;
  const scrollY = window.scrollY;

  saved = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    paddingRight: body.style.paddingRight,
    scrollY,
  };

  const scrollbarWidth = getScrollbarWidth();
  if (scrollbarWidth > 0) {
    const currentPadding =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
  }

  /*
   * iOS Safari는 body의 `overflow: hidden`을 무시한다. 모달 위에서 손가락을 움직이면
   * 뒤 페이지가 그대로 스크롤되고, 닫으면 엉뚱한 위치에 남는다.
   * 유일하게 확실한 방법이 body를 화면에 고정하고 현재 스크롤 위치만큼 끌어올리는 것이다.
   * 해제할 때 그 위치로 되돌려 사용자가 위치를 잃지 않게 한다.
   */
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `${-scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
}

function unlock(): void {
  if (saved === null) return;
  const { body } = document;

  body.style.overflow = saved.overflow;
  body.style.position = saved.position;
  body.style.top = saved.top;
  body.style.left = saved.left;
  body.style.right = saved.right;
  body.style.width = saved.width;
  body.style.paddingRight = saved.paddingRight;

  // position:fixed를 푸는 순간 스크롤이 맨 위로 튀므로 원래 위치로 되돌린다.
  // 0이면 되돌릴 것이 없다 (jsdom처럼 scrollTo가 없는 환경에서 불필요한 호출도 피한다).
  if (saved.scrollY !== 0) window.scrollTo(0, saved.scrollY);
  saved = null;
}

/**
 * 활성화된 동안 `<body>` 스크롤을 잠근다.
 *
 * 모달이 열렸는데 배경이 같이 스크롤되면 모달을 닫았을 때
 * 사용자가 원래 보던 위치를 잃는다. 특히 모바일에서 두드러진다.
 *
 * 겹쳐 열려도 참조 카운트로 한 번만 잠기고, 마지막 하나가 닫힐 때 복원한다.
 */
export function useBodyScrollLock(isActive: boolean): void {
  useEffect(() => {
    if (!isActive) return;
    if (typeof document === 'undefined') return;

    if (lockCount === 0) lock();
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount > 0) return;
      unlock();
    };
  }, [isActive]);
}
