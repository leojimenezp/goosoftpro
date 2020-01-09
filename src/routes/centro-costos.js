const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/centro-costos', isLoggedIn, async (req, res) => {
    const centro_costos = await pool.query('SELECT * FROM tb_centro_costos');
    res.render('centro-costos/centro-costos', { centro_costos });
});

router.post('/centro-costos', async (req, res) => {

    const { nombre_centro_costo} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un nuevo centro costo llamado "+nombre_centro_costo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;

    await pool.query('INSERT INTO tb_centro_costos set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/centro-costos');
});
router.get('/eliminar-centrodecosto/:id_centro_costo', isLoggedIn, async (req, res) => {
    
    const { id_centro_costo } = req.params;
    const bases = await pool.query(`DELETE FROM tb_centro_costos WHERE id_centro_costo ='${id_centro_costo}'`);

    res.redirect('/centro-costos');
});

router.get('/editar-centro-costo/:id_centro_costo', isLoggedIn, async (req, res) => {
    
    const { id_centro_costo } = req.params;
    const centro_costo = await pool.query('SELECT * FROM tb_centro_costos WHERE id_centro_costo = ?', [id_centro_costo]);

    res.render('centro-costos/editar', { centro_costo: centro_costo[0]});
});

router.post('/editar-centro-costo/:id_centro_costo', isLoggedIn , async (req, res) => {

    const { id_centro_costo } = req.params;
    const { nombre_centro_costo} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el centro costo llamado "+nombre_centro_costo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_centro_costos set ? WHERE id_centro_costo = ?', [array, id_centro_costo]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/centro-costos');
});

module.exports = router;