/*
  Warnings:

  - You are about to drop the column `LOUGRADOURO` on the `empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `LOUGRADOURO`,
    ADD COLUMN `LOGRADOURO` VARCHAR(255) NULL;
