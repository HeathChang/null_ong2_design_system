# null_ong2-design-system

[한국어](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.ko.md) · **English** · [中文](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.zh-CN.md)

A production-ready React design system library.

### 📖 Documentation site

**👉 https://null-ong2-design-system-docs.vercel.app/**

Live demos · one-click copyable snippets · props tables · design token visualisation.

> This README is a quick reference. See the site above for detailed usage and examples.

---

## Install

```bash
npm install null_ong2-design-system
```

> **Peer dependencies** — React 18 or later

```bash
npm install react react-dom
```

## Quick start

### 1. Import the stylesheet (once, at your app entry point)

```tsx
// app/layout.tsx (Next.js App Router)
// or _app.tsx (Next.js Pages Router)
// or main.tsx (Vite / CRA)
import 'null_ong2-design-system/styles.css';
```

> **Changed in v0.2.2**: styles used to be injected automatically, but that caused FOUC under SSR (Next.js App Router and friends). The CSS is now exported as a separate file, which your bundler can inline into the SSR HTML.

### 2. Use the components

You can import these from a React Server Component environment (Next.js App Router) — the package ships a `"use client"` directive.

```tsx
import { Button, Input, Alert, Stack } from 'null_ong2-design-system';

function App() {
  return (
    <Stack spacing="lg">
      <Alert variant="info">Welcome to the design system.</Alert>

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="example@mail.com"
        required
      />

      <Button variant="primary" onClick={() => alert('Saved')}>
        Save
      </Button>
    </Stack>
  );
}
```

---

## Component list

| Category | Components |
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

## Layout components

### Box

A general-purpose layout container. The `as` prop changes the rendered HTML element (polymorphic).

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | Element or component to render |
| `padding` | `SpacingKey` | — | Padding on all four sides |
| `paddingX` | `SpacingKey` | — | Horizontal padding |
| `paddingY` | `SpacingKey` | — | Vertical padding |
| `margin` | `SpacingKey` | — | Margin on all four sides |
| `marginX` | `SpacingKey` | — | Horizontal margin |
| `marginY` | `SpacingKey` | — | Vertical margin |
| `borderRadius` | `RadiusKey` | — | Corner radius |
| `bg` | `string` | — | Background colour (CSS variable or colour value) |
| `display` | `CSSProperties['display']` | — | `display` property |
| `width` | `CSSProperties['width']` | — | Width |
| `height` | `CSSProperties['height']` | — | Height |
| `overflow` | `CSSProperties['overflow']` | — | `overflow` property |

> **SpacingKey**: `'0'` `'px'` `'0.5'` `'1'` `'2'` `'3'` `'4'` `'5'` `'6'` `'8'` `'10'` `'12'` `'16'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'`
>
> **RadiusKey**: `'none'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'full'`

```tsx
import { Box } from 'null_ong2-design-system';

// Basic usage
<Box padding="md" borderRadius="lg" bg="var(--ds-color-neutral-50)">
  Card content
</Box>

// Render as a different element
<Box as="section" padding="xl" marginY="lg">
  Section content
</Box>

// Separate horizontal and vertical padding
<Box paddingX="lg" paddingY="sm" borderRadius="md">
  Banner
</Box>
```

---

### Flex

A flexbox layout component. Supports the `as` prop.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | Element to render |
| `direction` | `CSSProperties['flexDirection']` | — | `'row'`, `'column'`, … |
| `align` | `CSSProperties['alignItems']` | — | `'center'`, `'flex-start'`, … |
| `justify` | `CSSProperties['justifyContent']` | — | `'center'`, `'space-between'`, … |
| `wrap` | `CSSProperties['flexWrap']` | — | `'wrap'`, `'nowrap'`, … |
| `gap` | `SpacingKey` | — | Gap between children |
| `columnGap` | `SpacingKey` | — | Column gap |
| `rowGap` | `SpacingKey` | — | Row gap |
| `flex` | `CSSProperties['flex']` | — | `flex` shorthand |

```tsx
import { Flex } from 'null_ong2-design-system';

// Header: push items to both ends
<Flex justify="space-between" align="center">
  <span>Logo</span>
  <nav>Menu</nav>
</Flex>

// Evenly spaced inline items
<Flex gap="md" wrap="wrap">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Storybook</Tag>
</Flex>

// Render as a nav element
<Flex as="nav" gap="sm" align="center">
  <a href="/">Home</a>
  <a href="/about">About</a>
</Flex>
```

---

### Stack

Stacks children with a consistent gap. Supports the `as` prop.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | Element to render |
| `spacing` | `SpacingKey` | `'md'` | Gap between children |
| `direction` | `'column'` \| `'row'` | `'column'` | Stacking direction |
| `align` | `CSSProperties['alignItems']` | — | Cross-axis alignment |
| `justify` | `CSSProperties['justifyContent']` | — | Main-axis alignment |

