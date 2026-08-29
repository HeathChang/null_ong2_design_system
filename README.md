# null_ong2-design-system

프로덕션 레디 React 디자인 시스템 라이브러리.

## 📖 공식 문서 사이트

라이브 데모, 복사 가능한 코드 스니펫, 컴포넌트 상세 사용법은 공식 문서 사이트에서 확인하세요:

**👉 [https://null-ong2-design-system-docs.vercel.app/en](https://null-ong2-design-system-docs.vercel.app/en)**

- 모든 컴포넌트의 라이브 예시 + 코드 1클릭 복사
- Props 테이블 (타입, 기본값, 설명)
- 다국어 지원 (한국어 / English / 中文)
- 디자인 토큰 시각화

> 본 README는 빠른 참고용입니다. 상세한 사용법과 예시는 위 사이트를 참고해주세요.

---

## 설치

```bash
npm install null_ong2-design-system
```

> **Peer dependencies** — React 18 이상 필요

```bash
npm install react react-dom
```

## 빠른 시작

### 1. 스타일 시트 import (앱 진입점에서 1회)

```tsx
// app/layout.tsx (Next.js App Router)
// 또는 _app.tsx (Next.js Pages Router)
// 또는 main.tsx (Vite/CRA)
import 'null_ong2-design-system/styles.css';
```

> **v0.2.2부터 변경**: 이전엔 자동 주입이었으나 SSR(Next.js App Router 등)에서 FOUC 발생 → 별도 CSS 파일을 export하도록 수정. 빌드 도구가 SSR HTML에 자동으로 인라인합니다.

### 2. 컴포넌트 사용

React Server Component 환경(Next.js App Router)에서도 import 가능합니다 — 패키지 내부에 `"use client"` 지시자가 포함되어 있습니다.

```tsx
import { Button, Input, Alert, Stack } from 'null_ong2-design-system';

function App() {
  return (
    <Stack spacing="lg">
      <Alert variant="info">디자인 시스템에 오신 것을 환영합니다.</Alert>

      <Input
        id="email"
        label="이메일"
        type="email"
        placeholder="example@mail.com"
        required
      />

      <Button variant="primary" onClick={() => alert('저장 완료')}>
        저장하기
      </Button>
    </Stack>
  );
}
```

---

## 컴포넌트 목록

| 카테고리 | 컴포넌트 |
|---------|---------|
| **Layout** | `Box`, `Flex`, `Stack`, `Grid`, `Container` |
| **Typography** | `Text`, `Heading`, `Label` |
| **Core UI** | `Button` |
| **Form** | `Input`, `Textarea`, `Checkbox`, `Radio`, `Select`, `Switch` |
| **Feedback** | `Spinner`, `Skeleton`, `Alert` |
| **Data Display** | `Avatar`, `Badge`, `Carousel` |
| **Navigation** | `Tabs` |
| **Overlay** | `Modal`, `Tooltip`, `DropdownMenu`, `Toast` (`ToastProvider` + `useToast`) |

---

## Layout 컴포넌트

### Box

범용 레이아웃 컨테이너. `as` prop으로 렌더링 HTML 요소를 변경할 수 있다 (Polymorphic).

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 렌더링할 HTML 요소 또는 컴포넌트 |
| `padding` | `SpacingKey` | — | 4방향 패딩 |
| `paddingX` | `SpacingKey` | — | 수평 패딩 |
| `paddingY` | `SpacingKey` | — | 수직 패딩 |
| `margin` | `SpacingKey` | — | 4방향 마진 |
| `marginX` | `SpacingKey` | — | 수평 마진 |
| `marginY` | `SpacingKey` | — | 수직 마진 |
| `borderRadius` | `RadiusKey` | — | 테두리 둥글기 |
| `bg` | `string` | — | 배경색 (CSS 변수 또는 색상값) |
| `display` | `CSSProperties['display']` | — | display 속성 |
| `width` | `CSSProperties['width']` | — | 너비 |
| `height` | `CSSProperties['height']` | — | 높이 |
| `overflow` | `CSSProperties['overflow']` | — | overflow 속성 |

> **SpacingKey**: `'0'` `'px'` `'0.5'` `'1'` `'2'` `'3'` `'4'` `'5'` `'6'` `'8'` `'10'` `'12'` `'16'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'`
>
> **RadiusKey**: `'none'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'full'`

```tsx
import { Box } from 'null_ong2-design-system';

// 기본 사용
<Box padding="md" borderRadius="lg" bg="var(--ds-color-neutral-50)">
  카드 콘텐츠
</Box>

// 다른 요소로 렌더링
<Box as="section" padding="xl" marginY="lg">
  섹션 콘텐츠
</Box>

// 수평/수직 패딩 분리
<Box paddingX="lg" paddingY="sm" borderRadius="md">
  배너
</Box>
```

---

### Flex

Flexbox 레이아웃 컴포넌트. `as` prop 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 렌더링할 요소 |
| `direction` | `CSSProperties['flexDirection']` | — | `'row'` `'column'` 등 |
| `align` | `CSSProperties['alignItems']` | — | `'center'` `'flex-start'` 등 |
| `justify` | `CSSProperties['justifyContent']` | — | `'center'` `'space-between'` 등 |
| `wrap` | `CSSProperties['flexWrap']` | — | `'wrap'` `'nowrap'` 등 |
| `gap` | `SpacingKey` | — | 자식 요소 간 간격 |
| `columnGap` | `SpacingKey` | — | 열 간 간격 |
| `rowGap` | `SpacingKey` | — | 행 간 간격 |
| `flex` | `CSSProperties['flex']` | — | flex 축약 속성 |

```tsx
import { Flex } from 'null_ong2-design-system';

// 헤더: 양쪽 끝 배치
<Flex justify="space-between" align="center">
  <span>로고</span>
  <nav>메뉴</nav>
</Flex>

// 수평 아이템 간격
<Flex gap="md" wrap="wrap">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Storybook</Tag>
</Flex>

// nav 요소로 렌더링
<Flex as="nav" gap="sm" align="center">
  <a href="/">홈</a>
  <a href="/about">소개</a>
</Flex>
```

---

### Stack

자식 요소를 일정 간격으로 쌓아 배치하는 컴포넌트. `as` prop 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 렌더링할 요소 |
| `spacing` | `SpacingKey` | `'md'` | 자식 요소 간 간격 |
| `direction` | `'column'` \| `'row'` | `'column'` | 쌓는 방향 |
| `align` | `CSSProperties['alignItems']` | — | 교차축 정렬 |
| `justify` | `CSSProperties['justifyContent']` | — | 주축 정렬 |

```tsx
import { Stack } from 'null_ong2-design-system';

// 세로 카드 목록
<Stack spacing="md">
  <Card>항목 1</Card>
  <Card>항목 2</Card>
  <Card>항목 3</Card>
</Stack>

// 넓은 간격의 섹션 구분
<Stack spacing="xl">
  <Section>첫 번째 섹션</Section>
  <Section>두 번째 섹션</Section>
</Stack>

// 가로 방향 스택
<Stack direction="row" spacing="sm" align="center">
  <Avatar />
  <span>사용자 이름</span>
</Stack>
```

---

### Grid

CSS Grid 레이아웃 컴포넌트. `as` prop 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 렌더링할 요소 |
| `columns` | `number \| string` | — | 열 개수(숫자) 또는 `grid-template-columns` 값(문자열) |
| `rows` | `number \| string` | — | 행 개수 또는 `grid-template-rows` 값 |
| `gap` | `SpacingKey` | — | 셀 간격 (전체) |
| `columnGap` | `SpacingKey` | — | 열 간 간격 |
| `rowGap` | `SpacingKey` | — | 행 간 간격 |
| `align` | `CSSProperties['alignItems']` | — | 셀 세로 정렬 |
| `justify` | `CSSProperties['justifyItems']` | — | 셀 가로 정렬 |

> `columns`에 숫자를 전달하면 `repeat(N, minmax(0, 1fr))`로 자동 변환됩니다.

```tsx
import { Grid } from 'null_ong2-design-system';

// 3열 그리드
<Grid columns={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
  <Card>5</Card>
  <Card>6</Card>
</Grid>

// 반응형 자동 채움
<Grid columns="repeat(auto-fill, minmax(250px, 1fr))" gap="lg">
  {products.map((p) => <ProductCard key={p.id} product={p} />)}
</Grid>

// 커스텀 열 비율
<Grid columns="1fr 2fr 1fr" gap="md">
  <Sidebar />
  <MainContent />
  <Aside />
</Grid>

// 열/행 간격 분리
<Grid columns={2} columnGap="lg" rowGap="sm">
  <Cell>A</Cell>
  <Cell>B</Cell>
  <Cell>C</Cell>
  <Cell>D</Cell>
</Grid>
```

---

### Container

콘텐츠의 최대 너비를 제한하고 가운데 정렬하는 컨테이너 컴포넌트. `as` prop 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 렌더링할 요소 |
| `maxWidth` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'full'` | `'lg'` | 최대 너비 |

| maxWidth | 값 |
|----------|-----|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `full` | 100% |

```tsx
import { Container } from 'null_ong2-design-system';

// 기본 사용 (1024px)
<Container>
  <main>페이지 콘텐츠</main>
</Container>

// 좁은 콘텐츠 (640px) — 블로그 글 등
<Container maxWidth="sm">
  <article>블로그 본문...</article>
</Container>

// main 요소로 렌더링
<Container as="main" maxWidth="xl">
  대시보드
</Container>
```

---

## Typography 컴포넌트

### Text

본문 텍스트 컴포넌트. `as` prop 지원 (기본: `<p>`).

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `ElementType` | `'p'` | 렌더링할 요소 |
| `size` | `FontSizeKey` | `'base'` | 폰트 크기 |
| `weight` | `FontWeightKey` | `'normal'` | 폰트 두께 |
| `color` | `'default'` \| `'muted'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` | `'default'` | 텍스트 색상 |
| `align` | `CSSProperties['textAlign']` | — | 텍스트 정렬 |
| `truncate` | `boolean` | `false` | 말줄임표 처리 |

> **FontSizeKey**: `'xs'` `'sm'` `'base'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'`
>
> **FontWeightKey**: `'normal'` `'medium'` `'semibold'` `'bold'`

```tsx
import { Text } from 'null_ong2-design-system';

// 기본 단락
<Text>일반 본문 텍스트입니다.</Text>

// 크기 & 두께 조절
<Text size="lg" weight="semibold">큰 강조 텍스트</Text>

// 시맨틱 색상
<Text size="sm" color="muted">부가 설명 텍스트</Text>
<Text color="danger">오류 메시지입니다.</Text>
<Text color="success">성공적으로 처리되었습니다.</Text>

// 인라인 요소로 사용
<Text as="span" weight="bold" color="primary">강조 단어</Text>

// 말줄임표 (텍스트가 넘칠 때)
<div style={{ width: '200px' }}>
  <Text truncate>
    이 텍스트는 컨테이너 너비를 초과하면 말줄임표(...)로 처리됩니다.
  </Text>
</div>

// 텍스트 정렬
<Text align="center">가운데 정렬 텍스트</Text>
```

---

### Heading

섹션 제목 컴포넌트. `as` prop으로 h1~h6 레벨을 지정하고, `size`로 시각적 크기를 독립적으로 설정할 수 있다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `as` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` \| `'h5'` \| `'h6'` | `'h2'` | 헤딩 레벨 |
| `size` | `FontSizeKey` | 레벨에 따라 자동 결정 | 시각적 폰트 크기 |
| `color` | `string` | `--ds-color-neutral-900` | 텍스트 색상 |
| `align` | `CSSProperties['textAlign']` | — | 텍스트 정렬 |

**레벨별 기본 크기:**

| 레벨 | 기본 size | 실제 크기 |
|------|-----------|----------|
| `h1` | `4xl` | 36px |
| `h2` | `3xl` | 30px |
| `h3` | `2xl` | 24px |
| `h4` | `xl` | 20px |
| `h5` | `lg` | 18px |
| `h6` | `base` | 16px |

```tsx
import { Heading } from 'null_ong2-design-system';

// 기본 사용 (h2 렌더링, 30px)
<Heading>섹션 제목</Heading>

// h1 페이지 제목
<Heading as="h1">메인 페이지 제목</Heading>

// SEO 구조와 시각적 크기 분리
// h2이지만 시각적으로 sm(14px) 크기
<Heading as="h2" size="sm">사이드바 제목</Heading>

// 색상 & 정렬
<Heading as="h3" color="var(--ds-color-primary-600)" align="center">
  가운데 정렬된 섹션 제목
</Heading>
```

---

### Label

폼 입력 요소와 연결하는 레이블 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `htmlFor` | `string` | — | 연결할 input의 id |
| `required` | `boolean` | — | 필수 여부 (빨간 `*` 표시) |

```tsx
import { Label } from 'null_ong2-design-system';

// 기본 레이블
<Label htmlFor="username">사용자명</Label>
<input id="username" />

// 필수 표시
<Label htmlFor="email" required>이메일</Label>
<input id="email" type="email" />
```

> **참고**: `Input`, `Textarea`, `Select` 컴포넌트는 `label` prop을 제공하면 내부적으로 Label을 자동 렌더링합니다. 별도로 Label을 사용하지 않아도 됩니다.

---

## Core UI 컴포넌트

### Button

사용자 액션을 트리거하는 버튼 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `variant` | `'primary'` \| `'secondary'` \| `'ghost'` \| `'danger'` | `'primary'` | 시각적 스타일 |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | 버튼 크기 |
| `isLoading` | `boolean` | `false` | 로딩 상태 (스피너 표시 + 클릭 비활성화) |
| `disabled` | `boolean` | `false` | 비활성화 |
| `leftIcon` | `ReactNode` | — | 텍스트 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | — | 텍스트 오른쪽 아이콘 |

> `ref`를 전달할 수 있습니다 (`forwardRef` 적용).

```tsx
import { Button } from 'null_ong2-design-system';

// 기본 variant
<Button variant="primary">확인</Button>
<Button variant="secondary">취소</Button>
<Button variant="ghost">더 보기</Button>
<Button variant="danger">삭제</Button>

// 크기
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 로딩 상태 — 스피너 자동 표시, 클릭 불가
<Button isLoading>저장 중...</Button>
<Button variant="danger" isLoading>삭제 중...</Button>

// 비활성화
<Button disabled>제출 불가</Button>

// 아이콘 포함
<Button leftIcon={<PlusIcon />}>항목 추가</Button>
<Button rightIcon={<ArrowRightIcon />} variant="secondary">다음 단계</Button>

// ref 사용
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef} onClick={handleClick}>포커스 테스트</Button>
```

---

## Form 컴포넌트

### Input

텍스트 입력 컴포넌트. 레이블, 힌트, 에러 메시지를 내장 지원한다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | input id. 생략하면 내부에서 고유 id를 만들어 레이블·힌트·에러를 연결한다 |
| `label` | `string` | — | 레이블 텍스트 |
| `hint` | `string` | — | 힌트 메시지 (에러 없을 때 표시) |
| `error` | `string` | — | 에러 메시지 (있으면 에러 스타일 적용) |
| `required` | `boolean` | — | 필수 여부 (레이블에 `*` 표시) |
| `type` | `string` | `'text'` | input type (`email`, `password`, `number` 등) |
| `placeholder` | `string` | — | 플레이스홀더 |
| `disabled` | `boolean` | `false` | 비활성화 |

> `ref`를 전달할 수 있습니다. 모든 `<input>` HTML 속성을 그대로 사용할 수 있습니다.

```tsx
import { Input } from 'null_ong2-design-system';

