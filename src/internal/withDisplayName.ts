/**
 * 컴포넌트에 DevTools 표시 이름을 붙여 돌려준다.
 *
 * `Button.displayName = 'Button'`처럼 모듈 최상위에서 대입하면 번들러가 부수효과로 보고
 * 쓰지 않는 컴포넌트도 버리지 못한다. `forwardRef(...)` 호출도 같은 이유로 남는다.
 * 호출부에 `@__PURE__` 표식을 붙이려면 대입이 아니라 "값을 돌려주는 호출"이어야 해서
 * 이 함수로 감싼다.
 *
 * @example
 * export const Button = /* @__PURE__ *\/ withDisplayName(
 *   /* @__PURE__ *\/ forwardRef(...),   // 안쪽 호출에도 표식이 있어야 통째로 제거된다
 *   'Button',
 * );
 */
export function withDisplayName<TComponent extends { displayName?: string | undefined }>(
  component: TComponent,
  displayName: string,
): TComponent {
  component.displayName = displayName;
  return component;
}
