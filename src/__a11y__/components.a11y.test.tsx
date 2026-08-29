/**
 * axe-core 기반 접근성 자동 검사.
 *
 * jsdom에는 레이아웃 엔진이 없고 CSS도 모킹되므로 색 대비·포커스 가시성은 여기서 잡히지 않는다.
 * (대비는 `src/styles/tokens.test.ts`가 토큰 값 수준에서 검증한다.)
 * 이 파일이 잡는 것은 구조적 결함이다 — 이름 없는 컨트롤, 레이블 미연결,
 * aria-hidden 안의 포커스 가능 요소, 잘못된 role/aria 조합 등.
 */
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axeCore from 'axe-core';

import { Alert } from '../components/feedback/Alert';
import { Avatar } from '../components/data-display/Avatar';
import { Badge } from '../components/data-display/Badge';
import { Button } from '../components/core/Button';
import { Carousel } from '../components/data-display/Carousel';
import { Checkbox } from '../components/form/Checkbox';
import { Container } from '../components/layout/Container';
import { DropdownMenu } from '../components/overlay/DropdownMenu';
import { Flex } from '../components/layout/Flex';
import { Grid } from '../components/layout/Grid';
import { Heading } from '../components/typography/Heading';
import { Input } from '../components/form/Input';
import { Label } from '../components/typography/Label';
import { Modal } from '../components/overlay/Modal';
import { Radio } from '../components/form/Radio';
import { Select } from '../components/form/Select';
import { Skeleton } from '../components/feedback/Skeleton';
import { Spinner } from '../components/feedback/Spinner';
import { Stack } from '../components/layout/Stack';
import { Switch } from '../components/form/Switch';
import { Tabs } from '../components/navigation/Tabs';
import { Text } from '../components/typography/Text';
import { Textarea } from '../components/form/Textarea';
import { ToastProvider } from '../components/overlay/Toast';
import { Tooltip } from '../components/overlay/Tooltip';
import { Box } from '../components/layout/Box';

/**
 * 끄는 규칙과 그 이유.
 *
 * - `color-contrast` — jsdom에는 CSS가 적용되지 않아 항상 무의미한 결과가 나온다.
 *   대비는 `src/styles/tokens.test.ts`가 토큰 값에서 직접 계산해 검증한다.
 * - 나머지는 전부 **페이지 단위** 규칙이다. 랜드마크 구조·`<html lang>`·`<title>`·
 *   h1 존재 여부는 라이브러리가 아니라 이 컴포넌트를 쓰는 앱의 책임이라
 *   컴포넌트 조각을 검사하는 이 파일에서는 판정 대상이 아니다.
 */
const AXE_OPTIONS = {
  rules: {
    'color-contrast': { enabled: false },
    region: { enabled: false },
    'landmark-one-main': { enabled: false },
    'page-has-heading-one': { enabled: false },
    'html-has-lang': { enabled: false },
    'document-title': { enabled: false },
    bypass: { enabled: false },
  },
};

/**
 * 포탈로 body에 렌더되는 컴포넌트가 있으므로 컨테이너가 아니라
 * document.body 전체를 검사한다.
 *
 * `[data-floating-ui-focus-guard]`는 제외한다 — `@floating-ui/react`가
 * 포탈된 콘텐츠의 탭 순서를 유지하려고 심는 이름 없는 `role="button"` 센티넬이다.
 * 우리 코드가 만드는 노드가 아니고 우리가 이름을 붙일 수도 없다.
 * 탭 순서 보존을 포기하면(preserveTabOrder=false) 사라지지만,
 * 그 경우 메뉴에서 Tab이 문서 끝으로 튀어 사용자 손해가 더 크다.
 * (업스트림 이슈로 보고 대상)
 */
async function expectNoViolations() {
  // jest-axe의 axe() 헬퍼는 컨텍스트 객체(include/exclude)를 못 받으므로
  // axe-core를 직접 호출하고 매처만 jest-axe 것을 쓴다.
  const results = await axeCore.run(
    {
      include: [['body']],
      exclude: [['[data-floating-ui-focus-guard]']],
    },
    AXE_OPTIONS,
  );
  expect(results).toHaveNoViolations();
}

