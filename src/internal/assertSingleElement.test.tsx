import { assertSingleElement } from './assertSingleElement';

describe('assertSingleElement', () => {
  it('should pass a single element through unchanged', () => {
    const element = <button type="button">저장</button>;
    expect(assertSingleElement(element, 'Tooltip', 'children')).toBe(element);
  });

  it('should reject a plain string with actionable guidance', () => {
    expect(() => assertSingleElement('저장', 'Tooltip', 'children')).toThrow(
      /단일 React 엘리먼트가 필요합니다/
    );
    expect(() => assertSingleElement('저장', 'Tooltip', 'children')).toThrow(/Tooltip/);
  });

  it('should reject a Fragment and explain why', () => {
    expect(() =>
      assertSingleElement(
        <>
          <button type="button">a</button>
          <button type="button">b</button>
        </>,
        'Tooltip',
        'children'
      )
    ).toThrow(/Fragment/);
  });

  it('should reject an array of elements', () => {
    expect(() =>
      assertSingleElement([<button key="a" type="button">a</button>], 'DropdownMenu', 'trigger')
    ).toThrow(/배열/);
  });

  it('should reject null and undefined', () => {
    expect(() => assertSingleElement(null, 'Tooltip', 'children')).toThrow(/null/);
    expect(() => assertSingleElement(undefined, 'Tooltip', 'children')).toThrow(/undefined/);
  });

  it('should name the offending prop', () => {
    expect(() => assertSingleElement('x', 'DropdownMenu', 'trigger')).toThrow(/trigger/);
  });
});
