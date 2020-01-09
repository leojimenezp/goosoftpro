const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/clientes', isLoggedIn, async (req, res) => {
    const clientes = await pool.query('SELECT * FROM tb_clientes');
    res.render('clientes/clientes', { clientes });
});

router.get('/clientes/crear', isLoggedIn, async (req, res) => {
    res.render('clientes/crear');
});

router.post('/clientes',isLoggedIn, async (req, res) => {

    const { numero_documento_cliente} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un cliente nuevo con No. de documento "+numero_documento_cliente;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    await pool.query('INSERT INTO tb_clientes set ?', [array]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    req.flash('success', 'Registro exitoso!');
    res.redirect('/clientes');
});

router.get('/editar-cliente/:id_cliente', isLoggedIn, async (req, res) => {
    
    const { id_cliente } = req.params;
    const cliente = await pool.query('SELECT * FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);

    res.render('clientes/editar', { cliente: cliente[0]});
});

router.get('/eliminar-cliente/:id_cliente', isLoggedIn, async (req, res) => {
    
    const { id_cliente } = req.params;
    const bases = await pool.query(`DELETE FROM tb_clientes WHERE id_cliente ='${id_cliente}'`);

    res.redirect('/clientes');
});


router.post('/editar-cliente/:id_cliente', isLoggedIn , async (req, res) => {

    const { id_cliente } = req.params;
    const { numero_documento_cliente} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el cliente con No. de documento "+numero_documento_cliente;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_clientes set ? WHERE id_cliente = ?', [array, id_cliente]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/clientes');
});

module.exports = router;