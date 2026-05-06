#!/usr/bin/env node
/**
 * tsup 빌드 후 처리 스크립트
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
