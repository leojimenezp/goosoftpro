const express = require('express');
const router = express.Router();
const pool = require('../database');
const requestify = require('requestify');
const { isLoggedIn } = require('../lib/auth');
var moment = require('moment');


/* 

const descripcion_bitacora = "El usuario "+req.user.username+" creó una nueva base llamada "+nombre_base;


const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id

await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
}; */

router.get('/consignaciones',isLoggedIn, async (req,res) => {
    id_planeacion=0;
    let consulta1;

    if (req.user.permiso_aceptar ==1){
    consulta1= await pool.query(`SELECT *FROM tb_consignacion c , tb_personal p
    WHERE c.id_personal=p.id 
    AND c.id_planeacion='${id_planeacion}'
    AND c.quien_acepta ='${req.user.id}'`);
    } else {
    consulta1= await pool.query(`SELECT *FROM tb_consignacion c , tb_personal p
    WHERE c.id_personal=p.id 
    AND c.id_planeacion='${id_planeacion}'`);
    } 
    const consulta = await pool.query("select * from tb_planeacion");
    const consulta5 = await pool.query(`SELECT
    YEAR( tc.fecha )idOrdera, 
	MONTH(tc.fecha) idOrder,
	SUM(tc.costo_cotizacion) empresa
    FROM tb_consignacion tc  GROUP BY idOrdera, idOrder`);
   
    console.log(consulta5)
    res.render('consignaciones/consignacion',
    {
        consulta5: JSON.stringify(consulta5),
        consulta: consulta,
        consulta1: consulta1
    });
})

router.post('/consignacion/persona', async(req, res) =>{
    const {  id_persona } = req.body;
    const consulta = await pool.query('SELECT numero_documento_personal, nombre_personal, apellido_personal FROM tb_personal WHERE id = ?', [id_persona]);
    res.json(consulta[0]);
});


router.post('/consignacion/item', async(req, res)=>{
    const consulta = await pool.query(`select id_item idItem from tb_item where categoria_item=?`, [7]);
    res.json({resp: consulta});
}); 

router.post('/consignaciones/tabla', async (req, res) => {
    const {item} = req.body;
    const {id_consignacion} =req.body;
    const consulta = await pool.query( `select * from tb_item WHERE categoria_item='${item}'`);
    const consulta1 = await pool.query( `SELECT *
    FROM tb_consignacion c , tb_consignacion_detalles d , tb_item i
    WHERE c.id_consignacion = d.id_consignacion
    AND i.id_item = d.id_item
    AND c.id_consignacion = '${id_consignacion}'` );
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
}); 

/* REQUIRE se agrega 17 de enero */
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');

/* fin REQUIRE se agrega 17 de enero */

const compile = async function (templateName,data){
    const filePath = path.join(process.cwd(),'src/views/consignaciones',`${templateName}.hbs`);
    const html =await fs.readFile(filePath,'utf-8');
    //console.log(html);
    return hbs.compile(html)(data);
};



