const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/consignaciones',isLoggedIn, async (req,res) => {
    id_planeacion=0;
    const consulta1= await pool.query(`SELECT *FROM tb_consignacion c , tb_personal p WHERE c.id_personal=p.id AND c.id_planeacion='${id_planeacion}'`);
    const consulta = await pool.query("select * from tb_planeacion");
    res.render('consignaciones/consignacion',
    {
        consulta: consulta,
        consulta1: consulta1
    });
})



router.get('/consignaciones/agregar', isLoggedIn, async (req,res) => {
    
    
    const consulta = await pool.query("select * from tb_personal");
    
    res.render('consignaciones/asignar-consignacio',{
        consulta:consulta
    });
})
router.post('/AgregarItem', isLoggedIn, async (req,res) =>{
   
    const {id_personal} = req.body;
    const {fecha} = req.body;
    const {codigo} = req.body;
    const {estado} = req.body;
    const {id_planeacion} = req.body;
    const datos={id_personal,fecha,codigo,estado,id_planeacion} 
    await pool.query( "INSERT INTO tb_consignacion SET ?", [datos] );
    const consulta = await pool.query( `select * from tb_personal WHERE id='${id_personal}' `);
    const consulta1 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `);
    const consulta3 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `); 
    res.render('consignaciones/agregar-personal-externa',{
    consulta:consulta,
    consulta1:consulta1,
    consulta3:consulta3  
    })
})  
router.post('/BuscarItem',isLoggedIn, async (req,res) => {
    const {id_personal} = req.body;
    const {item} = req.body;
    const {codigo} = req.body;
    console.log(id_personal,item,codigo)
    const consulta = await pool.query( `select * from tb_personal WHERE id='${id_personal}' `);
    const consulta2 = await pool.query( `select * from tb_item WHERE categoria_item='${item}' `);
    const consulta1 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `);
    const consulta3 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `);
    res.render('consignaciones/agregar-personal-externa',{
        consulta:consulta,
        consulta1:consulta1,
        consulta2:consulta2,
        consulta3:consulta3,
        item: item
    });
})

router.get('/consignaciones/enlistar',isLoggedIn, async (req,res) => {
    const { codigo , id_personal } = req.params;
    console.log({ codigo , id_personal }    )
    
    const consulta1 = await pool.query( `select id_consignacion from tb_consignacion WHERE codigo='${codigo}' `);
    res.render('consignaciones/agregar-personal-externa',{
        consulta:consulta,
        consulta1:consulta1
    });
})


router.post('/AgregarDetallesConsignacion', isLoggedIn, async (req,res) =>{
    const {item} = req.body;
    const {id_personal} = req.body;
    const {id_consignacion} = req.body;
    const {codigo} = req.body;
    const consulta = await pool.query( `select * from tb_personal WHERE id='${id_personal}' `);
    const consulta2 = await pool.query( `select * from tb_item WHERE categoria_item='${item}' `);
    const consulta1 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `);
    const consulta3 = await pool.query( `select * from tb_consignacion WHERE codigo='${codigo}' `);
    const consulta4 = await pool.query( `select id_item from tb_item WHERE categoria_item='${item}' `);
    let reqData = [];
    consulta4.forEach(element => { // req.body['valor-'+element] req.body['cantidad-'+element] req.body['costoU-'+element]
        reqData.push({
            id: element.id_item,
            valor:  req.body[`costoU-${element.id_item}`],
            cantidad: req.body[`cantidad-${element.id_item}`]
        });
    });
    reqData.forEach(async element=>{
        await pool.query( `INSERT INTO tb_consignacion_detalles(id_item, cantidad, valor_unitario, costo_total_item, id_consignacion) VALUES(?,?,?,?,?)`, [element.id, element.cantidad, element.valor, (element.cantidad * element.valor), id_consignacion]);
    });
    res.render('consignaciones/agregar-personal-externa',{
        consulta3:consulta3,
        consulta:consulta,
        consulta2:consulta2,
        consulta1,consulta1

    });

})
router.get('/consignaciones/AsignarConsignacion/:id_consignacion', isLoggedIn, async (req,res) =>{
    const { id_consignacion } = req.params;
    const consulta = await pool.query(`select * from tb_planeacion`);
    const consulta1 = await pool.query(`select * from tb_consignacion where id_consignacion='${id_consignacion}'`);
    res.render('consignaciones/asignar-consigancion1',
    {consulta:consulta,
    consulta1:consulta1   });
})


router.post('/AsignarConsignacionSola', isLoggedIn, async (req,res) =>{
    const {id_planeacion} = req.body;
    const {id_consignacion} = req.body;
    console.log(id_consignacion,id_planeacion)
    await pool.query(`UPDATE tb_consignacion SET id_planeacion='${id_planeacion}' WHERE id_consignacion='${id_consignacion}'` );
    res.redirect('/consignaciones');
})




router.get('/consignaciones/DetallesDeCostoToltal/:id_consignacion/:id',isLoggedIn, async (req,res) => {
    

    const { id_consignacion } = req.params;
    const { id } = req.params;
    console.log(id)
    id_personal=id;
    const total = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
    const total1 = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
    const consulta = await pool.query( `SELECT *
    FROM tb_consignacion c , tb_consignacion_detalles d , tb_item i
    WHERE c.id_consignacion = d.id_consignacion
    AND i.id_item = d.id_item
    AND c.id_consignacion = '${id_consignacion}'` );

    const consulta1 = await pool.query( `SELECT *
    FROM tb_personal p , tb_consignacion c
    WHERE p.id = c.id_personal
    AND c.id_personal ='${id_personal}'
    AND c.id_consignacion ='${id_consignacion}'` );
    


    res.render('consignaciones/detalles-total', {   
        consulta:consulta,
        consulta1:consulta1,
        total1:total1,
        total:total
    });
})


















router.get('/consignaciones/DetallesPlaneacion:id_planeacion',isLoggedIn, async (req,res) => {
    
    const { id_planeacion } = req.params;
    const tb_equipo_item_personal = await pool.query(`SELECT ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.id_cargo = c.id_cargo AND ie.id_personal = p.id AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);  
    
    res.render('/consignaciones',{
    tb_equipo_item_personal:tb_equipo_item_personal}
    );
})

router.get('/consignaciones/AsiganarConsignacionSola/:id_consignacion',isLoggedIn, async (req,res) => {
    
    const consulta = await pool.query( `select * from tb_planeacion` );
    const consulta1 = await pool.query( `select * from tb_consignacion`);

    res.render('consignaciones/asignar-consignacio',{
        consulta:consulta,
        consulta1:consulta1
    });
})
router.post('/AsiganarConsignacionSola1',isLoggedIn, async (req,res) => {
    
    const { id_planeacion} = req.body;
    const { planeacion} = req.body;
    const { id_consignacion} = req.body;
    console.log(id_planeacion)
    console.log(planeacion)
    console.log(id_consignacion)

    const consulta = await pool.query( `UPDATE tb_consignacion SET 
    id_planeacion='${id_planeacion}', planeacion='${ planeacion}' WHERE id_consignacion='${id_consignacion}'` );
    
    res.redirect('/consignaciones');
}) 



module.exports = router;    