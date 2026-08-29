import { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.ui';

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="제목">
        본문
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen onClose={() => {}} title="제목">
        본문
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render title and body', () => {
    render(
      <Modal isOpen onClose={() => {}} title="확인">
        삭제하시겠습니까?
      </Modal>
    );
    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('삭제하시겠습니까?')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        본문
      </Modal>
    );
    await userEvent.click(screen.getByLabelText('닫기'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call onClose on ESC key', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        본문
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not close on ESC when closeOnEscape is false', async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} closeOnEscape={false}>
        본문
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should render footer when provided', () => {
    render(
      <Modal isOpen onClose={() => {}} footer={<button>확인</button>}>
        본문
      </Modal>
    );
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('should set aria-modal="true"', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        본문
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });


  describe('배경 처리', () => {
    it('should lock body scroll while open', () => {
      const { unmount } = render(
        <Modal isOpen onClose={() => {}}>
          본문
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('should hide background siblings from assistive tech', () => {
      const background = document.createElement('div');
      document.body.appendChild(background);

      const { unmount } = render(
        <Modal isOpen onClose={() => {}}>
          본문
        </Modal>
      );
      expect(background).toHaveAttribute('aria-hidden', 'true');
      expect(background).toHaveAttribute('inert');

      unmount();
      expect(background).not.toHaveAttribute('aria-hidden');
      background.remove();
    });
  });

  describe('오버레이 클릭', () => {
    function getOverlay(): HTMLElement {
      const overlay = document.querySelector('.ds-modal-overlay');
      if (overlay === null) throw new Error('오버레이를 찾지 못했습니다');
      return overlay as HTMLElement;
    }

    it('should close when the overlay itself is clicked', async () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose}>
          본문
        </Modal>
      );

      await userEvent.click(getOverlay());
      expect(handleClose).toHaveBeenCalled();
    });

    it('should not close when closeOnOverlayClick is false', async () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose} closeOnOverlayClick={false}>
          본문
        </Modal>
      );

      await userEvent.click(getOverlay());
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should not close when a drag started inside the dialog ends on the overlay', () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen onClose={handleClose}>
          <span data-testid="body-text">드래그할 본문</span>
        </Modal>
      );

      const overlay = getOverlay();
      // 본문에서 마우스를 누르고 오버레이에서 떼면 click은 공통 조상인 오버레이에서 발생한다.
      fireEvent.mouseDown(screen.getByTestId('body-text'));
      fireEvent.mouseUp(overlay);
      fireEvent.click(overlay);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('겹친 모달', () => {
    it('should only close the topmost modal on ESC', async () => {
      const closeOuter = jest.fn();
      const closeInner = jest.fn();

      render(
        <>
          <Modal isOpen onClose={closeOuter} title="바깥">
            바깥 본문
          </Modal>
          <Modal isOpen onClose={closeInner} title="안쪽">
            안쪽 본문
          </Modal>
        </>
      );

      await userEvent.keyboard('{Escape}');
      expect(closeInner).toHaveBeenCalledTimes(1);
      expect(closeOuter).not.toHaveBeenCalled();
    });
  });


  describe('포커스 관리', () => {
    it('should move focus into the dialog when opened', () => {
      render(
        <Modal isOpen onClose={() => {}} title="제목">
          <button type="button">본문 버튼</button>
        </Modal>
      );
      // 첫 포커스 가능 요소는 헤더의 닫기 버튼이다.
      expect(screen.getByRole('button', { name: '닫기' })).toHaveFocus();
    });

    it('should focus the dialog itself when it has no focusable content', () => {
      render(
        <Modal isOpen onClose={() => {}} showCloseButton={false}>
          본문만 있음
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveFocus();
    });

    it('should keep Tab inside the dialog', async () => {
      render(
        <Modal isOpen onClose={() => {}} showCloseButton={false}>
          <button type="button">하나</button>
          <button type="button">둘</button>
        </Modal>
      );
      screen.getByRole('button', { name: '둘' }).focus();

      await userEvent.tab();
      expect(screen.getByRole('button', { name: '하나' })).toHaveFocus();
    });

    it('should restore focus to the opener when closed', async () => {
      function Harness() {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(true)}>
              열기
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={false}>
              본문
            </Modal>
          </>
        );
      }

      render(<Harness />);
      const opener = screen.getByRole('button', { name: '열기' });
      await userEvent.click(opener);
      expect(screen.getByRole('dialog')).toHaveFocus();

      await userEvent.keyboard('{Escape}');
      expect(opener).toHaveFocus();
    });
  });


  describe('initialFocusRef', () => {
    it('should focus the requested element instead of the close button', () => {
      function Harness() {
        const cancelRef = useRef<HTMLButtonElement>(null);
        return (
          <Modal
            isOpen
            onClose={() => {}}
            title="삭제 확인"
            initialFocusRef={cancelRef}
            footer={
              <>
                <button type="button" ref={cancelRef}>
                  취소
                </button>
                <button type="button">삭제</button>
              </>
            }
          >
            되돌릴 수 없습니다.
          </Modal>
        );
      }

      render(<Harness />);
      expect(screen.getByRole('button', { name: '취소' })).toHaveFocus();
    });
  });
});
