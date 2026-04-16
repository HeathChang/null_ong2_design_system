import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input.ui';

describe('Input', () => {
  describe('렌더링', () => {
    it('should render input element', () => {
      render(<Input id="test" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render label when provided', () => {
      render(<Input id="email" label="이메일" />);
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    });

    it('should render hint message', () => {
      render(<Input id="email" hint="올바른 이메일을 입력하세요" />);
      expect(screen.getByText('올바른 이메일을 입력하세요')).toBeInTheDocument();
    });

    it('should render error message when error is provided', () => {
      render(<Input id="email" error="이메일이 올바르지 않습니다" />);
      expect(screen.getByText('이메일이 올바르지 않습니다')).toBeInTheDocument();
    });

    it('should not render hint when error is shown', () => {
      render(<Input id="email" hint="힌트" error="오류" />);
      expect(screen.queryByText('힌트')).not.toBeInTheDocument();
    });
  });

  describe('상태', () => {
    it('should set aria-invalid when error is present', () => {
      render(<Input id="email" error="오류" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should apply error class when error is present', () => {
      render(<Input id="email" error="오류" />);
      expect(screen.getByRole('textbox')).toHaveClass('ds-input--error');
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Input id="email" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('인터랙션', () => {
    it('should update value when user types', async () => {
      const handleChange = jest.fn();
      render(<Input id="email" onChange={handleChange} />);
      await userEvent.type(screen.getByRole('textbox'), '안녕');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('should forward ref to input element', () => {
      const ref = { current: null };
      render(<Input id="email" ref={ref} />);
      expect(ref.current).not.toBeNull();
    });

    it('should mark label as required', () => {
      render(<Input id="email" label="이메일" required />);
      // required label은 * 포함
      expect(screen.getByText('이메일').closest('label')).toBeInTheDocument();
    });
  });
});
