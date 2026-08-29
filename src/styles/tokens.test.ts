/**
 * 디자인 토큰 자체를 검증한다.
 *
 * CSS는 jsdom에서 실제로 적용되지 않으므로 파일을 파싱해서 값 수준으로 확인한다.
 * - 라이트/다크가 같은 토큰 집합을 정의하는가
 * - 실제 색 조합이 WCAG 대비 기준을 만족하는가
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS = readFileSync(join(__dirname, 'tokens.css'), 'utf8');

/** `--ds-...: value;` 선언을 뽑아 맵으로 만든다. */
function parseBlock(block: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const pattern = /(--ds-[\w-]+)\s*:\s*([^;]+);/g;
  let match = pattern.exec(block);
  while (match !== null) {
    const [, name, value] = match;
    if (name !== undefined && value !== undefined) tokens[name] = value.trim();
    match = pattern.exec(block);
  }
  return tokens;
}

/** 셀렉터로 시작하는 첫 블록의 본문을 잘라낸다. */
function blockAfter(marker: string): string {
  const start = CSS.indexOf(marker);
  if (start === -1) throw new Error(`셀렉터를 찾지 못했습니다: ${marker}`);
  const open = CSS.indexOf('{', start);
  const end = CSS.indexOf('\n}', open);
  return CSS.slice(open, end);
}

const LIGHT = parseBlock(blockAfter(':root {'));
const DARK = parseBlock(blockAfter(":root.dark,"));

function relativeLuminance(hex: string): number {
  const normalized = hex.replace('#', '');
  const channels = [0, 2, 4].map((i) => Number.parseInt(normalized.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const [r, g, b] = linear as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(theme: Record<string, string>, fg: string, bg: string): number {
  const fgValue = theme[fg];
  const bgValue = theme[bg];
  if (fgValue === undefined) throw new Error(`토큰 없음: ${fg}`);
  if (bgValue === undefined) throw new Error(`토큰 없음: ${bg}`);
  const a = relativeLuminance(fgValue);
  const b = relativeLuminance(bgValue);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** 본문 텍스트 기준 (WCAG 2.1 AA — 1.4.3) */
const TEXT_MIN = 4.5;
/** 비텍스트 UI 구성요소 기준 (WCAG 2.1 AA — 1.4.11) */
const UI_MIN = 3;

const TEXT_PAIRS: Array<[string, string, string]> = [
  ['본문 텍스트', '--ds-color-neutral-700', '--ds-color-neutral-0'],
  ['제목 텍스트', '--ds-color-neutral-900', '--ds-color-neutral-0'],
  ['보조 텍스트', '--ds-color-neutral-500', '--ds-color-neutral-0'],
  ['primary 버튼', '--ds-color-on-primary', '--ds-color-primary-600'],
  ['primary 버튼 hover', '--ds-color-on-primary', '--ds-color-primary-700'],
  ['primary 버튼 active', '--ds-color-on-primary', '--ds-color-primary-800'],
  ['danger 버튼', '--ds-color-on-danger', '--ds-color-danger-600'],
  ['danger 버튼 hover', '--ds-color-on-danger', '--ds-color-danger-700'],
  ['에러 메시지', '--ds-color-danger-600', '--ds-color-neutral-0'],
  ['badge primary', '--ds-color-primary-700', '--ds-color-primary-100'],
  ['활성 탭', '--ds-color-primary-600', '--ds-color-neutral-0'],
  ['alert success', '--ds-color-success-text', '--ds-color-success-bg'],
  ['alert warning', '--ds-color-warning-text', '--ds-color-warning-bg'],
  ['alert danger', '--ds-color-danger-text', '--ds-color-danger-bg'],
  ['alert info', '--ds-color-info-text', '--ds-color-info-bg'],
  ['툴팁', '--ds-color-neutral-0', '--ds-color-neutral-900'],
];

const UI_PAIRS: Array<[string, string, string]> = [
  ['체크 표시', '--ds-color-control-knob', '--ds-color-primary-500'],
];

describe('디자인 토큰', () => {
  it('should parse both themes', () => {
    expect(Object.keys(LIGHT).length).toBeGreaterThan(50);
    expect(Object.keys(DARK).length).toBeGreaterThan(30);
  });

  it('should redefine every dark token in the light theme too', () => {
    const missing = Object.keys(DARK).filter((token) => LIGHT[token] === undefined);
    expect(missing).toEqual([]);
  });

  it('should override every color token in the dark theme', () => {
    const lightColors = Object.keys(LIGHT).filter((token) => token.startsWith('--ds-color-'));
    const missing = lightColors.filter((token) => DARK[token] === undefined);
    expect(missing).toEqual([]);
  });

  it('should keep the system-preference block in sync with the explicit dark block', () => {
    const auto = parseBlock(blockAfter(":root:not(.light):not([data-theme='light']) {"));
    expect(auto).toEqual(DARK);
  });

  it('should not let a dark override silently equal its light value', () => {
    const unchanged = Object.keys(DARK).filter(
      (token) => token.startsWith('--ds-color-neutral-') && DARK[token] === LIGHT[token],
    );
    expect(unchanged).toEqual([]);
  });

  it('should ship the stylesheet-loaded sentinel', () => {
    expect(LIGHT['--ds-loaded']).toBe('1');
  });
});

describe.each([
  ['라이트', LIGHT],
  ['다크', DARK],
])('%s 테마 대비', (_themeName, theme) => {
  it.each(TEXT_PAIRS)('should meet AA text contrast for %s', (_label, fg, bg) => {
    expect(contrast(theme, fg, bg)).toBeGreaterThanOrEqual(TEXT_MIN);
  });

  it.each(UI_PAIRS)('should meet AA non-text contrast for %s', (_label, fg, bg) => {
    expect(contrast(theme, fg, bg)).toBeGreaterThanOrEqual(UI_MIN);
  });
});