/* ruta para exportar a pdf llando una vista */
router.get('/consignaciones/generaPDF/:id_consignacion/:id', isLoggedIn, async (req,res) => {
    try{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
         const {id} = req.params 
        const {id_consignacion} = req.params

        console.log(id_consignacion)
        const total = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
        const total1 = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
        const item = await pool.query(`SELECT *	
        FROM tb_item it , tb_consignacion_detalles cd 
        WHERE cd.id_consignacion ='${id_consignacion}'
        AND it.id_item = cd.id_item`);
        const informacion = await pool.query( `SELECT *
        FROM tb_personal p , tb_consignacion c 
        WHERE p.id = c.id_personal
        AND c.id_personal = p.id
        AND c.id_consignacion ='${id_consignacion}'` );
        console.log(informacion)
        let horaFecha = informacion[0].fecha.split(" ");
        let fechaSplit = horaFecha[0].split("-");
        
    
             item.forEach(element=>{
            element.valor_unitario = Intl.NumberFormat().format(element.valor_unitario);
            element.costo_total_item = Intl.NumberFormat().format(element.costo_total_item);
        }); 
    total[0].total = Intl.NumberFormat().format(total[0].total);
    total1[0].total = Intl.NumberFormat().format(total1[0].total);
       

        const content =  await compile('pdfconsignacion1',{
            item:item ,
            total:total,
            total1:total1,
            informacion:informacion,
            observaciones:informacion[0].observaciones,
            anos:fechaSplit[0],
            mes:fechaSplit[1],
            dia:fechaSplit[2]
    
        });    
        /* console.log(content); */
        
        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf({
            path: `src/public/pdf-consignacion/${id_consignacion}-${informacion[0].nombre_personal}-${moment().format('YYYY MM DD-hh-mm-ss')}.pdf`,
            format: 'A4', 
            printBackground :true
        });
          
         await browser.close(); 
        //process.exit();
        res.redirect(`/consignaciones/DetallesDeCostoToltal/${id_consignacion}/${id}`);
    
    } catch(e){
        console.log('error',e);
    }


});
/*  FIN ruta para exportar a pdf llando una vista */




/* ruta para abrir el html para exportar a pdf */
 router.get('/consignaciones/pdfconsignacion/:id_consignacion', isLoggedIn, async (req,res) => {
    
    const { id_consignacion } = req.params;
    const total = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
    const total1 = await pool.query( `SELECT SUM(costo_total_item) AS total  FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}'`);
    const item = await pool.query(`SELECT *	
    FROM tb_item it , tb_consignacion_detalles cd 
    WHERE cd.id_consignacion ='${id_consignacion}'
    AND it.id_item = cd.id_item`);
    const informacion = await pool.query( `SELECT *
    FROM tb_personal p , tb_consignacion c 
    WHERE p.id = c.id_personal
    AND c.id_personal = p.id
    AND c.id_consignacion ='${id_consignacion}'` );

   
    const descripcion_bitacora = "El usuario "+req.user.username+" exporto una consigacion de consecutivo "+ id_consignacion ;


    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

     await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    let horaFecha = informacion[0].fecha.split(" ");
    let fechaSplit = horaFecha[0].split("-");
        console.log("año", fechaSplit[0]);
        console.log("mes", fechaSplit[1]);
        console.log("dia", fechaSplit[2]);
        console.log(".!.",informacion);
    
             item.forEach(element=>{
            element.valor_unitario = Intl.NumberFormat().format(element.valor_unitario);
            element.costo_total_item = Intl.NumberFormat().format(element.costo_total_item);
        }); 
    total[0].total = Intl.NumberFormat().format(total[0].total);
    total1[0].total = Intl.NumberFormat().format(total1[0].total);
        console.log(item)
    res.render('consignaciones/pdfconsignacion1',{
        item:item ,
        total:total,
        total1:total1,
        informacion:informacion,
        observaciones:informacion[0].observaciones,
        anos:fechaSplit[0],
        mes:fechaSplit[1],
        dia:fechaSplit[2]

    });
}) 
/* FIN ruta para abrir el html para exportar a pdf /*/
router.get('/consignaciones/pdfgenerar', isLoggedIn, async (req,res) => {
    

    const btn_pdf = document.getElementById('btn_pdf');
    const container_main = document.getElementById('container_main');
    const loader = document.getElementById('loader');

    console.log(request + `req`);
    
    console.log(container_main + `contain`);
})

router.get('/consignaciones/agregarsinoperacion', isLoggedIn, async (req,res) => {
    
    const id_item=7;
    const consulta2= await pool.query(`select * from tb_personal where permiso_aceptar='1'`);
    const consulta = await pool.query("select * from tb_personal");
    const consulta1 = await pool.query(`select * from tb_item where categoria_item=${id_item}`);

    console.log(consulta1)
    
    res.render('consignaciones/agregar-consignacionsinplaneacion',{
        consulta:consulta,
        consulta1:consulta1,
        consulta2:consulta2,
        usuario:req.user.nombre_personal + " " + req.user.apellido_personal,
        
    });
})

