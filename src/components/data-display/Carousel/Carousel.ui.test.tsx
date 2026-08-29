import { act, fireEvent, render, screen } from '@testing-library/react';
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


  describe('화면 밖 슬라이드', () => {
    const LINK_ITEMS = [
      <a key="1" href="/1">첫 링크</a>,
      <a key="2" href="/2">둘째 링크</a>,
    ];

    it('should mark inactive slides inert so they leave the tab order', () => {
      render(<Carousel items={LINK_ITEMS} />);
      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[0]).not.toHaveAttribute('inert');
      expect(slides[1]).toHaveAttribute('inert');
    });

    it('should move inert to the new slide after navigating', async () => {
      render(<Carousel items={LINK_ITEMS} />);
      await userEvent.click(screen.getByLabelText('다음 슬라이드'));

      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[0]).toHaveAttribute('inert');
      expect(slides[1]).not.toHaveAttribute('inert');
    });
  });

  describe('자동 재생 정지', () => {
    it('should expose a playback toggle when auto-playing', () => {
      render(<Carousel items={ITEMS} autoPlayInterval={1000} />);
      expect(screen.getByLabelText('자동 재생 정지')).toBeInTheDocument();
    });

    it('should not expose a playback toggle when auto-play is off', () => {
      render(<Carousel items={ITEMS} />);
      expect(screen.queryByLabelText('자동 재생 정지')).not.toBeInTheDocument();
    });

    it('should stop advancing after the user presses stop', () => {
      jest.useFakeTimers();
      render(<Carousel items={ITEMS} autoPlayInterval={1000} />);

      // fake timer 환경에서 userEvent는 act 밖에서 포인터 이벤트를 흘려보내므로 fireEvent를 쓴다.
      fireEvent.click(screen.getByLabelText('자동 재생 정지'));
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
      expect(screen.getByLabelText('자동 재생 시작')).toBeInTheDocument();

      act(() => {
        jest.runOnlyPendingTimers();
      });
      jest.useRealTimers();
    });

    it('should pause while the pointer is over the carousel', () => {
      jest.useFakeTimers();
      const { container } = render(<Carousel items={ITEMS} autoPlayInterval={1000} />);
      const region = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(region);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      let slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');

      fireEvent.mouseLeave(region);
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
  });

  describe('인디케이터 키보드 조작', () => {
    it('should move to the next slide with ArrowRight', async () => {
      render(<Carousel items={ITEMS} />);
      // focus()는 캐루셀의 일시정지 상태를 바꾸므로 act로 감싼다.
      act(() => {
        screen.getByLabelText('슬라이드 1').focus();
      });

      await userEvent.keyboard('{ArrowRight}');
      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[1]).toHaveAttribute('aria-hidden', 'false');
      expect(screen.getByLabelText('슬라이드 2')).toHaveFocus();
    });

    it('should wrap to the last slide with ArrowLeft from the first', async () => {
      render(<Carousel items={ITEMS} />);
      act(() => {
        screen.getByLabelText('슬라이드 1').focus();
      });

      await userEvent.keyboard('{ArrowLeft}');
      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[2]).toHaveAttribute('aria-hidden', 'false');
    });

    it('should keep only the active indicator in the tab order', () => {
      render(<Carousel items={ITEMS} />);
      expect(screen.getByLabelText('슬라이드 1')).toHaveAttribute('tabindex', '0');
      expect(screen.getByLabelText('슬라이드 2')).toHaveAttribute('tabindex', '-1');
    });
  });


  describe('범위를 벗어난 인덱스', () => {
    function trackTransform(): string {
      const track = document.querySelector('.ds-carousel__track');
      return (track as HTMLElement).style.transform;
    }

    it('should clamp a controlled index above the last slide', () => {
      render(<Carousel items={ITEMS} index={9} onChange={() => {}} />);
      expect(trackTransform()).toBe('translateX(-200%)');

      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[2]).toHaveAttribute('aria-hidden', 'false');
    });

    it('should clamp a negative defaultIndex instead of emitting invalid CSS', () => {
      render(<Carousel items={ITEMS} defaultIndex={-5} />);
      // 클램프하지 않으면 `translateX(--500%)`라는 무효한 CSS가 나간다.
      expect(trackTransform()).toBe('translateX(-0%)');

      const slides = screen.getAllByRole('group', { hidden: true });
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    });

    it('should stay on a real slide when items shrink below the active index', async () => {
      const { rerender } = render(<Carousel items={ITEMS} />);
      await userEvent.click(screen.getByLabelText('다음 슬라이드'));
      await userEvent.click(screen.getByLabelText('다음 슬라이드'));

      rerender(<Carousel items={[<div key="1">슬라이드 1</div>]} />);
      expect(trackTransform()).toBe('translateX(-0%)');
      expect(screen.getByText('슬라이드 1')).toBeInTheDocument();
    });

    it('should always keep exactly one slide visible to assistive tech', () => {
      render(<Carousel items={ITEMS} index={99} onChange={() => {}} />);
      const visible = screen
        .getAllByRole('group', { hidden: true })
        .filter((slide) => slide.getAttribute('aria-hidden') === 'false');
      expect(visible).toHaveLength(1);
    });
  });
});
