const express = require('express');

const router = express.Router();

const path = require('path');

const helpers = require('../lib/helpers');

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

const passport = require('passport');

router.get('/usuarios', isLoggedIn, async (req, res) => {
  const usuarios = await pool.query('SELECT p.id,p.firma_personal,p.fecha_conexion_personal,p.username,p.id_cargo,p.estado_personal,c.nombre_cargo FROM tb_personal p, tb_cargos c WHERE p.id_cargo=c.id_cargo AND p.username IS NOT NULL');
  res.render('usuarios/usuarios', {
    usuarios
  });
});
router.get('/usuarios/crear', isLoggedIn, async (req, res) => {
  const personal = await pool.query('SELECT id,nombre_personal,apellido_personal FROM tb_personal WHERE estado_personal = 1 AND username IS NULL');
  res.render('usuarios/crear', {
    personal
  });
});
router.post('/usuarios/crear', isLoggedIn, passport.authenticate('crear.usuario', {
  successRedirect: '/usuarios',
  failureRedirect: '/usuarios',
  failureFlash: true
}));
router.get('/editar-usuario/:id', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.params;
  const usuario = await pool.query('SELECT * FROM tb_personal WHERE id = ?', [id]);
  res.render('usuarios/editar', {
    usuario: usuario[0]
  });
});
router.post('/editar-usuario/:id', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.params;
  let {
    contrasena,
    cambiar_clave,
    estado_personal,
    modulo_operaciones,
    generar_ticket,
    horas_trabajo,
    planeacion,
    gestion_template,
    reportes,
    control_costos,
    consignaciones,
    permiso_aceptar,
    legalizacion,
    gestion_bonos,
    reportes_costos,
    movilizacion,
    aprobacion,
    ctrl_movilizacion,
    consultas,
    configuracion_general,
    bases,
    cargos,
    clientes,
    contratos,
    campos,
    centro_costos,
    equipo_herramienta,
    item,
    moneda,
    personal,
    proveedores,
    pozos,
    rubros,
    tipo_trabajos,
    tipo_contratos,
    tipo_pozos,
    tipo_equipos,
    usuarios,
    unidad_medida,
    festivos,
    bitacora
  } = req.body;
  console.log(cambiar_clave);

  if (cambiar_clave == '1') {
    password = await helpers.encryptPassword(contrasena);
    console.log(password);
    await pool.query(`UPDATE tb_personal SET password='${password}'  WHERE id = ${id}`);
  }

  if (estado_personal == undefined) {
    estado_personal = 0;
  }

  if (modulo_operaciones == undefined) {
    modulo_operaciones = 0;
  }

  if (generar_ticket == undefined) {
    generar_ticket = 0;
  }

  if (horas_trabajo == undefined) {
    horas_trabajo = 0;
  }

  if (planeacion == undefined) {
    planeacion = 0;
  }

  if (gestion_template == undefined) {
    gestion_template = 0;
  }

  if (reportes == undefined) {
    reportes = 0;
  }

  if (control_costos == undefined) {
    control_costos = 0;
  }

  if (consignaciones == undefined) {
    consignaciones = 0;
  }

  if (permiso_aceptar == undefined) {
    permiso_aceptar = 0;
  }

  if (legalizacion == undefined) {
    legalizacion = 0;
  }

  if (gestion_bonos == undefined) {
    gestion_bonos = 0;
  }

  if (reportes_costos == undefined) {
    reportes_costos = 0;
  }

  if (movilizacion == undefined) {
    movilizacion = 0;
  }

  if (aprobacion == undefined) {
    aprobacion = 0;
  }

  if (ctrl_movilizacion == undefined) {
    ctrl_movilizacion = 0;
  }

  if (consultas == undefined) {
    consultas = 0;
  }

  if (configuracion_general == undefined) {
    configuracion_general = 0;
  }

  if (cargos == undefined) {
    cargos = 0;
  }

  if (clientes == undefined) {
    clientes = 0;
  }

  if (contratos == undefined) {
    contratos = 0;
  }

  if (campos == undefined) {
    campos = 0;
  }

  if (centro_costos == undefined) {
    centro_costos = 0;
  }

  if (equipo_herramienta == undefined) {
    equipo_herramienta = 0;
  }

  if (item == undefined) {
    item = 0;
  }

  if (moneda == undefined) {
    moneda = 0;
  }

  if (personal == undefined) {
    personal = 0;
  }

  if (proveedores == undefined) {
    proveedores = 0;
  }

  if (pozos == undefined) {
    pozos = 0;
  }

  if (rubros == undefined) {
    rubros = 0;
  }

  if (tipo_trabajos == undefined) {
    tipo_trabajos = 0;
  }

  if (tipo_pozos == undefined) {
    tipo_pozos = 0;
  }

  if (tipo_equipos == undefined) {
    tipo_equipos = 0;
  }

  if (usuarios == undefined) {
    usuarios = 0;
  }

  if (unidad_medida == undefined) {
    unidad_medida = 0;
  }

  if (festivos == undefined) {
    festivos = 0;
  }

  if (bases == undefined) {
    bases = 0;
  }

  if (bitacora == undefined) {
    bitacora = 0;
  }

  if (tipo_contratos == undefined) {
    tipo_contratos = 0;
  }

  array = {
    estado_personal,
    modulo_operaciones,
    generar_ticket,
    horas_trabajo,
    planeacion,
    gestion_template,
    reportes,
    control_costos,
    consignaciones,
    permiso_aceptar,
    legalizacion,
    gestion_bonos,
    reportes_costos,
    movilizacion,
    aprobacion,
    ctrl_movilizacion,
    consultas,
    configuracion_general,
    bases,
    cargos,
    clientes,
    contratos,
    campos,
    centro_costos,
    equipo_herramienta,
    item,
    moneda,
    personal,
    proveedores,
    pozos,
    rubros,
    tipo_trabajos,
    tipo_contratos,
    tipo_pozos,
    tipo_equipos,
    usuarios,
    unidad_medida,
    festivos,
    bitacora
  };
  console.log(array);
  await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, id]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/usuarios');
});
router.post('/agregar-firma-usuario/:id', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.params;
  const firma_personal = req.files.firma_personal;
  const array = {
    firma_personal: firma_personal.name
  };
  firma_personal.mv(path.join('src/public/firmas-usuarios/', firma_personal.name));
  await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, id]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/usuarios');
});
router.get('/logout', async (req, res) => {
  const array = {
    fecha_conexion_personal: new Date()
  };
  await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, req.user.id]);
  req.logOut();
  res.redirect('/');
});
module.exports = router;