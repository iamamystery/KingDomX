import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import prisma from './prisma'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

async function findOrCreateUserByEmail(email: string | undefined, name?: string) {
  if (!email) return null
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({ data: { email, name: name || 'OAuth User', role: 'CLIENT' } })
  }
  return user
}

export default function initializePassport() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const googleCallback = process.env.GOOGLE_CALLBACK_URL || `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/oauth/google/callback`

  if (googleClientId && googleClientSecret) {
    passport.use(new GoogleStrategy({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallback,
    }, async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value
        const name = profile.displayName || (profile.name && `${profile.name.givenName || ''} ${profile.name.familyName || ''}`)
        const user = await findOrCreateUserByEmail(email, name)
        if (!user) return done(new Error('No email from provider'))
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
        ;(user as any).jwtToken = token
        return done(null, user)
      } catch (err) {
        return done(err as any)
      }
    }))
  }

  const githubClientId = process.env.GITHUB_CLIENT_ID
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET
  const githubCallback = process.env.GITHUB_CALLBACK_URL || `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/oauth/github/callback`

  if (githubClientId && githubClientSecret) {
    passport.use(new GitHubStrategy({
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallback,
      scope: ['user:email']
    }, async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      try {
        // GitHub may not always return primary email in profile.emails
        const email = profile.emails && profile.emails[0] && profile.emails[0].value
        const name = profile.displayName || profile.username
        const user = await findOrCreateUserByEmail(email, name)
        if (!user) return done(new Error('No email from provider'))
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
        ;(user as any).jwtToken = token
        return done(null, user)
      } catch (err) {
        return done(err as any)
      }
    }))
  }
}
