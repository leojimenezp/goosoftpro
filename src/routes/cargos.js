const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/cargos', isLoggedIn, async (req, res) => {
    const cargos = await pool.query('SELECT * FROM tb_cargos');
    res.render('cargos/cargos', { cargos });
});

router.post('/cargos',isLoggedIn, async (req, res) => {

    const { nombre_cargo} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un cargo nuevo llamado "+nombre_cargo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    await pool.query('INSERT INTO tb_cargos set ?', [array]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    req.flash('success', 'Registro exitoso!');
    res.redirect('/cargos');
});

router.get('/editar-cargo/:id_cargo', isLoggedIn, async (req, res) => {
    
    const { id_cargo } = req.params;
    const cargo = await pool.query('SELECT * FROM tb_cargos WHERE id_cargo = ?', [id_cargo]);
    const costos_fijos = await pool.query('SELECT * FROM tb_costos_fijos WHERE id_cargo = ?', [id_cargo]);

    res.render('cargos/editar', { cargo: cargo[0], costos_fijos});
});

router.get('/eliminar-cargo/:id_cargo', isLoggedIn, async (req, res) => {
    
    const { id_cargo } = req.params;
    const bases = await pool.query(`DELETE FROM tb_cargos WHERE id_cargo ='${id_cargo}'`);

    res.redirect('/cargos');
});


router.post('/editar-cargo/:id_cargo', isLoggedIn , async (req, res) => {

    const { id_cargo } = req.params;
    const { nombre_cargo} = req.body;
    const array = req.body; 
    console.log(array) 
    
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el cargo "+nombre_cargo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_cargos set ? WHERE id_cargo = ?', [array, id_cargo]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/cargos');
});

router.post('/cargos-costos-fijos',isLoggedIn, async (req, res) => {
   
    const { id_cargo } = req.body;

    const array = req.body;
    await pool.query('INSERT INTO tb_costos_fijos set ?', [array]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/editar-cargo/'+id_cargo);
});

router.get('/cargo-eliminar-costo-fijo/:id_costo_fijo/:id_cargo', isLoggedIn, async (req, res) => {
    
    const { id_costo_fijo } = req.params;
    const { id_cargo } = req.params;
    
    await pool.query('DELETE FROM tb_costos_fijos WHERE id_costo_fijo = ?', id_costo_fijo);
    req.flash('error', 'Registro eliminado!');
    res.redirect('/editar-cargo/'+id_cargo);

});

module.exports = router;