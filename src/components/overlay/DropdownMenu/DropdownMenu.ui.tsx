import { cloneElement, useState } from 'react';
import type { KeyboardEvent, ReactElement, ReactNode, Ref } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';

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
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const triggerEl = cloneElement(
    trigger,
    {
      ref: refs.setReference as Ref<unknown>,
      ...getReferenceProps(),
    } as Parameters<typeof cloneElement>[1],
  );

  function handleItemClick(item: DropdownMenuItem) {
    if (item.disabled === true) return;
    item.onSelect?.();
    setOpen(false);
  }

  function handleItemKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const enabledItems = items.filter((it) => it.disabled !== true);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next = prev === null ? 0 : (prev + 1) % enabledItems.length;
        const button = document.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not(:disabled)',
        )[next];
        button?.focus();
        return next;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => {
        const next =
          prev === null
            ? enabledItems.length - 1
            : (prev - 1 + enabledItems.length) % enabledItems.length;
        const button = document.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not(:disabled)',
        )[next];
        button?.focus();
        return next;
      });
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const item = items[index];
      if (item !== undefined) handleItemClick(item);
    }
  }

  return (
    <>
      {triggerEl}
      {open && (
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
                onClick={() => handleItemClick(item)}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
                {...getItemProps()}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
