/*
  Warnings:

  - You are about to drop the `pengalaman_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pengalaman_details` DROP FOREIGN KEY `Pengalaman_Details_candidate_id_fkey`;

-- DropTable
DROP TABLE `pengalaman_details`;

-- CreateTable
CREATE TABLE `Pengalaman` (
    `id` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengalaman` ADD CONSTRAINT `Pengalaman_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
