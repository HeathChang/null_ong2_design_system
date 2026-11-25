import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs.ui';

function renderTabs(defaultValue = 'a') {
  return render(
    <Tabs.Root defaultValue={defaultValue}>
      <Tabs.List aria-label="섹션">
        <Tabs.Trigger value="a">A</Tabs.Trigger>
        <Tabs.Trigger value="b">B</Tabs.Trigger>
        <Tabs.Trigger value="c">C</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">패널 A</Tabs.Panel>
      <Tabs.Panel value="b">패널 B</Tabs.Panel>
      <Tabs.Panel value="c">패널 C</Tabs.Panel>
    </Tabs.Root>
  );
}

describe('Tabs', () => {
  it('should render all triggers', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'B' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'C' })).toBeInTheDocument();
  });

  it('should render only the active panel', () => {
    renderTabs('a');
    expect(screen.getByText('패널 A')).toBeInTheDocument();
    expect(screen.queryByText('패널 B')).not.toBeInTheDocument();
  });

  it('should switch panel on trigger click', async () => {
    renderTabs('a');
    await userEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByText('패널 B')).toBeInTheDocument();
    expect(screen.queryByText('패널 A')).not.toBeInTheDocument();
  });

  it('should mark active trigger with aria-selected', async () => {
    renderTabs('a');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'false');

    await userEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('should navigate with arrow keys', async () => {
    renderTabs('a');
    const tabA = screen.getByRole('tab', { name: 'A' });
    tabA.focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();

    // 마지막에서 다음으로 → 처음으로 순환
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
  });

  it('should throw when subcomponent used outside Root', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <Tabs.List>
          <Tabs.Trigger value="x">X</Tabs.Trigger>
        </Tabs.List>
      )
    ).toThrow();
    spy.mockRestore();
  });


  describe('기본 선택 보정', () => {
    function renderWithoutDefault() {
      return render(
        <Tabs.Root>
          <Tabs.List aria-label="섹션">
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="a">패널 A</Tabs.Panel>
          <Tabs.Panel value="b">패널 B</Tabs.Panel>
        </Tabs.Root>
      );
    }

    it('should select the first tab when defaultValue is omitted', () => {
      renderWithoutDefault();
      expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('패널 A')).toBeInTheDocument();
    });

    it('should keep the tab list reachable by keyboard', () => {
      renderWithoutDefault();
      expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '0');
    });

    it('should recover when the selected value matches no trigger', () => {
      render(
        <Tabs.Root defaultValue="없는값">
          <Tabs.List aria-label="섹션">
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="a">패널 A</Tabs.Panel>
        </Tabs.Root>
      );
      expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should leave a controlled value alone', () => {
      render(
        <Tabs.Root value="없는값" onChange={() => {}}>
          <Tabs.List aria-label="섹션">
            <Tabs.Trigger value="a">A</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="a">패널 A</Tabs.Panel>
        </Tabs.Root>
      );
      expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Home/End 키', () => {
    it('should jump to the first and last trigger', async () => {
      renderTabs('b');
      const tabB = screen.getByRole('tab', { name: 'B' });
      tabB.focus();

      await userEvent.keyboard('{End}');
      expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();

      await userEvent.keyboard('{Home}');
      expect(screen.getByRole('tab', { name: 'A' })).toHaveFocus();
    });
  });

  describe('탭과 패널의 연결', () => {
    it('should point aria-controls only at a panel that exists', () => {
      renderTabs('a');
      const selected = screen.getByRole('tab', { name: 'A' });
      const controls = selected.getAttribute('aria-controls');

      expect(controls).not.toBeNull();
      expect(document.getElementById(controls as string)).toBe(screen.getByRole('tabpanel'));
      // 비활성 탭의 패널은 마운트되지 않으므로 가리킬 대상이 없다.
      expect(screen.getByRole('tab', { name: 'B' })).not.toHaveAttribute('aria-controls');
    });

    it('should keep the references intact when a value contains spaces', () => {
      render(
        <Tabs.Root defaultValue="내 정보">
          <Tabs.List aria-label="섹션">
            <Tabs.Trigger value="내 정보">내 정보</Tabs.Trigger>
            <Tabs.Trigger value="내 설정">내 설정</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="내 정보">정보 패널</Tabs.Panel>
          <Tabs.Panel value="내 설정">설정 패널</Tabs.Panel>
        </Tabs.Root>
      );
      const tab = screen.getByRole('tab', { name: '내 정보' });
      // 공백이 id에 섞이면 이름 참조가 깨져 패널이 이름 없이 노출된다.
      expect(screen.getByRole('tabpanel', { name: '내 정보' })).toHaveAttribute(
        'id',
        tab.getAttribute('aria-controls')
      );
      expect(tab.id).not.toMatch(/\s/);
    });

    it('should skip a disabled first tab when picking the default', () => {
      render(
        <Tabs.Root>
          <Tabs.List aria-label="섹션">
            <Tabs.Trigger value="a" disabled>
              A
            </Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="a">패널 A</Tabs.Panel>
          <Tabs.Panel value="b">패널 B</Tabs.Panel>
        </Tabs.Root>
      );
      expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('패널 B')).toBeInTheDocument();
    });
  });
});
