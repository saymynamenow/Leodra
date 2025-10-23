/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Trade` (
    `id` VARCHAR(191) NOT NULL,
    `rowId` VARCHAR(191) NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `tradeType` VARCHAR(191) NOT NULL,
    `balance` DOUBLE NOT NULL,
    `entryTime` DATETIME(3) NOT NULL,
    `openPrice` DOUBLE NOT NULL,
    `slPrice` DOUBLE NOT NULL,
    `tpPrice` DOUBLE NOT NULL,
    `priceNow` DOUBLE NOT NULL,
    `pendingPips` DOUBLE NOT NULL,
    `slPips` DOUBLE NOT NULL,
    `tpPips` DOUBLE NOT NULL,
    `rrPips` DOUBLE NOT NULL,
    `rrSlPercentage` DOUBLE NOT NULL,
    `rrTpPercentage` DOUBLE NOT NULL,
    `lotSize` DOUBLE NOT NULL,
    `nettSL` DOUBLE NOT NULL,
    `nettTP` DOUBLE NOT NULL,
    `error` BOOLEAN NOT NULL DEFAULT false,
    `assetDecimals` INTEGER NOT NULL,
    `assetPipValue` DOUBLE NOT NULL,
    `assetContract` INTEGER NOT NULL,
    `assetType` VARCHAR(191) NOT NULL,
    `assetCurrency` VARCHAR(191) NOT NULL,
    `assetMinLot` DOUBLE NOT NULL,
    `assetPipsDec` INTEGER NOT NULL,
    `riskPercent` DOUBLE NOT NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
