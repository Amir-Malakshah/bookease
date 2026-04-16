import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from '../modules/auth/auth.types.js'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return secret
}

function isJwtPayload(value: unknown): value is JwtPayload {
  if (!value || typeof value !== 'object') {
    return false
  }

  const payload = value as Record<string, unknown>

  return (
    typeof payload.userId === 'string' &&
    typeof payload.email === 'string' &&
    (payload.role === 'ADMIN' || payload.role === 'USER')
  )
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret())

    if (!isJwtPayload(decoded)) {
      return res.status(401).json({ message: 'Invalid token payload' })
    }

    req.user = decoded
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}