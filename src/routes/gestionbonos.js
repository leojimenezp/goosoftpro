const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');




router.get('/gestionbonos', isLoggedIn, async (req, res) => {

    const consulta = await pool.query(`SELECT * 
        FROM tb_gestion_bonos bo , tb_personal per 
        WHERE bo.id_planeacion='0'
        AND bo.id_personal=per.id`);

    const personal = await pool.query("select * from tb_personal");
    const consulta1 = await pool.query(`select * from tb_planeacion`);

    res.render('gestionbonos/bonos', {
        consulta: consulta,
        consulta1: consulta1,
        personal: personal

    });
});
router.get('/gestionbonosdespuesdeagregar/:id_planeacion', isLoggedIn, async (req, res) => {

    const consulta = await pool.query(`SELECT * 
        FROM tb_gestion_bonos bo , tb_personal per 
        WHERE bo.id_planeacion='0'
        AND bo.id_personal=per.id`);
    const personal = await pool.query("select * from tb_personal");
    const consulta1 = await pool.query(`select * from tb_planeacion`);

    const tb_equipo_item_personal = await pool.query(`
    SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida 
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion = '${id_planeacion}'`);

    const tb_equipo_item_personal213 = await pool.query(`
    SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida 
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion = '${id_planeacion}'`);

    res.render('gestionbonos/bonos', {
        consulta: consulta,
        consulta1: consulta1,
        personal: personal,
        tb_equipo_item_personal: tb_equipo_item_personal,
        tb_equipo_item_personal213: tb_equipo_item_personal213

    });
});
router.get('/graficas', isLoggedIn, async (req, res) => {

    const consulta5 = await pool.query(` SELECT
	YEAR( tg.fecha )idOrdera, 
	MONTH(tg.fecha) idOrder,
	SUM(tg.valor_bono_total) empresa
	FROM tb_gestion_bonos tg GROUP BY idOrdera, idOrder`);
    const consulta4 = await pool.query(`SELECT
	YEAR(tg.fecha) idOrder,
	SUM(tg.valor_bono_total) empresa
	FROM tb_gestion_bonos tg GROUP BY idOrder`);

    res.render('gestionbonos/graficas', {
        consulta5: JSON.stringify(consulta5),
        consulta4: JSON.stringify(consulta4)
    })



}); 
 
    

