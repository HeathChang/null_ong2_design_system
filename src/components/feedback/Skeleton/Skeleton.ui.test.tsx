import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton.ui';

describe('Skeleton', () => {
  it('should render without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply aria-hidden for accessibility', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply numeric width as px', () => {
    const { container } = render(<Skeleton width={200} />);
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  it('should apply string width directly', () => {
    const { container } = render(<Skeleton width="50%" />);
    expect(container.firstChild).toHaveStyle({ width: '50%' });
  });

  it('should apply circle variant class', () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />);
    expect(container.firstChild).toHaveClass('ds-skeleton--circle');
  });

  it('should apply text variant class', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('ds-skeleton--text');
  });
});
