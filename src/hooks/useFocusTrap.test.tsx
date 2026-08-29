import { useRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusTrap } from './useFocusTrap';

function Trapped({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, isActive);
  return (
    <div ref={ref} tabIndex={-1}>
      <button type="button">첫 번째</button>
      <button type="button">두 번째</button>
    </div>
  );
}

function Harness() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        열기
      </button>
      {isOpen && <Trapped isActive />}
    </>
  );
}

describe('useFocusTrap', () => {
  it('should focus the first focusable element when activated', () => {
    render(<Trapped isActive />);
    expect(screen.getByRole('button', { name: '첫 번째' })).toHaveFocus();
  });

  it('should not move focus while inactive', () => {
    render(<Trapped isActive={false} />);
    expect(screen.getByRole('button', { name: '첫 번째' })).not.toHaveFocus();
  });

  it('should wrap focus from the last element back to the first', async () => {
    render(<Trapped isActive />);
    screen.getByRole('button', { name: '두 번째' }).focus();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: '첫 번째' })).toHaveFocus();
  });

  it('should wrap backwards from the first element to the last', async () => {
    render(<Trapped isActive />);
    screen.getByRole('button', { name: '첫 번째' }).focus();

    await userEvent.tab({ shift: true });
    expect(screen.getByRole('button', { name: '두 번째' })).toHaveFocus();
  });

  it('should restore focus to the previously focused element on deactivation', async () => {
    render(<Harness />);
    const opener = screen.getByRole('button', { name: '열기' });

    await userEvent.click(opener);
    expect(screen.getByRole('button', { name: '첫 번째' })).toHaveFocus();
  });


  it('should honour an explicit initial focus target', () => {
    function TrappedWithInitial() {
      const ref = useRef<HTMLDivElement>(null);
      const secondRef = useRef<HTMLButtonElement>(null);
      useFocusTrap(ref, true, { initialFocus: secondRef });
      return (
        <div ref={ref} tabIndex={-1}>
          <button type="button">첫 번째</button>
          <button type="button" ref={secondRef}>
            두 번째
          </button>
        </div>
      );
    }

    render(<TrappedWithInitial />);
    expect(screen.getByRole('button', { name: '두 번째' })).toHaveFocus();
  });

  it('should ignore an initial focus target outside the container', () => {
    function TrappedWithOutsideInitial() {
      const ref = useRef<HTMLDivElement>(null);
      const outsideRef = useRef<HTMLButtonElement>(null);
      useFocusTrap(ref, true, { initialFocus: outsideRef });
      return (
        <>
          <button type="button" ref={outsideRef}>
            바깥
          </button>
          <div ref={ref} tabIndex={-1}>
            <button type="button">안쪽</button>
          </div>
        </>
      );
    }

    render(<TrappedWithOutsideInitial />);
    // 트랩 밖으로 포커스를 보내면 트랩의 의미가 없다.
    expect(screen.getByRole('button', { name: '안쪽' })).toHaveFocus();
  });
});
