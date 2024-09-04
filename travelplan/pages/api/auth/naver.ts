import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createUserIfNotExists, findUserByProviderId, findUserById } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  try {
    // 네이버에서 인증 코드로 토큰 요청
    const tokenResponse = await axios.post('https://nid.naver.com/oauth2.0/token', {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
      code,
      state,
    });

    const accessToken = tokenResponse.data.access_token;

    // 토큰으로 사용자 정보 요청
    const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userInfoResponse.data.response;

    // 사용자 DB에 저장 또는 업데이트
    let dbUser = await findUserByProviderId('naver', user.id);
    if (!dbUser) {
      const newUserId = await createUserIfNotExists({
        provider: 'naver',
        provider_id: user.id,
        name: user.name,
        email: user.email,
        profile_picture: user.profile_image,
      });

      dbUser = await findUserById(newUserId); // 새로 생성된 사용자 정보 조회
    }

    // JWT_SECRET 환경 변수 확인
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    }

    // JWT 토큰 생성
    if (dbUser) {
      const token = jwt.sign({ userId: dbUser.id }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '로그인 실패', error: (error as any).message });
  }
}
