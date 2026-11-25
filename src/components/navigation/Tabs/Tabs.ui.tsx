import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { useControllable } from '../../../hooks/useControllable';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
  /** 트리거가 마운트되며 자신의 value와 비활성 여부를 등록한다. 반환값은 해제 함수. */
  registerTrigger: (value: string, isDisabled: boolean) => () => void;
}

const TabsContext = /* @__PURE__ */ createContext<TabsContextValue | undefined>(undefined);

/**
 * value를 id에 넣을 수 있는 형태로 바꾼다.
 *
 * `aria-controls`·`aria-labelledby`는 공백으로 구분한 id 목록이라
 * value에 공백이 있으면(`"내 정보"`) 참조가 두 개의 없는 id로 쪼개진다.
 * 문자 코드로 바꿔 서로 다른 value가 같은 id로 뭉치지 않게 한다.
 */
function toIdPart(value: string): string {
  return value.replace(/[^\w-]/g, (char) => `_${char.charCodeAt(0).toString(16)}`);
}

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

  // 어떤 트리거도 선택되지 않으면 roving tabindex가 무너져(전부 tabIndex=-1)
  // 탭 바 전체가 키보드로 도달 불가능해진다. 등록된 첫 트리거로 자동 보정한다.
  const triggersRef = useRef<Array<{ value: string; isDisabled: boolean }>>([]);
  const [registryVersion, setRegistryVersion] = useState(0);

  const registerTrigger = useCallback((triggerValue: string, isDisabled: boolean) => {
    const entry = { value: triggerValue, isDisabled };
    triggersRef.current = [...triggersRef.current, entry];
    setRegistryVersion((version) => version + 1);
    return () => {
      triggersRef.current = triggersRef.current.filter((item) => item !== entry);
      setRegistryVersion((version) => version + 1);
    };
  }, []);

  const isControlled = value !== undefined;

  useEffect(() => {
    // controlled면 선택 값은 전적으로 소비자 책임이므로 건드리지 않는다.
    if (isControlled) return;
    const triggers = triggersRef.current;
    if (triggers.length === 0) return;
    if (triggers.some((trigger) => trigger.value === activeValue)) return;
    // 비활성 탭을 고르면 누를 수 없는 탭의 패널이 열린다. 누를 수 있는 첫 탭을 고른다.
    const first = triggers.find((trigger) => !trigger.isDisabled) ?? triggers[0];
    if (first !== undefined) setActiveValue(first.value);
  }, [isControlled, activeValue, setActiveValue, registryVersion]);

  const ctx = useMemo<TabsContextValue>(
    () => ({
      value: activeValue,
      setValue: setActiveValue,
      baseId,
      orientation,
      registerTrigger,
    }),
    [activeValue, setActiveValue, baseId, orientation, registerTrigger],
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

export interface TabsTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
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
  const {
    value: active,
    setValue,
    baseId,
    orientation,
    registerTrigger,
  } = useTabsContext('Tabs.Trigger');
  const isSelected = active === value;

  useEffect(
    () => registerTrigger(value, disabled === true),
    [registerTrigger, value, disabled],
  );

  const idPart = toIdPart(value);

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
    const isNavigationKey =
      event.key === nextKey ||
      event.key === prevKey ||
      event.key === 'Home' ||
      event.key === 'End';

    if (!isNavigationKey) return;
    event.preventDefault();

    const tablist = event.currentTarget.closest('[role="tablist"]');
    if (tablist === null) return;

    const triggers = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (triggers.length === 0) return;

    if (event.key === 'Home') {
      triggers[0]?.focus();
      return;
    }
    if (event.key === 'End') {
      triggers[triggers.length - 1]?.focus();
      return;
    }

    const currentIndex = triggers.indexOf(event.currentTarget);
    if (currentIndex === -1) return;

    const direction = event.key === nextKey ? 1 : -1;
    const nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
    triggers[nextIndex]?.focus();
  }

  /*
   * 비활성 탭의 패널은 마운트되지 않는다 (TabsPanel이 null을 반환한다).
   * 그 상태에서 aria-controls를 붙이면 존재하지 않는 id를 가리키게 되어
   * 보조기술이 따라갈 곳 없는 참조가 남는다. 선택된 탭에만 건다.
   */
  const panelId = isSelected ? `${baseId}-panel-${idPart}` : undefined;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-trigger-${idPart}`}
      aria-selected={isSelected}
      aria-controls={panelId}
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
      id={`${baseId}-panel-${toIdPart(value)}`}
      aria-labelledby={`${baseId}-trigger-${toIdPart(value)}`}
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
 * `defaultValue`를 생략하면 첫 번째 탭이 자동으로 선택된다.
 * 키보드: ←/→ (세로 방향이면 ↑/↓) 순환 이동, Home/End로 처음/끝 이동,
 * Enter/Space로 선택.
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
