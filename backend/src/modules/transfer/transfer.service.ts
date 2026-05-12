import prisma from "../../lib/prisma";

export const sendMoney = async (
  senderId: string,
  recipientEmail: string,
  amount: number,
  currency: string = "USD"
) => {
  if (!amount || isNaN(amount) || amount <= 0)
    throw new Error("Invalid amount");

  const sender = await prisma.wallet.findUnique({ where: { userId: senderId } });
  if (!sender || sender.balance < amount)
    throw new Error("Insufficient balance");

  const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });
  if (!recipient) throw new Error("Recipient not found");

  if (recipient.id === senderId)
    throw new Error("Cannot send money to yourself");

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
        currency,
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
    include: {
      sender: { select: { id: true, email: true, firstName: true, lastName: true } },
      recipient: { select: { id: true, email: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};