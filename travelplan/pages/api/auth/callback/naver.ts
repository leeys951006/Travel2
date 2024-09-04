import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createUserIfNotExists, findUserByProviderId, findUserById } from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  try {
    const clientId = process.env.NAVER_CLIENT_ID;
    const clientSecret = process.env.NAVER_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Naver Client ID 또는 Client Secret이 설정되지 않았습니다.');
    }

    const tokenResponse = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        state,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data.response;

    let dbUser = await findUserByProviderId('naver', user.id);
    if (!dbUser) {
      const newUserId = await createUserIfNotExists({
        provider: 'naver',
        provider_id: user.id,
        name: user.name,
        email: user.email,
        profile_picture: user.profile_image,
      });

      dbUser = await findUserById(newUserId);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    }

    if (dbUser) {
      const token = jwt.sign({ userId: dbUser.id }, jwtSecret, { expiresIn: '1h' });

      // 쿠키에 JWT 토큰 저장
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict;`);

      res.status(200).json({ message: '로그인 성공' });
    } else {
      res.status(500).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Naver OAuth 처리 실패:', error);
    res.status(500).json({ message: '네이버 로그인 처리 중 오류가 발생했습니다.', error: (error as any).message });
  }
}
