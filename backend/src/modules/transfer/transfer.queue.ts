import { Queue, Worker } from "bullmq";
import prisma from "../../lib/prisma";

const connection = {
  host: "localhost",
  port: 6379,
};

export const transferQueue = new Queue("transfers", { connection });

new Worker(
  "transfers",
  async (job) => {
    const { senderId, recipientId, amount } = job.data;

    await prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { userId: senderId },
        data: { balance: { decrement: amount } },
      });

      await tx.wallet.update({
        where: { userId: recipientId },
        data: { balance: { increment: amount } },
      });

      await tx.transfer.create({
        data: {
          senderId,
          recipientId,
          amount,
          status: "SUCCESS",
        },
      });
    });
  },
  { connection }
);