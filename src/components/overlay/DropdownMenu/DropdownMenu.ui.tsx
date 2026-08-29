/* eslint-disable @typescript-eslint/unbound-method --
 * floating-ui의 `refs.setReference` / `refs.setFloating`은 `this`에 의존하지 않는
 * 안정적인 콜백 ref다 (공식 문서가 그대로 전달하도록 안내한다).
 * 이 파일에서만 규칙을 끈다.
 */
import { cloneElement, useMemo, useRef, useState } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { assertSingleElement } from '../../../internal/assertSingleElement';

export interface DropdownMenuItem {
  /** 메뉴 항목 식별 키 */
  key: string;
  /** 표시 레이블 */
  label: ReactNode;
  /** 클릭 시 호출 */
  onSelect?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 위험 액션 (빨간 텍스트) */
  destructive?: boolean;
}

export interface DropdownMenuProps {
  /** 트리거 요소 */
  trigger: ReactElement;
  /** 메뉴 항목 목록 */
  items: DropdownMenuItem[];
  /** 메뉴 위치 (기본: bottom-start) */
  placement?: Placement;
}

/**
 * 클릭 트리거 드롭다운 메뉴.
 *
 * 키보드 조작은 WAI-ARIA APG 메뉴 패턴을 따른다.
 * - 트리거에서 ↑/↓ 또는 Enter/Space로 열면 첫(또는 마지막) 항목으로 포커스 이동
 * - ↑/↓로 순환 이동, 비활성 항목은 건너뜀
 * - Esc 또는 바깥 클릭으로 닫히며 포커스는 트리거로 복원
 *
 * `overflow: hidden|auto` 조상 안에서도 잘리지 않도록 body 포탈에 렌더한다.
 *
 * @example
 * <DropdownMenu
 *   trigger={<Button>메뉴</Button>}
 *   items={[
 *     { key: 'edit', label: '수정', onSelect: handleEdit },
 *     { key: 'delete', label: '삭제', onSelect: handleDelete, destructive: true },
 *   ]}
 * />
 */
export function DropdownMenu({
  trigger,
  items,
  placement = 'bottom-start',
}: DropdownMenuProps) {
  const triggerElement = assertSingleElement(trigger, 'DropdownMenu', 'trigger');

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 항목 DOM 참조. 인덱스는 items와 1:1로 대응한다.
  const listRef = useRef<Array<HTMLButtonElement | null>>([]);

  // items가 줄어들면 listRef에 사라진 항목의 낡은 참조가 남아 방향키가 빈 칸을 짚는다.
  listRef.current.length = items.length;

  const disabledIndices = useMemo(
    () =>
      items.reduce<number[]>((acc, item, index) => {
        if (item.disabled === true) acc.push(index);
        return acc;
      }, []),
    [items],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (nextOpen) => {
      setOpen(nextOpen);
      // 닫을 때 활성 인덱스를 비우지 않으면 재오픈 시 이전 위치로 점프한다.
      if (!nextOpen) setActiveIndex(null);
    },
    placement,
    // 포탈로 body에 올라가므로 transform 조상의 영향을 받지 않는 fixed 전략을 쓴다.
    strategy: 'fixed',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    disabledIndices,
    loop: true,
    focusItemOnOpen: 'auto',
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  const triggerEl = cloneElement(
    triggerElement,
    {
      ref: refs.setReference as Ref<unknown>,
      ...getReferenceProps(),
    } as Parameters<typeof cloneElement>[1],
  );

  function handleItemSelect(item: DropdownMenuItem) {
    if (item.disabled === true) return;
    item.onSelect?.();
    setOpen(false);
    setActiveIndex(null);
  }

  return (
    <>
      {triggerEl}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className="ds-dropdown-menu"
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item, index) => {
                const itemClassNames = [
                  'ds-dropdown-menu__item',
                  item.destructive === true && 'ds-dropdown-menu__item--destructive',
                  item.disabled === true && 'ds-dropdown-menu__item--disabled',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={item.key}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    className={itemClassNames}
                    {...getItemProps({
                      ref: (node: HTMLButtonElement | null) => {
                        listRef.current[index] = node;
                      },
                      onClick: () => handleItemSelect(item),
                    })}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
