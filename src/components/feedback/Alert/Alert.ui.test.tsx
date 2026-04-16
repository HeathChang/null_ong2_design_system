import { render, screen } from '@testing-library/react';
import { Alert } from './Alert.ui';

describe('Alert', () => {
  it('should render children content', () => {
    render(<Alert>알림 메시지입니다</Alert>);
    expect(screen.getByText('알림 메시지입니다')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<Alert title="성공">작업이 완료되었습니다</Alert>);
    expect(screen.getByText('성공')).toBeInTheDocument();
  });

  it('should not render title element when title is not provided', () => {
    render(<Alert>내용</Alert>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should use role="alert" for warning variant', () => {
    render(<Alert variant="warning">경고</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should use role="alert" for danger variant', () => {
    render(<Alert variant="danger">오류</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should use role="status" for info variant', () => {
    render(<Alert variant="info">정보</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should apply variant class', () => {
    render(<Alert variant="success">성공</Alert>);
    expect(screen.getByRole('status')).toHaveClass('ds-alert--success');
  });

  it('should render custom icon when provided', () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>내용</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
