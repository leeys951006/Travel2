export default function LoginButton() {
  const handleNaverLogin = () => {
    window.location.href = '/api/auth/naver';
  };

  const handleKakaoLogin = () => {
    window.location.href = '/api/auth/kakao';
  };

  return (
    <div>
      <button
        onClick={handleNaverLogin}
        className="text-[#1B6AB3] border border-[#1B6AB3] py-2 px-6 rounded-full text-sm md:text-base hover:bg-[#1B6AB3] hover:text-white transition-colors duration-300 ease-in-out mb-2"
      >
        네이버로 로그인
      </button>
      <button
        onClick={handleKakaoLogin}
        className="text-[#1B6AB3] border border-[#1B6AB3] py-2 px-6 rounded-full text-sm md:text-base hover:bg-[#1B6AB3] hover:text-white transition-colors duration-300 ease-in-out"
      >
        카카오로 로그인
      </button>
    </div>
  );
}
