import prisma from "../../lib/prisma";

export const sendMoney = async (
  senderId: string,
  recipientEmail: string,
  amount: number
) => {
  if (amount <= 0) throw new Error("Amount must be positive");

  const sender = await prisma.wallet.findUnique({ where: { userId: senderId } });
  if (!sender || sender.balance < amount) throw new Error("Insufficient balance");

  const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });
  if (!recipient) throw new Error("Recipient not found");

  const transfer = await prisma.$transaction(async (tx) => {
    await tx.wallet.update({
      where: { userId: senderId },
      data: { balance: { decrement: amount } },
    });

    await tx.wallet.update({
      where: { userId: recipient.id },
      data: { balance: { increment: amount } },
    });

    return await tx.transfer.create({
      data: {
        senderId,
        recipientId: recipient.id,
        amount,
        status: "SUCCESS",
      },
    });
  });

  return transfer;
};

export const getHistory = async (userId: string) => {
  return await prisma.transfer.findMany({
    where: {
      OR: [{ senderId: userId }, { recipientId: userId }],
    },
    orderBy: { createdAt: "desc" },
  });
};