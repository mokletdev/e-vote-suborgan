-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_suborgan_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `suborgan_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_suborgan_id_fkey` FOREIGN KEY (`suborgan_id`) REFERENCES `Suborgan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
