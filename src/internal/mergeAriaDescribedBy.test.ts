import { mergeAriaDescribedBy } from './mergeAriaDescribedBy';

describe('mergeAriaDescribedBy', () => {
  it('should return undefined when nothing is describable', () => {
    expect(mergeAriaDescribedBy(undefined, undefined)).toBeUndefined();
  });

  it('should return the single id when only one is given', () => {
    expect(mergeAriaDescribedBy('a-error', undefined)).toBe('a-error');
  });

  it('should join ids in order', () => {
    expect(mergeAriaDescribedBy('a-error', 'note')).toBe('a-error note');
  });

  it('should flatten space-separated id lists', () => {
    expect(mergeAriaDescribedBy('a-error', 'one two')).toBe('a-error one two');
  });

  it('should drop duplicates', () => {
    expect(mergeAriaDescribedBy('a', 'a b', 'b')).toBe('a b');
  });

  it('should ignore empty and whitespace-only values', () => {
    expect(mergeAriaDescribedBy('', '   ', 'a')).toBe('a');
  });

  it('should ignore null and false', () => {
    expect(mergeAriaDescribedBy(null, false, 'a')).toBe('a');
  });

  it('should trim surrounding whitespace', () => {
    expect(mergeAriaDescribedBy('  a  ', ' b ')).toBe('a b');
  });
});