```tsx
import { Stack } from 'null_ong2-design-system';

// Vertical card list
<Stack spacing="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stack>

// Wide gaps between sections
<Stack spacing="xl">
  <Section>First section</Section>
  <Section>Second section</Section>
</Stack>

// Horizontal stack
<Stack direction="row" spacing="sm" align="center">
  <Avatar />
  <span>User name</span>
</Stack>
```

---

### Grid

A CSS Grid layout component. Supports the `as` prop.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | Element to render |
| `columns` | `number \| string` | — | Column count (number) or a `grid-template-columns` value (string) |
| `rows` | `number \| string` | — | Row count or a `grid-template-rows` value |
| `gap` | `SpacingKey` | — | Gap between cells |
| `columnGap` | `SpacingKey` | — | Column gap |
| `rowGap` | `SpacingKey` | — | Row gap |
| `align` | `CSSProperties['alignItems']` | — | Vertical cell alignment |
| `justify` | `CSSProperties['justifyItems']` | — | Horizontal cell alignment |

> Passing a number to `columns` expands to `repeat(N, minmax(0, 1fr))`.

```tsx
import { Grid } from 'null_ong2-design-system';

// Three-column grid
<Grid columns={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
  <Card>5</Card>
  <Card>6</Card>
</Grid>

// Responsive auto-fill
<Grid columns="repeat(auto-fill, minmax(250px, 1fr))" gap="lg">
  {products.map((p) => <ProductCard key={p.id} product={p} />)}
</Grid>

// Custom column ratios
<Grid columns="1fr 2fr 1fr" gap="md">
  <Sidebar />
  <MainContent />
  <Aside />
</Grid>

// Separate column and row gaps
<Grid columns={2} columnGap="lg" rowGap="sm">
  <Cell>A</Cell>
  <Cell>B</Cell>
  <Cell>C</Cell>
  <Cell>D</Cell>
</Grid>
```

---

### Container

Constrains content to a maximum width and centres it. Supports the `as` prop.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'div'` | Element to render |
| `maxWidth` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'full'` | `'lg'` | Maximum width |

| maxWidth | Value |
|----------|-----|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `full` | 100% |

```tsx
import { Container } from 'null_ong2-design-system';

// Default (1024px)
<Container>
  <main>Page content</main>
</Container>

// Narrow content (640px) — blog posts and similar
<Container maxWidth="sm">
  <article>Blog body…</article>
</Container>

// Render as a main element
<Container as="main" maxWidth="xl">
  Dashboard
</Container>
```

---

## Typography components

### Text

Body text. Supports the `as` prop (defaults to `<p>`).

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `ElementType` | `'p'` | Element to render |
| `size` | `FontSizeKey` | `'base'` | Font size |
| `weight` | `FontWeightKey` | `'normal'` | Font weight |
| `color` | `'default'` \| `'muted'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` | `'default'` | Text colour |
| `align` | `CSSProperties['textAlign']` | — | Text alignment |
| `truncate` | `boolean` | `false` | Truncate with an ellipsis |

> **FontSizeKey**: `'xs'` `'sm'` `'base'` `'lg'` `'xl'` `'2xl'` `'3xl'` `'4xl'`
>
> **FontWeightKey**: `'normal'` `'medium'` `'semibold'` `'bold'`

```tsx
import { Text } from 'null_ong2-design-system';

// Basic paragraph
<Text>Ordinary body text.</Text>

// Size and weight
<Text size="lg" weight="semibold">Large emphasised text</Text>

// Semantic colours
<Text size="sm" color="muted">Supporting text</Text>
<Text color="danger">Something went wrong.</Text>
<Text color="success">Completed successfully.</Text>

// Inline usage
<Text as="span" weight="bold" color="primary">emphasised word</Text>

// Ellipsis when the text overflows
<div style={{ width: '200px' }}>
  <Text truncate>
    This text is truncated with an ellipsis once it exceeds the container width.
  </Text>
</div>

// Alignment
<Text align="center">Centred text</Text>
```

---

### Heading

A section heading. `as` sets the semantic level (h1–h6); `size` sets the visual size independently.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `as` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` \| `'h5'` \| `'h6'` | `'h2'` | Heading level |
| `size` | `FontSizeKey` | derived from the level | Visual font size |
| `color` | `string` | `--ds-color-neutral-900` | Text colour |
| `align` | `CSSProperties['textAlign']` | — | Text alignment |

**Default size per level:**

| Level | Default size | Rendered |
|------|-----------|----------|
| `h1` | `4xl` | 36px |
| `h2` | `3xl` | 30px |
| `h3` | `2xl` | 24px |
| `h4` | `xl` | 20px |
| `h5` | `lg` | 18px |
| `h6` | `base` | 16px |

```tsx
import { Heading } from 'null_ong2-design-system';

// Default (renders h2 at 30px)
<Heading>Section title</Heading>

// Page title
<Heading as="h1">Main page title</Heading>

// Keep the document outline while shrinking the visual size
<Heading as="h2" size="sm">Sidebar title</Heading>

