'use client';

import { useEffect, useRef } from 'react';

export default function NaverLoginButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleLogin = () => {
      const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

      if (!naverClientId || !redirectUri) {
        console.error('Naver Client ID 또는 Redirect URI가 설정되지 않았습니다.');
        return;
      }

      window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=RANDOM_STATE`;
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleLogin);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleLogin);
      }
    };
  }, []);

  return (
    <button ref={buttonRef} className="p-0 border-none bg-transparent">
      <img src="/naver-logo.png" alt="네이버 로그인" className="w-40 h-10" />
    </button>
  );
}
