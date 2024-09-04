'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function KakaoCallback() {
  const router = useRouter();
  const { code } = router.query; // query에서 code를 가져옴

  useEffect(() => {
    if (code) {
      console.log('카카오에서 받은 인증 코드:', code);

      // 서버에 카카오 로그인 콜백 처리 API 요청
      fetch(`/api/auth/kakao?code=${code}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('카카오 로그인 실패');
          }
          return response.json();
        })
        .then((data) => {
          const { token } = data;

          if (token) {
            localStorage.setItem('token', token); // JWT 토큰을 로컬 스토리지에 저장
            router.push('/'); // 홈 화면으로 리다이렉션
          } else {
            console.error('토큰이 없습니다.');
          }
        })
        .catch((error) => {
          console.error('로그인 처리 실패:', error.message);
        });
    }
  }, [code, router]);

  return <div>로그인 처리 중입니다...</div>;
}
