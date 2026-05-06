import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel.ui';

const meta: Meta<typeof Carousel> = {
  title: 'DataDisplay/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const SLIDE_BG = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

const COLORED_SLIDES = SLIDE_BG.map((color, i) => (
  <div
    key={i}
    style={{
      background: color,
      height: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '32px',
      fontWeight: 'bold',
    }}
  >
    슬라이드 {i + 1}
  </div>
));

export const Default: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel items={COLORED_SLIDES} ariaLabel="컬러 슬라이드" />
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel items={COLORED_SLIDES} autoPlayInterval={2000} ariaLabel="자동 재생" />
    </div>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel items={COLORED_SLIDES} loop={false} ariaLabel="순환 없음" />
    </div>
  ),
};

export const NoArrows: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel items={COLORED_SLIDES} showArrows={false} />
    </div>
  ),
};

export const NoIndicators: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel items={COLORED_SLIDES} showIndicators={false} />
    </div>
  ),
};
