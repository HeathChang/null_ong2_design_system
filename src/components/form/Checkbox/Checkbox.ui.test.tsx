import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox.ui';

describe('Checkbox', () => {
  it('should render checkbox input', () => {
    render(<Checkbox id="terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render label text', () => {
    render(<Checkbox id="terms" label="이용약관 동의" />);
    expect(screen.getByText('이용약관 동의')).toBeInTheDocument();
  });

  it('should be checked when checked prop is true', () => {
    render(<Checkbox id="terms" checked readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should be unchecked by default', () => {
    render(<Checkbox id="terms" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should call onChange with checked value when clicked', async () => {
    const handleChange = jest.fn();
    render(<Checkbox id="terms" onChange={handleChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox id="terms" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should associate label with checkbox via htmlFor', () => {
    render(<Checkbox id="terms" label="레이블" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'terms');
  });
});
