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

router.post('/consignacion/persona', async(req, res) =>{
    const {  id_persona } = req.body;
    const consulta = await pool.query('SELECT numero_documento_personal FROM tb_personal WHERE id = ?', [id_persona]);
    res.send(consulta[0].numero_documento_personal);
});

router.post('/consignacion/item', async(req, res)=>{
    const consulta = await pool.query(`select id_item idItem from tb_item where categoria_item=?`, [7]);
    res.json({resp: consulta});
});

/* router.post('/consignaciones/tabla', async (req, res) => {
    const {item} = req.body;
    const {id_consignacion} =req.body;
    const consulta = await pool.query( `select * from tb_item WHERE categoria_item='${item}'`);
    const consulta1 = await pool.query( `SELECT *
    FROM tb_consignacion c , tb_consignacion_detalles d , tb_item i
    WHERE c.id_consignacion = d.id_consignacion
    AND i.id_item = d.id_item
    AND c.id_consignacion = '${id_consignacion}'` );
    console.log(`SELECT *
    FROM tb_consignacion c , tb_consignacion_detalles d , tb_item i
    WHERE c.id_consignacion = d.id_consignacion
    AND i.id_item = d.id_item
    AND c.id_consignacion = '${id_consignacion}'`)
    let resp = "", resp1 = "";
    consulta.forEach(element => {
        resp += `<tr><td class="text-center">${element.descripcion_item}</td>
                            <td class="text-center">${element.bodega_item}</td>
                            <td class="text-center"><input type="text" name="costoU-${element.id_item}"  value="${element.valor_item}"></td>
                            <td class="text-center">${element.marca_item}</td>
                            <td class="text-center"><input type="text" name="cantidad-${element.id_item}"  value="${element.cantidad_item}"></td>
                            <td class="text-center"><input type="checkbox" name="select-${element.id_item}"></td>    
                       </tr>`;
    });
    consulta1.forEach(element => {
        resp1 += `<tr>
                        <td class="text-center">${element.descripcion_item}</td>
                        <td class="text-center">${element.cantidad}</td>
                        <td class="text-center">${element.valor_unitario}</td>
                        <td class="text-center">${element.costo_total_item}</td>
                        <td class="text-center"><a href="/consignaciones/EliminarItemSola/${element.id}/${id_consignacion}"
                          class="btn-eliminar-planeacion btn btn-success text-white dt-fab-btn">
                                <img src="/icons-planeacion/trash.svg" alt="">
                        </a>
                        </td>
                   
                    </tr>`;
    });
    res.json({ table1: resp, table2: resp1});
}); */

router.get('/consignaciones/agregarsinoperacion', isLoggedIn, async (req,res) => {
    
    const id_item=7;
    const consulta = await pool.query("select * from tb_personal");
    const consulta1 = await pool.query(`select * from tb_item where categoria_item=${id_item}`);
     
    res.render('consignaciones/agregar-consignacionsinplaneacion',{
        consulta:consulta,
        consulta1:consulta1
    });
})

