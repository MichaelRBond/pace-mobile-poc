CREATE TABLE IF NOT EXISTS `rsvp`(
id INT(11) NOT NULL AUTO_INCREMENT,
communicationId INT(11) NOT NULL,
count INT(11) DEFAULT 0,
PRIMARY KEY (id),
INDEX `communicationId` (`communicationId`)
) engine=InnoDB DEFAULT CHARACTER SET=utf8mb4;
