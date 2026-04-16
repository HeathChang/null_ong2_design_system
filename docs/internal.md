# Internal Documentation

> 이 파일은 npm publish에서 제외된다 (.npmignore에 정의).
> 내부 개발자 전용 문서이다.

---

## 버전 관리 전략 (Semantic Versioning)

`MAJOR.MINOR.PATCH` 형식을 따른다.

| 버전 타입 | 언제 올리는가 | 예시 |
|-----------|--------------|------|
| **PATCH** (0.0.x) | 버그 수정, 내부 개선 (public API 변경 없음) | `0.1.1` |
| **MINOR** (0.x.0) | 하위 호환 신규 기능 추가 | `0.2.0` |
| **MAJOR** (x.0.0) | 하위 호환 불가 변경 (Breaking Change) | `1.0.0` |

### 현재 단계: `0.x.x` (Pre-release)

- `0.x.x` 기간에는 minor 버전에서도 breaking change가 발생할 수 있다.
- 안정 버전 `1.0.0` 이후부터 semver strict 적용.

---

## 릴리즈 프로세스

### 1. 변경 사항 준비

```bash
npm run type-check    # 타입 에러 없음 확인
npm run lint          # 린트 통과
npm run test          # 테스트 통과
npm run build         # 빌드 성공
```

### 2. 버전 업데이트

```bash
# PATCH 버전 업
npm version patch

# MINOR 버전 업
npm version minor

# MAJOR 버전 업
npm version major
```

### 3. 변경 이력 작성

`CHANGELOG.md`에 다음 형식으로 작성:

```markdown
## [0.2.0] - 2026-05-01

### Added
- Modal 컴포넌트 추가
- Tooltip 컴포넌트 추가

### Changed
- Button: leftIcon/rightIcon prop 타입 변경

### Fixed
- Input: error 메시지 aria-describedby 누락 수정
```

### 4. 게시

```bash
# dry-run으로 게시될 파일 확인
npm publish --dry-run

# 실제 게시
npm publish
```

---

## 보안 고려사항

### XSS 방지

- 컴포넌트에서 `dangerouslySetInnerHTML` 사용 금지.
- 사용자 입력을 직접 렌더링하는 경우 React의 기본 이스케이프에 의존.

### 의존성 감사

```bash
# 취약점 확인
npm audit

# 자동 수정 (minor/patch 범위)
npm audit fix
```

- peer dependency는 최소화한다 (react, react-dom만 유지).
- dev dependency는 보안 취약점을 정기적으로 확인한다.

### 게시 전 체크리스트

- [ ] `npm publish --dry-run`으로 게시 파일 목록 확인
- [ ] `dist/` 외 소스 코드가 포함되지 않았는지 확인
- [ ] 시크릿, API 키, 개인 정보가 포함되지 않았는지 확인
- [ ] `package.json`의 `files` 필드 검토

---

## 라이선스 설명

**MIT License**

- 상업적 사용 허가
- 수정, 배포, 재배포 허가
- 저작권 및 라이선스 표시 의무
- 보증 없음 (AS IS)

소비자 프로젝트에서 이 패키지를 사용할 때 별도의 라이선스 동의가 필요하지 않다.
단, 라이선스 파일(`LICENSE`)을 유지해야 한다.

---

## 컴포넌트 추가 가이드 (Phase 2+)

신규 컴포넌트 추가 시 체크리스트:

1. `src/components/{category}/{Name}/` 디렉토리 생성
2. `{Name}.ui.tsx` — 컴포넌트 구현
3. `{Name}.ui.test.tsx` — 테스트 작성
4. `{Name}.ui.stories.tsx` — Storybook 작성
5. `index.ts` — barrel export
6. 상위 `index.ts` 업데이트
7. `src/components/index.ts` 업데이트
8. `src/index.ts` 업데이트

---

## Phase 2 예정 컴포넌트

- Modal / Dialog
- Tooltip
- Popover
- Toast / Notification
- Table
- Tabs
- Accordion
- Badge
- Avatar
- Breadcrumb
- Pagination
- DatePicker