// Colour and alignment
<Heading as="h3" color="var(--ds-color-primary-600)" align="center">
  Centred section title
</Heading>
```

---

### Label

Associates a caption with a form control.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `htmlFor` | `string` | — | id of the input to associate with |
| `required` | `boolean` | — | Shows a red `*` |

```tsx
import { Label } from 'null_ong2-design-system';

// Basic label
<Label htmlFor="username">Username</Label>
<input id="username" />

// Required marker
<Label htmlFor="email" required>Email</Label>
<input id="email" type="email" />
```

> **Note**: `Input`, `Textarea` and `Select` render a Label for you when you pass the `label` prop. You do not need to add one yourself.

---

## Core UI components

### Button

Triggers a user action.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `variant` | `'primary'` \| `'secondary'` \| `'ghost'` \| `'danger'` | `'primary'` | Visual style |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Loading state (shows a spinner and blocks clicks) |
| `disabled` | `boolean` | `false` | Disabled |
| `leftIcon` | `ReactNode` | — | Icon before the label |
| `rightIcon` | `ReactNode` | — | Icon after the label |

> Accepts a `ref` (wrapped in `forwardRef`).

```tsx
import { Button } from 'null_ong2-design-system';

// Variants
<Button variant="primary">Confirm</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Show more</Button>
<Button variant="danger">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading — spinner appears automatically, clicks are blocked
<Button isLoading>Saving…</Button>
<Button variant="danger" isLoading>Deleting…</Button>

// Disabled
<Button disabled>Cannot submit</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add item</Button>
<Button rightIcon={<ArrowRightIcon />} variant="secondary">Next step</Button>

// Using a ref
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef} onClick={handleClick}>Focus test</Button>
```

---

## Form components

### Input

A text input with built-in label, hint and error message support.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Input id. Omit it and a unique id is generated to wire up the label, hint and error |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Hint message (shown when there is no error) |
| `error` | `string` | — | Error message (switches the field to the error style) |
| `required` | `boolean` | — | Required (adds `*` to the label) |
| `type` | `string` | `'text'` | Input type (`email`, `password`, `number`, …) |
| `placeholder` | `string` | — | Placeholder |
| `disabled` | `boolean` | `false` | Disabled |

> Accepts a `ref`, and every native `<input>` attribute.

```tsx
import { Input } from 'null_ong2-design-system';

// Basic usage
<Input id="name" label="Name" placeholder="Enter your name" />

// Required with a hint
<Input
  id="email"
  label="Email"
  type="email"
  placeholder="example@mail.com"
  hint="Use your work email"
  required
/>

// Error state — message plus a red border
<Input
  id="password"
  label="Password"
  type="password"
  error="Must be at least 8 characters"
/>

// Disabled
<Input
  id="readonly"
  label="Read only"
  defaultValue="This cannot be edited"
  disabled
/>

// Using a ref
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} id="search" placeholder="Search" />
```

---

### Textarea

Multi-line text input. Follows the same label / hint / error pattern as Input.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Textarea id. The label, hint and error stay connected even if you omit it |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Hint message |
| `error` | `string` | — | Error message |
| `required` | `boolean` | — | Required |
| `rows` | `number` | — | Initial visible rows |
| `disabled` | `boolean` | `false` | Disabled |

```tsx
import { Textarea } from 'null_ong2-design-system';

// Basic usage
<Textarea id="desc" label="Description" rows={4} placeholder="Enter details" />

// Error state
<Textarea
  id="review"
  label="Review"
  error="Please write at least 20 characters"
/>

// Required with a hint
<Textarea
  id="bio"
  label="About you"
  rows={5}
  hint="Up to 500 characters"
  required
/>
```

---

### Checkbox

A checkbox. Works both controlled and uncontrolled.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Checkbox id. The label stays connected even if you omit it |
| `label` | `string` | — | Checkbox label |
| `checked` | `boolean` | — | Checked state (controlled) |
| `defaultChecked` | `boolean` | — | Initial checked state (uncontrolled) |
| `onChange` | `(checked: boolean, event) => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled |

> `onChange` receives the `boolean` checked state as its first argument.

```tsx
import { Checkbox } from 'null_ong2-design-system';

// Uncontrolled
<Checkbox id="agree" label="I agree to the terms of service" />

// Controlled
const [agreed, setAgreed] = useState(false);
<Checkbox
  id="terms"
  label="I consent to the processing of my personal data"
  checked={agreed}
  onChange={setAgreed}
/>

// Disabled
<Checkbox id="locked" label="Cannot be changed" disabled defaultChecked />
```

---

### Radio

A radio button. Options sharing the same `name` form a group.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Radio id. The label stays connected even if you omit it |
| `name` | `string` | — | Group name (same `name` = same group) |
| `value` | `string` | — | Value of this option |
| `label` | `string` | — | Radio label |
| `checked` | `boolean` | — | Selected state (controlled) |
| `onChange` | `(value: string, event) => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled |

> `onChange` receives the selected `string` value as its first argument.

```tsx
import { Radio } from 'null_ong2-design-system';

