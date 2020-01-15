const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/tipo-contratos',isLoggedIn, async (req, res) => {
    const tipo_contratos = await pool.query('SELECT * FROM tb_tipo_contratos');
    res.render('tipo-contratos/tipo-contratos', { tipo_contratos });
});
router.get('/eliminar-contrato/:id_tipo_contrato', isLoggedIn, async (req, res) => {
    
    const { id_tipo_contrato } = req.params;
    const bases = await pool.query(`DELETE FROM tb_tipo_contratos WHERE id_tipo_contrato ='${id_tipo_contrato}'`);

    res.redirect('/tipo-contratos');
});

router.post('/tipo-contratos',isLoggedIn, async (req, res) => {

    const { nombre_tipo_contrato } = req.body;
    
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un tipo de contrato nuevo llamado "+nombre_tipo_contrato;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    console.log(array)

    await pool.query('INSERT INTO tb_tipo_contratos set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/tipo-contratos');

});

router.get('/editar-tipo-contrato/:id_tipo_contrato', isLoggedIn, async (req, res) => {
    
    const { id_tipo_contrato } = req.params;
    const tipo_contrato = await pool.query('SELECT * FROM tb_tipo_contratos WHERE id_tipo_contrato = ?', [id_tipo_contrato]);

    res.render('tipo-contratos/editar', { tipo_contrato: tipo_contrato[0]});
});

router.post('/editar-tipo-contrato/:id_tipo_contrato', isLoggedIn , async (req, res) => {

    const { id_tipo_contrato } = req.params;
    const { nombre_tipo_contrato} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el tipo de contrato llamado "+nombre_tipo_contrato;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_tipo_contratos set ? WHERE id_tipo_contrato = ?', [array, id_tipo_contrato]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/tipo-contratos');
});

module.exports = router;