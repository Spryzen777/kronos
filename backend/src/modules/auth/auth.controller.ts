import { Request, Response } from 'express'
import { registerUser, loginUser } from './auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body)
    res.status(201).json({ success: true, user })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)
    res.status(200).json({ success: true, ...result })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}