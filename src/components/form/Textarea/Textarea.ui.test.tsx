import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea.ui';

describe('Textarea', () => {
  it('should render textarea element', () => {
    render(<Textarea id="desc" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render label when provided', () => {
    render(<Textarea id="desc" label="설명" />);
    expect(screen.getByLabelText('설명')).toBeInTheDocument();
  });

  it('should show error state when error is provided', () => {
    render(<Textarea id="desc" error="내용을 입력해주세요" />);
    expect(screen.getByRole('textbox')).toHaveClass('ds-textarea--error');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show error message', () => {
    render(<Textarea id="desc" error="오류 메시지" />);
    expect(screen.getByText('오류 메시지')).toBeInTheDocument();
  });

  it('should accept user input', async () => {
    render(<Textarea id="desc" />);
    await userEvent.type(screen.getByRole('textbox'), '테스트 내용');
    expect(screen.getByRole('textbox')).toHaveValue('테스트 내용');
  });
});
