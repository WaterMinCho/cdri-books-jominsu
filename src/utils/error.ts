import { isAxiosError } from 'axios';

// 서버 응답을 그대로 노출하지 않고 사용자용 문구로 변환한다
export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    if (!error.response) return '네트워크 연결을 확인해 주세요.';

    const { status } = error.response;
    if (status === 401 || status === 403) return '인증에 실패했습니다. API 키를 확인해 주세요.';
    if (status === 429) return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.';
  }

  return '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
};
