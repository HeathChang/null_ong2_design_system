/**
 * 컴포넌트가 받는 값 목록을 런타임 상수로 노출한다.
 *
 * 타입만 있으면 "어떤 값이 가능한가"를 코드에서 순회할 수 없다.
 * variant 선택 UI를 만들거나, 서버에서 받은 문자열이 유효한 값인지 검사할 때 쓴다.
 *
 * @example
 * import { BUTTON_VARIANTS } from 'null_ong2-design-system';
 *
 * {BUTTON_VARIANTS.map((variant) => (
 *   <Button key={variant} variant={variant}>{variant}</Button>
 * ))}
 */
export { BUTTON_SIZES, BUTTON_VARIANTS } from '../components/core/Button/Button.ui';
export { AVATAR_SHAPES, AVATAR_SIZES } from '../components/data-display/Avatar/Avatar.ui';
export { BADGE_SIZES, BADGE_VARIANTS } from '../components/data-display/Badge/Badge.ui';
export { ALERT_VARIANTS } from '../components/feedback/Alert/Alert.ui';
export { SKELETON_VARIANTS } from '../components/feedback/Skeleton/Skeleton.ui';
export { SPINNER_SIZES } from '../components/feedback/Spinner/Spinner.ui';
export { SWITCH_SIZES } from '../components/form/Switch/Switch.ui';
export { CONTAINER_MAX_WIDTHS } from '../components/layout/Container/Container.ui';
export { MODAL_SIZES } from '../components/overlay/Modal/Modal.ui';
export { TOAST_POSITIONS, TOAST_VARIANTS } from '../components/overlay/Toast/Toast.ui';
export { HEADING_LEVELS } from '../components/typography/Heading/Heading.ui';
export { TEXT_COLORS } from '../components/typography/Text/Text.ui';
