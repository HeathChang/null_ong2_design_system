/**
 * 컴포넌트 스타일시트 자체를 검증한다.
 *
 * jsdom에는 CSS가 적용되지 않아 "클래스 이름을 잘못 썼다", "규칙을 지웠다" 같은
 * 결함이 어떤 테스트에도 걸리지 않고 조용히 무스타일 렌더로 이어진다.
 * 파일을 파싱해 구조 수준에서 막는다.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const STYLES_DIR = __dirname;
const SRC_DIR = join(__dirname, '..');
const CSS = readFileSync(join(STYLES_DIR, 'components.css'), 'utf8');

/** 소스 트리에서 컴포넌트 구현 파일만 모은다 (테스트·스토리 제외). */
function collectSourceFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectSourceFiles(path, found);
      continue;
    }
    if (!/\.tsx?$/.test(entry)) continue;
    if (/\.(test|stories)\.tsx?$/.test(entry)) continue;
    if (entry === 'styleMock.ts') continue;
    found.push(path);
  }
  return found;
}

const SOURCE = collectSourceFiles(SRC_DIR)
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');

/** CSS에서 선언된 `.ds-*` 클래스 이름 */
function definedClasses(): Set<string> {
  const names = new Set<string>();
  const pattern = /\.(ds-[\w-]+)/g;
  let match = pattern.exec(CSS);
  while (match !== null) {
    if (match[1] !== undefined) names.add(match[1]);
    match = pattern.exec(CSS);
  }
  return names;
}

/**
 * 소스에서 쓰인 `ds-*` 이름.
 *
 * 완전한 이름(`"ds-modal__body"`)과, 템플릿 리터럴로 조립되는 접두사
 * (`` `ds-btn--${variant}` `` → `"ds-btn--"`)를 나눠서 돌려준다.
 */
function collectUsedNames(): { exact: Set<string>; prefixes: string[] } {
  const exact = new Set<string>();
  const prefixes = new Set<string>();
  const pattern = /['"`\s](ds-[\w-]+)(?=['"`\s$])/g;

  let match = pattern.exec(SOURCE);
  while (match !== null) {
    const name = match[1];
    if (name !== undefined) {
      if (name.endsWith('-')) prefixes.add(name);
      else exact.add(name);
    }
    match = pattern.exec(SOURCE);
  }
  return { exact, prefixes: [...prefixes] };
}

const DEFINED = definedClasses();
const { exact: USED, prefixes: USED_PREFIXES } = collectUsedNames();

describe('컴포넌트 스타일시트', () => {
  it('should define every class the components render', () => {
    const missing = [...USED].filter((name) => !DEFINED.has(name));
    // 오타 하나면 그 컴포넌트만 조용히 무스타일이 된다.
    expect(missing).toEqual([]);
  });

  it('should not keep rules for classes nothing renders', () => {
    const dead = [...DEFINED].filter((name) => {
      if (USED.has(name)) return false;
      // `ds-btn--primary`는 `` `ds-btn--${variant}` ``로 조립되므로 접두사로 인정한다.
      if (USED_PREFIXES.some((prefix) => name.startsWith(prefix))) return false;
      return !USED.has(name.replace(/--[\w-]+$/, ''));
    });
    expect(dead).toEqual([]);
  });

  it('should never remove a focus indicator without replacing it', () => {
    const focusRules = CSS.match(/[^}]*:focus-visible[^{]*\{[^}]*\}/g) ?? [];
    expect(focusRules.length).toBeGreaterThan(5);

    const bare = focusRules.filter(
      (rule) => rule.includes('outline: none') && !rule.includes('box-shadow'),
    );
    // outline만 지우면 키보드 사용자가 현재 위치를 잃는다.
    expect(bare).toEqual([]);
  });

  it('should honour prefers-reduced-motion', () => {
    expect(CSS).toContain('@media (prefers-reduced-motion: reduce)');
    const block = CSS.slice(CSS.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(block).toContain('animation-duration');
    expect(block).toContain('transition-duration');
  });

  it('should keep a focus indicator in Windows high contrast mode', () => {
    expect(CSS).toContain('@media (forced-colors: active)');
    const block = CSS.slice(CSS.indexOf('@media (forced-colors: active)'));
    // box-shadow는 forced-colors에서 제거되므로 outline으로 보강해야 한다.
    expect(block).toMatch(/outline:\s*2px solid/);
  });

  it('should use tokens instead of hardcoded colors', () => {
    const withoutComments = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
    const hardcoded = withoutComments.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g) ?? [];
    expect(hardcoded).toEqual([]);
  });

  it('should not contain declarations that are not CSS properties', () => {
    // `aria-hidden: true;` 같은 죽은 선언이 실제로 있었다.
    const withoutComments = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
    const ariaDeclarations = withoutComments.match(/^\s*(aria|role|data)-?[\w-]*\s*:/gm) ?? [];
    expect(ariaDeclarations).toEqual([]);
  });
});
