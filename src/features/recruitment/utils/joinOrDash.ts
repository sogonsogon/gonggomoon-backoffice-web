// 역할: 문자열 배열을 받아서, 배열이 비어있거나 undefined인 경우에는 '-'를 반환하고, 그렇지 않은 경우에는 배열의 요소들을 ', '로 구분하여 연결한 문자열을 반환하는 역할

export function joinOrDash(values?: string[]): string {
  if (!values || values.length === 0) {
    return '-';
  }

  return values.join(', ');
}
