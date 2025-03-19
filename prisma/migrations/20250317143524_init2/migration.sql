/*
  Warnings:

  - You are about to drop the column `description` on the `MenuItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,price]` on the table `Topping` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "description",
ADD COLUMN     "menuImage" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderType" TEXT NOT NULL,
ADD COLUMN     "tableNumber" TEXT;

-- AlterTable
ALTER TABLE "Topping" ADD COLUMN     "toppingImage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Topping_name_price_key" ON "Topping"("name", "price");
