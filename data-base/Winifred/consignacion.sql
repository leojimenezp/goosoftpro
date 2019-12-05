-- MySQL dump 10.17  Distrib 10.3.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: guacamaya
-- ------------------------------------------------------
-- Server version	10.3.18-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_consignacion`
--

DROP TABLE IF EXISTS `tb_consignacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  PRIMARY KEY (`id_consignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_consignacion`
--

LOCK TABLES `tb_consignacion` WRITE;
/*!40000 ALTER TABLE `tb_consignacion` DISABLE KEYS */;
INSERT INTO `tb_consignacion` VALUES (96,'0','10','2019-12-31 00:00:00','rechazado','jajajajajaja estos sis sirven los tro no¡',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),(101,'0',NULL,'2019-12-10 00:00:00','no aprovado',NULL,'cdscvsdcds',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(102,'0',NULL,'2019-12-11 00:00:00','no aprovado',NULL,'dsad',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(103,'0',NULL,'2019-12-27 00:00:00','no aprovado',NULL,'maloks',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(104,'0',NULL,'2019-12-27 00:00:00','no aprovado',NULL,'malokssad',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(105,'0',NULL,'2019-12-27 00:00:00','no aprovado',NULL,'malokssad',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(106,'0','9','2019-12-26 00:00:00','no aprovado',NULL,'milosoalsd',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(107,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(108,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(109,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(110,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(111,'0','10','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(112,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(113,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(114,'7','6','0000-00-00 00:00:00','no aprovado',NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(115,'0','8','2019-12-31 00:00:00','rechazado','es mucha plata','',NULL,NULL,NULL,NULL,NULL,NULL,0,0),(116,'0','8','2019-12-31 00:00:00','no aprovado',NULL,'observaciones ','pzoz','solicitante','servicio',0,'palaca','cliente',0,0);
/*!40000 ALTER TABLE `tb_consignacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-05  9:08:09
