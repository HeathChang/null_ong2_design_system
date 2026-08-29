import { renderHook } from '@testing-library/react';
import { useBodyScrollLock } from './useBodyScrollLock';

describe('useBodyScrollLock', () => {
  afterEach(() => {
    document.body.removeAttribute('style');
  });

  it('should lock body scroll while active', () => {
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should not touch body scroll while inactive', () => {
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe('');
  });

  it('should restore the previous overflow on unmount', () => {
    document.body.style.overflow = 'scroll';
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('should keep the lock until every overlay releases it', () => {
    const first = renderHook(() => useBodyScrollLock(true));
    const second = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    first.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    second.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('should pin the body so iOS Safari cannot scroll behind the overlay', () => {
    renderHook(() => useBodyScrollLock(true));
    // iOS Safari는 body의 overflow:hidden을 무시하므로 position:fixed가 필요하다.
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
  });

  it('should offset the body by the current scroll position', () => {
    Object.defineProperty(window, 'scrollY', { value: 320, configurable: true });
    // jsdom은 scrollTo를 구현하지 않아 해제 시 에러 로그를 남긴다.
    Object.defineProperty(window, 'scrollTo', { value: jest.fn(), configurable: true });
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.top).toBe('-320px');

    unmount();
    expect(document.body.style.top).toBe('');
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('should restore the scroll position when released', () => {
    Object.defineProperty(window, 'scrollY', { value: 150, configurable: true });
    const scrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollTo, configurable: true });

    const { unmount } = renderHook(() => useBodyScrollLock(true));
    unmount();

    expect(scrollTo).toHaveBeenCalledWith(0, 150);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('should restore every touched property on release', () => {
    document.body.style.position = 'relative';
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    unmount();
    expect(document.body.style.position).toBe('relative');
    document.body.style.position = '';
  });
});