// A radio group
const [method, setMethod] = useState('email');

<Radio
  id="contact-email"
  name="contact"
  value="email"
  label="Email"
  checked={method === 'email'}
  onChange={setMethod}
/>
<Radio
  id="contact-phone"
  name="contact"
  value="phone"
  label="Phone"
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

A dropdown. Options are passed through the `options` prop.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Select id. The label, hint and error stay connected even if you omit it |
| `label` | `string` | — | Label text |
| `options` | `SelectOption[]` | **required** | Option list |
| `placeholder` | `string` | — | Placeholder option text. Becomes the initial selection unless you pass `value`/`defaultValue` |
| `hint` | `string` | — | Hint message |
| `error` | `string` | — | Error message |
| `required` | `boolean` | — | Required |
| `disabled` | `boolean` | `false` | Disabled |

```ts
// SelectOption
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;  // disable an individual option
}
```

```tsx
import { Select } from 'null_ong2-design-system';

const countries = [
  { value: 'kr', label: 'South Korea' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China', disabled: true },  // not selectable
];

// Basic usage
<Select
  id="country"
  label="Country"
  options={countries}
  placeholder="Choose one"
/>

// Error state
<Select
  id="country"
  label="Country"
  options={countries}
  placeholder="Choose one"
  error="Please choose a country"
/>

// Controlled
const [country, setCountry] = useState('');
<Select
  id="country"
  label="Country of residence"
  options={countries}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  hint="Pick the country you currently live in"
  required
/>
```

---

## Feedback components

### Spinner

A rotating spinner for loading states.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` | `'md'` | Spinner size |
| `label` | `string` | from the active locale | Screen-reader label |

> The spinner inherits `color` from its parent (`currentColor`).

```tsx
import { Spinner } from 'null_ong2-design-system';

// Basic usage
<Spinner />

// Sizes
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Colour comes from the parent
<span style={{ color: '#3b82f6' }}>
  <Spinner size="md" />
</span>

// Custom accessible label
<Spinner label="Loading your data" />
```

---

### Skeleton

A shimmer placeholder shown while content loads.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `width` | `number \| string` | — | Width (number = px, string = CSS value) |
| `height` | `number \| string` | — | Height |
| `variant` | `'rectangular'` \| `'text'` \| `'circle'` | `'rectangular'` | Shape |

```tsx
import { Skeleton } from 'null_ong2-design-system';

// Image placeholder
<Skeleton width={300} height={200} />

// Text lines (height defaults to 1em)
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />

// Circular avatar
<Skeleton variant="circle" width={48} height={48} />