router.post('/AgregarDetallesConsignacion', isLoggedIn, async (req, res) => {
    const { fecha } = req.body;
    const {solicitante } = req.body;
    const {id_personal} = req.body;
    const { servicio } = req.body;
    const { dias } = req.body;
    const {trasporte  } = req.body;
    const { cliente } = req.body;
    const { observaciones } = req.body;
    const { descripcion } = req.body;
    const { estado } = req.body;
    const { id_planeacion } = req.body;
    const { pozo } = req.body;descripcion 
    const consulta = await pool.query(`INSERT INTO tb_consignacion(id_planeacion,id_personal,fecha,estado,observaciones,pozo,solicitante,servicio,dias,trasporte,cliente) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,[id_planeacion, id_personal, fecha, estado, observaciones,pozo,solicitante,servicio,dias,trasporte,cliente]);
    const consulta1 = await pool.query(`SELECT id_item FROM tb_item`);
    let reqData = [];
    consulta1.forEach(element => {
        reqData.push({
            id: element.id_item,
            valor: req.body[`costoU-${element.id_item}`],
            cantidad: req.body[`cantidad-${element.id_item}`],
        });
    });
    reqData.forEach(async element => {
        await pool.query(`INSERT INTO tb_consignacion_detalles(id_item, cantidad, valor_unitario, costo_total_item, id_consignacion) VALUES(?,?,?,?,?)`, [element.id, element.cantidad, element.valor, (element.cantidad * element.valor), consulta.insertId]);
    });
    res.redirect('/consignaciones');
})

router.get('/consignaciones/editarlositem/:id_consignacion/:id_personal',isLoggedIn, async (req,res) => {
    const { id_personal } = req.params;
    const { id_consignacion } = req.params;
    const categoria=7;
    const consulta = await pool.query( `select * from tb_personal WHERE id=${id_personal}` );
    const consulta1 = await pool.query( `SELECT * FROM tb_consignacion_detalles de , tb_item it
    WHERE de.id_consignacion = '${id_consignacion}'
    AND it.id_item = de.id_item
    AND it.categoria_item='${categoria}'`);
    res.render('consignaciones/editar-consigacion',{
    consulta:consulta,
    consulta1:consulta1,
    id_consignacion:id_consignacion 
});

}) 
router.post('/editarlositem1',isLoggedIn, async (req,res) => {
    const {id_consignacion}=req.params;
    const consulta1 = await pool.query(`SELECT id_item FROM tb_item`);
    let reqData = [];
    consulta1.forEach(element => {
        reqData.push({
            id: element.id_item,
            valor: req.body[`costoU-${element.id_item}`],
            cantidad: req.body[`cantidad-${element.id_item}`],
        });
    });
    reqData.forEach(async element => {
        try{
            await pool.query(`UPDATE tb_consignacion_detalles SET  cantidad=? , valor_unitario =? , costo_total_item=?  WHERE id = ? AND id_item = ?`, [ element.cantidad, element.valor, (element.cantidad * element.valor), id_consignacion, element.id]);           
        }catch(e){
            console.log(e);
        }        
    });
    res.redirect('/consignaciones');
})


router.post('/editarlaConsignacion',isLoggedIn, async (req,res) => {
    const { estado } = req.body;
    const { descripcion } = req.body;
    const { id_consignacion } = req.body;
    await pool.query(`UPDATE tb_consignacion SET estado='${estado}',descripcion='${descripcion}'  WHERE id_consignacion='${id_consignacion}'`);
    const consulta = await pool.query('SELECT id FRROM tb_consignacion_detalles WHERE id_consignacion = ?', [id_consignacion]);

    if(estado == "confirmado"){
        consulta.forEach(async element => {
            await pool.query("INSERT INTO tb_legalizacion(id_consignacion_detalle, cantidad, valor_unitario) VALUES(?,?,?)", [element.id, 0, 0]);
        });
    }
    else if(estado == "rechazado"){
        consulta.forEach(async element => {
            await pool.query("DELETE FROM  tb_legalizacion WHERE id_consignacion_detalle = ?", [element.id]);
        });
    }
    res.redirect('/consignaciones');
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


router.get('/consignaciones/enlistar',isLoggedIn, async (req,res) => {
    const { codigo , id_personal } = req.params;
    console.log({ codigo , id_personal }    )
    
    const consulta1 = await pool.query( `select id_consignacion from tb_consignacion WHERE codigo='${codigo}' `);
    res.render('consignaciones/agregar-personal-externa',{
        consulta:consulta,
        consulta1:consulta1
    });
})



router.get('/consignaciones/AsignarConsignacion/:id_consignacion/:id', isLoggedIn, async (req,res) =>{
    const { id_consignacion } = req.params;
    const { id } = req.params;
    const operacion=1;
    const consulta = await pool.query(`select * from tb_planeacion `);
    const consulta2 = await pool.query(`select * from tb_personal WHERE id=${id}`);
    res.render('consignaciones/asignar-consigacionsinoperacion',
    {consulta:consulta,
    id_consignacion:id_consignacion,
    consulta2:consulta2 });
})


router.post('/AsignarConsignacionSola', isLoggedIn, async (req,res) =>{
    const {id_planeacion} = req.body;
    const {id_consignacion} = req.body;
    console.log(id_consignacion,"----",id_planeacion)
    await pool.query(`UPDATE tb_consignacion SET id_planeacion='${id_planeacion}' WHERE id_consignacion='${id_consignacion}'` );
    res.redirect('/consignaciones');
})

router.get('/consignaciones/DetallesDeCostoToltal/:id_consignacion/:id',isLoggedIn, async (req,res) => {
    const { id_consignacion } = req.params;
    const { id } = req.params;
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
router.get('/consignaciones/EliminarConsignacionSola/:id_consignacion',isLoggedIn, async (req,res) => {

    const { id_consignacion } = req.params;
    const consulta = await pool.query( `DELETE FROM tb_consignacion WHERE id_consignacion = '${id_consignacion}' ` );
    
    res.redirect('/consignaciones');
})  
router.get('/consignaciones/EliminarItemSola/:id/:id_consignacion',isLoggedIn, async (req,res) => {
    const { id_consignacion } = req.params;
    const { id } = req.params;
    await pool.query( `DELETE FROM tb_consignacion_detalles WHERE id = '${id}' ` );
    
     console.log('esta es la consignacion',id_consignacion,'este es el id',id)

    res.redirect('/consignaciones')
})



//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
//************************************************************************************************ */
1




router.get('/consignaciones/DetallesPlaneacion/:id_planeacion',isLoggedIn, async (req,res) => {
    const {id_planeacion}= req.params;
    const tb_equipo_item_personal = await pool.query(`
    SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida 
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion = '${id_planeacion}'`);

    const consulta1= await pool.query(`SELECT *FROM tb_consignacion c , tb_personal p WHERE c.id_personal=p.id AND c.id_planeacion='${id_planeacion}'`);
    res.render('consignaciones/detalles-planeacion',
    {
        tb_equipo_item_personal:tb_equipo_item_personal,
        consulta1:consulta1
    });
    })
    router.get('/consignacionesconplaneacion/agregar/:id/:id_planeacion', isLoggedIn, async (req,res) => {
            const {id}= req.params;
            const {id_planeacion}= req.params;
            const id_item=7;
            const consulta = await pool.query(`select * from tb_personal WHERE id='${id}'`);
            const consulta2 = await pool.query(`select * from tb_personal WHERE id='${id}'`);
            const consulta1 = await pool.query(`select * from tb_item WHERE categoria_item='${id_item}'`);
            console.log(consulta,consulta1)
            res.render('consignaciones/agregar-consignacionconplaneacion',{
                consulta:consulta,
                consulta1:consulta1,
                consulta2:consulta2,
                id_planeacion:id_planeacion,
            });
    })
    /* router.post('/consignacionesconplaneacion', isLoggedIn, async (req, res) => {

        const { observaciones } = req.body;
        const { descripcion } = req.body;
        const { estado } = req.body;
        const { fecha } = req.body;
        const { id_personal } = req.body;
        const { id_planeacion } = req.body;
        const { dias } = req.body;
        const consulta = await pool.query(`INSERT INTO tb_consignacion(id_planeacion,id_personal,fecha,estado,descripcion,observaciones) VALUES(?,?,?,?,?,?)`, [id_planeacion, id_personal, fecha, estado, descripcion, observaciones]);
        const consulta1 = await pool.query(`SELECT id_item FROM tb_item`);
        let reqData = [];
        consulta1.forEach(element => {
            reqData.push({
                id: element.id_item,
                valor: req.body[`costoU-${element.id_item}`],
                cantidad: req.body[`cantidad-${element.id_item}`],
            });
        });
        reqData.forEach(async element => {
                await pool.query(`INSERT INTO tb_consignacion_detalles(id_item, cantidad, valor_unitario, costo_total_item, id_consignacion) VALUES(?,?,?,?,?)`, [element.id, element.cantidad, element.valor, (element.cantidad * element.valor), consulta.insertId]);
            
        });
        res.redirect(`/consignaciones/DetallesPlaneacion/${id_planeacion}`);
    }) */
    










































module.exports = router;    