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
    const { id_personal,
            centro_costo, 
            fecha_final,
            tipo_de_bono,
            fecha_inicio,
            id_planeacion
    } =     req.body;
   
    if (tipo_de_bono =='1'){
    
    const bono_trasporte = await pool.query(`SELECT  bono_transporte FROM tb_personal WHERE id ='${id_personal}'`);
    console.log(bono_trasporte[0].bono_transporte)  
    const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);
    console.log(dias[0].dias)
    await pool.query(`INSERT INTO tb_gestion_bonos(
        id_personal,
        centro_de_costo, 
        fecha_final,
        tipo_bono,
        fecha_inicio,
        fecha,
        id_planeacion,
        valor_bono,
        dias,
        valor_bono_total) 
        VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [id_personal
        ,centro_costo
        ,fecha_final 
        ,tipo_de_bono 
        ,fecha_inicio
        ,fecha_inicio 
        ,id_planeacion
        ,bono_trasporte[0].bono_transporte
        ,dias[0].dias,(bono_trasporte[0].bono_transporte * dias[0].dias)]); 
    }else if ( tipo_de_bono =='2'){
    const bono_de_campo = await pool.query(`SELECT  bono_salarial_personal  FROM tb_personal WHERE id ='${id_personal}'`);
    const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);
    await pool.query(`INSERT INTO tb_gestion_bonos(
        id_personal,
        centro_de_costo, 
        fecha_final,
        tipo_bono,
        fecha_inicio,
        fecha,
        id_planeacion,
        valor_bono,
        dias,
        valor_bono_total) 
        VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [id_personal
        ,centro_costo
        ,fecha_final 
        ,tipo_de_bono 
        ,fecha_inicio
        ,fecha_inicio 
        ,id_planeacion
        ,bono_de_campo[0].bono_salarial_personal
        ,dias[0].dias,(bono_de_campo[0].bono_salarial_personal * dias[0].dias)]); 
    }else if (tipo_de_bono =='3'){
    const bono_extra_auxiliar = await pool.query(`SELECT bono_no_salarial_personal  FROM tb_personal WHERE id ='${id_personal}'`);
    const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);
    await pool.query(`INSERT INTO tb_gestion_bonos(
        id_personal,
        centro_de_costo, 
        fecha_final,
        tipo_bono,
        fecha_inicio,
        fecha,
        id_planeacion,
        valor_bono,
        dias,
        valor_bono_total) 
        VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [id_personal
        ,centro_costo
        ,fecha_final 
        ,tipo_de_bono 
        ,fecha_inicio
        ,fecha_inicio 
        ,id_planeacion
        ,bono_extra_auxiliar[0].bono_no_salarial_personal
        ,dias[0].dias,(bono_extra_auxiliar[0].bono_no_salarial_personal * dias[0].dias)]); 
    }


    res.redirect('/gestionbonos');
})

//EDITAR //////////////////////////////////////////////////////////////////////////////////////////////////////////


//BUSCADOR //////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/gestionbonos/buscador',isLoggedIn, async (req,res) => {

   const {fecha_inicio} =req.body;
   const {fecha_final} =req.body;
   consulta = await pool.query(`
    SELECT * FROM 
    tb_gestion_bonos gb , tb_personal pe
    WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}'
    AND gb.id_personal = pe.id `)
   
    res.render('gestionbonos/bonos',{
    consulta:consulta});
}) 

router.post('/gestionbonos/buscadordepersonal', isLoggedIn, async (req, res) => {
    console.log(req.body)
    const {id_planeacion}=req.body;
    const consulta = await pool.query(`SELECT * 
        FROM tb_gestion_bonos bo , tb_personal per 
        WHERE bo.id_planeacion='0'
        AND bo.id_personal=per.id`);
    const consulta1 = await pool.query(`select * from tb_planeacion `);
    const tb_equipo_item_personal = await pool.query(`
    SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida 
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion = '${id_planeacion}'`);

    console.log(id_planeacion)
    res.render('gestionbonos/bonos',{
        consulta:consulta,
        consulta1:consulta1,
        tb_equipo_item_personal:tb_equipo_item_personal,
        id_planeacion:id_planeacion
    });
});
router.post('/gestionbonos/buscarbonoporplaneacion', isLoggedIn, async (req, res) => {
    
const {fecha_inicio} =req.body;
const {fecha_final} =req.body;
const {id_planeacion} =req.body;

const consulta1 = await pool.query(`select * from tb_planeacion `);
const tb_equipo_item_personal = await pool.query(`
SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
WHERE ie.id_cargo = c.id_cargo 
AND ie.id_personal = p.id 
AND ie.id_unidad_medida = u.id_unidad_medida 
AND ie.id_rubro = r.id_rubro 
AND ie.id_moneda = m.id_moneda 
AND ie.id_planeacion = '${id_planeacion}'`);

consulta3 = await pool.query(`
    SELECT * FROM 
    tb_gestion_bonos gb , tb_personal pe
    WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}'
    AND gb.id_personal = pe.id 
    AND gb.id_planeacion = ${id_planeacion} `);


console.log(id_planeacion)
res.render('gestionbonos/bonos',{
    consulta1:consulta1,
    tb_equipo_item_personal:tb_equipo_item_personal,
    id_planeacion:id_planeacion,
    consulta3:consulta3
    });
});




module.exports = router;