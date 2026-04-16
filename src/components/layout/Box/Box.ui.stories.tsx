import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box.ui';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    padding: 'md',
    borderRadius: 'lg',
    bg: 'var(--ds-color-neutral-100)',
    children: 'Box 컴포넌트',
    style: { display: 'inline-block' },
  },
};

export const Polymorphic: Story = {
  render: () => (
    <Box as="section" padding="lg" bg="var(--ds-color-primary-50)" borderRadius="xl">
      <p>이 Box는 &lt;section&gt; 요소로 렌더링됩니다</p>
    </Box>
  ),
};

export const Nested: Story = {
  render: () => (
    <Box padding="lg" bg="var(--ds-color-neutral-50)" borderRadius="lg">
      <Box padding="md" bg="var(--ds-color-neutral-0)" borderRadius="md">
        중첩된 Box
      </Box>
    </Box>
  ),
};
