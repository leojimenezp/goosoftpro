const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/consignaciones', (req,res) => {
    res.render('consignaciones/consignacion')
})

router.get('/consignaciones/agregar', isLoggedIn, async (req,res) => {

    
    const personal = await pool.query("SELECT id,nombre_personal,apellido_personal,numero_documento_personal FROM tb_personal");
    const servicio = await pool.query("SELECT id_planeacion,titulo FROM tb_planeacion");
    const placa = await pool.query("SELECT id_equipo, placa_equipo FROM tb_equipos")

    res.render('consignaciones/agregar-consignacion', {
        
        personal: personal,
        servicio: servicio,
        placa: placa
    });
})

router.post('/agregarConsignacion', isLoggedIn, async (req,res) =>{
    const {
        fecha_solicitud,
        monto,
        id_personal,
        numero_documento_personal,
        id_planeacion,
        placa_vehiculo,
        descripcion
    } = req.body;
    const datos = req.body;

    if(fecha_solicitud == '') console.log('la fecha de solicitud esta vacio')
    if(monto == '') console.log('El monto esta vacio')
    if(id_personal == '') console.log('El personal esta vacio')
    if(numero_documento_personal == '') console.log('El numero de documento esta vacio')
    if(id_planeacion == '') console.log('La planeacion esta vacia')
    if(placa_vehiculo == '') console.log('La placa esta vacio')
    if(descripcion == '') console.log('La descripcion esta vacio')

    await pool.query("INSERT INTO tb_consignacion SET ?", [datos]);
    res.redirect('/consignaciones');
})




router.get('/consignaciones/agregar/rubro',isLoggedIn, async (req,res) => {

    
    const rubro = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const planeacion = await pool.query("SELECT id_planeacion,titulo FROM tb_planeacion");
    

    res.render('consignaciones/agregar-rubro', {
        
        rubro: rubro,
        planeacion: planeacion
    });
    // res.render('consignaciones/agregar-rubro')
})

router.post('/agregarRubro', isLoggedIn, async (req,res) =>{
    const {
        id_rubro,
        cantidad,
        costo_unitario,
        costo_total

    } = req.body;
    const datos1 = req.body;

    if(id_rubro == '') console.log('No hay rubro')
    if(cantidad == '') console.log('No hay rubro')
    if(costo_unitario == '') console.log('No hay rubro')
    if(costo_total == '') console.log('No hay rubro')

    await pool.query("INSERT INTO tb_rubros_consignacion SET ?", [datos1]);
    res.redirect('/consignaciones/agregar');
})

router.post('/consultarConsignacion', isLoggedIn, async (req,res) => {

    const { titulo } = req.body;
    const datos = req.body;
    const consulta = await pool.query(`select * from tb_consignacion  `);
    //const consulta1 = await pool.query(`SELECT * from tb_consignacion`);
    console.log(consulta);
     // ie.titulo =  '${titulo}'
    res.render('consignaciones/consignacion', {
        consulta: consulta,
        json: JSON.stringify(consulta)
    })

})
router.post('/consultarConsignacion1', isLoggedIn, async (req,res) => {

    const { titulo3 } = req.body;
    const datos = req.body;
    const consulta = await pool.query(`select * from tb_consignacion a where a.id_planeacion='${titulo3}' `);
    //const consulta1 = await pool.query(`SELECT * from tb_consignacion`);
    console.log(consulta);
     // ie.titulo =  '${titulo}'
    res.render('consignaciones/consignacion', {
        consulta: consulta,
        json: JSON.stringify(consulta)
    })

})

// select * from tb_consignacion a where a.id_planeacion='4' ;


router.get('/consignaciones/mirar/:id_consignacion', isLoggedIn, async (req,res) => {

   const { id_consignacion } = req.params;
     //const numeros = await pool.query("SELECT id FROM tb_personal");
    const consulta = await pool.query("SELECT id_consignacion FROM tb_consignacion WHERE id_consignacion = ?", [	id_consignacion]);

    res.render('consignaciones/datos-por-consignacion', {

       consulta: consulta
    });
})

router.get('/consignaciones/modificar/:id_consignacion', async (req,res) =>{
    const { id_consignacion } = req.params;
    const datosUsuario = await pool.query('SELECT * FROM tb_consignacion WHERE id_consignacion = ?', [id_consignacion]);
    res.render('consignaciones/datos-consignacion', { datos: datosUsuario });
});




module.exports = router;