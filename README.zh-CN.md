# null_ong2-design-system

[한국어](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.ko.md) · [English](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.en.md) · **中文**

生产可用的 React 设计系统库。

### 📖 文档站点

**👉 https://null-ong2-design-system-docs.vercel.app/**

在线演示 · 一键复制代码片段 · Props 表格 · 设计令牌可视化。

> 本 README 用于快速查阅。详细用法与示例请见上方站点。

---

## 安装

```bash
npm install null_ong2-design-system
```

> **Peer dependencies** — 需要 React 18 及以上版本

```bash
npm install react react-dom
```

## 快速开始

### 1. 引入样式表（在应用入口引入一次）

```tsx
// app/layout.tsx（Next.js App Router）
// 或 _app.tsx（Next.js Pages Router）
// 或 main.tsx（Vite / CRA）
import 'null_ong2-design-system/styles.css';
```

> **v0.2.2 起变更**：此前样式会自动注入，但在 SSR（如 Next.js App Router）下会出现 FOUC，因此改为导出独立的 CSS 文件，由构建工具内联进 SSR HTML。

### 2. 使用组件

可以在 React Server Component 环境（Next.js App Router）中直接引入 —— 包内已包含 `"use client"` 指令。

```tsx
import { Button, Input, Alert, Stack } from 'null_ong2-design-system';

function App() {
  return (
    <Stack spacing="lg">
      <Alert variant="info">欢迎使用本设计系统。</Alert>

      <Input
        id="email"
        label="邮箱"
        type="email"
        placeholder="example@mail.com"
        required
      />

      <Button variant="primary" onClick={() => alert('已保存')}>
        保存
      </Button>
    </Stack>
  );
}
```

---

## 组件一览

| 分类 | 组件 |
|---------|---------|
| **Layout** | `Box`、`Flex`、`Stack`、`Grid`、`Container` |
| **Typography** | `Text`、`Heading`、`Label` |
| **Core UI** | `Button` |
| **Form** | `Input`、`Textarea`、`Checkbox`、`Radio`、`Select`、`Switch` |
| **Feedback** | `Spinner`、`Skeleton`、`Alert` |
| **Data Display** | `Avatar`、`Badge`、`Carousel` |
| **Navigation** | `Tabs` |
| **Overlay** | `Modal`、`Tooltip`、`DropdownMenu`、`Toast`（`ToastProvider` + `useToast`） |

---

## 布局组件

### Box

通用布局容器。通过 `as` 属性可以改变渲染的 HTML 元素（多态组件）。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 要渲染的元素或组件 |
| `padding` | `SpacingKey` | — | 四个方向的内边距 |
| `paddingX` | `SpacingKey` | — | 水平内边距 |
| `paddingY` | `SpacingKey` | — | 垂直内边距 |
| `margin` | `SpacingKey` | — | 四个方向的外边距 |
| `marginX` | `SpacingKey` | — | 水平外边距 |
| `marginY` | `SpacingKey` | — | 垂直外边距 |
| `borderRadius` | `RadiusKey` | — | 圆角 |
| `bg` | `string` | — | 背景色（CSS 变量或颜色值） |
| `display` | `CSSProperties['display']` | — | `display` 属性 |
| `width` | `CSSProperties['width']` | — | 宽度 |
| `height` | `CSSProperties['height']` | — | 高度 |
| `overflow` | `CSSProperties['overflow']` | — | `overflow` 属性 |

> **SpacingKey**：`'0'` `'px'` `'0.5'` `'1'` `'2'` `'3'` `'4'` `'5'` `'6'` `'8'` `'10'` `'12'` `'16'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'`
>
> **RadiusKey**：`'none'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'full'`

```tsx
import { Box } from 'null_ong2-design-system';

// 基本用法
<Box padding="md" borderRadius="lg" bg="var(--ds-color-neutral-50)">
  卡片内容
</Box>

// 渲染为其他元素
<Box as="section" padding="xl" marginY="lg">
  区块内容
</Box>

// 分别设置水平与垂直内边距
<Box paddingX="lg" paddingY="sm" borderRadius="md">
  横幅
</Box>
```

---

### Flex

Flexbox 布局组件。支持 `as` 属性。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 要渲染的元素 |
| `direction` | `CSSProperties['flexDirection']` | — | `'row'`、`'column'` 等 |
| `align` | `CSSProperties['alignItems']` | — | `'center'`、`'flex-start'` 等 |
| `justify` | `CSSProperties['justifyContent']` | — | `'center'`、`'space-between'` 等 |
| `wrap` | `CSSProperties['flexWrap']` | — | `'wrap'`、`'nowrap'` 等 |
| `gap` | `SpacingKey` | — | 子元素之间的间距 |
| `columnGap` | `SpacingKey` | — | 列间距 |
| `rowGap` | `SpacingKey` | — | 行间距 |
| `flex` | `CSSProperties['flex']` | — | `flex` 简写属性 |

```tsx
import { Flex } from 'null_ong2-design-system';

// 页头：两端对齐
<Flex justify="space-between" align="center">
  <span>Logo</span>
  <nav>菜单</nav>
</Flex>

// 水平排列并保持间距
<Flex gap="md" wrap="wrap">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Storybook</Tag>
</Flex>

// 渲染为 nav 元素
<Flex as="nav" gap="sm" align="center">
  <a href="/">首页</a>
  <a href="/about">关于</a>
</Flex>
```

---

### Stack

