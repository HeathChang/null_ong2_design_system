import { cloneElement, useId, useState } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import {
  autoUpdate,
  flip,
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
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: delay, close: 0 }, enabled: !disabled });
  const focus = useFocus(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  // child 요소에 ref와 트리거 props를 주입
  const triggerProps = getReferenceProps({
    'aria-describedby': open ? tooltipId : undefined,
  });

  // children에 ref와 트리거 props 주입 (단일 React Element 가정)
  const trigger = cloneElement(
    children,
    {
      ref: refs.setReference as Ref<unknown>,
      ...triggerProps,
    } as Parameters<typeof cloneElement>[1],
  );

  if (disabled) return children;

  return (
    <>
      {trigger}
      {open && (
        <div
          ref={refs.setFloating}
          className="ds-tooltip"
          id={tooltipId}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
}
