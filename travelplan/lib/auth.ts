import jwt from 'jsonwebtoken';

export function verifyToken(token: string): any | null {
  // JWT_SECRET이 정의되었는지 확인
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    // token의 타입은 string이어야 함
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
