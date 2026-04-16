import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid.ui';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '16px',
      background: 'var(--ds-color-primary-100)',
      borderRadius: '6px',
      textAlign: 'center',
      fontSize: '14px',
    }}
  >
    {children}
  </div>
);

export const ThreeColumns: Story = {
  render: () => (
    <Grid columns={3} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i}>셀 {i + 1}</Cell>
      ))}
    </Grid>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <Grid columns="repeat(auto-fill, minmax(150px, 1fr))" gap="md">
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>셀 {i + 1}</Cell>
      ))}
    </Grid>
  ),
};

export const CustomGap: Story = {
  render: () => (
    <Grid columns={2} columnGap="lg" rowGap="sm">
      {Array.from({ length: 4 }, (_, i) => (
        <Cell key={i}>셀 {i + 1}</Cell>
      ))}
    </Grid>
  ),
};
