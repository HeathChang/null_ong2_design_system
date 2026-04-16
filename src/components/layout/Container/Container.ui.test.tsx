import { render, screen } from '@testing-library/react';
import { Container } from './Container.ui';

describe('Container', () => {
  it('should render with default maxWidth class', () => {
    render(<Container data-testid="container">내용</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('ds-container--lg');
  });

  it('should apply specified maxWidth class', () => {
    render(<Container maxWidth="xl" data-testid="container">내용</Container>);
    expect(screen.getByTestId('container')).toHaveClass('ds-container--xl');
  });

  it('should apply ds-container base class', () => {
    render(<Container data-testid="container">내용</Container>);
    expect(screen.getByTestId('container')).toHaveClass('ds-container');
  });

  it('should render as specified element', () => {
    render(<Container as="main" data-testid="container">내용</Container>);
    expect(screen.getByTestId('container').tagName).toBe('MAIN');
  });

  it('should render children', () => {
    render(<Container>페이지 내용</Container>);
    expect(screen.getByText('페이지 내용')).toBeInTheDocument();
  });
});
