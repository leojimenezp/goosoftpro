const express = require('express');
const router = express.Router();
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const passport = require('passport');

router.get('/usuarios', isLoggedIn, async (req, res) => {
    const usuarios = await pool.query('SELECT p.id,p.firma_personal,p.fecha_conexion_personal,p.username,p.id_cargo,p.estado_personal,c.nombre_cargo FROM tb_personal p, tb_cargos c WHERE p.id_cargo=c.id_cargo AND p.username IS NOT NULL');
    res.render('usuarios/usuarios', { usuarios });
});

router.get('/usuarios/crear', isLoggedIn, async (req, res) => {
    const personal = await pool.query('SELECT id,nombre_personal,apellido_personal FROM tb_personal WHERE estado_personal = 1 AND username IS NULL');
    res.render('usuarios/crear', {personal});
});

router.post('/usuarios/crear',isLoggedIn  , passport.authenticate('crear.usuario', {
    
    successRedirect: '/usuarios',
    failureRedirect: '/usuarios',
    failureFlash: true,
    
}));

router.get('/editar-usuario/:id', isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const usuario = await pool.query('SELECT * FROM tb_personal WHERE id = ?', [id]);

    res.render('usuarios/editar', { usuario: usuario[0]});
});

router.post('/editar-usuario/:id', isLoggedIn , async (req, res) => {

    const { id } = req.params;
    const array = req.body;
    
    await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, id]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/usuarios');
});

router.post('/agregar-firma-usuario/:id', isLoggedIn , async (req, res) => {

    const { id } = req.params;
    const firma_personal = req.files.firma_personal;
    const array = {
        firma_personal: firma_personal.name
    };
    
    firma_personal.mv(path.join('src/public/firmas-usuarios/',firma_personal.name));

    await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, id]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/usuarios');
});

router.get('/logout', async (req, res) => {
 
    const array = {
        fecha_conexion_personal: new Date()
    };

    await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, req.user.id]);

    req.logOut();
    res.redirect('/');
});

module.exports = router;