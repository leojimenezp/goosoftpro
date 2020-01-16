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

/*Table structure for table `tb_bitacora` */

DROP TABLE IF EXISTS `tb_bitacora`;

CREATE TABLE `tb_bitacora` (
  `id_bitacora` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion_bitacora` TEXT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `antes` mediumtext DEFAULT NULL,
  `despues` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=latin1;

/*Data for the table `tb_bitacora` */

LOCK TABLES `tb_bitacora` WRITE;

insert  into `tb_bitacora`(`id_bitacora`,`descripcion_bitacora`,`id_user`,`fecha_registro`,`antes`,`despues`) values (1,'El usuario john creó una nueva base llamada NEIVA',2,'2019-07-23 09:03:15',NULL,NULL),(2,'El usuario john modificó la base NEIVA',2,'2019-07-23 16:56:02',NULL,NULL),(3,'El usuario john modificó la base NEIVA',2,'2019-07-23 17:10:02',NULL,NULL),(4,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:30:40',NULL,NULL),(5,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:34:17',NULL,NULL),(6,'El usuario john modificó la base NEIVA',2,'2019-07-23 19:34:28',NULL,NULL),(7,'El usuario john creó un cargo nuevo llamado Arquitecto',2,'2019-07-23 19:56:07',NULL,NULL),(8,'El usuario john modificó el cargo Desarrollador de software 0',2,'2019-07-23 20:22:08',NULL,NULL),(9,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 20:22:43',NULL,NULL),(10,'El usuario john creó la unidad de medida MINUTOS',2,'2019-07-23 20:37:30',NULL,NULL),(11,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 20:46:36',NULL,NULL),(12,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:20:14',NULL,NULL),(13,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:25:11',NULL,NULL),(14,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-23 21:25:20',NULL,NULL),(15,'El usuario john modificó la base NEIVA',2,'2019-07-23 22:07:21',NULL,NULL),(16,'El usuario john modificó la base NEIVA',2,'2019-07-23 22:07:29',NULL,NULL),(17,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 22:17:56',NULL,NULL),(18,'El usuario john modificó el cargo Desarrollador de software ',2,'2019-07-23 22:18:05',NULL,NULL),(19,'El usuario john creó un tipo de pozo nuevo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 19:11:49',NULL,NULL),(20,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO 0',2,'2019-07-24 19:33:36',NULL,NULL),(21,'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO',2,'2019-07-24 19:33:51',NULL,NULL),(22,'El usuario john creó un tipo de contrato nuevo llamado ORDEN DE SERVICIO',2,'2019-07-24 19:59:06',NULL,NULL),(23,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO0',2,'2019-07-24 20:10:25',NULL,NULL),(24,'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO',2,'2019-07-24 20:10:38',NULL,NULL),(25,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 20:30:21',NULL,NULL),(26,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION1',2,'2019-07-24 20:51:26',NULL,NULL),(27,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',2,'2019-07-24 20:52:05',NULL,NULL),(28,'El usuario john creó una nueva moneda llamda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 21:12:35',NULL,NULL),(29,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO1',2,'2019-07-24 21:21:58',NULL,NULL),(30,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',2,'2019-07-24 21:22:21',NULL,NULL),(31,'El usuario john creó un nuevo centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 21:51:21',NULL,NULL),(32,'El usuario john modificó la unidad de medida MINUTOS',2,'2019-07-24 21:55:28',NULL,NULL),(33,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA 1',2,'2019-07-24 22:00:16',NULL,NULL),(34,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 22:00:52',NULL,NULL),(35,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',2,'2019-07-24 22:01:28',NULL,NULL),(36,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 19:45:47',NULL,NULL),(37,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 21:14:52',NULL,NULL),(38,'El usuario john creó un proveedor nuevo con No. de documento 1082215681',2,'2019-07-26 21:16:42',NULL,NULL),(39,'El usuario john modificó el proveedor con No. de documento 1082215681',2,'2019-07-26 21:17:06',NULL,NULL),(40,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 22:14:31',NULL,NULL),(41,'El usuario john modificó el cliente con No. de documento 1072422473',2,'2019-07-26 22:32:12',NULL,NULL),(42,'El usuario john creó un cliente nuevo con No. de documento 1072422473',2,'2019-07-26 22:33:42',NULL,NULL),(43,'El usuario john modificó el cliente con No. de documento 123456789',2,'2019-07-26 22:34:16',NULL,NULL),(44,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-27 22:01:47',NULL,NULL),(45,'El usuario john creó un cargo nuevo llamado Abogado',2,'2019-07-27 22:11:03',NULL,NULL),(46,'El usuario john creó un personal nuevo con No. de documento 1082215681',2,'2019-07-28 10:44:54',NULL,NULL),(47,'El usuario john modificó el cargo DESARROLLADOR DE SOFTWARE',6,'2019-07-28 11:34:29',NULL,NULL),(48,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 18:03:12',NULL,NULL),(49,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-07-28 18:03:41',NULL,NULL),(50,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 20:08:09',NULL,NULL),(51,'El usuario john creó un personal nuevo con No. de documento 1010',6,'2019-07-28 20:58:38',NULL,NULL),(52,'El usuario john creó un contrato nuevo con el ID 1234',6,'2019-07-29 20:50:40',NULL,NULL),(53,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:18:39',NULL,NULL),(54,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:21:43',NULL,NULL),(55,'El usuario john modificó el contrato con el ID 1234',6,'2019-07-29 21:21:55',NULL,NULL),(56,'El usuario john creó un contrato nuevo con el ID 123',6,'2019-07-29 21:25:33',NULL,NULL),(57,'El usuario john modificó el contrato con el ID 123',6,'2019-07-29 21:26:16',NULL,NULL),(58,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 19:59:03',NULL,NULL),(59,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 20:36:37',NULL,NULL),(60,'El usuario john creó un campo nuevo llamado CAMPO 1',6,'2019-07-30 20:55:14',NULL,NULL),(61,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:06',NULL,NULL),(62,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:14',NULL,NULL),(63,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:22',NULL,NULL),(64,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:29',NULL,NULL),(65,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:35',NULL,NULL),(66,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-07-30 20:57:43',NULL,NULL),(67,'El usuario john creó un item nuevo con el ID 123',6,'2019-07-30 21:29:04',NULL,NULL),(68,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:29',NULL,NULL),(69,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:38',NULL,NULL),(70,'El usuario john modificó el item con el ID 123',6,'2019-07-30 21:44:47',NULL,NULL),(71,'El usuario john modificó el campo llamado CAMPO 2',6,'2019-08-01 20:02:31',NULL,NULL),(72,'El usuario john creó un nuevo pozo llamado POZO 1',6,'2019-08-01 20:41:40',NULL,NULL),(73,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 20:58:35',NULL,NULL),(74,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-01 20:58:44',NULL,NULL),(75,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 1',6,'2019-08-01 21:46:49',NULL,NULL),(76,'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 21:47:32',NULL,NULL),(77,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-01 21:56:31',NULL,NULL),(78,'El usuario john creó una nueva base llamada BOGOTA',6,'2019-08-03 19:02:06',NULL,NULL),(79,'El usuario john creó una nueva base llamada VILLAVICENCIO',6,'2019-08-03 19:02:24',NULL,NULL),(80,'El usuario john creó una nueva base llamada BUCARAMANGA',6,'2019-08-03 19:02:40',NULL,NULL),(81,'El usuario john creó una nueva base llamada PUERTO BOYACA',6,'2019-08-03 19:02:57',NULL,NULL),(82,'El usuario john modificó la base BOGOTA',6,'2019-08-04 16:31:25',NULL,NULL),(83,'El usuario john modificó la base BOGOTA',6,'2019-08-04 16:31:36',NULL,NULL),(84,'El usuario john modificó la base NEIVA',6,'2019-08-04 16:31:49',NULL,NULL),(85,'El usuario john creó una nueva base llamada ENVIGADO',6,'2019-08-04 16:44:56',NULL,NULL),(86,'El usuario john modificó la base NEIVA',6,'2019-08-04 17:00:18',NULL,NULL),(87,'El usuario john modificó la base NEIVA',6,'2019-08-04 17:00:29',NULL,NULL),(88,'El usuario john creó una nueva base llamada MONTERIA',6,'2019-08-04 17:01:32',NULL,NULL),(89,'El usuario john creó una nueva base llamada BARRANQUILLA',6,'2019-08-04 17:49:29',NULL,NULL),(90,'El usuario john modificó el cargo Abogado',6,'2019-08-04 18:13:52',NULL,NULL),(91,'El usuario john creó un cargo nuevo llamado AUXILIAR CONTABLE',6,'2019-08-04 18:20:44',NULL,NULL),(92,'El usuario john modificó el cargo AUXILIAR CONTABLE',6,'2019-08-04 19:00:38',NULL,NULL),(93,'El usuario john modificó el cargo Arquitecto',6,'2019-08-04 19:00:52',NULL,NULL),(94,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:10:45',NULL,NULL),(95,'El usuario john modificó el cargo ARQUITECTO',6,'2019-08-04 19:10:58',NULL,NULL),(96,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:11:11',NULL,NULL),(97,'El usuario john modificó el cargo ABOGADO',6,'2019-08-04 19:38:32',NULL,NULL),(98,'El usuario john creó una nueva base llamada FET',6,'2019-08-05 20:16:11',NULL,NULL),(99,'El usuario john creó un contrato nuevo con el ID 123456789',6,'2019-08-05 21:14:35',NULL,NULL),(100,'El usuario john modificó el campo llamado CAMPO 1',6,'2019-08-05 22:00:46',NULL,NULL),(101,'El usuario john creó un campo nuevo llamado CAMPO 3',6,'2019-08-05 22:04:14',NULL,NULL),(102,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 09:32:51',NULL,NULL),(103,'El usuario john creó un nuevo centro costo llamado PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA',6,'2019-08-07 09:35:28',NULL,NULL),(104,'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA',6,'2019-08-07 09:38:04',NULL,NULL),(105,'El usuario john modificó el item con el ID 123',6,'2019-08-07 10:40:55',NULL,NULL),(106,'El usuario john modificó el item con el ID 123',6,'2019-08-07 10:47:18',NULL,NULL),(107,'El usuario john modificó el item con el ID 123',6,'2019-08-07 11:56:51',NULL,NULL),(108,'El usuario john modificó el item con el ID 123',6,'2019-08-07 11:57:00',NULL,NULL),(109,'El usuario john creó un item nuevo con el ID 10',6,'2019-08-07 11:58:57',NULL,NULL),(110,'El usuario john creó una nueva moneda llamada PESO COLOMBIANO',6,'2019-08-07 14:25:29',NULL,NULL),(111,'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO',6,'2019-08-07 14:27:18',NULL,NULL),(112,'El usuario john creó un personal nuevo con No. de documento 1072422473',6,'2019-08-07 15:48:58',NULL,NULL),(113,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 21:22:01',NULL,NULL),(114,'El usuario john modificó el personal con No. de documento 1082215681',6,'2019-08-07 21:22:24',NULL,NULL),(115,'El usuario john modificó el personal con No. de documento 1010',6,'2019-08-09 20:16:28',NULL,NULL),(116,'El usuario john creó un proveedor nuevo con No. de documento 1072422473',6,'2019-08-09 20:38:17',NULL,NULL),(117,'El usuario john creó un proveedor nuevo con No. de documento 123123',6,'2019-08-09 20:42:42',NULL,NULL),(118,'El usuario john creó un proveedor nuevo con No. de documento 332432',6,'2019-08-09 20:47:54',NULL,NULL),(119,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 22:40:06',NULL,NULL),(120,'El usuario john modificó el proveedor con No. de documento 1082215681',6,'2019-08-09 22:47:20',NULL,NULL),(121,'El usuario john modificó el pozo llamado POZO 1',6,'2019-08-09 23:01:08',NULL,NULL),(122,'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 23:08:36',NULL,NULL),(123,'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION',6,'2019-08-09 23:13:58',NULL,NULL),(124,'El usuario john creó un nuevo tipo de trabajo llamado DESARROLLADOR DE SOFTWARE',6,'2019-08-10 17:10:19',NULL,NULL),(125,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 17:17:59',NULL,NULL),(126,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:34:18',NULL,NULL),(127,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:35:01',NULL,NULL),(128,'El usuario john modificó el tipo de trabajo llamado TRABAJO 2',6,'2019-08-10 18:39:46',NULL,NULL),(129,'El usuario john modificó el tipo de trabajo llamado TRABAJO 1',6,'2019-08-10 18:40:09',NULL,NULL),(130,'El usuario john creó un tipo de contrato nuevo llamado RENTA MENSUAL',6,'2019-08-10 18:53:06',NULL,NULL),(131,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 18:54:39',NULL,NULL),(132,'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V',6,'2019-08-10 18:55:39',NULL,NULL),(133,'El usuario john creó un tipo de pozo nuevo llamado INYECTOR',6,'2019-08-10 19:20:07',NULL,NULL),(134,'El usuario john modificó el tipo de pozo llamado INYECTOR',6,'2019-08-10 19:22:06',NULL,NULL),(135,'El usuario john creó un nuevo tipo de equipo o herramienta llamado SODA CAUSTICA',6,'2019-08-10 19:53:09',NULL,NULL),(136,'El usuario john creó un nuevo tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 19:54:13',NULL,NULL),(137,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMION DE VACIO',6,'2019-08-10 19:54:45',NULL,NULL),(138,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CHOKE MANIFOLD ',6,'2019-08-10 19:55:19',NULL,NULL),(139,'El usuario john creó un nuevo tipo de equipo o herramienta llamado ACID TRAILER',6,'2019-08-10 19:56:09',NULL,NULL),(140,'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMA BAJA',6,'2019-08-10 19:56:44',NULL,NULL),(141,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 21:43:40',NULL,NULL),(142,'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING',6,'2019-08-10 21:44:31',NULL,NULL),(143,'El usuario john modificó el personal con No. de documento 1072422473',6,'2019-08-10 21:57:39',NULL,NULL),(144,'El usuario JOHN creó una nueva unidad de medida llamada KILOVATIOS',6,'2019-08-10 22:55:17',NULL,NULL),(145,'El usuario JOHN modificó la unidad de medida llamada MINUTOS1',6,'2019-08-10 22:58:22',NULL,NULL),(146,'El usuario JOHN modificó la unidad de medida llamada MINUTOS',6,'2019-08-10 22:58:40',NULL,NULL),(147,'El usuario JOHN creó un nuevo equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 10:07:12',NULL,NULL),(148,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:06',NULL,NULL),(149,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:21',NULL,NULL),(150,'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA',6,'2019-08-11 11:40:33',NULL,NULL),(151,'El usuario JOHN creó un cargo nuevo llamado CARGO 2',6,'2019-11-05 14:50:47',NULL,NULL),(152,'El usuario JOHN creó un cliente nuevo con No. de documento 63726372',6,'2019-11-05 14:52:07',NULL,NULL),(153,'El usuario JOHN creó un contrato nuevo con el ID 2',6,'2019-11-05 14:53:06',NULL,NULL),(154,'El usuario JOHN creó un campo nuevo llamado CAMPO 3',6,'2019-11-05 14:53:58',NULL,NULL),(155,'El usuario JOHN creó un nuevo centro costo llamado CENTRO COSTO 2',6,'2019-11-05 14:54:50',NULL,NULL),(156,'El usuario JOHN creó un personal nuevo con No. de documento 1075305650',6,'2019-11-05 15:54:28',NULL,NULL),(157,'El usuario JOHN creó un item nuevo con el ID 66',6,'2019-12-02 11:09:51',NULL,NULL),(158,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 13:39:16',NULL,NULL),(159,'El usuario JOHN modificó el item con el ID 123',6,'2019-12-02 13:39:29',NULL,NULL),(160,'El usuario JOHN creó un item nuevo con el ID 09',6,'2019-12-02 13:52:53',NULL,NULL),(161,'El usuario JOHN creó un item nuevo con el ID 010',6,'2019-12-02 13:53:37',NULL,NULL),(162,'El usuario JOHN creó un item nuevo con el ID 011',6,'2019-12-02 13:54:16',NULL,NULL),(163,'El usuario JOHN creó un item nuevo con el ID 012',6,'2019-12-02 13:54:58',NULL,NULL),(164,'El usuario JOHN creó un item nuevo con el ID 0113',6,'2019-12-02 13:56:00',NULL,NULL),(165,'El usuario JOHN creó un item nuevo con el ID 23',6,'2019-12-04 12:09:44',NULL,NULL),(166,'El usuario JOHN creó un cargo nuevo llamado PROGRAMADOR ',6,'2019-12-19 12:14:10',NULL,NULL),(167,'El usuario JOHN modificó el cargo PROGRAMADOR ',6,'2019-12-19 12:24:55',NULL,NULL),(168,'El usuario JOHN creó un cliente nuevo con No. de documento 1234566123',6,'2019-12-19 12:28:55',NULL,NULL),(169,'El usuario JOHN modificó el cliente con No. de documento 1234566123',6,'2019-12-19 12:29:08',NULL,NULL),(170,'El usuario JOHN modificó el contrato con el ID 2',6,'2019-12-19 12:42:03',NULL,NULL),(171,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 08:10:25',NULL,NULL),(172,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 08:10:41',NULL,NULL),(173,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 08:10:59',NULL,NULL),(174,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 08:11:12',NULL,NULL),(175,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 08:11:24',NULL,NULL),(176,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 08:11:51',NULL,NULL),(177,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 08:12:10',NULL,NULL),(178,'El usuario JOHN modificó el item con el ID 8',6,'2020-01-08 08:13:35',NULL,NULL),(179,'El usuario JOHN modificó el item con el ID 1',6,'2020-01-08 08:13:46',NULL,NULL),(180,'El usuario JOHN modificó el item con el ID 2',6,'2020-01-08 08:14:05',NULL,NULL),(181,'El usuario JOHN modificó el item con el ID 3',6,'2020-01-08 08:14:13',NULL,NULL),(182,'El usuario JOHN modificó el item con el ID 4',6,'2020-01-08 08:14:23',NULL,NULL),(183,'El usuario JOHN modificó el item con el ID 5',6,'2020-01-08 08:14:45',NULL,NULL),(184,'El usuario JOHN modificó el item con el ID 6',6,'2020-01-08 08:15:56',NULL,NULL),(185,'El usuario JOHN modificó el item con el ID 7',6,'2020-01-08 08:16:04',NULL,NULL),(186,'El usuario JOHN creó un item nuevo con el ID 15',6,'2020-01-08 08:16:59',NULL,NULL),(187,'El usuario JOHN creó un item nuevo con el ID 9',6,'2020-01-08 08:18:56',NULL,NULL),(188,'El usuario JOHN creó un item nuevo con el ID 10',6,'2020-01-08 08:19:26',NULL,NULL),(189,'El usuario JOHN creó un item nuevo con el ID 11',6,'2020-01-08 08:20:03',NULL,NULL),(190,'El usuario JOHN creó un item nuevo con el ID 13',6,'2020-01-08 08:20:45',NULL,NULL),(191,'El usuario JOHN creó un item nuevo con el ID 14',6,'2020-01-08 08:21:22',NULL,NULL),(192,'El usuario JOHN modificó el item con el ID 14',6,'2020-01-08 08:25:36',NULL,NULL),(193,'El usuario JOHN modificó el rubro llamado LOOOOOIUS',6,'2020-01-08 10:17:24',NULL,NULL),(194,'El usuario JOHN modificó el rubro llamado MILIUS',6,'2020-01-08 10:17:33',NULL,NULL),(195,'El usuario JOHN elimino una consigacion sola con consecutivo 19',6,'2020-01-10 09:12:47','{\"consulta1\":{\"id_consignacion\":19,\"id_planeacion\":\"0\",\"id_personal\":\"10\",\"fecha\":\"2020-01-15 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":\"las obesertaciones son estas\",\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRO NARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":15,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":253000,\"sobrante_legalizacion\":0,\"quien_acepta\":6},\"consulta2\":{\"id_consignacion\":19,\"id_planeacion\":\"0\",\"id_personal\":\"10\",\"fecha\":\"2020-01-15 00:00:00\",\"estado\":\"no aprobado\",\"descripcion\":null,\"observaciones\":\"las obesertaciones son estas\",\"pozo\":\"POZO EL AGUITA\",\"solicitante\":\"JOHN JAIRO NARVAEZ TAMAYO\",\"servicio\":\"servicio\",\"dias\":15,\"trasporte\":\"ÑPL123\",\"cliente\":\"ECOPETROL\",\"estado_legalizado\":0,\"costo_legalizacion\":0,\"costo_cotizacion\":253000,\"sobrante_legalizacion\":0,\"quien_acepta\":6}}','ya no existe bye '),(196,'El usuario JOHN creó un personal nuevo con No. de documento 2923949231',6,'2020-01-10 10:27:56',NULL,NULL),(197,'El usuario JOHN modifico una consigacion con consecutivo 12',6,'2020-01-10 11:18:39',NULL,NULL);

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

insert  into `tb_consignacion`(`id_consignacion`,`id_planeacion`,`id_personal`,`fecha`,`estado`,`descripcion`,`observaciones`,`pozo`,`solicitante`,`servicio`,`dias`,`trasporte`,`cliente`,`estado_legalizado`,`costo_legalizacion`,`costo_cotizacion`,`sobrante_legalizacion`,`quien_acepta`) values (12,'7','6','2019-11-24 00:00:00','confirmado','me gusta',NULL,'pozo','JOHN','12312',0,'palaca','ECOPETROL',0,0,200400,0,6),(15,'7','6','2021-12-21 00:00:00','no aprobado',NULL,NULL,'pozo','JOHN','no se nada de estooooooo  pero es els rrvio',6,'ÑPL123','ECOPETROL',0,0,289729,0,6),(20,'7','6','2020-01-14 00:00:00','no aprobado',NULL,NULL,'POZO EL AGUITA','JOHN JAIRONARVAEZ TAMAYO','servicio',6,'ÑOLP','ACUMULDARO',0,0,1060600,0,9);

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

insert  into `tb_consignacion_detalles`(`id`,`id_item`,`cantidad`,`valor_unitario`,`costo_total_item`,`id_consignacion`) values (25,3,0,0,0,4),(26,1,2,200,400,4),(27,2,4,788888888,2147483647,4),(28,4,0,0,0,4),(29,5,0,0,0,4),(30,6,0,0,0,4),(31,7,0,0,0,4),(32,8,0,0,0,4),(89,3,0,0,0,12),(90,1,2,200,400,12),(91,2,0,0,0,12),(92,4,40,5000,200000,12),(93,5,0,0,0,12),(94,6,0,0,0,12),(95,7,0,0,0,12),(96,8,0,0,0,12),(113,2,123,2323,285729,15),(114,1,2,2000,4000,15),(115,3,0,0,0,15),(116,4,0,0,0,15),(117,5,0,0,0,15),(118,6,0,0,0,15),(119,7,0,0,0,15),(120,8,0,0,0,15),(159,10,0,0,0,20),(160,1,235,200,47000,20),(161,2,30,3000,90000,20),(162,3,0,0,0,20),(163,4,0,0,0,20),(164,5,0,0,0,20),(165,6,0,0,0,20),(166,7,12,300,3600,20),(167,8,0,0,0,20),(168,9,0,0,0,20),(169,11,0,0,0,20),(170,12,230,4000,920000,20),(171,13,0,0,0,20),(172,14,0,0,0,20);

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `tb_personal` */

LOCK TABLES `tb_personal` WRITE;

insert  into `tb_personal`(`id`,`nombre_personal`,`apellido_personal`,`numero_documento_personal`,`fecha_expedicion_personal`,`lugar_expedicion_personal`,`fecha_nacimiento_personal`,`lugar_nacimiento_personal`,`edad_personal`,`rh_personal`,`genero_personal`,`telefono_personal`,`telefono_residencia_personal`,`direccion_residencia_personal`,`ciudad_personal`,`correo_corporativo_personal`,`correo_personal`,`profesion_personal`,`experiencia_personal`,`contrato_personal`,`id_cargo`,`id_base`,`fecha_ingreso_personal`,`fecha_retiro_personal`,`salario_personal`,`bono_otros`,`bono_salarial_personal`,`bono_no_salarial_personal`,`eps_personal`,`fecha_eps_personal`,`pension_personal`,`fecha_pension_personal`,`cesantias_personal`,`arl_personal`,`fecha_arl_personal`,`fecha_parafiscales_personal`,`sena_personal`,`icbf_personal`,`caja_personal`,`accidente_personal`,`accidente_telefono_personal`,`estado_personal`,`username`,`password`,`foto_personal`,`firma_personal`,`modulo_operaciones`,`generar_ticket`,`horas_trabajo`,`planeacion`,`gestion_template`,`reportes`,`control_costos`,`permiso_aceptar`,`consignaciones`,`legalizacion`,`gestion_bonos`,`reportes_costos`,`movilizacion`,`aprobacion`,`ctrl_movilizacion`,`consultas`,`configuracion_general`,`bases`,`cargos`,`clientes`,`contratos`,`campos`,`centro_costos`,`equipo_herramienta`,`item`,`moneda`,`personal`,`proveedores`,`pozos`,`rubros`,`tipo_trabajos`,`tipo_contratos`,`tipo_pozos`,`tipo_equipos`,`usuarios`,`unidad_medida`,`festivos`,`bitacora`,`fecha_registro`,`id_personal`,`fecha_conexion_personal`) values (6,'JOHN JAIRO','NARVAEZ TAMAYO','1082215681','2019-07-17','YAGUARA HUILA','2019-07-02','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-17','2019-07-17',5000000,0,1000000,2000000,'SANITAS','2019-07-17','PORVENIR','2019-07-17','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','MIGUEL ANGEL NARVAEZ','3507518916',1,'JOHN','$2a$10$REyQIUTThUwceovFLwlYXecjdBCsPGKVgr0Jf4Yi3izpHEg2iwY2y','foto.png','',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-07 08:18:38',0,'2019-12-20 13:03:11.607'),(8,'LEONARDO ','JIMENEZ','1010','2019-07-02','NEIVA-HUILA','2019-07-25','NEIVA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','ELMEJOR@GMAIL.COM','ELMEJOR@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-25','2019-07-29',4000000,0,500000,1000000,'SANITAS','2019-07-25','PORVENIR','2019-07-19','PORVENIR','BOLIVAR','2019-07-26','2019-07-27','NO','NO','COMFAMILIAR','EL MEJOR','123',1,'CAMILA','$2a$10$acwnbmmB5Avt2BBzc.cO3uMNLq6traXvmMmaR5N3EMy3zLjUanVye','','descarga.png',1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-08 08:59:00',0,'2019-08-10 22:49:51'),(9,'NATALIA ','NARAJO NARVAEZ','1072422473','2019-08-07','YAGUARA HUILA','2019-08-07','YAGUARA','26','B+','MASCULINO','3115364067','0','CALLE 6 # 7A-18','NEIVA','JOHN@GMAIL.COM','JOHN@GMAIL.COM','INGENIERO DE SOFTWARE','6 AÑOS','INDEFINIDO',1,1,'2019-07-31','2019-08-10',3000000,0,2000000,1000000,'SANITAS','2019-07-17','PORVENIR','2019-08-07','PORVENIR','BOLIVAR','2019-07-17','2019-07-17','NO','NO','COMFAMILIAR','JOHN JAIRO NARVAEZ','3507518916P',1,'S','$2a$10$xRf8t5XWl2/HKDX7miWvpeNgpR0LiYdLXw97DcuJvvG9mTnpFY.zW','','',1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-08 08:58:54',6,'2019-08-10 22:48:49'),(10,'JUAN MANUEL','CUELLAR BAHAMON','1075305650','291029','EFIEJ','2019-11-11','NEIVA','22','O+','MASCULINO','8293829','3227382','CALLE 8 #48-400','NEIVA','CORREO@GMAIL.COM','CORREO2@GMAIL.COM','KWDWOKD','WIJDIWJ','WIJDIWJ',1,1,'2019-11-17','2019-11-22',12912,0,2832387,2738237,'NUEVA EPS','2019-11-19','NO TENGO','2019-11-27','EFKEFKQ','NO TENGO','2019-11-24','2019-11-29','EFEWF','WEFWEF','EWFEW','WEFWEFWEF','239293',1,'MANUEL','$2a$10$FUL7XgGYBa0ek1KctkY3bekts6LnVhYetVQeEvLBmt2wKwlRh7M/m','','',1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,'2020-01-08 08:58:53',6,'2019-11-05 15:56:39.282'),(11,'SAESQW','WQEq','2923949231','2095/12/12','ASD','asdas','DQDS','45','A+','MASCULITO','3204042901','8783245','NEIVA12','123123','3123123','3123123','3123123 MJK','KJ123J2K','12312',1,3,'2020-01-10','2020-01-10',30000,0,12323,123123,'ASDASD','ASDASD','QDQWE','I','OQE','IQWEJIOQWEJI','QOWE','IO','QE','QIOE','JOWE','QIWEO','32040203',1,NULL,'','','',0,0,0,0,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-01-10 10:27:56',6,'');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
