/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `projekat_events`;
CREATE DATABASE IF NOT EXISTS `projekat_events` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projekat_events`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(3, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `administrator_event`;
CREATE TABLE IF NOT EXISTS `administrator_event` (
  `administrator_event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `administrator_id` int unsigned NOT NULL DEFAULT '0',
  `event_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_event_id`),
  UNIQUE KEY `uq_administrator_event_event_id_administrator_id` (`administrator_id`,`event_id`),
  KEY `fk_administrator_event_event_id` (`event_id`) /*!80000 INVISIBLE */,
  KEY `fk_administrator_event_administrator_id` (`administrator_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_administrator_event_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`administrator_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_administrator_event_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8;

DELETE FROM `administrator_event`;
/*!40000 ALTER TABLE `administrator_event` DISABLE KEYS */;
INSERT INTO `administrator_event` (`administrator_event_id`, `administrator_id`, `event_id`) VALUES
	(145, 3, 1),
	(135, 3, 3),
	(147, 3, 4);
/*!40000 ALTER TABLE `administrator_event` ENABLE KEYS */;

DROP TABLE IF EXISTS `administrator_token`;
CREATE TABLE IF NOT EXISTS `administrator_token` (
  `administrator_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `administrator_id` int unsigned NOT NULL,
  `token` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`administrator_token_id`),
  KEY `fk_administrator_token_administrator_id_idx` (`administrator_id`),
  CONSTRAINT `fk_administrator_token_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`administrator_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DELETE FROM `administrator_token`;
/*!40000 ALTER TABLE `administrator_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator_token` ENABLE KEYS */;

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_type_id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `Description` text NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `location` varchar(64) NOT NULL,
  `status` enum('Scheduled','In Progress','Closed') NOT NULL DEFAULT 'Scheduled',
  PRIMARY KEY (`event_id`),
  KEY `fk_event_event_type_id_idx` (`event_type_id`),
  CONSTRAINT `fk_event_event_type_id` FOREIGN KEY (`event_type_id`) REFERENCES `event_type` (`event_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

DELETE FROM `event`;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`event_id`, `event_type_id`, `name`, `Description`, `start`, `end`, `location`, `status`) VALUES
	(1, 1, 'Koncert  Rihana', 'Ne propustite lud i nezaboravan provod uz koncert pop zvezde Rihanne text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text ', '2021-02-23 20:00:00', '2021-04-20 21:00:00', 'Istres', 'Scheduled'),
	(2, 4, 'Bear fest Bijeljina', 'Pive, pljeDza, bezze muzike koliko ti volja.. text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  text ', '2021-12-12 00:00:00', '2021-12-20 00:00:00', 'Istres', 'Scheduled'),
	(3, 1, 'Koncert Pero Deformero', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  tetext  text  text', '2021-12-11 23:00:00', '2022-02-01 23:00:00', 'Velika Obarska', 'In Progress'),
	(4, 1, 'Koncert RHCP', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-11 18:00:00', '2022-02-01 23:00:00', 'Velika Obarska', 'In Progress'),
	(5, 3, 'Denver - Miami', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(6, 1, 'Koncert Zaz', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 23:10:00', '2022-02-02 23:45:00', 'Velika Obarska', 'Scheduled'),
	(7, 3, 'Zvezda - Partizan', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(8, 3, 'Orlando - Chikago', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(9, 3, 'Lakers - Detroit', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(10, 1, 'Koncert Baja', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(11, 1, 'Koncert Yu grupa', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled'),
	(12, 1, 'Koncert Partibrejkersi', 'Pive, pljeDza, bezze muzike koliko ti volja..  text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text    text  text  text  text  text  text  text  text  text  text  text  text  ', '2021-12-12 00:00:00', '2022-02-02 00:00:00', 'Velika Obarska', 'Scheduled');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

DROP TABLE IF EXISTS `event_type`;
CREATE TABLE IF NOT EXISTS `event_type` (
  `event_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`event_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

DELETE FROM `event_type`;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` (`event_type_id`, `name`) VALUES
	(1, 'Concerts'),
	(3, 'Basketball matches'),
	(4, 'Beer Fests'),
	(5, 'Moto sets'),
	(6, 'Tennis');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `forename` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `phone_number` varchar(24) NOT NULL,
  `address` varchar(128) NOT NULL DEFAULT ' ',
  `validation` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_username` (`username`),
  UNIQUE KEY `uq_user_phone_nuber` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `forename`, `surname`, `email`, `username`, `password_hash`, `phone_number`, `address`, `validation`) VALUES
	(1, 'Jovann', 'Puhalo', 'jovan.puhalo86@gmail.com', 'jovan.puhalo', 'F37601BBB40B04EF85DB9D6E0779D42C0B2E191B1D45B8E733CAC41E25F50619FF7542C3BB223D3408FC9C28311DB3222EBF7562CE51F6A1ADE5F904D88CB8FD', '065123456', 'Nepoznata adresaa bb, Nedodjija', '1'),
	(2, 'Gaga', 'Puhalo', 'gagagaga@gmail.com', 'gaga.puhalo', 'F37601BBB40B04EF85DB9D6E0779D42C0B2E191B1D45B8E733CAC41E25F50619FF7542C3BB223D3408FC9C28311DB3222EBF7562CE51F6A1ADE5F904D88CB8FD', '065123451', '5 Passage de la ferrage', '0'),
	(3, 'Mika', 'Nikop', 'mika.nikop@gmail.com', 'mika', 'A7FCE35F48A350AE1125A3CA4E0AF6E37316A9ED4555B146B9F663D52C33EDA09A49AA813C9D36C1A617C2453156BB273C93EB68ECE01CA7C38E5F247794104C', '+38765987654', 'Nepoznata adresaa bb, Nedodjija', '0'),
	(4, 'NIko', 'Nikop', 'niko.nikop@gmail.com', 'niko.nikop', '6DB17C08AB03F1042E10BBF3ED0F4D0630FE81A4E6C769110E253F47B366E61F89B14CEF4FB4E68759142030F63AEA62E8A3AB4081EB1B735B1305D2DB5F3199', '+38765987659', 'Nepoznata adresaa bb, Nedodjija', '0'),
	(5, 'Puhalo', 'Jovan', 'ngaga@gmail.com', 'gaga', '9748AE63D43E39BB35E3060FBDE9F34C731D4173F8B579441404BED6F485644335FCA004F512C6602F77549E0AA5E23FEC9A8B3979D61A73B9EB414EE9A27CA6', '+38765987359', '5 Passage de la ferrage , Istres', '0'),
	(6, 'Gaga', 'Popic', 'jocomajstoor@yahoo.com', 'gagogago', '9748AE63D43E39BB35E3060FBDE9F34C731D4173F8B579441404BED6F485644335FCA004F512C6602F77549E0AA5E23FEC9A8B3979D61A73B9EB414EE9A27CA6', '+38765123456', 'Nepoznata adresaa bb, Nedodjija', '0'),
	(7, 'Janko', 'Jankovic', 'jovan-p@hotmail.com', 'mica', '66178D23B68FFF24D16D2ABBE04336E24000F9967FBA135C0E24949754700ABF4B3E32324C31EFC0338C800D63754656F6A61C6880A450E97063670C9138891E', '+38765123455', 'Nepoznata adresaa bb, Nedodjija', '0'),
	(8, 'Mirko', 'Mirkovic', 'asdsad@gmail.com', 'mirkomirko', '66178D23B68FFF24D16D2ABBE04336E24000F9967FBA135C0E24949754700ABF4B3E32324C31EFC0338C800D63754656F6A61C6880A450E97063670C9138891E', '+38765323455', 'Nepoznata adresaa bb, Nedodjija', '0'),
	(9, 'Djoko', 'Puhalo', 'kkk@gmail.com', 'djokodjoko', 'D0D8233D1EF9ED102B527988DCEE0447EC296AD2C522998A1377EF936F8CFA50160AA8202FC51DC1949635654AB4EDDAE1E05DA597D88D4BAF3AD2C8D8568AFA', '+3875444222', ' Nepoznata adresaa bb, Nedodjija', '0'),
	(10, 'mica', 'mica', 'jjj@hormail.com', 'milica', '66178D23B68FFF24D16D2ABBE04336E24000F9967FBA135C0E24949754700ABF4B3E32324C31EFC0338C800D63754656F6A61C6880A450E97063670C9138891E', '+38466655444', '  Nepoznata adresaa bb, Nedodjija', '0'),
	(11, 'Dejan', 'Bozalo', 'oooooo@gmail.com', 'dragana', '9748AE63D43E39BB35E3060FBDE9F34C731D4173F8B579441404BED6F485644335FCA004F512C6602F77549E0AA5E23FEC9A8B3979D61A73B9EB414EE9A27CA6', '+3656588899', '  Nepoznata adresaa bb, Nedodjija', '0'),
	(12, 'Vladan', 'Bartula', 'llllllll@gmail.com', 'vlade', '22B78ADB022C69BAD2AA038D5D3BFF2D5757D0584B1241E484658DA3C1239777636895F5D4638D249C4C699F305FB34227D0975632510FE56B5714C8FD5647C4', '+3658965632', 'NEdodjija bb', '0'),
	(21, 'asdasd', 'asdad', 'kkkasd', 'asd', 'CF83E1357EEFB8BDF1542850D66D8007D620E4050B5715DC83F4A921D36CE9CE47D0D13C5D85F2B0FF8318D2877EEC2F63B931BD47417A81A538327AF927DA3E', 'asd', 'asd', '0'),
	(29, 'asdasd', 'asdasd', 'j.j@j.com', 'asdasd', '1F891ABA7C4425852B52E1EF5FB431717C12D039645B8A76A8F880B6B7AC59D5729E0AF318FDB0253880F37B6AE3CB81E9A09F89410CC06365AD30C9747B448B', '+38765995321', 'asdasd', '0'),
	(30, 'Jankesa', 'Jankesa', 'janko@gmail.com', 'jankesa', '1F891ABA7C4425852B52E1EF5FB431717C12D039645B8A76A8F880B6B7AC59D5729E0AF318FDB0253880F37B6AE3CB81E9A09F89410CC06365AD30C9747B448B', '64453124568345', 'asdasfsdfxc', '0'),
	(31, 'sdsf', 'sdf', 'jo.l@gmail.com', 'safdr3es', '1F891ABA7C4425852B52E1EF5FB431717C12D039645B8A76A8F880B6B7AC59D5729E0AF318FDB0253880F37B6AE3CB81E9A09F89410CC06365AD30C9747B448B', 'sdfsfsdf', 'sdfsdf', '0'),
	(32, 'Nenad', 'Nenadovic', 'o.o@gmail.com', 'jarac', '1F891ABA7C4425852B52E1EF5FB431717C12D039645B8A76A8F880B6B7AC59D5729E0AF318FDB0253880F37B6AE3CB81E9A09F89410CC06365AD30C9747B448B', '+387659987456', 'asdasdsad', '0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

DROP TABLE IF EXISTS `user_events`;
CREATE TABLE IF NOT EXISTS `user_events` (
  `user_event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `event_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_event_id`),
  UNIQUE KEY `uq_user_event_event_id_user_id` (`event_id`,`user_id`),
  KEY `fk_user_event_user_id` (`user_id`) /*!80000 INVISIBLE */,
  KEY `fk_user_event_event_id` (`event_id`),
  CONSTRAINT `fk_user_event_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_event_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=287 DEFAULT CHARSET=utf8;

DELETE FROM `user_events`;
/*!40000 ALTER TABLE `user_events` DISABLE KEYS */;
INSERT INTO `user_events` (`user_event_id`, `user_id`, `event_id`) VALUES
	(239, 1, 1),
	(240, 2, 1),
	(244, 3, 1),
	(245, 4, 1),
	(254, 6, 1),
	(259, 7, 1),
	(264, 8, 1),
	(269, 9, 1),
	(274, 10, 1),
	(279, 11, 1),
	(164, 1, 2),
	(165, 2, 2),
	(167, 3, 2),
	(246, 4, 2),
	(251, 5, 2),
	(255, 6, 2),
	(260, 7, 2),
	(265, 8, 2),
	(270, 9, 2),
	(275, 10, 2),
	(280, 11, 2),
	(199, 1, 3),
	(241, 2, 3),
	(200, 3, 3),
	(247, 4, 3),
	(252, 5, 3),
	(256, 6, 3),
	(261, 7, 3),
	(266, 8, 3),
	(271, 9, 3),
	(276, 10, 3),
	(281, 11, 3),
	(202, 1, 4),
	(242, 2, 4),
	(204, 3, 4),
	(248, 4, 4),
	(284, 5, 4),
	(257, 6, 4),
	(262, 7, 4),
	(267, 8, 4),
	(272, 9, 4),
	(277, 10, 4),
	(282, 11, 4),
	(203, 1, 5),
	(243, 2, 5),
	(205, 3, 5),
	(249, 4, 5),
	(207, 5, 5),
	(258, 6, 5),
	(263, 7, 5),
	(268, 8, 5),
	(273, 9, 5),
	(278, 10, 5),
	(283, 11, 5),
	(285, 5, 7),
	(286, 5, 8);
/*!40000 ALTER TABLE `user_events` ENABLE KEYS */;

DROP TABLE IF EXISTS `user_token`;
CREATE TABLE IF NOT EXISTS `user_token` (
  `user_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valit` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_token_id`),
  KEY `fk_user_token_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DELETE FROM `user_token`;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
