/**
 * null_ong2-design-system — 메인 엔트리포인트
 *
 * zero-config 사용:
 *   import { Button } from 'null_ong2-design-system';
 *
 * 스타일은 이 import 시 자동으로 주입된다.
 */

// 글로벌 스타일 자동 주입 (tsup injectStyle 처리)
import './styles/index.css';

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
  Textarea,
  // Feedback
  Alert,
  Skeleton,
  Spinner,
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
  TextareaProps,
  AlertProps,
  SkeletonProps,
  SpinnerProps,
} from './components';

// 토큰 exports (소비 프로젝트에서 CSS 변수 키 참조용)
export {
  SPACING,
  RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  Z_INDEX,
} from './tokens';

export type {
  SpacingKey,
  RadiusKey,
  FontSizeKey,
  FontWeightKey,
  ZIndexKey,
} from './tokens';

// 훅 exports
export { useControllable } from './hooks';

// 공통 타입 exports
export type { PolymorphicProps, PolymorphicRef, Size, SpacingToken, RadiusToken, SemanticColor } from './types';
