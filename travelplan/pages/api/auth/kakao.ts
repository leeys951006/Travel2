// pages/api/auth/kakao.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createUserIfNotExists, findUserByProviderId, findUserById } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
      code,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    });

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data;

    let dbUser = await findUserByProviderId('kakao', user.id);
    if (!dbUser) {
      const newUserId = await createUserIfNotExists({
        provider: 'kakao',
        provider_id: user.id,
        name: user.properties.nickname,
        email: user.kakao_account.email,
        profile_picture: user.properties.profile_image,
      });

      dbUser = await findUserById(newUserId);
    }

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
  } catch (error) {
    res.status(500).json({ message: '로그인 실패', error: (error as any).message });
  }
}
