/**
 * 오버레이 레이어끼리 겹칠 때의 상호작용 검증.
 * 개별 컴포넌트 테스트로는 잡히지 않는 조합 문제를 다룬다.
 */
import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { Modal } from './Modal';
import { ToastProvider, useToast } from './Toast';
import { Tooltip } from './Tooltip';

describe('오버레이 조합', () => {
  it('should keep the toast layer reachable while a modal is open', () => {
    function App() {
      return (
        <ToastProvider>
          <Modal isOpen onClose={() => {}} title="확인">
            본문
          </Modal>
        </ToastProvider>
      );
    }
    render(<App />);

    // 모달이 배경을 inert 처리해도 토스트 레이어(data-ds-layer)는 건드리지 않는다.
    const toastRegion = screen.getByRole('region', { name: '알림' });
    const toastLayer = toastRegion.closest('[data-ds-layer="toast"]');
    expect(toastLayer).not.toBeNull();
    expect(toastLayer).not.toHaveAttribute('inert');
  });

  it('should announce a toast raised from inside a modal', async () => {
    function Trigger() {
      const toast = useToast();
      return (
        <button type="button" onClick={() => toast.danger('저장 실패')}>
          저장
        </button>
      );
    }

    render(
      <ToastProvider>
        <Modal isOpen onClose={() => {}} title="편집">
          <Trigger />
        </Modal>
      </ToastProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: '저장' }));
    expect(screen.getByRole('alert')).toHaveTextContent('저장 실패');
  });

  it('should show a tooltip opened inside a modal body', async () => {
    render(
      <Modal isOpen onClose={() => {}} title="편집">
        <Tooltip content="도움말" delay={0}>
          <button type="button">도움</button>
        </Tooltip>
      </Modal>
    );

    const trigger = screen.getByRole('button', { name: '도움' });
    await userEvent.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('도움말');
    // 모달 본문은 overflow-y:auto라 인라인 렌더였다면 잘렸다.
    expect(screen.getByRole('dialog')).not.toContainElement(tooltip);
    expect(tooltip.closest('[inert]')).toBeNull();
  });

  it('should operate a dropdown menu opened inside a modal', async () => {
    const handleSelect = jest.fn();
    render(
      <Modal isOpen onClose={() => {}} title="편집">
        <DropdownMenu
          trigger={<button type="button">옵션</button>}
          items={[{ key: 'del', label: '삭제', onSelect: handleSelect }]}
        />
      </Modal>
    );

    await userEvent.click(screen.getByRole('button', { name: '옵션' }));
    const menu = screen.getByRole('menu');
    expect(menu.closest('[inert]')).toBeNull();

    await userEvent.click(screen.getByRole('menuitem', { name: '삭제' }));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('should let Escape close the dropdown before the modal', async () => {
    function App() {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="편집">
          <DropdownMenu
            trigger={<button type="button">옵션</button>}
            items={[{ key: 'a', label: '항목 A' }]}
          />
        </Modal>
      );
    }
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: '옵션' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
    // 드롭다운만 닫히고 모달은 남아 있어야 한다.
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should restore body scroll after the last modal closes', async () => {
    function App() {
      const [outer, setOuter] = useState(true);
      const [inner, setInner] = useState(true);
      return (
        <>
          <Modal isOpen={outer} onClose={() => setOuter(false)} title="바깥">
            <button type="button" onClick={() => setOuter(false)}>
              바깥 닫기
            </button>
          </Modal>
          <Modal isOpen={inner} onClose={() => setInner(false)} title="안쪽">
            <button type="button" onClick={() => setInner(false)}>
              안쪽 닫기
            </button>
          </Modal>
        </>
      );
    }
    render(<App />);
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.click(screen.getByRole('button', { name: '안쪽 닫기' }));
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.click(screen.getByRole('button', { name: '바깥 닫기' }));
    expect(document.body.style.overflow).toBe('');
  });
});
