# null_ong2-design-system

프로덕션 레디 React 디자인 시스템 라이브러리. 설치 즉시 사용 가능 (Zero-config).

## 설치

```bash
npm install null_ong2-design-system
```

> **Peer dependencies** — React 18 이상 필요

```bash
npm install react react-dom
```

## 빠른 시작

별도의 CSS import 없이 바로 사용 가능합니다. 스타일은 자동으로 주입됩니다.

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
| **Form** | `Input`, `Textarea`, `Checkbox`, `Radio`, `Select` |
| **Feedback** | `Spinner`, `Skeleton`, `Alert` |

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
| `id` | `string` | — | input id (레이블 연결에 사용) |
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
| `id` | `string` | — | textarea id |
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
| `id` | `string` | — | checkbox id |
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
| `id` | `string` | — | radio id |
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
| `id` | `string` | — | select id |
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
  --ds-color-primary-500: #8b5cf6;
  --ds-color-primary-600: #7c3aed;
  --ds-color-primary-700: #6d28d9;

  /* 테두리를 더 둥글게 */
  --ds-radius-md: 8px;

  /* 커스텀 폰트 */
  --ds-font-sans: 'Pretendard', -apple-system, sans-serif;
}
```

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

---

## 설계 철학

1. **Zero-config** — 설치 후 import만 하면 동작. CSS import나 ThemeProvider 설정 불필요.
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

# 테스트
npm test

# 타입 체크
npm run type-check

# 빌드
npm run build
```

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
