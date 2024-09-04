import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createUserIfNotExists, findUserByProviderId, findUserById } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  try {
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

    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data;
    const nickname = user.properties?.nickname ?? 'Unknown';
    const email = user.kakao_account?.email ?? 'no-email@example.com';
    const profileImage = user.properties?.profile_image ?? '';

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

    if (dbUser) {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
      }

      const token = jwt.sign({ userId: dbUser.id }, jwtSecret, { expiresIn: '1h' });

      // 쿠키에 JWT 토큰 저장 (HttpOnly 설정)
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict;`);

      res.status(200).json({ message: '로그인 성공' });
    } else {
      res.status(500).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error: any) {
    console.error('Error in Kakao OAuth:', error.response?.data || error.message || error);
    res.status(500).json({ message: '로그인 실패', error: error.response?.data || error.message });
  }
}
