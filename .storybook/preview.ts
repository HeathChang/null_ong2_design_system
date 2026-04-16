import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f9fafb' },
        { name: 'dark', value: '#111827' },
      ],
    },
    a11y: {
      // 접근성 자동 검사 활성화
      config: {},
    },
  },
};

export default preview;
