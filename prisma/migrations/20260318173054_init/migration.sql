-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "handmade" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "materials" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
