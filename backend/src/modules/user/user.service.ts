import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true }
  })
  if (!user) throw new Error('User not found')
  
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const updateUser = async (userId: string, data: {
  firstName?: string
  lastName?: string
  phone?: string
}) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data
  })
  
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}