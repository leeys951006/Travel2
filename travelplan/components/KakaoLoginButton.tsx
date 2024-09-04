'use client';

export default function KakaoLoginButton() {
  const handleLogin = () => {
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!kakaoClientId || !redirectUri) {
      console.error('Kakao Client ID 또는 Redirect URI가 설정되지 않았습니다.');
      return;
    }

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <button onClick={handleLogin} className="p-0 border-none bg-transparent">
      <img src="/kakao-logo.png" alt="카카오 로그인" className="w-40 h-10" />
    </button>
  );
}
