import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip.ui';

describe('Tooltip', () => {
  it('should render children', () => {
    render(
      <Tooltip content="툴팁 내용">
        <button>버튼</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('should not show tooltip initially', () => {
    render(
      <Tooltip content="툴팁 내용">
        <button>버튼</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should show tooltip on focus', async () => {
    render(
      <Tooltip content="툴팁 내용" delay={0}>
        <button>버튼</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('should not show tooltip when disabled', async () => {
    render(
      <Tooltip content="툴팁 내용" disabled>
        <button>버튼</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
