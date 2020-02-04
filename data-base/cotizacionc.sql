/*
SQLyog Community v8.71 
MySQL - 5.5.5-10.4.8-MariaDB : Database - goosoft
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`goosoft` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `goosoft`;

/*Table structure for table `tb_cotizaciones` */

DROP TABLE IF EXISTS `tb_cotizaciones`;

CREATE TABLE `tb_cotizaciones` (
  `id_cotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `credito` int(11) NOT NULL,
  `trm` int(11) NOT NULL,
  `consecutivo` varchar(40) NOT NULL,
  `descuento` int(11) NOT NULL,
  PRIMARY KEY (`id_cotizacion`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cotizaciones` */

LOCK TABLES `tb_cotizaciones` WRITE;

insert  into `tb_cotizaciones`(`id_cotizacion`,`id_planeacion`,`titulo`,`credito`,`trm`,`consecutivo`,`descuento`) values (6,3,'wqidij',0,2999,'0',0),(7,5,'titulo 2',0,5000,'0',0),(8,4,'ewijfijwefij',0,1000,'0',0),(16,7,'cotizacion 10',0,3100,'012',0),(17,8,'cretacios1',0,5000,'1',0);

UNLOCK TABLES;

/*Table structure for table `tb_cotizaciones_costos` */

DROP TABLE IF EXISTS `tb_cotizaciones_costos`;

CREATE TABLE `tb_cotizaciones_costos` (
  `id_cotizacion_costo` int(11) NOT NULL AUTO_INCREMENT,
  `id_cotizacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  PRIMARY KEY (`id_cotizacion_costo`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cotizaciones_costos` */

LOCK TABLES `tb_cotizaciones_costos` WRITE;

insert  into `tb_cotizaciones_costos`(`id_cotizacion_costo`,`id_cotizacion`,`id_planeacion`,`tipo`,`descripcion`,`cantidad`,`id_unidad_medida`,`precio`,`id_moneda`) values (11,16,7,1,'prueba de costo',2,2,2000,2),(12,16,7,2,'prueba de costo 2',3,2,1000,1),(13,17,8,1,'set de ct',2,1,1000,2),(14,17,8,3,'operadores de set de ct',1,1,500,2),(15,17,8,2,'movilizacion de set de ct',1,1,500,2),(18,17,8,2,'esteeee',5,1,3000,1),(19,17,8,1,'set de ctqwe',10,1,2000,1),(20,17,8,2,'lklkl',5,1,20,1),(21,16,7,1,'set de ct',2,1,5000,2);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
