import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import prisma from '../../lib/prisma'

export const registerUser = async (data: {
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
}) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } })
  if (existing) throw new Error('User already exists')

  const hashed = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashed,
      wallet: { create: { balance: 0 } }
    }
  })

  return { id: user.id, email: user.email, firstName: user.firstName }
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid credentials')

  const token = (jwt as any).sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return { token, user: { id: user.id, email: user.email, firstName: user.firstName } }
}