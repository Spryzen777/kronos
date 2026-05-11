-- AlterTable
ALTER TABLE "Transfer" ALTER COLUMN "currency" SET DEFAULT 'USD';

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
