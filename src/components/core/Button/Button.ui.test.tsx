import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button.ui';

describe('Button', () => {
  describe('렌더링', () => {
    it('should render button with children text', () => {
      render(<Button>클릭하세요</Button>);
      expect(screen.getByRole('button', { name: '클릭하세요' })).toBeInTheDocument();
    });

    it('should apply default variant and size classes', () => {
      render(<Button>버튼</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ds-btn--primary');
      expect(button).toHaveClass('ds-btn--md');
    });

    it('should apply variant class correctly', () => {
      render(<Button variant="danger">삭제</Button>);
      expect(screen.getByRole('button')).toHaveClass('ds-btn--danger');
    });

    it('should apply size class correctly', () => {
      render(<Button size="lg">큰 버튼</Button>);
      expect(screen.getByRole('button')).toHaveClass('ds-btn--lg');
    });
  });

  describe('상태', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>비활성화</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should be disabled during loading state', () => {
      render(<Button isLoading>로딩 중</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should show spinner when isLoading is true', () => {
      render(<Button isLoading>로딩 중</Button>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should not show spinner when not loading', () => {
      render(<Button>버튼</Button>);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('인터랙션', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>클릭</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>클릭</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = jest.fn();
      render(<Button isLoading onClick={handleClick}>클릭</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('아이콘', () => {
    it('should render leftIcon when not loading', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon" />}>버튼</Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should not render leftIcon during loading', () => {
      render(
        <Button isLoading leftIcon={<span data-testid="left-icon" />}>
          버튼
        </Button>
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    });

    it('should render rightIcon when not loading', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon" />}>버튼</Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('should forward ref to button element', () => {
      const ref = { current: null };
      render(<Button ref={ref}>버튼</Button>);
      expect(ref.current).not.toBeNull();
    });

    it('should pass through custom aria attributes', () => {
      render(<Button aria-label="커스텀 레이블">버튼</Button>);
      expect(screen.getByRole('button', { name: '커스텀 레이블' })).toBeInTheDocument();
    });
  });
});
