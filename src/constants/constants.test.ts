import * as constants from './index';

/**
 * 상수 배열이 실제 컴포넌트가 받는 값과 어긋나면 소비자가 만든 variant 선택 UI가
 * 조용히 잘못된 값을 넘기게 된다. 최소한의 형태와 중복을 검증한다.
 */
describe('값 목록 상수', () => {
  const entries = Object.entries(constants) as Array<[string, readonly unknown[]]>;

  it('should export every list as a non-empty array', () => {
    expect(entries.length).toBeGreaterThan(10);
    for (const [name, values] of entries) {
      expect([name, Array.isArray(values)]).toEqual([name, true]);
      expect([name, values.length > 0]).toEqual([name, true]);
    }
  });

  it('should contain no duplicates', () => {
    for (const [name, values] of entries) {
      expect([name, new Set(values).size]).toEqual([name, values.length]);
    }
  });

  it('should expose the button variants and sizes', () => {
    expect(constants.BUTTON_VARIANTS).toEqual(['primary', 'secondary', 'ghost', 'danger']);
    expect(constants.BUTTON_SIZES).toEqual(['sm', 'md', 'lg']);
  });

  it('should expose every toast position', () => {
    expect(constants.TOAST_POSITIONS).toHaveLength(6);
    expect(constants.TOAST_POSITIONS).toContain('bottom-right');
  });

  it('should expose heading levels as numbers', () => {
    expect(constants.HEADING_LEVELS).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