router.post('/reportes', isLoggedIn, async (req, res) => { 
    const {
        id_personal,
        fecha_inicio,
        fecha_final
    } = req.body;
    let consulta
    console.log(id_personal, fecha_inicio, fecha_final)
    if (id_personal == '') {
        consulta = await pool.query(`SELECT DISTINCT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',
            (SELECT SUM(tgb1.valor_bono_total) 
            FROM  tb_gestion_bonos tgb1
            WHERE  tgb1.centro_de_costo=tgb.centro_de_costo
            AND    tgb1.id_personal=tgb.id_personal
            AND    tgb1.id_planeacion=tgb.id_planeacion
            AND tgb1.tipo_bono IN(2,1)) AS valor 
            ,'V' , 30 AS concepto  ,  tgb.centro_de_costo,'ACUMULADO BONOS POR CENTRO DE COSTOS' AS descripcion	
            FROM tb_personal tp , tb_gestion_bonos tgb
            WHERE  tgb.fecha_inicio>='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' AND  tp.id = tgb.id_personal 
            UNION
        SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal, tp.numero_documento_personal, 'auto_incremente',
            ( (tp.salario_personal /30)* ( SELECT  SUM( tgb1.dias) valor 
            FROM tb_gestion_bonos tgb1 
            WHERE tgb1.id_personal =  tgb.id_personal
            AND  tgb1.centro_de_costo =tgb.centro_de_costo 
            AND tgb1.tipo_bono IN (1,2) )) AS valor 
            ,'V' , 1 AS concepto ,  tgb.centro_de_costo,'SUELDO POR CENTRO DE COSTOS' AS descripcion
            FROM tb_personal tp , tb_gestion_bonos tgb
            WHERE tgb.fecha_inicio >='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' AND
            tp.id = tgb.id_personal 
            UNION
       SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',  tgb.cantidad_festivos * 8 AS valor ,'C' , 23 AS concepto ,  tgb.centro_de_costo,'FESTIVOS POR CENTRO DE COSTOS' AS descripcion
            FROM tb_personal tp , tb_gestion_bonos tgb 
            WHERE  tgb.fecha_inicio >='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' AND
            tp.id = tgb.id_personal    ORDER BY 1 ,11`);

        consulta.forEach(element => {
            element.salario_personal = Intl.NumberFormat().format(element.salario_personal);
            element.bono_salarial_personal = Intl.NumberFormat().format(element.bono_salarial_personal);
            element.bono_no_salarial_personal = Intl.NumberFormat().format(element.bono_no_salarial_personal);
        })

    } else {
        console.log("aqui else")
        consulta = await pool.query(`SELECT DISTINCT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',
        (SELECT SUM(tgb1.valor_bono_total) 
        FROM  tb_gestion_bonos tgb1
        WHERE  tgb1.centro_de_costo=tgb.centro_de_costo
        AND    tgb1.id_personal=tgb.id_personal
        AND    tgb1.id_planeacion=tgb.id_planeacion
        AND tgb1.tipo_bono IN(2,1)) AS valor 
        ,'V' , 30 AS concepto  ,  tgb.centro_de_costo,'ACUMULADO BONOS POR CENTRO DE COSTOS' AS descripcion	
        FROM tb_personal tp , tb_gestion_bonos tgb
        WHERE  tgb.fecha_inicio>='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' 
        AND  tp.id = tgb.id_personal AND tp.id='${id_personal}'
        UNION
        SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal, tp.numero_documento_personal, 'auto_incremente',
        ( (tp.salario_personal /30)* ( SELECT  SUM( tgb1.dias) valor 
        FROM tb_gestion_bonos tgb1 
        WHERE tgb1.id_personal =  tgb.id_personal
        AND  tgb1.centro_de_costo =tgb.centro_de_costo 
        AND tgb1.tipo_bono IN (1,2) )) AS valor 
        ,'V' , 1 AS concepto ,  tgb.centro_de_costo,'SUELDO POR CENTRO DE COSTOS' AS descripcion
        FROM tb_personal tp , tb_gestion_bonos tgb
        WHERE tgb.fecha_inicio >='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' AND
        tp.id = tgb.id_personal AND tp.id='${id_personal}'
        UNION
        SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',  tgb.cantidad_festivos * 8 AS valor ,'C' , 23 AS concepto ,  tgb.centro_de_costo,'FESTIVOS POR CENTRO DE COSTOS' AS descripcion
        FROM tb_personal tp , tb_gestion_bonos tgb 
        WHERE  tgb.fecha_inicio >='${fecha_inicio}' AND  tgb.fecha_final <='${fecha_final}' AND
        tp.id = tgb.id_personal AND tp.id='${id_personal}'   ORDER BY 1 ,11 `);

        consulta.forEach(element => {
            element.salario_personal = Intl.NumberFormat().format(element.salario_personal);
            element.bono_salarial_personal = Intl.NumberFormat().format(element.bono_salarial_personal);
            element.bono_no_salarial_personal = Intl.NumberFormat().format(element.bono_no_salarial_personal);
        })
    }
    let id = 0;
    consulta.forEach(element=>{
        if(id == element.id){
            element.show = 0;
        }else{
            id = element.id;
            element.show = 1;
        }
    });
    res.render('gestionbonos/reportes', {
        consulta: consulta,
        id_personal: id_personal,
        fecha_inicio: fecha_inicio,
        fecha_final: fecha_final
    })
})
 


