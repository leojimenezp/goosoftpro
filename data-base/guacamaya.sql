-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2019 a las 17:07:15
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guacamaya`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE DATABASE guacamaya;
USE guacamaya;

CREATE TABLE `sessions` (
  `session_id` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=INNODB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('9tEQ-PRIqkxNg130Ba7BsRkI0OQ35ZsN', 1575077971, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),
('LWpikSBtQ5MQfDomMhlAhpDm6ErZb-2J', 1575128607, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),
('yelnS9MWc5YDBtlBW-yJ3w59rSnUj82t', 1575126920, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_bases`
--

CREATE TABLE `tb_bases` (
  `id_base` INT(11) NOT NULL,
  `nombre_base` TEXT NOT NULL,
  `longitud_base` TEXT NOT NULL,
  `latitud_base` TEXT NOT NULL,
  `estado_base` INT(1) NOT NULL,
  `fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `id_personal` INT(11) NOT NULL
) ENGINE=INNODB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_bases`
--

INSERT INTO `tb_bases` (`id_base`, `nombre_base`, `longitud_base`, `latitud_base`, `estado_base`, `fecha_registro`, `id_personal`) VALUES
(1, 'NEIVA', '-75.316669905215460', '2.939732122880684', 1, '2019-08-04 22:50:31', 6),
(2, 'BOGOTA', '-74.072092000000000', '4.710988599999999', 1, '2019-08-04 22:50:27', 6),
(3, 'VILLAVICENCIO', '-73.637690499999960', '4.151382200000000', 1, '2019-08-04 22:50:24', 6),
(4, 'BUCARAMANGA', '-73.122741599999980', '7.119349000000000', 1, '2019-08-04 22:50:22', 6),
(5, 'PUERTO BOYACA', '-74.593394999999990', '5.977237000000000', 1, '2019-08-04 22:50:19', 6),
(6, 'ENVIGADO', '-75.5994392', '6.1663544', 1, '2019-08-04 22:50:17', 6),
(7, 'MONTERIA', '-75.9169897', '8.7606317', 2, '2019-08-04 22:50:14', 6),
(8, 'BARRANQUILLA', '-74.8880586', '10.9839725', 1, '2019-08-04 22:49:29', 6),
(9, 'FET', '-75.29039', '2.83643', 1, '2019-08-06 01:16:11', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_bitacora`
--

CREATE TABLE `tb_bitacora` (
  `id_bitacora` INT(11) NOT NULL,
  `descripcion_bitacora` TEXT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `fecha_registro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
) ENGINE=INNODB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_bitacora`
--

INSERT INTO `tb_bitacora` (`id_bitacora`, `descripcion_bitacora`, `id_user`, `fecha_registro`) VALUES
(1, 'El usuario john creó una nueva base llamada NEIVA', 2, '2019-07-23 14:03:15'),
(2, 'El usuario john modificó la base NEIVA', 2, '2019-07-23 21:56:02'),
(3, 'El usuario john modificó la base NEIVA', 2, '2019-07-23 22:10:02'),
(4, 'El usuario john modificó la base NEIVA', 2, '2019-07-24 00:30:40'),
(5, 'El usuario john modificó la base NEIVA', 2, '2019-07-24 00:34:17'),
(6, 'El usuario john modificó la base NEIVA', 2, '2019-07-24 00:34:28'),
(7, 'El usuario john creó un cargo nuevo llamado Arquitecto', 2, '2019-07-24 00:56:07'),
(8, 'El usuario john modificó el cargo Desarrollador de software 0', 2, '2019-07-24 01:22:08'),
(9, 'El usuario john modificó el cargo Desarrollador de software ', 2, '2019-07-24 01:22:43'),
(10, 'El usuario john creó la unidad de medida MINUTOS', 2, '2019-07-24 01:37:30'),
(11, 'El usuario john modificó el cargo Desarrollador de software ', 2, '2019-07-24 01:46:36'),
(12, 'El usuario john modificó la unidad de medida MINUTOS', 2, '2019-07-24 02:20:14'),
(13, 'El usuario john modificó la unidad de medida MINUTOS', 2, '2019-07-24 02:25:11'),
(14, 'El usuario john modificó la unidad de medida MINUTOS', 2, '2019-07-24 02:25:20'),
(15, 'El usuario john modificó la base NEIVA', 2, '2019-07-24 03:07:21'),
(16, 'El usuario john modificó la base NEIVA', 2, '2019-07-24 03:07:29'),
(17, 'El usuario john modificó el cargo Desarrollador de software ', 2, '2019-07-24 03:17:56'),
(18, 'El usuario john modificó el cargo Desarrollador de software ', 2, '2019-07-24 03:18:05'),
(19, 'El usuario john creó un tipo de pozo nuevo llamado PRODUCTOR DE CRUDO', 2, '2019-07-25 00:11:49'),
(20, 'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO 0', 2, '2019-07-25 00:33:36'),
(21, 'El usuario john modificó el tipo de pozo llamado PRODUCTOR DE CRUDO', 2, '2019-07-25 00:33:51'),
(22, 'El usuario john creó un tipo de contrato nuevo llamado ORDEN DE SERVICIO', 2, '2019-07-25 00:59:06'),
(23, 'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO0', 2, '2019-07-25 01:10:25'),
(24, 'El usuario john modificó el tipo de contrato llamado ORDEN DE SERVICIO', 2, '2019-07-25 01:10:38'),
(25, 'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION', 2, '2019-07-25 01:30:21'),
(26, 'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION1', 2, '2019-07-25 01:51:26'),
(27, 'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION', 2, '2019-07-25 01:52:05'),
(28, 'El usuario john creó una nueva moneda llamda DOLAR AMERICANO Y PESO COLOMBIANO', 2, '2019-07-25 02:12:35'),
(29, 'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO1', 2, '2019-07-25 02:21:58'),
(30, 'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO', 2, '2019-07-25 02:22:21'),
(31, 'El usuario john creó un nuevo centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 2, '2019-07-25 02:51:21'),
(32, 'El usuario john modificó la unidad de medida MINUTOS', 2, '2019-07-25 02:55:28'),
(33, 'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA 1', 2, '2019-07-25 03:00:16'),
(34, 'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 2, '2019-07-25 03:00:52'),
(35, 'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 2, '2019-07-25 03:01:28'),
(36, 'El usuario john creó un proveedor nuevo con No. de documento 1082215681', 2, '2019-07-27 00:45:47'),
(37, 'El usuario john modificó el proveedor con No. de documento 1082215681', 2, '2019-07-27 02:14:52'),
(38, 'El usuario john creó un proveedor nuevo con No. de documento 1082215681', 2, '2019-07-27 02:16:42'),
(39, 'El usuario john modificó el proveedor con No. de documento 1082215681', 2, '2019-07-27 02:17:06'),
(40, 'El usuario john creó un cliente nuevo con No. de documento 1072422473', 2, '2019-07-27 03:14:31'),
(41, 'El usuario john modificó el cliente con No. de documento 1072422473', 2, '2019-07-27 03:32:12'),
(42, 'El usuario john creó un cliente nuevo con No. de documento 1072422473', 2, '2019-07-27 03:33:42'),
(43, 'El usuario john modificó el cliente con No. de documento 123456789', 2, '2019-07-27 03:34:16'),
(44, 'El usuario john creó un personal nuevo con No. de documento 1082215681', 2, '2019-07-28 03:01:47'),
(45, 'El usuario john creó un cargo nuevo llamado Abogado', 2, '2019-07-28 03:11:03'),
(46, 'El usuario john creó un personal nuevo con No. de documento 1082215681', 2, '2019-07-28 15:44:54'),
(47, 'El usuario john modificó el cargo DESARROLLADOR DE SOFTWARE', 6, '2019-07-28 16:34:29'),
(48, 'El usuario john modificó el personal con No. de documento 1082215681', 6, '2019-07-28 23:03:12'),
(49, 'El usuario john modificó el personal con No. de documento 1082215681', 6, '2019-07-28 23:03:41'),
(50, 'El usuario john creó un personal nuevo con No. de documento 1010', 6, '2019-07-29 01:08:09'),
(51, 'El usuario john creó un personal nuevo con No. de documento 1010', 6, '2019-07-29 01:58:38'),
(52, 'El usuario john creó un contrato nuevo con el ID 1234', 6, '2019-07-30 01:50:40'),
(53, 'El usuario john modificó el contrato con el ID 1234', 6, '2019-07-30 02:18:39'),
(54, 'El usuario john modificó el contrato con el ID 1234', 6, '2019-07-30 02:21:43'),
(55, 'El usuario john modificó el contrato con el ID 1234', 6, '2019-07-30 02:21:55'),
(56, 'El usuario john creó un contrato nuevo con el ID 123', 6, '2019-07-30 02:25:33'),
(57, 'El usuario john modificó el contrato con el ID 123', 6, '2019-07-30 02:26:16'),
(58, 'El usuario john creó un campo nuevo llamado CAMPO 1', 6, '2019-07-31 00:59:03'),
(59, 'El usuario john creó un campo nuevo llamado CAMPO 1', 6, '2019-07-31 01:36:37'),
(60, 'El usuario john creó un campo nuevo llamado CAMPO 1', 6, '2019-07-31 01:55:14'),
(61, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:06'),
(62, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:14'),
(63, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:22'),
(64, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:29'),
(65, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:35'),
(66, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-07-31 01:57:43'),
(67, 'El usuario john creó un item nuevo con el ID 123', 6, '2019-07-31 02:29:04'),
(68, 'El usuario john modificó el item con el ID 123', 6, '2019-07-31 02:44:29'),
(69, 'El usuario john modificó el item con el ID 123', 6, '2019-07-31 02:44:38'),
(70, 'El usuario john modificó el item con el ID 123', 6, '2019-07-31 02:44:47'),
(71, 'El usuario john modificó el campo llamado CAMPO 2', 6, '2019-08-02 01:02:31'),
(72, 'El usuario john creó un nuevo pozo llamado POZO 1', 6, '2019-08-02 01:41:40'),
(73, 'El usuario john modificó el pozo llamado POZO 1', 6, '2019-08-02 01:58:35'),
(74, 'El usuario john modificó el pozo llamado POZO 1', 6, '2019-08-02 01:58:44'),
(75, 'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 1', 6, '2019-08-02 02:46:49'),
(76, 'El usuario john creó un nuevo tipo de trabajo llamado TRABAJO 2', 6, '2019-08-02 02:47:32'),
(77, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 2', 6, '2019-08-02 02:56:31'),
(78, 'El usuario john creó una nueva base llamada BOGOTA', 6, '2019-08-04 00:02:06'),
(79, 'El usuario john creó una nueva base llamada VILLAVICENCIO', 6, '2019-08-04 00:02:24'),
(80, 'El usuario john creó una nueva base llamada BUCARAMANGA', 6, '2019-08-04 00:02:40'),
(81, 'El usuario john creó una nueva base llamada PUERTO BOYACA', 6, '2019-08-04 00:02:57'),
(82, 'El usuario john modificó la base BOGOTA', 6, '2019-08-04 21:31:25'),
(83, 'El usuario john modificó la base BOGOTA', 6, '2019-08-04 21:31:36'),
(84, 'El usuario john modificó la base NEIVA', 6, '2019-08-04 21:31:49'),
(85, 'El usuario john creó una nueva base llamada ENVIGADO', 6, '2019-08-04 21:44:56'),
(86, 'El usuario john modificó la base NEIVA', 6, '2019-08-04 22:00:18'),
(87, 'El usuario john modificó la base NEIVA', 6, '2019-08-04 22:00:29'),
(88, 'El usuario john creó una nueva base llamada MONTERIA', 6, '2019-08-04 22:01:32'),
(89, 'El usuario john creó una nueva base llamada BARRANQUILLA', 6, '2019-08-04 22:49:29'),
(90, 'El usuario john modificó el cargo Abogado', 6, '2019-08-04 23:13:52'),
(91, 'El usuario john creó un cargo nuevo llamado AUXILIAR CONTABLE', 6, '2019-08-04 23:20:44'),
(92, 'El usuario john modificó el cargo AUXILIAR CONTABLE', 6, '2019-08-05 00:00:38'),
(93, 'El usuario john modificó el cargo Arquitecto', 6, '2019-08-05 00:00:52'),
(94, 'El usuario john modificó el cargo ABOGADO', 6, '2019-08-05 00:10:45'),
(95, 'El usuario john modificó el cargo ARQUITECTO', 6, '2019-08-05 00:10:58'),
(96, 'El usuario john modificó el cargo ABOGADO', 6, '2019-08-05 00:11:11'),
(97, 'El usuario john modificó el cargo ABOGADO', 6, '2019-08-05 00:38:32'),
(98, 'El usuario john creó una nueva base llamada FET', 6, '2019-08-06 01:16:11'),
(99, 'El usuario john creó un contrato nuevo con el ID 123456789', 6, '2019-08-06 02:14:35'),
(100, 'El usuario john modificó el campo llamado CAMPO 1', 6, '2019-08-06 03:00:46'),
(101, 'El usuario john creó un campo nuevo llamado CAMPO 3', 6, '2019-08-06 03:04:14'),
(102, 'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 6, '2019-08-07 14:32:51'),
(103, 'El usuario john creó un nuevo centro costo llamado PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA', 6, '2019-08-07 14:35:28'),
(104, 'El usuario john modificó el centro costo llamado TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 6, '2019-08-07 14:38:04'),
(105, 'El usuario john modificó el item con el ID 123', 6, '2019-08-07 15:40:55'),
(106, 'El usuario john modificó el item con el ID 123', 6, '2019-08-07 15:47:18'),
(107, 'El usuario john modificó el item con el ID 123', 6, '2019-08-07 16:56:51'),
(108, 'El usuario john modificó el item con el ID 123', 6, '2019-08-07 16:57:00'),
(109, 'El usuario john creó un item nuevo con el ID 10', 6, '2019-08-07 16:58:57'),
(110, 'El usuario john creó una nueva moneda llamada PESO COLOMBIANO', 6, '2019-08-07 19:25:29'),
(111, 'El usuario john modificó la moneda DOLAR AMERICANO Y PESO COLOMBIANO', 6, '2019-08-07 19:27:18'),
(112, 'El usuario john creó un personal nuevo con No. de documento 1072422473', 6, '2019-08-07 20:48:58'),
(113, 'El usuario john modificó el personal con No. de documento 1082215681', 6, '2019-08-08 02:22:01'),
(114, 'El usuario john modificó el personal con No. de documento 1082215681', 6, '2019-08-08 02:22:24'),
(115, 'El usuario john modificó el personal con No. de documento 1010', 6, '2019-08-10 01:16:28'),
(116, 'El usuario john creó un proveedor nuevo con No. de documento 1072422473', 6, '2019-08-10 01:38:17'),
(117, 'El usuario john creó un proveedor nuevo con No. de documento 123123', 6, '2019-08-10 01:42:42'),
(118, 'El usuario john creó un proveedor nuevo con No. de documento 332432', 6, '2019-08-10 01:47:54'),
(119, 'El usuario john modificó el proveedor con No. de documento 1082215681', 6, '2019-08-10 03:40:06'),
(120, 'El usuario john modificó el proveedor con No. de documento 1082215681', 6, '2019-08-10 03:47:20'),
(121, 'El usuario john modificó el pozo llamado POZO 1', 6, '2019-08-10 04:01:08'),
(122, 'El usuario john creó un rubro nuevo llamado ALOJAMIENTO Y MANUTENCION', 6, '2019-08-10 04:08:36'),
(123, 'El usuario john modificó el rubro llamado ALOJAMIENTO Y MANUTENCION', 6, '2019-08-10 04:13:58'),
(124, 'El usuario john creó un nuevo tipo de trabajo llamado DESARROLLADOR DE SOFTWARE', 6, '2019-08-10 22:10:19'),
(125, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 2', 6, '2019-08-10 22:17:59'),
(126, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 2', 6, '2019-08-10 23:34:18'),
(127, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 2', 6, '2019-08-10 23:35:01'),
(128, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 2', 6, '2019-08-10 23:39:46'),
(129, 'El usuario john modificó el tipo de trabajo llamado TRABAJO 1', 6, '2019-08-10 23:40:09'),
(130, 'El usuario john creó un tipo de contrato nuevo llamado RENTA MENSUAL', 6, '2019-08-10 23:53:06'),
(131, 'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V', 6, '2019-08-10 23:54:39'),
(132, 'El usuario john modificó el tipo de contrato llamado RENTA MENSUAL V', 6, '2019-08-10 23:55:39'),
(133, 'El usuario john creó un tipo de pozo nuevo llamado INYECTOR', 6, '2019-08-11 00:20:07'),
(134, 'El usuario john modificó el tipo de pozo llamado INYECTOR', 6, '2019-08-11 00:22:06'),
(135, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado SODA CAUSTICA', 6, '2019-08-11 00:53:09'),
(136, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado COILED TUBING', 6, '2019-08-11 00:54:13'),
(137, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMION DE VACIO', 6, '2019-08-11 00:54:45'),
(138, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado CHOKE MANIFOLD ', 6, '2019-08-11 00:55:19'),
(139, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado ACID TRAILER', 6, '2019-08-11 00:56:09'),
(140, 'El usuario john creó un nuevo tipo de equipo o herramienta llamado CAMA BAJA', 6, '2019-08-11 00:56:44'),
(141, 'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING', 6, '2019-08-11 02:43:40'),
(142, 'El usuario john modificó el tipo de equipo o herramienta llamado COILED TUBING', 6, '2019-08-11 02:44:31'),
(143, 'El usuario john modificó el personal con No. de documento 1072422473', 6, '2019-08-11 02:57:39'),
(144, 'El usuario JOHN creó una nueva unidad de medida llamada KILOVATIOS', 6, '2019-08-11 03:55:17'),
(145, 'El usuario JOHN modificó la unidad de medida llamada MINUTOS1', 6, '2019-08-11 03:58:22'),
(146, 'El usuario JOHN modificó la unidad de medida llamada MINUTOS', 6, '2019-08-11 03:58:40'),
(147, 'El usuario JOHN creó un nuevo equipo o herramienta llamado MOTOCIERRA', 6, '2019-08-11 15:07:12'),
(148, 'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA', 6, '2019-08-11 16:40:06'),
(149, 'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA', 6, '2019-08-11 16:40:21'),
(150, 'El usuario JOHN modificó el equipo o herramienta llamado MOTOCIERRA', 6, '2019-08-11 16:40:33'),
(151, 'El usuario JOHN creó un cargo nuevo llamado CARGO 2', 6, '2019-11-05 19:50:47'),
(152, 'El usuario JOHN creó un cliente nuevo con No. de documento 63726372', 6, '2019-11-05 19:52:07'),
(153, 'El usuario JOHN creó un contrato nuevo con el ID 2', 6, '2019-11-05 19:53:06'),
(154, 'El usuario JOHN creó un campo nuevo llamado CAMPO 3', 6, '2019-11-05 19:53:58'),
(155, 'El usuario JOHN creó un nuevo centro costo llamado CENTRO COSTO 2', 6, '2019-11-05 19:54:50'),
(156, 'El usuario JOHN creó un personal nuevo con No. de documento 1075305650', 6, '2019-11-05 20:54:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_campos`
--

CREATE TABLE `tb_campos` (
  `id_campo` int(11) NOT NULL,
  `nombre_campo` text NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `departamento_campo` text NOT NULL,
  `municipio_campo` text NOT NULL,
  `ubicacion_campo` text NOT NULL,
  `longitud_campo` text NOT NULL,
  `latitud_campo` text NOT NULL,
  `estado_campo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_campos`
--

INSERT INTO `tb_campos` (`id_campo`, `nombre_campo`, `id_cliente`, `departamento_campo`, `municipio_campo`, `ubicacion_campo`, `longitud_campo`, `latitud_campo`, `estado_campo`, `fecha_registro`, `id_personal`) VALUES
(1, 'CAMPO 1', 1, 'HUILA', 'NEIVA', 'PADRO ALTO', '-75.2897', '2.92504', 2, '2019-08-06 03:00:46', 0),
(2, 'CAMPO 2', 1, 'HUILA', 'NEIVA', 'PADRO ALTO', '-75.2897', '2.92504', 1, '2019-08-02 01:02:31', 0),
(3, 'CAMPO 3', 1, 'HUILA', 'NEIVA', 'PADRO ALTO', '-75.2897', '2.92504', 2, '2019-08-06 03:04:14', 6),
(4, 'CAMPO 3', 2, 'HUILA', 'NEIVS', 'CALLE 3 # 22-11', '-100', '-90', 1, '2019-11-05 19:53:58', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cargos`
--

CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` text NOT NULL,
  `estado_cargo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_cargos`
--

INSERT INTO `tb_cargos` (`id_cargo`, `nombre_cargo`, `estado_cargo`, `fecha_registro`, `id_personal`) VALUES
(1, 'DESARROLLADOR DE SOFTWARE', 1, '2019-08-04 23:37:49', 6),
(2, 'ARQUITECTO', 1, '2019-08-05 00:10:58', 6),
(3, 'ABOGADO', 1, '2019-08-05 00:11:11', 6),
(4, 'AUXILIAR CONTABLE', 2, '2019-08-04 23:20:44', 6),
(5, 'CARGO 2', 1, '2019-11-05 19:50:46', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_centro_costos`
--

CREATE TABLE `tb_centro_costos` (
  `id_centro_costo` int(11) NOT NULL,
  `nombre_centro_costo` longtext NOT NULL,
  `abreviatura_centro_costo` varchar(10) NOT NULL,
  `estado_centro_costo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_centro_costos`
--

INSERT INTO `tb_centro_costos` (`id_centro_costo`, `nombre_centro_costo`, `abreviatura_centro_costo`, `estado_centro_costo`, `fecha_registro`, `id_personal`) VALUES
(1, 'TURKISH PETROLEUM INTERNATIONAL COMPANY LIMITED SUCURSAL COLOMBIA', 'TPC', 1, '2019-08-07 14:38:03', 0),
(2, 'PETROSOUTH ENERGY CORPORATION SUCURSAL COLOMBIA', 'PES', 2, '2019-08-07 14:35:28', 6),
(3, 'CENTRO COSTO 2', 'C.C.2', 1, '2019-11-05 19:54:50', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clientes`
--

CREATE TABLE `tb_clientes` (
  `id_cliente` int(11) NOT NULL,
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
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_clientes`
--

INSERT INTO `tb_clientes` (`id_cliente`, `tipo_documento_cliente`, `numero_documento_cliente`, `regimen_cliente`, `direccion_cliente`, `razon_social_cliente`, `email_cliente`, `telefono_cliente`, `extension_cliente`, `contacto_cliente`, `telefono_contacto_cliente`, `extension_contacto_cliente`, `pais_cliente`, `departamento_cliente`, `ciudad_cliente`, `estado_cliente`, `actividad_economica_cliente`, `fecha_registro`, `id_personal`) VALUES
(1, 'PASAPORTE', '123456789', 'Simplificado', 'BOGOTA', 'MASTER PAYS', 'INFO@DATIFI.COM', '3507518916', '12', 'LEONARDO JIMENEZ', '3115364067', '90', 'COLOMBIA', 'HUILA', 'NEIVA', 1, '                                                  HELLO WORD\r\n                                              ', '2019-07-27 03:34:16', 0),
(2, 'PASAPORTE', '63726372', 'Común', 'calle 8 #48-400', 'RAZON SOCIAL 2', 'correo@gmail.com', '31532328392', '57', 'hola', '28372838', '57', 'Colombia', 'Huila', 'Neiva', 1, 'wefwefhweufh', '2019-11-05 19:52:07', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_consignacion`
--

CREATE TABLE `tb_consignacion` (
  `id_consignacion` int(11) NOT NULL,
  `fecha_solicitud` date NOT NULL,
  `monto` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `numero_documento_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `placa_vehiculo` varchar(45) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_consignacion`
--

INSERT INTO `tb_consignacion` (`id_consignacion`, `fecha_solicitud`, `monto`, `id_personal`, `numero_documento_personal`, `id_planeacion`, `placa_vehiculo`, `descripcion`) VALUES
(1, '2019-09-29', 3000, 8, 8, 4, '1', 'prueba 9 santiago'),
(2, '2019-09-24', 4000, 6, 6, 3, '1', 'prueba nueva '),
(3, '2019-10-01', 6000, 8, 8, 4, '1', 'prueba ultima');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_contratos`
--

CREATE TABLE `tb_contratos` (
  `id_contrato` int(11) NOT NULL,
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
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_contratos`
--

INSERT INTO `tb_contratos` (`id_contrato`, `numero_contrato`, `descripcion_contrato`, `fecha_inicio_contrato`, `fecha_fin_contrato`, `bolsa_contrato`, `id_moneda`, `id_tipo_contrato`, `id_cliente`, `estado_contrato`, `fecha_registro`, `id_personal`) VALUES
(1, '123', 'CONTRATO 1', '2019-07-29', '2019-07-30', 'BOLSA DE PRUEBA', 1, 1, 1, 2, '2019-07-30 02:26:16', 0),
(2, '123456789', 'CONTRATO 1', '2019-08-05', '2019-08-13', 'BOLSA DE PRUEBA', 1, 1, 1, 2, '2019-08-06 02:14:35', 6),
(3, '2', 'CONTRATO 2', '2019-11-20', '2019-12-07', '28', 2, 1, 2, 1, '2019-11-05 19:53:06', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_costos_fijos`
--

CREATE TABLE `tb_costos_fijos` (
  `id_costo_fijo` int(11) NOT NULL,
  `descripcion_costo_fijo` text NOT NULL,
  `cantidad_costo_fijo` text NOT NULL,
  `precio_costo_fijo` text NOT NULL,
  `total_costo_fijo` text NOT NULL,
  `estado_costo_fijo` int(11) NOT NULL,
  `id_cargo` int(11) DEFAULT NULL,
  `id_contrato` int(11) DEFAULT NULL,
  `id_personal` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_costos_fijos`
--

INSERT INTO `tb_costos_fijos` (`id_costo_fijo`, `descripcion_costo_fijo`, `cantidad_costo_fijo`, `precio_costo_fijo`, `total_costo_fijo`, `estado_costo_fijo`, `id_cargo`, `id_contrato`, `id_personal`, `fecha_registro`) VALUES
(1, 'ENERGÍA', '0', '0', '0', 1, 4, NULL, 6, '2019-08-06 02:07:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cotizaciones`
--

CREATE TABLE `tb_cotizaciones` (
  `id_cotizacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `credito` int(11) NOT NULL,
  `trm` int(11) NOT NULL,
  `consecutivo` varchar(40) NOT NULL,
  `descuento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_cotizaciones`
--

INSERT INTO `tb_cotizaciones` (`id_cotizacion`, `id_planeacion`, `titulo`, `credito`, `trm`, `consecutivo`, `descuento`) VALUES
(6, 3, 'wqidij', 0, 2999, '0', 0),
(7, 5, 'titulo 2', 0, 5000, '0', 0),
(8, 4, 'ewijfijwefij', 0, 1000, '0', 0),
(16, 7, 'cotizacion 10', 0, 3100, '0', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cotizaciones_costos`
--

CREATE TABLE `tb_cotizaciones_costos` (
  `id_cotizacion_costo` int(11) NOT NULL,
  `id_cotizacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_cotizaciones_costos`
--

INSERT INTO `tb_cotizaciones_costos` (`id_cotizacion_costo`, `id_cotizacion`, `id_planeacion`, `tipo`, `descripcion`, `cantidad`, `id_unidad_medida`, `precio`, `id_moneda`) VALUES
(11, 16, 7, 1, 'prueba de costo', 2, 2, 2000, 2),
(12, 16, 7, 2, 'prueba de costo 2', 3, 2, 1000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipos`
--

CREATE TABLE `tb_equipos` (
  `id_equipo` int(11) NOT NULL,
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
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipos`
--

INSERT INTO `tb_equipos` (`id_equipo`, `nombre_equipo`, `descripcion_equipo`, `codigo_equipo`, `placa_equipo`, `id_proveedor`, `tuberia_equipo`, `alto_equipo`, `ancho_equipo`, `largo_equipo`, `diametro_equipo`, `ejes_equipo`, `peso_cargado_equipo`, `capacidad_equipo`, `dia_equipo`, `peso_base_equipo`, `marca_equipo`, `arriendo_equipo`, `fecha_inicio_tecno_equipo`, `fecha_fin_tecno_equipo`, `doc_tecnomecanica_equipo`, `fecha_inicio_propiedad_equipo`, `fecha_fin_propiedad_equipo`, `doc_tarjeta_propiedad_equipo`, `fecha_inicio_soat_equipo`, `fecha_fin_soat_equipo`, `doc_soat_equipo`, `fecha_inicio_grua_equipo`, `fecha_fin_grua_equipo`, `doc_grua_equipo`, `fecha_inicio_lmi_equipo`, `fecha_fin_lmi_equipo`, `doc_lmi_equipo`, `color_equipo`, `fecha_inicio_pliza_equipo`, `fecha_fin_pliza_equipo`, `doc_poliza_equipo`, `modelo_equipo`, `propietario_equipo`, `fecha_inicio_luz_equipo`, `fecha_fin_luz_equipo`, `doc_luz_equipo`, `fecha_inicio_licencia_equipo`, `fecha_fin_licencia_equipo`, `doc_licencia_equipo`, `fecha_inicio_inspeccion_equipo`, `fecha_fin_inspeccion_equipo`, `doc_inspeccion_equipo`, `id_tipo_equipo_herramienta`, `fecha_inicio_king_equipo`, `fecha_fin_king_equipo`, `doc_king_equipo`, `fecha_inicio_resolucion_equipo`, `fecha_fin_resolucion_equipo`, `doc_resolucion_equipo`, `estado_equipo`, `id_personal`, `fecha_registro`) VALUES
(1, 'MOTOCIERRA', 'PARACO HP', 'PARA90', 'CRT07', 1, 'ACERO', '13', '56', '150', '68', '12', '80', '23', 15, '45', 'LA MEJOR', 1, '2019-08-06', '2019-08-20', '1.pdf', '2019-08-21', '2019-08-23', '2.pdf', '2019-08-29', '2019-08-21', '3.pdf', '2019-08-30', '2019-08-21', '4.pdf', '2019-08-22', '2019-08-21', '5.pdf', 'ROJO', '2019-08-16', '2019-08-21', '6.pdf', '2019', 'JOHN JAIRO NARVAEZ TAMAYO', '2019-08-21', '2019-08-13', '7.pdf', '2019-08-23', '2019-08-20', '8.pdf', '2019-08-22', '2019-08-21', '9.pdf', 2, '2019-08-14', '2019-08-14', '10.pdf', '2019-08-14', '2019-08-21', '11.pdf', 1, 6, '2019-09-21 21:53:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_item_combustible`
--

CREATE TABLE `tb_equipo_item_combustible` (
  `id_equipo_item_combustible` int(11) NOT NULL,
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
  `confirmar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_item_combustible`
--

INSERT INTO `tb_equipo_item_combustible` (`id_equipo_item_combustible`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `id_moneda`, `cantidad`, `costo_unitario`, `medio_pago`, `fecha_inicio_mov`, `fecha_final_mov`, `fecha_inicio_demov`, `fecha_final_demov`, `fecha_inicio_gasto`, `fecha_final_gasto`, `fecha_inicio_gasto_standby`, `fecha_final_gasto_standby`, `fecha_1`, `fecha_2`, `id_mov_item_personal`, `id_mov_item_vehiculo`, `id_equipo_item_personal`, `id_equipo_item_equipo_herramienta`, `confirmar`) VALUES
(67, 7, 2, 1, 2, 0, 2, 2000, 1, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 0),
(70, 7, 2, 3, 1, 2, 20, 2000, 1, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 1),
(71, 7, 1, 3, 1, 0, 2, 2000, 1, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_item_equipo_herramienta`
--

CREATE TABLE `tb_equipo_item_equipo_herramienta` (
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
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
  `fecha_2` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_item_equipo_herramienta`
--

INSERT INTO `tb_equipo_item_equipo_herramienta` (`id_equipo_item_equipo_herramienta`, `id_planeacion`, `id_tipo_equipo_herramienta`, `vehiculo`, `carga`, `id_equipo_herramienta`, `cantidad`, `id_unidad_medida`, `id_rubro`, `id_moneda`, `medio_pago`, `costo_unitario`, `observaciones`, `id_mov_item_vehiculo`, `gasto_unitario`, `gasto_standby_unitario`, `fecha_inicio_gasto`, `fecha_final_gasto`, `fecha_inicio_gasto_standby`, `fecha_final_gasto_standby`, `fecha_1`, `fecha_2`) VALUES
(57, 7, 0, 1, 1, 0, 0, 2, 2, 2, '2', 1000, 'djdjdjd', 0, 1000, 1000, '2019-10-30', '2019-10-31', '2019-11-19', '2019-11-20', '2019-12-01', '2019-12-11'),
(59, 7, 0, 1, 1, 1, 2, 2, 2, 2, '1', 1000, 'jwidjwij', 46, 500, 5000, '2019-11-01', '2019-11-04', '2019-11-19', '2019-11-20', '2019-11-17', '2019-11-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_item_imprevistos`
--

CREATE TABLE `tb_equipo_item_imprevistos` (
  `id_equipo_item_imprevisto` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `fecha_imprevisto` datetime NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL,
  `id_mov_item_imprevisto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_item_imprevistos`
--

INSERT INTO `tb_equipo_item_imprevistos` (`id_equipo_item_imprevisto`, `id_planeacion`, `descripcion`, `id_moneda`, `fecha_imprevisto`, `id_rubro`, `id_unidad_medida`, `cantidad`, `costo_unitario`, `medio_pago`, `id_mov_item_imprevisto`) VALUES
(5, 7, 'descripcion de lo imprevisto', 2, '2019-11-29 00:00:00', 2, 2, 2, 2000, 2, 26),
(6, 7, 'prueba de algo', 2, '2019-11-30 00:00:00', 1, 2, 2, 2000, 2, 27),
(7, 7, 'prueba de imprevisto 2828', 2, '2019-11-28 00:00:00', 1, 2, 4, 4000, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_item_personal`
--

CREATE TABLE `tb_equipo_item_personal` (
  `id_equipo_item_personal` int(11) NOT NULL,
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
  `fecha_final_demov` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_item_personal`
--

INSERT INTO `tb_equipo_item_personal` (`id_equipo_item_personal`, `id_planeacion`, `id_cargo`, `id_personal`, `id_unidad_medida`, `id_moneda`, `cantidad`, `costo`, `id_tipo_asignacion`, `costo_unitario_rubro`, `medio_pago`, `id_rubro`, `id_mov_item_personal`, `fecha_inicio_mov`, `fecha_final_mov`, `fecha_inicio_demov`, `fecha_final_demov`) VALUES
(52, 7, 1, 6, 1, 2, 0, 166667, 0, 1000, 2, 2, 50, '2019-11-03', '2019-11-04', '2019-11-24', '2019-11-27'),
(54, 7, 2, 6, 2, 2, 0, 166667, 3, 0, 1, 1, 52, '2019-11-10', '2019-11-13', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_rubros_equipo_herramienta`
--

CREATE TABLE `tb_equipo_rubros_equipo_herramienta` (
  `id_equipo_rubro_equipo_herramienta` int(11) NOT NULL,
  `id_equipo_item_equipo_herramienta` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_rubros_equipo_herramienta`
--

INSERT INTO `tb_equipo_rubros_equipo_herramienta` (`id_equipo_rubro_equipo_herramienta`, `id_equipo_item_equipo_herramienta`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `cantidad`, `costo_unitario`, `medio_pago`) VALUES
(14, 58, 7, 2, 1, 1, 3, 4000, 1),
(15, 58, 7, 1, 4, 2, 4, 2000, 2),
(16, 57, 7, 2, 1, 2, 5, 5000, 1),
(17, 58, 7, 2, 1, 2, 5, 5000, 1),
(18, 59, 7, 2, 1, 2, 5, 5000, 1),
(19, 60, 7, 2, 1, 2, 5, 5000, 1),
(20, 61, 7, 1, 1, 2, 2, 2000, 2),
(21, 61, 7, 1, 3, 2, 10, 10000, 2),
(22, 57, 7, 1, 1, 2, 2, 2000, 2),
(23, 58, 7, 1, 1, 2, 2, 2000, 2),
(24, 59, 7, 1, 1, 2, 2, 2000, 2),
(25, 60, 7, 1, 1, 2, 2, 2000, 2),
(26, 61, 7, 1, 1, 2, 2, 2000, 2),
(27, 59, 7, 2, 3, 2, 3, 3000, 2),
(28, 60, 7, 2, 3, 2, 3, 3000, 2),
(29, 61, 7, 2, 3, 2, 3, 3000, 2),
(30, 57, 7, 1, 3, 1, 2, 2000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_equipo_rubros_personal`
--

CREATE TABLE `tb_equipo_rubros_personal` (
  `id_equipo_rubro_personal` int(11) NOT NULL,
  `id_equipo_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_equipo_rubros_personal`
--

INSERT INTO `tb_equipo_rubros_personal` (`id_equipo_rubro_personal`, `id_equipo_item_personal`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `cantidad`, `costo_unitario`, `medio_pago`) VALUES
(8, 51, 7, 2, 1, 1, 2, 2000, 1),
(9, 51, 7, 2, 1, 1, 1, 2000, 1),
(10, 51, 7, 1, 3, 2, 10, 5000, 2),
(11, 51, 7, 2, 1, 1, 20, 20000, 2),
(12, 50, 7, 2, 3, 2, 3, 3000, 1),
(13, 51, 7, 2, 3, 2, 3, 3000, 1),
(14, 52, 7, 2, 3, 2, 3, 3000, 1),
(15, 51, 7, 2, 1, 1, 2, 2000, 1),
(16, 51, 7, 2, 4, 2, 50, 1000, 2),
(17, 52, 7, 2, 4, 2, 50, 1000, 2),
(18, 52, 7, 2, 1, 2, 2, 2000, 1),
(19, 52, 7, 1, 1, 1, 2, 3000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_item`
--

CREATE TABLE `tb_item` (
  `id_item` int(11) NOT NULL,
  `numero_item` text NOT NULL,
  `descripcion_item` text NOT NULL,
  `cantidad_item` text NOT NULL,
  `valor_item` text NOT NULL,
  `bodega_item` text NOT NULL,
  `marca_item` text NOT NULL,
  `categoria_item` int(1) NOT NULL,
  `estado_item` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_item`
--

INSERT INTO `tb_item` (`id_item`, `numero_item`, `descripcion_item`, `cantidad_item`, `valor_item`, `bodega_item`, `marca_item`, `categoria_item`, `estado_item`, `fecha_registro`, `id_personal`) VALUES
(1, '123', 'ITEM 1', '2', '200.000', 'PRINCIPAL', 'NIKE', 1, 1, '2019-08-07 16:57:00', 0),
(2, '10', 'BOTIQUIN DE PRIMEROS AUXILIOS', '0', '0', '0', '0', 1, 1, '2019-08-07 16:58:57', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_monedas`
--

CREATE TABLE `tb_monedas` (
  `id_moneda` int(11) NOT NULL,
  `nombre_moneda` text NOT NULL,
  `abreviatura_moneda` text NOT NULL,
  `estado_moneda` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_monedas`
--

INSERT INTO `tb_monedas` (`id_moneda`, `nombre_moneda`, `abreviatura_moneda`, `estado_moneda`, `fecha_registro`, `id_personal`) VALUES
(1, 'DOLAR AMERICANO Y PESO COLOMBIANO', 'U/C', 2, '2019-08-07 19:27:18', 0),
(2, 'PESO COLOMBIANO', 'COP', 1, '2019-08-07 19:25:29', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_item_combustibles`
--

CREATE TABLE `tb_mov_item_combustibles` (
  `id_mov_item_combustible` int(11) NOT NULL,
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
  `confirmar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_item_combustibles`
--

INSERT INTO `tb_mov_item_combustibles` (`id_mov_item_combustible`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `cantidad`, `id_moneda`, `costo_unitario`, `medio_pago`, `fecha_inicio_mov`, `fecha_final_mov`, `fecha_inicio_demov`, `fecha_final_demov`, `fecha_inicio_gasto`, `fecha_final_gasto`, `fecha_inicio_gasto_standby`, `fecha_final_gasto_standby`, `fecha_1`, `fecha_2`, `id_mov_item_personal`, `id_mov_item_vehiculo`, `confirmar`) VALUES
(52, 7, 1, 1, 1, 2, 0, 3000, 1, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 0),
(54, 7, 2, 3, 1, 20, 2, 2000, 1, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_item_imprevistos`
--

CREATE TABLE `tb_mov_item_imprevistos` (
  `id_mov_item_imprevisto` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha_imprevisto` date NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_moneda` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_item_imprevistos`
--

INSERT INTO `tb_mov_item_imprevistos` (`id_mov_item_imprevisto`, `id_planeacion`, `descripcion`, `fecha_imprevisto`, `id_rubro`, `id_unidad_medida`, `cantidad`, `id_moneda`, `costo_unitario`, `medio_pago`) VALUES
(26, 7, 'descripcion de lo imprevisto', '2019-11-29', 2, 2, 2, 2, 2000, 2),
(27, 7, 'prueba de algo', '2019-11-30', 1, 2, 2, 2, 2000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_item_personal`
--

CREATE TABLE `tb_mov_item_personal` (
  `id_mov_item_personal` int(11) NOT NULL,
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
  `verificar` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_item_personal`
--

INSERT INTO `tb_mov_item_personal` (`id_mov_item_personal`, `id_planeacion`, `id_cargo`, `id_personal`, `id_unidad_medida`, `cantidad`, `id_moneda`, `medio_pago`, `costo_unitario_rubro`, `id_rubro`, `id_equipo`, `id_tipo_asignacion`, `fecha_inicio_mov`, `fecha_final_mov`, `fecha_inicio_demov`, `fecha_final_demov`, `total`, `verificar`) VALUES
(49, 7, 2, 6, 1, 1, 2, 1, 36000, 1, 1, 2, '2019-11-03', '2019-11-04', '2019-11-24', '2019-11-27', 166667, 0),
(50, 7, 1, 6, 1, 2, 2, 2, 1000, 2, 1, 2, '2019-11-03', '2019-11-04', '2019-11-24', '2019-11-27', 333333, 0),
(51, 7, 4, 6, 2, 4, 2, 1, 0, 1, 1, 2, '2019-11-17', '2019-11-21', '0000-00-00', '0000-00-00', 666667, 0),
(52, 7, 2, 6, 2, 3, 2, 1, 0, 1, 1, 3, '2019-11-10', '2019-11-13', '0000-00-00', '0000-00-00', 500000, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_item_vehiculos`
--

CREATE TABLE `tb_mov_item_vehiculos` (
  `id_mov_item_vehiculo` int(11) NOT NULL,
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
  `fecha_2` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_item_vehiculos`
--

INSERT INTO `tb_mov_item_vehiculos` (`id_mov_item_vehiculo`, `id_planeacion`, `vehiculo`, `carga`, `id_unidad_medida`, `id_moneda`, `gasto_unitario`, `gasto_standby_unitario`, `medio_pago`, `costo_unitario_rubro`, `id_rubro`, `observaciones`, `fecha_inicio_gasto`, `fecha_final_gasto`, `fecha_inicio_gasto_standby`, `fecha_final_gasto_standby`, `fecha_1`, `fecha_2`) VALUES
(46, 7, 1, 1, 2, 2, 500, 5000, '1', 1000, 2, 'jwidjwij', '2019-11-01', '2019-11-04', '0000-00-00', '0000-00-00', '2019-11-17', '2019-11-19'),
(47, 7, 1, 1, 1, 2, 2000, 5000, '1', 1000, 1, 'ijwofjowefj', '2019-11-01', '2019-11-04', '0000-00-00', '0000-00-00', '2019-11-17', '2019-11-19'),
(48, 7, 1, 1, 1, 2, 3000, 5000, '2', 0, 1, 'prueba de contado', '2019-11-01', '2019-11-04', '0000-00-00', '0000-00-00', '2019-11-17', '2019-11-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_rubros_personal`
--

CREATE TABLE `tb_mov_rubros_personal` (
  `id_mov_rubro_personal` int(11) NOT NULL,
  `id_mov_item_personal` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_rubros_personal`
--

INSERT INTO `tb_mov_rubros_personal` (`id_mov_rubro_personal`, `id_mov_item_personal`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `cantidad`, `costo_unitario`, `medio_pago`) VALUES
(18, 50, 7, 1, 1, 1, 2, 3000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mov_rubros_vehiculos`
--

CREATE TABLE `tb_mov_rubros_vehiculos` (
  `id_mov_rubro_vehiculo` int(11) NOT NULL,
  `id_mov_item_vehiculo` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `id_unidad_medida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `medio_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_mov_rubros_vehiculos`
--

INSERT INTO `tb_mov_rubros_vehiculos` (`id_mov_rubro_vehiculo`, `id_mov_item_vehiculo`, `id_planeacion`, `id_item`, `id_rubro`, `id_unidad_medida`, `cantidad`, `costo_unitario`, `medio_pago`) VALUES
(13, 47, 7, 2, 3, 2, 3, 3000, 2),
(14, 48, 7, 2, 3, 2, 3, 3000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_personal`
--

CREATE TABLE `tb_personal` (
  `id` int(11) NOT NULL,
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
  `fecha_conexion_personal` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_personal`
--

INSERT INTO `tb_personal` (`id`, `nombre_personal`, `apellido_personal`, `numero_documento_personal`, `fecha_expedicion_personal`, `lugar_expedicion_personal`, `fecha_nacimiento_personal`, `lugar_nacimiento_personal`, `edad_personal`, `rh_personal`, `genero_personal`, `telefono_personal`, `telefono_residencia_personal`, `direccion_residencia_personal`, `ciudad_personal`, `correo_corporativo_personal`, `correo_personal`, `profesion_personal`, `experiencia_personal`, `contrato_personal`, `id_cargo`, `id_base`, `fecha_ingreso_personal`, `fecha_retiro_personal`, `salario_personal`, `bono_salarial_personal`, `bono_no_salarial_personal`, `eps_personal`, `fecha_eps_personal`, `pension_personal`, `fecha_pension_personal`, `cesantias_personal`, `arl_personal`, `fecha_arl_personal`, `fecha_parafiscales_personal`, `sena_personal`, `icbf_personal`, `caja_personal`, `accidente_personal`, `accidente_telefono_personal`, `estado_personal`, `username`, `password`, `foto_personal`, `firma_personal`, `modulo_operaciones`, `generar_ticket`, `horas_trabajo`, `planeacion`, `gestion_template`, `reportes`, `control_costos`, `consignaciones`, `legalizacion`, `gestion_bonos`, `reportes_costos`, `movilizacion`, `aprobacion`, `ctrl_movilizacion`, `consultas`, `configuracion_general`, `bases`, `cargos`, `clientes`, `contratos`, `campos`, `centro_costos`, `equipo_herramienta`, `item`, `moneda`, `personal`, `proveedores`, `pozos`, `rubros`, `tipo_trabajos`, `tipo_contratos`, `tipo_pozos`, `tipo_equipos`, `usuarios`, `unidad_medida`, `festivos`, `bitacora`, `fecha_registro`, `id_personal`, `fecha_conexion_personal`) VALUES
(6, 'JOHN JAIRO', 'NARVAEZ TAMAYO', '1082215681', '2019-07-17', 'YAGUARA HUILA', '2019-07-02', 'YAGUARA', '26', 'B+', 'MASCULINO', '3115364067', '0', 'CALLE 6 # 7A-18', 'NEIVA', 'JOHN@GMAIL.COM', 'JOHN@GMAIL.COM', 'INGENIERO DE SOFTWARE', '6 AÑOS', 'INDEFINIDO', 1, 1, '2019-07-17', '2019-07-17', 5000000, 1000000, 2000000, 'SANITAS', '2019-07-17', 'PORVENIR', '2019-07-17', 'PORVENIR', 'BOLIVAR', '2019-07-17', '2019-07-17', 'NO', 'NO', 'COMFAMILIAR', 'MIGUEL ANGEL NARVAEZ', '3507518916', 1, 'JOHN', '$2a$10$REyQIUTThUwceovFLwlYXecjdBCsPGKVgr0Jf4Yi3izpHEg2iwY2y', 'foto.png', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2019-11-05 22:25:47', 0, '2019-11-05 17:25:47.410'),
(8, 'LEONARDO ', 'JIMENEZ', '1010', '2019-07-02', 'NEIVA-HUILA', '2019-07-25', 'NEIVA', '26', 'B+', 'MASCULINO', '3115364067', '0', 'CALLE 6 # 7A-18', 'NEIVA', 'ELMEJOR@GMAIL.COM', 'ELMEJOR@GMAIL.COM', 'INGENIERO DE SOFTWARE', '6 AÑOS', 'INDEFINIDO', 1, 1, '2019-07-25', '2019-07-29', 4000000, 500000, 1000000, 'SANITAS', '2019-07-25', 'PORVENIR', '2019-07-19', 'PORVENIR', 'BOLIVAR', '2019-07-26', '2019-07-27', 'NO', 'NO', 'COMFAMILIAR', 'EL MEJOR', '123', 1, 'CAMILA', '$2a$10$acwnbmmB5Avt2BBzc.cO3uMNLq6traXvmMmaR5N3EMy3zLjUanVye', '', 'descarga.png', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2019-11-05 20:50:23', 0, '2019-08-10 22:49:51'),
(9, 'NATALIA ', 'NARAJO NARVAEZ', '1072422473', '2019-08-07', 'YAGUARA HUILA', '2019-08-07', 'YAGUARA', '26', 'B+', 'MASCULINO', '3115364067', '0', 'CALLE 6 # 7A-18', 'NEIVA', 'JOHN@GMAIL.COM', 'JOHN@GMAIL.COM', 'INGENIERO DE SOFTWARE', '6 AÑOS', 'INDEFINIDO', 1, 1, '2019-07-31', '2019-08-10', 3000000, 2000000, 1000000, 'SANITAS', '2019-07-17', 'PORVENIR', '2019-08-07', 'PORVENIR', 'BOLIVAR', '2019-07-17', '2019-07-17', 'NO', 'NO', 'COMFAMILIAR', 'JOHN JAIRO NARVAEZ', '3507518916P', 1, 'S', '$2a$10$xRf8t5XWl2/HKDX7miWvpeNgpR0LiYdLXw97DcuJvvG9mTnpFY.zW', '', '', 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-11-05 20:51:19', 6, '2019-08-10 22:48:49'),
(10, 'JUAN MANUEL', 'CUELLAR BAHAMON', '1075305650', '291029', 'EFIEJ', '2019-11-11', 'NEIVA', '22', 'O+', 'MASCULINO', '8293829', '3227382', 'CALLE 8 #48-400', 'NEIVA', 'CORREO@GMAIL.COM', 'CORREO2@GMAIL.COM', 'KWDWOKD', 'WIJDIWJ', 'WIJDIWJ', 1, 1, '2019-11-17', '2019-11-22', 12912, 2832387, 2738237, 'NUEVA EPS', '2019-11-19', 'NO TENGO', '2019-11-27', 'EFKEFKQ', 'NO TENGO', '2019-11-24', '2019-11-29', 'EFEWF', 'WEFWEF', 'EWFEW', 'WEFWEFWEF', '239293', 1, 'MANUEL', '$2a$10$FUL7XgGYBa0ek1KctkY3bekts6LnVhYetVQeEvLBmt2wKwlRh7M/m', '', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2019-11-05 20:56:39', 6, '2019-11-05 15:56:39.282');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_planeacion`
--

CREATE TABLE `tb_planeacion` (
  `id_planeacion` int(11) NOT NULL,
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
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_planeacion`
--

INSERT INTO `tb_planeacion` (`id_planeacion`, `titulo`, `id_cliente`, `contacto`, `telefono`, `email`, `fecha_contacto`, `hora_contacto`, `id_personal`, `id_centro_costo`, `fecha_estimada`, `id_contrato`, `alojamiento`, `combustible`, `iluminacion`, `seguridad_fisica`, `personal`, `id_campo`, `id_personal_supervisor`, `id_moneda`, `objetivo_trabajo`, `requisitos_hse`, `observacion`, `trm`, `estado`) VALUES
(7, 'ya modifica la planeacionhshshs', 1, 'juan manuel hellow', '31532328392', 'juanmanuelcuellarbahamon123@gmail.c', '2019-10-13', '14:22:00', 6, 2, '2019-10-15', 2, 2, 1, 2, 1, 1, 3, 8, 2, 'objetivo del trabajo', 'requisito hse', 'observacion del servicio', 3000, 'Ejecucion'),
(8, 'planeacion 2', 1, 'yo mismo', '3222879918', 'juan_cuellarba@gmail.com', '2019-11-24', '02:00:00', 10, 2, '2019-11-29', 3, 2, 1, 1, 1, 1, 2, 8, 2, 'objetivo', 'requisito', 'bueno', 2000, 'Cotizacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pozos`
--

CREATE TABLE `tb_pozos` (
  `id_pozo` int(11) NOT NULL,
  `nombre_pozo` text NOT NULL,
  `id_campo` int(11) NOT NULL,
  `id_tipo_pozo` int(11) NOT NULL,
  `estado_pozo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_pozos`
--

INSERT INTO `tb_pozos` (`id_pozo`, `nombre_pozo`, `id_campo`, `id_tipo_pozo`, `estado_pozo`, `fecha_registro`, `id_personal`) VALUES
(1, 'POZO 1', 1, 1, 2, '2019-08-10 04:01:07', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pozos_planeacion`
--

CREATE TABLE `tb_pozos_planeacion` (
  `id_pozo_planeacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_pozo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_pozos_planeacion`
--

INSERT INTO `tb_pozos_planeacion` (`id_pozo_planeacion`, `id_planeacion`, `id_pozo`) VALUES
(1, 3, 1),
(5, 3, 1),
(6, 0, 1),
(7, 0, 1),
(8, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedor`
--

CREATE TABLE `tb_proveedor` (
  `id_proveedor` int(11) NOT NULL,
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
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_proveedor`
--

INSERT INTO `tb_proveedor` (`id_proveedor`, `tipo_documento_proveedor`, `numero_documento_proveedor`, `regimen_proveedor`, `rut_proveedor`, `razon_social_proveedor`, `contacto_proveedor`, `email_proveedor`, `telefono_proveedor`, `extension_proveedor`, `pais_proveedor`, `departamento_proveedor`, `ciudad_proveedor`, `direccion_proveedor`, `categoría_proveedor`, `area_influencia_proveedor`, `banco_proveedor`, `tipo_banco_proveedor`, `numero_cuenta_proveedor`, `seguridad_social_proveedor`, `certificado_bancario_proveedor`, `estado_proveedor`, `actividad_economica_proveedor`, `fecha_registro`, `id_personal`) VALUES
(1, 'CEDULA', '1082215681', 'Común', '123456', 'COLOMBIA SAS ', 'JOHN JAIRO NARVAEZ TAMAYO', 'JOHN@OPISOFT.COM', '3115364067', '87', 'COLOMBIA', 'HUILA', 'NEIVA', 'CALLE 6 # 7A-18', 'Mantenimiento', 'SI', 'BANCOLOMBIA', 'Corriente', '123456789', 'SI', '', 2, '                                                                                                                                                      ESTO ES UNA PRUEBA PARA EL MEJOR DE LOS MEJORES\r\n                                              \r\n                                              \r\n                                              ', '2019-08-10 03:47:20', 0),
(2, 'CEXTRANJERIA', '1072422473', 'Común', '1234', 'OPISOFT SAS', 'JOHN JAIRO NARVAEZ TAMAYO', 'JOHN@OPISOFT.COM', '3115364067', '87', 'COLOMBIA', 'HUILA', 'NEIVA', 'CALLE 6 # 7A-18', 'Herr.Superficie', 'SI', 'BANCOLOMBIA', 'Corriente', '1212312', '12312', '', 1, 'hola mundo', '2019-08-10 01:38:17', 6),
(3, 'CEDULA', '123123', 'Común', '23123', 'OPISOFT SAS', 'JOHN JAIRO NARVAEZ TAMAYO', 'JOHN@OPISOFT.COM', '3115364067', '87', 'COLOMBIA', 'HUILA', 'NEIVA', 'CALLE 6 # 7A-18', 'Mantenimiento', 'SI', 'BANCOLOMBIA', 'Corriente', '1212312', 'SI', '1.pdf', 2, '2312312', '2019-08-10 01:42:42', 6),
(4, 'NIT', '332432', 'Simplificado', '32423', 'OPISOFT SAS', 'JOHN JAIRO NARVAEZ TAMAYO', 'JOHN@OPISOFT.COM', '3115364067', '87', 'COLOMBIA', 'HUILA', 'NEIVA', 'CALLE 6 # 7A-18', 'Operacion', 'SI', 'BANCOLOMBIA', 'Corriente', '1212312', 'SI', '1.pdf', 1, '', '2019-08-10 01:47:53', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rubros`
--

CREATE TABLE `tb_rubros` (
  `id_rubro` int(11) NOT NULL,
  `sigla_rubro` text NOT NULL,
  `nombre_rubro` text NOT NULL,
  `estado_rubro` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_rubros`
--

INSERT INTO `tb_rubros` (`id_rubro`, `sigla_rubro`, `nombre_rubro`, `estado_rubro`, `fecha_registro`, `id_personal`) VALUES
(1, 'AM', 'ALOJAMIENTO Y MANUTENCION', 1, '2019-07-25 01:52:05', 0),
(2, 'AM', 'ALOJAMIENTO Y MANUTENCION', 2, '2019-08-10 04:08:36', 6),
(3, 'PU', 'puto', 0, '2019-09-29 01:30:29', 0),
(4, 'PM', 'MARIKA', 1, '2019-09-30 00:51:35', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rubros_consignacion`
--

CREATE TABLE `tb_rubros_consignacion` (
  `id_rubro_consignacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_rubro` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` int(11) NOT NULL,
  `costo_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipos_cotizacion`
--

CREATE TABLE `tb_tipos_cotizacion` (
  `id_tipo_cotizacion` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_asignacion`
--

CREATE TABLE `tb_tipo_asignacion` (
  `id_tipo_asignacion` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_asignacion`
--

INSERT INTO `tb_tipo_asignacion` (`id_tipo_asignacion`, `descripcion`, `estado`) VALUES
(1, 'Conductor', 'activo'),
(2, 'Ayudante', 'activo'),
(3, 'Pasajero', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_contratos`
--

CREATE TABLE `tb_tipo_contratos` (
  `id_tipo_contrato` int(11) NOT NULL,
  `nombre_tipo_contrato` text NOT NULL,
  `estado_tipo_contrato` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_contratos`
--

INSERT INTO `tb_tipo_contratos` (`id_tipo_contrato`, `nombre_tipo_contrato`, `estado_tipo_contrato`, `fecha_registro`, `id_personal`) VALUES
(1, 'ORDEN DE SERVICIO', 1, '2019-07-25 01:10:37', 0),
(2, 'RENTA MENSUAL V', 2, '2019-08-10 23:55:39', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_equipos_herramientas`
--

CREATE TABLE `tb_tipo_equipos_herramientas` (
  `id_tipo_equipo_herramienta` int(11) NOT NULL,
  `nombre_equipo_herramienta` text NOT NULL,
  `imagen_equipo_herramienta` text NOT NULL,
  `estado_equipo_herramienta` int(1) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_equipos_herramientas`
--

INSERT INTO `tb_tipo_equipos_herramientas` (`id_tipo_equipo_herramienta`, `nombre_equipo_herramienta`, `imagen_equipo_herramienta`, `estado_equipo_herramienta`, `id_personal`, `fecha_registro`) VALUES
(1, 'SODA CAUSTICA', 'descarga.jpg', 1, 6, '2019-08-11 00:53:09'),
(2, 'COILED TUBING', 'arches.jpg', 2, 6, '2019-08-11 02:44:31'),
(3, 'CAMION DE VACIO', 'camion-de-vacio-6.000-6.jpg', 2, 6, '2019-08-11 01:22:58'),
(4, 'CHOKE MANIFOLD ', 'a00402d316134727bf6552478e461472.jpg', 1, 6, '2019-08-11 00:55:19'),
(5, 'ACID TRAILER', 'descarga (1).jpg', 1, 6, '2019-08-11 00:56:09'),
(6, 'CAMA BAJA', '515.jpg', 1, 6, '2019-08-11 00:56:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_pozos`
--

CREATE TABLE `tb_tipo_pozos` (
  `id_tipo_pozo` int(11) NOT NULL,
  `nombre_tipo_pozo` text NOT NULL,
  `estado_tipo_pozo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_pozos`
--

INSERT INTO `tb_tipo_pozos` (`id_tipo_pozo`, `nombre_tipo_pozo`, `estado_tipo_pozo`, `fecha_registro`, `id_personal`) VALUES
(1, 'PRODUCTOR DE CRUDO', 1, '2019-07-25 00:33:51', 0),
(2, 'INYECTOR', 2, '2019-08-11 00:22:06', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_trabajos`
--

CREATE TABLE `tb_tipo_trabajos` (
  `id_tipo_trabajo` int(11) NOT NULL,
  `descripcion_tipo_trabajo` text NOT NULL,
  `promedio_costo_tipo_trabajo` text NOT NULL,
  `imagen_tipo_trabajo` text NOT NULL,
  `promedio_personal_tipo_estado` text NOT NULL,
  `estado_tipo_trabajo` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_trabajos`
--

INSERT INTO `tb_tipo_trabajos` (`id_tipo_trabajo`, `descripcion_tipo_trabajo`, `promedio_costo_tipo_trabajo`, `imagen_tipo_trabajo`, `promedio_personal_tipo_estado`, `estado_tipo_trabajo`, `fecha_registro`, `id_personal`) VALUES
(1, 'TRABAJO 1', '12', 'desarrollador-de-software.jpg', '987654321', 1, '2019-08-10 23:40:09', 0),
(2, 'TRABAJO 2', '123456789', 'desarrollador-de-software.jpg', '987654321', 2, '2019-08-10 23:39:46', 0),
(3, 'DESARROLLADOR DE SOFTWARE', '12', 'desarrollador-de-software.jpg', '12', 1, '2019-08-10 22:10:19', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_trabajo_planeacion`
--

CREATE TABLE `tb_tipo_trabajo_planeacion` (
  `id_tipo_trabajo_planeacion` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_tipo_trabajo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_trabajo_planeacion`
--

INSERT INTO `tb_tipo_trabajo_planeacion` (`id_tipo_trabajo_planeacion`, `id_planeacion`, `id_tipo_trabajo`) VALUES
(3, 1, 3),
(6, 3, 3),
(9, 7, 1),
(10, 7, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_unidad_medida`
--

CREATE TABLE `tb_unidad_medida` (
  `id_unidad_medida` int(11) NOT NULL,
  `nombre_unidad_medida` text NOT NULL,
  `abreviatura_unidad_medida` text NOT NULL,
  `estado_unidad_medida` int(1) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_personal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_unidad_medida`
--

INSERT INTO `tb_unidad_medida` (`id_unidad_medida`, `nombre_unidad_medida`, `abreviatura_unidad_medida`, `estado_unidad_medida`, `fecha_registro`, `id_personal`) VALUES
(1, 'MINUTOS', 'MIN', 1, '2019-08-11 03:58:40', 0),
(2, 'KILOVATIOS', 'KVA', 2, '2019-08-11 03:55:17', 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tb_bases`
--
ALTER TABLE `tb_bases`
  ADD PRIMARY KEY (`id_base`);

--
-- Indices de la tabla `tb_bitacora`
--
ALTER TABLE `tb_bitacora`
  ADD PRIMARY KEY (`id_bitacora`);

--
-- Indices de la tabla `tb_campos`
--
ALTER TABLE `tb_campos`
  ADD PRIMARY KEY (`id_campo`);

--
-- Indices de la tabla `tb_cargos`
--
ALTER TABLE `tb_cargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `tb_centro_costos`
--
ALTER TABLE `tb_centro_costos`
  ADD PRIMARY KEY (`id_centro_costo`);

--
-- Indices de la tabla `tb_clientes`
--
ALTER TABLE `tb_clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `tb_consignacion`
--
ALTER TABLE `tb_consignacion`
  ADD PRIMARY KEY (`id_consignacion`);

--
-- Indices de la tabla `tb_contratos`
--
ALTER TABLE `tb_contratos`
  ADD PRIMARY KEY (`id_contrato`);

--
-- Indices de la tabla `tb_costos_fijos`
--
ALTER TABLE `tb_costos_fijos`
  ADD PRIMARY KEY (`id_costo_fijo`);

--
-- Indices de la tabla `tb_cotizaciones`
--
ALTER TABLE `tb_cotizaciones`
  ADD PRIMARY KEY (`id_cotizacion`);

--
-- Indices de la tabla `tb_cotizaciones_costos`
--
ALTER TABLE `tb_cotizaciones_costos`
  ADD PRIMARY KEY (`id_cotizacion_costo`);

--
-- Indices de la tabla `tb_equipos`
--
ALTER TABLE `tb_equipos`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `tb_equipo_item_combustible`
--
ALTER TABLE `tb_equipo_item_combustible`
  ADD PRIMARY KEY (`id_equipo_item_combustible`);

--
-- Indices de la tabla `tb_equipo_item_equipo_herramienta`
--
ALTER TABLE `tb_equipo_item_equipo_herramienta`
  ADD PRIMARY KEY (`id_equipo_item_equipo_herramienta`);

--
-- Indices de la tabla `tb_equipo_item_imprevistos`
--
ALTER TABLE `tb_equipo_item_imprevistos`
  ADD PRIMARY KEY (`id_equipo_item_imprevisto`);

--
-- Indices de la tabla `tb_equipo_item_personal`
--
ALTER TABLE `tb_equipo_item_personal`
  ADD PRIMARY KEY (`id_equipo_item_personal`);

--
-- Indices de la tabla `tb_equipo_rubros_equipo_herramienta`
--
ALTER TABLE `tb_equipo_rubros_equipo_herramienta`
  ADD PRIMARY KEY (`id_equipo_rubro_equipo_herramienta`);

--
-- Indices de la tabla `tb_equipo_rubros_personal`
--
ALTER TABLE `tb_equipo_rubros_personal`
  ADD PRIMARY KEY (`id_equipo_rubro_personal`);

--
-- Indices de la tabla `tb_item`
--
ALTER TABLE `tb_item`
  ADD PRIMARY KEY (`id_item`);

--
-- Indices de la tabla `tb_monedas`
--
ALTER TABLE `tb_monedas`
  ADD PRIMARY KEY (`id_moneda`);

--
-- Indices de la tabla `tb_mov_item_combustibles`
--
ALTER TABLE `tb_mov_item_combustibles`
  ADD PRIMARY KEY (`id_mov_item_combustible`);

--
-- Indices de la tabla `tb_mov_item_imprevistos`
--
ALTER TABLE `tb_mov_item_imprevistos`
  ADD PRIMARY KEY (`id_mov_item_imprevisto`);

--
-- Indices de la tabla `tb_mov_item_personal`
--
ALTER TABLE `tb_mov_item_personal`
  ADD PRIMARY KEY (`id_mov_item_personal`);

--
-- Indices de la tabla `tb_mov_item_vehiculos`
--
ALTER TABLE `tb_mov_item_vehiculos`
  ADD PRIMARY KEY (`id_mov_item_vehiculo`);

--
-- Indices de la tabla `tb_mov_rubros_personal`
--
ALTER TABLE `tb_mov_rubros_personal`
  ADD PRIMARY KEY (`id_mov_rubro_personal`);

--
-- Indices de la tabla `tb_mov_rubros_vehiculos`
--
ALTER TABLE `tb_mov_rubros_vehiculos`
  ADD PRIMARY KEY (`id_mov_rubro_vehiculo`);

--
-- Indices de la tabla `tb_personal`
--
ALTER TABLE `tb_personal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_planeacion`
--
ALTER TABLE `tb_planeacion`
  ADD PRIMARY KEY (`id_planeacion`);

--
-- Indices de la tabla `tb_pozos`
--
ALTER TABLE `tb_pozos`
  ADD PRIMARY KEY (`id_pozo`);

--
-- Indices de la tabla `tb_pozos_planeacion`
--
ALTER TABLE `tb_pozos_planeacion`
  ADD PRIMARY KEY (`id_pozo_planeacion`);

--
-- Indices de la tabla `tb_proveedor`
--
ALTER TABLE `tb_proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `tb_rubros`
--
ALTER TABLE `tb_rubros`
  ADD PRIMARY KEY (`id_rubro`);

--
-- Indices de la tabla `tb_tipos_cotizacion`
--
ALTER TABLE `tb_tipos_cotizacion`
  ADD PRIMARY KEY (`id_tipo_cotizacion`);

--
-- Indices de la tabla `tb_tipo_asignacion`
--
ALTER TABLE `tb_tipo_asignacion`
  ADD PRIMARY KEY (`id_tipo_asignacion`);

--
-- Indices de la tabla `tb_tipo_contratos`
--
ALTER TABLE `tb_tipo_contratos`
  ADD PRIMARY KEY (`id_tipo_contrato`);

--
-- Indices de la tabla `tb_tipo_equipos_herramientas`
--
ALTER TABLE `tb_tipo_equipos_herramientas`
  ADD PRIMARY KEY (`id_tipo_equipo_herramienta`);

--
-- Indices de la tabla `tb_tipo_pozos`
--
ALTER TABLE `tb_tipo_pozos`
  ADD PRIMARY KEY (`id_tipo_pozo`);

--
-- Indices de la tabla `tb_tipo_trabajos`
--
ALTER TABLE `tb_tipo_trabajos`
  ADD PRIMARY KEY (`id_tipo_trabajo`);

--
-- Indices de la tabla `tb_tipo_trabajo_planeacion`
--
ALTER TABLE `tb_tipo_trabajo_planeacion`
  ADD PRIMARY KEY (`id_tipo_trabajo_planeacion`);

--
-- Indices de la tabla `tb_unidad_medida`
--
ALTER TABLE `tb_unidad_medida`
  ADD PRIMARY KEY (`id_unidad_medida`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_bases`
--
ALTER TABLE `tb_bases`
  MODIFY `id_base` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_bitacora`
--
ALTER TABLE `tb_bitacora`
  MODIFY `id_bitacora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de la tabla `tb_campos`
--
ALTER TABLE `tb_campos`
  MODIFY `id_campo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_cargos`
--
ALTER TABLE `tb_cargos`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_centro_costos`
--
ALTER TABLE `tb_centro_costos`
  MODIFY `id_centro_costo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_clientes`
--
ALTER TABLE `tb_clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_consignacion`
--
ALTER TABLE `tb_consignacion`
  MODIFY `id_consignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_contratos`
--
ALTER TABLE `tb_contratos`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_costos_fijos`
--
ALTER TABLE `tb_costos_fijos`
  MODIFY `id_costo_fijo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_cotizaciones`
--
ALTER TABLE `tb_cotizaciones`
  MODIFY `id_cotizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tb_cotizaciones_costos`
--
ALTER TABLE `tb_cotizaciones_costos`
  MODIFY `id_cotizacion_costo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tb_equipos`
--
ALTER TABLE `tb_equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_item_combustible`
--
ALTER TABLE `tb_equipo_item_combustible`
  MODIFY `id_equipo_item_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_item_equipo_herramienta`
--
ALTER TABLE `tb_equipo_item_equipo_herramienta`
  MODIFY `id_equipo_item_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_item_imprevistos`
--
ALTER TABLE `tb_equipo_item_imprevistos`
  MODIFY `id_equipo_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_item_personal`
--
ALTER TABLE `tb_equipo_item_personal`
  MODIFY `id_equipo_item_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_rubros_equipo_herramienta`
--
ALTER TABLE `tb_equipo_rubros_equipo_herramienta`
  MODIFY `id_equipo_rubro_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `tb_equipo_rubros_personal`
--
ALTER TABLE `tb_equipo_rubros_personal`
  MODIFY `id_equipo_rubro_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tb_item`
--
ALTER TABLE `tb_item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_monedas`
--
ALTER TABLE `tb_monedas`
  MODIFY `id_moneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_mov_item_combustibles`
--
ALTER TABLE `tb_mov_item_combustibles`
  MODIFY `id_mov_item_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `tb_mov_item_imprevistos`
--
ALTER TABLE `tb_mov_item_imprevistos`
  MODIFY `id_mov_item_imprevisto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tb_mov_item_personal`
--
ALTER TABLE `tb_mov_item_personal`
  MODIFY `id_mov_item_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `tb_mov_item_vehiculos`
--
ALTER TABLE `tb_mov_item_vehiculos`
  MODIFY `id_mov_item_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `tb_mov_rubros_personal`
--
ALTER TABLE `tb_mov_rubros_personal`
  MODIFY `id_mov_rubro_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tb_mov_rubros_vehiculos`
--
ALTER TABLE `tb_mov_rubros_vehiculos`
  MODIFY `id_mov_rubro_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tb_personal`
--
ALTER TABLE `tb_personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_planeacion`
--
ALTER TABLE `tb_planeacion`
  MODIFY `id_planeacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tb_pozos`
--
ALTER TABLE `tb_pozos`
  MODIFY `id_pozo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_pozos_planeacion`
--
ALTER TABLE `tb_pozos_planeacion`
  MODIFY `id_pozo_planeacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_proveedor`
--
ALTER TABLE `tb_proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_rubros`
--
ALTER TABLE `tb_rubros`
  MODIFY `id_rubro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_tipos_cotizacion`
--
ALTER TABLE `tb_tipos_cotizacion`
  MODIFY `id_tipo_cotizacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_asignacion`
--
ALTER TABLE `tb_tipo_asignacion`
  MODIFY `id_tipo_asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_contratos`
--
ALTER TABLE `tb_tipo_contratos`
  MODIFY `id_tipo_contrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_equipos_herramientas`
--
ALTER TABLE `tb_tipo_equipos_herramientas`
  MODIFY `id_tipo_equipo_herramienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_pozos`
--
ALTER TABLE `tb_tipo_pozos`
  MODIFY `id_tipo_pozo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_trabajos`
--
ALTER TABLE `tb_tipo_trabajos`
  MODIFY `id_tipo_trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_trabajo_planeacion`
--
ALTER TABLE `tb_tipo_trabajo_planeacion`
  MODIFY `id_tipo_trabajo_planeacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_unidad_medida`
--
ALTER TABLE `tb_unidad_medida`
  MODIFY `id_unidad_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