// 기본 사용
<Input id="name" label="이름" placeholder="이름을 입력하세요" />

// 필수 입력 + 힌트
<Input
  id="email"
  label="이메일"
  type="email"
  placeholder="example@mail.com"
  hint="업무용 이메일을 입력하세요"
  required
/>

// 에러 상태 — 에러 메시지 표시 + 빨간 테두리
<Input
  id="password"
  label="비밀번호"
  type="password"
  error="8자 이상 입력해주세요"
/>

// 비활성화
<Input
  id="readonly"
  label="읽기 전용"
  defaultValue="수정할 수 없습니다"
  disabled
/>

// ref 사용
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} id="search" placeholder="검색어 입력" />
```

---

### Textarea

여러 줄 텍스트 입력 컴포넌트. Input과 동일한 레이블/힌트/에러 패턴을 따른다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | textarea id. 생략해도 레이블·힌트·에러가 연결된다 |
| `label` | `string` | — | 레이블 텍스트 |
| `hint` | `string` | — | 힌트 메시지 |
| `error` | `string` | — | 에러 메시지 |
| `required` | `boolean` | — | 필수 여부 |
| `rows` | `number` | — | 초기 표시 행 수 |
| `disabled` | `boolean` | `false` | 비활성화 |

```tsx
import { Textarea } from 'null_ong2-design-system';

