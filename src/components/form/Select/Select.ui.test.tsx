import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select.ui';

const OPTIONS = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
];

describe('Select', () => {
  it('should render select element', () => {
    render(<Select id="country" options={OPTIONS} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render label when provided', () => {
    render(<Select id="country" label="국가" options={OPTIONS} />);
    expect(screen.getByLabelText('국가')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<Select id="country" options={OPTIONS} />);
    expect(screen.getByRole('option', { name: '대한민국' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '미국' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '일본' })).toBeInTheDocument();
  });

  it('should render placeholder option when provided', () => {
    render(<Select id="country" options={OPTIONS} placeholder="선택하세요" />);
    expect(screen.getByRole('option', { name: '선택하세요' })).toBeInTheDocument();
  });

  it('should show error state when error is provided', () => {
    render(<Select id="country" options={OPTIONS} error="국가를 선택해주세요" />);
    expect(screen.getByRole('combobox')).toHaveClass('ds-select--error');
    expect(screen.getByText('국가를 선택해주세요')).toBeInTheDocument();
  });

  it('should call onChange when option is selected', async () => {
    const handleChange = jest.fn();
    render(<Select id="country" options={OPTIONS} onChange={handleChange} />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'us');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Select id="country" options={OPTIONS} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });


  describe('id 자동 생성', () => {
    it('should associate the label with the select when no id is given', () => {
      render(<Select label="국가" options={[{ value: 'kr', label: '대한민국' }]} />);
      expect(screen.getByLabelText('국가')).toBeInTheDocument();
    });

    it('should point aria-describedby at its own error message', () => {
      render(
        <Select label="국가" options={[]} error="국가를 선택하세요" />
      );
      const select = screen.getByLabelText('국가');
      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).not.toBeNull();
      expect(document.getElementById(describedBy as string)).toHaveTextContent('국가를 선택하세요');
    });
  });


  describe('플레이스홀더', () => {
    it('should start on the placeholder option', () => {
      render(
        <Select
          label="국가"
          placeholder="선택하세요"
          options={[
            { value: 'kr', label: '대한민국' },
            { value: 'jp', label: '일본' },
          ]}
        />
      );
      const select = screen.getByLabelText('국가');
      // 브라우저는 초기 선택에서 disabled 옵션을 건너뛴다 —
      // 명시하지 않으면 첫 실제 옵션이 선택되어 플레이스홀더가 절대 보이지 않는다.
      expect(select.value).toBe('');
      expect(screen.getByRole('option', { name: '선택하세요' }).selected).toBe(true);
    });

    it('should respect an explicit defaultValue over the placeholder', () => {
      render(
        <Select
          label="국가"
          placeholder="선택하세요"
          defaultValue="jp"
          options={[
            { value: 'kr', label: '대한민국' },
            { value: 'jp', label: '일본' },
          ]}
        />
      );
      expect((screen.getByLabelText('국가')).value).toBe('jp');
    });
  });

  describe('aria-describedby 병합', () => {
    it('should keep its own error description when the consumer adds one', () => {
      render(
        <Select
          label="국가"
          options={[]}
          error="국가를 선택하세요"
          aria-describedby="external-note"
        />
      );
      const select = screen.getByLabelText('국가');
      const describedBy = select.getAttribute('aria-describedby') ?? '';
      const errorId = document.querySelector('.ds-field-error')?.id ?? '';

      expect(describedBy.split(' ')).toContain(errorId);
      expect(describedBy.split(' ')).toContain('external-note');
    });
  });
});
