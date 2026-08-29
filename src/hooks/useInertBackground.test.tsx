import { useRef } from 'react';
import { render } from '@testing-library/react';
import { useInertBackground } from './useInertBackground';

function Overlay({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useInertBackground(ref, isActive);
  return <div ref={ref} data-testid="overlay" />;
}

describe('useInertBackground', () => {
  let background: HTMLDivElement;
  let layer: HTMLDivElement;

  beforeEach(() => {
    background = document.createElement('div');
    background.id = 'app-root';
    document.body.appendChild(background);

    layer = document.createElement('div');
    layer.setAttribute('data-ds-layer', 'toast');
    document.body.appendChild(layer);
  });

  afterEach(() => {
    background.remove();
    layer.remove();
  });

  it('should hide background siblings from assistive tech while active', () => {
    render(<Overlay isActive />);
    expect(background).toHaveAttribute('aria-hidden', 'true');
    expect(background).toHaveAttribute('inert');
  });

  it('should leave design-system layers alone', () => {
    render(<Overlay isActive />);
    expect(layer).not.toHaveAttribute('aria-hidden');
    expect(layer).not.toHaveAttribute('inert');
  });

  it('should not touch the subtree that contains the overlay', () => {
    const { container } = render(<Overlay isActive />);
    const host = container.parentElement;
    expect(host).not.toHaveAttribute('aria-hidden');
  });

  it('should restore the original attributes on deactivation', () => {
    background.setAttribute('aria-hidden', 'false');
    const { unmount } = render(<Overlay isActive />);
    expect(background).toHaveAttribute('aria-hidden', 'true');

    unmount();
    expect(background).toHaveAttribute('aria-hidden', 'false');
    expect(background).not.toHaveAttribute('inert');
  });

  it('should do nothing while inactive', () => {
    render(<Overlay isActive={false} />);
    expect(background).not.toHaveAttribute('aria-hidden');
  });
});