// 기본 사용
<Textarea id="desc" label="설명" rows={4} placeholder="내용을 입력하세요" />

// 에러 상태
<Textarea
  id="review"
  label="후기"
  error="최소 20자 이상 입력해주세요"
/>

// 필수 + 힌트
<Textarea
  id="bio"
  label="자기소개"
  rows={5}
  hint="최대 500자까지 입력 가능합니다"
  required
/>
```

---

### Checkbox

체크박스 컴포넌트. Controlled 및 Uncontrolled 모두 지원.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | checkbox id. 생략해도 레이블이 연결된다 |
| `label` | `string` | — | 체크박스 레이블 |
| `checked` | `boolean` | — | 체크 상태 (controlled) |
| `defaultChecked` | `boolean` | — | 초기 체크 상태 (uncontrolled) |
| `onChange` | `(checked: boolean, event) => void` | — | 상태 변경 핸들러 |
| `disabled` | `boolean` | — | 비활성화 |

> `onChange`는 첫 번째 인자로 `boolean` (체크 여부)을 받습니다.

```tsx
import { Checkbox } from 'null_ong2-design-system';

// Uncontrolled
<Checkbox id="agree" label="이용약관에 동의합니다" />

// Controlled
const [agreed, setAgreed] = useState(false);
<Checkbox
  id="terms"
  label="개인정보 처리에 동의합니다"
  checked={agreed}
  onChange={setAgreed}
/>

