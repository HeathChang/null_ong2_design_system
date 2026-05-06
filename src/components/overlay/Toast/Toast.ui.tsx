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

const TOAST_VARIANTS = ['info', 'success', 'warning', 'danger'] as const;
type ToastVariant = (typeof TOAST_VARIANTS)[number];

const TOAST_POSITIONS = [
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
  /** 동시 표시 가능한 최대 토스트 수 (기본: 5) */
  maxToasts?: number;
}

/**
 * Toast 시스템 Provider.
 * 앱 루트에 한 번 추가하면 어디서나 useToast()로 알림을 표시할 수 있다.
 */
export function ToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

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
        // 최대 개수 초과 시 가장 오래된 항목 제거
        return next.length > maxToasts ? next.slice(-maxToasts) : next;
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

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Portal>
        <div
          className={`ds-toast-container ds-toast-container--${position}`}
          role="region"
          aria-label="알림"
        >
          {toasts.map((toast) => (
            <ToastItemView key={toast.id} item={toast} onDismiss={dismiss} />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

interface ToastItemViewProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastItemView({ item, onDismiss }: ToastItemViewProps) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(() => {
      onDismissRef.current(item.id);
    }, item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration]);

  return (
    <div
      className={`ds-toast ds-toast--${item.variant}`}
      role={item.variant === 'danger' || item.variant === 'warning' ? 'alert' : 'status'}
    >
      <span className="ds-toast__message">{item.message}</span>
      <button
        type="button"
        className="ds-toast__close"
        aria-label="알림 닫기"
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
