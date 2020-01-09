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

insert  into `sessions`(`session_id`,`expires`,`data`) values ('0-GULv-JTVjav1i5uOY4f2xLla8joSqX',1578688491,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),('6IEN-z4-cfFozfe1X-3rXyhgYxUC1hRU',1578665866,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),('L7p616s4bE2ZFVJBMQCubnfgaHh9fl7A',1578617298,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}');

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

insert  into `tb_bases`(`id_base`,`nombre_base`,`longitud_base`,`latitud_base`,`estado_base`,`fecha_registro`,`id_personal`) values (1,'NEIVA','-75.316669905215460','2.939732122880684',1,'2019-08-04 17:50:31',6),(3,'VILLAVICENCIO','-73.637690499999960','4.151382200000000',1,'2019-08-04 17:50:24',6),(4,'BUCARAMANGA','-73.122741599999980','7.119349000000000',1,'2019-08-04 17:50:22',6),(5,'PUERTO BOYACA','-74.593394999999990','5.977237000000000',1,'2019-08-04 17:50:19',6),(6,'ENVIGADO','-75.5994392','6.1663544',1,'2019-08-04 17:50:17',6),(7,'MONTERIA','-75.9169897','8.7606317',2,'2019-08-04 17:50:14',6),(9,'FET','-75.29039','2.83643',1,'2019-08-05 20:16:11',6);

UNLOCK TABLES;

/*Table structure for table `tb_bitacora` */

DROP TABLE IF EXISTS `tb_bitacora`;

