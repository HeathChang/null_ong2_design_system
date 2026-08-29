import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu.ui';

describe('DropdownMenu', () => {
  it('should render trigger', () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[{ key: 'a', label: '항목 A' }]}
      />
    );
    expect(screen.getByRole('button', { name: '메뉴' })).toBeInTheDocument();
  });

  it('should not show menu initially', () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[{ key: 'a', label: '항목 A' }]}
      />
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should open menu on trigger click', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'a', label: '항목 A' },
          { key: 'b', label: '항목 B' },
        ]}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: '항목 A' })).toBeInTheDocument();
  });

  it('should call onSelect and close menu on item click', async () => {
    const handleSelect = jest.fn();
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'edit', label: '수정', onSelect: handleSelect },
        ]}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }));
    await userEvent.click(screen.getByRole('menuitem', { name: '수정' }));
    expect(handleSelect).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should not call onSelect for disabled items', async () => {
    const handleSelect = jest.fn();
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'a', label: '비활성', onSelect: handleSelect, disabled: true },
        ]}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }));
    const item = screen.getByRole('menuitem', { name: '비활성' });
    expect(item).toBeDisabled();
  });


  it('should render the menu outside its clipping ancestor', async () => {
    render(
      <div style={{ overflow: 'hidden' }} data-testid="clipper">
        <DropdownMenu
          trigger={<button>메뉴</button>}
          items={[{ key: 'a', label: '항목 A' }]}
        />
      </div>
    );
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }));

    const menu = screen.getByRole('menu');
    expect(screen.getByTestId('clipper')).not.toContainElement(menu);
  });

  it('should move focus to the first item when opened with the keyboard', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'a', label: '항목 A' },
          { key: 'b', label: '항목 B' },
        ]}
      />
    );
    screen.getByRole('button', { name: '메뉴' }).focus();
    await userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 A' })).toHaveFocus();
    });
  });

  it('should move down the list with ArrowDown', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'a', label: '항목 A' },
          { key: 'b', label: '항목 B' },
        ]}
      />
    );
    screen.getByRole('button', { name: '메뉴' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 A' })).toHaveFocus();
    });

    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 B' })).toHaveFocus();
    });
  });

  it('should skip disabled items during keyboard navigation', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[
          { key: 'a', label: '항목 A' },
          { key: 'b', label: '비활성', disabled: true },
          { key: 'c', label: '항목 C' },
        ]}
      />
    );
    screen.getByRole('button', { name: '메뉴' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 A' })).toHaveFocus();
    });

    // 비활성 '비활성' 항목을 건너뛰고 바로 '항목 C'로 간다.
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 C' })).toHaveFocus();
    });
  });

  it('should return focus to the trigger after selecting an item', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[{ key: 'a', label: '항목 A' }]}
      />
    );
    const trigger = screen.getByRole('button', { name: '메뉴' });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole('menuitem', { name: '항목 A' }));

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });


  it('should select the focused item with Enter', async () => {
    const handleSelect = jest.fn();
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[{ key: 'edit', label: '수정', onSelect: handleSelect }]}
      />
    );
    screen.getByRole('button', { name: '메뉴' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '수정' })).toHaveFocus();
    });

    await userEvent.keyboard('{Enter}');
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should close on Escape and return focus to the trigger', async () => {
    render(
      <DropdownMenu
        trigger={<button>메뉴</button>}
        items={[{ key: 'a', label: '항목 A' }]}
      />
    );
    const trigger = screen.getByRole('button', { name: '메뉴' });
    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });


  it('should explain what to do when trigger is not an element', () => {
    expect(() =>
      render(<DropdownMenu trigger={'메뉴' as never} items={[{ key: 'a', label: 'A' }]} />)
    ).toThrow(/DropdownMenu.*trigger/s);
  });

  it('should keep keyboard navigation correct after items shrink', async () => {
    function App({ count }: { count: number }) {
      return (
        <DropdownMenu
          trigger={<button>메뉴</button>}
          items={Array.from({ length: count }, (_, i) => ({ key: `k${i}`, label: `항목 ${i}` }))}
        />
      );
    }
    const { rerender } = render(<App count={3} />);
    await userEvent.click(screen.getByRole('button', { name: '메뉴' }));
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);

    rerender(<App count={1} />);
    expect(screen.getAllByRole('menuitem')).toHaveLength(1);

    // 낡은 참조가 남아 있으면 방향키가 사라진 항목을 짚는다.
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: '항목 0' })).toHaveFocus();
    });
  });
});
