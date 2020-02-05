const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/porcentaje',isLoggedIn, async (req, res) => {

    const tabla_porcentaje = await pool.query('SELECT * FROM tb_porcentaje');
    
    res.render('porcentaje/porcentaje',{
        tabla_porcentaje:tabla_porcentaje
    });
});

router.get('/porcentaje/crear',isLoggedIn, async (req, res) => {
   
    
    res.render('porcentaje/crear');
});

router.post('/porcentaje/crear1',isLoggedIn, async (req, res) => {

    const datos = req.body

    console.log(datos)
    await pool.query('INSERT INTO tb_porcentaje set ?', [datos]);

    res.redirect('/porcentaje')
});
router.get('/editar-porcentaje/:id',isLoggedIn, async (req, res) => {
    const {id} =req.params

    const tabla_porcentaje = await pool.query(`SELECT * FROM tb_porcentaje WhERE id='${id}'`);
    
    res.render('porcentaje/editar',{
        tabla_porcentaje:tabla_porcentaje
        ,id:id
    });
});

router.post('/editar-porcentaje1/:id',isLoggedIn, async (req, res) => {

    const datos = req.body;
    const {id} = req.params;
    console.log(datos)
    await pool.query('UPDATE tb_porcentaje set ? WHERE id = ?', [datos, id]);

    res.redirect('/porcentaje')
});


router.get('/eliminar-porcentaje/:id', isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const bases = await pool.query(`DELETE FROM tb_porcentaje WHERE id ='${id}'`);

    res.redirect('/porcentaje');
});



module.exports = router;