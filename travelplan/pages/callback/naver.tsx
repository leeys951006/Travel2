'use client';

import React, { useEffect } from 'react'; // React를 명시적으로 import
import { useRouter } from 'next/router';

export default function NaverCallback() {
  const router = useRouter();
  const { code, state } = router.query;

  useEffect(() => {
    if (code && state) {
      console.log('네이버에서 받은 인증 코드:', code);
      console.log('네이버에서 받은 상태 값:', state);

      // 서버에 네이버 로그인 콜백 처리 API 요청
      fetch(`/api/auth/callback/naver?code=${code}&state=${state}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('네이버 로그인 실패');
          }
          return response.json();
        })
        .then((data) => {
          const { token } = data;

          if (token) {
            localStorage.setItem('token', token);
            router.push('/');
          } else {
            console.error('토큰이 없습니다.');
          }
        })
        .catch((error) => {
          console.error('로그인 처리 실패:', error.message);
        });
    }
  }, [code, state, router]);

  return <div>로그인 처리 중입니다...</div>;
}
