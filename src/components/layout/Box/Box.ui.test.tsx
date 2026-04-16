import { render, screen } from '@testing-library/react';
import { Box } from './Box.ui';

describe('Box', () => {
  it('should render as div by default', () => {
    render(<Box data-testid="box">내용</Box>);
    expect(screen.getByTestId('box').tagName).toBe('DIV');
  });

  it('should render as specified element via as prop', () => {
    render(<Box as="section" data-testid="box">내용</Box>);
    expect(screen.getByTestId('box').tagName).toBe('SECTION');
  });

  it('should apply padding via spacing token', () => {
    render(<Box padding="md" data-testid="box">내용</Box>);
    expect(screen.getByTestId('box')).toHaveStyle({
      padding: 'var(--ds-spacing-md)',
    });
  });

  it('should apply horizontal padding', () => {
    render(<Box paddingX="sm" data-testid="box">내용</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveStyle({ paddingLeft: 'var(--ds-spacing-sm)' });
    expect(box).toHaveStyle({ paddingRight: 'var(--ds-spacing-sm)' });
  });

  it('should apply borderRadius via radius token', () => {
    render(<Box borderRadius="lg" data-testid="box">내용</Box>);
    expect(screen.getByTestId('box')).toHaveStyle({
      borderRadius: 'var(--ds-radius-lg)',
    });
  });

  it('should render children', () => {
    render(<Box>안녕하세요</Box>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });
});
