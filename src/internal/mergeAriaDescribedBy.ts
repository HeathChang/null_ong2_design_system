/**
 * 컴포넌트가 만든 설명 id와 소비자가 넘긴 `aria-describedby`를 합친다.
 *
 * 그냥 스프레드에 맡기면 소비자 값이 우리 값을 덮어써서
 * 힌트·에러 메시지가 어디에서도 참조되지 않는 고아 노드가 된다.
 * (`<Input error="..." aria-describedby="..." />`에서 에러가 낭독되지 않던 문제)
 *
 * @example
 * mergeAriaDescribedBy('a-error', 'my-hint')  // 'a-error my-hint'
 */
export function mergeAriaDescribedBy(
  ...ids: Array<string | undefined | null | false>
): string | undefined {
  const merged = ids
    .filter((id): id is string => typeof id === 'string' && id.trim() !== '')
    .flatMap((id) => id.trim().split(/\s+/));
  const unique = [...new Set(merged)];
  return unique.length > 0 ? unique.join(' ') : undefined;
}
