const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/calendario', isLoggedIn, async (req, res) => {
    const consulta = await pool.query(`SELECT  * FROM tb_festivos `);
    res.render('calendario/calendario', {
        consulta: consulta
    });
});
router.get('/agregarfestivo', isLoggedIn, async (req, res) => {

    res.render('calendario/agregar_festivo');
});
router.post('/agregarfestivos', isLoggedIn, async (req, res) => {

    const { fecha, descripcion } = req.body;
    console.log(req.body);
    await pool.query(`INSERT INTO tb_festivos(fecha,descripcion)  VALUE('${fecha}','${descripcion}')`);
    res.redirect('/calendario');
});
router.get('/eliminarfestivo/:id_festivo', isLoggedIn, async (req, res) => {
    const { id_festivo } = req.params;
    await pool.query(`DELETE FROM tb_festivos WHERE id_festivo='${id_festivo}'`);

    res.redirect('/calendario');
});

module.exports = router;