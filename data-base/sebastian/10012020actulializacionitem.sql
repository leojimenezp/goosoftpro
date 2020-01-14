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


/*Table structure for table `tb_item` */

DROP TABLE IF EXISTS `tb_item`;

CREATE TABLE `tb_item` (
  `id_item` INT(11) NOT NULL AUTO_INCREMENT,
  `numero_item` TEXT NOT NULL,
  `descripcion_item` TEXT NOT NULL,
  `cantidad_item` TEXT NOT NULL,
  `valor_item` TEXT NOT NULL,
  `bodega_item` TEXT NOT NULL,
  `marca_item` TEXT NOT NULL,
  `categoria_item` INT(1) NOT NULL,
  `estado_item` INT(1) NOT NULL,
  `fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `id_personal` INT(11) NOT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=INNODB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `tb_item` */

LOCK TABLES `tb_item` WRITE;

insert  into `tb_item`(`id_item`,`numero_item`,`descripcion_item`,`cantidad_item`,`valor_item`,`bodega_item`,`marca_item`,`categoria_item`,`estado_item`,`fecha_registro`,`id_personal`) values (1,'1','MANUTENCION','2','200.000','PRINCIPAL','NIKE',7,1,'2020-01-08 08:13:46',0),(2,'2','ALOJAMINETO','0','0','0','0',7,1,'2020-01-08 08:14:05',6),(3,'3','HIDATRACION','0','0','0','0',7,1,'2020-01-08 08:14:13',0),(4,'4','LAVANDERIA','0','0','0','0',7,1,'2020-01-08 08:14:23',0),(5,'5','PASAJES','0','0','0','0',7,1,'2020-01-08 08:14:45',0),(6,'6','TAXIS Y BUSES','0','0','0','0',7,1,'2020-01-08 08:15:56',0),(7,'7','COMBUSTIBLES','0','0','0','0',7,1,'2020-01-08 08:16:04',0),(8,'8','PEAJES','0','0','0','0',7,1,'2020-01-08 08:13:35',0),(9,'9','MANTENIMIENTO','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:25:00',6),(10,'10','OPERACION','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:54',6),(11,'11','QUIMICA','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:49',6),(12,'12','ANTICIPO A TERCEROS','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:42',6),(13,'13','OTROS','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:20:45',6),(14,'14','IMPREVISTO 10%','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:25:35',6);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