// 비활성화 상태
<Checkbox id="locked" label="변경 불가" disabled defaultChecked />
```

---

### Radio

라디오 버튼 컴포넌트. 동일한 `name`을 가진 그룹 중 하나를 선택할 수 있다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | radio id. 생략해도 레이블이 연결된다 |
| `name` | `string` | — | 라디오 그룹 이름 (동일 그룹은 같은 name) |
| `value` | `string` | — | 선택 값 |
| `label` | `string` | — | 라디오 레이블 |
| `checked` | `boolean` | — | 선택 상태 (controlled) |
| `onChange` | `(value: string, event) => void` | — | 값 변경 핸들러 |
| `disabled` | `boolean` | — | 비활성화 |

> `onChange`는 첫 번째 인자로 `string` (선택된 value)을 받습니다.

```tsx
import { Radio } from 'null_ong2-design-system';

// 라디오 그룹
const [method, setMethod] = useState('email');

<Radio
  id="contact-email"
  name="contact"
  value="email"
  label="이메일"
  checked={method === 'email'}
  onChange={setMethod}
/>
<Radio
  id="contact-phone"
  name="contact"
  value="phone"
  label="전화"
  checked={method === 'phone'}
  onChange={setMethod}
/>
<Radio
  id="contact-sms"
  name="contact"
  value="sms"
  label="SMS"
  checked={method === 'sms'}
  onChange={setMethod}
/>
```

---

### Select

드롭다운 선택 컴포넌트. 옵션 목록을 `options` prop으로 전달한다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | select id. 생략해도 레이블·힌트·에러가 연결된다 |
| `label` | `string` | — | 레이블 텍스트 |
| `options` | `SelectOption[]` | **필수** | 선택 옵션 목록 |
| `placeholder` | `string` | — | 플레이스홀더 옵션 텍스트 |
| `hint` | `string` | — | 힌트 메시지 |
| `error` | `string` | — | 에러 메시지 |
| `required` | `boolean` | — | 필수 여부 |
| `disabled` | `boolean` | `false` | 비활성화 |

```ts
// SelectOption 타입
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;  // 개별 옵션 비활성화
}
```

```tsx
import { Select } from 'null_ong2-design-system';

const countries = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국', disabled: true },  // 선택 불가
];

// 기본 사용
<Select
  id="country"
  label="국가"
  options={countries}
  placeholder="선택하세요"
/>

// 에러 상태
<Select
  id="country"
  label="국가"
  options={countries}
  placeholder="선택하세요"
  error="국가를 선택해주세요"
/>

// Controlled
const [country, setCountry] = useState('');
<Select
  id="country"
  label="거주 국가"
  options={countries}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  hint="현재 거주 중인 국가를 선택하세요"
  required
/>
```

---

## Feedback 컴포넌트

### Spinner

로딩 상태를 표시하는 회전 스피너 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` | `'md'` | 스피너 크기 |
| `label` | `string` | `'로딩 중'` | 스크린 리더를 위한 레이블 |

> 스피너 색상은 부모 요소의 `color`를 상속합니다 (`currentColor`).

```tsx
import { Spinner } from 'null_ong2-design-system';

// 기본 사용
<Spinner />

// 크기
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// 색상 변경 (부모 color 상속)
<span style={{ color: '#3b82f6' }}>
  <Spinner size="md" />
</span>

// 커스텀 접근성 레이블
<Spinner label="데이터를 불러오는 중입니다" />
```

---

### Skeleton

콘텐츠 로딩 중 플레이스홀더로 사용하는 shimmer 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `width` | `number \| string` | — | 너비 (숫자=px, 문자열=CSS 값) |
| `height` | `number \| string` | — | 높이 |
| `variant` | `'rectangular'` \| `'text'` \| `'circle'` | `'rectangular'` | 형태 |

```tsx
import { Skeleton } from 'null_ong2-design-system';

// 이미지 플레이스홀더
<Skeleton width={300} height={200} />

// 텍스트 줄 (height 자동 = 1em)
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />

// 아바타 원형
<Skeleton variant="circle" width={48} height={48} />

// 카드 로딩 상태 조합
<Flex gap="md" align="flex-start">
  <Skeleton variant="circle" width={48} height={48} />
  <Stack spacing="sm" style={{ flex: 1 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="75%" />
  </Stack>
</Flex>

// CSS 퍼센트 값
<Skeleton width="100%" height={120} />
```

---

### Alert

사용자에게 피드백 메시지를 전달하는 알림 컴포넌트. 각 variant마다 기본 아이콘이 포함되어 있다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `variant` | `'info'` \| `'success'` \| `'warning'` \| `'danger'` | `'info'` | 알림 종류 |
| `title` | `string` | — | 알림 제목 (선택) |
| `children` | `ReactNode` | **필수** | 알림 내용 |
| `icon` | `ReactNode` | variant별 기본 아이콘 | 커스텀 아이콘 |

> `warning`과 `danger`는 `role="alert"` (즉시 알림), `info`와 `success`는 `role="status"` (비간섭 알림)를 사용합니다.

```tsx
import { Alert } from 'null_ong2-design-system';

// 정보 알림
<Alert variant="info">시스템 점검이 예정되어 있습니다.</Alert>

// 성공 — 제목 + 내용
<Alert variant="success" title="저장 완료">
  변경 사항이 성공적으로 저장되었습니다.
</Alert>

// 경고
<Alert variant="warning" title="주의">
  이 작업은 되돌릴 수 없습니다. 신중히 진행해주세요.
</Alert>

// 오류
<Alert variant="danger" title="오류 발생">
  요청을 처리하는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
</Alert>

// 커스텀 아이콘
<Alert variant="info" icon={<BellIcon />}>
  새 알림이 있습니다.
</Alert>

// 제목 없이 내용만
<Alert variant="warning">
  비밀번호가 곧 만료됩니다. 변경해주세요.
</Alert>
```

---

## Switch (Form)

ON/OFF 즉시 반영 토글. Checkbox와 달리 설정 화면에 적합.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `id` | `string` | 자동 생성 | switch id. 생략해도 레이블이 연결된다 |
| `label` | `string` | — | 레이블 텍스트 |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | 크기 |
| `checked` | `boolean` | — | 상태 (controlled) |
| `defaultChecked` | `boolean` | — | 초기 상태 (uncontrolled) |
| `onChange` | `(checked: boolean, event) => void` | — | 변경 핸들러 |
| `disabled` | `boolean` | — | 비활성화 |

```tsx
import { Switch } from 'null_ong2-design-system';

const [enabled, setEnabled] = useState(false);
<Switch id="notify" label="알림 받기" checked={enabled} onChange={setEnabled} />
```

