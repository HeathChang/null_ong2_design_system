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


  describe('id 자동 생성', () => {
    it('should associate the label with the input when no id is given', () => {
      render(<Input label="이메일" />);
      const input = screen.getByLabelText('이메일');
      expect(input).toBeInTheDocument();
      expect(input.id).not.toBe('');
    });

    it('should give two id-less inputs distinct describedby targets', () => {
      render(
        <>
          <Input label="첫 번째" error="첫 번째 오류" />
          <Input label="두 번째" error="두 번째 오류" />
        </>
      );
      const first = screen.getByLabelText('첫 번째');
      const second = screen.getByLabelText('두 번째');

      const firstDescribedBy = first.getAttribute('aria-describedby');
      const secondDescribedBy = second.getAttribute('aria-describedby');
      expect(firstDescribedBy).not.toBeNull();
      expect(firstDescribedBy).not.toBe(secondDescribedBy);
      expect(document.getElementById(firstDescribedBy as string)).toHaveTextContent('첫 번째 오류');
      expect(document.getElementById(secondDescribedBy as string)).toHaveTextContent('두 번째 오류');
    });

    it('should keep an explicitly provided id', () => {
      render(<Input id="custom" label="이메일" />);
      expect(screen.getByLabelText('이메일')).toHaveAttribute('id', 'custom');
    });
  });


  describe('aria-describedby 병합', () => {
    it('should not drop its error description when the consumer supplies one', () => {
      render(<Input label="이메일" error="형식 오류" aria-describedby="external-note" />);
      const input = screen.getByLabelText('이메일');
      const describedBy = input.getAttribute('aria-describedby') ?? '';
      const errorId = document.querySelector('.ds-field-error')?.id ?? '';

      expect(errorId).not.toBe('');
      expect(describedBy.split(' ')).toContain(errorId);
      expect(describedBy.split(' ')).toContain('external-note');
    });

    it('should keep the hint description alongside a consumer value', () => {
      render(<Input label="비밀번호" hint="8자 이상" aria-describedby="external-note" />);
      const describedBy =
        screen.getByLabelText('비밀번호').getAttribute('aria-describedby') ?? '';
      const hintId = document.querySelector('.ds-field-hint')?.id ?? '';

      expect(describedBy.split(' ')).toContain(hintId);
      expect(describedBy.split(' ')).toContain('external-note');
    });

    it('should not emit aria-describedby when there is nothing to describe', () => {
      render(<Input label="이름" />);
      expect(screen.getByLabelText('이름')).not.toHaveAttribute('aria-describedby');
    });
  });
});