以固定间距堆叠子元素。支持 `as` 属性。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 要渲染的元素 |
| `spacing` | `SpacingKey` | `'md'` | 子元素之间的间距 |
| `direction` | `'column'` \| `'row'` | `'column'` | 堆叠方向 |
| `align` | `CSSProperties['alignItems']` | — | 交叉轴对齐 |
| `justify` | `CSSProperties['justifyContent']` | — | 主轴对齐 |

```tsx
import { Stack } from 'null_ong2-design-system';

// 纵向卡片列表
<Stack spacing="md">
  <Card>条目 1</Card>
  <Card>条目 2</Card>
  <Card>条目 3</Card>
</Stack>

// 用较大间距分隔区块
<Stack spacing="xl">
  <Section>第一个区块</Section>
  <Section>第二个区块</Section>
</Stack>

// 横向堆叠
<Stack direction="row" spacing="sm" align="center">
  <Avatar />
  <span>用户名</span>
</Stack>
```

---

### Grid

CSS Grid 布局组件。支持 `as` 属性。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 要渲染的元素 |
| `columns` | `number \| string` | — | 列数（数字）或 `grid-template-columns` 值（字符串） |
| `rows` | `number \| string` | — | 行数或 `grid-template-rows` 值 |
| `gap` | `SpacingKey` | — | 单元格间距 |
| `columnGap` | `SpacingKey` | — | 列间距 |
| `rowGap` | `SpacingKey` | — | 行间距 |
| `align` | `CSSProperties['alignItems']` | — | 单元格垂直对齐 |
| `justify` | `CSSProperties['justifyItems']` | — | 单元格水平对齐 |

> 给 `columns` 传数字会自动展开为 `repeat(N, minmax(0, 1fr))`。

```tsx
import { Grid } from 'null_ong2-design-system';

// 三列网格
<Grid columns={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
  <Card>5</Card>
  <Card>6</Card>
</Grid>

// 响应式自动填充
<Grid columns="repeat(auto-fill, minmax(250px, 1fr))" gap="lg">
  {products.map((p) => <ProductCard key={p.id} product={p} />)}
</Grid>

// 自定义列宽比例
<Grid columns="1fr 2fr 1fr" gap="md">
  <Sidebar />
  <MainContent />
  <Aside />
</Grid>

// 分别设置行列间距
<Grid columns={2} columnGap="lg" rowGap="sm">
  <Cell>A</Cell>
  <Cell>B</Cell>
  <Cell>C</Cell>
  <Cell>D</Cell>
</Grid>
```

---

### Container

限制内容最大宽度并居中。支持 `as` 属性。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | 要渲染的元素 |
| `maxWidth` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'full'` | `'lg'` | 最大宽度 |

| maxWidth | 值 |
|----------|-----|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `full` | 100% |

```tsx
import { Container } from 'null_ong2-design-system';

// 默认（1024px）
<Container>
  <main>页面内容</main>
</Container>

// 较窄的内容（640px）—— 适合博客正文
<Container maxWidth="sm">
  <article>博客正文……</article>
</Container>

// 渲染为 main 元素
<Container as="main" maxWidth="xl">
  仪表盘
</Container>
```

---

## 排版组件

### Text

正文文本组件。支持 `as` 属性（默认 `<p>`）。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `ElementType` | `'p'` | 要渲染的元素 |
| `size` | `FontSizeKey` | `'base'` | 字号 |
| `weight` | `FontWeightKey` | `'normal'` | 字重 |
| `color` | `'default'` \| `'muted'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` | `'default'` | 文字颜色 |
| `align` | `CSSProperties['textAlign']` | — | 文本对齐 |
| `truncate` | `boolean` | `false` | 超出时以省略号截断 |

> **FontSizeKey**：`'xs'` `'sm'` `'base'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'`
>
> **FontWeightKey**：`'normal'` `'medium'` `'semibold'` `'bold'`

```tsx
import { Text } from 'null_ong2-design-system';

// 普通段落
<Text>这是一段普通正文。</Text>

// 字号与字重
<Text size="lg" weight="semibold">加大的强调文字</Text>

// 语义颜色
<Text size="sm" color="muted">辅助说明文字</Text>
<Text color="danger">发生了错误。</Text>
<Text color="success">处理成功。</Text>

// 作为行内元素使用
<Text as="span" weight="bold" color="primary">重点词</Text>

// 文字溢出时显示省略号
<div style={{ width: '200px' }}>
  <Text truncate>
    这段文字超出容器宽度后会以省略号截断。
  </Text>
</div>

// 文本对齐
<Text align="center">居中文本</Text>
```

---

### Heading

区块标题组件。用 `as` 指定 h1~h6 语义层级，用 `size` 独立控制视觉大小。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `as` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` \| `'h5'` \| `'h6'` | `'h2'` | 标题层级 |
| `size` | `FontSizeKey` | 依层级自动决定 | 视觉字号 |
| `color` | `string` | `--ds-color-neutral-900` | 文字颜色 |
| `align` | `CSSProperties['textAlign']` | — | 文本对齐 |

**各层级的默认字号：**

| 层级 | 默认 size | 实际大小 |
|------|-----------|----------|
| `h1` | `4xl` | 36px |
| `h2` | `3xl` | 30px |
| `h3` | `2xl` | 24px |
| `h4` | `xl` | 20px |
| `h5` | `lg` | 18px |
| `h6` | `base` | 16px |

```tsx
import { Heading } from 'null_ong2-design-system';

// 默认（渲染 h2，30px）
<Heading>区块标题</Heading>

// 页面主标题
<Heading as="h1">页面主标题</Heading>

// 保持文档结构，同时缩小视觉尺寸
<Heading as="h2" size="sm">侧边栏标题</Heading>