CREATE TABLE `tb_bitacora` (
  `id_bitacora` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_bitacora` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;

/*Data for the table `tb_bitacora` */

LOCK TABLES `tb_bitacora` WRITE;

insert  into `tb_bitacora`(`id_bitacora`,`descripcion_bitacora`,`id_user`,`fecha_registro`) values (1,'El usuario john creó una nueva base llamada NEIVA',2,'2019-07-23 09:03:15'),(2,'El usuario john modificó la base NEIVA',2,'2019-07-23 16:56:02'),(3,'El usuario john modificó la base NEIVA',2,'2019-07-23 17:10:02'),(4,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:30:40'),(5,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:34:17'),(6,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:34:28'),(7,'El usuario john creó un cargo nuevo llamado Arquitecto',2,'2019-07-23 19:56:07'),(8,'El usuario john modificó el cargo Desarrollador de software 0',2,'2019-07-23 20:22:08'),(9,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 20:22:43'),(10,'El usuario john creó la unidad de medida MINUTOS',2,'2019-07-23 20:37:30'),(11,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 20:46:36'),(12,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:20:14'),(13,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:25:11'),(14,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:25:20'),(15,'El usuario john modificó la base NEIVA',2,'2019-07-23 22:07:21'),(16,'El usuario john modificó la base NEIVA',2,'2019-07-23 22:07:29'),(17,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 22:17:56'),(18,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 22:18:05'),(19,'El usuario john creó un tipo de pozo nuevo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 19:11:49'),(20,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO 0',2,'2019-07-24 19:33:36'),(21,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 19:33:51'),(22,'El usuario john creó un tipo de contrato nuevo llamado ORDEN DE SERVICIO',2,'2019-07-24 19:59:06'),(23,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO0',2,'2019-07-24 20:10:25'),(24,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO',2,'2019-07-24 20:10:38'),(25,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 20:30:21'),(26,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION1',2,'2019-07-24 20:51:26'),(27,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 20:52:05'),(28,'El usuario john creó una nueva moneda llamda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 21:12:35'),(29,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO1',2,'2019-07-24 21:21:58'),(30,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 21:22:21'),(31,'El usuario john creó un nuevo centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 21:51:21'),(32,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-24 21:55:28'),(33,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA 1',2,'2019-07-24 22:00:16'),(34,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 22:00:52'),(35,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 22:01:28'),(36,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 19:45:47'),(37,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 21:14:52'),(38,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 21:16:42'),(39,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 21:17:06'),(40,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 22:14:31'),(41,'El usuario john modificó el cliente con No. de documento 1072422473',2,'2019-07-26 22:32:12'),(42,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 22:33:42'),(43,'El usuario john modificó el cliente con No. de documento 123456789',2,'2019-07-26 22:34:16'),(44,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-27 22:01:47'),(45,'El usuario john creó un cargo nuevo llamado Abogado',2,'2019-07-27 22:11:03'),(46,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-28 10:44:54'),(47,'El usuario john modificó el cargo DESARROLLADOR DE SOFTWARE',6,'2019-07-28 11:34:29'),(48,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 18:03:12'),(49,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 18:03:41'),(50,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 20:08:09'),(51,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 20:58:38'),(52,'El usuario john creó un contrato nuevo con el ID 1234',6,'2019-07-29 20:50:40'),(53,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:18:39'),(54,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:21:43'),(55,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:21:55'),(56,'El usuario john creó un contrato nuevo con el ID 123',6,'2019-07-29 21:25:33'),(57,'El usuario john modificó el contrato con el ID 123',6,'2019-07-29 21:26:16'),(58,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 19:59:03'),(59,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 20:36:37'),(60,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 20:55:14'),(61,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:06'),(62,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:14'),(63,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:22'),(64,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:29'),(65,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:35'),(66,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:43'),(67,'El usuario john creó un item nuevo con el ID 123',6,'2019-07-30 21:29:04'),(68,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:29'),(69,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:38'),(70,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:47'),(71,'El usuario john modificó el campo llamado CAMPO 2',6,'2019-08-01 20:02:31'),(72,'El usuario john creó un nuevo pozo llamado POZO 1',6,'2019-08-01 20:41:40'),(73,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 20:58:35'),(74,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 20:58:44'),(75,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 1',6,'2019-08-01 21:46:49'),(76,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 21:47:32'),(77,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 21:56:31'),(78,'El usuario john creó una nueva base llamada BOGOTA',6,'2019-08-03 19:02:06'),(79,'El usuario john creó una nueva base llamada VILLAVICENCIO',6,'2019-08-03 19:02:24'),(80,'El usuario john creó una nueva base llamada BUCARAMANGA',6,'2019-08-03 19:02:40'),(81,'El usuario john creó una nueva base llamada PUERTO BOYACA',6,'2019-08-03 19:02:57'),(82,'El usuario john modificó la base BOGOTA',6,'2019-08-04 16:31:25'),(83,'El usuario john modificó la base BOGOTA',6,'2019-08-04 16:31:36'),(84,'El usuario john modificó la base NEIVA',6,'2019-08-04 16:31:49'),(85,'El usuario john creó una nueva base llamada ENVIGADO',6,'2019-08-04 16:44:56'),(86,'El usuario john modificó la base NEIVA',6,'2019-08-04 17:00:18'),(87,'El usuario john modificó la base NEIVA',6,'2019-08-04 17:00:29'),(88,'El usuario john creó una nueva base llamada MONTERIA',6,'2019-08-04 17:01:32'),(89,'El usuario john creó una nueva base llamada BARRANQUILLA',6,'2019-08-04 17:49:29'),(90,'El usuario john modificó el cargo Abogado',6,'2019-08-04 18:13:52'),(91,'El usuario john creó un cargo nuevo llamado AUXILIAR CONTABLE',6,'2019-08-04 18:20:44'),(92,'El usuario john modificó el cargo AUXILIAR CONTABLE',6,'2019-08-04 19:00:38'),(93,'El usuario john modificó el cargo Arquitecto',6,'2019-08-04 19:00:52'),(94,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:10:45'),(95,'El usuario john modificó el cargo ARQUITECTO',6,'2019-08-04 19:10:58'),(96,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:11:11'),(97,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:38:32'),(98,'El usuario john creó una nueva base llamada FET',6,'2019-08-05 20:16:11'),(99,'El usuario john creó un contrato nuevo con el ID 123456789',6,'2019-08-05 21:14:35'),(100,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-08-05 22:00:46'),(101,'El usuario john creó un campo nuevo llamado CAMPO 3',6,'2019-08-05 22:04:14'),(102,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 09:32:51'),(103,'El usuario john creó un nuevo centro costo llamado PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA',6,'2019-08-07 09:35:28'),(104,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 09:38:04'),(105,'El usuario john modificó el item con el ID 123',6,'2019-08-07 10:40:55'),(106,'El usuario john modificó el item con el ID 123',6,'2019-08-07 10:47:18'),(107,'El usuario john modificó el item con el ID 123',6,'2019-08-07 11:56:51'),(108,'El usuario john modificó el item con el ID 123',6,'2019-08-07 11:57:00'),(109,'El usuario john creó un item nuevo con el ID 10',6,'2019-08-07 11:58:57'),(110,'El usuario john creó una nueva moneda llamada PESO COLOMBIANO',6,'2019-08-07 14:25:29'),(111,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',6,'2019-08-07 14:27:18'),(112,'El usuario john creó un personal nuevo con No. de documento 1072422473',6,'2019-08-07 15:48:58'),(113,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 21:22:01'),(114,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 21:22:24'),(115,'El usuario john modificó el personal con No. de documento 1010',6,'2019-08-09 20:16:28'),(116,'El usuario john creó un proveedor nuevo con No. de documento 1072422473',6,'2019-08-09 20:38:17'),(117,'El usuario john creó un proveedor nuevo con No. de documento 123123',6,'2019-08-09 20:42:42'),(118,'El usuario john creó un proveedor nuevo con No. de documento 332432',6,'2019-08-09 20:47:54'),(119,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 22:40:06'),(120,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 22:47:20'),(121,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-09 23:01:08'),(122,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 23:08:36'),(123,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 23:13:58'),(124,'El usuario john creó un nuevo tipo de trabajo llamado DESARROLLADOR DE SOFTWARE',6,'2019-08-10 17:10:19'),(125,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 17:17:59'),(126,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:34:18'),(127,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:35:01'),(128,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:39:46'),(129,'El usuario john modificó el tipo de trabajo llamado TRABAJO 1',6,'2019-08-10 18:40:09'),(130,'El usuario john creó un tipo de contrato nuevo llamado RENTA MENSUAL',6,'2019-08-10 18:53:06'),(131,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 18:54:39'),(132,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 18:55:39'),(133,'El usuario john creó un tipo de pozo nuevo llamado INYECTOR',6,'2019-08-10 19:20:07'),(134,'El usuario john modificó el tipo de pozo llamado INYECTOR',6,'2019-08-10 19:22:06'),(135,'El usuario john creó un nuevo tipo de equipo o herramienta llamado SODA CAUSTICA',6,'2019-08-10 19:53:09'),(136,'El usuario john creó un nuevo tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 19:54:13'),(137,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMION DE VACIO',6,'2019-08-10 19:54:45'),(138,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CHOKE MANIFOLD ',6,'2019-08-10 19:55:19'),(139,'El usuario john creó un nuevo tipo de equipo o herramienta llamado ACID TRAILER',6,'2019-08-10 19:56:09'),(140,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMA BAJA',6,'2019-08-10 19:56:44'),(141,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 21:43:40'),(142,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 21:44:31'),(143,'El usuario john modificó el personal con No. de documento 1072422473',6,'2019-08-10 21:57:39'),(144,'El usuario JOHN creó una nueva unidad de medida llamada KILOVATIOS',6,'2019-08-10 22:55:17'),(145,'El usuario JOHN modificó la unidad de medida llamada MINUTOS1',6,'2019-08-10 22:58:22'),(146,'El usuario JOHN modificó la unidad de medida llamada MINUTOS',6,'2019-08-10 22:58:40'),(147,'El usuario JOHN creó un nuevo equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 10:07:12'),(148,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:06'),(149,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:21'),(150,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:33'),(151,'El usuario JOHN creó un cargo nuevo llamado CARGO 2',6,'2019-11-05 14:50:47'),(152,'El usuario JOHN creó un cliente nuevo con No. de documento 63726372',6,'2019-11-05 14:52:07'),(153,'El usuario JOHN creó un contrato nuevo con el ID 2',6,'2019-11-05 14:53:06'),(154,'El usuario JOHN creó un campo nuevo llamado CAMPO 3',6,'2019-11-05 14:53:58'),(155,'El usuario JOHN creó un nuevo centro costo llamado CENTRO COSTO 2',6,'2019-11-05 14:54:50'),(156,'El usuario JOHN creó un personal nuevo con No. de documento 1075305650',6,'2019-11-05 15:54:28'),(157,'El usuario JOHN creó un item nuevo con el ID 66',6,'2019-12-02 11:09:51'),(158,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 13:39:16'),(159,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 13:39:29'),(160,'El usuario JOHN creó un item nuevo con el ID 09',6,'2019-12-02 13:52:53'),(161,'El usuario JOHN creó un item nuevo con el ID 010',6,'2019-12-02 13:53:37'),(162,'El usuario JOHN creó un item nuevo con el ID 011',6,'2019-12-02 13:54:16'),(163,'El usuario JOHN creó un item nuevo con el ID 012',6,'2019-12-02 13:54:58'),(164,'El usuario JOHN creó un item nuevo con el ID 0113',6,'2019-12-02 13:56:00'),(165,'El usuario JOHN creó un item nuevo con el ID 23',6,'2019-12-04 12:09:44'),(166,'El usuario JOHN creó un cargo nuevo llamado PROGRAMADOR ',6,'2019-12-19 12:14:10'),(167,'El usuario JOHN modificó el cargo PROGRAMADOR ',6,'2019-12-19 12:24:55'),(168,'El usuario JOHN creó un cliente nuevo con No. de documento 1234566123',6,'2019-12-19 12:28:55'),(169,'El usuario JOHN modificó el cliente con No. de documento 1234566123',6,'2019-12-19 12:29:08'),(170,'El usuario JOHN modificó el contrato con el ID 2',6,'2019-12-19 12:42:03'),(171,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 08:10:25'),(172,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 08:10:41'),(173,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 08:10:59'),(174,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 08:11:12'),(175,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 08:11:24'),(176,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 08:11:51'),(177,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 08:12:10'),(178,'El usuario JOHN modificó el item con el ID 8',6,'2020-01-08 08:13:35'),(179,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 08:13:46'),(180,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 08:14:05'),(181,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 08:14:13'),(182,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 08:14:23'),(183,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 08:14:45'),(184,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 08:15:56'),(185,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 08:16:04'),(186,'El usuario JOHN creó un item nuevo con el ID 15',6,'2020-01-08 08:16:59'),(187,'El usuario JOHN creó un item nuevo con el ID 9',6,'2020-01-08 08:18:56'),(188,'El usuario JOHN creó un item nuevo con el ID 10',6,'2020-01-08 08:19:26'),(189,'El usuario JOHN creó un item nuevo con el ID 11',6,'2020-01-08 08:20:03'),(190,'El usuario JOHN creó un item nuevo con el ID 13',6,'2020-01-08 08:20:45'),(191,'El usuario JOHN creó un item nuevo con el ID 14',6,'2020-01-08 08:21:22'),(192,'El usuario JOHN modificó el item con el ID 14',6,'2020-01-08 08:25:36'),(193,'El usuario JOHN modificó el rubro llamado LOOOOOIUS',6,'2020-01-08 10:17:24'),(194,'El usuario JOHN modificó el rubro llamado MILIUS',6,'2020-01-08 10:17:33');

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

insert  into `tb_campos`(`id_campo`,`nombre_campo`,`id_cliente`,`departamento_campo`,`municipio_campo`,`ubicacion_campo`,`longitud_campo`,`latitud_campo`,`estado_campo`,`fecha_registro`,`id_personal`) values (1,'CAMPO 1',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',2,'2019-08-05 22:00:46',0),(2,'CAMPO 2',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',1,'2019-08-01 20:02:31',0),(3,'CAMPO 3',1,'HUILA','NEIVA','PADRO ALTO','-75.2897','2.92504',2,'2019-08-05 22:04:14',6),(4,'CAMPO 3',2,'HUILA','NEIVS','CALLE 3 # 22-11','-100','-90',1,'2019-11-05 14:53:58',6);

UNLOCK TABLES;

/*Table structure for table `tb_cargos` */

DROP TABLE IF EXISTS `tb_cargos`;

CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` text NOT NULL,
  `estado_cargo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cargos` */

LOCK TABLES `tb_cargos` WRITE;

insert  into `tb_cargos`(`id_cargo`,`nombre_cargo`,`estado_cargo`,`fecha_registro`,`id_personal`) values (1,'DESARROLLADOR DE SOFTWARE',1,'2019-08-04 18:37:49',6),(2,'ARQUITECTO',1,'2019-08-04 19:10:58',6),(3,'ABOGADO',1,'2019-08-04 19:11:11',6),(4,'AUXILIAR CONTABLE',2,'2019-08-04 18:20:44',6),(5,'CARGO 2',1,'2019-11-05 14:50:46',6);

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

insert  into `tb_centro_costos`(`id_centro_costo`,`nombre_centro_costo`,`abreviatura_centro_costo`,`estado_centro_costo`,`fecha_registro`,`id_personal`) values (1,'TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA','TPC',1,'2019-08-07 09:38:03',0),(2,'PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA','PES',2,'2019-08-07 09:35:28',6);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_clientes` */

LOCK TABLES `tb_clientes` WRITE;

insert  into `tb_clientes`(`id_cliente`,`tipo_documento_cliente`,`numero_documento_cliente`,`regimen_cliente`,`direccion_cliente`,`razon_social_cliente`,`email_cliente`,`telefono_cliente`,`extension_cliente`,`contacto_cliente`,`telefono_contacto_cliente`,`extension_contacto_cliente`,`pais_cliente`,`departamento_cliente`,`ciudad_cliente`,`estado_cliente`,`actividad_economica_cliente`,`fecha_registro`,`id_personal`) values (1,'PASAPORTE','123456789','Simplificado','BOGOTA','MASTER PAYS','INFO@DATIFI.COM','3507518916','12','LEONARDO JIMENEZ','3115364067','90','COLOMBIA','HUILA','NEIVA',1,'                                                  HELLO WORD\r\n                                              ','2019-07-26 22:34:16',0),(2,'PASAPORTE','63726372','Común','calle 8 #48-400','RAZON SOCIAL 2','correo@gmail.com','31532328392','57','hola','28372838','57','Colombia','Huila','Neiva',1,'wefwefhweufh','2019-11-05 14:52:07',0);

UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `tb_consignacion` */

LOCK TABLES `tb_consignacion` WRITE;

insert  into `tb_consignacion`(`id_consignacion`,`id_planeacion`,`id_personal`,`fecha`,`estado`,`descripcion`,`observaciones`,`pozo`,`solicitante`,`servicio`,`dias`,`trasporte`,`cliente`,`estado_legalizado`,`costo_legalizacion`,`costo_cotizacion`,`sobrante_legalizacion`,`quien_acepta`) values (12,'7','6','2019-11-24 00:00:00','no aprobado',NULL,NULL,'pozo','JOHN','12312',0,'palaca','ECOPETROL',0,0,200400,0,6),(15,'7','6','2021-12-21 00:00:00','no aprobado',NULL,NULL,'pozo','JOHN','no se nada de estooooooo  pero es els rrvio',6,'ÑPL123','ECOPETROL',0,0,289729,0,6),(19,'0','10','2020-01-15 00:00:00','no aprobado',NULL,'las obesertaciones son estas','POZO EL AGUITA','JOHN JAIRO NARVAEZ TAMAYO','servicio',15,'ÑPL123','ECOPETROL',0,0,253000,0,6),(20,'7','6','2020-01-14 00:00:00','no aprobado',NULL,NULL,'POZO EL AGUITA','JOHN JAIRONARVAEZ TAMAYO','servicio',6,'ÑOLP','ACUMULDARO',0,0,1060600,0,9);

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
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_consignacion_detalles` */

LOCK TABLES `tb_consignacion_detalles` WRITE;

insert  into `tb_consignacion_detalles`(`id`,`id_item`,`cantidad`,`valor_unitario`,`costo_total_item`,`id_consignacion`) values (25,3,0,0,0,4),(26,1,2,200,400,4),(27,2,4,788888888,2147483647,4),(28,4,0,0,0,4),(29,5,0,0,0,4),(30,6,0,0,0,4),(31,7,0,0,0,4),(32,8,0,0,0,4),(89,3,0,0,0,12),(90,1,2,200,400,12),(91,2,0,0,0,12),(92,4,40,5000,200000,12),(93,5,0,0,0,12),(94,6,0,0,0,12),(95,7,0,0,0,12),(96,8,0,0,0,12),(113,2,123,2323,285729,15),(114,1,2,2000,4000,15),(115,3,0,0,0,15),(116,4,0,0,0,15),(117,5,0,0,0,15),(118,6,0,0,0,15),(119,7,0,0,0,15),(120,8,0,0,0,15),(145,3,0,0,0,19),(146,2,40,100,4000,19),(147,1,2,20000,40000,19),(148,4,0,0,0,19),(149,5,0,0,0,19),(150,6,0,0,0,19),(151,8,0,0,0,19),(152,9,40,1200,48000,19),(153,7,0,0,0,19),(154,10,0,0,0,19),(155,12,23,3000,69000,19),(156,13,23,4000,92000,19),(157,14,0,0,0,19),(158,11,0,0,0,19),(159,10,0,0,0,20),(160,1,235,200,47000,20),(161,2,30,3000,90000,20),(162,3,0,0,0,20),(163,4,0,0,0,20),(164,5,0,0,0,20),(165,6,0,0,0,20),(166,7,12,300,3600,20),(167,8,0,0,0,20),(168,9,0,0,0,20),(169,11,0,0,0,20),(170,12,230,4000,920000,20),(171,13,0,0,0,20),(172,14,0,0,0,20);

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

insert  into `tb_contratos`(`id_contrato`,`numero_contrato`,`descripcion_contrato`,`fecha_inicio_contrato`,`fecha_fin_contrato`,`bolsa_contrato`,`id_moneda`,`id_tipo_contrato`,`id_cliente`,`estado_contrato`,`fecha_registro`,`id_personal`) values (1,'123','CONTRATO 1','2019-07-29','2019-07-30','BOLSA DE PRUEBA',1,1,1,2,'2019-07-29 21:26:16',0),(3,'2','CONTRATO 2','2019-11-20','2019-12-07','28',1,1,1,1,'2019-12-19 12:42:03',6);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_costos_fijos` */

LOCK TABLES `tb_costos_fijos` WRITE;

insert  into `tb_costos_fijos`(`id_costo_fijo`,`descripcion_costo_fijo`,`cantidad_costo_fijo`,`precio_costo_fijo`,`total_costo_fijo`,`estado_costo_fijo`,`id_cargo`,`id_contrato`,`id_personal`,`fecha_registro`) values (1,'ENERGÍA','0','0','0',1,4,NULL,6,'2019-08-05 21:07:57'),(2,'ASDASD','-14','24','0',1,6,NULL,6,'2019-12-19 12:18:47');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cotizaciones` */

LOCK TABLES `tb_cotizaciones` WRITE;

insert  into `tb_cotizaciones`(`id_cotizacion`,`id_planeacion`,`titulo`,`credito`,`trm`,`consecutivo`,`descuento`) values (6,3,'wqidij',0,2999,'0',0),(7,5,'titulo 2',0,5000,'0',0),(8,4,'ewijfijwefij',0,1000,'0',0),(16,7,'cotizacion 10',0,3100,'0',0);

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `tb_cotizaciones_costos` */

LOCK TABLES `tb_cotizaciones_costos` WRITE;

insert  into `tb_cotizaciones_costos`(`id_cotizacion_costo`,`id_cotizacion`,`id_planeacion`,`tipo`,`descripcion`,`cantidad`,`id_unidad_medida`,`precio`,`id_moneda`) values (11,16,7,1,'prueba de costo',2,2,2000,2),(12,16,7,2,'prueba de costo 2',3,2,1000,1),(13,16,7,2,'',5,2,50000,2);

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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_combustible` */

LOCK TABLES `tb_equipo_item_combustible` WRITE;

insert  into `tb_equipo_item_combustible`(`id_equipo_item_combustible`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`id_moneda`,`cantidad`,`costo_unitario`,`medio_pago`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`,`id_mov_item_personal`,`id_mov_item_vehiculo`,`id_equipo_item_personal`,`id_equipo_item_equipo_herramienta`,`confirmar`) values (67,7,2,1,2,0,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0),(70,7,2,3,1,2,20,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,1),(71,7,1,3,1,0,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0,0,0);

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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_equipo_herramienta` */

LOCK TABLES `tb_equipo_item_equipo_herramienta` WRITE;

insert  into `tb_equipo_item_equipo_herramienta`(`id_equipo_item_equipo_herramienta`,`id_planeacion`,`id_tipo_equipo_herramienta`,`vehiculo`,`carga`,`id_equipo_herramienta`,`cantidad`,`id_unidad_medida`,`id_rubro`,`id_moneda`,`medio_pago`,`costo_unitario`,`observaciones`,`id_mov_item_vehiculo`,`gasto_unitario`,`gasto_standby_unitario`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`) values (57,7,0,1,1,0,0,2,2,2,'2',1000,'djdjdjd',0,1000,1000,'2019-10-30','2019-10-31','2019-11-19','2019-11-20','2019-12-01','2019-12-11'),(59,7,0,1,1,1,2,2,2,2,'1',1000,'jwidjwij',46,500,5000,'2019-11-01','2019-11-04','2019-11-19','2019-11-20','2019-11-17','2019-11-19');

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_item_personal` */

LOCK TABLES `tb_equipo_item_personal` WRITE;

insert  into `tb_equipo_item_personal`(`id_equipo_item_personal`,`id_planeacion`,`id_cargo`,`id_personal`,`id_unidad_medida`,`id_moneda`,`cantidad`,`costo`,`id_tipo_asignacion`,`costo_unitario_rubro`,`medio_pago`,`id_rubro`,`id_mov_item_personal`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`) values (52,7,1,6,1,2,0,166667,0,1000,2,2,50,'2019-11-03','2019-11-04','2019-11-24','2019-11-27'),(54,7,2,6,2,2,0,166667,3,0,1,1,52,'2019-11-10','2019-11-13','0000-00-00','0000-00-00');

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_rubros_equipo_herramienta` */

LOCK TABLES `tb_equipo_rubros_equipo_herramienta` WRITE;

insert  into `tb_equipo_rubros_equipo_herramienta`(`id_equipo_rubro_equipo_herramienta`,`id_equipo_item_equipo_herramienta`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (14,58,7,2,1,1,3,4000,1),(15,58,7,1,4,2,4,2000,2),(16,57,7,2,1,2,5,5000,1),(17,58,7,2,1,2,5,5000,1),(18,59,7,2,1,2,5,5000,1),(19,60,7,2,1,2,5,5000,1),(20,61,7,1,1,2,2,2000,2),(21,61,7,1,3,2,10,10000,2),(22,57,7,1,1,2,2,2000,2),(23,58,7,1,1,2,2,2000,2),(24,59,7,1,1,2,2,2000,2),(25,60,7,1,1,2,2,2000,2),(26,61,7,1,1,2,2,2000,2),(27,59,7,2,3,2,3,3000,2),(28,60,7,2,3,2,3,3000,2),(29,61,7,2,3,2,3,3000,2),(30,57,7,1,3,1,2,2000,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `tb_equipo_rubros_personal` */

LOCK TABLES `tb_equipo_rubros_personal` WRITE;

insert  into `tb_equipo_rubros_personal`(`id_equipo_rubro_personal`,`id_equipo_item_personal`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (8,51,7,2,1,1,2,2000,1),(9,51,7,2,1,1,1,2000,1),(10,51,7,1,3,2,10,5000,2),(11,51,7,2,1,1,20,20000,2),(12,50,7,2,3,2,3,3000,1),(13,51,7,2,3,2,3,3000,1),(14,52,7,2,3,2,3,3000,1),(15,51,7,2,1,1,2,2000,1),(16,51,7,2,4,2,50,1000,2),(17,52,7,2,4,2,50,1000,2),(18,52,7,2,1,2,2,2000,1),(19,52,7,1,1,1,2,3000,1);

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

insert  into `tb_equipos`(`id_equipo`,`nombre_equipo`,`descripcion_equipo`,`codigo_equipo`,`placa_equipo`,`id_proveedor`,`tuberia_equipo`,`alto_equipo`,`ancho_equipo`,`largo_equipo`,`diametro_equipo`,`ejes_equipo`,`peso_cargado_equipo`,`capacidad_equipo`,`dia_equipo`,`peso_base_equipo`,`marca_equipo`,`arriendo_equipo`,`fecha_inicio_tecno_equipo`,`fecha_fin_tecno_equipo`,`doc_tecnomecanica_equipo`,`fecha_inicio_propiedad_equipo`,`fecha_fin_propiedad_equipo`,`doc_tarjeta_propiedad_equipo`,`fecha_inicio_soat_equipo`,`fecha_fin_soat_equipo`,`doc_soat_equipo`,`fecha_inicio_grua_equipo`,`fecha_fin_grua_equipo`,`doc_grua_equipo`,`fecha_inicio_lmi_equipo`,`fecha_fin_lmi_equipo`,`doc_lmi_equipo`,`color_equipo`,`fecha_inicio_pliza_equipo`,`fecha_fin_pliza_equipo`,`doc_poliza_equipo`,`modelo_equipo`,`propietario_equipo`,`fecha_inicio_luz_equipo`,`fecha_fin_luz_equipo`,`doc_luz_equipo`,`fecha_inicio_licencia_equipo`,`fecha_fin_licencia_equipo`,`doc_licencia_equipo`,`fecha_inicio_inspeccion_equipo`,`fecha_fin_inspeccion_equipo`,`doc_inspeccion_equipo`,`id_tipo_equipo_herramienta`,`fecha_inicio_king_equipo`,`fecha_fin_king_equipo`,`doc_king_equipo`,`fecha_inicio_resolucion_equipo`,`fecha_fin_resolucion_equipo`,`doc_resolucion_equipo`,`estado_equipo`,`id_personal`,`fecha_registro`) values (1,'MOTOCIERRA','PARACO HP','PARA90','CRT07',1,'ACERO','13','56','150','68','12','80','23',15,'45','LA MEJOR',1,'2019-08-06','2019-08-20','1.pdf','2019-08-21','2019-08-23','2.pdf','2019-08-29','2019-08-21','3.pdf','2019-08-30','2019-08-21','4.pdf','2019-08-22','2019-08-21','5.pdf','ROJO','2019-08-16','2019-08-21','6.pdf','2019','JOHN JAIRO NARVAEZ TAMAYO','2019-08-21','2019-08-13','7.pdf','2019-08-23','2019-08-20','8.pdf','2019-08-22','2019-08-21','9.pdf',2,'2019-08-14','2019-08-14','10.pdf','2019-08-14','2019-08-21','11.pdf',1,6,'2019-09-21 16:53:22');

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tb_gestion_bonos` */

