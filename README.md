<div align="center">

# null_ong2-design-system

A production-ready React design system library.

### 📖 https://null-ong2-design-system-docs.vercel.app/

Live demos · one-click copyable snippets · props tables · design token visualisation

<br />

### 📚 Full documentation

**[🇰🇷 한국어](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.ko.md)** ·
**[🇺🇸 English](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.en.md)** ·
**[🇨🇳 中文](https://github.com/HeathChang/null_ong2_design_system/blob/main/README.zh-CN.md)**

</div>

---

## Install

```bash
npm install null_ong2-design-system
```

> **Peer dependencies** — React 18 or later

## Quick start

```tsx
// 1. Import the stylesheet once, at your app entry point
import 'null_ong2-design-system/styles.css';
```

```tsx
// 2. Use the components
import { Button, Input, Alert, Stack } from 'null_ong2-design-system';

function App() {
  return (
    <Stack spacing="lg">
      <Alert variant="info">Welcome.</Alert>
      <Input label="Email" type="email" placeholder="example@mail.com" required />
      <Button variant="primary" onClick={() => alert('Saved')}>Save</Button>
    </Stack>
  );
}
```

You can import these from a React Server Component environment (Next.js App Router) —
the package ships a `"use client"` directive.

## Components

| Category | Components |
|---------|---------|
| **Layout** | `Box` `Flex` `Stack` `Grid` `Container` |
| **Typography** | `Text` `Heading` `Label` |
| **Core UI** | `Button` |
| **Form** | `Input` `Textarea` `Checkbox` `Radio` `Select` `Switch` |
| **Feedback** | `Spinner` `Skeleton` `Alert` |
| **Data Display** | `Avatar` `Badge` `Carousel` |
| **Navigation** | `Tabs` |
| **Overlay** | `Modal` `Tooltip` `DropdownMenu` `Toast` |

## Highlights

| | |
|---|---|
| ♿ **Accessible by default** | Keyboard operation, focus management, Windows high contrast, reduced motion. WCAG 2.1 AA contrast is verified by tests. |
| 🌗 **Dark mode** | Follows the OS with no configuration, or take control with `.dark` / `[data-theme]`. |
| 🌍 **Internationalised** | Built-in strings for `ko` `en` `ja` `zh`. Works without a provider. |
| 📦 **Tree-shakable** | `import { Button }` costs about 2.4 kB (brotli). CI enforces the limits. |
| 🎨 **Token-driven** | Every visual value is a CSS variable — override them to theme the system. |
| 🔍 **Type-safe** | Written under TypeScript `strict`, with every props type exported. |

See the full documentation above for details on each of these.

## Links

- [CHANGELOG](https://github.com/HeathChang/null_ong2_design_system/blob/main/CHANGELOG.md)
- [npm](https://www.npmjs.com/package/null_ong2-design-system)
- [Issues](https://github.com/HeathChang/null_ong2_design_system/issues)

## License

MIT © null_ong2
