CREATE TABLE IF NOT EXISTS `levels` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    `deleted_at` DATETIME NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `levels` ADD `uuid` CHAR (36) NULL AFTER `id`;

ALTER TABLE `levels` ADD `name` VARCHAR (255) NULL AFTER `uuid`;

ALTER TABLE `levels` ADD `host` VARCHAR (255) NULL AFTER `name`;

ALTER TABLE `levels` ADD `image` VARCHAR (255) NULL AFTER `host`;

CREATE TABLE IF NOT EXISTS `games` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    `deleted_at` DATETIME NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `games` ADD `uuid` CHAR (36) NULL AFTER `id`;

CREATE TABLE IF NOT EXISTS `players` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    `deleted_at` DATETIME NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `players` ADD `uuid` CHAR (36) NULL AFTER `id`;

CREATE TABLE IF NOT EXISTS `scores` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    `deleted_at` DATETIME NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `scores` ADD `uuid` CHAR (36) NULL AFTER `id`;

CREATE TABLE IF NOT EXISTS `clues` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NULL,
    `deleted_at` DATETIME NULL
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `clues` ADD `uuid` CHAR (36) NULL AFTER `id`;
