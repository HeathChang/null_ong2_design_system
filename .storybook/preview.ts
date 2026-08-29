import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/components.css';

/**
 * 툴바에서 테마를 바꾸면 <html>의 data-theme을 갈아끼운다.
 * 토큰이 data-theme / .dark / prefers-color-scheme 세 경로를 모두 지원하므로
 * 여기서는 가장 명시적인 data-theme을 쓴다.
 */
function applyTheme(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: '디자인 토큰 테마',
      defaultValue: 'light',
      toolbar: {
        title: '테마',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: '라이트' },
          { value: 'dark', icon: 'moon', title: '다크' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      applyTheme(String(context.globals['theme'] ?? 'light'));
      return Story();
    },
  ],
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
        { name: 'dark', value: '#0b0f19' },
      ],
    },
    a11y: {
      // 접근성 자동 검사 활성화
      config: {},
    },
  },
};

export default preview;
