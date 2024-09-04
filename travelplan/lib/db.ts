import { pool } from './mysql'; // MySQL 커넥션 풀
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// User 타입 정의
interface User {
  id?: number; // 선택적 필드
  provider: string;
  provider_id: string;
  name: string;
  email: string;
  profile_picture?: string; // 선택적 필드
}

// 사용자를 생성 또는 업데이트하는 함수
export async function createUserIfNotExists(user: User): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO users (provider, provider_id, name, email, profile_picture)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), profile_picture = VALUES(profile_picture)`,
    [user.provider, user.provider_id, user.name, user.email, user.profile_picture]
  );
  return result.insertId;
}

// ID로 사용자 정보 조회
export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows.length ? (rows[0] as User) : null;
}

// provider와 providerId로 사용자 정보 조회
export async function findUserByProviderId(provider: string, providerId: string): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE provider = ? AND provider_id = ?`, [provider, providerId]);
  return rows.length ? (rows[0] as User) : null;
}
