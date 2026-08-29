import { Fragment, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

/**
 * 트리거 자리에 단일 React 엘리먼트가 왔는지 확인한다.
 *
 * 문자열이나 Fragment를 넘기면 `cloneElement`가 ref를 붙일 곳이 없어
 * "Element type is invalid: ... but got: object" 같은 해독 불가능한 React 오류가 난다.
 * 무엇을 잘못했고 어떻게 고치는지 알려주는 편이 낫다.
 *
 * @param value 검사할 자식
 * @param component 오류 메시지에 쓸 컴포넌트 이름
 * @param propName 오류 메시지에 쓸 prop 이름
 */
export function assertSingleElement(
  value: ReactNode,
  component: string,
  propName: string,
): ReactElement {
  if (!isValidElement(value)) {
    throw new Error(
      `<${component}>의 ${propName}에는 단일 React 엘리먼트가 필요합니다. ` +
        `받은 값: ${describe(value)}\n` +
        `해결: 포커스 가능한 엘리먼트 하나로 감싸주세요 — ` +
        `<${component} ...><button>내용</button></${component}>`,
    );
  }

  if (value.type === Fragment) {
    throw new Error(
      `<${component}>의 ${propName}에 Fragment(<>...</>)를 넘길 수 없습니다. ` +
        `Fragment에는 ref를 붙일 수 없어 위치 계산과 키보드 조작이 동작하지 않습니다.\n` +
        `해결: 엘리먼트 하나만 넘기거나 <span>/<button>으로 감싸주세요.`,
    );
  }

  return value;
}

function describe(value: ReactNode): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return `배열(길이 ${value.length})`;
  return typeof value === 'object' ? 'object' : `${typeof value} (${String(value)})`;
}
