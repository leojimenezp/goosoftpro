const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/bases', isLoggedIn, async (req, res) => {
  const bases = await pool.query('SELECT * FROM tb_bases');
  res.render('bases/bases', {
    bases
  });
});
router.post('/bases', isLoggedIn, async (req, res) => {
  const {
    nombre_base
  } = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " creó una nueva base llamada " + nombre_base;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  const array = req.body;
  await pool.query('INSERT INTO tb_bases set ?', [array]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro exitoso!');
  res.redirect('/bases');
});
router.get('/editar-base/:id_base', isLoggedIn, async (req, res) => {
  const {
    id_base
  } = req.params;
  const bases = await pool.query('SELECT * FROM tb_bases WHERE id_base = ?', [id_base]);
  res.render('bases/editar', {
    bases: bases[0]
  });
});
router.get('/eliminar-base/:id_base/:nombre_base', isLoggedIn, async (req, res) => {
  const {
    nombre_base
  } = req.params;
  const {
    id_base
  } = req.params;
  const descripcion_bitacora = "El usuario " + req.user.username + " borro una nueva base llamada " + nombre_base;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  const bases = await pool.query(`DELETE FROM tb_bases WHERE id_base ='${id_base}'`);
  res.redirect('/bases');
});
router.post('/editar-base/:id_base', isLoggedIn, async (req, res) => {
  const {
    id_base
  } = req.params;
  const {
    nombre_base
  } = req.body;
  const array = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " modificó la base " + nombre_base;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  await pool.query('UPDATE tb_bases set ? WHERE id_base = ?', [array, id_base]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/bases');
});
router.get('/map-base/:id_base', isLoggedIn, async (req, res) => {
  const {
    id_base
  } = req.params;
  const bases = await pool.query('SELECT nombre_base,longitud_base,latitud_base FROM tb_bases WHERE id_base = ?', [id_base]);
  res.render('bases/map', {
    bases: bases[0]
  });
});
module.exports = router;