// 颜色与对齐
<Heading as="h3" color="var(--ds-color-primary-600)" align="center">
  居中的区块标题
</Heading>
```

---

### Label

与表单控件关联的标签组件。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `htmlFor` | `string` | — | 要关联的 input 的 id |
| `required` | `boolean` | — | 必填（显示红色 `*`） |

```tsx
import { Label } from 'null_ong2-design-system';

// 基本标签
<Label htmlFor="username">用户名</Label>
<input id="username" />

// 必填标记
<Label htmlFor="email" required>邮箱</Label>
<input id="email" type="email" />
```

> **提示**：给 `Input`、`Textarea`、`Select` 传 `label` 属性时会自动渲染 Label，无需另行使用。

---

## 核心 UI 组件

### Button

触发用户操作的按钮组件。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `variant` | `'primary'` \| `'secondary'` \| `'ghost'` \| `'danger'` | `'primary'` | 视觉样式 |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | 按钮尺寸 |
| `isLoading` | `boolean` | `false` | 加载状态（显示加载指示器并禁止点击） |
| `disabled` | `boolean` | `false` | 禁用 |
| `leftIcon` | `ReactNode` | — | 文字左侧图标 |
| `rightIcon` | `ReactNode` | — | 文字右侧图标 |

> 支持传入 `ref`（已使用 `forwardRef`）。

```tsx
import { Button } from 'null_ong2-design-system';

// 各种 variant
<Button variant="primary">确认</Button>
<Button variant="secondary">取消</Button>
<Button variant="ghost">查看更多</Button>
<Button variant="danger">删除</Button>

// 尺寸
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 加载状态 —— 自动显示指示器且无法点击
<Button isLoading>保存中……</Button>
<Button variant="danger" isLoading>删除中……</Button>

// 禁用
<Button disabled>无法提交</Button>

// 带图标
<Button leftIcon={<PlusIcon />}>添加条目</Button>
<Button rightIcon={<ArrowRightIcon />} variant="secondary">下一步</Button>

// 使用 ref
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef} onClick={handleClick}>焦点测试</Button>
```

---

## 表单组件

### Input

文本输入组件，内置标签、提示与错误信息。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | input 的 id。省略时内部会生成唯一 id 来关联标签、提示与错误 |
| `label` | `string` | — | 标签文字 |
| `hint` | `string` | — | 提示信息（无错误时显示） |
| `error` | `string` | — | 错误信息（存在时切换为错误样式） |
| `required` | `boolean` | — | 必填（标签上显示 `*`） |
| `type` | `string` | `'text'` | input 类型（`email`、`password`、`number` 等） |
| `placeholder` | `string` | — | 占位文字 |
| `disabled` | `boolean` | `false` | 禁用 |

> 支持传入 `ref`，并可使用全部原生 `<input>` 属性。

```tsx
import { Input } from 'null_ong2-design-system';

// 基本用法
<Input id="name" label="姓名" placeholder="请输入姓名" />

// 必填 + 提示
<Input
  id="email"
  label="邮箱"
  type="email"
  placeholder="example@mail.com"
  hint="请填写工作邮箱"
  required
/>

// 错误状态 —— 显示错误信息并加红色边框
<Input
  id="password"
  label="密码"
  type="password"
  error="请输入 8 位以上字符"
/>

// 禁用
<Input
  id="readonly"
  label="只读"
  defaultValue="无法修改"
  disabled
/>

// 使用 ref
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} id="search" placeholder="输入关键词" />
```

---

### Textarea

多行文本输入组件，标签 / 提示 / 错误的用法与 Input 一致。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | textarea 的 id。省略时标签、提示与错误依然会正确关联 |
| `label` | `string` | — | 标签文字 |
| `hint` | `string` | — | 提示信息 |
| `error` | `string` | — | 错误信息 |
| `required` | `boolean` | — | 必填 |
| `rows` | `number` | — | 初始显示行数 |
| `disabled` | `boolean` | `false` | 禁用 |

```tsx
import { Textarea } from 'null_ong2-design-system';

// 基本用法
<Textarea id="desc" label="说明" rows={4} placeholder="请输入内容" />

// 错误状态
<Textarea
  id="review"
  label="评价"
  error="请至少输入 20 个字"
/>

// 必填 + 提示
<Textarea
  id="bio"
  label="个人简介"
  rows={5}
  hint="最多可输入 500 字"
  required
/>
```

---

### Checkbox

复选框组件，同时支持受控与非受控。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | checkbox 的 id。省略时标签依然会正确关联 |
| `label` | `string` | — | 复选框标签 |
| `checked` | `boolean` | — | 勾选状态（受控） |
| `defaultChecked` | `boolean` | — | 初始勾选状态（非受控） |
| `onChange` | `(checked: boolean, event) => void` | — | 状态变化回调 |
| `disabled` | `boolean` | — | 禁用 |

> `onChange` 的第一个参数是 `boolean`（是否勾选）。

```tsx
import { Checkbox } from 'null_ong2-design-system';

// 非受控
<Checkbox id="agree" label="我同意服务条款" />

// 受控
const [agreed, setAgreed] = useState(false);
<Checkbox
  id="terms"
  label="我同意处理我的个人信息"
  checked={agreed}
  onChange={setAgreed}
/>

