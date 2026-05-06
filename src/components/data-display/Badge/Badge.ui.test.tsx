import { render, screen } from '@testing-library/react';
import { Badge } from './Badge.ui';

describe('Badge', () => {
  it('should render children text', () => {
    render(<Badge>활성</Badge>);
    expect(screen.getByText('활성')).toBeInTheDocument();
  });

  it('should apply variant class', () => {
    render(<Badge variant="success">완료</Badge>);
    expect(screen.getByText('완료')).toHaveClass('ds-badge--success');
  });

  it('should apply size class', () => {
    render(<Badge size="sm">소형</Badge>);
    expect(screen.getByText('소형')).toHaveClass('ds-badge--sm');
  });

  it('should not render children when dot is true', () => {
    const { container } = render(<Badge dot variant="danger">알림</Badge>);
    expect(screen.queryByText('알림')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('ds-badge--dot');
  });
});
