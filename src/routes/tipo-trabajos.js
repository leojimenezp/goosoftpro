const express = require('express');
const router = express.Router();
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/tipo-trabajos',isLoggedIn, async (req, res) => {
    const tipo_trabajos = await pool.query('SELECT * FROM tb_tipo_trabajos');
    res.render('tipo-trabajos/tipo-trabajos',{tipo_trabajos});
});

router.get('/tipo-trabajos/crear',isLoggedIn, async (req, res) => {
    res.render('tipo-trabajos/crear');
});


router.get('/eliminar-trabajo/:id_tipo_trabajo', isLoggedIn, async (req, res) => {
    
    const { id_tipo_trabajo } = req.params;
    const bases = await pool.query(`DELETE FROM tb_tipo_trabajos WHERE id_tipo_trabajo ='${id_tipo_trabajo}'`);

    res.redirect('/tipo-trabajo');
});

router.get('/editar-pozo/:id_pozo', isLoggedIn, async (req, res) => {
    
    const { id_pozo } = req.params;
    const pozo = await pool.query('SELECT * FROM tb_pozos WHERE id_pozo = ?', [id_pozo]);
    const campos = await pool.query('SELECT id_campo,nombre_campo FROM tb_campos');
    const tipo_pozos = await pool.query('SELECT id_tipo_pozo,nombre_tipo_pozo FROM tb_tipo_pozos');
    res.render('pozos/editar', { pozo: pozo[0],campos,tipo_pozos});
});

router.post('/tipo-trabajos', isLoggedIn , async (req, res) => {

    const { descripcion_tipo_trabajo} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un nuevo tipo de trabajo llamado "+descripcion_tipo_trabajo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const { id_personal,promedio_costo_tipo_trabajo,promedio_personal_tipo_estado,estado_tipo_trabajo} = req.body;
    const imagen_tipo_trabajo = req.files.imagen_tipo_trabajo;

    const array = {
        id_personal,
        descripcion_tipo_trabajo,
        promedio_costo_tipo_trabajo,
        promedio_personal_tipo_estado,
        imagen_tipo_trabajo: imagen_tipo_trabajo.name,
        estado_tipo_trabajo
    };

    imagen_tipo_trabajo.mv(path.join('src/public/pics-tipo-trabajo/',imagen_tipo_trabajo.name));

    await pool.query('INSERT INTO tb_tipo_trabajos set ?', [array]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/tipo-trabajos');

});

router.get('/editar-tipo-trabajo/:id_tipo_trabajo', isLoggedIn, async (req, res) => {
    
    const { id_tipo_trabajo } = req.params;
    const tipo_trabajo = await pool.query('SELECT * FROM tb_tipo_trabajos WHERE id_tipo_trabajo = ?', [id_tipo_trabajo]);
    res.render('tipo-trabajos/editar', { tipo_trabajo: tipo_trabajo[0]});
});

router.post('/editar-tipo-trabajo/:id_tipo_trabajo', isLoggedIn , async (req, res) => {


    const { id_tipo_trabajo } = req.params;
    const { descripcion_tipo_trabajo} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el tipo de trabajo llamado "+descripcion_tipo_trabajo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };
    
    const { id_personal,promedio_costo_tipo_trabajo,promedio_personal_tipo_estado,estado_tipo_trabajo} = req.body;
    const imagen_tipo_trabajo = req.files.imagen_tipo_trabajo;

    const array = {
        id_personal,
        descripcion_tipo_trabajo,
        promedio_costo_tipo_trabajo,
        promedio_personal_tipo_estado,
        imagen_tipo_trabajo: imagen_tipo_trabajo.name,
        estado_tipo_trabajo
    };

    imagen_tipo_trabajo.mv(path.join('src/public/pics-tipo-trabajo/',imagen_tipo_trabajo.name));

    await pool.query('UPDATE tb_tipo_trabajos set ? WHERE id_tipo_trabajo = ?', [array, id_tipo_trabajo]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/tipo-trabajos');
});

router.get('/ver-tipo-trabajo/:id_tipo_trabajo', isLoggedIn, async (req, res) => {
    
    const { id_tipo_trabajo } = req.params;
    const tipo_trabajo = await pool.query('SELECT * FROM tb_tipo_trabajos WHERE id_tipo_trabajo = ?', [id_tipo_trabajo]);
    res.render('tipo-trabajos/ver', { tipo_trabajo: tipo_trabajo[0]});
});


module.exports = router;