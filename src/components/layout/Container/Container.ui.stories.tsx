import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container.ui';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

const Content = () => (
  <div
    style={{
      padding: '16px',
      background: 'var(--ds-color-primary-50)',
      border: '1px dashed var(--ds-color-primary-200)',
      borderRadius: '4px',
      fontSize: '14px',
      textAlign: 'center',
    }}
  >
    콘텐츠 영역
  </div>
);

export const Default: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Content />
    </Container>
  ),
};

export const MaxWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontSize: '12px', marginBottom: '4px', color: '#666' }}>
            maxWidth="{size}"
          </p>
          <Container maxWidth={size}>
            <Content />
          </Container>
        </div>
      ))}
    </div>
  ),
};
