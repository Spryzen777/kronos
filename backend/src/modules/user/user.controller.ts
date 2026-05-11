import { Response } from 'express'
import { AuthRequest } from '../../middleware/auth.middleware'
import { getUser, updateUser } from './user.service'

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUser(req.userId!)
    res.status(200).json({ success: true, user })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
   const user = await updateUser(req.userId!, (req as any).body)
    res.status(200).json({ success: true, user })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}