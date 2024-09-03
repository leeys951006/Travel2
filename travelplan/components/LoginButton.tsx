// components/LoginButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); // 로그인 페이지로 이동
  };

  return (
    <button
      onClick={handleLogin}
      className="text-[#1B6AB3] border border-[#1B6AB3] py-2 px-6 rounded-full text-sm md:text-base hover:bg-[#1B6AB3] hover:text-white transition-colors duration-300 ease-in-out"
    >
      로그인
    </button>
  );
}
