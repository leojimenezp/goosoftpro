const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/tipo-pozos', isLoggedIn, async (req, res) => {
  const tipo_pozos = await pool.query('SELECT * FROM tb_tipo_pozos');
  res.render('tipo-pozos/tipo-pozos', {
    tipo_pozos
  });
});
router.get('/eliminar-pozoss/:id_tipo_pozo', isLoggedIn, async (req, res) => {
  const {
    id_tipo_pozo
  } = req.params;
  const bases = await pool.query(`DELETE FROM tb_tipo_pozos WHERE id_tipo_pozo ='${id_tipo_pozo}'`);
  res.redirect('/tipo-pozos');
});
router.post('/tipo-pozos', isLoggedIn, async (req, res) => {
  const {
    nombre_tipo_pozo
  } = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " creó un tipo de pozo nuevo llamado " + nombre_tipo_pozo;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  const array = req.body;
  await pool.query('INSERT INTO tb_tipo_pozos set ?', [array]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro exitoso!');
  res.redirect('/tipo-pozos');
});
router.get('/editar-tipo-pozo/:id_tipo_pozo', isLoggedIn, async (req, res) => {
  const {
    id_tipo_pozo
  } = req.params;
  const tipo_pozo = await pool.query('SELECT * FROM tb_tipo_pozos WHERE id_tipo_pozo = ?', [id_tipo_pozo]);
  res.render('tipo-pozos/editar', {
    tipo_pozo: tipo_pozo[0]
  });
});
router.post('/editar-tipo-pozo/:id_tipo_pozo', isLoggedIn, async (req, res) => {
  const {
    id_tipo_pozo
  } = req.params;
  const {
    nombre_tipo_pozo
  } = req.body;
  const array = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " modificó el tipo de pozo llamado " + nombre_tipo_pozo;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  await pool.query('UPDATE tb_tipo_pozos set ? WHERE id_tipo_pozo = ?', [array, id_tipo_pozo]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/tipo-pozos');
});
module.exports = router;