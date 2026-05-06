import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast.ui';

function TestTrigger({ message, variant }: { message: string; variant?: 'success' | 'danger' }) {
  const toast = useToast();
  return (
    <button
      onClick={() => {
        if (variant === 'success') toast.success(message);
        else if (variant === 'danger') toast.danger(message);
        else toast.show(message);
      }}
    >
      알림
    </button>
  );
}

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should throw when useToast is used outside provider', () => {
    // 의도적 console.error 억제
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestTrigger message="X" />)).toThrow();
    spy.mockRestore();
  });

  it('should show toast when triggered', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <TestTrigger message="저장되었습니다" variant="success" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByText('저장되었습니다')).toBeInTheDocument();
  });

  it('should auto-dismiss after duration', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <TestTrigger message="자동 소멸" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByText('자동 소멸')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3100);
    });
    expect(screen.queryByText('자동 소멸')).not.toBeInTheDocument();
  });

  it('should dismiss when close button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <TestTrigger message="수동 닫기" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByText('수동 닫기')).toBeInTheDocument();

    await user.click(screen.getByLabelText('알림 닫기'));
    expect(screen.queryByText('수동 닫기')).not.toBeInTheDocument();
  });

  it('should use role="alert" for danger variant', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <TestTrigger message="오류" variant="danger" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
