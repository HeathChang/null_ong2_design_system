import { act, renderHook } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Listener = (event: MediaQueryListEvent) => void;

interface MediaQueryStub {
  matches: boolean;
  listeners: Listener[];
}

function installMatchMedia(matches: boolean): MediaQueryStub {
  const stub: MediaQueryStub = { matches, listeners: [] };
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: () => ({
      get matches() {
        return stub.matches;
      },
      addEventListener: (_: string, listener: Listener) => {
        stub.listeners.push(listener);
      },
      removeEventListener: (_: string, listener: Listener) => {
        stub.listeners = stub.listeners.filter((it) => it !== listener);
      },
    }),
  });
  return stub;
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'matchMedia');
  });

  it('should return false when matchMedia is unavailable', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should report the current preference', () => {
    installMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should react to preference changes', () => {
    const stub = installMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      stub.matches = true;
      for (const listener of stub.listeners) {
        listener({ matches: true } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(true);
  });

  it('should detach its listener on unmount', () => {
    const stub = installMatchMedia(false);
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    expect(stub.listeners).toHaveLength(1);

    unmount();
    expect(stub.listeners).toHaveLength(0);
  });
});
