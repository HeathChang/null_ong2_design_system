import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Portal } from '../../_internal/Portal';
import { useDsStrings } from '../../../i18n';

export const TOAST_VARIANTS = ['info', 'success', 'warning', 'danger'] as const;
type ToastVariant = (typeof TOAST_VARIANTS)[number];

export const TOAST_POSITIONS = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center',
] as const;
type ToastPosition = (typeof TOAST_POSITIONS)[number];

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ShowToastOptions {
  variant?: ToastVariant;
  /** 자동 소멸 시간(ms). 0이면 수동 닫기만 가능 (기본: 3000ms) */
  duration?: number;
}

interface ToastApi {
  show: (message: string, options?: ShowToastOptions) => string;
  success: (message: string, options?: Omit<ShowToastOptions, 'variant'>) => string;
  warning: (message: string, options?: Omit<ShowToastOptions, 'variant'>) => string;
  danger: (message: string, options?: Omit<ShowToastOptions, 'variant'>) => string;
  info: (message: string, options?: Omit<ShowToastOptions, 'variant'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | undefined>(undefined);

let idCounter = 0;
function createToastId(): string {
  idCounter += 1;
  return `ds-toast-${idCounter}`;
}

interface ToastProviderProps {
  children: ReactNode;
  /** 토스트 표시 위치 (기본: bottom-right) */
  position?: ToastPosition;
  /** 동시 표시 가능한 최대 토스트 수 (기본: 5, 최소 1) */
  maxToasts?: number;
}

/**
 * Toast 시스템 Provider.
 * 앱 루트에 한 번 추가하면 어디서나 useToast()로 알림을 표시할 수 있다.
 *
 * 컨테이너에 마우스를 올리거나 포커스가 들어오면 자동 소멸 타이머가 멈춘다
 * (WCAG 2.2.1 — 읽는 중에 사라지지 않게).
 */
export function ToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const strings = useDsStrings();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message: string, options: ShowToastOptions = {}): string => {
      const id = createToastId();
      const item: ToastItem = {
        id,
        message,
        variant: options.variant ?? 'info',
        duration: options.duration ?? 3000,
      };
      setToasts((prev) => {
        const next = [...prev, item];
        // 최대 개수 초과 시 가장 오래된 항목 제거.
        // limit이 0이면 slice(-0) === slice(0)이라 아무것도 잘리지 않고 무한히 쌓인다.
        const limit = Math.max(1, Math.trunc(maxToasts));
        return next.length > limit ? next.slice(-limit) : next;
      });
      return id;
    },
    [maxToasts],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (msg, opts) => show(msg, { ...opts, variant: 'success' }),
      warning: (msg, opts) => show(msg, { ...opts, variant: 'warning' }),
      danger: (msg, opts) => show(msg, { ...opts, variant: 'danger' }),
      info: (msg, opts) => show(msg, { ...opts, variant: 'info' }),
      dismiss,
    }),
    [show, dismiss],
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Portal>
        {/*
          컨테이너는 토스트가 없어도 항상 마운트되어 있다.
          live region은 콘텐츠보다 먼저 존재해야 스크린리더가 변경을 읽으므로
          aria-live를 개별 토스트가 아닌 이 정적 컨테이너에 건다.
        */}
        <div
          className={`ds-toast-container ds-toast-container--${position}`}
          data-ds-layer="toast"
          role="region"
          aria-label={strings.toastRegion}
          aria-live="polite"
          aria-atomic="false"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={resume}
        >
          {toasts.map((toast) => (
            <ToastItemView
              key={toast.id}
              item={toast}
              onDismiss={dismiss}
              isPaused={isPaused}
            />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

interface ToastItemViewProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
  isPaused: boolean;
}

/** warning/danger는 즉시 알려야 하므로 assertive live region(role="alert")으로 띄운다. */
function isUrgent(variant: ToastVariant): boolean {
  return variant === 'danger' || variant === 'warning';
}

function ToastItemView({ item, onDismiss, isPaused }: ToastItemViewProps) {
  const strings = useDsStrings();
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  // 일시정지 후 재개할 때 처음부터 다시 세지 않도록 남은 시간을 보존한다.
  const remainingRef = useRef(item.duration);

  useEffect(() => {
    if (item.duration <= 0) return;
    if (isPaused) return;

    // 정지 직전에 남은 시간이 0이 됐다면 재개 즉시 닫는다.
    // (여기서 early return하면 토스트가 영원히 남는다)
    const delay = Math.max(0, remainingRef.current);
    const startedAt = Date.now();
    const timer = setTimeout(() => {
      onDismissRef.current(item.id);
    }, delay);

    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAt));
    };
  }, [item.id, item.duration, isPaused]);

  return (
    <div
      className={`ds-toast ds-toast--${item.variant}`}
      {...(isUrgent(item.variant) && { role: 'alert' })}
    >
      <span className="ds-toast__message">{item.message}</span>
      <button
        type="button"
        className="ds-toast__close"
        aria-label={strings.toastClose}
        onClick={() => onDismiss(item.id)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Toast 알림을 표시하는 훅.
 * `<ToastProvider>` 내부에서만 사용 가능하다.
 *
 * @example
 * const toast = useToast();
 * toast.success('저장되었습니다');
 * toast.danger('오류 발생', { duration: 5000 });
 */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (ctx === undefined) {
    throw new Error('useToast는 <ToastProvider> 내부에서만 사용할 수 있습니다');
  }
  return ctx;
}
