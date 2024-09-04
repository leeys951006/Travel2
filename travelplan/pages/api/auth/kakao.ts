import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createUserIfNotExists, findUserByProviderId, findUserById } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  try {
    // 카카오 서버에 인증 코드를 보내어 액세스 토큰을 요청
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
        code,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // 액세스 토큰으로 사용자 정보 요청
    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data;

    // 반환된 사용자 데이터 구조를 콘솔에 출력하여 확인
    console.log('Kakao user data:', user);

    // 사용자 정보가 정확히 있는지 확인하고 안전하게 접근
    const nickname = user.properties?.nickname ?? 'Unknown'; // 닉네임이 없으면 'Unknown'으로 설정
    const email = user.kakao_account?.email ?? 'no-email@example.com'; // 이메일이 없으면 기본값 설정
    const profileImage = user.properties?.profile_image ?? '';

    // DB에서 해당 사용자가 있는지 확인하고, 없으면 생성
    let dbUser = await findUserByProviderId('kakao', user.id);
    if (!dbUser) {
      const newUserId = await createUserIfNotExists({
        provider: 'kakao',
        provider_id: user.id,
        name: nickname,
        email: email,
        profile_picture: profileImage,
      });

      dbUser = await findUserById(newUserId);
    }

    // JWT 생성
    if (dbUser) {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
      }

      const token = jwt.sign({ userId: dbUser.id }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error: any) {
    // 'any'로 타입 명시
    // 더 자세한 에러 로그 출력
    console.error('Error in Kakao OAuth:', error.response?.data || error.message || error);
    res.status(500).json({ message: '로그인 실패', error: error.response?.data || error.message });
  }
}
