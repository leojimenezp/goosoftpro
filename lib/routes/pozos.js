const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/pozos', isLoggedIn, async (req, res) => {
  const pozos = await pool.query('SELECT * FROM tb_pozos p, tb_campos c, tb_tipo_pozos tp WHERE p.id_campo=c.id_campo AND p.id_tipo_pozo=tp.id_tipo_pozo');
  res.render('pozos/pozos', {
    pozos
  });
});
router.get('/pozos/crear', isLoggedIn, async (req, res) => {
  const campos = await pool.query('SELECT id_campo,nombre_campo FROM tb_campos WHERE estado_campo = ?', [1]);
  const tipo_pozos = await pool.query('SELECT id_tipo_pozo,nombre_tipo_pozo FROM tb_tipo_pozos WHERE estado_tipo_pozo = ?', [1]);
  res.render('pozos/crear', {
    campos,
    tipo_pozos
  });
});
router.get('/eliminar-pozo/:id_pozo', isLoggedIn, async (req, res) => {
  const {
    id_pozo
  } = req.params;
  const bases = await pool.query(`DELETE FROM tb_pozos WHERE id_pozo ='${id_pozo}'`);
  res.redirect('/pozos');
});
router.post('/pozos', async (req, res) => {
  const {
    nombre_pozo
  } = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " creó un nuevo pozo llamado " + nombre_pozo;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  const array = req.body;
  await pool.query('INSERT INTO tb_pozos set ?', [array]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro exitoso!');
  res.redirect('/pozos');
});
router.get('/editar-pozo/:id_pozo', isLoggedIn, async (req, res) => {
  const {
    id_pozo
  } = req.params;
  const pozo = await pool.query('SELECT * FROM tb_pozos WHERE id_pozo = ?', [id_pozo]);
  const campos = await pool.query('SELECT id_campo,nombre_campo FROM tb_campos');
  const tipo_pozos = await pool.query('SELECT id_tipo_pozo,nombre_tipo_pozo FROM tb_tipo_pozos');
  res.render('pozos/editar', {
    pozo: pozo[0],
    campos,
    tipo_pozos
  });
});
router.post('/editar-pozo/:id_pozo', isLoggedIn, async (req, res) => {
  const {
    id_pozo
  } = req.params;
  const {
    nombre_pozo
  } = req.body;
  const array = req.body;
  const descripcion_bitacora = "El usuario " + req.user.username + " modificó el pozo llamado " + nombre_pozo;
  const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id
  };
  await pool.query('UPDATE tb_pozos set ? WHERE id_pozo = ?', [array, id_pozo]);
  await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
  req.flash('success', 'Registro moficicado exitosamente!');
  res.redirect('/pozos');
});
module.exports = router;