
CREATE TABLE `tb_ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(11) DEFAULT NULL,
  `equipo` varchar(200) DEFAULT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `fecha` date DEFAULT current_timestamp(),
  `descuento` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;