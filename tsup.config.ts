import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  // sourcemap은 빌드 시에는 만들지만 publish에서는 제외 (.npmignore)한다.
  sourcemap: true,
  clean: true,
  // CSS는 별도 파일(dist/index.css)로 추출해 SSR HTML에 인라인 가능하게 한다.
  injectStyle: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  // 번들 사이즈 최적화: JS 압축 + CSS 압축
  minify: true,
  // React DevTools에서 컴포넌트 이름이 보이도록 함수/클래스 이름은 유지
  keepNames: true,
  // Note: "use client" 지시자는 esbuild가 splitting 환경에서 무시하므로
  // 빌드 후 scripts/inject-use-client.mjs로 직접 prepend한다.
});
