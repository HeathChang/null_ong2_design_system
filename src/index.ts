/**
 * null_ong2-design-system — 메인 엔트리포인트
 *
 * 사용:
 *   import 'null_ong2-design-system/styles.css';  // 앱 진입점에서 1회
 *   import { Button } from 'null_ong2-design-system';
 *
 * 스타일은 JS 번들에 주입되지 않는다(tsup `injectStyle: false`).
 * SSR에서 FOUC가 생겨 v0.2.2부터 `dist/index.css`를 별도 export한다.
 * 아래 import는 tsup이 그 CSS 파일을 만들어내기 위한 것이며, 런타임 부수효과는 없다.
 */
import './styles/tokens.css';
import './styles/components.css';

import { warnIfStylesMissing } from './internal/warnMissingStyles';

// 개발 모드에서 styles.css import 누락을 1회 안내한다 (프로덕션에서는 no-op).
warnIfStylesMissing();

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

// 값 목록 상수 exports (variant 선택 UI, 런타임 검증용)
export {
  ALERT_VARIANTS,
  AVATAR_SHAPES,
  AVATAR_SIZES,
  BADGE_SIZES,
  BADGE_VARIANTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  CONTAINER_MAX_WIDTHS,
  HEADING_LEVELS,
  MODAL_SIZES,
  SKELETON_VARIANTS,
  SPINNER_SIZES,
  SWITCH_SIZES,
  TEXT_COLORS,
  TOAST_POSITIONS,
  TOAST_VARIANTS,
} from './constants';

// i18n exports
export { DesignSystemProvider, useDsFormat, useDsStrings } from './i18n';
export {
  DEFAULT_LOCALE,
  DS_LOCALES,
  EN_STRINGS,
  JA_STRINGS,
  KO_STRINGS,
  ZH_STRINGS,
  formatString,
} from './i18n';
export type { DesignSystemProviderProps, DsLocale, DsStrings } from './i18n';

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
export {
  useBodyScrollLock,
  useControllable,
  useEscapeKey,
  useFocusTrap,
  useInertBackground,
  usePrefersReducedMotion,
} from './hooks';

// 공통 타입 exports
export type {
  PolymorphicProps,
  PolymorphicRef,
  Size,
  SpacingToken,
  RadiusToken,
  SemanticColor,
} from './types';
