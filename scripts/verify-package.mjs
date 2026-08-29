#!/usr/bin/env node
/**
 * 배포 산출물 검증.
 *
 * 테스트는 소스를 검증하지 실제로 npm에 올라가는 파일을 검증하지 않는다.
 * 빌드 설정이 잘못돼도(파일 누락, "use client" 유실, 깨진 CJS 등) 테스트는 전부 통과한다.
 * 이 스크립트는 `dist`를 소비자 입장에서 실제로 불러본다.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');
const require = createRequire(import.meta.url);
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

const failures = [];
const checks = [];

function check(name, fn) {
  try {
    const detail = fn();
    checks.push(`  ✅ ${name}${detail ? ` — ${detail}` : ''}`);
  } catch (error) {
    failures.push(name);
    checks.push(`  ❌ ${name} — ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// 1. package.json "files"에 적힌 파일이 실제로 존재하는가
check('files 목록의 파일이 모두 존재', () => {
  const missing = pkg.files.filter((file) => !existsSync(resolve(root, file)));
  assert(missing.length === 0, `누락: ${missing.join(', ')}`);
  return `${pkg.files.length}개`;
});

// 2. exports 맵이 가리키는 경로가 실제로 존재하는가
check('exports 맵 경로가 모두 존재', () => {
  const paths = [];
  const walk = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('./')) paths.push(value);
      return;
    }
    if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  walk(pkg.exports);
  const missing = paths.filter((file) => !existsSync(resolve(root, file)));
  assert(missing.length === 0, `누락: ${missing.join(', ')}`);
  return `${paths.length}개 경로`;
});

// 3. "use client" 지시자 — RSC 환경에서 클라이언트 경계를 만든다
check('"use client" 지시자', () => {
  for (const file of ['index.js', 'index.mjs']) {
    const content = readFileSync(resolve(dist, file), 'utf8');
    assert(content.startsWith('"use client"'), `${file} 첫 줄에 없음`);
  }
  return '2개 파일';
});

// 4. 배포하지 않는 소스맵을 가리키는 주석이 남아 있지 않은가 (소비자 devtools 404)
check('죽은 sourceMappingURL 없음', () => {
  for (const file of ['index.js', 'index.mjs', 'index.css']) {
    const content = readFileSync(resolve(dist, file), 'utf8');
    assert(!content.includes('sourceMappingURL'), `${file}에 남아 있음`);
  }
});

// 5. CSS에 스타일 로드 표식이 살아 있는가 (개발 모드 경고가 이것에 의존한다)
check('CSS 로드 표식(--ds-loaded)', () => {
  const css = readFileSync(resolve(dist, 'index.css'), 'utf8');
  assert(css.includes('--ds-loaded'), '토큰이 사라짐');
});

// 6. 다크 모드 토큰이 실제로 배포본에 들어갔는가
check('다크 모드 토큰 포함', () => {
  const css = readFileSync(resolve(dist, 'index.css'), 'utf8');
  assert(css.includes('prefers-color-scheme'), '시스템 설정 대응 블록 없음');
  assert(css.includes('data-theme'), 'data-theme 셀렉터 없음');
});

// 7. CJS가 실제로 require 되는가
const cjs = (() => {
  let loaded = null;
  check('CJS require', () => {
    loaded = require(resolve(dist, 'index.js'));
    assert(typeof loaded === 'object' && loaded !== null, 'export 객체가 아님');
    assert(loaded.Button !== undefined, 'Button이 없음');
    return `export ${Object.keys(loaded).length}개`;
  });
  return loaded;
})();

// 8. ESM이 실제로 import 되는가 + CJS와 export 집합이 같은가
const esm = await (async () => {
  let loaded = null;
  await (async () => {
    try {
      loaded = await import(pathToFileURL(resolve(dist, 'index.mjs')).href);
      checks.push(`  ✅ ESM import — export ${Object.keys(loaded).length}개`);
    } catch (error) {
      failures.push('ESM import');
      checks.push(`  ❌ ESM import — ${error.message}`);
    }
  })();
  return loaded;
})();

check('CJS/ESM export 집합 일치', () => {
  assert(cjs !== null && esm !== null, '한쪽을 불러오지 못함');
  const cjsKeys = Object.keys(cjs).sort();
  const esmKeys = Object.keys(esm).filter((k) => k !== 'default').sort();
  const onlyCjs = cjsKeys.filter((k) => !esmKeys.includes(k));
  const onlyEsm = esmKeys.filter((k) => !cjsKeys.includes(k));
  assert(
    onlyCjs.length === 0 && onlyEsm.length === 0,
    `CJS만: ${onlyCjs.join(',') || '없음'} / ESM만: ${onlyEsm.join(',') || '없음'}`,
  );
  return `${cjsKeys.length}개`;
});

// 9. 타입 선언이 실제 런타임 export를 빠짐없이 담고 있는가
check('타입 선언과 런타임 export 일치', () => {
  assert(esm !== null, 'ESM을 불러오지 못함');
  const dts = readFileSync(resolve(dist, 'index.d.ts'), 'utf8');
  const runtimeNames = Object.keys(esm).filter((k) => k !== 'default');
  const missing = runtimeNames.filter(
    (name) => !new RegExp(`\\b${name}\\b`).test(dts),
  );
  assert(missing.length === 0, `d.ts에 없음: ${missing.join(', ')}`);
  return `${runtimeNames.length}개`;
});

// 10. React를 번들에 끌어들이지 않았는가 (peer dependency로 남아야 한다)
check('React가 번들에 포함되지 않음', () => {
  const content = readFileSync(resolve(dist, 'index.mjs'), 'utf8');
  assert(
    /from\s*['"]react['"]/.test(content),
    'react를 외부 모듈로 import하지 않음 (번들에 포함된 듯)',
  );
  assert(!content.includes('ReactCurrentOwner'), 'React 내부 코드가 섞임');
});

console.log('\n배포 산출물 검증\n');
console.log(checks.join('\n'));

if (failures.length > 0) {
  console.error(`\n실패 ${failures.length}건: ${failures.join(', ')}\n`);
  process.exit(1);
}
console.log(`\n${checks.length}개 항목 모두 통과\n`);
