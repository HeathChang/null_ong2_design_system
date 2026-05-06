import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from './Carousel.ui';

const ITEMS = [
  <div key="1">슬라이드 1</div>,
  <div key="2">슬라이드 2</div>,
  <div key="3">슬라이드 3</div>,
];

describe('Carousel', () => {
  it('should render all slides', () => {
    render(<Carousel items={ITEMS} />);
    expect(screen.getByText('슬라이드 1')).toBeInTheDocument();
    expect(screen.getByText('슬라이드 2')).toBeInTheDocument();
    expect(screen.getByText('슬라이드 3')).toBeInTheDocument();
  });

  it('should mark first slide as active by default', () => {
    render(<Carousel items={ITEMS} />);
    const slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('should advance on next arrow click', async () => {
    render(<Carousel items={ITEMS} />);
    await userEvent.click(screen.getByLabelText('다음 슬라이드'));
    const slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('should go to specific slide via indicator click', async () => {
    render(<Carousel items={ITEMS} />);
    await userEvent.click(screen.getByLabelText('슬라이드 3'));
    const slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[2]).toHaveAttribute('aria-hidden', 'false');
  });

  it('should loop to first when next at last (loop=true)', async () => {
    render(<Carousel items={ITEMS} defaultIndex={2} loop />);
    await userEvent.click(screen.getByLabelText('다음 슬라이드'));
    const slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
  });

  it('should disable next arrow at last when loop=false', () => {
    render(<Carousel items={ITEMS} defaultIndex={2} loop={false} />);
    expect(screen.getByLabelText('다음 슬라이드')).toBeDisabled();
  });

  it('should hide arrows when showArrows=false', () => {
    render(<Carousel items={ITEMS} showArrows={false} />);
    expect(screen.queryByLabelText('이전 슬라이드')).not.toBeInTheDocument();
  });

  it('should auto-play when autoPlayInterval is set', () => {
    jest.useFakeTimers();
    render(<Carousel items={ITEMS} autoPlayInterval={1000} />);
    let slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');

    act(() => {
      jest.advanceTimersByTime(1100);
    });
    slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[1]).toHaveAttribute('aria-hidden', 'false');

    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should return null for empty items', () => {
    const { container } = render(<Carousel items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
