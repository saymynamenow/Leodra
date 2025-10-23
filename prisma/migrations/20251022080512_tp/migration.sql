-- AlterTable
ALTER TABLE `trade` ADD COLUMN `originalNettSL` DOUBLE NULL,
    ADD COLUMN `originalNettTP` DOUBLE NULL,
    ADD COLUMN `originalRrPips` DOUBLE NULL,
    ADD COLUMN `originalTpPips` DOUBLE NULL,
    ADD COLUMN `originalTpPrice` DOUBLE NULL,
    ADD COLUMN `originalrrSlPercentage` DOUBLE NULL,
    ADD COLUMN `originalrrTpPercentage` DOUBLE NULL;