---

## Avatar (Data Display)

이미지 + 이니셜 fallback 아바타.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `src` | `string` | — | 이미지 URL |
| `name` | `string` | — | 이름 (alt + 이니셜 fallback에 사용) |
| `alt` | `string` | — | 이미지 alt (지정 시 우선) |
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | 크기 |
| `shape` | `'circle'` \| `'square'` | `'circle'` | 형태 |

```tsx
import { Avatar } from 'null_ong2-design-system';

<Avatar src="/me.jpg" name="홍길동" />
<Avatar name="John Doe" size="lg" />        // 이미지 없으면 "JD" 표시
<Avatar src="/broken.jpg" name="Jane" />    // 로드 실패 시 "JA"로 fallback
```

---

## Badge (Data Display)

상태/카운트 표시 라벨.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `variant` | `'neutral'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` \| `'info'` | `'neutral'` | 시각 스타일 |
| `size` | `'sm'` \| `'md'` | `'md'` | 크기 |
| `dot` | `boolean` | `false` | 점 형태. children은 화면에서 숨기되 스크린리더에는 읽힌다 |

```tsx
import { Badge } from 'null_ong2-design-system';

<Badge variant="success">활성</Badge>
<Badge variant="danger">99+</Badge>
<Badge variant="danger" dot />              // 빨간 점만 표시
<Badge variant="danger" dot>새 알림 3건</Badge>  // 점만 보이고, 스크린리더는 "새 알림 3건"을 읽음
```

---

## Carousel (Data Display)

슬라이드를 한 번에 하나씩 보여주는 캐루셀.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `items` | `ReactNode[]` | **필수** | 슬라이드 콘텐츠 배열 |
| `index` | `number` | — | 현재 인덱스 (controlled) |
| `defaultIndex` | `number` | `0` | 초기 인덱스 |
| `onChange` | `(index: number) => void` | — | 변경 핸들러 |
| `autoPlayInterval` | `number` | `0` | 자동 재생 간격(ms). 0이면 비활성 |
| `loop` | `boolean` | `true` | 무한 순환 |
| `showArrows` | `boolean` | `true` | 좌우 화살표 표시 |
| `showIndicators` | `boolean` | `true` | 점 인디케이터 표시 |
| `ariaLabel` | `string` | `'캐루셀'` | 캐루셀 영역의 접근성 레이블 |

**접근성**

- 화면 밖 슬라이드는 `inert` 처리되어 탭 순서에서 빠진다. 슬라이드 안에 링크/버튼이 있어도 안전하다.
- `autoPlayInterval`을 켜면 정지/재생 버튼이 함께 나타난다. 마우스를 올리거나 포커스가 들어오면 자동으로 멈춘다.
- OS의 "동작 줄이기(prefers-reduced-motion)"가 켜져 있으면 자동 재생을 시작하지 않는다.
- 인디케이터는 ←/→/Home/End로 이동할 수 있고 히트 영역이 24×24px이다.

```tsx
import { Carousel } from 'null_ong2-design-system';

<Carousel
  items={[
    <img src="/1.jpg" alt="배너 1" />,
    <img src="/2.jpg" alt="배너 2" />,
    <img src="/3.jpg" alt="배너 3" />,
  ]}
  autoPlayInterval={3000}
/>
```

---

## Tabs (Navigation)

컴파운드 컴포넌트 패턴 기반 탭.

- `defaultValue`를 생략하면 **첫 번째 탭이 자동으로 선택**된다. (선택된 탭이 없으면 탭 바 전체가 키보드로 도달 불가능해지기 때문)
- 키보드: ←/→ (`orientation="vertical"`이면 ↑/↓)로 순환 이동, `Home`/`End`로 처음/끝 이동, `Enter`/`Space`로 선택.

| 컴포넌트 | 역할 |
|----------|------|
| `Tabs.Root` | 컨텍스트 제공자 (`defaultValue` / `value` / `onChange` / `orientation`) |
| `Tabs.List` | 탭 트리거 컨테이너 (role="tablist") |
| `Tabs.Trigger` | 개별 탭 버튼 (`value` / `disabled`) |
| `Tabs.Panel` | 매칭되는 트리거가 활성일 때 렌더 (`value`) |

```tsx
import { Tabs } from 'null_ong2-design-system';

<Tabs.Root defaultValue="profile">
  <Tabs.List aria-label="계정 섹션">
    <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
    <Tabs.Trigger value="account">계정</Tabs.Trigger>
    <Tabs.Trigger value="notifications">알림</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile">프로필 화면</Tabs.Panel>
  <Tabs.Panel value="account">계정 화면</Tabs.Panel>
  <Tabs.Panel value="notifications">알림 설정</Tabs.Panel>
</Tabs.Root>

// 세로 탭
<Tabs.Root defaultValue="overview" orientation="vertical">...</Tabs.Root>
```

---

## Modal (Overlay)

오버레이 다이얼로그. 열면 다음이 자동으로 적용된다.

- 포커스가 다이얼로그 안으로 이동하고 Tab이 안에서만 순환한다. 닫으면 원래 위치로 복원된다.
- 배경 스크롤이 잠긴다 (모바일에서 배경이 같이 밀리지 않는다).
- 배경 콘텐츠가 `aria-hidden` + `inert` 처리되어 스크린리더가 뚫고 들어가지 않는다.
- 모달을 겹쳐 띄워도 `Esc` 한 번에는 **가장 위 모달만** 닫힌다.
- 본문에서 텍스트를 드래그하다 오버레이에서 손을 떼도 닫히지 않는다 (누른 지점 기준 판정).

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `isOpen` | `boolean` | **필수** | 열림 상태 |
| `onClose` | `() => void` | **필수** | 닫기 핸들러 |
| `title` | `string` | — | 제목 |
| `children` | `ReactNode` | **필수** | 본문 |
| `footer` | `ReactNode` | — | 푸터 (버튼 그룹 등) |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | 크기 |
| `closeOnOverlayClick` | `boolean` | `true` | 오버레이 클릭으로 닫기 |
| `closeOnEscape` | `boolean` | `true` | ESC로 닫기 |
| `showCloseButton` | `boolean` | `true` | 닫기 버튼 표시 |
| `initialFocusRef` | `RefObject<HTMLElement>` | — | 열릴 때 포커스를 받을 요소 (기본: 첫 포커스 가능 요소) |

