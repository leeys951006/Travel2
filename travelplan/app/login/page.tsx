'use client';

import NaverLoginButton from '../../components/NaverLoginButton';
import KakaoLoginButton from '../../components/KakaoLoginButton';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border border-gray-300 rounded-lg p-10 w-96 shadow-lg flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold mb-6">소셜 로그인</h1>
        <KakaoLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
}
