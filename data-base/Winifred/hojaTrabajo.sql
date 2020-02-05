-- MySQL dump 10.17  Distrib 10.3.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: guacamaya
-- ------------------------------------------------------
-- Server version	10.3.18-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_hojas_trabajo`
--

DROP TABLE IF EXISTS `tb_hojas_trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_hojas_trabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(11) DEFAULT NULL,
  `id_pozo` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tuberia` varchar(100) DEFAULT NULL,
  `ingreso_estimado` int(11) DEFAULT 0,
  `consumo_combustible` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_hojas_trabajo`
--

LOCK TABLES `tb_hojas_trabajo` WRITE;
/*!40000 ALTER TABLE `tb_hojas_trabajo` DISABLE KEYS */;
INSERT INTO `tb_hojas_trabajo` VALUES (1,7,8,57,'2019-12-01','aaaaaa',0,0),(2,7,8,57,'2019-03-30','aaaaaa',0,0),(3,7,8,57,'2019-04-03','aaaaaa',0,0),(4,7,8,57,'2019-04-02','aaaaaa',0,0),(5,7,8,57,'2019-04-10','aaaaaa',0,0),(6,7,8,57,'2019-04-11','aaaaaa',0,0),(7,7,8,57,'2019-04-11','aaaaaa',0,0),(8,7,8,57,'2019-04-04','aaaaaa',0,0),(9,7,8,57,'2019-04-05','aaaaaa',0,0),(10,7,8,57,'2019-04-06','aaaaaa',0,0),(11,7,8,57,'2019-04-07','aaaaaa',0,0),(12,7,8,57,'2019-04-06','aaaaaa',0,0),(13,7,8,57,'2019-04-09','aaaaaa',0,0),(14,7,8,57,'2019-04-08','aaaaaa',0,0),(15,7,11,4,'2020-02-01','asd',400,100);
/*!40000 ALTER TABLE `tb_hojas_trabajo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-04 11:38:43
