/*
SQLyog Community v8.71 
MySQL - 5.5.5-10.4.8-MariaDB : Database - guacamaya
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`guacamaya` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `guacamaya`;

/*Table structure for table `tb_festivos` */

DROP TABLE IF EXISTS `tb_festivos`;

CREATE TABLE `tb_festivos` (
  `id_festivo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_festivo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_festivos` */

LOCK TABLES `tb_festivos` WRITE;

insert  into `tb_festivos`(`id_festivo`,`fecha`,`descripcion`) values (4,'2019-12-02','hola ');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
