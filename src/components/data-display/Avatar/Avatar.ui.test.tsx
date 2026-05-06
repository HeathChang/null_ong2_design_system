import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar.ui';

describe('Avatar', () => {
  it('should render image when src is provided', () => {
    render(<Avatar src="/me.jpg" name="홍길동" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should use name as alt when alt is not provided', () => {
    render(<Avatar src="/me.jpg" name="홍길동" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', '홍길동');
  });

  it('should render initials when src is not provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render single name initials (max 2 chars)', () => {
    render(<Avatar name="홍길동" />);
    expect(screen.getByText('홍길')).toBeInTheDocument();
  });

  it('should fallback to initials when image fails to load', () => {
    render(<Avatar src="/broken.jpg" name="John Doe" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render "?" when no name and no image', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('should apply size class', () => {
    const { container } = render(<Avatar name="A" size="lg" />);
    expect(container.firstChild).toHaveClass('ds-avatar--lg');
  });

  it('should apply shape class', () => {
    const { container } = render(<Avatar name="A" shape="square" />);
    expect(container.firstChild).toHaveClass('ds-avatar--square');
  });
});
