-- MySQL dump 10.16  Distrib 10.1.43-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: guacamaya
-- ------------------------------------------------------
-- Server version	10.1.43-MariaDB-0ubuntu0.18.04.1

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_hojas_trabajo`
--

LOCK TABLES `tb_hojas_trabajo` WRITE;
/*!40000 ALTER TABLE `tb_hojas_trabajo` DISABLE KEYS */;
INSERT INTO `tb_hojas_trabajo` VALUES (1,7,8,57,'2019-12-01','aaaaaa');
/*!40000 ALTER TABLE `tb_hojas_trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_hojas_trabajo_detalle`
--

DROP TABLE IF EXISTS `tb_hojas_trabajo_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_hojas_trabajo_detalle`
--

LOCK TABLES `tb_hojas_trabajo_detalle` WRITE;
/*!40000 ALTER TABLE `tb_hojas_trabajo_detalle` DISABLE KEYS */;
INSERT INTO `tb_hojas_trabajo_detalle` VALUES (3,'10:00:00','10:00:00',0,0,0,0,0,0,0,0,'acido','cdscs',100,'dscds',1);
/*!40000 ALTER TABLE `tb_hojas_trabajo_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_hojas_trabajo_equipo_turno`
--

DROP TABLE IF EXISTS `tb_hojas_trabajo_equipo_turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_hojas_trabajo_equipo_turno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) DEFAULT NULL,
  `entrada` datetime DEFAULT NULL,
  `salida` datetime DEFAULT NULL,
  `stb` smallint(6) DEFAULT NULL,
  `id_hojas_trabajo_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_hojas_trabajo_equipo_turno`
--

LOCK TABLES `tb_hojas_trabajo_equipo_turno` WRITE;
/*!40000 ALTER TABLE `tb_hojas_trabajo_equipo_turno` DISABLE KEYS */;
INSERT INTO `tb_hojas_trabajo_equipo_turno` VALUES (2,1,'2019-12-01 10:00:00','2019-12-01 20:00:00',1,1);
/*!40000 ALTER TABLE `tb_hojas_trabajo_equipo_turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_hojas_trabajo_personal_turno`
--

DROP TABLE IF EXISTS `tb_hojas_trabajo_personal_turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_hojas_trabajo_personal_turno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_personal` int(11) DEFAULT NULL,
  `entrada` datetime DEFAULT NULL,
  `salida` datetime DEFAULT NULL,
  `jornada` varchar(100) DEFAULT NULL,
  `id_hojas_trabajo_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_hojas_trabajo_personal_turno`
--

LOCK TABLES `tb_hojas_trabajo_personal_turno` WRITE;
/*!40000 ALTER TABLE `tb_hojas_trabajo_personal_turno` DISABLE KEYS */;
INSERT INTO `tb_hojas_trabajo_personal_turno` VALUES (4,6,'2019-12-01 18:00:00','2019-12-01 06:00:00','nocturno',1);
/*!40000 ALTER TABLE `tb_hojas_trabajo_personal_turno` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-24 10:25:47
