'use client';

import NaverLoginButton from '../../components/NaverLoginButton';
import KakaoLoginButton from '../../components/KakaoLoginButton';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">로그인 선택</h1>
      <NaverLoginButton />
      <KakaoLoginButton />
    </div>
  );
}
