const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/planeadoEjecutado', isLoggedIn, async (req, res) => {
  const planeacion = await pool.query("SELECT id_planeacion, titulo FROM tb_planeacion");
  res.render('reporteEjecutadoPlaneado/reporteEjecutadoPlaneado', {
    planeacion: planeacion
  });
});
module.exports = router;