/**
 * @jest-environment node
 */
/**
 * 서버 렌더링 검증.
 *
 * jsdom이 아니라 **DOM이 아예 없는 node 환경**에서 돌린다.
 * 렌더 중에 `window`나 `document`를 건드리는 컴포넌트가 있으면 여기서 바로 터진다.
 * Next.js App Router의 서버 컴포넌트 경계에서 실제로 일어나는 상황이다.
 */
import { renderToString } from 'react-dom/server';
import type { ReactElement } from 'react';

import { Alert } from '../components/feedback/Alert';
import { Avatar } from '../components/data-display/Avatar';
import { Badge } from '../components/data-display/Badge';
import { Box } from '../components/layout/Box';
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
import { DesignSystemProvider } from '../i18n';

const noop = () => {};

const CASES: Array<[string, ReactElement]> = [
  ['Box', <Box padding="md">내용</Box>],
  ['Flex', <Flex gap="md"><span>x</span></Flex>],
  ['Stack', <Stack spacing="md"><span>x</span></Stack>],
  ['Grid', <Grid columns={2}><span>x</span></Grid>],
  ['Container', <Container>내용</Container>],
  ['Text', <Text>본문</Text>],
  ['Heading', <Heading as="h1">제목</Heading>],
  ['Label', <Label htmlFor="x" required>이름</Label>],
  ['Button', <Button>저장</Button>],
  ['Button (로딩)', <Button isLoading>저장</Button>],
  ['Input', <Input label="이메일" error="형식 오류" />],
  ['Textarea', <Textarea label="설명" hint="최대 200자" />],
  ['Checkbox', <Checkbox label="동의" />],
  ['Radio', <Radio name="c" value="a" label="A" />],
  ['Switch', <Switch label="알림" />],
  ['Select', <Select label="국가" placeholder="선택" options={[{ value: 'kr', label: '한국' }]} />],
  ['Spinner', <Spinner />],
  ['Skeleton', <Skeleton width={100} height={16} />],
  ['Alert', <Alert variant="danger" title="오류">저장 실패</Alert>],
  ['Avatar', <Avatar name="홍길동" />],
  ['Badge', <Badge variant="danger" dot>3</Badge>],
  ['Carousel', <Carousel items={[<div key="1">A</div>, <div key="2">B</div>]} autoPlayInterval={3000} />],
  [
    'Tabs',
    <Tabs.Root defaultValue="a">
      <Tabs.List aria-label="섹션">
        <Tabs.Trigger value="a">A</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="a">패널</Tabs.Panel>
    </Tabs.Root>,
  ],
  ['Modal (열림)', <Modal isOpen onClose={noop} title="확인">본문</Modal>],
  ['ToastProvider', <ToastProvider><span>앱</span></ToastProvider>],
  ['Tooltip', <Tooltip content="도움말"><button type="button">?</button></Tooltip>],
  ['DropdownMenu', <DropdownMenu trigger={<button type="button">메뉴</button>} items={[{ key: 'a', label: 'A' }]} />],
  ['DesignSystemProvider', <DesignSystemProvider locale="en"><Button>Save</Button></DesignSystemProvider>],
];

describe('서버 렌더링', () => {
  it('should have no DOM globals in this environment', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it.each(CASES)('should render without touching the DOM: %s', (_name, element) => {
    expect(() => renderToString(element)).not.toThrow();
  });

  it('should render field markup on the server', () => {
    const html = renderToString(<Input label="이메일" error="형식 오류" />);
    expect(html).toContain('이메일');
    expect(html).toContain('형식 오류');
    expect(html).toContain('aria-invalid="true"');
  });

  it('should not emit portal content on the server', () => {
    // 포탈은 마운트 이후에만 렌더된다. 서버 HTML에 다이얼로그가 섞이면 하이드레이션이 깨진다.
    const html = renderToString(<Modal isOpen onClose={noop} title="확인">본문</Modal>);
    expect(html).toBe('');
  });

  it('should translate server-rendered labels', () => {
    const html = renderToString(
      <DesignSystemProvider locale="en">
        <Carousel items={[<div key="1">A</div>, <div key="2">B</div>]} />
      </DesignSystemProvider>
    );
    expect(html).toContain('Next slide');
    expect(html).not.toContain('다음 슬라이드');
  });
});
