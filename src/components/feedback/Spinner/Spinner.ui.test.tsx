import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner.ui';

describe('Spinner', () => {
  it('should render with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with custom label for accessibility', () => {
    render(<Spinner label="데이터 불러오는 중" />);
    expect(screen.getByLabelText('데이터 불러오는 중')).toBeInTheDocument();
  });

  it('should apply size class correctly', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('ds-spinner--lg');
  });

  it('should apply additional className', () => {
    render(<Spinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
    expect(spinner).toHaveClass('ds-spinner');
  });
});
