ALTER TABLE `levels` ADD INDEX `uuid` (`uuid`);

ALTER TABLE `levels` ADD INDEX `name` (`name`);

ALTER TABLE `levels` ADD INDEX `host` (`host`);

ALTER TABLE `levels` ADD INDEX `image` (`image`);

ALTER TABLE `games` ADD INDEX `uuid` (`uuid`);

ALTER TABLE `games` ADD `name` VARCHAR (255) NULL AFTER `uuid`;

ALTER TABLE `players` ADD INDEX `uuid` (`uuid`);

ALTER TABLE `scores` ADD INDEX `uuid` (`uuid`);

ALTER TABLE `clues` ADD INDEX `uuid` (`uuid`);