// 禁用
<Checkbox id="locked" label="不可更改" disabled defaultChecked />
```

---

### Radio

单选按钮组件。`name` 相同的一组中只能选择一个。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | radio 的 id。省略时标签依然会正确关联 |
| `name` | `string` | — | 分组名称（同组使用同一个 name） |
| `value` | `string` | — | 该项的值 |
| `label` | `string` | — | 单选按钮标签 |
| `checked` | `boolean` | — | 选中状态（受控） |
| `onChange` | `(value: string, event) => void` | — | 值变化回调 |
| `disabled` | `boolean` | — | 禁用 |

> `onChange` 的第一个参数是被选中的 `string` 值。

```tsx
import { Radio } from 'null_ong2-design-system';

// 单选组
const [method, setMethod] = useState('email');

<Radio
  id="contact-email"
  name="contact"
  value="email"
  label="邮箱"
  checked={method === 'email'}
  onChange={setMethod}
/>
<Radio
  id="contact-phone"
  name="contact"
  value="phone"
  label="电话"
  checked={method === 'phone'}
  onChange={setMethod}
/>
<Radio
  id="contact-sms"
  name="contact"
  value="sms"
  label="短信"
  checked={method === 'sms'}
  onChange={setMethod}
/>
```

---

### Select

下拉选择组件，选项通过 `options` 属性传入。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | select 的 id。省略时标签、提示与错误依然会正确关联 |
| `label` | `string` | — | 标签文字 |
| `options` | `SelectOption[]` | **必填** | 选项列表 |
| `placeholder` | `string` | — | 占位选项文字。未传 `value`/`defaultValue` 时它会成为初始选中项 |
| `hint` | `string` | — | 提示信息 |
| `error` | `string` | — | 错误信息 |
| `required` | `boolean` | — | 必填 |
| `disabled` | `boolean` | `false` | 禁用 |

```ts
// SelectOption 类型
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;  // 禁用单个选项
}
```

```tsx
import { Select } from 'null_ong2-design-system';

const countries = [
  { value: 'kr', label: '韩国' },
  { value: 'us', label: '美国' },
  { value: 'jp', label: '日本' },
  { value: 'cn', label: '中国', disabled: true },  // 不可选
];

// 基本用法
<Select
  id="country"
  label="国家"
  options={countries}
  placeholder="请选择"
/>

// 错误状态
<Select
  id="country"
  label="国家"
  options={countries}
  placeholder="请选择"
  error="请选择国家"
/>

// 受控
const [country, setCountry] = useState('');
<Select
  id="country"
  label="居住国家"
  options={countries}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  hint="请选择当前居住的国家"
  required
/>
```

---

## 反馈组件

### Spinner

表示加载状态的旋转指示器。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` | `'md'` | 尺寸 |
| `label` | `string` | 取自当前语言 | 供屏幕阅读器使用的标签 |

> 指示器颜色继承自父元素的 `color`（`currentColor`）。

```tsx
import { Spinner } from 'null_ong2-design-system';

// 基本用法
<Spinner />

// 尺寸
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// 颜色继承自父元素
<span style={{ color: '#3b82f6' }}>
  <Spinner size="md" />
</span>

// 自定义无障碍标签
<Spinner label="正在加载数据" />
```

---

### Skeleton

内容加载期间显示的骨架屏组件。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `width` | `number \| string` | — | 宽度（数字 = px，字符串 = CSS 值） |
| `height` | `number \| string` | — | 高度 |
| `variant` | `'rectangular'` \| `'text'` \| `'circle'` | `'rectangular'` | 形状 |

```tsx
import { Skeleton } from 'null_ong2-design-system';

// 图片占位
<Skeleton width={300} height={200} />

// 文本行（高度默认为 1em）
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />

// 圆形头像
<Skeleton variant="circle" width={48} height={48} />

// 组合成卡片加载态
<Flex gap="md" align="flex-start">
  <Skeleton variant="circle" width={48} height={48} />
  <Stack spacing="sm" style={{ flex: 1 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="75%" />
  </Stack>
</Flex>

// 使用百分比
<Skeleton width="100%" height={120} />
```

---

### Alert

向用户传达反馈信息的提示组件，每个 variant 都自带默认图标。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `variant` | `'info'` \| `'success'` \| `'warning'` \| `'danger'` | `'info'` | 提示种类 |
| `title` | `string` | — | 标题（可选） |
| `children` | `ReactNode` | **必填** | 提示内容 |
| `icon` | `ReactNode` | 各 variant 的默认图标 | 自定义图标 |

> `warning` 与 `danger` 使用 `role="alert"`（立即播报），`info` 与 `success` 使用 `role="status"`（不打断）。

```tsx
import { Alert } from 'null_ong2-design-system';

// 信息
<Alert variant="info">系统即将进行维护。</Alert>

// 成功 —— 标题 + 内容
<Alert variant="success" title="保存完成">
  修改已成功保存。
</Alert>

// 警告
<Alert variant="warning" title="请注意">
  此操作无法撤销，请谨慎处理。
</Alert>

// 错误
<Alert variant="danger" title="发生错误">
  处理请求时出现问题，请稍后重试。
</Alert>

// 自定义图标
<Alert variant="info" icon={<BellIcon />}>
  您有新的通知。
</Alert>

// 只有内容，没有标题
<Alert variant="warning">
  您的密码即将过期，请及时更换。
</Alert>
```

---

## Switch（表单）

即时生效的开关。与 Checkbox 不同，更适合设置类界面。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `id` | `string` | 自动生成 | switch 的 id。省略时标签依然会正确关联 |
| `label` | `string` | — | 标签文字 |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | 尺寸 |
| `checked` | `boolean` | — | 状态（受控） |
| `defaultChecked` | `boolean` | — | 初始状态（非受控） |
| `onChange` | `(checked: boolean, event) => void` | — | 变化回调 |
| `disabled` | `boolean` | — | 禁用 |

