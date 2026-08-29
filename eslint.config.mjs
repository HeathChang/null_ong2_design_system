// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * ESLint 설정 (flat config).
 *
 * 목적은 스타일 통일이 아니라 **버그 예방**이다.
 * - react-hooks: 의존성 배열 누락처럼 조용히 동작하지 않는 훅을 잡는다.
 *   (v0.2.3에서 Modal 포커스 트랩이 한 번도 동작하지 않은 종류의 결함)
 * - jsx-a11y: 이름 없는 컨트롤, 잘못된 role 조합을 컴파일 타임에 잡는다.
 * - typescript-eslint: `any`, floating promise, 불필요한 조건 등.
 */
export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'storybook-static/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        // 테스트·스토리 파일은 배포용 tsconfig에서 제외돼 있어 린트 전용 프로젝트를 따로 둔다.
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // .ruler/base.md — any 금지
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // .ruler/base.md — 사용하지 않는 import는 즉시 제거
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // 디버깅용 console 커밋 금지. warn/error는 진단 목적으로 허용한다.
      'no-console': ['error', { allow: ['warn', 'error'] }],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },

  // 테스트: 단언 편의를 위해 일부 규칙을 완화한다.
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'src/__a11y__/**'],
    languageOptions: {
      globals: { ...globals.jest, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },

  // 설정/스크립트 파일은 Node 환경이고 타입 프로젝트에 포함되지 않는다.
  {
    files: ['*.config.{ts,mjs,js}', 'scripts/**', '.storybook/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-console': 'off',
    },
  },
);
