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

    const costo_cotizacion = await pool.query(` SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida,ie.precio, m.abreviatura_moneda, SUM(IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad))) AS total
        FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t 
        WHERE ie.id_unidad_medida = u.id_unidad_medida 
        AND ie.id_cotizacion = t.id_cotizacion 
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion = '${id_planeacion}' GROUP BY ie.tipo ORDER BY ie.tipo  `);
    const costo_cotizaciontbr = await pool.query(` SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida,ie.precio, m.abreviatura_moneda, SUM(IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad))) AS total
        FROM tbr_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t 
        WHERE ie.id_unidad_medida = u.id_unidad_medida 
        AND ie.id_cotizacion = t.id_cotizacion 
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion = '${id_planeacion}' GROUP BY ie.tipo ORDER BY ie.tipo  `);

    const costo_cotizaciontbrc = await pool.query(` SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida,ie.precio, m.abreviatura_moneda, SUM(IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad))) AS total
        FROM tbrc_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t 
        WHERE ie.id_unidad_medida = u.id_unidad_medida 
        AND ie.id_cotizacion = t.id_cotizacion 
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion = '${id_planeacion}' GROUP BY ie.tipo ORDER BY ie.tipo  `);


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
    
  
    


    res.json({
     

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
        gasto_admin_10tbr:gasto_admin_10tbr  ,
        gasto_admin_10tbrc:gasto_admin_10tbrc,
        gasto_admin_20 :gasto_admin_20, 
        gasto_admin_20tbr:gasto_admin_20tbr ,
        gasto_admin_20tbrc:gasto_admin_20tbrc ,

        costo_cotizacion:costo_cotizacion ,
        costo_cotizaciontbr:costo_cotizaciontbr,
        costo_cotizaciontbrc:costo_cotizaciontbrc

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