import { renderHook } from '@testing-library/react';
import { useEscapeKey } from './useEscapeKey';

function pressEscape(options: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, ...options });
  document.dispatchEvent(event);
  return event;
}

describe('useEscapeKey', () => {
  it('should call handler on Escape when active', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    pressEscape();
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when inactive', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey(false, onEscape));

    pressEscape();
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should ignore keys other than Escape', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should only close the topmost overlay when several are active', () => {
    const closeOuter = jest.fn();
    const closeInner = jest.fn();

    const outer = renderHook(() => useEscapeKey(true, closeOuter));
    const inner = renderHook(() => useEscapeKey(true, closeInner));

    pressEscape();
    expect(closeInner).toHaveBeenCalledTimes(1);
    expect(closeOuter).not.toHaveBeenCalled();

    // 위쪽 오버레이가 닫히면 그 다음 오버레이가 ESC를 넘겨받는다.
    inner.unmount();
    pressEscape();
    expect(closeOuter).toHaveBeenCalledTimes(1);
    expect(closeInner).toHaveBeenCalledTimes(1);

    outer.unmount();
  });

  it('should use the latest handler without re-registering the listener', () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = renderHook(
      ({ handler }: { handler: () => void }) => useEscapeKey(true, handler),
      { initialProps: { handler: first } },
    );

    rerender({ handler: second });
    pressEscape();

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('should ignore an Escape already handled by another layer', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    event.preventDefault();
    document.dispatchEvent(event);

    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should remove the document listener once every overlay is gone', () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useEscapeKey(true, jest.fn()));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });
});
