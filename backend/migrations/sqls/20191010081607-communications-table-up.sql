CREATE TABLE IF NOT EXISTS `communications`(
  id INT(11) NOT NULL AUTO_INCREMENT,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  createdDate INT(11) NOT NULL,
  expirationDate INT(11) NOT NULL,
  startDate INT(11) UNSIGNED DEFAULT NULL,
  endDate INT(11) UNSIGNED DEFAULT NULL,
  urgency INT(1) DEFAULT 0,
  PRIMARY KEY (id),
  INDEX `createdDate` (`createdDate`),
  INDEX `expirationDate` (`expirationDate`),
  INDEX `urgency` (`urgency`)
) engine=InnoDB DEFAULT CHARACTER SET=utf8mb4;
