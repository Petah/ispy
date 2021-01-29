ALTER TABLE `levels` ADD INDEX `thumbnail` (`thumbnail`);

ALTER TABLE `levels` ADD `clues` MEDIUMTEXT NULL AFTER `riddle`;
