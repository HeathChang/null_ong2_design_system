#!/usr/bin/env node
/**
 * tsup 빌드 후 처리 스크립트
 *
 * 하는 일:
 *   1. dist/index.{js,mjs} 첫 줄에 "use client" 주입
 *   2. dist/index.css 압축
 *   3. 남아 있는 sourceMappingURL 주석 제거 (맵 파일은 배포하지 않는다)
 *
 * CSS를 여기서 따로 압축하는 이유:
 *   tsup의 `minify`는 JS와 CSS에 동시에 적용되는데, JS를 압축하면 esbuild가
 *   함수 이름을 망가뜨린다. 이름을 지키려고 `keepNames`를 켜면 `__name()` 최상위 호출이
 *   붙어 트리셰이킹이 통째로 죽는다(측정: Button 하나 import가 2.3KB → 29.6KB).
 *   그래서 JS는 압축하지 않고(소비자 번들러가 압축한다) CSS만 여기서 압축한다.
 *
 * 배경:
 *   tsup의 banner 옵션은 esbuild를 거치면서 `splitting: true` 환경에서
 *   "use client" 같은 모듈 레벨 지시자를 무시한다 (esbuild 경고 출력).
 *   따라서 빌드 후 출력 JS 파일들의 첫 줄에 "use client"를 직접 prepend한다.
 *
 * 대상:
 *   dist/index.js (CJS)
 *   dist/index.mjs (ESM)
 *
 * 효과:
 *   소비자가 React Server Component 환경(Next.js App Router 등)에서
 *   ds 컴포넌트를 import할 때 자동으로 클라이언트 경계가 형성된다.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { transform } from 'esbuild';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

const DIRECTIVE = '"use client";\n';
const TARGETS = ['index.mjs', 'index.js'];

let injected = 0;
for (const file of TARGETS) {
  const filePath = resolve(distDir, file);
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    console.warn(`[inject-use-client] 건너뜀: ${file} (존재하지 않음)`);
    continue;
  }

  // 이미 첫 줄에 "use client"가 있으면 중복 주입 방지
  if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
    continue;
  }

  writeFileSync(filePath, DIRECTIVE + content, 'utf8');
  injected += 1;
}

console.log(`[inject-use-client] "use client" 지시자 주입 완료: ${injected}개 파일`);

/*
 * CSS 압축 + sourceMappingURL 정리.
 * CSS 소스맵은 package.json "files"에서 제외되어 배포되지 않는다.
 * 주석만 남으면 소비자 devtools가 없는 파일을 404로 요청하므로 지운다.
 */
const cssPath = resolve(distDir, 'index.css');
try {
  const css = readFileSync(cssPath, 'utf8');
  const { code } = await transform(css, { loader: 'css', minify: true });
  writeFileSync(cssPath, code, 'utf8');
  console.log(
    `[inject-use-client] index.css 압축 완료: ${css.length} → ${code.length} bytes`,
  );
} catch (error) {
  console.warn(`[inject-use-client] index.css 처리 실패: ${error.message}`);
}

/*
 * 맵 파일은 package.json "files"에 없어 배포되지 않는다.
 * 주석만 남으면 소비자 devtools가 없는 파일을 404로 요청하므로 전부 지운다.
 */
const SOURCEMAP_COMMENT = /^\s*\/[/*]#\s*sourceMappingURL=.*$/gm;
let cleaned = 0;
for (const file of [...TARGETS, 'index.css']) {
  const filePath = resolve(distDir, file);
  try {
    const content = readFileSync(filePath, 'utf8');
    const stripped = content.replace(SOURCEMAP_COMMENT, '').trimEnd() + '\n';
    if (stripped !== content) {
      writeFileSync(filePath, stripped, 'utf8');
      cleaned += 1;
    }
  } catch {
    // 없는 파일은 건너뛴다.
  }
}
if (cleaned > 0) {
  console.log(`[inject-use-client] sourceMappingURL 주석 제거: ${cleaned}개 파일`);
}
