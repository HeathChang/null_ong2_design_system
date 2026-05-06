import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch.ui';

describe('Switch', () => {
  it('should render switch input with role="switch"', () => {
    render(<Switch id="notify" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render label', () => {
    render(<Switch id="notify" label="알림 받기" />);
    expect(screen.getByText('알림 받기')).toBeInTheDocument();
  });

  it('should be checked when checked prop is true', () => {
    render(<Switch id="notify" checked readOnly />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('should call onChange with checked value', async () => {
    const handleChange = jest.fn();
    render(<Switch id="notify" onChange={handleChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Switch id="notify" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('should apply size class', () => {
    const { container } = render(<Switch id="notify" size="lg" />);
    expect(container.querySelector('.ds-switch-wrapper--lg')).toBeInTheDocument();
  });
});
