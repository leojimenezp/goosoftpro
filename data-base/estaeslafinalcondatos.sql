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

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `sessions` */

LOCK TABLES `sessions` WRITE;

insert  into `sessions`(`session_id`,`expires`,`data`) values ('3uxChF1B1Kj_BeiBT5bn9lJbcbf6Vdqo',1580664665,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),('Lj_w9dQckz6lWKNLeF3JOTAbJg2uE_GL',1580583809,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),('WGO1CzN078Uf9qTAw6vJVgm-xLx9pzTW',1580832810,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}');

UNLOCK TABLES;

/*Table structure for table `tb_bases` */

DROP TABLE IF EXISTS `tb_bases`;

CREATE TABLE `tb_bases` (
  `id_base` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_base` text NOT NULL,
  `longitud_base` text NOT NULL,
  `latitud_base` text NOT NULL,
  `estado_base` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_base`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `tb_bases` */

LOCK TABLES `tb_bases` WRITE;

insert  into `tb_bases`(`id_base`,`nombre_base`,`longitud_base`,`latitud_base`,`estado_base`,`fecha_registro`,`id_personal`) values (1,'NEIVA','-75.316669905215460','2.939732122880684',1,'2019-08-04 12:50:31',6),(2,'BOGOTA','-74.072092000000000','4.710988599999999',1,'2019-08-04 12:50:27',6),(3,'VILLAVICENCIO','-73.637690499999960','4.151382200000000',1,'2019-08-04 12:50:24',6),(4,'BUCARAMANGA','-73.122741599999980','7.119349000000000',1,'2019-08-04 12:50:22',6),(5,'PUERTO BOYACA','-74.593394999999990','5.977237000000000',1,'2019-08-04 12:50:19',6),(6,'ENVIGADO','-75.5994392','6.1663544',1,'2019-08-04 12:50:17',6),(7,'MONTERIA','-75.9169897','8.7606317',2,'2019-08-04 12:50:14',6),(8,'BARRANQUILLA','-74.8880586','10.9839725',1,'2019-08-04 12:49:29',6),(9,'FET','-75.29039','2.83643',1,'2019-08-05 15:16:11',6);

UNLOCK TABLES;

/*Table structure for table `tb_bitacora` */

DROP TABLE IF EXISTS `tb_bitacora`;

CREATE TABLE `tb_bitacora` (
  `id_bitacora` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_bitacora` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `antes` mediumtext DEFAULT NULL,
  `despues` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=latin1;

/*Data for the table `tb_bitacora` */

LOCK TABLES `tb_bitacora` WRITE;

insert  into `tb_bitacora`(`id_bitacora`,`descripcion_bitacora`,`id_user`,`fecha_registro`,`antes`,`despues`) values (1,'El usuario john creó una nueva base llamada NEIVA',2,'2019-07-23 04:03:15',NULL,NULL),(2,'El usuario john modificó la base NEIVA',2,'2019-07-23 11:56:02',NULL,NULL),(3,'El usuario john modificó la base NEIVA',2,'2019-07-23 12:10:02',NULL,NULL),(4,'El usuario john modificó la base NEIVA',2,'2019-07-23 14:30:40',NULL,NULL),(5,'El usuario john modificó la base NEIVA',2,'2019-07-23 14:34:17',NULL,NULL),(6,'El usuario john modificó la base NEIVA',2,'2019-07-23 14:34:28',NULL,NULL),(7,'El usuario john creó un cargo nuevo llamado Arquitecto',2,'2019-07-23 14:56:07',NULL,NULL),(8,'El usuario john modificó el cargo Desarrollador de software 0',2,'2019-07-23 15:22:08',NULL,NULL),(9,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 15:22:43',NULL,NULL),(10,'El usuario john creó la unidad de medida MINUTOS',2,'2019-07-23 15:37:30',NULL,NULL),(11,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 15:46:36',NULL,NULL),(12,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 16:20:14',NULL,NULL),(13,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 16:25:11',NULL,NULL),(14,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 16:25:20',NULL,NULL),(15,'El usuario john modificó la base NEIVA',2,'2019-07-23 17:07:21',NULL,NULL),(16,'El usuario john modificó la base NEIVA',2,'2019-07-23 17:07:29',NULL,NULL),(17,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 17:17:56',NULL,NULL),(18,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 17:18:05',NULL,NULL),(19,'El usuario john creó un tipo de pozo nuevo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 14:11:49',NULL,NULL),(20,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO 0',2,'2019-07-24 14:33:36',NULL,NULL),(21,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 14:33:51',NULL,NULL),(22,'El usuario john creó un tipo de contrato nuevo llamado ORDEN DE SERVICIO',2,'2019-07-24 14:59:06',NULL,NULL),(23,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO0',2,'2019-07-24 15:10:25',NULL,NULL),(24,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO',2,'2019-07-24 15:10:38',NULL,NULL),(25,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 15:30:21',NULL,NULL),(26,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION1',2,'2019-07-24 15:51:26',NULL,NULL),(27,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 15:52:05',NULL,NULL),(28,'El usuario john creó una nueva moneda llamda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 16:12:35',NULL,NULL),(29,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO1',2,'2019-07-24 16:21:58',NULL,NULL),(30,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 16:22:21',NULL,NULL),(31,'El usuario john creó un nuevo centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 16:51:21',NULL,NULL),(32,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-24 16:55:28',NULL,NULL),(33,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA 1',2,'2019-07-24 17:00:16',NULL,NULL),(34,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 17:00:52',NULL,NULL),(35,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 17:01:28',NULL,NULL),(36,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 14:45:47',NULL,NULL),(37,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 16:14:52',NULL,NULL),(38,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 16:16:42',NULL,NULL),(39,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 16:17:06',NULL,NULL),(40,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 17:14:31',NULL,NULL),(41,'El usuario john modificó el cliente con No. de documento 1072422473',2,'2019-07-26 17:32:12',NULL,NULL),(42,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 17:33:42',NULL,NULL),(43,'El usuario john modificó el cliente con No. de documento 123456789',2,'2019-07-26 17:34:16',NULL,NULL),(44,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-27 17:01:47',NULL,NULL),(45,'El usuario john creó un cargo nuevo llamado Abogado',2,'2019-07-27 17:11:03',NULL,NULL),(46,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-28 05:44:54',NULL,NULL),(47,'El usuario john modificó el cargo DESARROLLADOR DE SOFTWARE',6,'2019-07-28 06:34:29',NULL,NULL),(48,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 13:03:12',NULL,NULL),(49,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 13:03:41',NULL,NULL),(50,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 15:08:09',NULL,NULL),(51,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 15:58:38',NULL,NULL),(52,'El usuario john creó un contrato nuevo con el ID 1234',6,'2019-07-29 15:50:40',NULL,NULL),(53,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 16:18:39',NULL,NULL),(54,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 16:21:43',NULL,NULL),(55,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 16:21:55',NULL,NULL),(56,'El usuario john creó un contrato nuevo con el ID 123',6,'2019-07-29 16:25:33',NULL,NULL),(57,'El usuario john modificó el contrato con el ID 123',6,'2019-07-29 16:26:16',NULL,NULL),(58,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 14:59:03',NULL,NULL),(59,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 15:36:37',NULL,NULL),(60,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 15:55:14',NULL,NULL),(61,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:06',NULL,NULL),(62,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:14',NULL,NULL),(63,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:22',NULL,NULL),(64,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:29',NULL,NULL),(65,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:35',NULL,NULL),(66,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 15:57:43',NULL,NULL),(67,'El usuario john creó un item nuevo con el ID 123',6,'2019-07-30 16:29:04',NULL,NULL),(68,'El usuario john modificó el item con el ID 123',6,'2019-07-30 16:44:29',NULL,NULL),(69,'El usuario john modificó el item con el ID 123',6,'2019-07-30 16:44:38',NULL,NULL),(70,'El usuario john modificó el item con el ID 123',6,'2019-07-30 16:44:47',NULL,NULL),(71,'El usuario john modificó el campo llamado CAMPO 2',6,'2019-08-01 15:02:31',NULL,NULL),(72,'El usuario john creó un nuevo pozo llamado POZO 1',6,'2019-08-01 15:41:40',NULL,NULL),(73,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 15:58:35',NULL,NULL),(74,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 15:58:44',NULL,NULL),(75,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 1',6,'2019-08-01 16:46:49',NULL,NULL),(76,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 16:47:32',NULL,NULL),(77,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 16:56:31',NULL,NULL),(78,'El usuario john creó una nueva base llamada BOGOTA',6,'2019-08-03 14:02:06',NULL,NULL),(79,'El usuario john creó una nueva base llamada VILLAVICENCIO',6,'2019-08-03 14:02:24',NULL,NULL),(80,'El usuario john creó una nueva base llamada BUCARAMANGA',6,'2019-08-03 14:02:40',NULL,NULL),(81,'El usuario john creó una nueva base llamada PUERTO BOYACA',6,'2019-08-03 14:02:57',NULL,NULL),(82,'El usuario john modificó la base BOGOTA',6,'2019-08-04 11:31:25',NULL,NULL),(83,'El usuario john modificó la base BOGOTA',6,'2019-08-04 11:31:36',NULL,NULL),(84,'El usuario john modificó la base NEIVA',6,'2019-08-04 11:31:49',NULL,NULL),(85,'El usuario john creó una nueva base llamada ENVIGADO',6,'2019-08-04 11:44:56',NULL,NULL),(86,'El usuario john modificó la base NEIVA',6,'2019-08-04 12:00:18',NULL,NULL),(87,'El usuario john modificó la base NEIVA',6,'2019-08-04 12:00:29',NULL,NULL),(88,'El usuario john creó una nueva base llamada MONTERIA',6,'2019-08-04 12:01:32',NULL,NULL),(89,'El usuario john creó una nueva base llamada BARRANQUILLA',6,'2019-08-04 12:49:29',NULL,NULL),(90,'El usuario john modificó el cargo Abogado',6,'2019-08-04 13:13:52',NULL,NULL),(91,'El usuario john creó un cargo nuevo llamado AUXILIAR CONTABLE',6,'2019-08-04 13:20:44',NULL,NULL),(92,'El usuario john modificó el cargo AUXILIAR CONTABLE',6,'2019-08-04 14:00:38',NULL,NULL),(93,'El usuario john modificó el cargo Arquitecto',6,'2019-08-04 14:00:52',NULL,NULL),(94,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 14:10:45',NULL,NULL),(95,'El usuario john modificó el cargo ARQUITECTO',6,'2019-08-04 14:10:58',NULL,NULL),(96,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 14:11:11',NULL,NULL),(97,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 14:38:32',NULL,NULL),(98,'El usuario john creó una nueva base llamada FET',6,'2019-08-05 15:16:11',NULL,NULL),(99,'El usuario john creó un contrato nuevo con el ID 123456789',6,'2019-08-05 16:14:35',NULL,NULL),(100,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-08-05 17:00:46',NULL,NULL),(101,'El usuario john creó un campo nuevo llamado CAMPO 3',6,'2019-08-05 17:04:14',NULL,NULL),(102,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 04:32:51',NULL,NULL),(103,'El usuario john creó un nuevo centro costo llamado PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA',6,'2019-08-07 04:35:28',NULL,NULL),(104,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 04:38:04',NULL,NULL),(105,'El usuario john modificó el item con el ID 123',6,'2019-08-07 05:40:55',NULL,NULL),(106,'El usuario john modificó el item con el ID 123',6,'2019-08-07 05:47:18',NULL,NULL),(107,'El usuario john modificó el item con el ID 123',6,'2019-08-07 06:56:51',NULL,NULL),(108,'El usuario john modificó el item con el ID 123',6,'2019-08-07 06:57:00',NULL,NULL),(109,'El usuario john creó un item nuevo con el ID 10',6,'2019-08-07 06:58:57',NULL,NULL),(110,'El usuario john creó una nueva moneda llamada PESO COLOMBIANO',6,'2019-08-07 09:25:29',NULL,NULL),(111,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',6,'2019-08-07 09:27:18',NULL,NULL),(112,'El usuario john creó un personal nuevo con No. de documento 1072422473',6,'2019-08-07 10:48:58',NULL,NULL),(113,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 16:22:01',NULL,NULL),(114,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 16:22:24',NULL,NULL),(115,'El usuario john modificó el personal con No. de documento 1010',6,'2019-08-09 15:16:28',NULL,NULL),(116,'El usuario john creó un proveedor nuevo con No. de documento 1072422473',6,'2019-08-09 15:38:17',NULL,NULL),(117,'El usuario john creó un proveedor nuevo con No. de documento 123123',6,'2019-08-09 15:42:42',NULL,NULL),(118,'El usuario john creó un proveedor nuevo con No. de documento 332432',6,'2019-08-09 15:47:54',NULL,NULL),(119,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 17:40:06',NULL,NULL),(120,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 17:47:20',NULL,NULL),(121,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-09 18:01:08',NULL,NULL),(122,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 18:08:36',NULL,NULL),(123,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 18:13:58',NULL,NULL),(124,'El usuario john creó un nuevo tipo de trabajo llamado DESARROLLADOR DE SOFTWARE',6,'2019-08-10 12:10:19',NULL,NULL),(125,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 12:17:59',NULL,NULL),(126,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 13:34:18',NULL,NULL),(127,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 13:35:01',NULL,NULL),(128,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 13:39:46',NULL,NULL),(129,'El usuario john modificó el tipo de trabajo llamado TRABAJO 1',6,'2019-08-10 13:40:09',NULL,NULL),(130,'El usuario john creó un tipo de contrato nuevo llamado RENTA MENSUAL',6,'2019-08-10 13:53:06',NULL,NULL),(131,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 13:54:39',NULL,NULL),(132,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 13:55:39',NULL,NULL),(133,'El usuario john creó un tipo de pozo nuevo llamado INYECTOR',6,'2019-08-10 14:20:07',NULL,NULL),(134,'El usuario john modificó el tipo de pozo llamado INYECTOR',6,'2019-08-10 14:22:06',NULL,NULL),(135,'El usuario john creó un nuevo tipo de equipo o herramienta llamado SODA CAUSTICA',6,'2019-08-10 14:53:09',NULL,NULL),(136,'El usuario john creó un nuevo tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 14:54:13',NULL,NULL),(137,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMION DE VACIO',6,'2019-08-10 14:54:45',NULL,NULL),(138,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CHOKE MANIFOLD ',6,'2019-08-10 14:55:19',NULL,NULL),(139,'El usuario john creó un nuevo tipo de equipo o herramienta llamado ACID TRAILER',6,'2019-08-10 14:56:09',NULL,NULL),(140,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMA BAJA',6,'2019-08-10 14:56:44',NULL,NULL),(141,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 16:43:40',NULL,NULL),(142,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 16:44:31',NULL,NULL),(143,'El usuario john modificó el personal con No. de documento 1072422473',6,'2019-08-10 16:57:39',NULL,NULL),(144,'El usuario JOHN creó una nueva unidad de medida llamada KILOVATIOS',6,'2019-08-10 17:55:17',NULL,NULL),(145,'El usuario JOHN modificó la unidad de medida llamada MINUTOS1',6,'2019-08-10 17:58:22',NULL,NULL),(146,'El usuario JOHN modificó la unidad de medida llamada MINUTOS',6,'2019-08-10 17:58:40',NULL,NULL),(147,'El usuario JOHN creó un nuevo equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 05:07:12',NULL,NULL),(148,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 06:40:06',NULL,NULL),(149,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 06:40:21',NULL,NULL),(150,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 06:40:33',NULL,NULL),(151,'El usuario JOHN creó un cargo nuevo llamado CARGO 2',6,'2019-11-05 09:50:47',NULL,NULL),(152,'El usuario JOHN creó un cliente nuevo con No. de documento 63726372',6,'2019-11-05 09:52:07',NULL,NULL),(153,'El usuario JOHN creó un contrato nuevo con el ID 2',6,'2019-11-05 09:53:06',NULL,NULL),(154,'El usuario JOHN creó un campo nuevo llamado CAMPO 3',6,'2019-11-05 09:53:58',NULL,NULL),(155,'El usuario JOHN creó un nuevo centro costo llamado CENTRO COSTO 2',6,'2019-11-05 09:54:50',NULL,NULL),(156,'El usuario JOHN creó un personal nuevo con No. de documento 1075305650',6,'2019-11-05 10:54:28',NULL,NULL),(157,'El usuario JOHN creó un item nuevo con el ID 66',6,'2019-12-02 06:09:51',NULL,NULL),(158,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 08:39:16',NULL,NULL),(159,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 08:39:29',NULL,NULL),(160,'El usuario JOHN creó un item nuevo con el ID 09',6,'2019-12-02 08:52:53',NULL,NULL),(161,'El usuario JOHN creó un item nuevo con el ID 010',6,'2019-12-02 08:53:37',NULL,NULL),(162,'El usuario JOHN creó un item nuevo con el ID 011',6,'2019-12-02 08:54:16',NULL,NULL),(163,'El usuario JOHN creó un item nuevo con el ID 012',6,'2019-12-02 08:54:58',NULL,NULL),(164,'El usuario JOHN creó un item nuevo con el ID 0113',6,'2019-12-02 08:56:00',NULL,NULL),(165,'El usuario JOHN creó un item nuevo con el ID 23',6,'2019-12-04 07:09:44',NULL,NULL),(166,'El usuario JOHN creó un cargo nuevo llamado PROGRAMADOR ',6,'2019-12-19 07:14:10',NULL,NULL),(167,'El usuario JOHN modificó el cargo PROGRAMADOR ',6,'2019-12-19 07:24:55',NULL,NULL),(168,'El usuario JOHN creó un cliente nuevo con No. de documento 1234566123',6,'2019-12-19 07:28:55',NULL,NULL),(169,'El usuario JOHN modificó el cliente con No. de documento 1234566123',6,'2019-12-19 07:29:08',NULL,NULL),(170,'El usuario JOHN modificó el contrato con el ID 2',6,'2019-12-19 07:42:03',NULL,NULL),(171,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 03:10:25',NULL,NULL),(172,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 03:10:41',NULL,NULL),(173,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 03:10:59',NULL,NULL),(174,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 03:11:12',NULL,NULL),(175,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 03:11:24',NULL,NULL),(176,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 03:11:51',NULL,NULL),(177,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 03:12:10',NULL,NULL),(178,'El usuario JOHN modificó el item con el ID 8',6,'2020-01-08 03:13:35',NULL,NULL),(179,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 03:13:46',NULL,NULL),(180,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 03:14:05',NULL,NULL),(181,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 03:14:13',NULL,NULL),(182,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 03:14:23',NULL,NULL),(183,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 03:14:45',NULL,NULL),(184,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 03:15:56',NULL,NULL),(185,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 03:16:04',NULL,NULL),(186,'El usuario JOHN creó un item nuevo con el ID 15',6,'2020-01-08 03:16:59',NULL,NULL),(187,'El usuario JOHN creó un item nuevo con el ID 9',6,'2020-01-08 03:18:56',NULL,NULL),(188,'El usuario JOHN creó un item nuevo con el ID 10',6,'2020-01-08 03:19:26',NULL,NULL),(189,'El usuario JOHN creó un item nuevo con el ID 11',6,'2020-01-08 03:20:03',NULL,NULL),(190,'El usuario JOHN creó un item nuevo con el ID 13',6,'2020-01-08 03:20:45',NULL,NULL),(191,'El usuario JOHN creó un item nuevo con el ID 14',6,'2020-01-08 03:21:22',NULL,NULL),(192,'El usuario JOHN modificó el item con el ID 14',6,'2020-01-08 03:25:36',NULL,NULL),(193,'El usuario JOHN modificó el rubro llamado LOOOOOIUS',6,'2020-01-08 05:17:24',NULL,NULL),(194,'El usuario JOHN modificó el rubro llamado MILIUS',6,'2020-01-08 05:17:33',NULL,NULL),(195,'El usuario JOHN elimino una consigacion sola con consecutivo 19',6,'2020-01-10 04:12:47','{\"consulta1\":{\"id_consignacion\":19,\"id_planeacion\":\"0\",\"id_personal\":\"10\",\"fecha\":\"2020-01-15 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":\"las obesertaciones son estas\",\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRO NARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":15,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":253000,\"sobrante_legalizacion\":0,\"quien_acepta\":6},\"consulta2\":{\"id_consignacion\":19,\"id_planeacion\":\"0\",\"id_personal\":\"10\",\"fecha\":\"2020-01-15 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":\"las obesertaciones son estas\",\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRO NARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":15,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":253000,\"sobrante_legalizacion\":0,\"quien_acepta\":6}}','ya no existe bye '),(196,'El usuario JOHN creó un personal nuevo con No. de documento 2923949231',6,'2020-01-10 05:27:56',NULL,NULL),(197,'El usuario JOHN modifico una consigacion con consecutivo 12',6,'2020-01-10 06:18:39',NULL,NULL),(198,'El usuario JOHN elimino una consigacion sola con consecutivo 20',6,'2020-01-14 15:54:24','{\"consulta1\":{\"id_consignacion\":20,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2020-01-14 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":6,\"trasporte\":\"ÑOLP\",\"cliente\":\"ACUMULDARO\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":1060600,\"sobrante_legalizacion\":0,\"quien_acepta\":9},\"consulta2\":{\"id_consignacion\":20,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2020-01-14 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":6,\"trasporte\":\"ÑOLP\",\"cliente\":\"ACUMULDARO\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":1060600,\"sobrante_legalizacion\":0,\"quien_acepta\":9}}','ya no existe bye '),(199,'El usuario JOHN elimino una consigacion sola con consecutivo 12',6,'2020-01-14 15:54:33','{\"consulta1\":{\"id_consignacion\":12,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2019-11-24 00:00:00\",\"estado\":\"confirmado\",\"descripcion\":\"me gusta\",\"observaciones\":null,\"pozo\":\"pozo\",\"solicitante\":\"JOHN\",\"servicio\":\"12312\",\"dias\":0,\"trasporte\":\"palaca\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":200400,\"sobrante_legalizacion\":0,\"quien_acepta\":6},\"consulta2\":{\"id_consignacion\":12,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2019-11-24 00:00:00\",\"estado\":\"confirmado\",\"descripcion\":\"me gusta\",\"observaciones\":null,\"pozo\":\"pozo\",\"solicitante\":\"JOHN\",\"servicio\":\"12312\",\"dias\":0,\"trasporte\":\"palaca\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":200400,\"sobrante_legalizacion\":0,\"quien_acepta\":6}}','ya no existe bye '),(200,'El usuario JOHN exporto una consigacion de consecutivo 15',6,'2020-01-14 15:55:12',NULL,NULL),(201,'El usuario JOHN modificó el tipo de trabajo llamado DESARROLLADOR DE SOFTWARE',6,'2020-01-14 20:01:08',NULL,NULL),(202,'El usuario JOHN modificó el proveedor con No. de documento 10822156',6,'2020-01-14 20:04:44',NULL,NULL),(203,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-14 20:21:05',NULL,NULL),(204,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-14 20:21:16',NULL,NULL),(205,'El usuario JOHN creó un item nuevo con el ID 1',6,'2020-01-14 20:25:40',NULL,NULL),(206,'El usuario JOHN creó un item nuevo con el ID 1',6,'2020-01-14 20:34:36',NULL,NULL),(207,'El usuario JOHN modificó el contrato con el ID 123',6,'2020-01-14 21:48:18',NULL,NULL),(208,'El usuario JOHN modificó el contrato con el ID 2',6,'2020-01-14 21:48:26',NULL,NULL),(209,'El usuario JOHN elimino un bono con consecutivo 20',6,'2020-01-14 22:03:20',NULL,NULL),(210,'El usuario JOHN agrego un bono',6,'2020-01-14 22:03:45',NULL,NULL),(211,'El usuario JOHN elimino un bono con consecutivo 22',6,'2020-01-14 22:04:51',NULL,NULL),(212,'El usuario JOHN creó un item nuevo con el ID 1',6,'2020-01-14 22:07:28',NULL,NULL),(213,'El usuario JOHN creó un item nuevo con el ID 2',6,'2020-01-14 22:07:51',NULL,NULL),(214,'El usuario JOHN creo una consigacion con consecutivo 21',6,'2020-01-14 22:08:26',NULL,NULL),(215,'El usuario JOHN modifico una consigacion con consecutivo 21',6,'2020-01-14 22:09:11',NULL,NULL),(216,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-14 22:09:22',NULL,NULL),(217,'El usuario JOHN creó un tipo de contrato nuevo llamado MODELO',6,'2020-01-15 09:35:10',NULL,NULL),(218,'El usuario JOHN creó un tipo de contrato nuevo llamado LALALLA',6,'2020-01-15 09:36:24',NULL,NULL),(219,'El usuario JOHN creó un tipo de contrato nuevo llamado SSSSSSS',6,'2020-01-15 09:39:12',NULL,NULL),(220,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-15 10:01:48',NULL,NULL),(221,'El usuario JOHN edito un bono con consecutivo 4',6,'2020-01-15 10:19:09',NULL,NULL),(222,'El usuario JOHN modificó el personal con No. de documento 1072422473',6,'2020-01-15 16:42:52',NULL,NULL),(223,'El usuario JOHN modificó el personal con No. de documento 1072422473',6,'2020-01-15 16:44:35',NULL,NULL),(224,'El usuario JOHN agrego un bono',6,'2020-01-16 11:08:04',NULL,NULL),(225,'El usuario JOHN agrego un bono',6,'2020-01-16 11:10:28',NULL,NULL),(226,'El usuario JOHN agrego un bono',6,'2020-01-16 11:10:47',NULL,NULL),(227,'El usuario JOHN agrego un bono',6,'2020-01-16 11:12:18',NULL,NULL),(228,'El usuario JOHN agrego un bono',6,'2020-01-16 11:14:22',NULL,NULL),(229,'El usuario JOHN agrego un bono',6,'2020-01-16 11:17:33',NULL,NULL),(230,'El usuario JOHN agrego un bono',6,'2020-01-16 11:18:02',NULL,NULL),(231,'El usuario JOHN agrego un bono',6,'2020-01-16 11:19:23',NULL,NULL),(232,'El usuario JOHN agrego un bono',6,'2020-01-16 11:20:02',NULL,NULL),(233,'El usuario JOHN agrego un bono',6,'2020-01-16 11:21:22',NULL,NULL),(234,'El usuario JOHN agrego un bono',6,'2020-01-16 11:26:56',NULL,NULL),(235,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-18 10:21:46',NULL,NULL),(236,'El usuario JOHN creó un personal nuevo con No. de documento 123124123',6,'2020-01-18 11:50:02',NULL,NULL),(237,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 13:58:08',NULL,NULL),(238,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 15:04:22',NULL,NULL),(239,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 15:08:38',NULL,NULL),(240,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 15:18:44',NULL,NULL),(241,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 15:35:33',NULL,NULL),(242,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:14:50',NULL,NULL),(243,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:15:06',NULL,NULL),(244,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:17:21',NULL,NULL),(245,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:20:28',NULL,NULL),(246,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:21:41',NULL,NULL),(247,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:23:38',NULL,NULL),(248,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:26:27',NULL,NULL),(249,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:27:31',NULL,NULL),(250,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:47:51',NULL,NULL),(251,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:52:17',NULL,NULL),(252,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:53:05',NULL,NULL),(253,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:53:22',NULL,NULL),(254,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:53:37',NULL,NULL),(255,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:55:00',NULL,NULL),(256,'El usuario JOHN modificó el personal con No. de documento 123124123',6,'2020-01-18 17:56:07',NULL,NULL),(257,'El usuario JOHN creó un personal nuevo con No. de documento 1',6,'2020-01-18 23:11:32',NULL,NULL),(258,'El usuario JOHN creó un personal nuevo con No. de documento 12304123123',6,'2020-01-18 23:17:23',NULL,NULL),(259,'El usuario JOHN modificó el personal con No. de documento 12304123123',6,'2020-01-18 23:26:00',NULL,NULL),(260,'El usuario JOHN modificó el personal con No. de documento 1010',6,'2020-01-18 23:28:49',NULL,NULL),(261,'El usuario JOHN modificó el personal con No. de documento 1010',6,'2020-01-18 23:30:31',NULL,NULL),(262,'El usuario JOHN modificó el personal con No. de documento 1010',6,'2020-01-18 23:34:44',NULL,NULL),(263,'El usuario JOHN modificó el personal con No. de documento 12304123123',6,'2020-01-18 23:35:53',NULL,NULL),(264,'El usuario JOHN modificó el personal con No. de documento 1010',6,'2020-01-18 23:36:33',NULL,NULL),(265,'El usuario JOHN modificó el personal con No. de documento 2923949231',6,'2020-01-20 08:27:24',NULL,NULL),(266,'El usuario JOHN elimino una consigacion sola con consecutivo 15',6,'2020-01-20 08:38:17','{\"consulta1\":{\"id_consignacion\":15,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2021-12-21\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"pozo\",\"solicitante\":\"JOHN\",\"servicio\":\"no se nada de estooooooo  pero es els rrvio\",\"dias\":6,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":289729,\"sobrante_legalizacion\":0,\"quien_acepta\":6},\"consulta2\":{\"id_consignacion\":15,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2021-12-21\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"pozo\",\"solicitante\":\"JOHN\",\"servicio\":\"no se nada de estooooooo  pero es els rrvio\",\"dias\":6,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":289729,\"sobrante_legalizacion\":0,\"quien_acepta\":6}}','ya no existe bye '),(267,'El usuario JOHN elimino una consigacion sola con consecutivo 15',6,'2020-01-20 08:38:27','{}','ya no existe bye '),(268,'El usuario JOHN elimino una consigacion sola con consecutivo 15',6,'2020-01-20 08:39:14','{}','ya no existe bye '),(269,'El usuario JOHN creo una consigacion con consecutivo 22',6,'2020-01-20 08:40:25',NULL,NULL),(270,'El usuario JOHN elimino una consigacion sola con consecutivo 22',6,'2020-01-20 08:40:41','{\"consulta1\":{\"id_consignacion\":22,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2020-01-01\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"12312\",\"cliente\":\"1312312\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":77,\"sobrante_legalizacion\":0,\"quien_acepta\":8},\"consulta2\":{\"id_consignacion\":22,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"2020-01-01\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"12312\",\"cliente\":\"1312312\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":77,\"sobrante_legalizacion\":0,\"quien_acepta\":8}}','ya no existe bye '),(271,'El usuario JOHN creó un item nuevo con el ID 29',6,'2020-01-20 08:45:29',NULL,NULL),(272,'El usuario JOHN creo una consigacion con consecutivo 23',6,'2020-01-20 08:49:02',NULL,NULL),(273,'El usuario JOHN elimino una consigacion sola con consecutivo 23',6,'2020-01-20 08:49:08','{\"consulta1\":{\"id_consignacion\":23,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"0000-00-00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"\",\"dias\":0,\"trasporte\":\"\",\"cliente\":\"\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":1300,\"sobrante_legalizacion\":0,\"quien_acepta\":8},\"consulta2\":{\"id_consignacion\":23,\"id_planeacion\":\"7\",\"id_personal\":\"6\",\"fecha\":\"0000-00-00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"\",\"dias\":0,\"trasporte\":\"\",\"cliente\":\"\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":1300,\"sobrante_legalizacion\":0,\"quien_acepta\":8}}','ya no existe bye '),(274,'El usuario JOHN modificó el personal con No. de documento 1082215681',6,'2020-01-20 10:04:07',NULL,NULL),(275,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 10:24:06',NULL,NULL),(276,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 10:24:56',NULL,NULL),(277,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 10:25:54',NULL,NULL),(278,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 10:49:46',NULL,NULL),(279,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 11:14:16',NULL,NULL),(280,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 11:16:19',NULL,NULL),(281,'El usuario JOHN exporto una consigacion de consecutivo 21',6,'2020-01-20 11:23:03',NULL,NULL),(282,'El usuario JOHN creó un personal nuevo con No. de documento 1038239421',6,'2020-01-24 10:33:35',NULL,NULL),(283,'El usuario JOHN creó un nuevo pozo llamado CRETACIOS1',6,'2020-01-24 10:37:00',NULL,NULL),(284,'El usuario JOHN creó un cargo nuevo llamado ALIMENTOS',6,'2020-01-25 12:57:19',NULL,NULL),(285,'El usuario JOHN creó un rubro nuevo llamado MANUTENCION',6,'2020-01-28 12:29:50',NULL,NULL),(286,'El usuario JOHN creó un rubro nuevo llamado ALOJAMIENTO',6,'2020-01-28 12:30:03',NULL,NULL),(287,'El usuario JOHN creó un rubro nuevo llamado HIDRATACION',6,'2020-01-28 12:30:37',NULL,NULL),(288,'El usuario JOHN creó un rubro nuevo llamado LAVANDERIA',6,'2020-01-28 12:30:47',NULL,NULL),(289,'El usuario JOHN creó un rubro nuevo llamado PASAJES',6,'2020-01-28 12:31:04',NULL,NULL),(290,'El usuario JOHN creó un rubro nuevo llamado TAXIS Y BUSES',6,'2020-01-28 12:31:17',NULL,NULL),(291,'El usuario JOHN creó un rubro nuevo llamado COMBUSTIBLES',6,'2020-01-28 12:31:33',NULL,NULL),(292,'El usuario JOHN creó un rubro nuevo llamado PEAJES',6,'2020-01-28 12:31:48',NULL,NULL),(293,'El usuario JOHN creó un rubro nuevo llamado MANTENIMIENTO',6,'2020-01-28 12:32:21',NULL,NULL),(294,'El usuario JOHN creó un rubro nuevo llamado OPERACION',6,'2020-01-28 12:32:30',NULL,NULL),(295,'El usuario JOHN creó un rubro nuevo llamado QUIMICA',6,'2020-01-28 12:32:42',NULL,NULL),(296,'El usuario JOHN creó un rubro nuevo llamado ANTICIPO A TERCEROS',6,'2020-01-28 12:34:19',NULL,NULL),(297,'El usuario JOHN creó un rubro nuevo llamado OTROS',6,'2020-01-28 12:34:50',NULL,NULL),(298,'El usuario JOHN creó un rubro nuevo llamado IMPREVISTOS 10%',6,'2020-01-28 12:35:14',NULL,NULL),(299,'El usuario JOHN creo una consigacion con consecutivo 24',6,'2020-01-28 16:00:14',NULL,NULL),(300,'El usuario JOHN creo una consigacion con consecutivo 25',6,'2020-01-28 16:12:15',NULL,NULL),(301,'El usuario JOHN elimino una consigacion sola con consecutivo 24',6,'2020-01-28 16:15:18','{\"consulta1\":{\"id_consignacion\":24,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"0000-00-00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"\",\"dias\":0,\"trasporte\":\"\",\"cliente\":\"\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":0,\"sobrante_legalizacion\":0,\"quien_acepta\":8},\"consulta2\":{\"id_consignacion\":24,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"0000-00-00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"\",\"dias\":0,\"trasporte\":\"\",\"cliente\":\"\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":0,\"sobrante_legalizacion\":0,\"quien_acepta\":8}}','ya no existe bye '),(302,'El usuario JOHN exporto una consigacion de consecutivo 25',6,'2020-01-28 16:15:49',NULL,NULL),(303,'El usuario JOHN elimino una consigacion sola con consecutivo 25',6,'2020-01-28 16:16:19','{\"consulta1\":{\"id_consignacion\":25,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"2020-01-01\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"12312\",\"cliente\":\"maria\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":49000,\"sobrante_legalizacion\":0,\"quien_acepta\":9},\"consulta2\":{\"id_consignacion\":25,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"2020-01-01\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"12312\",\"cliente\":\"maria\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":49000,\"sobrante_legalizacion\":0,\"quien_acepta\":9}}','ya no existe bye '),(304,'El usuario JOHN creo una consigacion con consecutivo 26',6,'2020-01-28 16:19:11',NULL,NULL),(305,'El usuario JOHN elimino una consigacion sola con consecutivo 26',6,'2020-01-28 16:20:16','{\"consulta1\":{\"id_consignacion\":26,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"2020-01-09\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"asd\",\"cliente\":\"leo\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":669633,\"sobrante_legalizacion\":0,\"quien_acepta\":8},\"consulta2\":{\"id_consignacion\":26,\"id_planeacion\":\"7\",\"id_personal\":\"9\",\"fecha\":\"2020-01-09\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":null,\"pozo\":\"123123\",\"solicitante\":\"JOHN JAIRONARVAEZ TAMAYO\",\"servicio\":\"123\",\"dias\":12312,\"trasporte\":\"asd\",\"cliente\":\"leo\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":669633,\"sobrante_legalizacion\":0,\"quien_acepta\":8}}','ya no existe bye '),(306,'El usuario JOHN creo una consigacion con consecutivo 27',6,'2020-01-28 16:21:25',NULL,NULL),(307,'El usuario JOHN exporto una consigacion de consecutivo 27',6,'2020-01-28 16:29:10',NULL,NULL),(308,'El usuario JOHN exporto una consigacion de consecutivo 27',6,'2020-01-28 16:30:10',NULL,NULL),(309,'El usuario JOHN exporto una consigacion de consecutivo 27',6,'2020-01-28 16:30:15',NULL,NULL),(310,'El usuario JOHN exporto una consigacion de consecutivo 27',6,'2020-01-28 16:30:38',NULL,NULL),(311,'El usuario JOHN exporto una consigacion de consecutivo 27',6,'2020-01-28 16:31:10',NULL,NULL),(312,'El usuario JOHN creo una consigacion con consecutivo 28',6,'2020-01-28 16:39:09',NULL,NULL),(313,'El usuario JOHN exporto una consigacion de consecutivo 28',6,'2020-01-28 16:40:27',NULL,NULL),(314,'El usuario JOHN creo una consigacion con consecutivo 29',6,'2020-01-28 16:42:34',NULL,NULL),(315,'El usuario JOHN creo una consigacion con consecutivo 30',6,'2020-01-28 16:42:34',NULL,NULL),(316,'El usuario JOHN creo una consigacion con consecutivo 31',6,'2020-01-28 16:47:25',NULL,NULL),(317,'El usuario JOHN creo una consigacion con consecutivo 32',6,'2020-01-28 16:48:03',NULL,NULL),(318,'El usuario JOHN creo una consigacion con consecutivo 33',6,'2020-01-28 16:48:19',NULL,NULL),(319,'El usuario JOHN creo una consigacion con consecutivo 34',6,'2020-01-28 16:48:43',NULL,NULL),(320,'El usuario JOHN creo una consigacion con consecutivo 1',6,'2020-01-28 16:52:10',NULL,NULL),(321,'El usuario JOHN exporto una consigacion de consecutivo 1',6,'2020-01-28 16:52:29',NULL,NULL),(322,'El usuario JOHN modifico una consigacion con consecutivo 1',6,'2020-01-28 16:59:15',NULL,NULL),(323,'El usuario JOHN exporto una consigacion de consecutivo 1',6,'2020-01-29 08:48:50',NULL,NULL);

UNLOCK TABLES;

/*Table structure for table `tb_campos` */

DROP TABLE IF EXISTS `tb_campos`;

CREATE TABLE `tb_campos` (
  `id_campo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_campo` text NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `departamento_campo` text NOT NULL,
  `municipio_campo` text NOT NULL,
  `ubicacion_campo` text NOT NULL,
  `longitud_campo` text NOT NULL,
  `latitud_campo` text NOT NULL,
  `estado_campo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_campo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_campos` */

LOCK TABLES `tb_campos` WRITE;

insert  into `tb_campos`(`id_campo`,`nombre_campo`,`id_cliente`,`departamento_campo`,`municipio_campo`,`ubicacion_campo`,`longitud_campo`,`latitud_campo`,`estado_campo`,`fecha_registro`,`id_personal`) values (1,'CAMPO 1',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',2,'2019-08-05 17:00:46',0),(2,'CAMPO 2',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',1,'2019-08-01 15:02:31',0),(3,'CAMPO 3',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',2,'2019-08-05 17:04:14',6);

UNLOCK TABLES;

/*Table structure for table `tb_cargos` */

DROP TABLE IF EXISTS `tb_cargos`;

CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` text NOT NULL,
  `estado_cargo` int(1) NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp(),
  `id_personal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cargos` */

LOCK TABLES `tb_cargos` WRITE;

insert  into `tb_cargos`(`id_cargo`,`nombre_cargo`,`estado_cargo`,`fecha_registro`,`id_personal`) values (1,'DESARROLLADOR DE SOFTWARE',1,'2019-08-04',NULL),(2,'ARQUITECTO',1,'2019-08-04',NULL),(3,'ABOGADO',1,'2019-08-04',NULL),(4,'AUXILIAR CONTABLE',2,'2019-08-04',NULL),(5,'CARGO 2',1,'2019-11-05',NULL),(6,'ALIMENTOS',1,'2020-01-25','6');

UNLOCK TABLES;

/*Table structure for table `tb_centro_costos` */

DROP TABLE IF EXISTS `tb_centro_costos`;

CREATE TABLE `tb_centro_costos` (
  `id_centro_costo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_centro_costo` longtext NOT NULL,
  `abreviatura_centro_costo` varchar(10) NOT NULL,
  `estado_centro_costo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_centro_costo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_centro_costos` */

LOCK TABLES `tb_centro_costos` WRITE;

insert  into `tb_centro_costos`(`id_centro_costo`,`nombre_centro_costo`,`abreviatura_centro_costo`,`estado_centro_costo`,`fecha_registro`,`id_personal`) values (1,'TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA','TPC',1,'2019-08-07 04:38:03',0),(2,'PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA','PES',2,'2019-08-07 04:35:28',6),(3,'CENTRO COSTO 2','C.C.2',1,'2019-11-05 09:54:50',6);

UNLOCK TABLES;

/*Table structure for table `tb_clientes` */

DROP TABLE IF EXISTS `tb_clientes`;

CREATE TABLE `tb_clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_documento_cliente` text NOT NULL,
  `numero_documento_cliente` text NOT NULL,
  `regimen_cliente` text NOT NULL,
  `direccion_cliente` text NOT NULL,
  `razon_social_cliente` text NOT NULL,
  `email_cliente` text NOT NULL,
  `telefono_cliente` text NOT NULL,
  `extension_cliente` text NOT NULL,
  `contacto_cliente` text NOT NULL,
  `telefono_contacto_cliente` text NOT NULL,
  `extension_contacto_cliente` text NOT NULL,
  `pais_cliente` text NOT NULL,
  `departamento_cliente` text NOT NULL,
  `ciudad_cliente` text NOT NULL,
  `estado_cliente` int(1) NOT NULL,
  `actividad_economica_cliente` text NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_clientes` */

LOCK TABLES `tb_clientes` WRITE;

insert  into `tb_clientes`(`id_cliente`,`tipo_documento_cliente`,`numero_documento_cliente`,`regimen_cliente`,`direccion_cliente`,`razon_social_cliente`,`email_cliente`,`telefono_cliente`,`extension_cliente`,`contacto_cliente`,`telefono_contacto_cliente`,`extension_contacto_cliente`,`pais_cliente`,`departamento_cliente`,`ciudad_cliente`,`estado_cliente`,`actividad_economica_cliente`,`fecha_registro`,`id_personal`) values (1,'PASAPORTE','123456789','Simplificado','BOGOTA','MASTER PAYS','INFO@DATIFI.COM','3507518916','12','LEONARDO JIMENEZ','3115364067','90','COLOMBIA','HUILA','NEIVA',1,'                                                  HELLO WORD\r\n                                              ','2019-07-26 17:34:16',0),(2,'PASAPORTE','63726372','Común','calle 8 #48-400','RAZON SOCIAL 2','correo@gmail.com','31532328392','57','hola','28372838','57','Colombia','Huila','Neiva',1,'wefwefhweufh','2019-11-05 09:52:07',0);

UNLOCK TABLES;

/*Table structure for table `tb_consignacion` */

DROP TABLE IF EXISTS `tb_consignacion`;

CREATE TABLE `tb_consignacion` (
  `id_consignacion` int(44) NOT NULL AUTO_INCREMENT,
  `id_planeacion` varchar(44) DEFAULT NULL,
  `id_personal` varchar(44) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_consignacion` */

LOCK TABLES `tb_consignacion` WRITE;

insert  into `tb_consignacion`(`id_consignacion`,`id_planeacion`,`id_personal`,`fecha`,`estado`,`descripcion`,`observaciones`,`pozo`,`solicitante`,`servicio`,`dias`,`trasporte`,`cliente`,`estado_legalizado`,`costo_legalizacion`,`costo_cotizacion`,`sobrante_legalizacion`,`quien_acepta`) values (1,'0','10','2020-01-01','no aprobado',NULL,'esto lo estoy probando jijijijijiji uyyyyy que chimbaa que viva el perico','lasdo','JOHN JAIRO NARVAEZ TAMAYO','laso',0,'asd','maria',0,0,369990000,0,8);

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_consignacion_detalles` */

LOCK TABLES `tb_consignacion_detalles` WRITE;

insert  into `tb_consignacion_detalles`(`id`,`id_item`,`cantidad`,`valor_unitario`,`costo_total_item`,`id_consignacion`) values (1,6,0,0,0,1),(2,5,0,0,0,1),(3,15,0,0,0,1),(4,16,0,0,0,1),(5,7,0,0,0,1),(6,8,0,0,0,1),(7,9,0,0,0,1),(8,10,0,0,0,1),(9,12,0,0,0,1),(10,13,0,0,0,1),(11,11,0,0,0,1),(12,14,30000,12333,369990000,1),(13,17,0,0,0,1),(14,18,0,0,0,1);

UNLOCK TABLES;

/*Table structure for table `tb_consignacion_estados` */

DROP TABLE IF EXISTS `tb_consignacion_estados`;

CREATE TABLE `tb_consignacion_estados` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_consignacion_estados` */

LOCK TABLES `tb_consignacion_estados` WRITE;

insert  into `tb_consignacion_estados`(`id_estado`,`estado`) values (1,'pendiente'),(2,'procesando'),(3,'confirmado'),(4,'pagado');

UNLOCK TABLES;

/*Table structure for table `tb_contratos` */

DROP TABLE IF EXISTS `tb_contratos`;

CREATE TABLE `tb_contratos` (
  `id_contrato` int(11) NOT NULL AUTO_INCREMENT,
  `numero_contrato` text NOT NULL,
  `descripcion_contrato` text NOT NULL,
  `fecha_inicio_contrato` text NOT NULL,
  `fecha_fin_contrato` text NOT NULL,
  `bolsa_contrato` text NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `id_tipo_contrato` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `estado_contrato` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_contrato`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_contratos` */

LOCK TABLES `tb_contratos` WRITE;

insert  into `tb_contratos`(`id_contrato`,`numero_contrato`,`descripcion_contrato`,`fecha_inicio_contrato`,`fecha_fin_contrato`,`bolsa_contrato`,`id_moneda`,`id_tipo_contrato`,`id_cliente`,`estado_contrato`,`fecha_registro`,`id_personal`) values (1,'123','CONTRATO 1','2019-07-29','2019-07-30','3333333',1,1,1,2,'2020-01-14 21:48:18',0),(2,'123456789','CONTRATO 1','2019-08-05','2019-08-13','BOLSA DE PRUEBA',1,1,1,2,'2019-08-05 16:14:35',6),(3,'2','CONTRATO 2','2019-11-20','2019-12-07','3333333',1,1,1,1,'2020-01-14 21:48:26',6);

UNLOCK TABLES;

/*Table structure for table `tb_costos_fijos` */

DROP TABLE IF EXISTS `tb_costos_fijos`;

CREATE TABLE `tb_costos_fijos` (
  `id_costo_fijo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_costo_fijo` text NOT NULL,
  `cantidad_costo_fijo` text NOT NULL,
  `precio_costo_fijo` text NOT NULL,
  `total_costo_fijo` text NOT NULL,
  `estado_costo_fijo` int(11) NOT NULL,
  `id_cargo` int(11) DEFAULT NULL,
  `id_contrato` int(11) DEFAULT NULL,
  `id_personal` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_costo_fijo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_costos_fijos` */

LOCK TABLES `tb_costos_fijos` WRITE;

insert  into `tb_costos_fijos`(`id_costo_fijo`,`descripcion_costo_fijo`,`cantidad_costo_fijo`,`precio_costo_fijo`,`total_costo_fijo`,`estado_costo_fijo`,`id_cargo`,`id_contrato`,`id_personal`,`fecha_registro`) values (1,'ENERGÍA','0','0','0',1,4,NULL,6,'2019-08-05 16:07:57');

UNLOCK TABLES;

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

/*Table structure for table `tb_equipo_item_combustible` */

DROP TABLE IF EXISTS `tb_equipo_item_combustible`;

CREATE TABLE `tb_equipo_item_combustible` (
  `id_equipo_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_combustible`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_combustible` */

LOCK TABLES `tb_equipo_item_combustible` WRITE;

insert  into `tb_equipo_item_combustible`(`id_equipo_item_combustible`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`id_moneda`,`cantidad`,`costo_unitario`,`medio_pago`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`,`id_mov_item_personal`,`id_mov_item_vehiculo`,`id_equipo_item_personal`,`id_equipo_item_equipo_herramienta`,`confirmar`) values (67,7,2,1,2,0,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(70,7,2,3,1,2,20,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,1),(71,7,1,3,1,0,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(72,7,4,1,1,0,2,4000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(73,7,2,13,1,0,10,5000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(74,7,3,5,1,0,343,123,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(75,7,3,7,1,0,21,12122112,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(76,7,3,12,1,0,123,2222,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(77,7,12,12,1,0,123,213,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(78,0,14,16,1,0,123,412312,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(79,7,9,5,1,0,5,12312,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(80,7,12,5,1,0,565,4555,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(81,7,2,5,1,0,123,123,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(82,7,3,5,1,0,455,123,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(83,7,3,5,1,0,1312,12312,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(84,7,5,5,1,0,3,544,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(85,7,5,5,1,0,30,4000,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(86,7,2,5,1,0,123,123123,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(87,7,4,5,1,0,123,123123,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(88,7,4,5,1,0,3434,2323,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(89,7,4,5,1,0,3434,3434,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(90,7,3,5,1,0,2332,12323,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(91,7,3,5,1,0,5,4000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(92,7,3,5,1,0,5,3000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(93,7,5,5,1,0,30,10000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(94,7,4,5,1,0,400,2000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0);

UNLOCK TABLES;

/*Table structure for table `tb_equipo_item_equipo_herramienta` */

DROP TABLE IF EXISTS `tb_equipo_item_equipo_herramienta`;

CREATE TABLE `tb_equipo_item_equipo_herramienta` (
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_equipo_herramienta` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_equipo_herramienta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` varchar(10) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_equipo_herramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_equipo_herramienta` */

LOCK TABLES `tb_equipo_item_equipo_herramienta` WRITE;

insert  into `tb_equipo_item_equipo_herramienta`(`id_equipo_item_equipo_herramienta`,`id_planeacion`,`id_tipo_equipo_herramienta`,`vehiculo`,`carga`,`id_equipo_herramienta`,`cantidad`,`id_unidad_medida`,`id_rubro`,`id_moneda`,`medio_pago`,`costo_unitario`,`observaciones`,`id_mov_item_vehiculo`,`gasto_unitario`,`gasto_standby_unitario`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`) values (4,7,0,1,1,1,20,1,13,2,'2',0,'puebra 1 desde movilizacion',1,500,5000,'2020-01-02','2020-01-01','2020-01-07','2020-01-23','2020-01-01','2020-01-02'),(5,7,0,1,1,0,0,1,8,2,'2',0,'weqeqw',0,10000,2222,'2020-01-01','2020-01-01','2020-01-07','0000-00-00','2020-01-08','2020-01-15'),(6,7,0,1,1,0,0,1,5,2,'2',0,'123123',0,12312,3000,'2020-01-03','2020-01-01','2020-01-07','0000-00-00','2020-01-01','2020-01-15');

UNLOCK TABLES;

/*Table structure for table `tb_equipo_item_imprevistos` */

DROP TABLE IF EXISTS `tb_equipo_item_imprevistos`;

CREATE TABLE `tb_equipo_item_imprevistos` (
  `id_equipo_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `fecha_imprevisto` datetime NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_mov_item_imprevisto` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_imprevisto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_imprevistos` */

LOCK TABLES `tb_equipo_item_imprevistos` WRITE;

insert  into `tb_equipo_item_imprevistos`(`id_equipo_item_imprevisto`,`id_planeacion`,`descripcion`,`id_moneda`,`fecha_imprevisto`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`,`id_mov_item_imprevisto`) values (5,7,'descripcion de lo imprevisto',2,'2019-11-29 00:00:00',2,2,2,2000,2,26),(6,7,'prueba de algo',2,'2019-11-30 00:00:00',1,2,2,2000,2,27),(7,7,'prueba de imprevisto 2828',2,'2019-11-28 00:00:00',1,2,4,4000,1,0);

UNLOCK TABLES;

/*Table structure for table `tb_equipo_item_personal` */

DROP TABLE IF EXISTS `tb_equipo_item_personal`;

CREATE TABLE `tb_equipo_item_personal` (
  `id_equipo_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `id_tipo_asignacion` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_personal` */

LOCK TABLES `tb_equipo_item_personal` WRITE;

insert  into `tb_equipo_item_personal`(`id_equipo_item_personal`,`id_planeacion`,`id_cargo`,`id_personal`,`id_unidad_medida`,`id_moneda`,`cantidad`,`costo`,`id_tipo_asignacion`,`costo_unitario_rubro`,`medio_pago`,`id_rubro`,`id_mov_item_personal`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`) values (79,7,2,9,1,1,0,100000,1,0,2,14,0,'0000-00-00','2020-01-08','2020-01-30','0000-00-00'),(80,7,2,9,1,2,0,100000,1,0,2,13,0,'0000-00-00','2020-01-01','2020-01-15','0000-00-00'),(81,7,1,8,1,2,0,133333,2,0,2,14,0,'0000-00-00','2020-01-01','2020-01-22','0000-00-00'),(82,7,1,8,1,2,0,133333,1,0,2,14,1,'2020-01-01','2020-01-09','2020-01-17','2020-01-15'),(84,7,5,14,1,2,0,1000,1,0,2,5,0,'0000-00-00','2020-01-01','2020-01-15','0000-00-00'),(91,7,2,9,1,2,0,100000,3,0,2,5,0,'0000-00-00','2020-01-01','2020-01-16','0000-00-00');

UNLOCK TABLES;

/*Table structure for table `tb_equipo_rubros_equipo_herramienta` */

DROP TABLE IF EXISTS `tb_equipo_rubros_equipo_herramienta`;

CREATE TABLE `tb_equipo_rubros_equipo_herramienta` (
  `id_equipo_rubro_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_equipo_herramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_rubros_equipo_herramienta` */

LOCK TABLES `tb_equipo_rubros_equipo_herramienta` WRITE;

insert  into `tb_equipo_rubros_equipo_herramienta`(`id_equipo_rubro_equipo_herramienta`,`id_equipo_item_equipo_herramienta`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (1,4,7,3,5,1,2,3,0);

UNLOCK TABLES;

/*Table structure for table `tb_equipo_rubros_personal` */

DROP TABLE IF EXISTS `tb_equipo_rubros_personal`;

CREATE TABLE `tb_equipo_rubros_personal` (
  `id_equipo_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_rubros_personal` */

LOCK TABLES `tb_equipo_rubros_personal` WRITE;

insert  into `tb_equipo_rubros_personal`(`id_equipo_rubro_personal`,`id_equipo_item_personal`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (1,80,7,4,5,1,3434,3434,0),(2,80,7,4,5,1,400,2000,2);

UNLOCK TABLES;

/*Table structure for table `tb_equipos` */

DROP TABLE IF EXISTS `tb_equipos`;

CREATE TABLE `tb_equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_equipo` text NOT NULL,
  `descripcion_equipo` text NOT NULL,
  `codigo_equipo` text NOT NULL,
  `placa_equipo` text NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `tuberia_equipo` text NOT NULL,
  `alto_equipo` text NOT NULL,
  `ancho_equipo` text NOT NULL,
  `largo_equipo` text NOT NULL,
  `diametro_equipo` text NOT NULL,
  `ejes_equipo` text NOT NULL,
  `peso_cargado_equipo` text NOT NULL,
  `capacidad_equipo` text NOT NULL,
  `dia_equipo` int(2) NOT NULL,
  `peso_base_equipo` text NOT NULL,
  `marca_equipo` text NOT NULL,
  `arriendo_equipo` int(1) NOT NULL,
  `fecha_inicio_tecno_equipo` text NOT NULL,
  `fecha_fin_tecno_equipo` text NOT NULL,
  `doc_tecnomecanica_equipo` text NOT NULL,
  `fecha_inicio_propiedad_equipo` text NOT NULL,
  `fecha_fin_propiedad_equipo` text NOT NULL,
  `doc_tarjeta_propiedad_equipo` text NOT NULL,
  `fecha_inicio_soat_equipo` text NOT NULL,
  `fecha_fin_soat_equipo` text NOT NULL,
  `doc_soat_equipo` text NOT NULL,
  `fecha_inicio_grua_equipo` text NOT NULL,
  `fecha_fin_grua_equipo` text NOT NULL,
  `doc_grua_equipo` text NOT NULL,
  `fecha_inicio_lmi_equipo` text NOT NULL,
  `fecha_fin_lmi_equipo` text NOT NULL,
  `doc_lmi_equipo` text NOT NULL,
  `color_equipo` text NOT NULL,
  `fecha_inicio_pliza_equipo` text NOT NULL,
  `fecha_fin_pliza_equipo` text NOT NULL,
  `doc_poliza_equipo` text NOT NULL,
  `modelo_equipo` text NOT NULL,
  `propietario_equipo` text NOT NULL,
  `fecha_inicio_luz_equipo` text NOT NULL,
  `fecha_fin_luz_equipo` text NOT NULL,
  `doc_luz_equipo` text NOT NULL,
  `fecha_inicio_licencia_equipo` text NOT NULL,
  `fecha_fin_licencia_equipo` text NOT NULL,
  `doc_licencia_equipo` text NOT NULL,
  `fecha_inicio_inspeccion_equipo` text NOT NULL,
  `fecha_fin_inspeccion_equipo` text NOT NULL,
  `doc_inspeccion_equipo` text NOT NULL,
  `id_tipo_equipo_herramienta` int(11) NOT NULL,
  `fecha_inicio_king_equipo` text NOT NULL,
  `fecha_fin_king_equipo` text NOT NULL,
  `doc_king_equipo` text NOT NULL,
  `fecha_inicio_resolucion_equipo` text NOT NULL,
  `fecha_fin_resolucion_equipo` text NOT NULL,
  `doc_resolucion_equipo` text NOT NULL,
  `estado_equipo` int(1) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipos` */

LOCK TABLES `tb_equipos` WRITE;

insert  into `tb_equipos`(`id_equipo`,`nombre_equipo`,`descripcion_equipo`,`codigo_equipo`,`placa_equipo`,`id_proveedor`,`tuberia_equipo`,`alto_equipo`,`ancho_equipo`,`largo_equipo`,`diametro_equipo`,`ejes_equipo`,`peso_cargado_equipo`,`capacidad_equipo`,`dia_equipo`,`peso_base_equipo`,`marca_equipo`,`arriendo_equipo`,`fecha_inicio_tecno_equipo`,`fecha_fin_tecno_equipo`,`doc_tecnomecanica_equipo`,`fecha_inicio_propiedad_equipo`,`fecha_fin_propiedad_equipo`,`doc_tarjeta_propiedad_equipo`,`fecha_inicio_soat_equipo`,`fecha_fin_soat_equipo`,`doc_soat_equipo`,`fecha_inicio_grua_equipo`,`fecha_fin_grua_equipo`,`doc_grua_equipo`,`fecha_inicio_lmi_equipo`,`fecha_fin_lmi_equipo`,`doc_lmi_equipo`,`color_equipo`,`fecha_inicio_pliza_equipo`,`fecha_fin_pliza_equipo`,`doc_poliza_equipo`,`modelo_equipo`,`propietario_equipo`,`fecha_inicio_luz_equipo`,`fecha_fin_luz_equipo`,`doc_luz_equipo`,`fecha_inicio_licencia_equipo`,`fecha_fin_licencia_equipo`,`doc_licencia_equipo`,`fecha_inicio_inspeccion_equipo`,`fecha_fin_inspeccion_equipo`,`doc_inspeccion_equipo`,`id_tipo_equipo_herramienta`,`fecha_inicio_king_equipo`,`fecha_fin_king_equipo`,`doc_king_equipo`,`fecha_inicio_resolucion_equipo`,`fecha_fin_resolucion_equipo`,`doc_resolucion_equipo`,`estado_equipo`,`id_personal`,`fecha_registro`) values (1,'MOTOCIERRA','PARACO HP','PARA90','CRT07',1,'ACERO','13','56','150','68','12','80','23',15,'45','LA MEJOR',1,'2019-08-06','2019-08-20','1.pdf','2019-08-21','2019-08-23','2.pdf','2019-08-29','2019-08-21','3.pdf','2019-08-30','2019-08-21','4.pdf','2019-08-22','2019-08-21','5.pdf','ROJO','2019-08-16','2019-08-21','6.pdf','2019','JOHN JAIRO NARVAEZ TAMAYO','2019-08-21','2019-08-13','7.pdf','2019-08-23','2019-08-20','8.pdf','2019-08-22','2019-08-21','9.pdf',2,'2019-08-14','2019-08-14','10.pdf','2019-08-14','2019-08-21','11.pdf',1,6,'2019-09-21 11:53:22');

UNLOCK TABLES;

/*Table structure for table `tb_festivos` */

DROP TABLE IF EXISTS `tb_festivos`;

CREATE TABLE `tb_festivos` (
  `id_festivo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_festivo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_festivos` */

LOCK TABLES `tb_festivos` WRITE;

insert  into `tb_festivos`(`id_festivo`,`fecha`,`descripcion`) values (5,'2020-01-13','mi cumpleaños');

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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_gestion_bonos` */

LOCK TABLES `tb_gestion_bonos` WRITE;

insert  into `tb_gestion_bonos`(`id_bonos`,`id_personal`,`id_planeacion`,`fecha`,`fecha_inicio`,`fecha_final`,`centro_de_costo`,`dias`,`valor_bono`,`tipo_bono`,`valor_bono_total`,`cantidad_festivos`) values (0,6,7,'2019-11-02','2019-12-02','2019-11-23','123124',21,40000,'1',10000,'1'),(13,6,7,'2019-10-01','2019-12-01','2019-10-15','123124',14,1000000,'2',20000,'1'),(14,6,7,'2019-09-01','2019-12-01','2019-12-15','123124',14,1000000,'2',15000,'3'),(19,6,0,'2019-12-10','2019-12-10','2019-12-24','puebr444',14,33333333,'3',466666662,'2'),(21,10,0,'2019-12-01','2019-12-01','2019-12-10','puebra 5',9,30000,'3',270000,'2'),(25,8,0,'2020-12-10','2020-12-10','2020-12-22','puebra2222222324123',12,5000000,'3',60000000,'2'),(26,9,0,'2021-02-08','2021-02-08','2021-02-17','20221',9,2000000,'2',18000000,'3'),(27,9,0,'2019-12-01','2019-12-01','2019-12-15','12312',14,3000,'3',42000,'2'),(28,8,0,'2019-12-01','2019-12-01','2019-12-15','peubra numero 5',15,1000000,'1',15000000,'2'),(29,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'0'),(30,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'3'),(31,9,0,'2020-01-01','2020-01-01','2020-01-05','puebra222222',5,2000000,'2',10000000,'2'),(32,10,0,'2020-01-08','2020-01-08','2020-01-15','puebra222222',8,2147483647,'3',2147483647,'1'),(33,6,0,'2020-01-01','2020-01-01','2020-01-15','q24123',15,2000000,'1',30000000,'2'),(34,6,0,'2020-01-01','2020-01-01','2020-01-15','puebra222222',15,1000000,'2',15000000,'2'),(35,8,0,'2020-01-01','2020-01-01','2020-01-15','123',15,1000000,'1',15000000,'1'),(36,6,0,'2020-01-01','2020-01-01','2020-01-15','puebra222222',15,2000000,'1',30000000,'2'),(37,8,0,'2020-01-01','2020-01-01','2020-01-15','puebra222222',15,1000000,'1',15000000,'1'),(38,6,0,'2020-01-01','2020-01-01','2020-01-15','puebra33333333',15,2000000,'1',30000000,'0');

UNLOCK TABLES;

/*Table structure for table `tb_hojas_trabajo` */

DROP TABLE IF EXISTS `tb_hojas_trabajo`;

CREATE TABLE `tb_hojas_trabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(11) DEFAULT NULL,
  `id_pozo` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tuberia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_hojas_trabajo` */

LOCK TABLES `tb_hojas_trabajo` WRITE;

insert  into `tb_hojas_trabajo`(`id`,`id_servicio`,`id_pozo`,`id_equipo`,`fecha`,`tuberia`) values (1,7,8,57,'2019-12-01','aaaaaa'),(2,7,8,57,'2019-03-30','aaaaaa'),(3,7,8,57,'2019-04-03','aaaaaa'),(4,7,8,57,'2019-04-02','aaaaaa'),(5,7,8,57,'2019-04-10','aaaaaa'),(6,7,8,57,'2019-04-11','aaaaaa'),(7,7,8,57,'2019-04-11','aaaaaa'),(8,7,8,57,'2019-04-04','aaaaaa'),(9,7,8,57,'2019-04-05','aaaaaa'),(10,7,8,57,'2019-04-06','aaaaaa'),(11,7,8,57,'2019-04-07','aaaaaa'),(12,7,8,57,'2019-04-06','aaaaaa'),(13,7,8,57,'2019-04-09','aaaaaa'),(14,7,8,57,'2019-04-08','aaaaaa');

UNLOCK TABLES;

/*Table structure for table `tb_hojas_trabajo_detalle` */

DROP TABLE IF EXISTS `tb_hojas_trabajo_detalle`;

CREATE TABLE `tb_hojas_trabajo_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hora1` time DEFAULT NULL,
  `hora2` time DEFAULT NULL,
  `desde` int(11) DEFAULT NULL,
  `hasta` int(11) DEFAULT NULL,
  `ctu` int(11) DEFAULT NULL,
  `whp` int(11) DEFAULT NULL,
  `rih` int(11) DEFAULT NULL,
  `pooh` int(11) DEFAULT NULL,
  `liquido` double DEFAULT NULL,
  `n2` double DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `des_tipo_fluido` varchar(100) DEFAULT NULL,
  `volumen` double DEFAULT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  `id_hojas_trabajo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_hojas_trabajo_detalle` */

LOCK TABLES `tb_hojas_trabajo_detalle` WRITE;

insert  into `tb_hojas_trabajo_detalle`(`id`,`hora1`,`hora2`,`desde`,`hasta`,`ctu`,`whp`,`rih`,`pooh`,`liquido`,`n2`,`tipo`,`des_tipo_fluido`,`volumen`,`comentarios`,`id_hojas_trabajo`) values (3,'10:00:00','10:00:00',0,0,0,0,0,0,0,0,'acido','cdscs',100,'dscds',1);

UNLOCK TABLES;

/*Table structure for table `tb_hojas_trabajo_equipo_turno` */

DROP TABLE IF EXISTS `tb_hojas_trabajo_equipo_turno`;

CREATE TABLE `tb_hojas_trabajo_equipo_turno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) DEFAULT NULL,
  `entrada` datetime DEFAULT NULL,
  `salida` datetime DEFAULT NULL,
  `stb` smallint(6) DEFAULT NULL,
  `id_hojas_trabajo_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_hojas_trabajo_equipo_turno` */

LOCK TABLES `tb_hojas_trabajo_equipo_turno` WRITE;

insert  into `tb_hojas_trabajo_equipo_turno`(`id`,`id_equipo`,`entrada`,`salida`,`stb`,`id_hojas_trabajo_detalle`) values (2,1,'2019-12-01 10:00:00','2019-12-01 20:00:00',1,1);

UNLOCK TABLES;

/*Table structure for table `tb_hojas_trabajo_personal_turno` */

DROP TABLE IF EXISTS `tb_hojas_trabajo_personal_turno`;

CREATE TABLE `tb_hojas_trabajo_personal_turno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_personal` int(11) DEFAULT NULL,
  `entrada` datetime DEFAULT NULL,
  `salida` datetime DEFAULT NULL,
  `jornada` varchar(100) DEFAULT NULL,
  `id_hojas_trabajo_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_hojas_trabajo_personal_turno` */

LOCK TABLES `tb_hojas_trabajo_personal_turno` WRITE;

insert  into `tb_hojas_trabajo_personal_turno`(`id`,`id_personal`,`entrada`,`salida`,`jornada`,`id_hojas_trabajo_detalle`) values (4,6,'2019-12-01 18:00:00','2019-12-01 06:00:00','nocturno',1);

UNLOCK TABLES;

/*Table structure for table `tb_item` */

DROP TABLE IF EXISTS `tb_item`;

CREATE TABLE `tb_item` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `numero_item` text NOT NULL,
  `descripcion_item` text NOT NULL,
  `cantidad_item` text NOT NULL,
  `valor_item` text NOT NULL,
  `bodega_item` text NOT NULL,
  `marca_item` text NOT NULL,
  `categoria_item` int(1) NOT NULL,
  `estado_item` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `tb_item` */

LOCK TABLES `tb_item` WRITE;

insert  into `tb_item`(`id_item`,`numero_item`,`descripcion_item`,`cantidad_item`,`valor_item`,`bodega_item`,`marca_item`,`categoria_item`,`estado_item`,`fecha_registro`,`id_personal`) values (1,'1','MANUTENCION','2','222222222222','PRINCIPAL','NIKE',1,1,'2020-01-29 17:05:15',0),(2,'2','ALOJAMINETO','0','0','0','0',2,1,'2020-01-29 17:05:16',6),(3,'3','HIDATRACION','0','0','0','0',3,1,'2020-01-29 17:05:16',0),(4,'4','LAVANDERIA','0','0','0','0',4,1,'2020-01-29 17:05:17',0),(5,'5','PASAJES','0','0','0','0',5,1,'2020-01-29 17:05:17',0),(6,'6','TAXIS Y BUSES','0','0','0','0',3,1,'2020-01-29 17:05:21',0),(7,'7','COMBUSTIBLES','0','0','0','0',2,1,'2020-01-29 17:05:21',0),(8,'8','PEAJES','0','0','0','0',1,1,'2020-01-29 17:05:22',0),(9,'9','MANTENIMIENTO','0','0','NO APLICA','NO APLICA',4,1,'2020-01-29 17:05:23',6),(10,'10','OPERACION','0','0','NO APLICA','NO APLICA',5,1,'2020-01-29 17:05:23',6),(11,'11','QUIMICA','0','0','NO APLICA','NO APLICA',2,1,'2020-01-29 17:05:24',6),(12,'12','ANTICIPO A TERCEROS','0','0','NO APLICA','NO APLICA',3,1,'2020-01-29 17:05:24',6),(13,'13','OTROS','0','0','NO APLICA','NO APLICA',1,1,'2020-01-29 17:05:25',6),(14,'14','IMPREVISTO 10%','0','0','NO APLICA','NO APLICA',4,1,'2020-01-29 17:05:25',6),(15,'29','COMPUTADOR','00','0','0','0',1,1,'2020-01-20 08:45:29',6);

UNLOCK TABLES;

/*Table structure for table `tb_legalizacion` */

DROP TABLE IF EXISTS `tb_legalizacion`;

CREATE TABLE `tb_legalizacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_consignacion_detalle` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `valor_unitario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_legalizacion` */

LOCK TABLES `tb_legalizacion` WRITE;

UNLOCK TABLES;

/*Table structure for table `tb_monedas` */

DROP TABLE IF EXISTS `tb_monedas`;

CREATE TABLE `tb_monedas` (
  `id_moneda` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_moneda` text NOT NULL,
  `abreviatura_moneda` text NOT NULL,
  `estado_moneda` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_moneda`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_monedas` */

LOCK TABLES `tb_monedas` WRITE;

insert  into `tb_monedas`(`id_moneda`,`nombre_moneda`,`abreviatura_moneda`,`estado_moneda`,`fecha_registro`,`id_personal`) values (1,'DOLAR AMERICANO Y PESO COLOMBIANO','USD',2,'2020-01-24 16:27:35',0),(2,'PESO COLOMBIANO','COP',1,'2019-08-07 09:25:29',6);

UNLOCK TABLES;

/*Table structure for table `tb_mov_item_combustibles` */

DROP TABLE IF EXISTS `tb_mov_item_combustibles`;

CREATE TABLE `tb_mov_item_combustibles` (
  `id_mov_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_combustible`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_combustibles` */

LOCK TABLES `tb_mov_item_combustibles` WRITE;

insert  into `tb_mov_item_combustibles`(`id_mov_item_combustible`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`id_moneda`,`costo_unitario`,`medio_pago`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`,`id_mov_item_personal`,`id_mov_item_vehiculo`,`confirmar`) values (52,7,1,1,1,2,0,3000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(54,7,2,3,1,20,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,1),(55,7,4,1,1,2,0,4000,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(56,7,9,5,1,5,0,12312,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(57,7,12,5,1,565,0,4555,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(58,7,2,5,1,123,0,123,2,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(59,7,3,5,1,455,0,123,0,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0);

UNLOCK TABLES;

/*Table structure for table `tb_mov_item_imprevistos` */

DROP TABLE IF EXISTS `tb_mov_item_imprevistos`;

CREATE TABLE `tb_mov_item_imprevistos` (
  `id_mov_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha_imprevisto` date NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_imprevisto`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_imprevistos` */

LOCK TABLES `tb_mov_item_imprevistos` WRITE;

insert  into `tb_mov_item_imprevistos`(`id_mov_item_imprevisto`,`id_planeacion`,`descripcion`,`fecha_imprevisto`,`id_rubro`,`id_unidad_medida`,`cantidad`,`id_moneda`,`costo_unitario`,`medio_pago`) values (26,7,'descripcion de lo imprevisto','2019-11-29',2,2,2,2,2000,2),(27,7,'prueba de algo','2019-11-30',1,2,2,2,2000,2);

UNLOCK TABLES;

/*Table structure for table `tb_mov_item_personal` */

DROP TABLE IF EXISTS `tb_mov_item_personal`;

CREATE TABLE `tb_mov_item_personal` (
  `id_mov_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `id_tipo_asignacion` int(20) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `total` int(11) NOT NULL,
  `verificar` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_mov_item_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_personal` */

LOCK TABLES `tb_mov_item_personal` WRITE;

insert  into `tb_mov_item_personal`(`id_mov_item_personal`,`id_planeacion`,`id_cargo`,`id_personal`,`id_unidad_medida`,`cantidad`,`id_moneda`,`medio_pago`,`costo_unitario_rubro`,`id_rubro`,`id_equipo`,`id_tipo_asignacion`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`total`,`verificar`) values (1,7,1,8,1,8,2,2,0,14,1,1,'2020-01-01','2020-01-09','2020-01-17','2020-01-15',1066667,0);

UNLOCK TABLES;

/*Table structure for table `tb_mov_item_vehiculos` */

DROP TABLE IF EXISTS `tb_mov_item_vehiculos`;

CREATE TABLE `tb_mov_item_vehiculos` (
  `id_mov_item_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `medio_pago` varchar(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_mov_item_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_vehiculos` */

LOCK TABLES `tb_mov_item_vehiculos` WRITE;

insert  into `tb_mov_item_vehiculos`(`id_mov_item_vehiculo`,`id_planeacion`,`vehiculo`,`carga`,`id_unidad_medida`,`id_moneda`,`gasto_unitario`,`gasto_standby_unitario`,`medio_pago`,`costo_unitario_rubro`,`id_rubro`,`observaciones`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`) values (1,7,1,1,1,2,10000,5000,'2',0,13,'puebra 1 desde movilizacion','2020-01-02','2020-01-22','2020-01-15','2020-01-23','2020-01-01','2020-01-02');

UNLOCK TABLES;

/*Table structure for table `tb_mov_rubros_personal` */

DROP TABLE IF EXISTS `tb_mov_rubros_personal`;

CREATE TABLE `tb_mov_rubros_personal` (
  `id_mov_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_rubros_personal` */

LOCK TABLES `tb_mov_rubros_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tb_mov_rubros_vehiculos` */

DROP TABLE IF EXISTS `tb_mov_rubros_vehiculos`;

CREATE TABLE `tb_mov_rubros_vehiculos` (
  `id_mov_rubro_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_rubros_vehiculos` */

LOCK TABLES `tb_mov_rubros_vehiculos` WRITE;

insert  into `tb_mov_rubros_vehiculos`(`id_mov_rubro_vehiculo`,`id_mov_item_vehiculo`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (1,1,7,9,5,1,5,12312,2);

UNLOCK TABLES;

/*Table structure for table `tb_personal` */

DROP TABLE IF EXISTS `tb_personal`;

CREATE TABLE `tb_personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_personal` text NOT NULL,
  `apellido_personal` text NOT NULL,
  `numero_documento_personal` text NOT NULL,
  `fecha_expedicion_personal` text NOT NULL,
  `lugar_expedicion_personal` text NOT NULL,
  `fecha_nacimiento_personal` text NOT NULL,
  `lugar_nacimiento_personal` text NOT NULL,
  `edad_personal` text NOT NULL,
  `rh_personal` text NOT NULL,
  `genero_personal` text NOT NULL,
  `telefono_personal` text NOT NULL,
  `telefono_residencia_personal` text NOT NULL,
  `direccion_residencia_personal` text NOT NULL,
  `ciudad_personal` text NOT NULL,
  `correo_corporativo_personal` text NOT NULL,
  `correo_personal` text NOT NULL,
  `profesion_personal` text NOT NULL,
  `experiencia_personal` text NOT NULL,
  `contrato_personal` text NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_base` int(11) NOT NULL,
  `fecha_ingreso_personal` text NOT NULL,
  `fecha_retiro_personal` text NOT NULL,
  `salario_personal` int(11) NOT NULL,
  `bono_otros` int(11) DEFAULT NULL,
  `bono_salarial_personal` int(11) NOT NULL,
  `bono_no_salarial_personal` int(11) NOT NULL,
  `eps_personal` text NOT NULL,
  `fecha_eps_personal` text NOT NULL,
  `pension_personal` text NOT NULL,
  `fecha_pension_personal` text NOT NULL,
  `cesantias_personal` text NOT NULL,
  `arl_personal` text NOT NULL,
  `fecha_arl_personal` text NOT NULL,
  `fecha_parafiscales_personal` text NOT NULL,
  `sena_personal` text NOT NULL,
  `icbf_personal` text NOT NULL,
  `caja_personal` text NOT NULL,
  `accidente_personal` text NOT NULL,
  `accidente_telefono_personal` text NOT NULL,
  `estado_personal` int(1) NOT NULL,
  `username` text DEFAULT NULL,
  `password` text NOT NULL,
  `foto_personal` text NOT NULL,
  `firma_personal` text NOT NULL,
  `modulo_operaciones` int(1) NOT NULL,
  `generar_ticket` int(1) NOT NULL,
  `horas_trabajo` int(1) NOT NULL,
  `planeacion` int(1) NOT NULL,
  `gestion_template` int(1) NOT NULL,
  `reportes` int(1) NOT NULL,
  `control_costos` int(1) NOT NULL,
  `permiso_aceptar` int(1) DEFAULT NULL,
  `consignaciones` int(1) NOT NULL,
  `legalizacion` int(1) NOT NULL,
  `gestion_bonos` int(1) NOT NULL,
  `reportes_costos` int(1) NOT NULL,
  `movilizacion` int(1) NOT NULL,
  `aprobacion` int(1) NOT NULL,
  `ctrl_movilizacion` int(1) NOT NULL,
  `consultas` int(1) NOT NULL,
  `configuracion_general` int(1) NOT NULL,
  `bases` int(1) NOT NULL,
  `cargos` int(1) NOT NULL,
  `clientes` int(1) NOT NULL,
  `contratos` int(1) NOT NULL,
  `campos` int(1) NOT NULL,
  `centro_costos` int(1) NOT NULL,
  `equipo_herramienta` int(1) NOT NULL,
  `item` int(1) NOT NULL,
  `moneda` int(1) NOT NULL,
  `personal` int(1) NOT NULL,
  `proveedores` int(1) NOT NULL,
  `pozos` int(1) NOT NULL,
  `rubros` int(1) NOT NULL,
  `tipo_trabajos` int(1) NOT NULL,
  `tipo_contratos` int(1) NOT NULL,
  `tipo_pozos` int(1) NOT NULL,
  `tipo_equipos` int(1) NOT NULL,
  `usuarios` int(1) NOT NULL,
  `unidad_medida` int(1) NOT NULL,
  `festivos` int(1) NOT NULL,
  `bitacora` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  `fecha_conexion_personal` text NOT NULL,
  `derecho_festivo` int(1) DEFAULT NULL,
  `porcentaje` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `tb_personal` */

LOCK TABLES `tb_personal` WRITE;

insert  into `tb_personal`(`id`,`nombre_personal`,`apellido_personal`,`numero_documento_personal`,`fecha_expedicion_personal`,`lugar_expedicion_personal`,`fecha_nacimiento_personal`,`lugar_nacimiento_personal`,`edad_personal`,`rh_personal`,`genero_personal`,`telefono_personal`,`telefono_residencia_personal`,`direccion_residencia_personal`,`ciudad_personal`,`correo_corporativo_personal`,`correo_personal`,`profesion_personal`,`experiencia_personal`,`contrato_personal`,`id_cargo`,`id_base`,`fecha_ingreso_personal`,`fecha_retiro_personal`,`salario_personal`,`bono_otros`,`bono_salarial_personal`,`bono_no_salarial_personal`,`eps_personal`,`fecha_eps_personal`,`pension_personal`,`fecha_pension_personal`,`cesantias_personal`,`arl_personal`,`fecha_arl_personal`,`fecha_parafiscales_personal`,`sena_personal`,`icbf_personal`,`caja_personal`,`accidente_personal`,`accidente_telefono_personal`,`estado_personal`,`username`,`password`,`foto_personal`,`firma_personal`,`modulo_operaciones`,`generar_ticket`,`horas_trabajo`,`planeacion`,`gestion_template`,`reportes`,`control_costos`,`permiso_aceptar`,`consignaciones`,`legalizacion`,`gestion_bonos`,`reportes_costos`,`movilizacion`,`aprobacion`,`ctrl_movilizacion`,`consultas`,`configuracion_general`,`bases`,`cargos`,`clientes`,`contratos`,`campos`,`centro_costos`,`equipo_herramienta`,`item`,`moneda`,`personal`,`proveedores`,`pozos`,`rubros`,`tipo_trabajos`,`tipo_contratos`,`tipo_pozos`,`tipo_equipos`,`usuarios`,`unidad_medida`,`festivos`,`bitacora`,`fecha_registro`,`id_personal`,`fecha_conexion_personal`,`derecho_festivo`,`porcentaje`) values (6,'JOHN JAIRO','NARVAEZ TAMAYO','1082215681','2019-07-17','YAGUARA HUILA','2019-07-02','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-17','2019-07-17',5000000,0,1000000,2000000,'SANITAS','2019-07-17','PORVENIR','2019-07-17','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','MIGUEL ANGEL NARVAEZ','3507518916',1,'JOHN','$2a$10$REyQIUTThUwceovFLwlYXecjdBCsPGKVgr0Jf4Yi3izpHEg2iwY2y','_MG_8275.JPG','',1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-31 11:52:17',0,'2020-01-18 23:49:58.427',1,1),(8,'LEONARDO ','JIMENEZ','1010','2019-07-02','NEIVA-HUILA','2019-07-25','NEIVA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','ELMEJOR@GMAIL.COM','ELMEJOR@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-25','2019-07-29',4000000,0,500000,1000000,'SANITAS','2019-07-25','PORVENIR','2019-07-19','PORVENIR','BOLIVAR','2019-07-26','2019-07-27','NO','NO','COMFAMILIAR','EL MEJOR','123',1,'CAMILA','$2a$10$.KWZF5.91K8xK5p119b8Bu2xKLPcLFoItqCUJe2EmeOfiSI3AIjZW','_MG_8339.JPG','descarga.png',1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-31 10:05:07',0,'2019-08-10 22:49:51',1,1),(9,'NATALIA ','NARAJO NARVAEZ','1072422473','2019-08-07','YAGUARA HUILA','2019-08-07','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',2,1,'2019-07-31','2019-08-10',3000000,0,2000000,80000,'SANITAS','2019-07-17','PORVENIR','2019-08-07','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','JOHN JAIRO NARVAEZ','3507518916P',1,'S','$2a$10$xRf8t5XWl2/HKDX7miWvpeNgpR0LiYdLXw97DcuJvvG9mTnpFY.zW','logo_map.png','',1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-31 09:48:35',6,'2019-08-10 22:48:49',0,1),(10,'JUAN MANUEL','CUELLAR BAHAMON','1075305650','291029','EFIEJ','2019-11-11','NEIVA','22','O+','MASCULINO','8293829','3227382','CALLE 8 #48-400','NEIVA','CORREO@GMAIL.COM','CORREO2@GMAIL.COM','KWDWOKD','WIJDIWJ','WIJDIWJ',4,1,'2019-11-17','2019-11-22',12912,0,2832387,2738237,'NUEVA EPS','2019-11-19','NO TENGO','2019-11-27','EFKEFKQ','NO TENGO','2019-11-24','2019-11-29','EFEWF','WEFWEF','EWFEW','WEFWEFWEF','239293',1,'MANUEL','$2a$10$FUL7XgGYBa0ek1KctkY3bekts6LnVhYetVQeEvLBmt2wKwlRh7M/m','','',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-31 09:48:36',6,'2019-11-05 15:56:39.282',1,1),(11,'SAESQW','WQEq','2923949231','2095-12-12','ASD','2020-01-20','DQDS','45','A+','MASCULITO','3204042901','8783245','NEIVA12','123123','3123123','3123123','3123123 MJK','KJ123J2K','12312',3,1,'2020-01-10','2020-01-10',30000,0,12323,123123,'ASDASD','2020-01-20','QDQWE','2020-01-20','OQE','IQWEJIOQWEJI','2020-01-20','2020-01-20','QE','QIOE','JOWE','QIWEO','32040203',1,NULL,'','_MG_8275.JPG','',0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-31 09:48:36',6,'',1,1),(14,'ALBERTO','ELIAS','12304123123','2020-01-18','2020-01-08','2020-01-08','NEIVA','15','LAS','SEXO','32924921123','320402123','CALLE 11 A 23','NEIVA','SEBASTIAN@NJDQWE','123123FDMQSEQW','RARO','TODA','NO SE',5,1,'2020-01-18','',30000,NULL,13123,3000,'NUEVA','2020-01-18','20000','2020-01-08','231231','O+','2020-01-18','2020-01-18','FRIJOLES','NOKS','132123','SI','3204042901',1,NULL,'','_MG_8339.JPG','',0,0,0,0,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-31 09:48:37',0,'',1,1),(15,'SEBASTIAN','BEDOYA  MEDINA','1038239421','2018-06-28','NEIVA','2000-06-28','NEIVA','19','A+','MASCULINO','3204042901','8728325','CALLE 23 -40','NEIVA','SEBASTIAN@NJDQWE','SEBASTIAN@HOTMAIL.COM','INGENIERO DE SOFTWARE','MUCHA','FIJO',6,1,'2020-01-24','',100000,NULL,50000,40000,'NUEVA EPS','2020-01-24','COLPESIONES','2020-01-24','NI IDEA','MAFREE','2020-01-24','2020-01-24','11','NO','JASD','PADRE','3204042901',1,NULL,'','_MG_8339.JPG','',0,0,0,0,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-31 09:48:37',0,'',1,1);

UNLOCK TABLES;

/*Table structure for table `tb_planeacion` */

DROP TABLE IF EXISTS `tb_planeacion`;

CREATE TABLE `tb_planeacion` (
  `id_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(40) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `contacto` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(35) NOT NULL,
  `fecha_contacto` date NOT NULL,
  `hora_contacto` time NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_centro_costo` int(11) NOT NULL,
  `fecha_estimada` date NOT NULL,
  `id_contrato` int(11) NOT NULL,
  `alojamiento` int(11) NOT NULL,
  `combustible` int(11) NOT NULL,
  `iluminacion` int(11) NOT NULL,
  `seguridad_fisica` int(11) NOT NULL,
  `personal` int(11) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `id_personal_supervisor` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `objetivo_trabajo` varchar(255) NOT NULL,
  `requisitos_hse` varchar(255) NOT NULL,
  `observacion` varchar(255) NOT NULL,
  `trm` int(10) NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_planeacion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `tb_planeacion` */

LOCK TABLES `tb_planeacion` WRITE;

insert  into `tb_planeacion`(`id_planeacion`,`titulo`,`id_cliente`,`contacto`,`telefono`,`email`,`fecha_contacto`,`hora_contacto`,`id_personal`,`id_centro_costo`,`fecha_estimada`,`id_contrato`,`alojamiento`,`combustible`,`iluminacion`,`seguridad_fisica`,`personal`,`id_campo`,`id_personal_supervisor`,`id_moneda`,`objetivo_trabajo`,`requisitos_hse`,`observacion`,`trm`,`estado`) values (7,'ya modifica la planeacionhshshs',1,'juan manuel hellow','31532328392','juanmanuelcuellarbahamon123@gmail.c','2019-10-13','14:22:00',6,2,'2019-10-15',2,2,1,2,1,1,3,8,2,'objetivo del trabajo','requisito hse','observacion del servicio',3000,'Ejecucion'),(8,'planeacion 2',1,'yo mismo','3222879918','juan_cuellarba@gmail.com','2019-11-24','02:00:00',10,2,'2019-11-29',3,2,1,1,1,1,2,8,2,'objetivo','requisito','bueno',2000,'Ejecucion');

UNLOCK TABLES;

/*Table structure for table `tb_planeacion_valor_fecha` */

DROP TABLE IF EXISTS `tb_planeacion_valor_fecha`;

CREATE TABLE `tb_planeacion_valor_fecha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_ingresado` int(11) DEFAULT NULL,
  `valor_consulta` int(11) DEFAULT NULL,
  `mes_ano` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_planeacion_valor_fecha` */

LOCK TABLES `tb_planeacion_valor_fecha` WRITE;

insert  into `tb_planeacion_valor_fecha`(`id`,`valor_ingresado`,`valor_consulta`,`mes_ano`) values (1,444,2400,'2019-04-01'),(2,333,200,'2019-03-01');

UNLOCK TABLES;

/*Table structure for table `tb_porcentaje` */

DROP TABLE IF EXISTS `tb_porcentaje`;

CREATE TABLE `tb_porcentaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_porcentaje` varchar(20) DEFAULT NULL,
  `porcentaje` decimal(3,2) DEFAULT NULL,
  `resumen` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_porcentaje` */

LOCK TABLES `tb_porcentaje` WRITE;

insert  into `tb_porcentaje`(`id`,`nombre_porcentaje`,`porcentaje`,`resumen`) values (1,'PORCENTAJE DE DESCUE','0.53','PD'),(2,'QUE SE DICE JAJJA','0.53','LO');

UNLOCK TABLES;

/*Table structure for table `tb_pozos` */

DROP TABLE IF EXISTS `tb_pozos`;

CREATE TABLE `tb_pozos` (
  `id_pozo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_pozo` text NOT NULL,
  `id_campo` int(11) NOT NULL,
  `id_tipo_pozo` int(11) NOT NULL,
  `estado_pozo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_pozo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_pozos` */

LOCK TABLES `tb_pozos` WRITE;

insert  into `tb_pozos`(`id_pozo`,`nombre_pozo`,`id_campo`,`id_tipo_pozo`,`estado_pozo`,`fecha_registro`,`id_personal`) values (1,'POZO 1',1,1,2,'2019-08-09 18:01:07',0),(2,'CRETACIOS1',2,1,1,'2020-01-24 10:37:00',6);

UNLOCK TABLES;

/*Table structure for table `tb_pozos_planeacion` */

DROP TABLE IF EXISTS `tb_pozos_planeacion`;

CREATE TABLE `tb_pozos_planeacion` (
  `id_pozo_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_pozo` int(11) NOT NULL,
  PRIMARY KEY (`id_pozo_planeacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `tb_pozos_planeacion` */

LOCK TABLES `tb_pozos_planeacion` WRITE;

insert  into `tb_pozos_planeacion`(`id_pozo_planeacion`,`id_planeacion`,`id_pozo`) values (1,3,1),(5,3,1),(6,0,1),(7,0,1),(8,7,1);

UNLOCK TABLES;

/*Table structure for table `tb_proveedor` */

DROP TABLE IF EXISTS `tb_proveedor`;

CREATE TABLE `tb_proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_documento_proveedor` text NOT NULL,
  `numero_documento_proveedor` text NOT NULL,
  `regimen_proveedor` text NOT NULL,
  `rut_proveedor` text NOT NULL,
  `razon_social_proveedor` text NOT NULL,
  `contacto_proveedor` text NOT NULL,
  `email_proveedor` text NOT NULL,
  `telefono_proveedor` text NOT NULL,
  `extension_proveedor` text NOT NULL,
  `pais_proveedor` text NOT NULL,
  `departamento_proveedor` text NOT NULL,
  `ciudad_proveedor` text NOT NULL,
  `direccion_proveedor` text NOT NULL,
  `categoría_proveedor` text NOT NULL,
  `area_influencia_proveedor` text NOT NULL,
  `banco_proveedor` text NOT NULL,
  `tipo_banco_proveedor` text NOT NULL,
  `numero_cuenta_proveedor` text NOT NULL,
  `seguridad_social_proveedor` text NOT NULL,
  `certificado_bancario_proveedor` text NOT NULL,
  `estado_proveedor` int(1) NOT NULL,
  `actividad_economica_proveedor` text NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_proveedor` */

LOCK TABLES `tb_proveedor` WRITE;

insert  into `tb_proveedor`(`id_proveedor`,`tipo_documento_proveedor`,`numero_documento_proveedor`,`regimen_proveedor`,`rut_proveedor`,`razon_social_proveedor`,`contacto_proveedor`,`email_proveedor`,`telefono_proveedor`,`extension_proveedor`,`pais_proveedor`,`departamento_proveedor`,`ciudad_proveedor`,`direccion_proveedor`,`categoría_proveedor`,`area_influencia_proveedor`,`banco_proveedor`,`tipo_banco_proveedor`,`numero_cuenta_proveedor`,`seguridad_social_proveedor`,`certificado_bancario_proveedor`,`estado_proveedor`,`actividad_economica_proveedor`,`fecha_registro`,`id_personal`) values (1,'CEDULA','10822156','Simplificado','123456SAD','COLOMBIA SAS ','JOHN JAIRO NARVAEZ TAMAYOSDASD','JOHN@OPISOFT.COMASD','SAD3115364067','87','COLOMBIAASD','HUILA','NEIVAASD','d','Mantenimiento','SI','BANCOLOMBIAASD','Corriente','123456789','SI','',2,'                                                                                                                                                                                                        ESTO ES UNA PRUEBA PARA EL MEJOR DE LOS MEJORES\r\n                                              \r\n                                              \r\n                                              \r\n                                              ','2020-01-14 20:04:44',0),(2,'CEXTRANJERIA','1072422473','Común','1234','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Herr.Superficie','SI','BANCOLOMBIA','Corriente','1212312','12312','',1,'hola mundo','2019-08-09 15:38:17',6),(3,'CEDULA','123123','Común','23123','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Mantenimiento','SI','BANCOLOMBIA','Corriente','1212312','SI','1.pdf',2,'2312312','2019-08-09 15:42:42',6),(4,'NIT','332432','Simplificado','32423','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Operacion','SI','BANCOLOMBIA','Corriente','1212312','SI','1.pdf',1,'','2019-08-09 15:47:53',6);

UNLOCK TABLES;

/*Table structure for table `tb_rubros` */

DROP TABLE IF EXISTS `tb_rubros`;

CREATE TABLE `tb_rubros` (
  `id_rubro` int(11) NOT NULL AUTO_INCREMENT,
  `sigla_rubro` text NOT NULL,
  `nombre_rubro` text NOT NULL,
  `estado_rubro` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_rubro`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

/*Data for the table `tb_rubros` */

LOCK TABLES `tb_rubros` WRITE;

insert  into `tb_rubros`(`id_rubro`,`sigla_rubro`,`nombre_rubro`,`estado_rubro`,`fecha_registro`,`id_personal`) values (5,'MA','MANUTENCION',1,'2020-01-28 12:29:50',6),(6,'AL','ALOJAMIENTO',1,'2020-01-28 12:30:03',6),(7,'HI','HIDRATACION',1,'2020-01-28 12:30:37',6),(8,'LA','LAVANDERIA',1,'2020-01-28 12:30:47',6),(9,'PS','PASAJES',1,'2020-01-28 12:31:04',6),(10,'TX','TAXIS Y BUSES',1,'2020-01-28 12:31:17',6),(11,'CB','COMBUSTIBLES',1,'2020-01-28 12:31:33',6),(12,'PJ','PEAJES',1,'2020-01-28 12:31:48',6),(13,'MAT','MANTENIMIENTO',1,'2020-01-28 12:32:21',6),(14,'OP','OPERACION',1,'2020-01-28 12:32:30',6),(15,'QUI','QUIMICA',1,'2020-01-28 12:32:42',6),(16,'ANTE','ANTICIPO A TERCEROS',1,'2020-01-28 12:34:19',6),(17,'OTR','OTROS',1,'2020-01-28 12:34:50',6),(18,'IMP','IMPREVISTOS 10%',1,'2020-01-28 12:35:14',6);

UNLOCK TABLES;

/*Table structure for table `tb_rubros_consignacion` */

DROP TABLE IF EXISTS `tb_rubros_consignacion`;

CREATE TABLE `tb_rubros_consignacion` (
  `id_rubro_consignacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `costo_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_rubros_consignacion` */

LOCK TABLES `tb_rubros_consignacion` WRITE;

UNLOCK TABLES;

/*Table structure for table `tb_ticket` */

DROP TABLE IF EXISTS `tb_ticket`;

CREATE TABLE `tb_ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(11) DEFAULT NULL,
  `equipo` varchar(200) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `fecha` date DEFAULT current_timestamp(),
  `descuento` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_ticket` */

LOCK TABLES `tb_ticket` WRITE;

insert  into `tb_ticket`(`id`,`id_servicio`,`equipo`,`descripcion`,`fecha`,`descuento`) values (12,8,'lol','lso','2020-01-24',0);

UNLOCK TABLES;

/*Table structure for table `tb_ticket_copia_gatos_planeacion` */

DROP TABLE IF EXISTS `tb_ticket_copia_gatos_planeacion`;

CREATE TABLE `tb_ticket_copia_gatos_planeacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `cant` int(11) DEFAULT NULL,
  `und` varchar(100) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  `id_moneda` varchar(100) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `id_ticket` int(11) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `date` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_ticket_copia_gatos_planeacion` */

LOCK TABLES `tb_ticket_copia_gatos_planeacion` WRITE;

insert  into `tb_ticket_copia_gatos_planeacion`(`id`,`descripcion`,`cant`,`und`,`valor`,`id_moneda`,`total`,`id_ticket`,`tipo`,`date`) values (2,'chupelo',302,'cp',3049,'2',34341,3,3,'2020-01-23'),(5,'set de ct',2,'MIN',1000,'2',2000,11,1,'2020-01-24'),(6,'esteeee',5,'MIN',3000,'1',7.5,11,2,'2020-01-24'),(7,'set de ctqwe',10,'MIN',2000,'1',10,11,1,'2020-01-24'),(8,'operadores de set de ct',1,'MIN',500,'2',500,11,3,'2020-01-24'),(9,'movilizacion de set de ct',1,'MIN',500,'2',500,11,2,'2020-01-24'),(11,'esteeee',5,'MIN',3000,'1',7.5,12,2,'2020-01-24'),(16,'set de ctqwe',10,'MIN',20000,'1',10,12,1,'2020-01-24'),(34,'esteeee',5,'MIN',30000,'1',75,12,2,'2020-01-28'),(35,'esteeeeasdde',5,'MIN',2000,'2',10000,12,3,'2020-01-28');

UNLOCK TABLES;

/*Table structure for table `tb_tipo_asignacion` */

DROP TABLE IF EXISTS `tb_tipo_asignacion`;

CREATE TABLE `tb_tipo_asignacion` (
  `id_tipo_asignacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(40) NOT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id_tipo_asignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_asignacion` */

LOCK TABLES `tb_tipo_asignacion` WRITE;

insert  into `tb_tipo_asignacion`(`id_tipo_asignacion`,`descripcion`,`estado`) values (1,'Conductor','activo'),(2,'Ayudante','activo'),(3,'Pasajero','activo');

UNLOCK TABLES;

/*Table structure for table `tb_tipo_contratos` */

DROP TABLE IF EXISTS `tb_tipo_contratos`;

CREATE TABLE `tb_tipo_contratos` (
  `id_tipo_contrato` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_contrato` text NOT NULL,
  `estado_tipo_contrato` int(1) NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_contrato`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_contratos` */

LOCK TABLES `tb_tipo_contratos` WRITE;

insert  into `tb_tipo_contratos`(`id_tipo_contrato`,`nombre_tipo_contrato`,`estado_tipo_contrato`,`fecha_registro`,`id_personal`) values (1,'ORDEN DE SERVICIO',1,'2020-01-14',0),(2,'RENTA MENSUAL V',2,'2020-01-11',6),(3,'MODELO',1,'2020-01-15',6),(4,'LALALLA',1,'2020-01-15',6),(5,'SSSSSSS',1,'2020-01-15',6);

UNLOCK TABLES;

/*Table structure for table `tb_tipo_equipos_herramientas` */

DROP TABLE IF EXISTS `tb_tipo_equipos_herramientas`;

CREATE TABLE `tb_tipo_equipos_herramientas` (
  `id_tipo_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_equipo_herramienta` text NOT NULL,
  `imagen_equipo_herramienta` text NOT NULL,
  `estado_equipo_herramienta` int(1) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_tipo_equipo_herramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_equipos_herramientas` */

LOCK TABLES `tb_tipo_equipos_herramientas` WRITE;

insert  into `tb_tipo_equipos_herramientas`(`id_tipo_equipo_herramienta`,`nombre_equipo_herramienta`,`imagen_equipo_herramienta`,`estado_equipo_herramienta`,`id_personal`,`fecha_registro`) values (1,'SODA CAUSTICA','descarga.jpg',1,6,'2019-08-10 14:53:09'),(2,'COILED TUBING','arches.jpg',2,6,'2019-08-10 16:44:31'),(3,'CAMION DE VACIO','camion-de-vacio-6.000-6.jpg',2,6,'2019-08-10 15:22:58'),(4,'CHOKE MANIFOLD ','a00402d316134727bf6552478e461472.jpg',1,6,'2019-08-10 14:55:19'),(5,'ACID TRAILER','descarga (1).jpg',1,6,'2019-08-10 14:56:09'),(6,'CAMA BAJA','515.jpg',1,6,'2019-08-10 14:56:44');

UNLOCK TABLES;

/*Table structure for table `tb_tipo_pozos` */

DROP TABLE IF EXISTS `tb_tipo_pozos`;

CREATE TABLE `tb_tipo_pozos` (
  `id_tipo_pozo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_pozo` text NOT NULL,
  `estado_tipo_pozo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_pozo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_pozos` */

LOCK TABLES `tb_tipo_pozos` WRITE;

insert  into `tb_tipo_pozos`(`id_tipo_pozo`,`nombre_tipo_pozo`,`estado_tipo_pozo`,`fecha_registro`,`id_personal`) values (1,'PRODUCTOR DE CRUDO',1,'2019-07-24 14:33:51',0),(2,'INYECTOR',2,'2019-08-10 14:22:06',6);

UNLOCK TABLES;

/*Table structure for table `tb_tipo_trabajo_planeacion` */

DROP TABLE IF EXISTS `tb_tipo_trabajo_planeacion`;

CREATE TABLE `tb_tipo_trabajo_planeacion` (
  `id_tipo_trabajo_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_trabajo` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_trabajo_planeacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_trabajo_planeacion` */

LOCK TABLES `tb_tipo_trabajo_planeacion` WRITE;

insert  into `tb_tipo_trabajo_planeacion`(`id_tipo_trabajo_planeacion`,`id_planeacion`,`id_tipo_trabajo`) values (3,1,3),(6,3,3),(9,7,1),(10,7,3);

UNLOCK TABLES;

/*Table structure for table `tb_tipo_trabajos` */

DROP TABLE IF EXISTS `tb_tipo_trabajos`;

CREATE TABLE `tb_tipo_trabajos` (
  `id_tipo_trabajo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_tipo_trabajo` text NOT NULL,
  `promedio_costo_tipo_trabajo` text NOT NULL,
  `imagen_tipo_trabajo` text NOT NULL,
  `promedio_personal_tipo_estado` text NOT NULL,
  `estado_tipo_trabajo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_trabajo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_trabajos` */

LOCK TABLES `tb_tipo_trabajos` WRITE;

insert  into `tb_tipo_trabajos`(`id_tipo_trabajo`,`descripcion_tipo_trabajo`,`promedio_costo_tipo_trabajo`,`imagen_tipo_trabajo`,`promedio_personal_tipo_estado`,`estado_tipo_trabajo`,`fecha_registro`,`id_personal`) values (1,'TRABAJO 1','12','desarrollador-de-software.jpg','987654321',1,'2019-08-10 13:40:09',0),(2,'TRABAJO 2','123456789','desarrollador-de-software.jpg','987654321',2,'2019-08-10 13:39:46',0),(3,'DESARROLLADOR DE SOFTWARE','12123','MILLER.png','12123123',1,'2020-01-14 20:01:08',0);

UNLOCK TABLES;

/*Table structure for table `tb_tipos_cotizacion` */

DROP TABLE IF EXISTS `tb_tipos_cotizacion`;

CREATE TABLE `tb_tipos_cotizacion` (
  `id_tipo_cotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo_cotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipos_cotizacion` */

LOCK TABLES `tb_tipos_cotizacion` WRITE;

UNLOCK TABLES;

/*Table structure for table `tb_unidad_medida` */

DROP TABLE IF EXISTS `tb_unidad_medida`;

CREATE TABLE `tb_unidad_medida` (
  `id_unidad_medida` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_unidad_medida` text NOT NULL,
  `abreviatura_unidad_medida` text NOT NULL,
  `estado_unidad_medida` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_unidad_medida`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_unidad_medida` */

LOCK TABLES `tb_unidad_medida` WRITE;

insert  into `tb_unidad_medida`(`id_unidad_medida`,`nombre_unidad_medida`,`abreviatura_unidad_medida`,`estado_unidad_medida`,`fecha_registro`,`id_personal`) values (1,'MINUTOS','MIN',1,'2019-08-10 17:58:40',0);

UNLOCK TABLES;

/*Table structure for table `tbr_cambio_estado` */

DROP TABLE IF EXISTS `tbr_cambio_estado`;

CREATE TABLE `tbr_cambio_estado` (
  `id_cambio_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `fecha_cambio` date DEFAULT NULL,
  PRIMARY KEY (`id_cambio_planeacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tbr_cambio_estado` */

LOCK TABLES `tbr_cambio_estado` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_item_combustible` */

DROP TABLE IF EXISTS `tbr_equipo_item_combustible`;

CREATE TABLE `tbr_equipo_item_combustible` (
  `id_equipo_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_combustible`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_item_combustible` */

LOCK TABLES `tbr_equipo_item_combustible` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_item_equipo_herramienta` */

DROP TABLE IF EXISTS `tbr_equipo_item_equipo_herramienta`;

CREATE TABLE `tbr_equipo_item_equipo_herramienta` (
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_equipo_herramienta` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_equipo_herramienta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` varchar(10) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_equipo_herramienta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_item_equipo_herramienta` */

LOCK TABLES `tbr_equipo_item_equipo_herramienta` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_item_imprevistos` */

DROP TABLE IF EXISTS `tbr_equipo_item_imprevistos`;

CREATE TABLE `tbr_equipo_item_imprevistos` (
  `id_equipo_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `fecha_imprevisto` datetime NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_mov_item_imprevisto` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_imprevisto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_item_imprevistos` */

LOCK TABLES `tbr_equipo_item_imprevistos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_item_personal` */

DROP TABLE IF EXISTS `tbr_equipo_item_personal`;

CREATE TABLE `tbr_equipo_item_personal` (
  `id_equipo_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `id_tipo_asignacion` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_item_personal` */

LOCK TABLES `tbr_equipo_item_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_rubros_equipo_herramienta` */

DROP TABLE IF EXISTS `tbr_equipo_rubros_equipo_herramienta`;

CREATE TABLE `tbr_equipo_rubros_equipo_herramienta` (
  `id_equipo_rubro_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_equipo_herramienta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_rubros_equipo_herramienta` */

LOCK TABLES `tbr_equipo_rubros_equipo_herramienta` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_equipo_rubros_personal` */

DROP TABLE IF EXISTS `tbr_equipo_rubros_personal`;

CREATE TABLE `tbr_equipo_rubros_personal` (
  `id_equipo_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_equipo_rubros_personal` */

LOCK TABLES `tbr_equipo_rubros_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_item_combustibles` */

DROP TABLE IF EXISTS `tbr_mov_item_combustibles`;

CREATE TABLE `tbr_mov_item_combustibles` (
  `id_mov_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_combustible`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_item_combustibles` */

LOCK TABLES `tbr_mov_item_combustibles` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_item_imprevistos` */

DROP TABLE IF EXISTS `tbr_mov_item_imprevistos`;

CREATE TABLE `tbr_mov_item_imprevistos` (
  `id_mov_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha_imprevisto` date NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_imprevisto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_item_imprevistos` */

LOCK TABLES `tbr_mov_item_imprevistos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_item_personal` */

DROP TABLE IF EXISTS `tbr_mov_item_personal`;

CREATE TABLE `tbr_mov_item_personal` (
  `id_mov_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `id_tipo_asignacion` int(20) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `total` int(11) NOT NULL,
  `verificar` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_mov_item_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_item_personal` */

LOCK TABLES `tbr_mov_item_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_item_vehiculos` */

DROP TABLE IF EXISTS `tbr_mov_item_vehiculos`;

CREATE TABLE `tbr_mov_item_vehiculos` (
  `id_mov_item_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `medio_pago` varchar(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_mov_item_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_item_vehiculos` */

LOCK TABLES `tbr_mov_item_vehiculos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_rubros_personal` */

DROP TABLE IF EXISTS `tbr_mov_rubros_personal`;

CREATE TABLE `tbr_mov_rubros_personal` (
  `id_mov_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_rubros_personal` */

LOCK TABLES `tbr_mov_rubros_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbr_mov_rubros_vehiculos` */

DROP TABLE IF EXISTS `tbr_mov_rubros_vehiculos`;

CREATE TABLE `tbr_mov_rubros_vehiculos` (
  `id_mov_rubro_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbr_mov_rubros_vehiculos` */

LOCK TABLES `tbr_mov_rubros_vehiculos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_item_combustible` */

DROP TABLE IF EXISTS `tbrc_equipo_item_combustible`;

CREATE TABLE `tbrc_equipo_item_combustible` (
  `id_equipo_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_combustible`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_item_combustible` */

LOCK TABLES `tbrc_equipo_item_combustible` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_item_equipo_herramienta` */

DROP TABLE IF EXISTS `tbrc_equipo_item_equipo_herramienta`;

CREATE TABLE `tbrc_equipo_item_equipo_herramienta` (
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_equipo_herramienta` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_equipo_herramienta` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` varchar(10) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_equipo_herramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_item_equipo_herramienta` */

LOCK TABLES `tbrc_equipo_item_equipo_herramienta` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_item_imprevistos` */

DROP TABLE IF EXISTS `tbrc_equipo_item_imprevistos`;

CREATE TABLE `tbrc_equipo_item_imprevistos` (
  `id_equipo_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `fecha_imprevisto` datetime NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_mov_item_imprevisto` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_item_imprevisto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_item_imprevistos` */

LOCK TABLES `tbrc_equipo_item_imprevistos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_item_personal` */

DROP TABLE IF EXISTS `tbrc_equipo_item_personal`;

CREATE TABLE `tbrc_equipo_item_personal` (
  `id_equipo_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `id_tipo_asignacion` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  PRIMARY KEY (`id_equipo_item_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_item_personal` */

LOCK TABLES `tbrc_equipo_item_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_rubros_equipo_herramienta` */

DROP TABLE IF EXISTS `tbrc_equipo_rubros_equipo_herramienta`;

CREATE TABLE `tbrc_equipo_rubros_equipo_herramienta` (
  `id_equipo_rubro_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_equipo_herramienta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_rubros_equipo_herramienta` */

LOCK TABLES `tbrc_equipo_rubros_equipo_herramienta` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_equipo_rubros_personal` */

DROP TABLE IF EXISTS `tbrc_equipo_rubros_personal`;

CREATE TABLE `tbrc_equipo_rubros_personal` (
  `id_equipo_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo_rubro_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_equipo_rubros_personal` */

LOCK TABLES `tbrc_equipo_rubros_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_item_combustibles` */

DROP TABLE IF EXISTS `tbrc_mov_item_combustibles`;

CREATE TABLE `tbrc_mov_item_combustibles` (
  `id_mov_item_combustible` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `confirmar` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_combustible`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_item_combustibles` */

LOCK TABLES `tbrc_mov_item_combustibles` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_item_imprevistos` */

DROP TABLE IF EXISTS `tbrc_mov_item_imprevistos`;

CREATE TABLE `tbrc_mov_item_imprevistos` (
  `id_mov_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha_imprevisto` date NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_item_imprevisto`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_item_imprevistos` */

LOCK TABLES `tbrc_mov_item_imprevistos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_item_personal` */

DROP TABLE IF EXISTS `tbrc_mov_item_personal`;

CREATE TABLE `tbrc_mov_item_personal` (
  `id_mov_item_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `id_tipo_asignacion` int(20) NOT NULL,
  `fecha_inicio_mov` date NOT NULL,
  `fecha_final_mov` date NOT NULL,
  `fecha_inicio_demov` date NOT NULL,
  `fecha_final_demov` date NOT NULL,
  `total` int(11) NOT NULL,
  `verificar` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_mov_item_personal`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_item_personal` */

LOCK TABLES `tbrc_mov_item_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_item_vehiculos` */

DROP TABLE IF EXISTS `tbrc_mov_item_vehiculos`;

CREATE TABLE `tbrc_mov_item_vehiculos` (
  `id_mov_item_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `vehiculo` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `gasto_unitario` int(11) NOT NULL,
  `gasto_standby_unitario` int(11) NOT NULL,
  `medio_pago` varchar(11) NOT NULL,
  `costo_unitario_rubro` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  `fecha_inicio_gasto` date NOT NULL,
  `fecha_final_gasto` date NOT NULL,
  `fecha_inicio_gasto_standby` date NOT NULL,
  `fecha_final_gasto_standby` date NOT NULL,
  `fecha_1` date NOT NULL,
  `fecha_2` date NOT NULL,
  PRIMARY KEY (`id_mov_item_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_item_vehiculos` */

LOCK TABLES `tbrc_mov_item_vehiculos` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_rubros_personal` */

DROP TABLE IF EXISTS `tbrc_mov_rubros_personal`;

CREATE TABLE `tbrc_mov_rubros_personal` (
  `id_mov_rubro_personal` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_rubros_personal` */

LOCK TABLES `tbrc_mov_rubros_personal` WRITE;

UNLOCK TABLES;

/*Table structure for table `tbrc_mov_rubros_vehiculos` */

DROP TABLE IF EXISTS `tbrc_mov_rubros_vehiculos`;

CREATE TABLE `tbrc_mov_rubros_vehiculos` (
  `id_mov_rubro_vehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  PRIMARY KEY (`id_mov_rubro_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tbrc_mov_rubros_vehiculos` */

LOCK TABLES `tbrc_mov_rubros_vehiculos` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