```tsx
import { Switch } from 'null_ong2-design-system';

const [enabled, setEnabled] = useState(false);
<Switch id="notify" label="接收通知" checked={enabled} onChange={setEnabled} />
```

---

## Avatar（数据展示）

支持图片与首字母兜底的头像组件。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `src` | `string` | — | 图片 URL |
| `name` | `string` | — | 姓名（用于 `alt` 与首字母兜底） |
| `alt` | `string` | — | 图片 alt（指定时优先） |
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | 尺寸 |
| `shape` | `'circle'` \| `'square'` | `'circle'` | 形状 |

```tsx
import { Avatar } from 'null_ong2-design-system';

<Avatar src="/me.jpg" name="张三" />
<Avatar name="John Doe" size="lg" />        // 没有图片时显示 "JD"
<Avatar src="/broken.jpg" name="Jane" />    // 加载失败时兜底为 "JA"
```

> 首字母按字素（grapheme）切分，因此表情符号与组合字符不会被截成半个。

---

## Badge（数据展示）

展示状态或计数的小标签。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `variant` | `'neutral'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` \| `'info'` | `'neutral'` | 视觉样式 |
| `size` | `'sm'` \| `'md'` | `'md'` | 尺寸 |
| `dot` | `boolean` | `false` | 圆点形态。children 在视觉上隐藏，但屏幕阅读器仍会读出 |

```tsx
import { Badge } from 'null_ong2-design-system';

<Badge variant="success">启用中</Badge>
<Badge variant="danger">99+</Badge>
<Badge variant="danger" dot />                    // 只显示红点
<Badge variant="danger" dot>3 条新通知</Badge>     // 界面上只有红点，屏幕阅读器读出「3 条新通知」
```

---

## Carousel（数据展示）

每次展示一张幻灯片的轮播组件。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `items` | `ReactNode[]` | **必填** | 幻灯片内容数组 |
| `index` | `number` | — | 当前索引（受控） |
| `defaultIndex` | `number` | `0` | 初始索引 |
| `onChange` | `(index: number) => void` | — | 变化回调 |
| `autoPlayInterval` | `number` | `0` | 自动播放间隔（毫秒），`0` 表示关闭 |
| `loop` | `boolean` | `true` | 循环播放 |
| `showArrows` | `boolean` | `true` | 显示左右箭头 |
| `showIndicators` | `boolean` | `true` | 显示圆点指示器 |
| `ariaLabel` | `string` | 取自当前语言 | 轮播区域的无障碍标签 |

**无障碍**

- 画面外的幻灯片会被标记为 `inert` 而退出 Tab 顺序，即使其中包含链接或按钮也不会出问题。
- 开启 `autoPlayInterval` 时会同时出现播放 / 暂停按钮；鼠标移入或焦点进入时自动暂停。
- 当系统开启「减弱动态效果」（prefers-reduced-motion）时不会启动自动播放。
- 指示器支持 ←/→/Home/End 操作，点击区域为 24×24px。
- 越界的索引会被自动收敛，因此始终显示真实存在的幻灯片。

```tsx
import { Carousel } from 'null_ong2-design-system';

<Carousel
  items={[
    <img src="/1.jpg" alt="横幅 1" />,
    <img src="/2.jpg" alt="横幅 2" />,
    <img src="/3.jpg" alt="横幅 3" />,
  ]}
  autoPlayInterval={3000}
/>
```

---

## Tabs（导航）

基于复合组件模式的标签页。

- 省略 `defaultValue` 时**会自动选中第一个标签**。（若没有任何标签被选中，整个标签栏将无法通过键盘到达。）
- 键盘操作：←/→（`orientation="vertical"` 时为 ↑/↓）循环移动，`Home`/`End` 跳到首尾，`Enter`/`Space` 选中。

| 组件 | 职责 |
|----------|------|
| `Tabs.Root` | 上下文提供者（`defaultValue` / `value` / `onChange` / `orientation`） |
| `Tabs.List` | 触发器容器（`role="tablist"`） |
| `Tabs.Trigger` | 单个标签按钮（`value` / `disabled`） |
| `Tabs.Panel` | 对应触发器处于激活状态时渲染（`value`） |

```tsx
import { Tabs } from 'null_ong2-design-system';

<Tabs.Root defaultValue="profile">
  <Tabs.List aria-label="账户分区">
    <Tabs.Trigger value="profile">个人资料</Tabs.Trigger>
    <Tabs.Trigger value="account">账户</Tabs.Trigger>
    <Tabs.Trigger value="notifications">通知</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile">个人资料页面</Tabs.Panel>
  <Tabs.Panel value="account">账户页面</Tabs.Panel>
  <Tabs.Panel value="notifications">通知设置</Tabs.Panel>
</Tabs.Root>

// 纵向标签页
<Tabs.Root defaultValue="overview" orientation="vertical">...</Tabs.Root>
```

---

## Modal（浮层）

浮层对话框。打开时会自动应用以下行为。

