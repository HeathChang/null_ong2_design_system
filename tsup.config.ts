import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  /*
   * 소스맵을 만들지 않는다.
   * package.json "files"에 map을 넣지 않으므로 배포본에는 어차피 포함되지 않고,
   * sourceMappingURL 주석만 남아 소비자 devtools가 없는 파일을 404로 요청한다.
   * 게다가 아래 minify:false로 dist가 원본 그대로 읽히므로 맵이 필요 없다.
   */
  sourcemap: false,
  clean: true,
  // CSS는 별도 파일(dist/index.css)로 추출해 SSR HTML에 인라인 가능하게 한다.
  injectStyle: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  /*
   * JS는 압축하지 않는다 — 소비자의 번들러가 압축하는 편이 낫다.
   *   - 압축하면 esbuild가 함수 이름을 망가뜨려 React DevTools에 최소화된 이름이 뜬다.
   *   - 이름을 지키려고 keepNames를 켜면 아래 이유로 트리셰이킹이 죽는다.
   *   - 압축하지 않은 상태로도 소비자 번들 크기는 동일하다 (측정: brotli 29.5KB로 같음).
   * CSS는 소비자가 그대로 서빙할 수 있으므로 scripts/inject-use-client.mjs에서 따로 압축한다.
   */
  minify: false,
  /*
   * keepNames는 켜면 안 된다.
   * esbuild가 모든 선언 뒤에 `__name(fn, "fn")` 최상위 호출을 붙이는데, 이게 부수효과로
   * 취급되어 **트리셰이킹이 통째로 무력화**된다. (`import { Button }` 하나가 29.6KB →
   * 끄면 2.3KB) 위에서 minify를 끄므로 함수 이름은 그대로 남아 DevTools에도 정상 표시된다.
   */
  keepNames: false,
  // Note: "use client" 지시자는 esbuild가 splitting 환경에서 무시하므로
  // 빌드 후 scripts/inject-use-client.mjs로 직접 prepend한다.
});
