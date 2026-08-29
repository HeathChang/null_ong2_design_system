import { render, screen } from '@testing-library/react';
import { Carousel } from '../components/data-display/Carousel';
import { Modal } from '../components/overlay/Modal';
import { Spinner } from '../components/feedback/Spinner';
import { DesignSystemProvider, useDsStrings } from './DesignSystemProvider';
import { DS_LOCALES, EN_STRINGS, KO_STRINGS, formatString } from './strings';

const ITEMS = [<div key="1">하나</div>, <div key="2">둘</div>];

describe('formatString', () => {
  it('should replace named placeholders', () => {
    expect(formatString('슬라이드 {index}', { index: 3 })).toBe('슬라이드 3');
  });

  it('should replace every placeholder in the template', () => {
    expect(formatString('{index} of {total}', { index: 2, total: 5 })).toBe('2 of 5');
  });

  it('should leave unknown placeholders untouched', () => {
    expect(formatString('{index} / {missing}', { index: 1 })).toBe('1 / {missing}');
  });
});

describe('로케일 정의', () => {
  it('should define the same keys in every bundled locale', () => {
    const referenceKeys = Object.keys(KO_STRINGS).sort();
    for (const [name, strings] of Object.entries(DS_LOCALES)) {
      expect([name, Object.keys(strings).sort()]).toEqual([name, referenceKeys]);
    }
  });

  it('should leave no empty string in any locale', () => {
    for (const [name, strings] of Object.entries(DS_LOCALES)) {
      for (const [key, value] of Object.entries(strings)) {
        expect([name, key, value.trim().length > 0]).toEqual([name, key, true]);
      }
    }
  });

  it('should keep placeholders consistent across locales', () => {
    function placeholders(template: string): string[] {
      return (template.match(/\{\w+\}/g) ?? []).sort();
    }
    for (const [name, strings] of Object.entries(DS_LOCALES)) {
      for (const key of Object.keys(KO_STRINGS) as Array<keyof typeof KO_STRINGS>) {
        expect([name, key, placeholders(strings[key])]).toEqual([
          name,
          key,
          placeholders(KO_STRINGS[key]),
        ]);
      }
    }
  });
});

describe('DesignSystemProvider', () => {
  it('should fall back to Korean without a provider', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', '로딩 중');
  });

  it('should translate built-in labels for the chosen locale', () => {
    render(
      <DesignSystemProvider locale="en">
        <Modal isOpen onClose={() => {}} title="Delete">
          Body
        </Modal>
      </DesignSystemProvider>
    );
    expect(screen.getByLabelText(EN_STRINGS.close)).toBeInTheDocument();
  });

  it('should translate interpolated labels', () => {
    render(
      <DesignSystemProvider locale="en">
        <Carousel items={ITEMS} />
      </DesignSystemProvider>
    );
    expect(screen.getByLabelText('Slide 2')).toBeInTheDocument();
    expect(screen.getAllByRole('group', { hidden: true })[0]).toHaveAttribute(
      'aria-label',
      '1 of 2'
    );
  });

  it('should let individual strings be overridden', () => {
    render(
      <DesignSystemProvider locale="en" strings={{ close: 'Dismiss' }}>
        <Modal isOpen onClose={() => {}} title="Delete">
          Body
        </Modal>
      </DesignSystemProvider>
    );
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument();
  });

  it('should keep non-overridden strings from the locale', () => {
    render(
      <DesignSystemProvider locale="ja" strings={{ close: 'X' }}>
        <Carousel items={ITEMS} />
      </DesignSystemProvider>
    );
    expect(screen.getByLabelText('次のスライド')).toBeInTheDocument();
  });

  it('should let an explicit ariaLabel win over the locale', () => {
    render(
      <DesignSystemProvider locale="en">
        <Carousel items={ITEMS} ariaLabel="Hero banner" />
      </DesignSystemProvider>
    );
    expect(screen.getByRole('region', { name: 'Hero banner' })).toBeInTheDocument();
  });


  it('should keep the context value stable when strings are passed inline', () => {
    const seen: unknown[] = [];

    function Probe() {
      seen.push(useDsStrings());
      return null;
    }

    function App({ tick }: { tick: number }) {
      return (
        <DesignSystemProvider locale="en" strings={{ close: 'Dismiss' }}>
          <span>{tick}</span>
          <Probe />
        </DesignSystemProvider>
      );
    }

    const { rerender } = render(<App tick={0} />);
    rerender(<App tick={1} />);
    rerender(<App tick={2} />);

    // 인라인 객체를 넘겨도 내용이 같으면 같은 참조를 유지해야 한다.
    expect(seen).toHaveLength(3);
    expect(seen[1]).toBe(seen[0]);
    expect(seen[2]).toBe(seen[0]);
  });

  it('should produce a new value when an overridden string actually changes', () => {
    const seen: unknown[] = [];

    function Probe() {
      seen.push(useDsStrings());
      return null;
    }

    function App({ label }: { label: string }) {
      return (
        <DesignSystemProvider locale="en" strings={{ close: label }}>
          <Probe />
        </DesignSystemProvider>
      );
    }

    const { rerender } = render(<App label="Dismiss" />);
    rerender(<App label="Shut" />);

    expect(seen[1]).not.toBe(seen[0]);
    expect((seen[1] as { close: string }).close).toBe('Shut');
  });
});
