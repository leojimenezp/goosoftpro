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

/*Table structure for table `tb_consignacion_estados` */

DROP TABLE IF EXISTS `tb_consignacion_estados`;

CREATE TABLE `tb_consignacion_estados` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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

/*Table structure for table `tb_festivos` */

DROP TABLE IF EXISTS `tb_festivos`;

CREATE TABLE `tb_festivos` (
  `id_festivo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_festivo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

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

/*Table structure for table `tb_legalizacion` */

DROP TABLE IF EXISTS `tb_legalizacion`;

CREATE TABLE `tb_legalizacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_consignacion_detalle` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `valor_unitario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

/*Table structure for table `tb_planeacion_valor_fecha` */

DROP TABLE IF EXISTS `tb_planeacion_valor_fecha`;

CREATE TABLE `tb_planeacion_valor_fecha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_ingresado` int(11) DEFAULT NULL,
  `valor_consulta` int(11) DEFAULT NULL,
  `mes_ano` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `tb_porcentaje` */

DROP TABLE IF EXISTS `tb_porcentaje`;

CREATE TABLE `tb_porcentaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_porcentaje` varchar(20) DEFAULT NULL,
  `porcentaje` decimal(3,2) DEFAULT NULL,
  `resumen` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

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

/*Table structure for table `tb_pozos_planeacion` */

DROP TABLE IF EXISTS `tb_pozos_planeacion`;

CREATE TABLE `tb_pozos_planeacion` (
  `id_pozo_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_pozo` int(11) NOT NULL,
  PRIMARY KEY (`id_pozo_planeacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

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

/*Table structure for table `tb_tipo_asignacion` */

DROP TABLE IF EXISTS `tb_tipo_asignacion`;

CREATE TABLE `tb_tipo_asignacion` (
  `id_tipo_asignacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(40) NOT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id_tipo_asignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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

/*Table structure for table `tb_tipo_trabajo_planeacion` */

DROP TABLE IF EXISTS `tb_tipo_trabajo_planeacion`;

CREATE TABLE `tb_tipo_trabajo_planeacion` (
  `id_tipo_trabajo_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_trabajo` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_trabajo_planeacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

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

/*Table structure for table `tb_tipos_cotizacion` */

DROP TABLE IF EXISTS `tb_tipos_cotizacion`;

CREATE TABLE `tb_tipos_cotizacion` (
  `id_tipo_cotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo_cotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

/*Table structure for table `tbr_cambio_estado` */

DROP TABLE IF EXISTS `tbr_cambio_estado`;

CREATE TABLE `tbr_cambio_estado` (
  `id_cambio_planeacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_planeacion` int(11) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `fecha_cambio` date DEFAULT NULL,
  PRIMARY KEY (`id_cambio_planeacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
