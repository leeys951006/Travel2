import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token; // 쿠키에서 토큰을 가져옴

  if (!token) {
    return res.status(200).json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({ isLoggedIn: true });
  } catch (error) {
    return res.status(200).json({ isLoggedIn: false });
  }
}