- 焦点移入对话框内部，Tab 仅在其中循环；关闭后焦点回到原位置。
- 锁定背景滚动（移动端不会出现背景跟着滑动的情况）。
- 背景内容会被标记 `aria-hidden` + `inert`，屏幕阅读器无法穿透到背景。
- 即使叠加多个弹窗，按一次 `Esc` **只关闭最上层的那个**。
- 在正文中拖拽选择文字后在遮罩上松开鼠标不会误关闭（以按下位置为准判断）。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `isOpen` | `boolean` | **必填** | 是否打开 |
| `onClose` | `() => void` | **必填** | 关闭回调 |
| `title` | `string` | — | 标题 |
| `children` | `ReactNode` | **必填** | 正文 |
| `footer` | `ReactNode` | — | 底部区域（按钮组等） |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | 尺寸 |
| `closeOnOverlayClick` | `boolean` | `true` | 点击遮罩关闭 |
| `closeOnEscape` | `boolean` | `true` | 按 Esc 关闭 |
| `showCloseButton` | `boolean` | `true` | 显示关闭按钮 |
| `initialFocusRef` | `RefObject<HTMLElement>` | — | 打开时获得焦点的元素（默认为第一个可聚焦元素） |

```tsx
import { Modal, Button } from 'null_ong2-design-system';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>删除</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="确认删除"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setOpen(false)}>取消</Button>
      <Button variant="danger" onClick={handleDelete}>删除</Button>
    </div>
  }
>
  确定要删除吗？此操作无法撤销。
</Modal>
```

---

## Tooltip（浮层）

在悬停或聚焦时显示补充说明，基于 `@floating-ui/react` 自动计算位置。

它渲染到 `body` 的 Portal 中，因此不会被 `overflow: hidden|auto` 的祖先元素（弹窗正文、轮播视口等）裁切。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `content` | `ReactNode` | **必填** | 提示内容 |
| `children` | `ReactElement` | **必填** | 触发元素（单个 element） |
| `placement` | `Placement` | `'top'` | 位置（top/bottom/left/right + start/end） |
| `delay` | `number` | `200` | 显示延迟（毫秒） |
| `disabled` | `boolean` | `false` | 禁用 |

```tsx
import { Tooltip, Button } from 'null_ong2-design-system';

<Tooltip content="保存（Cmd+S）">
  <Button>保存</Button>
</Tooltip>

<Tooltip content="说明" placement="right">
  <Button variant="ghost">信息</Button>
</Tooltip>
```

> `children` 必须是单个可聚焦元素。传入纯文本或 Fragment 时会抛出说明如何修正的错误。

---

## DropdownMenu（浮层）

点击触发的下拉菜单。渲染到 `body` 的 Portal 中，因此不会被 `overflow` 祖先裁切。

键盘操作遵循 WAI-ARIA APG 菜单模式 —— 在触发器上按 ↑/↓ 或 `Enter`/`Space` 打开菜单并把焦点移到第一项；
↑/↓ 循环移动（跳过禁用项）；按 `Esc` 或点击外部关闭，焦点回到触发器。

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `trigger` | `ReactElement` | **必填** | 触发元素 |
| `items` | `DropdownMenuItem[]` | **必填** | 菜单项列表 |
| `placement` | `Placement` | `'bottom-start'` | 菜单位置 |

```ts
interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;  // 红色文字
}
```

```tsx
import { DropdownMenu, Button } from 'null_ong2-design-system';

<DropdownMenu
  trigger={<Button variant="secondary">选项</Button>}
  items={[
    { key: 'edit', label: '编辑', onSelect: handleEdit },
    { key: 'duplicate', label: '复制', onSelect: handleDuplicate },
    { key: 'delete', label: '删除', onSelect: handleDelete, destructive: true },
  ]}
/>
```

---

## Toast（浮层）

全局通知系统。**在应用根部包一次 `<ToastProvider>`**，然后用 `useToast()` 钩子调用。

### 1. 配置 Provider

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

| Prop | 类型 | 默认值 | 说明 |
|------|-----|--------|------|
| `position` | `'top-left'` \| `'top-right'` \| `'top-center'` \| `'bottom-left'` \| `'bottom-right'` \| `'bottom-center'` | `'bottom-right'` | 显示位置 |
| `maxToasts` | `number` | `5` | 同时显示的最大数量（最少为 1） |

### 2. 使用

```tsx
import { useToast } from 'null_ong2-design-system';

function SaveButton() {
  const toast = useToast();

  return (
    <Button
      onClick={async () => {
        try {
          await save();
          toast.success('已保存');
        } catch {
          toast.danger('保存失败', { duration: 5000 });
        }
      }}
    >
      保存
    </Button>
  );
}
```

#### Toast API

| 方法 | 说明 |
|--------|------|
| `toast.show(message, options?)` | 普通提示 |
| `toast.success(message, options?)` | 成功 |
| `toast.warning(message, options?)` | 警告 |
| `toast.danger(message, options?)` | 错误 |
| `toast.info(message, options?)` | 信息 |
| `toast.dismiss(id)` | 关闭指定提示（id 为 `show` 的返回值） |

`options.duration` —— 自动消失时间（毫秒），默认 3000。为 **`0`** 时只能手动关闭。

> 鼠标移入提示区域或焦点进入其中时计时会暂停，提示不会在阅读途中消失。

---

## 设计令牌

所有视觉数值都定义为 CSS 自定义属性，引入样式表时会自动注入到 `:root`。

### 颜色

```css
/* 品牌色 */
--ds-color-primary-50    /* #eff6ff  */
--ds-color-primary-500   /* #3b82f6  */
--ds-color-primary-600   /* #2563eb  */
--ds-color-primary-700   /* #1d4ed8  */

/* 中性色 */
--ds-color-neutral-0     /* #ffffff  */
--ds-color-neutral-100   /* #f3f4f6  */
--ds-color-neutral-500   /* #6b7280  */
--ds-color-neutral-900   /* #111827  */

/* 语义色 */
--ds-color-success       /* #22c55e  */
--ds-color-warning       /* #f59e0b  */
--ds-color-danger        /* #ef4444  */
--ds-color-info          /* #3b82f6  */
```

