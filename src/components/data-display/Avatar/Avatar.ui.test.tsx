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


  it('should retry the image when src changes after a failure', () => {
    const { rerender } = render(<Avatar src="/broken.jpg" name="John Doe" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('JD')).toBeInTheDocument();

    rerender(<Avatar src="/fixed.jpg" name="John Doe" />);
    const image = screen.getByRole('img');
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', '/fixed.jpg');
  });

  it('should expose initials as a named image to assistive tech', () => {
    render(<Avatar name="홍길동" />);
    expect(screen.getByRole('img', { name: '홍길동' })).toBeInTheDocument();
  });


  describe('이니셜 추출', () => {
    it.each([
      ['홍길동', '홍길'],
      ['John Doe', 'JD'],
      ['a', 'A'],
      ['ñoño pérez', 'ÑP'],
      ['John  Ronald  Reuel  Tolkien', 'JT'],
    ])('should derive initials from %s', (name, expected) => {
      render(<Avatar name={name} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it('should not split an emoji into a broken half character', () => {
      // slice(0, 2)는 UTF-16 코드 유닛 단위라 서로게이트 쌍을 반으로 잘랐다.
      render(<Avatar name="👩‍💻 개발자" />);
      const initials = document.querySelector('.ds-avatar__initials')?.textContent ?? '';
      expect(initials).toBe('👩‍💻개');
      expect(initials).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/);
    });

    it('should fall back to ? for a blank name', () => {
      render(<Avatar name="   " />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });
  });
});
