/* eslint-disable @typescript-eslint/unbound-method --
 * floating-ui의 `refs.setReference` / `refs.setFloating`은 `this`에 의존하지 않는
 * 안정적인 콜백 ref다 (공식 문서가 그대로 전달하도록 안내한다).
 * 이 파일에서만 규칙을 끈다.
 */
import { cloneElement, useEffect, useState } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { assertSingleElement } from '../../../internal/assertSingleElement';

export interface TooltipProps {
  /** 툴팁 내용 */
  content: ReactNode;
  /** 트리거 요소 (단일 React Element) */
  children: ReactElement;
  /** 툴팁 위치 (기본: top) */
  placement?: Placement;
  /** 표시 지연(ms) (기본: 200) */
  delay?: number;
  /** 비활성화 */
  disabled?: boolean;
}

/**
 * 호버/포커스 시 부가 설명을 표시하는 툴팁 컴포넌트.
 *
 * `overflow: hidden|auto` 조상(모달 본문, 캐루셀 뷰포트 등) 안에서도 잘리지 않도록
 * body 포탈에 렌더한다.
 *
 * @example
 * <Tooltip content="저장합니다 (Cmd+S)">
 *   <Button>저장</Button>
 * </Tooltip>
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 200,
  disabled = false,
}: TooltipProps) {
  // 잘못된 자식을 넘겼을 때 React의 해독 불가능한 오류 대신 무엇을 고쳐야 하는지 알려준다.
  const child = assertSingleElement(children, 'Tooltip', 'children');

  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    // 포탈로 body에 올라가므로 transform 조상의 영향을 받지 않는 fixed 전략을 쓴다.
    strategy: 'fixed',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: delay, close: 0 }, enabled: !disabled });
  const focus = useFocus(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  // useRole이 트리거의 aria-describedby와 툴팁의 id를 같은 값으로 연결한다.
  // 직접 useId()로 id를 만들어 넘기면 두 값이 어긋나 스크린리더가 툴팁을 읽지 못한다.
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  // 열린 상태에서 disabled로 바뀌면 open이 true로 남아, 다시 활성화될 때
  // 호버하지도 않았는데 툴팁이 튀어나온다.
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  // children에 ref와 트리거 props 주입 (단일 React Element 가정)
  const trigger = cloneElement(
    child,
    {
      ref: refs.setReference as Ref<unknown>,
      ...getReferenceProps(),
    } as Parameters<typeof cloneElement>[1],
  );

  if (disabled) return child;

  return (
    <>
      {trigger}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="ds-tooltip"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
