const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/monedas', isLoggedIn, async (req, res) => {
    const monedas = await pool.query('SELECT * FROM tb_monedas');
    res.render('monedas/monedas', { monedas });
});

router.post('/monedas', async (req, res) => {

    const { nombre_moneda} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó una nueva moneda llamada "+nombre_moneda;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;

    await pool.query('INSERT INTO tb_monedas set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/monedas');
});

router.get('/editar-moneda/:id_moneda', isLoggedIn, async (req, res) => {
    
    const { id_moneda } = req.params;
    const moneda = await pool.query('SELECT * FROM tb_monedas WHERE id_moneda = ?', [id_moneda]);

    res.render('monedas/editar', { moneda: moneda[0]});
});

router.post('/editar-moneda/:id_moneda', isLoggedIn , async (req, res) => {

    const { id_moneda } = req.params;
    const { nombre_moneda} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó la moneda "+nombre_moneda;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_monedas set ? WHERE id_moneda = ?', [array, id_moneda]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/monedas');
});

module.exports = router;