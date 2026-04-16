import { render, screen } from '@testing-library/react';
import { Stack } from './Stack.ui';

describe('Stack', () => {
  it('should render as column flex by default', () => {
    render(<Stack data-testid="stack">내용</Stack>);
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({ display: 'flex', flexDirection: 'column' });
  });

  it('should apply row direction', () => {
    render(<Stack direction="row" data-testid="stack">내용</Stack>);
    expect(screen.getByTestId('stack')).toHaveStyle({ flexDirection: 'row' });
  });

  it('should apply spacing as gap', () => {
    render(<Stack spacing="lg" data-testid="stack">내용</Stack>);
    expect(screen.getByTestId('stack')).toHaveStyle({ gap: 'var(--ds-spacing-lg)' });
  });

  it('should render children', () => {
    render(
      <Stack>
        <div>첫째</div>
        <div>둘째</div>
      </Stack>
    );
    expect(screen.getByText('첫째')).toBeInTheDocument();
    expect(screen.getByText('둘째')).toBeInTheDocument();
  });
});
