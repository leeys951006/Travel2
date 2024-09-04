'use client';

export default function KakaoLoginButton() {
  const handleLogin = () => {
    // 환경 변수에서 카카오 클라이언트 ID와 리디렉션 URI를 가져오기
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!kakaoClientId || !redirectUri) {
      console.error('Kakao Client ID 또는 Redirect URI가 설정되지 않았습니다.');
      return;
    }

    // 카카오 OAuth 로그인 페이지로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <button onClick={handleLogin} className="bg-[#FEE500] text-black py-2 px-6 rounded-full text-sm md:text-base">
      카카오 로그인
    </button>
  );
}
