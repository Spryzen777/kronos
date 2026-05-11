import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
  body: any
  headers: any
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = (jwt as any).verify(token, process.env.JWT_SECRET!) as { userId: string }
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}