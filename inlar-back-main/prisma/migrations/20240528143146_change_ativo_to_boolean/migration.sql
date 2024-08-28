/*
  Warnings:

  - You are about to alter the column `ATIVO` on the `tipodoacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `tipodoacao` MODIFY `ATIVO` BOOLEAN NOT NULL;
