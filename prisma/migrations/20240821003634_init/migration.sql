-- CreateTable
CREATE TABLE `Suborgan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Suborgan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('student', 'admin') NOT NULL,
    `angkatan` VARCHAR(191) NULL,
    `suborgan_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidates` (
    `id` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `visi` TEXT NOT NULL,
    `misi` TEXT NOT NULL,
    `pengalaman` TEXT NOT NULL,
    `motto` TEXT NOT NULL,
    `progja` TEXT NOT NULL,
    `video_profil` VARCHAR(191) NOT NULL,
    `suborgan_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote_Session` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `openedAt` DATETIME(3) NOT NULL,
    `closedAt` DATETIME(3) NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `max_vote` INTEGER NOT NULL,
    `suborgan_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote_Session_Candidate` (
    `id` VARCHAR(191) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote_Session_Access` (
    `id` VARCHAR(191) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Vote` (
    `id` VARCHAR(191) NOT NULL,
    `vote_session_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_suborgan_id_fkey` FOREIGN KEY (`suborgan_id`) REFERENCES `Suborgan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidates` ADD CONSTRAINT `Candidates_suborgan_id_fkey` FOREIGN KEY (`suborgan_id`) REFERENCES `Suborgan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session` ADD CONSTRAINT `Vote_Session_suborgan_id_fkey` FOREIGN KEY (`suborgan_id`) REFERENCES `Suborgan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session_Candidate` ADD CONSTRAINT `Vote_Session_Candidate_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session_Candidate` ADD CONSTRAINT `Vote_Session_Candidate_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session_Access` ADD CONSTRAINT `Vote_Session_Access_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote_Session_Access` ADD CONSTRAINT `Vote_Session_Access_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Vote` ADD CONSTRAINT `User_Vote_vote_session_id_fkey` FOREIGN KEY (`vote_session_id`) REFERENCES `Vote_Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Vote` ADD CONSTRAINT `User_Vote_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Vote` ADD CONSTRAINT `User_Vote_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `Candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
