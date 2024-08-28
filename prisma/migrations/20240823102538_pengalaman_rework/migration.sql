/*
  Warnings:

  - You are about to drop the column `pengalaman` on the `candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `candidates` DROP COLUMN `pengalaman`;

-- CreateTable
CREATE TABLE `Pengalaman_Details` (
    `id` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengalaman_Details` ADD CONSTRAINT `Pengalaman_Details_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
