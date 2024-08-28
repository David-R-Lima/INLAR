/*
  Warnings:

  - You are about to alter the column `ATIVO` on the `beneficiario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1)` to `TinyInt`.
  - You are about to alter the column `ATIVO` on the `doador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1)` to `TinyInt`.
  - You are about to alter the column `ATIVO` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `beneficiario` MODIFY `ATIVO` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `doador` MODIFY `ATIVO` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `ATIVO` BOOLEAN NOT NULL;
