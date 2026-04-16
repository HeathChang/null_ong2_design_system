import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading.ui';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    as: 'h2',
    children: '섹션 제목',
  },
};

export const Levels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Heading as="h1">H1 — 페이지 메인 제목</Heading>
      <Heading as="h2">H2 — 섹션 제목</Heading>
      <Heading as="h3">H3 — 서브 섹션</Heading>
      <Heading as="h4">H4 — 상세 섹션</Heading>
      <Heading as="h5">H5 — 소 섹션</Heading>
      <Heading as="h6">H6 — 최소 섹션</Heading>
    </div>
  ),
};

export const VisualOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Heading as="h2" size="sm">
        h2이지만 시각적으로 sm 크기 (SEO 구조와 시각 디자인 분리)
      </Heading>
      <Heading as="h1" size="xl">
        h1이지만 시각적으로 xl 크기
      </Heading>
    </div>
  ),
};
