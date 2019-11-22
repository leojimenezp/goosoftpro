const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/campos', isLoggedIn, async (req, res) => {
    const campos = await pool.query('SELECT * FROM tb_campos c, tb_clientes ct WHERE c.id_cliente=ct.id_cliente');
    res.render('campos/campos', {campos});
});

router.get('/campos/crear', isLoggedIn, async (req, res) => {
    const propietarios = await pool.query('SELECT id_cliente,razon_social_cliente FROM tb_clientes WHERE estado_cliente = ?', [1]);
    res.render('campos/crear', {propietarios});
});

router.post('/campos',isLoggedIn, async (req, res) => {

    const { nombre_campo} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un campo nuevo llamado "+nombre_campo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    await pool.query('INSERT INTO tb_campos set ?', [array]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    req.flash('success', 'Registro exitoso!');
    res.redirect('/campos');
});

router.get('/editar-campo/:id_campo', isLoggedIn, async (req, res) => {
    
    const { id_campo } = req.params;
    const campos = await pool.query('SELECT * FROM tb_campos WHERE id_campo = ?', [id_campo]);
    const propietarios = await pool.query('SELECT id_cliente,razon_social_cliente FROM tb_clientes');
    res.render('campos/editar', { campos: campos[0], propietarios});
});

router.post('/editar-campo/:id_campo', isLoggedIn , async (req, res) => {

    const { id_campo } = req.params;
    const { nombre_campo} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el campo llamado "+nombre_campo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_campos set ? WHERE id_campo = ?', [array, id_campo]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/campos');
});

router.get('/map-campo/:id_campo', isLoggedIn, async (req, res) => {
    
    const { id_campo } = req.params;
    const campos = await pool.query('SELECT nombre_campo,longitud_campo,latitud_campo FROM tb_campos WHERE id_campo = ?', [id_campo]);
    res.render('campos/map-campos',{ campos: campos[0]});
});


module.exports = router;