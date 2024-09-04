import nextConnect from 'next-connect';
import passport from 'passport';
import '../../../lib/passport';

const handler = nextConnect();

handler.use(passport.initialize());
handler.use(passport.session());

handler.get('/api/auth/naver', passport.authenticate('naver'));
handler.get(
  '/api/auth/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/my-plans',
    failureRedirect: '/login',
  })
);

handler.get('/api/auth/kakao', passport.authenticate('kakao'));
handler.get(
  '/api/auth/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/my-plans',
    failureRedirect: '/login',
  })
);

export default handler;
