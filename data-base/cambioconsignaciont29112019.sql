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


/*Table structure for table `tb_consignacion` */

DROP TABLE IF EXISTS `tb_consignacion`;

CREATE TABLE `tb_consignacion` (
  `id_consignacion` INT(44) NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(44) DEFAULT NULL,
  `id_planeacion` varchar(44) DEFAULT NULL,
  `id_personal` varchar(44) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(44) DEFAULT NULL,
  PRIMARY KEY (`id_consignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

/*Data for the table `tb_consignacion` */

LOCK TABLES `tb_consignacion` WRITE;

insert  into `tb_consignacion`(`id_consignacion`,`codigo`,`id_planeacion`,`id_personal`,`fecha`,`estado`) values (78,'loñplqwe67','0','8','2019-11-29 00:00:00','no aprobado'),(79,'jkj','0','6','2019-12-05 00:00:00','no aprobado');

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_consignacion_detalles` */

LOCK TABLES `tb_consignacion_detalles` WRITE;

insert  into `tb_consignacion_detalles`(`id`,`id_item`,`cantidad`,`valor_unitario`,`costo_total_item`,`id_consignacion`) values (5,1,2,200,400,64),(6,2,1,2222,2222,64),(7,1,2,200,400,66),(8,2,0,0,0,66),(9,1,2,200,400,67),(10,2,1,2233,2233,67),(11,3,2,30000,60000,67),(12,1,2,200,400,68),(13,2,98,400,39200,68),(14,3,8,30000,240000,68),(15,1,2,200,400,70),(16,2,1,30000,30000,70),(17,3,2,300003,600006,70),(18,4,1,40000,40000,71),(19,1,2,200,400,71),(20,2,98,9000,882000,71),(21,3,6,30000,180000,71),(22,1,2,200,400,72),(23,2,90,90000,8100000,72),(24,3,9,30000,270000,72),(25,4,9,40000,360000,72),(26,4,12,40000,480000,73),(27,2,90,3000,270000,74),(28,1,2,200,400,74),(29,3,5,30000,150000,74),(30,4,9,40000,360000,74),(31,4,6,40000,240000,75),(32,3,5,30000,150000,75),(33,1,2,20000,40000,75),(34,2,50,500,25000,75),(35,2,100,5000,500000,78),(36,1,2,200000,400000,78),(37,3,5,30000,150000,78),(38,5,10,360000,3600000,78);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