// A loading card
<Flex gap="md" align="flex-start">
  <Skeleton variant="circle" width={48} height={48} />
  <Stack spacing="sm" style={{ flex: 1 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="75%" />
  </Stack>
</Flex>

// CSS percentage values
<Skeleton width="100%" height={120} />
```

---

### Alert

Delivers a feedback message. Each variant ships a default icon.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `variant` | `'info'` \| `'success'` \| `'warning'` \| `'danger'` | `'info'` | Alert kind |
| `title` | `string` | — | Optional title |
| `children` | `ReactNode` | **required** | Alert body |
| `icon` | `ReactNode` | per-variant default | Custom icon |

> `warning` and `danger` use `role="alert"` (interrupting); `info` and `success` use `role="status"` (polite).

```tsx
import { Alert } from 'null_ong2-design-system';

// Information
<Alert variant="info">Scheduled maintenance is coming up.</Alert>

// Success with a title
<Alert variant="success" title="Saved">
  Your changes were saved successfully.
</Alert>

// Warning
<Alert variant="warning" title="Careful">
  This action cannot be undone. Please proceed carefully.
</Alert>

// Error
<Alert variant="danger" title="Something went wrong">
  We could not process your request. Please try again shortly.
</Alert>

// Custom icon
<Alert variant="info" icon={<BellIcon />}>
  You have a new notification.
</Alert>

// Body only
<Alert variant="warning">
  Your password expires soon. Please change it.
</Alert>
```

---

## Switch (Form)

An on/off toggle that applies immediately. Unlike Checkbox, it suits settings screens.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `id` | `string` | auto-generated | Switch id. The label stays connected even if you omit it |
| `label` | `string` | — | Label text |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Size |
| `checked` | `boolean` | — | State (controlled) |
| `defaultChecked` | `boolean` | — | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean, event) => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled |

```tsx
import { Switch } from 'null_ong2-design-system';

const [enabled, setEnabled] = useState(false);
<Switch id="notify" label="Receive notifications" checked={enabled} onChange={setEnabled} />
```

---

## Avatar (Data Display)

An avatar with an image and initials fallback.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `src` | `string` | — | Image URL |
| `name` | `string` | — | Name (used for `alt` and the initials fallback) |
| `alt` | `string` | — | Image alt (takes precedence when set) |
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | Size |
| `shape` | `'circle'` \| `'square'` | `'circle'` | Shape |

```tsx
import { Avatar } from 'null_ong2-design-system';

<Avatar src="/me.jpg" name="Jane Doe" />
<Avatar name="John Doe" size="lg" />        // no image → shows "JD"
<Avatar src="/broken.jpg" name="Jane" />    // load failure → falls back to "JA"
```

> Initials are split by grapheme, so emoji and combined characters are never cut in half.

---

## Badge (Data Display)

A small label for status or counts.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `variant` | `'neutral'` \| `'primary'` \| `'success'` \| `'warning'` \| `'danger'` \| `'info'` | `'neutral'` | Visual style |
| `size` | `'sm'` \| `'md'` | `'md'` | Size |
| `dot` | `boolean` | `false` | Dot form. Children are visually hidden but still read by screen readers |

```tsx
import { Badge } from 'null_ong2-design-system';

<Badge variant="success">Active</Badge>
<Badge variant="danger">99+</Badge>
<Badge variant="danger" dot />                     // just a red dot
<Badge variant="danger" dot>3 new alerts</Badge>   // dot on screen, "3 new alerts" to a screen reader
```

---

## Carousel (Data Display)

Shows one slide at a time.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `items` | `ReactNode[]` | **required** | Slide contents |
| `index` | `number` | — | Current index (controlled) |
| `defaultIndex` | `number` | `0` | Initial index |
| `onChange` | `(index: number) => void` | — | Change handler |
| `autoPlayInterval` | `number` | `0` | Auto-play interval in ms. `0` disables it |
| `loop` | `boolean` | `true` | Wrap around |
| `showArrows` | `boolean` | `true` | Show previous/next arrows |
| `showIndicators` | `boolean` | `true` | Show dot indicators |
| `ariaLabel` | `string` | from the active locale | Accessible label for the carousel region |

**Accessibility**

- Off-screen slides are marked `inert`, so they leave the tab order. Links and buttons inside slides are safe.
- Turning on `autoPlayInterval` also renders a play/pause button. Auto-play stops on hover and on focus.
- Auto-play never starts when the OS "reduce motion" setting is on.
- Indicators respond to ←/→/Home/End and have a 24×24px hit area.
- Out-of-range indices are clamped, so the carousel always shows a real slide.

```tsx
import { Carousel } from 'null_ong2-design-system';

<Carousel
  items={[
    <img src="/1.jpg" alt="Banner 1" />,
    <img src="/2.jpg" alt="Banner 2" />,
    <img src="/3.jpg" alt="Banner 3" />,
  ]}
  autoPlayInterval={3000}
/>
```

---

## Tabs (Navigation)

Tabs built with the compound component pattern.

- Omit `defaultValue` and the **first tab is selected automatically**. (With no tab selected, the whole tab bar becomes unreachable by keyboard.)
- Keyboard: ←/→ (↑/↓ when `orientation="vertical"`) cycles through tabs, `Home`/`End` jumps to the first/last, `Enter`/`Space` selects.

| Component | Role |
|----------|------|
| `Tabs.Root` | Context provider (`defaultValue` / `value` / `onChange` / `orientation`) |
| `Tabs.List` | Trigger container (`role="tablist"`) |
| `Tabs.Trigger` | An individual tab button (`value` / `disabled`) |
| `Tabs.Panel` | Rendered when its matching trigger is active (`value`) |

```tsx
import { Tabs } from 'null_ong2-design-system';

<Tabs.Root defaultValue="profile">
  <Tabs.List aria-label="Account sections">
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile">Profile screen</Tabs.Panel>
  <Tabs.Panel value="account">Account screen</Tabs.Panel>
  <Tabs.Panel value="notifications">Notification settings</Tabs.Panel>
</Tabs.Root>

// Vertical tabs
<Tabs.Root defaultValue="overview" orientation="vertical">...</Tabs.Root>
```

---

## Modal (Overlay)

An overlay dialog. Opening it applies all of the following automatically.

- Focus moves into the dialog and Tab cycles inside it. Closing restores focus to where it was.
- Background scrolling is locked (the page behind does not move on mobile).
- Background content is marked `aria-hidden` + `inert`, so screen readers cannot wander out of the dialog.
- With stacked modals, one `Esc` closes **only the topmost** one.
- Dragging to select text in the body and releasing on the overlay does not close it (the press origin decides).

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `isOpen` | `boolean` | **required** | Open state |
| `onClose` | `() => void` | **required** | Close handler |
| `title` | `string` | — | Title |
| `children` | `ReactNode` | **required** | Body |
| `footer` | `ReactNode` | — | Footer (button group, …) |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `'md'` | Size |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on Esc |
| `showCloseButton` | `boolean` | `true` | Show the close button |
| `initialFocusRef` | `RefObject<HTMLElement>` | — | Element to focus on open (default: first focusable) |

```tsx
import { Modal, Button } from 'null_ong2-design-system';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Delete</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  }
>
  Are you sure? This action cannot be undone.
</Modal>
```

---

## Tooltip (Overlay)

Shows supporting text on hover or focus. Positioning is handled by `@floating-ui/react`.

It renders into a `body` portal so it is never clipped by an ancestor with `overflow: hidden|auto` (a modal body, a carousel viewport, …).

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `content` | `ReactNode` | **required** | Tooltip content |
| `children` | `ReactElement` | **required** | Trigger (a single element) |
| `placement` | `Placement` | `'top'` | Placement (top/bottom/left/right + start/end) |
| `delay` | `number` | `200` | Show delay in ms |
| `disabled` | `boolean` | `false` | Disabled |

```tsx
import { Tooltip, Button } from 'null_ong2-design-system';

<Tooltip content="Save (Cmd+S)">
  <Button>Save</Button>
</Tooltip>

<Tooltip content="Details" placement="right">
  <Button variant="ghost">Info</Button>
</Tooltip>
```

> `children` must be a single focusable element. Passing plain text or a Fragment throws an error explaining how to fix it.

---

## DropdownMenu (Overlay)

A click-triggered menu. Renders into a `body` portal, so it is never clipped by an `overflow` ancestor.

Keyboard behaviour follows the WAI-ARIA APG menu pattern — pressing ↑/↓ or `Enter`/`Space` on the trigger opens the menu and moves focus to the first item; ↑/↓ cycles (skipping disabled items); `Esc` or an outside click closes it and returns focus to the trigger.

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `trigger` | `ReactElement` | **required** | Trigger element |
| `items` | `DropdownMenuItem[]` | **required** | Menu items |
| `placement` | `Placement` | `'bottom-start'` | Menu placement |

```ts
interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;  // red text
}
```

```tsx
import { DropdownMenu, Button } from 'null_ong2-design-system';