router.post('/AgregarDetallesConsignacion', isLoggedIn, async (req, res) => {

    const { fecha } = req.body;
    const {solicitante} = req.body;
    const {id_personal} = req.body;
    const { servicio } = req.body;
    const { dias } = req.body;
    const {trasporte  } = req.body;
    const { cliente } = req.body;
    const { observaciones } = req.body;
    const { descripcion } = req.body;
    const { estado } = req.body;
    const { id_planeacion } = req.body;
    const { pozo } = req.body; 
    const {costo_cotizacion} = req.body;
    const {id_quien_acepta} = req.body;
    
    console.log(costo_cotizacion)
    const consulta = await pool.query(`INSERT INTO tb_consignacion(id_planeacion,id_personal,fecha,estado,observaciones,pozo,solicitante,servicio,dias,trasporte,cliente,costo_cotizacion,quien_acepta) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,[id_planeacion, id_personal, fecha, estado,observaciones,pozo,solicitante,servicio,dias,trasporte,cliente,costo_cotizacion,id_quien_acepta]);
    
    const descripcion_bitacora = "El usuario "+req.user.username+" creo una consigacion con consecutivo "+ consulta.insertId ;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    const consulta1 = await pool.query(`SELECT id_item FROM tb_item WHERE categoria_item ='7'`);
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
    res.redirect(`/consignaciones/DetallesPlaneacion/${id_planeacion}`)
})

router.get('/consignaciones/editarlositem/:id_consignacion/:id_personal',isLoggedIn, async (req,res) => {
    const { id_personal } = req.params;
    const { id_consignacion } = req.params;
    const categoria=7;
    const consulta = await pool.query( `select * from tb_personal WHERE id=${id_personal}` );
    const consulta1 = await pool.query( `SELECT * FROM tb_consignacion_detalles de , tb_item it
    WHERE de.id_consignacion = '${id_consignacion}'
    AND it.id_item = de.id_item
    AND it.categoria_item = ${categoria}`);
    



    res.render('consignaciones/editar-consigacion',{
    consulta:consulta,
    consulta1:consulta1,
    id_consignacion:id_consignacion 
});

}) 
router.post('/editarlositem1',isLoggedIn, async (req,res) => {
    const {id_consignacion}=req.body;
    const {costo_cotizacion}=req.body;
    await pool.query(`UPDATE tb_consignacion SET costo_cotizacion =? WHERE id_consignacion = ${id_consignacion}`,[costo_cotizacion])
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
        await pool.query(`UPDATE tb_consignacion_detalles SET  cantidad=? , valor_unitario =? , costo_total_item=?  WHERE id_consignacion = ? AND id_item = ?`, [ element.cantidad, element.valor, (element.cantidad * element.valor), id_consignacion, element.id]);           
    });

    const descripcion_bitacora = "El usuario "+req.user.username+" modifico una consigacion con consecutivo "+ id_consignacion;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    res.redirect('/consignaciones');
})


router.post('/editarlaConsignacion',isLoggedIn, async (req,res) => {
    const { estado } = req.body;
    const { descripcion } = req.body;
    const { id_consignacion } = req.body;
    await pool.query(`UPDATE tb_consignacion SET estado='${estado}',descripcion='${descripcion}'  WHERE id_consignacion='${id_consignacion}'`);
    const consulta = await pool.query('SELECT id FROM tb_consignacion_detalles WHERE id_consignacion = ?', [id_consignacion]);

    if(estado == "confirmado"){
        consulta.forEach(async element => {
            await pool.query("INSERT INTO tb_legalizacion(id_consignacion_detalle, valor) VALUES(?,?)", [element.id, 0]);
        });
    }
    else if(estado == "rechazado"){
        consulta.forEach(async element => {
            await pool.query("DELETE FROM  tb_legalizacion WHERE id_consignacion_detalle = ?", [element.id]);
        });
    }

    const descripcion_bitacora = "El usuario "+req.user.username+" modifico una consigacion con consecutivo "+ id_consignacion;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    res.redirect('/consignaciones');
}) 









router.get('/consignaciones/enlistar',isLoggedIn, async (req,res) => {
    const { codigo , id_personal } = req.params; 
    const consulta1 = await pool.query( `select id_consignacion from tb_consignacion WHERE codigo='${codigo}' `);
    res.render('consignaciones/agregar-personal-externa',{
        consulta:consulta,
        consulta1:consulta1
    });
})



router.get('/consignaciones/AsignarConsignacion/:id_consignacion/:id', isLoggedIn, async (req,res) =>{
    const { id_consignacion } = req.params;
    const {id} = req.params;
    const operacion=1;

    const consulta = await pool.query(`select * from tb_planeacion `);
    const consulta2 = await pool.query(`select * from tb_personal WHERE id=${id}`);

    
    res.render('consignaciones/asignar-consigacionsinoperacion',
    {consulta:consulta,
    id_consignacion:id_consignacion,
    consulta2:consulta2,
    id:id });
})



router.post('/AsignarConsignacionSola', isLoggedIn, async (req,res) =>{
    const {id_planeacion} = req.body;
    const {id_consignacion} = req.body;
    const {id_personal} = req.body;
    const consulta = await pool.query(`SELECT COUNT(*) as cantidad FROM tb_equipo_item_personal WHERE id_personal ='${id_personal}'`);
    console.log(req.body)
    console.log(`SELECT COUNT(*) as cantidad FROM tb_equipo_item_personal WHERE id_personal ='${id_personal}'`)
    console.log(consulta[0].cantidad)

    const descripcion_bitacora = "El usuario "+req.user.username+" asigno una consigacion con consecutivo "+ id_consignacion  ;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    if (consulta[0].cantidad >= '1'){
        await pool.query(`UPDATE tb_consignacion SET id_planeacion='${id_planeacion}' WHERE id_consignacion='${id_consignacion}'` );  
    }else{
     req.flash('error', 'no hay ningun usuario en esa planeacion ');
    }
    
    
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

    //Formato por miles
    total[0].total = Intl.NumberFormat().format(total[0].total);
    total1[0].total = Intl.NumberFormat().format(total1[0].total);
    consulta.forEach(element=>{
        element.valor_unitario = Intl.NumberFormat().format(element.valor_unitario);
        element.costo_total_item = Intl.NumberFormat().format(element.costo_total_item);
    });
    
    console.log("este es el permiso", req.user.permiso_aceptar)
    console.log(id_consignacion)
    res.render('consignaciones/detalles-total', {   
        consulta:consulta,
        consulta1:consulta1,
        total1:total1,
        total:total,
        id_consignacion:id_consignacion,
        id_usuario:req.user.permiso_aceptar,
        id:id
    });
})
router.get('/consignaciones/EliminarConsignacionSola/:id_consignacion/:id_planeacion',isLoggedIn, async (req,res) => {

    const { id_consignacion } = req.params;
    const { id_planeacion } = req.params;

    const descripcion_bitacora = "El usuario "+req.user.username+" elimino una consigacion sola con consecutivo "+ id_consignacion;
    const consigacion =await pool.query( `SELECT * FROM tb_consignacion WHERE id_consignacion = '${id_consignacion}' ` );
    const detallesconsigacion = await pool.query( `SELECT * FROM tb_consignacion WHERE id_consignacion = '${id_consignacion}' ` );
    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        antes:JSON.stringify({
            consulta1: consigacion[0],
            consulta2: detallesconsigacion[0]
                            }),
        despues:"ya no existe bye ",
        id_user: req.user.id}

        console.log(bitacora)


    await pool.query( `DELETE FROM tb_consignacion WHERE id_consignacion = '${id_consignacion}' ` );
    await pool.query( `DELETE FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}' ` );
   

    

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    res.redirect(`/consignaciones/DetallesPlaneacion/${id_planeacion}`)
})  
router.get('/consignaciones/EliminarItemSol/:id_consignacion/:id_planeacion',isLoggedIn, async (req,res) => {
    const { id_consignacion } = req.params;
    const { id } = req.params;


    await pool.query( `DELETE FROM tb_consignacion WHERE id_consignacion = '${id_consignacion}' ` );
    await pool.query( `DELETE FROM tb_consignacion_detalles WHERE id_consignacion = '${id_consignacion}' ` );
    const descripcion_bitacora = "El usuario "+req.user.username+" elimino una consigacion de item con consecutivo "+ id_consignacion;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    res.redirect(`/consignaciones/DetallesPlaneacion/${id_planeacion}`)
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

    const consulta5 = await pool.query(`SELECT
    YEAR( tc.fecha )idOrdera, 
	MONTH(tc.fecha) idOrder,
	SUM(tc.costo_cotizacion) empresa
    FROM tb_consignacion tc WHERE tc.id_planeacion = '${id_planeacion}' GROUP BY idOrdera, idOrder`);
    
    const resultado= await pool.query(`SELECT SUM(cantidad * precio) AS total  FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    let consulta1;
    consulta1= await pool.query(`SELECT *FROM tb_consignacion c , tb_personal p
        WHERE c.id_personal=p.id 
        AND c.id_planeacion='${id_planeacion}'`);

    const consulta2= await pool.query(`
        SELECT 
	    SUM(tcd.costo_total_item) total
        FROM tb_consignacion tc
        INNER JOIN tb_consignacion_detalles tcd ON tc.id_consignacion = tcd.id_consignacion
        INNER JOIN tb_personal tp ON tc.id_personal = tp.id
        WHERE tc.id_planeacion ='${id_planeacion}'`);
            
    
    const totales= await pool.query(`SELECT SUM(costo_total_item) AS total1 
    FROM tb_consignacion_detalles de , tb_consignacion con
    WHERE de.id_consignacion = con.id_consignacion
    AND con.id_personal='${6}'
    AND  id_planeacion ='${id_planeacion}'`);

        tb_equipo_item_personal.forEach(element=>{
        element.bono_salarial_personal = Intl.NumberFormat().format(element.bono_salarial_personal);
        element.total = Intl.NumberFormat().format(element.total);
        element.costo = Intl.NumberFormat().format(element.costo);
    }); 

    res.render('consignaciones/detalles-planeacion',
    {
        tb_equipo_item_personal: JSON.stringify(tb_equipo_item_personal),
        totales:JSON.stringify(totales),
        tb_equipo_item_personal1: tb_equipo_item_personal,
        consulta5: JSON.stringify(consulta5),
        consulta1:consulta1,
        total:consulta2[0].total,
        total_cotizacion:resultado[0].total,
        
    });
})


router.get('/consignacionesconplaneacion/agregar/:id/:id_planeacion', isLoggedIn, async (req,res) => {
            const {id}= req.params;
            const {id_planeacion}= req.params;
            const id_item=7;

            const consulta = await pool.query(`select * from tb_personal WHERE id='${id}'`);
            const consulta2 = await pool.query(`select * from tb_personal WHERE id='${id}'`);
            const consulta4= await pool.query(`select * from tb_personal where permiso_aceptar='1'`);
            const consulta1 = await pool.query(`select * from tb_item WHERE categoria_item='${id_item}'`);
            console.log(consulta,consulta1)
            
            res.render('consignaciones/agregar-consignacionconplaneacion',{
                consulta:consulta,
                consulta1:consulta1,
                consulta2:consulta2,
                consulta4:consulta4,
                id_planeacion:id_planeacion,
                usuario:req.user.nombre_personal + "" + req.user.apellido_personal
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