```tsx
import { Modal, Button } from 'null_ong2-design-system';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>삭제</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="삭제 확인"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
      <Button variant="danger" onClick={handleDelete}>삭제</Button>
    </div>
  }
>
  정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
</Modal>
```

---

## Tooltip (Overlay)

호버/포커스 시 부가 설명 표시. `@floating-ui/react` 기반 자동 위치 계산.

`overflow: hidden|auto` 조상(모달 본문, 캐루셀 뷰포트 등) 안에서도 잘리지 않도록 `body` 포탈에 렌더된다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `content` | `ReactNode` | **필수** | 툴팁 내용 |
| `children` | `ReactElement` | **필수** | 트리거 요소 (단일 element) |
| `placement` | `Placement` | `'top'` | 위치 (top/bottom/left/right + start/end) |
| `delay` | `number` | `200` | 표시 지연(ms) |
| `disabled` | `boolean` | `false` | 비활성화 |

```tsx
import { Tooltip, Button } from 'null_ong2-design-system';

<Tooltip content="저장합니다 (Cmd+S)">
  <Button>저장</Button>
</Tooltip>

<Tooltip content="설명" placement="right">
  <Button variant="ghost">정보</Button>
</Tooltip>
```

---

## DropdownMenu (Overlay)

클릭 트리거 드롭다운 메뉴. `body` 포탈에 렌더되어 `overflow` 조상 안에서도 잘리지 않는다.

키보드 조작은 WAI-ARIA APG 메뉴 패턴을 따른다 — 트리거에서 ↑/↓ 또는 `Enter`/`Space`로 열면 첫 항목으로 포커스가 이동하고,
↑/↓로 순환(비활성 항목은 건너뜀), `Esc`나 바깥 클릭으로 닫히며 포커스는 트리거로 복원된다.

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `trigger` | `ReactElement` | **필수** | 트리거 요소 |
| `items` | `DropdownMenuItem[]` | **필수** | 메뉴 항목 목록 |
| `placement` | `Placement` | `'bottom-start'` | 메뉴 위치 |

```ts
interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;  // 빨간 텍스트
}
```

```tsx
import { DropdownMenu, Button } from 'null_ong2-design-system';

<DropdownMenu
  trigger={<Button variant="secondary">옵션</Button>}
  items={[
    { key: 'edit', label: '수정', onSelect: handleEdit },
    { key: 'duplicate', label: '복제', onSelect: handleDuplicate },
    { key: 'delete', label: '삭제', onSelect: handleDelete, destructive: true },
  ]}
/>
```

---

## Toast (Overlay)

전역 알림 시스템. **앱 루트에 `<ToastProvider>`를 한 번 감싸고**, `useToast()` 훅으로 사용.

### 1. Provider 설정

```tsx
import { ToastProvider } from 'null_ong2-design-system';

function App() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  );
}
```

| Prop | 타입 | 기본값 | 설명 |
|------|-----|--------|------|
| `position` | `'top-left'` \| `'top-right'` \| `'top-center'` \| `'bottom-left'` \| `'bottom-right'` \| `'bottom-center'` | `'bottom-right'` | 표시 위치 |
| `maxToasts` | `number` | `5` | 동시 표시 최대 개수 |

### 2. 사용

```tsx
import { useToast } from 'null_ong2-design-system';

function SaveButton() {
  const toast = useToast();

  return (
    <Button
      onClick={async () => {
        try {
          await save();
          toast.success('저장되었습니다');
        } catch {
          toast.danger('저장에 실패했습니다', { duration: 5000 });
        }
      }}
    >
      저장
    </Button>
  );
}
```

#### Toast API

| 메서드 | 설명 |
|--------|------|
| `toast.show(message, options?)` | 일반 토스트 |
| `toast.success(message, options?)` | 성공 |
| `toast.warning(message, options?)` | 경고 |
| `toast.danger(message, options?)` | 오류 |
| `toast.info(message, options?)` | 정보 |
| `toast.dismiss(id)` | 특정 토스트 닫기 (id는 show 반환값) |

`options.duration` — 자동 소멸 시간(ms). 기본 3000. **0**이면 수동 닫기만 가능.

---

## 디자인 토큰

모든 시각적 값은 CSS 커스텀 프로퍼티(변수)로 정의되어 있습니다. import 시 자동으로 `:root`에 주입됩니다.

### 색상

```css
/* 브랜드 */
--ds-color-primary-50    /* #eff6ff  */
--ds-color-primary-500   /* #3b82f6  */
--ds-color-primary-600   /* #2563eb  */
--ds-color-primary-700   /* #1d4ed8  */

/* 중립 (Neutral) */
--ds-color-neutral-0     /* #ffffff  */
--ds-color-neutral-100   /* #f3f4f6  */
--ds-color-neutral-500   /* #6b7280  */
--ds-color-neutral-900   /* #111827  */

/* 시맨틱 */
--ds-color-success       /* #22c55e  */
--ds-color-warning       /* #f59e0b  */
--ds-color-danger        /* #ef4444  */
--ds-color-info          /* #3b82f6  */
```

### 간격 (Spacing)

```css
--ds-spacing-xs    /* 4px   */
--ds-spacing-sm    /* 8px   */
--ds-spacing-md    /* 16px  */
--ds-spacing-lg    /* 24px  */
--ds-spacing-xl    /* 32px  */
--ds-spacing-2xl   /* 48px  */
```

### z-index

```css
--ds-z-base       /* 0    */
--ds-z-dropdown   /* 10   */
--ds-z-sticky     /* 20   */
--ds-z-overlay    /* 50   */
--ds-z-modal      /* 100  */
--ds-z-popover    /* 200  — Tooltip / DropdownMenu (모달 위에 떠야 함) */
--ds-z-toast      /* 1000 */
```

### 테두리 둥글기 (Radius)

```css
--ds-radius-sm     /* 4px    */
--ds-radius-md     /* 6px    */
--ds-radius-lg     /* 8px    */
--ds-radius-xl     /* 12px   */
--ds-radius-full   /* 9999px */
```

### TypeScript에서 토큰 사용

