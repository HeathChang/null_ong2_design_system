import { render, screen } from '@testing-library/react';
import { Grid } from './Grid.ui';

describe('Grid', () => {
  it('should render as div with display grid', () => {
    render(<Grid data-testid="grid">내용</Grid>);
    expect(screen.getByTestId('grid')).toHaveStyle({ display: 'grid' });
  });

  it('should apply numeric columns as repeat template', () => {
    render(<Grid columns={3} data-testid="grid">내용</Grid>);
    expect(screen.getByTestId('grid')).toHaveStyle({
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    });
  });

  it('should apply string columns directly', () => {
    render(<Grid columns="1fr 2fr 1fr" data-testid="grid">내용</Grid>);
    expect(screen.getByTestId('grid')).toHaveStyle({
      gridTemplateColumns: '1fr 2fr 1fr',
    });
  });

  it('should apply gap via spacing token', () => {
    render(<Grid gap="md" data-testid="grid">내용</Grid>);
    expect(screen.getByTestId('grid')).toHaveStyle({ gap: 'var(--ds-spacing-md)' });
  });

  it('should render children', () => {
    render(
      <Grid columns={2}>
        <div>셀 1</div>
        <div>셀 2</div>
      </Grid>
    );
    expect(screen.getByText('셀 1')).toBeInTheDocument();
    expect(screen.getByText('셀 2')).toBeInTheDocument();
  });
});
