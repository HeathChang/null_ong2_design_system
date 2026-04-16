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
});
