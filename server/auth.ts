import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { v4 as uuidv4 } from 'uuid';
import { getQuery, runQuery } from './db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret';
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/api/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false);
        }

        // Try to find existing user
        let user = await getQuery('SELECT * FROM users WHERE google_id = ?', [profile.id]);

        if (!user) {
          // Create new user
          const userId = uuidv4();
          const name = profile.displayName || email.split('@')[0];
          const avatar = profile.photos?.[0]?.value || '';

          await runQuery(
            `INSERT INTO users (id, google_id, email, name, avatar, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [userId, profile.id, email, name, avatar]
          );

          user = {
            id: userId,
            google_id: profile.id,
            email,
            name,
            avatar,
            bio: null,
            location: null,
            company: null,
            title: null,
            skills: null,
            experience: null,
            domains: null,
          };
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getQuery('SELECT * FROM users WHERE id = ?', [id]);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