<DropdownMenu
  trigger={<Button variant="secondary">Options</Button>}
  items={[
    { key: 'edit', label: 'Edit', onSelect: handleEdit },
    { key: 'duplicate', label: 'Duplicate', onSelect: handleDuplicate },
    { key: 'delete', label: 'Delete', onSelect: handleDelete, destructive: true },
  ]}
/>
```

---

## Toast (Overlay)

A global notification system. **Wrap your app once in `<ToastProvider>`**, then use the `useToast()` hook.

### 1. Set up the provider

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

| Prop | Type | Default | Description |
|------|-----|--------|------|
| `position` | `'top-left'` \| `'top-right'` \| `'top-center'` \| `'bottom-left'` \| `'bottom-right'` \| `'bottom-center'` | `'bottom-right'` | Where toasts appear |
| `maxToasts` | `number` | `5` | Maximum simultaneous toasts (minimum 1) |

### 2. Use it

```tsx
import { useToast } from 'null_ong2-design-system';

function SaveButton() {
  const toast = useToast();

  return (
    <Button
      onClick={async () => {
        try {
          await save();
          toast.success('Saved');
        } catch {
          toast.danger('Could not save', { duration: 5000 });
        }
      }}
    >
      Save
    </Button>
  );
}
```

#### Toast API

| Method | Description |
|--------|------|
| `toast.show(message, options?)` | Generic toast |
| `toast.success(message, options?)` | Success |
| `toast.warning(message, options?)` | Warning |
| `toast.danger(message, options?)` | Error |
| `toast.info(message, options?)` | Information |
| `toast.dismiss(id)` | Dismiss one toast (the id returned by `show`) |

`options.duration` — auto-dismiss delay in ms, default 3000. **`0`** means manual dismissal only.

> The timer pauses while the pointer is over the toast area or focus is inside it, so a toast never disappears mid-read.

---

## Design tokens

Every visual value is defined as a CSS custom property. They land on `:root` when you import the stylesheet.

### Colours

```css
/* Brand */
--ds-color-primary-50    /* #eff6ff  */
--ds-color-primary-500   /* #3b82f6  */
--ds-color-primary-600   /* #2563eb  */
--ds-color-primary-700   /* #1d4ed8  */

/* Neutral */
--ds-color-neutral-0     /* #ffffff  */
--ds-color-neutral-100   /* #f3f4f6  */
--ds-color-neutral-500   /* #6b7280  */
--ds-color-neutral-900   /* #111827  */

/* Semantic */
--ds-color-success       /* #22c55e  */
--ds-color-warning       /* #f59e0b  */
--ds-color-danger        /* #ef4444  */
--ds-color-info          /* #3b82f6  */
```

### Spacing

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
--ds-z-popover    /* 200  — Tooltip / DropdownMenu (must sit above modals) */
--ds-z-toast      /* 1000 */
```

### Radius

