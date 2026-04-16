import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  // CSS를 JS 번들에 주입하여 zero-config 사용성 달성
  injectStyle: true,
  treeshake: true,
  external: ['react', 'react-dom'],
});
