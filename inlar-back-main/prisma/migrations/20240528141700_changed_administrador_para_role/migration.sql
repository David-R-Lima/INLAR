/*
  Warnings:

  - You are about to drop the column `ADMINISTRADOR` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `ADMINISTRADOR`,
    ADD COLUMN `ROLE` VARCHAR(1) NULL;
