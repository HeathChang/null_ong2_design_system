import { createRef } from 'react';
import { getElementRef } from './getElementRef';

describe('getElementRef', () => {
  it('should return the object ref attached to the element', () => {
    const ref = createRef<HTMLButtonElement>();
    expect(getElementRef(<button ref={ref}>저장</button>)).toBe(ref);
  });

  it('should return the callback ref attached to the element', () => {
    const ref = jest.fn();
    expect(getElementRef(<button ref={ref}>저장</button>)).toBe(ref);
  });

  it('should return undefined when the element has no ref', () => {
    expect(getElementRef(<button>저장</button>)).toBeUndefined();
  });
});
