/**
 * 컴포넌트가 내장하고 있는 UI 문자열.
 *
 * 스크린리더에만 읽히는 레이블이 대부분이라 눈에 잘 띄지 않지만,
 * 하드코딩해두면 다른 언어권 사용자에게는 그대로 장벽이 된다.
 *
 * `{index}` 같은 중괄호 자리표시자는 `formatString`으로 치환한다.
 * (함수 대신 문자열 템플릿을 쓰는 이유: 소비자가 JSON으로 관리하거나
 *  일부 키만 골라 덮어쓰기 쉽다)
 */
export interface DsStrings {
  /** 모달 닫기 버튼 */
  close: string;
  /** 로딩 스피너 */
  loading: string;
  /** 이름도 이미지도 없는 아바타 */
  avatarFallback: string;
  /** 토스트 영역 */
  toastRegion: string;
  /** 토스트 개별 닫기 버튼 */
  toastClose: string;
  /** 캐루셀 영역 */
  carousel: string;
  /** 이전 슬라이드 버튼 */
  carouselPrevious: string;
  /** 다음 슬라이드 버튼 */
  carouselNext: string;
  /** 인디케이터 그룹 */
  carouselPagination: string;
  /** 인디케이터 버튼. `{index}` 치환 */
  carouselGoToSlide: string;
  /** 슬라이드 자체. `{index}`, `{total}` 치환 */
  carouselSlide: string;
  /** 자동 재생 시작 버튼 */
  carouselPlay: string;
  /** 자동 재생 정지 버튼 */
  carouselPause: string;
}

export const KO_STRINGS: DsStrings = {
  close: '닫기',
  loading: '로딩 중',
  avatarFallback: '사용자 아바타',
  toastRegion: '알림',
  toastClose: '알림 닫기',
  carousel: '캐루셀',
  carouselPrevious: '이전 슬라이드',
  carouselNext: '다음 슬라이드',
  carouselPagination: '슬라이드 선택',
  carouselGoToSlide: '슬라이드 {index}',
  carouselSlide: '{index} / {total}',
  carouselPlay: '자동 재생 시작',
  carouselPause: '자동 재생 정지',
};

export const EN_STRINGS: DsStrings = {
  close: 'Close',
  loading: 'Loading',
  avatarFallback: 'User avatar',
  toastRegion: 'Notifications',
  toastClose: 'Dismiss notification',
  carousel: 'Carousel',
  carouselPrevious: 'Previous slide',
  carouselNext: 'Next slide',
  carouselPagination: 'Choose slide',
  carouselGoToSlide: 'Slide {index}',
  carouselSlide: '{index} of {total}',
  carouselPlay: 'Start automatic slide show',
  carouselPause: 'Stop automatic slide show',
};

export const JA_STRINGS: DsStrings = {
  close: '閉じる',
  loading: '読み込み中',
  avatarFallback: 'ユーザーアバター',
  toastRegion: '通知',
  toastClose: '通知を閉じる',
  carousel: 'カルーセル',
  carouselPrevious: '前のスライド',
  carouselNext: '次のスライド',
  carouselPagination: 'スライドを選択',
  carouselGoToSlide: 'スライド {index}',
  carouselSlide: '{index} / {total}',
  carouselPlay: '自動再生を開始',
  carouselPause: '自動再生を停止',
};

export const ZH_STRINGS: DsStrings = {
  close: '关闭',
  loading: '加载中',
  avatarFallback: '用户头像',
  toastRegion: '通知',
  toastClose: '关闭通知',
  carousel: '轮播',
  carouselPrevious: '上一张',
  carouselNext: '下一张',
  carouselPagination: '选择幻灯片',
  carouselGoToSlide: '第 {index} 张',
  carouselSlide: '第 {index} 张，共 {total} 张',
  carouselPlay: '开始自动播放',
  carouselPause: '停止自动播放',
};

/** 내장 로케일 */
export const DS_LOCALES = {
  ko: KO_STRINGS,
  en: EN_STRINGS,
  ja: JA_STRINGS,
  zh: ZH_STRINGS,
} as const;

export type DsLocale = keyof typeof DS_LOCALES;

/** 기본 로케일. 기존 동작을 유지하기 위해 한국어다. */
export const DEFAULT_LOCALE: DsLocale = 'ko';

/**
 * `{key}` 자리표시자를 값으로 치환한다.
 *
 * @example
 * formatString('슬라이드 {index}', { index: 3 })  // '슬라이드 3'
 */
export function formatString(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}
