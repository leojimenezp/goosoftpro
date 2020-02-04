const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/planeadoEjecutado', isLoggedIn, async (req, res) => {
   
    const planeacion = await pool.query("SELECT id_planeacion, titulo FROM tb_planeacion");
    res.render('reporteEjecutadoPlaneado/reporteEjecutadoPlaneado', {
        planeacion: planeacion
    });
});

router.post('/repor/busqueda', isLoggedIn, async (req, res) => {
    const {id_planeacion} = req.body;

    const mov_total_vehiculos_rubros = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tb_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tb_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
    const mov_total_personal_rubro = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tb_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
 
    const mov_total_vehiculos_rubrostbr = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tbr_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tbr_mov_item_vehiculos ie, tb_equipos e ,tbr_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
    const mov_total_personal_rubrotbr = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tbr_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
 
    const mov_total_vehiculos_rubrostbrc = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tbrc_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tbrc_mov_item_vehiculos ie, tb_equipos e ,tbrc_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
    const mov_total_personal_rubrotbrc = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tbrc_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tbrc_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
 
    let tbrc1 = 0, tbrc2 = 0;
    if(Number.isInteger(parseInt(mov_total_personal_rubrotbrc[0].total))) tbrc1 = mov_total_personal_rubrotbrc[0].total;
    if(Number.isInteger(parseInt(mov_total_vehiculos_rubrostbrc[0].total))) tbrc2 = mov_total_vehiculos_rubrostbcr[0].total;
    let total_movtbrc = parseInt(tbrc1) + parseInt(tbrc2);
    
    
    let tbr1 = 0, tbr2 = 0;
    if(Number.isInteger(parseInt(mov_total_personal_rubrotbr[0].total))) tbr1 = mov_total_personal_rubrotbr[0].total;
    if(Number.isInteger(parseInt(mov_total_vehiculos_rubrostbr[0].total))) tbr2 = mov_total_vehiculos_rubrostbr[0].total;
    let total_movtbr = parseInt(tbr1) + parseInt(tbr2);

    let t1 = 0, t2 = 0;
    if(Number.isInteger(parseInt(mov_total_personal_rubro[0].total))) t1 = mov_total_personal_rubro[0].total;
    if(Number.isInteger(parseInt(mov_total_vehiculos_rubros[0].total))) t2 = mov_total_vehiculos_rubros[0].total;
    let total_mov = parseInt(t1) + parseInt(t2);

    /**equipo */
 
    const equipo_total_equipo_herramienta_rubro = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
    const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); 

    const equipo_total_equipo_herramienta_rubrotbr = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tbr_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tbr_equipo_item_equipo_herramienta ie, tb_equipos e , tbr_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
    const equipo_total_personal_rubrostbr = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tbr_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tbr_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); 

    const equipo_total_equipo_herramienta_rubrotbrc = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tbrc_equipo_item_equipo_herramienta ie, tb_equipos e , tbrc_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
    const equipo_total_personal_rubrostbrc = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tbrc_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tbrc_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); 
    
    let et1 = 0, et2 = 0;
    if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_rubro[0].total))) et1 = equipo_total_equipo_herramienta_rubro[0].total;
    if(Number.isInteger(parseInt(equipo_total_personal_rubros[0].total))) et2 = equipo_total_personal_rubros[0].total;
    let total_equipo = parseInt(et1) + parseInt(et2);

    let etbr1 = 0, etbr2 = 0;
    if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_rubrotbr[0].total)))  etbr1 = equipo_total_equipo_herramienta_rubrotbr[0].total;
    if(Number.isInteger(parseInt(equipo_total_personal_rubrostbr[0].total)))  etbr2 = equipo_total_personal_rubrostbr[0].total;
    let  total_equipotbr = parseInt(etbr1) + parseInt(etbr2);

    let etbrc1 = 0, etbrc2 = 0;
    if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_rubrotbrc[0].total)))  etbrc1 = equipo_total_equipo_herramienta_rubrotbrc[0].total;
    if(Number.isInteger(parseInt(equipo_total_personal_rubrostbrc[0].total)))  etbrc1 = equipo_total_personal_rubrostbrc[0].total;
    let  total_equipotbrc = parseInt(etbrc1) + parseInt(etbrc2);

    /***datos basicos  */
    const facturacion = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const facturaciontbr = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const facturaciontbrc = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    
    const costos_totales = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tb_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);
    const costos_totalestbr = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tbr_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);
    const costos_totalestbrc = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tbrc_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);

    const imprevistos = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);
    const imprevistostbr = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tbr_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);
    const imprevistostbrc = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tbrc_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);

    const descuento = await pool.query(`SELECT descuento FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const descuentotbr = await pool.query(`SELECT descuento FROM tbr_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const descuentotbrc = await pool.query(`SELECT descuento FROM tbrc_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);

    const utilidad_bruta = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_brutatbr = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_brutatbrc = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

    const utilidad_neta = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_bruta[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_netatbr = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_brutatbr[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_netatbrc = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_brutatbrc[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

    const gasto_admin_10 = await pool.query(`SELECT SUM((precio * cantidad) * 0.1) total_fac_10 FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_10tbr = await pool.query(`SELECT SUM((precio * cantidad) * 0.1) total_fac_10 FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_10tbrc = await pool.query(`SELECT SUM((precio * cantidad) * 0.1) total_fac_10 FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

    const gasto_admin_20 = await pool.query(`SELECT SUM((precio * cantidad) * 0.2) total_fac_20 FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_20tbr = await pool.query(`SELECT SUM((precio * cantidad) * 0.2) total_fac_20 FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_20tbrc = await pool.query(`SELECT SUM((precio * cantidad) * 0.2) total_fac_20 FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    
    /**sub contratacion */
    const mov_total_vehiculos = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_equipo_herramienta = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);

    const mov_total_vehiculos_tbr = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_equipo_herramienta_tbr = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);

    const mov_total_vehiculostbrc = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_equipo_herramientatbrc = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);

    let sud1 = 0, sud2 = 0;
    if(Number.isInteger(parseInt(mov_total_vehiculos[0].total)))et1 =mov_total_vehiculos[0].total
    if(Number.isInteger(parseInt(equipo_total_equipo_herramienta[0].total)))et2 = equipo_total_equipo_herramienta[0].total
    const sub_contratacion =  parseInt(sud2) + parseInt(sud1);

    let sud11 = 0, sud22 = 0;
    if(Number.isInteger(parseInt(mov_total_vehiculos_tbr[0].total)))et1 =mov_total_vehiculos_tbr[0].total
    if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_tbr[0].total)))et2 = equipo_total_equipo_herramienta[0].total_equipotbr
    const sub_contratacion =  parseInt(sud22) + parseInt(sud21);
    
    let sudd1 = 0, sudd2 = 0;
    if(Number.isInteger(parseInt(mov_total_vehiculostbrc[0].total)))et1 =mov_total_vehiculostbrc[0].total
    if(Number.isInteger(parseInt(equipo_total_equipo_herramientatbrc[0].total)))et2 = equipo_total_equipo_herramientatbrc[0].total
    const sub_contratacion =  parseInt(sudd2) + parseInt(sudd1);
    
    


    res.json({
        total_mov :total_mov ,
        total_movtbr:total_movtbr ,
        total_movtbrc:total_movtbrc ,
        total_equipo:total_equipo,
        total_equipotbr:total_equipotbr,
        total_equipotbrc:total_equipotbrc,



        facturacion:facturacion,
        facturaciontbr:facturaciontbr,
        facturaciontbrc:facturaciontbrc,
        costos_totales:costos_totales,
        costos_totalestbr:costos_totalestbr,
        costos_totalestbrc :costos_totalestbrc,
        imprevistos:imprevistos, 
        imprevistostbr:imprevistostbr , 
        imprevistostbrc:imprevistostbrc, 
        descuento:descuento,
        descuentotbr:descuentotbr,
        descuentotbrc:descuentotbrc,
        utilidad_bruta:utilidad_bruta,
        utilidad_brutatbr:utilidad_brutatbr ,
        utilidad_brutatbrc:utilidad_brutatbrc ,
        utilidad_neta :utilidad_neta ,
        utilidad_netatbr,utilidad_netatbr , 
        utilidad_netatbrc :utilidad_netatbrc,
        gasto_admin_10:gasto_admin_10,
        gasto_admin_10tbr:gasto_admin_10tbr  , gasto_admin_10tbrc:gasto_admin_10tbrc 

     gasto_admin_20  gasto_admin_20tbr  gasto_admin_20tbrc 


    })
});
/*
//estasssss 4 son para movilizacion
const mov_total_vehiculos_rubros = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tb_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tb_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
const mov_total_vehiculos = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);
const mov_total_personal_rubro = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tb_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
const mov_total_personal = await pool.query(`	SELECT SUM((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *(((DATEDIFF(fecha_final_mov , fecha_inicio_mov) +  DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)) )) + p.bono_no_salarial_personal) AS total  FROM tb_mov_item_personal ie, tb_personal p  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}'`);

//estas son las 4 de equipo
const equipo_total_personal = await pool.query(` SELECT SUM(((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' ) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal ) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  )AS total FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`);
const equipo_total_equipo_herramienta = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);
const equipo_total_equipo_herramienta_rubro = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); */

module.exports = router;