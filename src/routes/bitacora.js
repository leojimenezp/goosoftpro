const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/bitacora', isLoggedIn, async (req, res) => {

    personal = await pool.query(`SELECT username , id FROM tb_personal WHERE username IS NOT NULL;`)
    res.render('bitacora/bitacora-home',{
        personal:personal
    });
});


router.post('/bitacora/busqueda', isLoggedIn, async (req, res) => {
const {id_personal , fecha_final , fecha_inicio } = req.body;
console.log({id_personal , fecha_final , fecha_inicio })
consulta =  await pool.query(`SELECT *
                                FROM tb_bitacora 
                                WHERE fecha_registro BETWEEN '${fecha_inicio}' AND '${fecha_final}'
                                AND id_user ='${id_personal}'`);

    console.log(consulta)
    res.json({resp: consulta});
});

module.exports = router;