```tsx
import { SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT, Z_INDEX } from 'null_ong2-design-system';

// SPACING.md  → 'var(--ds-spacing-md)'
// RADIUS.lg   → 'var(--ds-radius-lg)'
// FONT_SIZE.xl → 'var(--ds-font-size-xl)'
```

---

## 테마 커스터마이징

소비 프로젝트의 글로벌 CSS에서 CSS 변수를 덮어쓰면 테마를 변경할 수 있습니다:

```css
:root {
  /* 브랜드 색상을 보라색으로 변경 */
  --ds-color-primary-600: #7c3aed;  /* 버튼 기본 */
  --ds-color-primary-700: #6d28d9;  /* 버튼 hover */
  --ds-color-primary-800: #5b21b6;  /* 버튼 active */
  --ds-color-primary-500: #8b5cf6;  /* 체크박스·스위치 채움 */

  /* 테두리를 더 둥글게 */
  --ds-radius-md: 8px;

  /* 커스텀 폰트 */
  --ds-font-sans: 'Pretendard', -apple-system, sans-serif;
}
```

> 색을 바꿀 때는 **대비**를 확인하세요. 본문 텍스트는 4.5:1, 아이콘·테두리 같은 UI 요소는 3:1 이상이어야 합니다.
> 기본 팔레트는 `src/styles/tokens.test.ts`가 자동으로 검증합니다.

---

## 다크 모드

별도 설정 없이 **OS 설정을 따라갑니다**. 직접 제어하고 싶으면 `<html>`에 클래스나 속성을 붙이세요.

```html
<!-- 1. 아무것도 안 함 → prefers-color-scheme을 따름 -->
<html>

<!-- 2. 다크 고정 (둘 중 아무거나) -->
<html class="dark">
<html data-theme="dark">

<!-- 3. 라이트 고정 (OS가 다크여도 라이트 유지) -->
<html class="light">
<html data-theme="light">
```

```tsx
// 토글 예시
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <Button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? '다크 모드' : '라이트 모드'}
    </Button>
  );
}
```

토큰의 **역할**은 두 테마에서 같습니다 — `--ds-color-neutral-0`은 언제나 표면색,
`--ds-color-neutral-900`은 언제나 가장 진한 텍스트색입니다. 그래서 컴포넌트 CSS는 테마별 분기가 없고,
직접 만든 컴포넌트도 같은 토큰만 쓰면 다크 모드를 자동으로 지원합니다.

```css
/* 소비자 컴포넌트도 토큰만 쓰면 자동으로 다크 대응된다 */
.my-card {
  background-color: var(--ds-color-neutral-0);
  color: var(--ds-color-neutral-700);
  border: 1px solid var(--ds-border-color);
}
```

두 테마 모두 WCAG 2.1 AA 대비를 만족하며, 회귀는 테스트로 막습니다.

---

## 다국어 (i18n)

컴포넌트가 내장한 문자열(모달 닫기 버튼, 캐루셀 화살표, 토스트 영역 레이블 등)은
대부분 스크린리더에만 읽히지만 하드코딩되면 그대로 장벽이 됩니다.

기본값은 **한국어**이고, `DesignSystemProvider`로 바꿀 수 있습니다. Provider가 없어도 동작합니다.

```tsx
import { DesignSystemProvider } from 'null_ong2-design-system';

<DesignSystemProvider locale="en">
  <App />
</DesignSystemProvider>
```

내장 로케일: `ko`(기본) · `en` · `ja` · `zh`

일부 문자열만 바꾸려면 `strings`를 함께 넘기세요. 지정한 키만 교체됩니다.

```tsx
<DesignSystemProvider locale="en" strings={{ close: 'Dismiss', toastRegion: 'Alerts' }}>
  <App />
</DesignSystemProvider>
```

지원하지 않는 언어는 전체 문자열을 직접 넘기면 됩니다.

```tsx
import { DesignSystemProvider, KO_STRINGS } from 'null_ong2-design-system';
import type { DsStrings } from 'null_ong2-design-system';

const FR: DsStrings = { ...KO_STRINGS, close: 'Fermer', loading: 'Chargement' /* ... */ };

<DesignSystemProvider strings={FR}>
  <App />
</DesignSystemProvider>
```

> 브라우저 언어 **자동 감지는 하지 않습니다.** SSR에서 서버와 클라이언트가 다른 언어를 렌더해
> 하이드레이션 불일치가 생기기 때문입니다. 감지가 필요하면 앱에서 판단해 `locale`로 넘겨주세요.

---

## 값 목록 상수

각 컴포넌트가 받을 수 있는 값을 런타임 배열로도 제공합니다.
variant 선택 UI를 만들거나, 서버에서 온 문자열을 검증할 때 씁니다.

```tsx
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'null_ong2-design-system';

{BUTTON_VARIANTS.map((variant) => (
  <Button key={variant} variant={variant}>{variant}</Button>
))}
```

제공 목록: `ALERT_VARIANTS` `AVATAR_SHAPES` `AVATAR_SIZES` `BADGE_SIZES` `BADGE_VARIANTS`
`BUTTON_SIZES` `BUTTON_VARIANTS` `CONTAINER_MAX_WIDTHS` `HEADING_LEVELS` `MODAL_SIZES`
`SKELETON_VARIANTS` `SPINNER_SIZES` `SWITCH_SIZES` `TEXT_COLORS` `TOAST_POSITIONS` `TOAST_VARIANTS`

---

## 번들 크기

`dist`는 **압축하지 않은 채로** 배포됩니다. 소비자의 번들러가 압축하는 편이
트리셰이킹에 유리하고 스택 트레이스도 읽을 수 있기 때문입니다.

실제로 번들에 들어가는 크기 (brotli, 의존성 포함):

| import | 크기 |
|--------|------|
| `{ Button }` | ~2.3 kB |
| `{ Modal }` | ~3.5 kB |
| 전체 import | ~29.5 kB |
| `styles.css` | ~4.4 kB |

`npm run size`로 직접 확인할 수 있고, CI가 상한을 강제합니다.

---

## Hooks

### useControllable

Controlled/Uncontrolled 상태를 통합 관리하는 훅.

```tsx
import { useControllable } from 'null_ong2-design-system';

function Toggle({ value, defaultValue = false, onChange }) {
  const [isOn, setIsOn] = useControllable({
    value,
    defaultValue,
    onChange,
  });

  return <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>;
}

// Uncontrolled (내부 상태 자동 관리)
<Toggle defaultValue={false} />

// Controlled (외부에서 상태 관리)
<Toggle value={isEnabled} onChange={setIsEnabled} />
```

