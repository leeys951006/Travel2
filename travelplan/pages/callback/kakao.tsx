'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function KakaoCallback() {
  const router = useRouter();
  const { code } = router.query;

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
        .then(() => {
          // 쿠키에 토큰이 저장되었으므로 홈 화면으로 리다이렉션
          router.push('/');
        })
        .catch((error) => {
          console.error('로그인 처리 실패:', error.message);
        });
    }
  }, [code, router]);

  return <div>로그인 처리 중입니다...</div>;
}
