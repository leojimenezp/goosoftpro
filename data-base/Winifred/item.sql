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
-- Table structure for table `tb_item`
--

DROP TABLE IF EXISTS `tb_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item`
--

LOCK TABLES `tb_item` WRITE;
/*!40000 ALTER TABLE `tb_item` DISABLE KEYS */;
INSERT INTO `tb_item` VALUES (1,'1','ITEM 1','2','200.000','PRINCIPAL','NIKE',7,1,'2019-12-05 07:52:03',0),(2,'2','ITEM 2','0','0','0','0',7,1,'2019-12-05 07:52:03',6),(3,'3','ITEM 3','0','0','0','0',7,1,'2019-12-05 07:52:03',0),(4,'4','ITEM 4','0','0','0','0',7,0,'2019-12-05 07:52:03',0),(5,'5','ITEM 5','0','0','0','0',7,0,'2019-12-05 07:52:03',0),(6,'6','ITEM 6','0','0','0','0',7,0,'2019-12-05 07:52:03',0),(7,'7','ITEM 7','0','0','0','0',7,0,'2019-12-05 07:52:03',0),(8,'8','ITEM 8','0','0','0','0',7,0,'2019-12-05 07:52:03',0);
/*!40000 ALTER TABLE `tb_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-05 11:34:44
