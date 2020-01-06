const express = require('express');
const router = express.Router();
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/tipo-equipos-herramientas', isLoggedIn, async (req, res) => {
    const tipo_equipos_herramietas = await pool.query('SELECT * FROM tb_tipo_equipos_herramientas');
    res.render('tipo-equipos-herramientas/tipo-equipos-herramientas',{tipo_equipos_herramietas});
});

router.post('/tipo-equipos-herramientas', isLoggedIn , async (req, res) => {

    const { nombre_equipo_herramienta} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un nuevo tipo de equipo o herramienta llamado "+nombre_equipo_herramienta;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const { id_personal,estado_equipo_herramienta} = req.body;
    const imagen_equipo_herramienta = req.files.imagen_equipo_herramienta;

    const array = {
        id_personal,
        nombre_equipo_herramienta,
        imagen_equipo_herramienta: imagen_equipo_herramienta.name,
        estado_equipo_herramienta
    };

    imagen_equipo_herramienta.mv(path.join('src/public/pics-tipo-equipos-herramientas/',imagen_equipo_herramienta.name));

    await pool.query('INSERT INTO tb_tipo_equipos_herramientas set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/tipo-equipos-herramientas');

});

router.get('/editar-tipo-equipos-herramientas/:id_tipo_equipo_herramienta', isLoggedIn, async (req, res) => {
    
    const { id_tipo_equipo_herramienta } = req.params;
    const tipo_equipos_herramientas = await pool.query('SELECT * FROM tb_tipo_equipos_herramientas WHERE id_tipo_equipo_herramienta = ?', [id_tipo_equipo_herramienta]);
   
    res.render('tipo-equipos-herramientas/editar', { tipo_equipos_herramientas: tipo_equipos_herramientas[0]});
});

router.post('/editar-tipo-equipos-herramientas/:id_tipo_equipo_herramienta', isLoggedIn , async (req, res) => {

    const { id_tipo_equipo_herramienta } = req.params;
    const { nombre_equipo_herramienta} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el tipo de equipo o herramienta llamado "+nombre_equipo_herramienta;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const {estado_equipo_herramienta} = req.body;
    const imagen_equipo_herramienta = req.files.imagen_equipo_herramienta;

    const array = {
        nombre_equipo_herramienta,
        imagen_equipo_herramienta: imagen_equipo_herramienta.name,
        estado_equipo_herramienta
    };

    imagen_equipo_herramienta.mv(path.join('src/public/pics-tipo-equipos-herramientas/',imagen_equipo_herramienta.name));

    await pool.query('UPDATE tb_tipo_equipos_herramientas set ? WHERE id_tipo_equipo_herramienta = ?', [array, id_tipo_equipo_herramienta]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/tipo-equipos-herramientas');
});

module.exports = router;