```css
--ds-radius-sm     /* 4px    */
--ds-radius-md     /* 6px    */
--ds-radius-lg     /* 8px    */
--ds-radius-xl     /* 12px   */
--ds-radius-full   /* 9999px */
```

### Tokens from TypeScript

```tsx
import { SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT, Z_INDEX } from 'null_ong2-design-system';

// SPACING.md   → 'var(--ds-spacing-md)'
// RADIUS.lg    → 'var(--ds-radius-lg)'
// FONT_SIZE.xl → 'var(--ds-font-size-xl)'
```

---

## Theming

Override the CSS variables from your app's global stylesheet:

```css
:root {
  /* Switch the brand colour to purple */
  --ds-color-primary-600: #7c3aed;  /* button base */
  --ds-color-primary-700: #6d28d9;  /* button hover */
  --ds-color-primary-800: #5b21b6;  /* button active */
  --ds-color-primary-500: #8b5cf6;  /* checkbox / switch fill */

  /* Rounder corners */
  --ds-radius-md: 8px;

  /* Custom font */
  --ds-font-sans: 'Pretendard', -apple-system, sans-serif;
}
```

> Check **contrast** when you change colours. Body text needs 4.5:1; UI elements such as icons and borders need 3:1.
> The default palette is verified automatically by `src/styles/tokens.test.ts`.

---

## Dark mode

Works with **no configuration** — it follows the OS setting. To control it yourself, put a class or attribute on `<html>`.

```html
<!-- 1. Do nothing → follows prefers-color-scheme -->
<html>

<!-- 2. Force dark (either works) -->
<html class="dark">
<html data-theme="dark">

<!-- 3. Force light (stays light even when the OS is dark) -->
<html class="light">
<html data-theme="light">
```

```tsx
// Toggle example
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <Button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </Button>
  );
}
```

Each token keeps the same **role** in both themes — `--ds-color-neutral-0` is always the surface colour and
`--ds-color-neutral-900` is always the strongest text colour. Component CSS therefore has no per-theme branches,
and your own components get dark mode for free as long as they use the same tokens.

```css
/* Your components inherit dark mode automatically when they use tokens */
.my-card {
  background-color: var(--ds-color-neutral-0);
  color: var(--ds-color-neutral-700);
  border: 1px solid var(--ds-border-color);
}
```

Both themes meet WCAG 2.1 AA contrast, and tests guard against regressions.

---

## Internationalisation (i18n)

The strings baked into components (the modal close button, carousel arrows, the toast region label, …) are
mostly read only by screen readers — which is exactly why hardcoding them creates an invisible barrier.

The default is **Korean**, changeable through `DesignSystemProvider`. Everything works without the provider too.

```tsx
import { DesignSystemProvider } from 'null_ong2-design-system';

<DesignSystemProvider locale="en">
  <App />
</DesignSystemProvider>
```

Bundled locales: `ko` (default) · `en` · `ja` · `zh`

To replace only some strings, pass `strings` as well. Only the keys you list are swapped.

```tsx
<DesignSystemProvider locale="en" strings={{ close: 'Dismiss', toastRegion: 'Alerts' }}>
  <App />
</DesignSystemProvider>
```

For an unsupported language, supply the whole set.

```tsx
import { DesignSystemProvider, EN_STRINGS } from 'null_ong2-design-system';
import type { DsStrings } from 'null_ong2-design-system';

const FR: DsStrings = { ...EN_STRINGS, close: 'Fermer', loading: 'Chargement' /* … */ };

<DesignSystemProvider strings={FR}>
  <App />
</DesignSystemProvider>
```

> Browser language is **not auto-detected.** Under SSR the server and the client would render different
> languages and hydration would mismatch. Decide in your app and pass `locale` yourself.

---

## Value list constants

Every set of accepted values is also exported as a runtime array —
useful for building a variant picker or validating a string that came from a server.

```tsx
import { BUTTON_VARIANTS, BUTTON_SIZES } from 'null_ong2-design-system';

{BUTTON_VARIANTS.map((variant) => (
  <Button key={variant} variant={variant}>{variant}</Button>
))}
```

Available: `ALERT_VARIANTS` `AVATAR_SHAPES` `AVATAR_SIZES` `BADGE_SIZES` `BADGE_VARIANTS`
`BUTTON_SIZES` `BUTTON_VARIANTS` `CONTAINER_MAX_WIDTHS` `HEADING_LEVELS` `MODAL_SIZES`
`SKELETON_VARIANTS` `SPINNER_SIZES` `SWITCH_SIZES` `TEXT_COLORS` `TOAST_POSITIONS` `TOAST_VARIANTS`

---

## Bundle size

`dist` ships **unminified**. Letting your bundler minify keeps tree-shaking effective and stack traces readable.

What actually lands in your bundle (brotli, dependencies included):

| import | Size |
|--------|------|
| `{ Button }` | ~2.4 kB |
| `{ Modal }` | ~3.8 kB |
| everything | ~30 kB |
| `styles.css` | ~4.4 kB |

