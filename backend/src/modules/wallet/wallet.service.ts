import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBalance = async (userId: string) => {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });
  if (!wallet) throw new Error("Wallet not found");
  return wallet;
};

export const addMoney = async (userId: string, amount: number) => {
  if (amount <= 0) throw new Error("Amount must be positive");

  const wallet = await prisma.wallet.update({
    where: { userId },
    data: { balance: { increment: amount } },
  });
  return wallet;
};