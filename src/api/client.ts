import axios from 'axios';

export const kakaoClient = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});
