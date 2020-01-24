const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/rubros', isLoggedIn, async (req, res) => {
  const rubros = await pool.query('SELECT * FROM tb_rubros');
  res.render('rubros/rubros', {
    rubros
  });
});
router.get('/eliminar-rubro/:id_rubro', isLoggedIn, async (req, res) => {
  const {
    id_rubro
  } = req.params;
  const bases = await pool.query(`DELETE FROM tb_rubros WHERE id_rubro ='${id_rubro}'`);
  res.redirect('/rubros');
});
router.post('/rubros', isLoggedIn, async (req, res) => {
  const {
    nombre_rubro
  } = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " creó un rubro nuevo llamado " + nombre_rubro;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  const array = req.body;
  await pool.query('INSERT INTO tb_rubros set ?', [array]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro exitoso!');
  res.redirect('/rubros');
});
router.get('/editar-rubro/:id_rubro', isLoggedIn, async (req, res) => {
  const {
    id_rubro
  } = req.params;
  const rubro = await pool.query('SELECT * FROM tb_rubros WHERE id_rubro = ?', [id_rubro]);
  res.render('rubros/editar', {
    rubro: rubro[0]
  });
});
router.post('/editar-rubro/:id_rubro', isLoggedIn, async (req, res) => {
  const {
    id_rubro
  } = req.params;
  const {
    nombre_rubro
  } = req.body;
  const array = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " modificó el rubro llamado " + nombre_rubro;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  await pool.query('UPDATE tb_rubros set ? WHERE id_rubro = ?', [array, id_rubro]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/rubros');
});
module.exports = router;