const CASES: Array<[string, ReactElement]> = [
  ['Box', <Box padding="md">내용</Box>],
  ['Flex', <Flex gap="md"><span>왼쪽</span><span>오른쪽</span></Flex>],
  ['Stack', <Stack spacing="md"><span>하나</span><span>둘</span></Stack>],
  ['Grid', <Grid columns={2} gap="md"><span>하나</span><span>둘</span></Grid>],
  ['Container', <Container maxWidth="lg">내용</Container>],
  ['Text', <Text>본문 텍스트</Text>],
  ['Heading', <Heading as="h1">제목</Heading>],
  ['Label', <><Label htmlFor="a11y-name" required>이름</Label><input id="a11y-name" /></>],
  ['Button', <Button>저장</Button>],
  ['Button (아이콘 전용)', <Button aria-label="삭제" leftIcon={<span />} />],
  ['Button (로딩)', <Button isLoading>저장</Button>],
  ['Input (id 없음)', <Input label="이메일" />],
  ['Input (에러)', <Input label="이메일" error="형식이 올바르지 않습니다" required />],
  ['Input (힌트)', <Input label="비밀번호" type="password" hint="8자 이상" />],
  ['Textarea', <Textarea label="설명" hint="최대 200자" />],
  ['Checkbox', <Checkbox label="약관에 동의합니다" />],
  ['Radio', <Radio name="color" value="red" label="빨강" />],
  ['Switch', <Switch label="알림 받기" />],
  ['Select', <Select label="국가" options={[{ value: 'kr', label: '대한민국' }]} placeholder="선택" />],
  ['Spinner', <Spinner />],
  ['Skeleton', <Skeleton width={200} height={16} />],
  ['Alert', <Alert variant="danger" title="오류">저장하지 못했습니다</Alert>],
  ['Avatar (이미지)', <Avatar src="/me.jpg" name="홍길동" />],
  ['Avatar (이니셜)', <Avatar name="홍길동" />],
  ['Badge', <Badge variant="success">활성</Badge>],
  ['Badge (dot)', <Badge variant="danger" dot>새 알림</Badge>],
  [
    'Carousel',
    <Carousel
      items={[<div key="1">슬라이드 1</div>, <div key="2">슬라이드 2</div>]}
    />,
  ],
  [
    'Carousel (포커스 가능한 콘텐츠)',
    <Carousel
      items={[
        <a key="1" href="/one">첫 링크</a>,
        <a key="2" href="/two">둘째 링크</a>,
      ]}
      autoPlayInterval={5000}
    />,
  ],
  [
    'Tabs',
    <Tabs.Root defaultValue="a">
      <Tabs.List aria-label="섹션">
        <Tabs.Trigger value="a">A</Tabs.Trigger>
        <Tabs.Trigger value="b">B</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">패널 A</Tabs.Panel>
      <Tabs.Panel value="b">패널 B</Tabs.Panel>
    </Tabs.Root>,
  ],
  [
    'Tabs (기본값 없음)',
    <Tabs.Root>
      <Tabs.List aria-label="섹션">
        <Tabs.Trigger value="a">A</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">패널 A</Tabs.Panel>
    </Tabs.Root>,
  ],
  [
    'Modal',
    <Modal isOpen onClose={() => {}} title="삭제 확인" footer={<Button>확인</Button>}>
      정말 삭제하시겠습니까?
    </Modal>,
  ],
  ['ToastProvider (빈 상태)', <ToastProvider><Button>알림</Button></ToastProvider>],
];

describe('접근성 자동 검사 (axe)', () => {
  it.each(CASES)('should have no violations: %s', async (_name, element) => {
    render(element);
    await expectNoViolations();
  });

  it('should have no violations for an open dropdown menu', async () => {
    const { getByRole } = render(
      <DropdownMenu
        trigger={<Button>옵션</Button>}
        items={[
          { key: 'edit', label: '수정' },
          { key: 'del', label: '삭제', destructive: true },
          { key: 'off', label: '비활성', disabled: true },
        ]}
      />
    );
    await userEvent.click(getByRole('button', { name: '옵션' }));
    await expectNoViolations();
  });

  it('should have no violations for a visible tooltip', async () => {
    const { getByRole } = render(
      <Tooltip content="저장합니다" delay={0}>
        <Button>저장</Button>
      </Tooltip>
    );
    await userEvent.hover(getByRole('button', { name: '저장' }));
    await expectNoViolations();
  });

  it('should have no violations for a modal containing a form', async () => {
    render(
      <Modal isOpen onClose={() => {}} title="프로필 편집">
        <Stack spacing="md">
          <Input label="이름" />
          <Select label="국가" options={[{ value: 'kr', label: '대한민국' }]} />
          <Checkbox label="공개 프로필" />
        </Stack>
      </Modal>
    );
    await expectNoViolations();
  });
});
