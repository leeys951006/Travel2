import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 쿠키에서 토큰 삭제
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;`);
  return res.status(200).json({ message: '로그아웃 성공' });
}
