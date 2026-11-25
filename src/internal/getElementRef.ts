import { version } from 'react';
import type { ReactElement, Ref } from 'react';

const REACT_MAJOR = Number.parseInt(version, 10);

/**
 * 엘리먼트에 소비자가 붙여둔 ref를 꺼낸다.
 *
 * `cloneElement`로 우리 ref를 주입하면 원래 ref가 통째로 교체된다.
 * 합치려면 먼저 원래 것을 읽어야 하는데 위치가 React 버전마다 다르다.
 * - React 19+: ref는 일반 prop이다 (`element.ref`를 읽으면 경고가 난다)
 * - React 18: `element.ref`에 있다
 */
export function getElementRef(element: ReactElement): Ref<unknown> | undefined {
  if (REACT_MAJOR >= 19) {
    return (element.props as { ref?: Ref<unknown> }).ref;
  }
  return (element as unknown as { ref?: Ref<unknown> | null }).ref ?? undefined;
}
