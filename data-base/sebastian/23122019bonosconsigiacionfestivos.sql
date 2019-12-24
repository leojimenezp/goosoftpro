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

/*Table structure for table `tb_consignacion` */

DROP TABLE IF EXISTS `tb_consignacion`;

CREATE TABLE `tb_consignacion` (
  `id_consignacion` int(44) NOT NULL AUTO_INCREMENT,
  `id_planeacion` varchar(44) DEFAULT NULL,
  `id_personal` varchar(44) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(44) DEFAULT NULL,
  `descripcion` varchar(44) DEFAULT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  `pozo` varchar(100) DEFAULT NULL,
  `solicitante` varchar(111) DEFAULT NULL,
  `servicio` varchar(111) DEFAULT NULL,
  `dias` int(111) DEFAULT NULL,
  `trasporte` varchar(111) DEFAULT NULL,
  `cliente` varchar(111) DEFAULT NULL,
  `estado_legalizado` tinyint(4) DEFAULT 0,
  `costo_legalizacion` int(11) DEFAULT 0,
  `costo_cotizacion` int(11) DEFAULT 0,
  `sobrante_legalizacion` int(11) DEFAULT 0,
  `quien_acepta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_consignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `tb_consignacion` */

LOCK TABLES `tb_consignacion` WRITE;

insert  into `tb_consignacion`(`id_consignacion`,`id_planeacion`,`id_personal`,`fecha`,`estado`,`descripcion`,`observaciones`,`pozo`,`solicitante`,`servicio`,`dias`,`trasporte`,`cliente`,`estado_legalizado`,`costo_legalizacion`,`costo_cotizacion`,`sobrante_legalizacion`,`quien_acepta`) values (12,'7','6','2019-11-24 00:00:00','no aprobado',NULL,NULL,'pozo','JOHN','12312',0,'palaca','ECOPETROL',0,0,200400,0,NULL),(13,'7','6','2019-12-17 00:00:00','no aprobado',NULL,NULL,'POZO EL AGUITA','JOHN','servicio',0,'palacaaa','ECOPETROL',0,0,300400,0,NULL),(15,'7','6','2021-12-21 00:00:00','no aprobado',NULL,NULL,'pozo','JOHN','no se nada de estooooooo  pero es els rrvio',6,'ÑPL123','ECOPETROL',0,0,289729,0,NULL),(16,'7','6','2019-12-26 00:00:00','no aprobado',NULL,'listo','12312','JOHN','no se nada de estooooooo  pero es els rrvio',12,'123','123',0,0,400,0,NULL);

UNLOCK TABLES;

/*Table structure for table `tb_consignacion_detalles` */

DROP TABLE IF EXISTS `tb_consignacion_detalles`;

CREATE TABLE `tb_consignacion_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_item` int(100) DEFAULT NULL,
  `cantidad` int(100) DEFAULT NULL,
  `valor_unitario` int(100) DEFAULT NULL,
  `costo_total_item` int(100) DEFAULT NULL,
  `id_consignacion` int(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_consignacion_detalles` */

LOCK TABLES `tb_consignacion_detalles` WRITE;

insert  into `tb_consignacion_detalles`(`id`,`id_item`,`cantidad`,`valor_unitario`,`costo_total_item`,`id_consignacion`) values (25,3,0,0,0,4),(26,1,2,200,400,4),(27,2,4,788888888,2147483647,4),(28,4,0,0,0,4),(29,5,0,0,0,4),(30,6,0,0,0,4),(31,7,0,0,0,4),(32,8,0,0,0,4),(89,3,0,0,0,12),(90,1,2,200,400,12),(91,2,0,0,0,12),(92,4,40,5000,200000,12),(93,5,0,0,0,12),(94,6,0,0,0,12),(95,7,0,0,0,12),(96,8,0,0,0,12),(97,8,0,0,0,13),(98,1,2,200,400,13),(99,2,0,0,0,13),(100,3,1000,300,300000,13),(101,4,0,0,0,13),(102,5,0,0,0,13),(103,6,0,0,0,13),(104,7,0,0,0,13),(113,2,123,2323,285729,15),(114,1,2,2000,4000,15),(115,3,0,0,0,15),(116,4,0,0,0,15),(117,5,0,0,0,15),(118,6,0,0,0,15),(119,7,0,0,0,15),(120,8,0,0,0,15),(121,4,0,0,0,16),(122,2,0,0,0,16),(123,3,0,0,0,16),(124,1,2,200,400,16),(125,6,0,0,0,16),(126,5,0,0,0,16),(127,8,0,0,0,16),(128,7,0,0,0,16);

UNLOCK TABLES;

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

/*Table structure for table `tb_gestion_bonos` */

DROP TABLE IF EXISTS `tb_gestion_bonos`;

CREATE TABLE `tb_gestion_bonos` (
  `id_bonos` int(111) NOT NULL AUTO_INCREMENT,
  `id_personal` int(200) DEFAULT NULL,
  `id_planeacion` int(111) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `centro_de_costo` varchar(111) DEFAULT NULL,
  `dias` int(111) DEFAULT NULL,
  `valor_bono` int(111) DEFAULT NULL,
  `tipo_bono` varchar(111) DEFAULT NULL,
  `valor_bono_total` int(11) DEFAULT NULL,
  `cantidad_festivos` varchar(111) DEFAULT NULL,
  PRIMARY KEY (`id_bonos`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_gestion_bonos` */

LOCK TABLES `tb_gestion_bonos` WRITE;

insert  into `tb_gestion_bonos`(`id_bonos`,`id_personal`,`id_planeacion`,`fecha`,`fecha_inicio`,`fecha_final`,`centro_de_costo`,`dias`,`valor_bono`,`tipo_bono`,`valor_bono_total`,`cantidad_festivos`) values (7,6,7,'2019-12-24','2019-12-24','2019-12-31','123124',7,2000000,'3',14000000,'2'),(12,6,7,'2019-11-02','2019-12-02','2019-11-23','123124',21,40000,'1',10000,'1'),(13,6,7,'2019-10-01','2019-12-01','2019-10-15','123124',14,1000000,'2',20000,'1'),(14,6,7,'2019-09-01','2019-12-01','2019-12-15','123124',14,1000000,'2',15000,'3'),(18,8,0,'2019-12-01','2019-12-01','2019-12-31','q24123',30,NULL,'1',0,'2'),(19,6,0,'2019-12-10','2019-12-10','2019-12-24','puebr444',14,33333333,'3',466666662,NULL),(20,10,0,'2019-12-01','2019-12-01','2019-12-10','q24123',9,30000,'3',270000,NULL),(21,10,0,'2019-12-01','2019-12-01','2019-12-10','puebra 5',9,30000,'3',270000,NULL),(22,6,7,'2019-08-01','2019-12-01','2019-08-15','puebra numero 6',14,0,'3',0,NULL),(23,6,7,'2019-12-01','2019-12-01','2019-12-15','puebra numero 7',14,0,'3',0,NULL),(24,6,7,'2019-12-01','2019-12-01','2019-12-15','puebra numero 8',14,300000,'3',4200000,NULL),(25,8,0,'2020-12-10','2020-12-10','2020-12-22','puebra2222222324123',12,5000000,'3',60000000,NULL),(26,9,0,'2021-02-08','2021-02-08','2021-02-17','20221',9,2000000,'2',18000000,NULL),(27,9,0,'2019-12-01','2019-12-01','2019-12-15','12312',14,3000,'3',42000,NULL),(28,8,0,'2019-12-01','2019-12-01','2019-12-15','peubra numero 5',15,1000000,'1',15000000,NULL),(29,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'0'),(30,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'3');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
