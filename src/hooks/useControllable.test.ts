import { act, renderHook } from '@testing-library/react';
import { useControllable } from './useControllable';

describe('useControllable', () => {
  it('should manage state internally when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControllable<string>({ value: undefined, defaultValue: 'a' }),
    );
    expect(result.current[0]).toBe('a');

    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
  });

  it('should notify onChange when uncontrolled', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useControllable<string>({ value: undefined, defaultValue: 'a', onChange }),
    );

    act(() => result.current[1]('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('should not change internal value when controlled', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useControllable<string>({ value: 'fixed', defaultValue: 'a', onChange }),
    );

    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('fixed');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('should follow the controlled value across renders', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) =>
        useControllable<string>({ value, defaultValue: 'a' }),
      { initialProps: { value: 'one' } },
    );
    expect(result.current[0]).toBe('one');

    rerender({ value: 'two' });
    expect(result.current[0]).toBe('two');
  });


  describe('모드 전환 경고', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warn.mockRestore();
    });

    it('should warn when switching from uncontrolled to controlled', () => {
      const { rerender } = renderHook(
        ({ value }: { value: string | undefined }) =>
          useControllable<string>({ value, defaultValue: 'a' }),
        { initialProps: { value: undefined as string | undefined } },
      );

      rerender({ value: 'b' });
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('uncontrolled'));
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('controlled'));
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const { rerender } = renderHook(
        ({ value }: { value: string | undefined }) =>
          useControllable<string>({ value, defaultValue: 'a' }),
        { initialProps: { value: 'b' } },
      );

      rerender({ value: undefined });
      expect(warn).toHaveBeenCalled();
    });

    it('should stay quiet while the mode is stable', () => {
      const { rerender } = renderHook(
        ({ value }: { value: string }) =>
          useControllable<string>({ value, defaultValue: 'a' }),
        { initialProps: { value: 'b' } },
      );

      rerender({ value: 'c' });
      rerender({ value: 'd' });
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
