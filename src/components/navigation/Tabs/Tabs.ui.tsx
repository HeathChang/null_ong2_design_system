import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
} from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { useControllable } from '../../../hooks/useControllable';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (ctx === undefined) {
    throw new Error(`<${component}>은 <Tabs.Root> 내부에서만 사용할 수 있습니다`);
  }
  return ctx;
}

export interface TabsRootProps {
  /** 현재 선택 값 (controlled) */
  value?: string;
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 방향 */
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

function TabsRoot({
  value,
  defaultValue = '',
  onChange,
  orientation = 'horizontal',
  children,
}: TabsRootProps) {
  const baseId = useId();
  const [activeValue, setActiveValue] = useControllable({
    value,
    defaultValue,
    ...(onChange !== undefined && { onChange }),
  });

  const ctx = useMemo<TabsContextValue>(
    () => ({ value: activeValue, setValue: setActiveValue, baseId, orientation }),
    [activeValue, setActiveValue, baseId, orientation],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div
        className={`ds-tabs ds-tabs--${orientation}`}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  'aria-label'?: string;
}

function TabsList({ children, className, ...props }: TabsListProps) {
  const { orientation } = useTabsContext('Tabs.List');
  const classNames = ['ds-tabs__list', className].filter(Boolean).join(' ');

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={classNames}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** 탭 식별 값 (Tabs.Panel의 value와 매칭) */
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

function TabsTrigger({
  value,
  disabled,
  children,
  className,
  onClick,
  onKeyDown,
  ...props
}: TabsTriggerProps) {
  const { value: active, setValue, baseId, orientation } = useTabsContext('Tabs.Trigger');
  const isSelected = active === value;

  const classNames = [
    'ds-tabs__trigger',
    isSelected && 'ds-tabs__trigger--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    if (event.key !== nextKey && event.key !== prevKey) return;
    event.preventDefault();

    const tablist = event.currentTarget.closest('[role="tablist"]');
    if (tablist === null) return;

    const triggers = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    const currentIndex = triggers.indexOf(event.currentTarget);
    if (currentIndex === -1) return;

    const direction = event.key === nextKey ? 1 : -1;
    const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
    triggers[nextIndex]?.focus();
  }

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={classNames}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 탭 식별 값 (Tabs.Trigger의 value와 매칭) */
  value: string;
  children: ReactNode;
}

function TabsPanel({ value, children, className, ...props }: TabsPanelProps) {
  const { value: active, baseId } = useTabsContext('Tabs.Panel');
  const isSelected = active === value;
  if (!isSelected) return null;

  const classNames = ['ds-tabs__panel', className].filter(Boolean).join(' ');

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      tabIndex={0}
      className={classNames}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * 컴파운드 컴포넌트 패턴 기반 탭 UI.
 *
 * @example
 * <Tabs.Root defaultValue="profile">
 *   <Tabs.List>
 *     <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
 *     <Tabs.Trigger value="settings">설정</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Panel value="profile">프로필 내용</Tabs.Panel>
 *   <Tabs.Panel value="settings">설정 내용</Tabs.Panel>
 * </Tabs.Root>
 */
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
};