router.post('/reportesconplaneacio', isLoggedIn, async (req, res) => {const {
    id_planeacion,
    fecha_inicio,
    fecha_final
} = req.body;

const consulta = await pool.query(`SELECT DISTINCT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',
(SELECT SUM(tgb1.valor_bono_total) 
FROM  tb_gestion_bonos tgb1
WHERE  tgb1.centro_de_costo=tgb.centro_de_costo
AND    tgb1.id_personal=tgb.id_personal
AND    tgb1.id_planeacion=tgb.id_planeacion
AND tgb1.tipo_bono IN(2,1)) AS valor 
,'V' , 30 AS concepto  ,  tgb.centro_de_costo,'ACUMULADO BONOS POR CENTRO DE COSTOS' AS descripcion	
FROM tb_personal tp , tb_gestion_bonos tgb
WHERE  tgb.fecha_inicio>='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' 
AND  tp.id = tgb.id_personal AND tgb.id_planeacion ='${id_planeacion}'
UNION
SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal, tp.numero_documento_personal, 'auto_incremente',
( (tp.salario_personal /30)* ( SELECT  SUM( tgb1.dias) valor 
FROM tb_gestion_bonos tgb1 
WHERE tgb1.id_personal =  tgb.id_personal
AND  tgb1.centro_de_costo =tgb.centro_de_costo 
AND tgb1.tipo_bono IN (1,2) )) AS valor 
,'V' , 1 AS concepto ,  tgb.centro_de_costo,'SUELDO POR CENTRO DE COSTOS' AS descripcion
FROM tb_personal tp , tb_gestion_bonos tgb
WHERE tgb.fecha_inicio >='${fecha_inicio}' AND tgb.fecha_final <='${fecha_final}' AND
tp.id = tgb.id_personal AND tgb.id_planeacion ='${id_planeacion}'
UNION
SELECT tp.id ,tp.nombre_personal , tp.salario_personal , tp.bono_salarial_personal , tp.bono_no_salarial_personal,  tp.numero_documento_personal, 'auto_incremente',  tgb.cantidad_festivos * 8 AS valor ,'C' , 23 AS concepto ,  tgb.centro_de_costo,'FESTIVOS POR CENTRO DE COSTOS' AS descripcion
FROM tb_personal tp , tb_gestion_bonos tgb 
WHERE  tgb.fecha_inicio >='${fecha_inicio}' AND  tgb.fecha_final <='${fecha_final}' AND
tp.id = tgb.id_personal AND tgb.id_planeacion ='${id_planeacion}'   ORDER BY 1 ,11 `);

    let id = 0;
    consulta.forEach(element=>{
        if(id == element.id){
            element.show = 0;
        }else{
            id = element.id;
            element.show = 1;
        }
    });
res.render('gestionbonos/reportes', {
    consulta: consulta
})
})
// ELIMINAR ////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/Eliminar/:id_bonos', isLoggedIn, async (req, res) => {

    const { id_bonos } = req.params;
    await pool.query(`DELETE FROM tb_gestion_bonos WHERE id_bonos= '${id_bonos}'`);

    const descripcion_bitacora = "El usuario " + req.user.username + " elimino un bono con consecutivo " + id_bonos;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    }

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);


    res.redirect('/gestionbonos');
})

// AGREGAR ////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/gestionbonos/agregarbonosinplaneacion', isLoggedIn, async (req, res) => {

    const consulta = await pool.query(`select * from tb_personal`);


    res.render('gestionbonos/crear-bono-sinplaneacion', {
        consulta: consulta
    });
})
router.get('/gestionbonos/agregarbonoconplaneacion/:id/:id_planeacion', isLoggedIn, async (req, res) => {
    const { id, id_planeacion } = req.params;
    const consulta = await pool.query(`select * from tb_personal WHERE id=${id}`);
    const consulta1 = await pool.query(`select * from tb_personal WHERE id=${id}`);


    res.render('gestionbonos/crear-bono-conplaneacion', {
        consulta: consulta,
        consulta1: consulta1,
        id_planeacion: id_planeacion
    });
})

