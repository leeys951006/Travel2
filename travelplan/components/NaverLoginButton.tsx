'use client';

export default function NaverLoginButton() {
  const handleLogin = () => {
    // 환경 변수에서 네이버 클라이언트 ID와 리디렉션 URI를 가져오기
    const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

    if (!naverClientId || !redirectUri) {
      console.error('Naver Client ID 또는 Redirect URI가 설정되지 않았습니다.');
      return;
    }

    // 네이버 OAuth 로그인 페이지로 리다이렉트
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=RANDOM_STATE`;
  };

  return (
    <button onClick={handleLogin} className="bg-[#03C75A] text-white py-2 px-6 rounded-full text-sm md:text-base mb-4">
      네이버 로그인
    </button>
  );
}
