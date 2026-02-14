/*
  Warnings:

  - You are about to drop the column `user` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `WebsiteTick` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `WebsiteTick` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `WebsiteTick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_user_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_region_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_website_fkey";

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WebsiteTick" DROP COLUMN "region",
DROP COLUMN "website",
ADD COLUMN     "regionId" TEXT NOT NULL,
ADD COLUMN     "websiteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
