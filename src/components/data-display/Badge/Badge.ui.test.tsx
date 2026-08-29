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

  it('should not render children visually when dot is true', () => {
    const { container } = render(<Badge dot variant="danger">알림</Badge>);
    expect(container.firstChild).toHaveClass('ds-badge--dot');
    // 점만 그리지만 children을 버리지는 않는다 — 스크린리더에는 남긴다.
    expect(screen.getByText('알림')).toHaveClass('ds-visually-hidden');
  });

  it('should not render an empty label node when dot has no children', () => {
    const { container } = render(<Badge dot variant="danger" />);
    expect(container.querySelector('.ds-visually-hidden')).toBeNull();
  });
});
