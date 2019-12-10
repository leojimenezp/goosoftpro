const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');




router.get('/gestionbonos', isLoggedIn, async (req, res) => {
 
    const consulta = await pool.query(`SELECT * 
        FROM tb_gestion_bonos bo , tb_personal per 
        WHERE bo.id_planeacion='0'
        AND bo.id_personal=per.id`);
    const consulta1 = await pool.query(`select * from tb_planeacion`);

    res.render('gestionbonos/bonos',{
        consulta:consulta,
        consulta1:consulta1
    });
});
// ELIMINAR ////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/Eliminar/:id_bonos',isLoggedIn, async (req,res) => {

    const { id_bonos } = req.params;
     await pool.query( `DELETE FROM tb_gestion_bonos WHERE id_bonos= '${id_bonos}'` );
    
    res.redirect('/gestionbonos');
}) 

// AGREGAR ////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/gestionbonos/agregarbonosinplaneacion', isLoggedIn, async (req,res) => {
  
    const consulta = await pool.query(`select * from tb_personal`);
    /* const consulta1 = await pool.query(`select bono_transporte ,bono_salarial_personal , 
    bono_no_salarial_personal from tb_personal
    WHERE id='${id_personal}'`); */
    
     
    res.render('gestionbonos/crear-bono-sinplaneacion',{
        consulta:consulta
    });
})
router.post('/gestionbonos/agregar-bono-sin-planeacion1', isLoggedIn, async (req,res) => {
    const {id_personal,centro_costo,fecha_inicio,fecha_final} =req.body;
    const consulta = await pool.query(`INSERT INTO tb_gestion_bonos(id_planeacion,id_personal,
        fecha,estado,observaciones,pozo,solicitante,servicio,dias,trasporte,cliente) 
        VALUES(?,?,?,?,?)`,[]);
    res.render('gestionbonos/crear-bono-sinplaneacion');
})

//EDITAR //////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;