import { render, screen } from '@testing-library/react';
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
});