### 间距

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
--ds-z-popover    /* 200  —— Tooltip / DropdownMenu（必须浮在弹窗之上） */
--ds-z-toast      /* 1000 */
```

### 圆角

```css
--ds-radius-sm     /* 4px    */
--ds-radius-md     /* 6px    */
--ds-radius-lg     /* 8px    */
--ds-radius-xl     /* 12px   */
--ds-radius-full   /* 9999px */
```

### 在 TypeScript 中使用令牌

```tsx
import { SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT, Z_INDEX } from 'null_ong2-design-system';

// SPACING.md   → 'var(--ds-spacing-md)'
// RADIUS.lg    → 'var(--ds-radius-lg)'
// FONT_SIZE.xl → 'var(--ds-font-size-xl)'
```

---

## 主题定制

在项目的全局 CSS 中覆盖 CSS 变量即可改变主题：

```css
:root {
  /* 把品牌色改成紫色 */
  --ds-color-primary-600: #7c3aed;  /* 按钮默认 */
  --ds-color-primary-700: #6d28d9;  /* 按钮 hover */
  --ds-color-primary-800: #5b21b6;  /* 按钮 active */
  --ds-color-primary-500: #8b5cf6;  /* 复选框 / 开关填充 */

  /* 更大的圆角 */
  --ds-radius-md: 8px;

  /* 自定义字体 */
  --ds-font-sans: 'Pretendard', -apple-system, sans-serif;
}
```

> 改颜色时请确认**对比度**。正文文字需达到 4.5:1，图标与边框等 UI 元素需达到 3:1。
> 默认调色板由 `src/styles/tokens.test.ts` 自动校验。

---

## 深色模式

**无需任何配置**，默认跟随系统设置。若想自行控制，可在 `<html>` 上加类名或属性。

```html
<!-- 1. 什么都不做 → 跟随 prefers-color-scheme -->
<html>

<!-- 2. 强制深色（两种写法任选） -->
<html class="dark">
<html data-theme="dark">

<!-- 3. 强制浅色（系统为深色时也保持浅色） -->
<html class="light">
<html data-theme="light">
```

```tsx
// 切换示例
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <Button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? '深色模式' : '浅色模式'}
    </Button>
  );
}
```

令牌在两套主题下的**角色**完全一致 —— `--ds-color-neutral-0` 永远是表面色，
`--ds-color-neutral-900` 永远是最深的文字色。因此组件 CSS 无需按主题分支，
你自己写的组件只要使用同样的令牌，也会自动支持深色模式。

```css
/* 使用令牌的自定义组件会自动适配深色模式 */
.my-card {
  background-color: var(--ds-color-neutral-0);
  color: var(--ds-color-neutral-700);
  border: 1px solid var(--ds-border-color);
}
```

两套主题均满足 WCAG 2.1 AA 对比度要求，并由测试防止回退。

---

## 国际化（i18n）

组件内置的文案（弹窗关闭按钮、轮播箭头、提示区域标签等）大多只会被屏幕阅读器读出 ——
正因如此，硬编码会形成一道看不见的障碍。

默认语言为**韩语**，可通过 `DesignSystemProvider` 更改。不包 Provider 也能正常工作。

```tsx
import { DesignSystemProvider } from 'null_ong2-design-system';

<DesignSystemProvider locale="zh">
  <App />
</DesignSystemProvider>
```

内置语言：`ko`（默认）· `en` · `ja` · `zh`

只想替换部分文案时，同时传入 `strings`，仅指定的键会被替换。

```tsx
<DesignSystemProvider locale="zh" strings={{ close: '关掉', toastRegion: '消息' }}>
  <App />
</DesignSystemProvider>
```

不支持的语言可以直接传入整套文案。

```tsx
import { DesignSystemProvider, ZH_STRINGS } from 'null_ong2-design-system';
import type { DsStrings } from 'null_ong2-design-system';

const FR: DsStrings = { ...ZH_STRINGS, close: 'Fermer', loading: 'Chargement' /* … */ };

<DesignSystemProvider strings={FR}>
  <App />
</DesignSystemProvider>
```

> **不会自动检测**浏览器语言。在 SSR 场景下服务端与客户端可能渲染出不同语言而导致 hydration 不匹配。
> 需要检测时请在应用侧判断后通过 `locale` 传入。

---

## 取值列表常量

每个组件可接受的取值也以运行时数组的形式导出 ——
适合用来构建 variant 选择界面，或校验来自服务端的字符串。

```tsx
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'null_ong2-design-system';

{BUTTON_VARIANTS.map((variant) => (
  <Button key={variant} variant={variant}>{variant}</Button>
))}
```

提供的常量：`ALERT_VARIANTS` `AVATAR_SHAPES` `AVATAR_SIZES` `BADGE_SIZES` `BADGE_VARIANTS`
`BUTTON_SIZES` `BUTTON_VARIANTS` `CONTAINER_MAX_WIDTHS` `HEADING_LEVELS` `MODAL_SIZES`
`SKELETON_VARIANTS` `SPINNER_SIZES` `SWITCH_SIZES` `TEXT_COLORS` `TOAST_POSITIONS` `TOAST_VARIANTS`

---

## 包体积

`dist` **不做压缩**发布。交给使用方的打包工具压缩更有利于 tree-shaking，堆栈信息也更易读。

实际进入你的产物的体积（brotli，含依赖）：

| import | 体积 |
|--------|------|
| `{ Button }` | 约 2.4 kB |
| `{ Modal }` | 约 3.8 kB |
| 全量引入 | 约 30 kB |
| `styles.css` | 约 4.4 kB |

可用 `npm run size` 自行确认，CI 会强制执行上限。

---

## Hooks

### useControllable

用同一套 API 统一处理受控与非受控状态。

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

// 非受控（内部自动管理状态）
<Toggle defaultValue={false} />

// 受控（由外部管理状态）
<Toggle value={isEnabled} onChange={setIsEnabled} />
```

