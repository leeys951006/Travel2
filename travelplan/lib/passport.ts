import passport from 'passport';
import { Strategy as NaverStrategy } from 'passport-naver';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'myapp',
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

// 네이버 로그인 전략
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: '/api/auth/naver/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const [rows] = await db.execute('SELECT * FROM users WHERE provider_id = ?', [profile.id]);

      if (rows.length > 0) {
        return done(null, rows[0]);
      } else {
        const [result] = await db.execute('INSERT INTO users (provider, provider_id, name, email, profile_picture) VALUES (?, ?, ?, ?, ?)', [
          'naver',
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          profile.photos[0].value,
        ]);
        const [newUser] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
        return done(null, newUser[0]);
      }
    }
  )
);

// 카카오 로그인 전략
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: '/api/auth/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const [rows] = await db.execute('SELECT * FROM users WHERE provider_id = ?', [profile.id]);

      if (rows.length > 0) {
        return done(null, rows[0]);
      } else {
        const [result] = await db.execute('INSERT INTO users (provider, provider_id, name, email, profile_picture) VALUES (?, ?, ?, ?, ?)', [
          'kakao',
          profile.id,
          profile.displayName,
          profile._json.kakao_account.email,
          profile._json.properties.profile_image,
        ]);
        const [newUser] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
        return done(null, newUser[0]);
      }
    }
  )
);