### useEscapeKey

`Esc`로 닫히는 레이어를 만든다. 여러 레이어가 동시에 활성이면 **가장 마지막에 열린 것 하나만** 반응한다.

```tsx
useEscapeKey(isOpen, close);
```

### useFocusTrap

컨테이너 안으로 포커스를 가둔다. 활성화되면 첫 포커스 가능 요소로 이동하고, 해제되면 이전 위치로 복원한다.

```tsx
const ref = useRef<HTMLDivElement>(null);
useFocusTrap(ref, isOpen);

// 특정 요소에서 시작하고 싶으면
useFocusTrap(ref, isOpen, { initialFocus: cancelButtonRef });
```

> 포탈처럼 DOM 노드가 나중에 붙는 경우에는 `useRef` 대신 노드를 state로 잡아 ref 객체 identity를 바꿔야
> effect가 다시 돈다. `Modal`이 그 방식을 쓴다.

### useBodyScrollLock

활성화된 동안 `<body>` 스크롤을 잠근다. 여러 오버레이가 겹쳐도 참조 카운트로 한 번만 잠기고,
마지막 하나가 닫힐 때 원래 상태로 되돌린다. 스크롤바 폭만큼 padding을 보정해 레이아웃이 흔들리지 않는다.

iOS Safari는 `overflow: hidden`을 무시하므로 `position: fixed` + 스크롤 위치 복원 방식을 쓴다.

```tsx
useBodyScrollLock(isOpen);
```

### useInertBackground

모달이 열린 동안 배경 형제 요소를 `aria-hidden` + `inert` 처리한다.
`data-ds-layer` 속성이 붙은 오버레이 레이어(토스트 등)는 건드리지 않는다.

```tsx
useInertBackground(dialogRef, isOpen);
```

### usePrefersReducedMotion

OS의 "동작 줄이기" 설정 여부를 반환한다. 자동 재생·자동 회전 UI를 끄는 데 쓴다.
`matchMedia`가 없는 환경(SSR 등)에서는 `false`를 반환한다.

```tsx
const prefersReducedMotion = usePrefersReducedMotion();
```

---

## 접근성

- **키보드** — 모든 상호작용 요소가 키보드로 조작된다. Modal/DropdownMenu는 포커스 이동과 복원까지 처리한다.
- **포커스 표시** — `:focus-visible`에 포커스 링을 그리고, Windows 고대비 모드(`forced-colors`)에서는
  시스템 색 `outline`으로 보강한다.
- **동작 줄이기** — `prefers-reduced-motion: reduce`면 등장 애니메이션과 전환을 끈다.
  다만 Spinner/Skeleton은 "진행 중" 신호라 멈추지 않고 느리게 돈다.
- **터치 타깃** — 캐루셀 인디케이터 등 작은 컨트롤도 히트 영역이 24×24px 이상이다 (WCAG 2.5.8).
- **자동 갱신 콘텐츠** — 캐루셀 자동 재생과 토스트 자동 소멸은 hover/focus로 멈추고,
  캐루셀은 명시적인 정지 버튼도 제공한다 (WCAG 2.2.1 / 2.2.2).

---

## 잘못 쓰면 알려줍니다

개발 모드에서만 동작하고 프로덕션 빌드에서는 제거됩니다.

| 상황 | 알림 |
|------|------|
| `styles.css` import 누락 | 콘솔 경고 1회 |
| `<Tooltip>텍스트</Tooltip>`처럼 엘리먼트가 아닌 자식 | 무엇을 어떻게 고칠지 담은 오류 |
| controlled ↔ uncontrolled 전환 | 콘솔 경고 |

---

## 설계 철학

1. **거의 Zero-config** — 앱 진입점에서 `styles.css`를 한 줄 import하면 끝. ThemeProvider·Tailwind 설정은 필요 없다.
   (개발 모드에서 이 import를 빠뜨리면 콘솔로 한 번 알려준다.)
2. **접근성 기본 내장** — ARIA 속성, 키보드 내비게이션, 시맨틱 HTML이 기본 적용.
3. **타입 안전** — TypeScript `strict: true` 환경에서 작성. 모든 Props 타입 export.
4. **Polymorphic** — Layout 컴포넌트에 `as` prop 지원으로 렌더링 요소 자유 변경.
5. **토큰 기반** — 모든 시각적 값이 CSS 변수. 소비 프로젝트에서 변수 override로 테마 커스터마이징 가능.
6. **Tree-shakable** — 사용하는 컴포넌트만 번들에 포함.

---

## 개발 환경

```bash
# 의존성 설치
npm install

# Storybook 실행 (http://localhost:6006)
npm run storybook

# 테스트 (단위 + 접근성 axe 검사 + 토큰 대비 검사)
npm test

# 타입 체크
npm run type-check

# 린트 (react-hooks / jsx-a11y / typescript-eslint)
npm run lint
npm run lint:fix

# 빌드
npm run build

# 번들 크기 확인 (한도 초과 시 실패)
npm run size
npm run size:why   # 무엇이 크기를 차지하는지 분석
```

### 품질 게이트

| 검사 | 잡는 것 |
|------|---------|
| `type-check` | 타입 오류 |
| `lint` | 훅 규칙 위반, 접근성 정적 오류, `any`, 미사용 import |
| `test` | 동작 회귀 + axe 접근성 위반 + 토큰 대비 미달 |
| `size` | 번들 크기 회귀, 트리셰이킹 깨짐 |

CI(`.github/workflows/ci.yml`)가 PR마다 네 가지를 모두 돌립니다.

---

## 기여 가이드

1. 레포지토리 Fork
2. 기능 브랜치 생성: `git checkout -b feat/new-component`
3. 컴포넌트 파일 구조 준수:
   - `ComponentName.ui.tsx` — Presentational 컴포넌트
   - `ComponentName.ui.test.tsx` — 테스트
   - `ComponentName.ui.stories.tsx` — Storybook 스토리
   - `index.ts` — barrel export
4. 모든 검사 통과 확인:
   ```bash
   npm run type-check && npm run test && npm run build
   ```
5. Pull Request 제출

---

## 라이선스

MIT © null_ong2
