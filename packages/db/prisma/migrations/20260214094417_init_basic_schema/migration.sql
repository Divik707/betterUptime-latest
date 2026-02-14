-- CreateEnum
CREATE TYPE "WebsiteStatus" AS ENUM ('up', 'down', 'unknown');

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteTick" (
    "id" TEXT NOT NULL,
    "status" "WebsiteStatus" NOT NULL,
    "website" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "WebsiteTick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_website_fkey" FOREIGN KEY ("website") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_region_fkey" FOREIGN KEY ("region") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
