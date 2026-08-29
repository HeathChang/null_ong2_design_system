/**
 * v0.2.2부터 CSS는 JS 번들에 자동 주입되지 않는다(SSR FOUC 때문).
 * 소비자가 `import 'null_ong2-design-system/styles.css'`를 빠뜨리면
 * 모든 컴포넌트가 아무 경고 없이 무스타일로 렌더되어 원인을 찾기 어렵다.
 *
 * tokens.css의 `--ds-loaded` 표식을 확인해 개발 모드에서 한 번만 안내한다.
 * 프로덕션 빌드에서는 아무 것도 하지 않는다.
 */
let hasChecked = false;

const MESSAGE = [
  '[null_ong2-design-system] 스타일시트가 로드되지 않았습니다.',
  "앱 진입점에 다음 한 줄을 추가하세요:  import 'null_ong2-design-system/styles.css'",
].join('\n');

function isDevelopment(): boolean {
  try {
    return (
      typeof process !== 'undefined' &&
      process.env !== undefined &&
      process.env['NODE_ENV'] !== 'production'
    );
  } catch {
    return false;
  }
}

function check(): void {
  const loaded = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--ds-loaded')
    .trim();
  if (loaded !== '') return;
  // 디버깅용 로그가 아니라 설치 누락을 알리는 개발 모드 전용 진단이다.
  console.warn(MESSAGE);
}

export function warnIfStylesMissing(): void {
  if (hasChecked) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!isDevelopment()) return;
  hasChecked = true;

  // CSS가 조금 늦게 적용될 수 있으므로 첫 페인트 이후에 확인한다.
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(check);
    });
    return;
  }
  window.setTimeout(check, 0);
}
