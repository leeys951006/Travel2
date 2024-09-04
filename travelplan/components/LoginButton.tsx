'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include', // 쿠키를 포함하여 요청
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn); // 서버에서 받은 로그인 상태 확인
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('로그인 상태 확인 중 오류 발생:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // 로그인 처리
  const handleLogin = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키를 포함하여 요청
      });

      if (response.ok) {
        setIsLoggedIn(false); // 로그아웃 후 상태 갱신
        router.push('/'); // 로그아웃 후 홈으로 이동
      }
    } catch (error) {
      console.error('로그아웃 처리 중 오류 발생:', error);
    }
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