router.post('/gestionbonos/agregar-bono-sin-planeacion1', isLoggedIn, async (req, res) => {
    const { id_personal,
        centro_costo,
        fecha_final,
        tipo_de_bono,
        fecha_inicio,
        id_planeacion,
        otross
    } = req.body;

    const descripcion_bitacora = "El usuario " + req.user.username + " agrego un bono";

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    }

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    persona = await pool.query('SELECT derecho_festivo FROM tb_personal WHERE id=? ', [id_personal])
    let festivos = [];
    let festivosss = 0;
    if (persona[0].derecho_festivo == 1) {
        festivos = await pool.query(`SELECT COUNT(fecha) AS festivos FROM tb_festivos WHERE fecha >= '${fecha_inicio}' AND fecha <= '${fecha_final}'`)
        festivosss = festivos[0].festivos;
    }


    if (otross == "") { otros = 0 }
    else { otros = otross }
    if (tipo_de_bono == '1') {
        const bono_trasporte = await pool.query(`SELECT bono_no_salarial_personal  AS total FROM tb_personal WHERE id ='${id_personal}'`);
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
        valor_bono_total,
        cantidad_festivos) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [id_personal
                , centro_costo
                , fecha_final
                , tipo_de_bono
                , fecha_inicio
                , fecha_inicio
                , id_planeacion
                , bono_trasporte[0].total
                , (dias[0].dias + 1), (bono_trasporte[0].total * (dias[0].dias + 1)), festivosss]);
    } else if (tipo_de_bono == '2') {
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
        valor_bono_total,cantidad_festivos) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [id_personal
                , centro_costo
                , fecha_final
                , tipo_de_bono
                , fecha_inicio
                , fecha_inicio
                , id_planeacion
                , bono_de_campo[0].bono_salarial_personal
                , (dias[0].dias + 1), (bono_de_campo[0].bono_salarial_personal * (dias[0].dias + 1)), festivosss]);
    } else if (tipo_de_bono == '3') {
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
        valor_bono_total,cantidad_festivos) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [id_personal
                , centro_costo
                , fecha_final
                , tipo_de_bono
                , fecha_inicio
                , fecha_inicio
                , id_planeacion
                , otros
                , (dias[0].dias + 1), (otros * (dias[0].dias + 1)), festivosss]);
    }


    res.redirect('/gestionbonos');
})