Run `npm run size` to check it yourself; CI enforces the limits.

---

## Hooks

### useControllable

Handles controlled and uncontrolled state behind one API.

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

// Uncontrolled (state managed internally)
<Toggle defaultValue={false} />

// Controlled (state managed outside)
<Toggle value={isEnabled} onChange={setIsEnabled} />
```

> Switching between controlled and uncontrolled mid-life warns in development.

### useEscapeKey

Builds a layer that closes on `Esc`. When several layers are active, **only the most recently opened one** responds.

```tsx
useEscapeKey(isOpen, close);
```

### useFocusTrap

Traps focus inside a container. On activation focus moves to the first focusable element; on release it returns to where it was.

```tsx
const ref = useRef<HTMLDivElement>(null);
useFocusTrap(ref, isOpen);

// Start somewhere specific
useFocusTrap(ref, isOpen, { initialFocus: cancelButtonRef });
```

> When the DOM node attaches later (as with a portal), hold the node in state instead of `useRef` so the
> ref object identity changes and the effect re-runs. `Modal` does exactly that.

### useBodyScrollLock

Locks `<body>` scrolling while active. Stacked overlays lock only once thanks to reference counting, and the
original state is restored when the last one closes. Padding compensates for the scrollbar width so the layout does not jump.

iOS Safari ignores `overflow: hidden`, so this uses `position: fixed` plus scroll-position restoration.

```tsx
useBodyScrollLock(isOpen);
```

### useInertBackground

Marks background siblings `aria-hidden` + `inert` while a modal is open.
Overlay layers carrying a `data-ds-layer` attribute (toasts, …) are left alone.

```tsx
useInertBackground(dialogRef, isOpen);
```

### usePrefersReducedMotion

Reports the OS "reduce motion" setting. Use it to switch off auto-playing or auto-rotating UI.
Returns `false` where `matchMedia` is unavailable (SSR, …).

```tsx
const prefersReducedMotion = usePrefersReducedMotion();
```

---

## Accessibility

- **Keyboard** — every interactive element is operable by keyboard. Modal and DropdownMenu also handle focus movement and restoration.
- **Focus visibility** — a focus ring is drawn on `:focus-visible`, reinforced with a system-colour `outline` in Windows high contrast mode (`forced-colors`).
- **Reduced motion** — `prefers-reduced-motion: reduce` disables entrance animations and transitions. Spinner and Skeleton keep moving, slowly, because they signal "in progress".
- **Touch targets** — small controls such as carousel indicators still have a hit area of at least 24×24px (WCAG 2.5.8).
- **Auto-updating content** — carousel auto-play and toast auto-dismiss both pause on hover/focus, and the carousel offers an explicit stop button (WCAG 2.2.1 / 2.2.2).

---

## It tells you when you misuse it

These run in development only and are stripped from production builds.

| Situation | What you get |
|------|------|
| Missing `styles.css` import | One console warning |
| A non-element child, e.g. `<Tooltip>text</Tooltip>` | An error explaining what to change |
| Switching controlled ↔ uncontrolled | A console warning |

---

## Design principles

1. **Almost zero-config** — one `styles.css` import at your entry point and you are done. No ThemeProvider, no Tailwind setup. (Miss that import and development mode tells you once.)
2. **Accessible by default** — ARIA attributes, keyboard navigation and semantic HTML come built in.
3. **Type-safe** — written under TypeScript `strict: true`. Every props type is exported.
4. **Polymorphic** — layout components accept an `as` prop to change the rendered element.
5. **Token-driven** — every visual value is a CSS variable, so consumers can theme by overriding them.
6. **Tree-shakable** — only the components you import end up in your bundle.

---

## Development

```bash
# Install dependencies
npm install

# Run Storybook (http://localhost:6006)
npm run storybook

# Tests (unit + axe accessibility + token contrast)
npm test

# Type check
npm run type-check

# Lint (react-hooks / jsx-a11y / typescript-eslint)
npm run lint
npm run lint:fix

# Build
npm run build

# Bundle size (fails when over the limit)
npm run size
npm run size:why   # analyse what takes up the space
```

### Quality gates

| Check | What it catches |
|------|---------|
| `type-check` | Type errors |
| `lint` | Hook rule violations, static accessibility errors, `any`, unused imports |
| `test` | Behaviour regressions + axe violations + token contrast failures |
| `size` | Bundle size regressions, broken tree-shaking |

CI (`.github/workflows/ci.yml`) runs all of them on every pull request.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/new-component`
3. Follow the component file layout:
   - `ComponentName.ui.tsx` — presentational component
   - `ComponentName.ui.test.tsx` — tests
   - `ComponentName.ui.stories.tsx` — Storybook story
   - `index.ts` — barrel export
4. Make sure every check passes:
   ```bash
   npm run type-check && npm run test && npm run build
   ```
5. Open a pull request

---

## License

MIT © null_ong2
