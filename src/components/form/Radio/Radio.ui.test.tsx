import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio.ui';

describe('Radio', () => {
  it('should render radio input', () => {
    render(<Radio id="opt1" name="option" value="1" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should render label text', () => {
    render(<Radio id="opt1" name="option" value="1" label="옵션 1" />);
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
  });

  it('should be checked when checked prop is true', () => {
    render(<Radio id="opt1" name="option" value="1" checked readOnly />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should call onChange with value when clicked', async () => {
    const handleChange = jest.fn();
    render(<Radio id="opt1" name="option" value="option-a" onChange={handleChange} />);
    await userEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledWith('option-a', expect.anything());
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Radio id="opt1" name="option" value="1" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