//EDITAR //////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/gestionbonos/editarbono/:id_bonos', isLoggedIn, async (req, res) => {
    const { id_bonos } = req.params;
    consulta = await pool.query(`SELECT  *
    FROM tb_gestion_bonos bo , tb_personal pe
    WHERE id_bonos = '${id_bonos}'
    AND bo.id_personal = pe.id  `);

    res.render('gestionbonos/editarbono', {
        consulta: consulta,
        id_bonos: id_bonos
    });
});
router.post('/gestionbonos/editarbono1', async (req, res) => {
    const {
        id_personal,
        id_bonos,
        centro_costo,
        fecha_final,
        tipo_de_bono,
        fecha_inicio,
        otross
    } = req.body;


    const descripcion_bitacora = "El usuario " + req.user.username + " edito un bono con consecutivo " + id_bonos;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    }

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    persona = await pool.query('SELECT derecho_festivo FROM tb_personal WHERE id=? ', [id_personal])
    let festivos = [];
    let festivosss = 0;
    if (persona[0].derecho_festivo == 1) {
        festivos = await pool.query(`SELECT COUNT(fecha) AS festivos FROM tb_festivos WHERE fecha >= '${fecha_inicio}' AND fecha <= '${fecha_final}'`)
        festivosss = festivos[0].festivos;
    }

    if (otross == "") { otros = 0 }
    else { otros = otross }

    if (tipo_de_bono == '1') {
        const bono_trasporte = await pool.query(`SELECT bono_no_salarial_personal  FROM tb_personal WHERE id ='${id_personal}'`);
        const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);
        await pool.query(`UPDATE tb_gestion_bonos SET 
    centro_de_costo ='${centro_costo}' ,
    fecha_final ='${fecha_final}',
    tipo_bono ='${tipo_de_bono}',
    fecha_inicio ='${fecha_inicio}' ,
    fecha ='${fecha_inicio}' ,
    valor_bono ='${bono_trasporte[0].bono_no_salarial_personal}',
    dias ='${(dias[0].dias + 1)}',
    valor_bono_total ='${(bono_trasporte[0].bono_no_salarial_personal * (dias[0].dias + 1))}',
    cantidad_festivos ='${festivosss}'
    WHERE id_bonos ='${id_bonos}'`);


    } else if (tipo_de_bono == '2') {

        const bono_de_campo = await pool.query(`SELECT  bono_salarial_personal  FROM tb_personal WHERE id ='${id_personal}'`);
        const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);

        await pool.query(`UPDATE tb_gestion_bonos SET 
    centro_de_costo ='${centro_costo}' ,
    fecha_final ='${fecha_final}',
    tipo_bono ='${tipo_de_bono}',
    fecha_inicio ='${fecha_inicio}' ,
    fecha ='${fecha_inicio}' ,
    valor_bono ='${bono_de_campo[0].bono_salarial_personal}',
    dias ='${(dias[0].dias + 1)}',
    valor_bono_total ='${(bono_de_campo[0].bono_salarial_personal * (dias[0].dias + 1))}'
    ,cantidad_festivos ='${festivosss}'
    WHERE id_bonos ='${id_bonos}`);

    } else if (tipo_de_bono == '3') {
        const dias = await pool.query(`SELECT DATEDIFF('${fecha_final}','${fecha_inicio}')AS dias`);
        await pool.query(`UPDATE tb_gestion_bonos SET 
    centro_de_costo ='${centro_costo}' ,
    fecha_final ='${fecha_final}',
    tipo_bono ='${tipo_de_bono}',
    fecha_inicio ='${fecha_inicio}' ,
    fecha ='${fecha_inicio}' ,
    valor_bono ='${otros}',
    dias ='${(dias[0].dias + 1)}',
    valor_bono_total ='${(otros * (dias[0].dias + 1))}',
    cantidad_festivos ='${festivosss}
    WHERE id_bonos ='${id_bonos}'`
        );
    }
    res.redirect('/gestionbonos');
})

//Api///////////


router.post('/gestionbonos/bonoSinPlaneacion', async (req, res) => {
    const { fecha_inicio } = req.body;
    const { fecha_final } = req.body;
    const { id_personal } = req.body;
    let consulta
    console.log(id_personal)
    if (id_personal == '') {
        consulta = await pool.query(`
        SELECT * FROM 
        tb_gestion_bonos gb , tb_personal pe
        WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}'
        AND gb.id_personal = pe.id
        AND gb.id_planeacion ='0'`);
    } else {

        consulta = await pool.query(`
    SELECT * FROM 
    tb_gestion_bonos gb , tb_personal pe
    WHERE fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}'
    AND gb.id_personal ='${id_personal}'
    AND gb.id_personal = pe.id
    AND gb.id_planeacion ='0'`);
    }
    res.send({ resp: consulta });
})
router.post('/gestionbonos/buscadordepersonal', isLoggedIn, async (req, res) => {
    const { id_planeacion } = req.body;
    const tb_equipo_item_personal = await pool.query(`
    SELECT p.id, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida 
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion = '${id_planeacion}'`);

    res.send({ resp: tb_equipo_item_personal });

});
router.post('/gestionbonos/buscarbonoporplaneacion', isLoggedIn, async (req, res) => {

    const { fecha_inicio1 } = req.body;
    const { fecha_final1 } = req.body;
    const { id_planeacion } = req.body;

    console.log(fecha_inicio1, fecha_final1, id_planeacion)
    consulta3 = await pool.query(`
    SELECT * FROM 
    tb_gestion_bonos gb , tb_personal pe
    WHERE fecha BETWEEN '${fecha_inicio1}' AND '${fecha_final1}'
    AND gb.id_personal = pe.id 
    AND gb.id_planeacion = '${id_planeacion}' `);


    res.send({ resp: consulta3 });
});




module.exports = router;