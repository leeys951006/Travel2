// components/AuthButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = () => {
    // 로그아웃 로직 추가 필요
    router.push('/'); // 로그아웃 후 메인 페이지로 이동
  };

  const isAuthenticated = false; // 인증 상태 로직 추가 필요

  return isAuthenticated ? (
    <button
      onClick={handleSignOut}
      className="bg-none border-2 border-blue-700 text-blue-700 py-2 px-4 rounded-full cursor-pointer text-base transition-all duration-300 hover:bg-blue-700 hover:text-white"
    >
      로그아웃
    </button>
  ) : (
    <button
      onClick={handleSignIn}
      className="bg-none border-2 border-blue-700 text-blue-700 py-2 px-4 rounded-full cursor-pointer text-base transition-all duration-300 hover:bg-blue-700 hover:text-white"
    >
      로그인
    </button>
  );
}