LOCK TABLES `tb_gestion_bonos` WRITE;

insert  into `tb_gestion_bonos`(`id_bonos`,`id_personal`,`id_planeacion`,`fecha`,`fecha_inicio`,`fecha_final`,`centro_de_costo`,`dias`,`valor_bono`,`tipo_bono`,`valor_bono_total`,`cantidad_festivos`) values (12,6,7,'2019-11-02','2019-12-02','2019-11-23','123124',21,40000,'1',10000,'1'),(13,6,7,'2019-10-01','2019-12-01','2019-10-15','123124',14,1000000,'2',20000,'1'),(14,6,7,'2019-09-01','2019-12-01','2019-12-15','123124',14,1000000,'2',15000,'3'),(19,6,0,'2019-12-10','2019-12-10','2019-12-24','puebr444',14,33333333,'3',466666662,NULL),(20,10,0,'2019-12-01','2019-12-01','2019-12-10','q24123',9,30000,'3',270000,NULL),(21,10,0,'2019-12-01','2019-12-01','2019-12-10','puebra 5',9,30000,'3',270000,NULL),(22,6,7,'2019-08-01','2019-12-01','2019-08-15','puebra numero 6',14,0,'3',0,NULL),(25,8,0,'2020-12-10','2020-12-10','2020-12-22','puebra2222222324123',12,5000000,'3',60000000,NULL),(26,9,0,'2021-02-08','2021-02-08','2021-02-17','20221',9,2000000,'2',18000000,NULL),(27,9,0,'2019-12-01','2019-12-01','2019-12-15','12312',14,3000,'3',42000,NULL),(28,8,0,'2019-12-01','2019-12-01','2019-12-15','peubra numero 5',15,1000000,'1',15000000,NULL),(29,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'0'),(30,8,0,'2019-12-01','2019-12-01','2019-12-25','puebra222222',25,1000000,'1',25000000,'3'),(31,9,0,'2020-01-01','2020-01-01','2020-01-05','puebra222222',5,2000000,'2',10000000,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `tb_item` */

LOCK TABLES `tb_item` WRITE;

insert  into `tb_item`(`id_item`,`numero_item`,`descripcion_item`,`cantidad_item`,`valor_item`,`bodega_item`,`marca_item`,`categoria_item`,`estado_item`,`fecha_registro`,`id_personal`) values (1,'1','MANUTENCION','2','200.000','PRINCIPAL','NIKE',7,1,'2020-01-08 08:13:46',0),(2,'2','ALOJAMINETO','0','0','0','0',7,1,'2020-01-08 08:14:05',6),(3,'3','HIDATRACION','0','0','0','0',7,1,'2020-01-08 08:14:13',0),(4,'4','LAVANDERIA','0','0','0','0',7,1,'2020-01-08 08:14:23',0),(5,'5','PASAJES','0','0','0','0',7,1,'2020-01-08 08:14:45',0),(6,'6','TAXIS Y BUSES','0','0','0','0',7,1,'2020-01-08 08:15:56',0),(7,'7','COMBUSTIBLES','0','0','0','0',7,1,'2020-01-08 08:16:04',0),(8,'8','PEAJES','0','0','0','0',7,1,'2020-01-08 08:13:35',0),(9,'9','MANTENIMIENTO','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:25:00',6),(10,'10','OPERACION','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:54',6),(11,'11','QUIMICA','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:49',6),(12,'12','ANTICIPO A TERCEROS','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:24:42',6),(13,'13','OTROS','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:20:45',6),(14,'14','IMPREVISTO 10%','0','0','NO APLICA','NO APLICA',7,1,'2020-01-08 08:25:35',6);

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

insert  into `tb_monedas`(`id_moneda`,`nombre_moneda`,`abreviatura_moneda`,`estado_moneda`,`fecha_registro`,`id_personal`) values (2,'PESO COLOMBIANO','COP',1,'2019-08-07 14:25:29',6);

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_combustibles` */

LOCK TABLES `tb_mov_item_combustibles` WRITE;

insert  into `tb_mov_item_combustibles`(`id_mov_item_combustible`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`id_moneda`,`costo_unitario`,`medio_pago`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`,`id_mov_item_personal`,`id_mov_item_vehiculo`,`confirmar`) values (52,7,1,1,1,2,0,3000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,0),(54,7,2,3,1,20,2,2000,1,'0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00','0000-00-00',0,0,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_personal` */

LOCK TABLES `tb_mov_item_personal` WRITE;

insert  into `tb_mov_item_personal`(`id_mov_item_personal`,`id_planeacion`,`id_cargo`,`id_personal`,`id_unidad_medida`,`cantidad`,`id_moneda`,`medio_pago`,`costo_unitario_rubro`,`id_rubro`,`id_equipo`,`id_tipo_asignacion`,`fecha_inicio_mov`,`fecha_final_mov`,`fecha_inicio_demov`,`fecha_final_demov`,`total`,`verificar`) values (49,7,2,6,1,1,2,1,36000,1,1,2,'2019-11-03','2019-11-04','2019-11-24','2019-11-27',166667,0),(50,7,1,6,1,2,2,2,1000,2,1,2,'2019-11-03','2019-11-04','2019-11-24','2019-11-27',333333,0),(51,7,4,6,2,4,2,1,0,1,1,2,'2019-11-17','2019-11-21','0000-00-00','0000-00-00',666667,0),(52,7,2,6,2,3,2,1,0,1,1,3,'2019-11-10','2019-11-13','0000-00-00','0000-00-00',500000,0);

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_item_vehiculos` */

LOCK TABLES `tb_mov_item_vehiculos` WRITE;

insert  into `tb_mov_item_vehiculos`(`id_mov_item_vehiculo`,`id_planeacion`,`vehiculo`,`carga`,`id_unidad_medida`,`id_moneda`,`gasto_unitario`,`gasto_standby_unitario`,`medio_pago`,`costo_unitario_rubro`,`id_rubro`,`observaciones`,`fecha_inicio_gasto`,`fecha_final_gasto`,`fecha_inicio_gasto_standby`,`fecha_final_gasto_standby`,`fecha_1`,`fecha_2`) values (46,7,1,1,2,2,500,5000,'1',1000,2,'jwidjwij','2019-11-01','2019-11-04','0000-00-00','0000-00-00','2019-11-17','2019-11-19'),(47,7,1,1,1,2,2000,5000,'1',1000,1,'ijwofjowefj','2019-11-01','2019-11-04','0000-00-00','0000-00-00','2019-11-17','2019-11-19'),(48,7,1,1,1,2,3000,5000,'2',0,1,'prueba de contado','2019-11-01','2019-11-04','0000-00-00','0000-00-00','2019-11-17','2019-11-19');

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_rubros_personal` */

LOCK TABLES `tb_mov_rubros_personal` WRITE;

insert  into `tb_mov_rubros_personal`(`id_mov_rubro_personal`,`id_mov_item_personal`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (18,50,7,1,1,1,2,3000,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `tb_mov_rubros_vehiculos` */

LOCK TABLES `tb_mov_rubros_vehiculos` WRITE;

insert  into `tb_mov_rubros_vehiculos`(`id_mov_rubro_vehiculo`,`id_mov_item_vehiculo`,`id_planeacion`,`id_item`,`id_rubro`,`id_unidad_medida`,`cantidad`,`costo_unitario`,`medio_pago`) values (13,47,7,2,3,2,3,3000,2),(14,48,7,2,3,2,3,3000,2);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `tb_personal` */

LOCK TABLES `tb_personal` WRITE;

insert  into `tb_personal`(`id`,`nombre_personal`,`apellido_personal`,`numero_documento_personal`,`fecha_expedicion_personal`,`lugar_expedicion_personal`,`fecha_nacimiento_personal`,`lugar_nacimiento_personal`,`edad_personal`,`rh_personal`,`genero_personal`,`telefono_personal`,`telefono_residencia_personal`,`direccion_residencia_personal`,`ciudad_personal`,`correo_corporativo_personal`,`correo_personal`,`profesion_personal`,`experiencia_personal`,`contrato_personal`,`id_cargo`,`id_base`,`fecha_ingreso_personal`,`fecha_retiro_personal`,`salario_personal`,`bono_otros`,`bono_salarial_personal`,`bono_no_salarial_personal`,`eps_personal`,`fecha_eps_personal`,`pension_personal`,`fecha_pension_personal`,`cesantias_personal`,`arl_personal`,`fecha_arl_personal`,`fecha_parafiscales_personal`,`sena_personal`,`icbf_personal`,`caja_personal`,`accidente_personal`,`accidente_telefono_personal`,`estado_personal`,`username`,`password`,`foto_personal`,`firma_personal`,`modulo_operaciones`,`generar_ticket`,`horas_trabajo`,`planeacion`,`gestion_template`,`reportes`,`control_costos`,`permiso_aceptar`,`consignaciones`,`legalizacion`,`gestion_bonos`,`reportes_costos`,`movilizacion`,`aprobacion`,`ctrl_movilizacion`,`consultas`,`configuracion_general`,`bases`,`cargos`,`clientes`,`contratos`,`campos`,`centro_costos`,`equipo_herramienta`,`item`,`moneda`,`personal`,`proveedores`,`pozos`,`rubros`,`tipo_trabajos`,`tipo_contratos`,`tipo_pozos`,`tipo_equipos`,`usuarios`,`unidad_medida`,`festivos`,`bitacora`,`fecha_registro`,`id_personal`,`fecha_conexion_personal`) values (6,'JOHN JAIRO','NARVAEZ TAMAYO','1082215681','2019-07-17','YAGUARA HUILA','2019-07-02','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-17','2019-07-17',5000000,0,1000000,2000000,'SANITAS','2019-07-17','PORVENIR','2019-07-17','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','MIGUEL ANGEL NARVAEZ','3507518916',1,'JOHN','$2a$10$REyQIUTThUwceovFLwlYXecjdBCsPGKVgr0Jf4Yi3izpHEg2iwY2y','foto.png','',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-07 08:18:38',0,'2019-12-20 13:03:11.607'),(8,'LEONARDO ','JIMENEZ','1010','2019-07-02','NEIVA-HUILA','2019-07-25','NEIVA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','ELMEJOR@GMAIL.COM','ELMEJOR@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-25','2019-07-29',4000000,0,500000,1000000,'SANITAS','2019-07-25','PORVENIR','2019-07-19','PORVENIR','BOLIVAR','2019-07-26','2019-07-27','NO','NO','COMFAMILIAR','EL MEJOR','123',1,'CAMILA','$2a$10$acwnbmmB5Avt2BBzc.cO3uMNLq6traXvmMmaR5N3EMy3zLjUanVye','','descarga.png',1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-08 08:59:00',0,'2019-08-10 22:49:51'),(9,'NATALIA ','NARAJO NARVAEZ','1072422473','2019-08-07','YAGUARA HUILA','2019-08-07','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-31','2019-08-10',3000000,0,2000000,1000000,'SANITAS','2019-07-17','PORVENIR','2019-08-07','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','JOHN JAIRO NARVAEZ','3507518916P',1,'S','$2a$10$xRf8t5XWl2/HKDX7miWvpeNgpR0LiYdLXw97DcuJvvG9mTnpFY.zW','','',1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-08 08:58:54',6,'2019-08-10 22:48:49'),(10,'JUAN MANUEL','CUELLAR BAHAMON','1075305650','291029','EFIEJ','2019-11-11','NEIVA','22','O+','MASCULINO','8293829','3227382','CALLE 8 #48-400','NEIVA','CORREO@GMAIL.COM','CORREO2@GMAIL.COM','KWDWOKD','WIJDIWJ','WIJDIWJ',1,1,'2019-11-17','2019-11-22',12912,0,2832387,2738237,'NUEVA EPS','2019-11-19','NO TENGO','2019-11-27','EFKEFKQ','NO TENGO','2019-11-24','2019-11-29','EFEWF','WEFWEF','EWFEW','WEFWEFWEF','239293',1,'MANUEL','$2a$10$FUL7XgGYBa0ek1KctkY3bekts6LnVhYetVQeEvLBmt2wKwlRh7M/m','','',1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-08 08:58:53',6,'2019-11-05 15:56:39.282');

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

insert  into `tb_planeacion`(`id_planeacion`,`titulo`,`id_cliente`,`contacto`,`telefono`,`email`,`fecha_contacto`,`hora_contacto`,`id_personal`,`id_centro_costo`,`fecha_estimada`,`id_contrato`,`alojamiento`,`combustible`,`iluminacion`,`seguridad_fisica`,`personal`,`id_campo`,`id_personal_supervisor`,`id_moneda`,`objetivo_trabajo`,`requisitos_hse`,`observacion`,`trm`,`estado`) values (7,'ya modifica la planeacionhshshs',1,'juan manuel hellow','31532328392','juanmanuelcuellarbahamon123@gmail.c','2019-10-13','14:22:00',6,2,'2019-10-15',2,2,1,2,1,1,3,8,2,'objetivo del trabajo','requisito hse','observacion del servicio',3000,'Ejecucion'),(8,'planeacion 2',1,'yo mismo','3222879918','juan_cuellarba@gmail.com','2019-11-24','02:00:00',10,2,'2019-11-29',3,2,1,1,1,1,2,8,2,'objetivo','requisito','bueno',2000,'Cotizacion');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_pozos` */

LOCK TABLES `tb_pozos` WRITE;

insert  into `tb_pozos`(`id_pozo`,`nombre_pozo`,`id_campo`,`id_tipo_pozo`,`estado_pozo`,`fecha_registro`,`id_personal`) values (1,'POZO 1',1,1,2,'2019-08-09 23:01:07',0);

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

insert  into `tb_proveedor`(`id_proveedor`,`tipo_documento_proveedor`,`numero_documento_proveedor`,`regimen_proveedor`,`rut_proveedor`,`razon_social_proveedor`,`contacto_proveedor`,`email_proveedor`,`telefono_proveedor`,`extension_proveedor`,`pais_proveedor`,`departamento_proveedor`,`ciudad_proveedor`,`direccion_proveedor`,`categoría_proveedor`,`area_influencia_proveedor`,`banco_proveedor`,`tipo_banco_proveedor`,`numero_cuenta_proveedor`,`seguridad_social_proveedor`,`certificado_bancario_proveedor`,`estado_proveedor`,`actividad_economica_proveedor`,`fecha_registro`,`id_personal`) values (2,'CEXTRANJERIA','1072422473','Común','1234','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Herr.Superficie','SI','BANCOLOMBIA','Corriente','1212312','12312','',1,'hola mundo','2019-08-09 20:38:17',6),(3,'CEDULA','123123','Común','23123','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Mantenimiento','SI','BANCOLOMBIA','Corriente','1212312','SI','1.pdf',2,'2312312','2019-08-09 20:42:42',6),(4,'NIT','332432','Simplificado','32423','OPISOFT SAS','JOHN JAIRO NARVAEZ TAMAYO','JOHN@OPISOFT.COM','3115364067','87','COLOMBIA','HUILA','NEIVA','CALLE 6 # 7A-18','Operacion','SI','BANCOLOMBIA','Corriente','1212312','SI','1.pdf',1,'','2019-08-09 20:47:53',6);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_rubros` */

LOCK TABLES `tb_rubros` WRITE;

insert  into `tb_rubros`(`id_rubro`,`sigla_rubro`,`nombre_rubro`,`estado_rubro`,`fecha_registro`,`id_personal`) values (1,'AM','ALOJAMIENTO Y MANUTENCION',1,'2019-07-24 20:52:05',0),(2,'AM','ALOJAMIENTO Y MANUTENCION',2,'2019-08-09 23:08:36',6),(3,'PU','MILIUS',1,'2020-01-08 10:17:33',0),(4,'PM','LOOOOOIUS',1,'2020-01-08 10:17:24',6);

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
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_contrato`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_contratos` */

LOCK TABLES `tb_tipo_contratos` WRITE;

insert  into `tb_tipo_contratos`(`id_tipo_contrato`,`nombre_tipo_contrato`,`estado_tipo_contrato`,`fecha_registro`,`id_personal`) values (1,'ORDEN DE SERVICIO',1,'2019-07-24 20:10:37',0);

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

insert  into `tb_tipo_equipos_herramientas`(`id_tipo_equipo_herramienta`,`nombre_equipo_herramienta`,`imagen_equipo_herramienta`,`estado_equipo_herramienta`,`id_personal`,`fecha_registro`) values (1,'SODA CAUSTICA','descarga.jpg',1,6,'2019-08-10 19:53:09'),(2,'COILED TUBING','arches.jpg',2,6,'2019-08-10 21:44:31'),(3,'CAMION DE VACIO','camion-de-vacio-6.000-6.jpg',2,6,'2019-08-10 20:22:58'),(4,'CHOKE MANIFOLD ','a00402d316134727bf6552478e461472.jpg',1,6,'2019-08-10 19:55:19'),(5,'ACID TRAILER','descarga (1).jpg',1,6,'2019-08-10 19:56:09'),(6,'CAMA BAJA','515.jpg',1,6,'2019-08-10 19:56:44');

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

insert  into `tb_tipo_pozos`(`id_tipo_pozo`,`nombre_tipo_pozo`,`estado_tipo_pozo`,`fecha_registro`,`id_personal`) values (1,'PRODUCTOR DE CRUDO',1,'2019-07-24 19:33:51',0),(2,'INYECTOR',2,'2019-08-10 19:22:06',6);

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

insert  into `tb_tipo_trabajos`(`id_tipo_trabajo`,`descripcion_tipo_trabajo`,`promedio_costo_tipo_trabajo`,`imagen_tipo_trabajo`,`promedio_personal_tipo_estado`,`estado_tipo_trabajo`,`fecha_registro`,`id_personal`) values (1,'TRABAJO 1','12','desarrollador-de-software.jpg','987654321',1,'2019-08-10 18:40:09',0),(2,'TRABAJO 2','123456789','desarrollador-de-software.jpg','987654321',2,'2019-08-10 18:39:46',0),(3,'DESARROLLADOR DE SOFTWARE','12','desarrollador-de-software.jpg','12',1,'2019-08-10 17:10:19',6);

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

insert  into `tb_unidad_medida`(`id_unidad_medida`,`nombre_unidad_medida`,`abreviatura_unidad_medida`,`estado_unidad_medida`,`fecha_registro`,`id_personal`) values (1,'MINUTOS','MIN',1,'2019-08-10 22:58:40',0);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