> 中途在受控与非受控之间切换时，开发模式会发出警告。

### useEscapeKey

构建可用 `Esc` 关闭的层。多个层同时激活时，**只有最后打开的那个**会响应。

```tsx
useEscapeKey(isOpen, close);
```

### useFocusTrap

把焦点困在容器内部。激活时移动到第一个可聚焦元素，解除时回到原位置。

```tsx
const ref = useRef<HTMLDivElement>(null);
useFocusTrap(ref, isOpen);

// 想从特定元素开始时
useFocusTrap(ref, isOpen, { initialFocus: cancelButtonRef });
```

> 当 DOM 节点是稍后才挂载的（例如 Portal），请用 state 保存节点而不是 `useRef`，
> 这样 ref 对象的引用会变化、effect 才会重新执行。`Modal` 正是这样做的。

### useBodyScrollLock

激活期间锁定 `<body>` 滚动。多个浮层叠加时通过引用计数只锁一次，
最后一个关闭时恢复原状。会按滚动条宽度补偿 padding，避免布局抖动。

iOS Safari 会忽略 `overflow: hidden`，因此采用 `position: fixed` + 恢复滚动位置的方案。

```tsx
useBodyScrollLock(isOpen);
```

### useInertBackground

弹窗打开期间，将背景中的兄弟元素标记为 `aria-hidden` + `inert`。
带有 `data-ds-layer` 属性的浮层（如 Toast）不受影响。

```tsx
useInertBackground(dialogRef, isOpen);
```

### usePrefersReducedMotion

返回系统「减弱动态效果」设置的状态，用于关闭自动播放 / 自动轮转类 UI。
在没有 `matchMedia` 的环境（如 SSR）中返回 `false`。

```tsx
const prefersReducedMotion = usePrefersReducedMotion();
```

---

## 无障碍

- **键盘** —— 所有交互元素都可用键盘操作。Modal 与 DropdownMenu 还会处理焦点的移动与恢复。
- **焦点可见性** —— 在 `:focus-visible` 上绘制焦点环，并在 Windows 高对比度模式（`forced-colors`）下用系统色 `outline` 加固。
- **减弱动态效果** —— `prefers-reduced-motion: reduce` 时关闭入场动画与过渡。但 Spinner / Skeleton 表示「进行中」，不会停止，只是放慢。
- **触摸目标** —— 轮播指示器等小控件的点击区域也不小于 24×24px（WCAG 2.5.8）。
- **自动更新的内容** —— 轮播自动播放与 Toast 自动消失都会在 hover/focus 时暂停，轮播还提供明确的停止按钮（WCAG 2.2.1 / 2.2.2）。

---

## 用错时会主动提示

以下仅在开发模式生效，生产构建中会被移除。

| 情况 | 提示 |
|------|------|
| 漏掉 `styles.css` 的引入 | 一次控制台警告 |
| 传入非元素子节点，如 `<Tooltip>文本</Tooltip>` | 说明如何修正的错误 |
| 在受控 ↔ 非受控之间切换 | 控制台警告 |

---

## 设计理念

1. **接近零配置** —— 在应用入口引入一行 `styles.css` 即可，无需 ThemeProvider 或 Tailwind 配置。（漏掉这行时，开发模式会提示一次。）
2. **默认无障碍** —— 内置 ARIA 属性、键盘导航与语义化 HTML。
3. **类型安全** —— 在 TypeScript `strict: true` 下编写，导出全部 Props 类型。
4. **多态组件** —— 布局组件支持 `as` 属性，可自由更换渲染元素。
5. **令牌驱动** —— 所有视觉数值都是 CSS 变量，使用方覆盖变量即可定制主题。
6. **可 Tree-shaking** —— 只有你实际引入的组件才会进入产物。

---

## 开发环境

```bash
# 安装依赖
npm install

# 启动 Storybook（http://localhost:6006）
npm run storybook

# 测试（单元测试 + axe 无障碍检查 + 令牌对比度检查）
npm test

# 类型检查
npm run type-check

# 代码检查（react-hooks / jsx-a11y / typescript-eslint）
npm run lint
npm run lint:fix

# 构建
npm run build

# 包体积检查（超出上限即失败）
npm run size
npm run size:why   # 分析体积占用来源
```

### 质量闸门

| 检查 | 能发现什么 |
|------|---------|
| `type-check` | 类型错误 |
| `lint` | Hook 规则违规、静态无障碍错误、`any`、未使用的 import |
| `test` | 行为回退 + axe 无障碍违规 + 令牌对比度不达标 |
| `size` | 包体积回退、tree-shaking 失效 |

CI（`.github/workflows/ci.yml`）会在每个 PR 上运行全部检查。

---

## 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feat/new-component`
3. 遵循组件文件结构：
   - `ComponentName.ui.tsx` —— 展示型组件
   - `ComponentName.ui.test.tsx` —— 测试
   - `ComponentName.ui.stories.tsx` —— Storybook story
   - `index.ts` —— barrel export
4. 确认全部检查通过：
   ```bash
   npm run type-check && npm run test && npm run build
   ```
5. 提交 Pull Request

---

## 许可证

MIT © null_ong2
