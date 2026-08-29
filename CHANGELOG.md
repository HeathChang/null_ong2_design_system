# 변경 이력

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.
`1.0.0` 이전에는 마이너 버전에서 동작이 바뀔 수 있습니다.

## [0.3.0] — 2026-08-29

### 고침 — 트리셰이킹이 동작한 적이 없었다

`tsup`의 `keepNames: true`가 모든 선언 뒤에 `__name(fn, "fn")` 최상위 호출을 붙였고,
번들러가 이를 부수효과로 판단해 아무것도 제거하지 못했습니다.

| import | 이전 | 이후 |
|--------|------|------|
| `{ Button }` | 29.6 kB | **2.4 kB** |
| `{ Modal }` | 29.6 kB | **3.8 kB** |

JS 압축은 소비자 번들러에 맡깁니다(`minify: false`). 소비자 번들 크기는 동일하고,
압축하지 않으므로 React DevTools에 컴포넌트 이름이 그대로 보입니다.

### 고침 — 접근성

- **폼 필드의 에러 설명이 사라지던 문제.** `aria-describedby`를 직접 넘기면
  컴포넌트가 만든 에러/힌트 참조를 덮어써서 에러 메시지가 낭독되지 않았습니다. 이제 합칩니다.
- **`Select`의 `placeholder`가 실제로 표시되지 않던 문제.** 브라우저는 초기 선택에서
  비활성 옵션을 건너뛰므로 첫 실제 옵션이 선택된 채 그려졌습니다.
- **탭 패널의 포커스 표시가 없던 문제.** `outline: none`만 있고 대체 스타일이 없었습니다.
- **라이트 테마 색 대비 미달 4건.** primary 버튼(3.42:1) · danger 버튼(3.76:1) ·
  placeholder(2.54:1) · 에러 메시지(3.76:1) → 모두 4.5:1 이상으로 조정.
- `Switch`의 레이블, `DropdownMenu`의 비활성 항목에 스타일 규칙이 아예 없던 문제.

### 고침 — 동작

- **`Carousel`의 범위 밖 인덱스.** controlled `index`가 슬라이드 수를 넘거나 음수이거나
  `items`가 줄어들면 빈 화면(`translateX(-900%)`)이 되거나 무효한 CSS(`translateX(--500%)`)가
  나가고 모든 슬라이드가 `aria-hidden`이 됐습니다. 이제 항상 실제 슬라이드로 맞춥니다.
- **`ToastProvider`의 `maxToasts={0}`.** `slice(-0)`이 전체를 반환해 무한히 쌓였습니다.
- **`Avatar` 이니셜이 이모지를 반으로 자르던 문제.** `'👩‍💻 개발자'` → `'\uD83D개'` (깨진 문자).
  이제 자소 단위로 자릅니다.
- **모바일 배경 스크롤.** iOS Safari는 `overflow: hidden`을 무시합니다.
  `position: fixed` + 스크롤 위치 복원으로 바꿨습니다.
- **`DropdownMenu`의 항목이 줄었을 때** 방향키가 사라진 항목을 짚던 문제.

### 고침 — DX

- **`<Tooltip>저장</Tooltip>`처럼 엘리먼트가 아닌 자식을 넘기면** 해독 불가능한 React 오류
  (`Element type is invalid...`)가 났습니다. 이제 무엇을 어떻게 고칠지 알려줍니다.
- **controlled ↔ uncontrolled 전환**을 개발 모드에서 경고합니다.
- `npm run lint`가 실행조차 되지 않던 문제(eslint 미설치).

### 추가

- **다크 모드.** `prefers-color-scheme` 자동 추종 / `.dark`·`[data-theme="dark"]` 강제 /
  `.light` 고정. 토큰의 역할이 라이트와 같아 소비자 컴포넌트도 토큰만 쓰면 자동 대응됩니다.
- **다국어.** `DesignSystemProvider` + `ko`(기본)·`en`·`ja`·`zh`.
  Provider 없이도 한국어로 동작하므로 기존 코드 변경이 필요 없습니다.
- **`Modal`의 `initialFocusRef`** — 열릴 때 포커스를 받을 요소를 지정합니다.
- **값 목록 상수** 16종 (`BUTTON_VARIANTS` 등) — variant 선택 UI·런타임 검증용.
- **훅 공개**: `useBodyScrollLock` · `useInertBackground` · `usePrefersReducedMotion`.
- **품질 게이트**: ESLint(react-hooks/jsx-a11y) · axe 접근성 검사 · 토큰 대비 검사 ·
  스타일시트 구조 검사 · SSR 검사 · 배포 산출물 검증 · size-limit. CI가 전부 실행합니다.

### 변경

- `Badge`의 `dot`이 `children`을 버리지 않고 스크린리더용으로 남깁니다.
- primary/danger 버튼 색이 대비 기준을 맞추느라 한 단계 진해졌습니다.
- 소스맵을 만들지 않습니다(배포하지 않는 파일을 가리켜 404를 유발했습니다).

## [0.2.3] — 2026-08-29

### 고침

- **`Modal`의 포커스 트랩이 한 번도 동작하지 않던 문제.** `Portal`이 마운트 이후에야
  자식을 렌더해 effect 시점에 ref가 비어 있었습니다.
- **폼 필드에 `id`를 주지 않으면** 레이블 연결이 끊기고 `aria-describedby`가 충돌하던 문제.
- **`Tooltip`의 `aria-describedby`가 없는 id를 가리켜** 스크린리더가 툴팁을 읽지 못하던 문제.
- **`Tooltip`/`DropdownMenu`가 `overflow` 조상 안에서 잘리던 문제** (포탈 미사용).
- **`Carousel`의 화면 밖 슬라이드가 포커스 가능하던 문제** (`inert` 적용).
- **`Tabs.Root`를 `defaultValue` 없이 쓰면** 탭 바 전체가 키보드로 도달 불가능하던 문제.
- 모달 배경 스크롤 잠금, 배경 `inert`, 드래그-릴리스 오작동, 겹친 오버레이의 ESC 우선순위,
  `prefers-reduced-motion`, 고대비 모드 포커스 링, 캐루셀 자동재생 정지 수단,
  토스트 hover 일시정지, `Avatar`의 `src` 변경, 버튼 로딩 후 포커스 복원.

## [0.2.2] — 2026-05-01

### 변경

- CSS 자동 주입을 중단하고 `null_ong2-design-system/styles.css`로 분리했습니다
  (SSR에서 FOUC 발생). 앱 진입점에서 한 번 import해야 합니다.

## [0.2.0] — 2026-04-17

### 추가

- `Switch` `Avatar` `Badge` `Carousel` `Tabs` `Modal` `Toast` `Tooltip` `DropdownMenu`

## [0.1.0] — 2026-04-15

최초 릴리스 — 레이아웃 · 타이포그래피 · 폼 · 피드백 16개 컴포넌트.
