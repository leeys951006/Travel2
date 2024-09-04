'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  // 로그인 처리
  const handleLogin = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 갱신
    router.push('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <button
      onClick={isLoggedIn ? handleLogout : handleLogin}
      className={`text-[#1B6AB3] border border-[#1B6AB3] bg-white py-2 px-6 rounded-full text-sm md:text-base transition-colors duration-300 ease-in-out hover:bg-[#1B6AB3] hover:text-white`}
    >
      {isLoggedIn ? '로그아웃' : '로그인'}
    </button>
  );
}
