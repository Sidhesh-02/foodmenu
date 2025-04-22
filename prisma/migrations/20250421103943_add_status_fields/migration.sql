-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isHandled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';
