const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/bitacora', isLoggedIn, async (req, res) => {

const personal = await pool.query(`SELECT username , id FROM tb_personal WHERE username IS NOT NULL;`)
    res.render('bitacora/bitacora-home',{
        personal:personal
    });
});


router.post('/bitacora/busqueda', isLoggedIn, async (req, res) => {
const {id_personal , fecha_final , fecha_inicio } = req.body;
console.log({id_personal , fecha_final , fecha_inicio })
let consulta2;

if (id_personal == 0){
    consulta2 =  await pool.query(`SELECT *
                                FROM tb_bitacora bi , tb_personal p
                                WHERE fecha_registro BETWEEN '${fecha_inicio}' AND '${fecha_final}' 
                                AND p.id = bi.id_user  ` )}
else{
    consulta2 =  await pool.query(`SELECT *
                                FROM tb_bitacora 
                                WHERE fecha_registro BETWEEN '${fecha_inicio}' AND '${fecha_final}'
                                AND id_user ='${id_personal}'`)}

    console.log(consulta2)
    res.json({resp:consulta2});
});

module.exports = router;


