ALTER TABLE `levels` ADD `riddle` VARCHAR (255) NULL AFTER `image`;

ALTER TABLE `clues` ADD `name` VARCHAR (255) NULL AFTER `uuid`;

ALTER TABLE `clues` ADD `path` MEDIUMTEXT NULL AFTER `name`;
