/**
 * null_ong2-design-system — 메인 엔트리포인트
 *
 * zero-config 사용:
 *   import { Button } from 'null_ong2-design-system';
 *
 * 스타일은 이 import 시 자동으로 주입된다.
 */

// 글로벌 스타일 자동 주입 (tsup injectStyle 처리)
// @import 구문을 거치지 않고 각 파일을 직접 import해야 tsup이 실제 CSS 내용을 번들에 인라인한다.
// (이전 구조: index.css가 @import로 두 파일을 합쳤으나, tsup은 @import를 인라인하지 않아
//  런타임에 브라우저가 미존재 파일을 fetch 시도하던 버그가 있었다 — v0.2.1 수정)
import './styles/tokens.css';
import './styles/components.css';

// 컴포넌트 exports
export {
  // Layout
  Box,
  Container,
  Flex,
  Grid,
  Stack,
  // Typography
  Heading,
  Label,
  Text,
  // Core UI
  Button,
  // Form
  Checkbox,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
  // Feedback
  Alert,
  Skeleton,
  Spinner,
  // Data Display
  Avatar,
  Badge,
  Carousel,
  // Navigation
  Tabs,
  // Overlay
  DropdownMenu,
  Modal,
  ToastProvider,
  useToast,
  Tooltip,
} from './components';

// 타입 exports
export type {
  HeadingProps,
  LabelProps,
  ButtonProps,
  CheckboxProps,
  InputProps,
  RadioProps,
  SelectProps,
  SelectOption,
  SwitchProps,
  TextareaProps,
  AlertProps,
  SkeletonProps,
  SpinnerProps,
  AvatarProps,
  BadgeProps,
  CarouselProps,
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsPanelProps,
  DropdownMenuProps,
  DropdownMenuItem,
  ModalProps,
  TooltipProps,
} from './components';

// 토큰 exports
export { SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT, Z_INDEX } from './tokens';
export type {
  SpacingKey,
  RadiusKey,
  FontSizeKey,
  FontWeightKey,
  ZIndexKey,
} from './tokens';

// 훅 exports
export { useControllable, useEscapeKey, useFocusTrap } from './hooks';

// 공통 타입 exports
export type {
  PolymorphicProps,
  PolymorphicRef,
  Size,
  SpacingToken,
  RadiusToken,
  SemanticColor,
} from './types';
