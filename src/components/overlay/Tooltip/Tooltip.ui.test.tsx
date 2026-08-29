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


  it('should point aria-describedby at the rendered tooltip element', async () => {
    render(
      <Tooltip content="툴팁 내용" delay={0}>
        <button>버튼</button>
      </Tooltip>
    );
    await userEvent.tab();

    const tooltip = await screen.findByRole('tooltip');
    const trigger = screen.getByRole('button', { name: '버튼' });
    const describedBy = trigger.getAttribute('aria-describedby');

    expect(describedBy).not.toBeNull();
    expect(tooltip).toHaveAttribute('id', describedBy);
    expect(document.getElementById(describedBy as string)).toHaveTextContent('툴팁 내용');
  });

  it('should render the tooltip outside its clipping ancestor', async () => {
    render(
      <div style={{ overflow: 'hidden' }} data-testid="clipper">
        <Tooltip content="툴팁 내용" delay={0}>
          <button>버튼</button>
        </Tooltip>
      </div>
    );
    await userEvent.tab();

    const tooltip = await screen.findByRole('tooltip');
    expect(screen.getByTestId('clipper')).not.toContainElement(tooltip);
  });


  it('should not reappear on its own after being disabled while open', async () => {
    const { rerender } = render(
      <Tooltip content="툴팁 내용" delay={0}>
        <button>버튼</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    rerender(
      <Tooltip content="툴팁 내용" delay={0} disabled>
        <button>버튼</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip content="툴팁 내용" delay={0}>
        <button>버튼</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });


  describe('잘못된 children', () => {
    it('should explain what to do when given a bare string', () => {
      expect(() =>
        render(<Tooltip content="도움말">{'저장' as never}</Tooltip>)
      ).toThrow(/단일 React 엘리먼트가 필요합니다/);
    });

    it('should reject a Fragment because ref cannot attach to it', () => {
      expect(() =>
        render(
          <Tooltip content="도움말">
            {(
              <>
                <button type="button">a</button>
                <button type="button">b</button>
              </>
            ) as never}
          </Tooltip>
        )
      ).toThrow(/Fragment/);
    });
  });
});
