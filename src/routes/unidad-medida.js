const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/unidad-medida', isLoggedIn, async (req, res) => {
    const unidad_medida = await pool.query('SELECT * FROM tb_unidad_medida');
    res.render('unidad-medida/unidad-medida', { unidad_medida });
});

router.get('/eliminar-medida/:id_unidad_medida', isLoggedIn, async (req, res) => {
    
    const { id_unidad_medida } = req.params;
    const bases = await pool.query(`DELETE FROM tb_unidad_medida WHERE id_unidad_medida ='${id_unidad_medida}'`);

    res.redirect('/unidad-medida');
});

router.post('/unidad-medida', async (req, res) => {

    const { nombre_unidad_medida} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó una nueva unidad de medida llamada "+nombre_unidad_medida;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;

    await pool.query('INSERT INTO tb_unidad_medida set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/unidad-medida');
});

router.get('/editar-unidad-medida/:id_unidad_medida', isLoggedIn, async (req, res) => {
    
    const { id_unidad_medida } = req.params;
    const unidad_medida = await pool.query('SELECT * FROM tb_unidad_medida WHERE id_unidad_medida = ?', [id_unidad_medida]);

    res.render('unidad-medida/editar', { unidad_medida: unidad_medida[0]});
});

router.post('/editar-unidad-medida/:id_unidad_medida', isLoggedIn , async (req, res) => {

    const { id_unidad_medida } = req.params;
    const { nombre_unidad_medida} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó la unidad de medida llamada "+nombre_unidad_medida;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_unidad_medida set ? WHERE id_unidad_medida = ?', [array, id_unidad_medida]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/unidad-medida');
});

module.exports = router;