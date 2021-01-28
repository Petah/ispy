ALTER TABLE `games` ADD INDEX `name` (`name`);

ALTER TABLE `players` ADD `name` VARCHAR (255) NULL AFTER `uuid`;
