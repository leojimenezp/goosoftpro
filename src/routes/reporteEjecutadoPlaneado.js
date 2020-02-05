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
    

    const ejecutado = await pool.query(`SELECT ttcgp.tipo ,SUM(
        IF( ttcgp.id_moneda = '1', ttcgp.total * tp.trm ,(ttcgp.cant * ttcgp.valor))
        ) AS total FROM tb_ticket tt, tb_ticket_copia_gatos_planeacion ttcgp, tb_monedas tm ,tb_planeacion tp
        WHERE tt.id_servicio = '${id_planeacion}'
        AND tt.id = ttcgp.id_ticket
        AND ttcgp.id_moneda = tm.id_moneda 
        AND tt.id_servicio = tp.id_planeacion GROUP BY tipo ORDER BY tipo`);

    
    const costo_cotizaciontbr = await pool.query(` SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida,ie.precio, m.abreviatura_moneda,  SUM(precio * cantidad) AS total
        FROM tbr_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t 
        WHERE ie.id_unidad_medida = u.id_unidad_medida 
        AND ie.id_cotizacion = t.id_cotizacion 
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion = '${id_planeacion}' GROUP BY ie.tipo ORDER BY ie.tipo  `);

    const costo_cotizaciontbrc = await pool.query(` SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida,ie.precio, m.abreviatura_moneda, SUM(precio * cantidad) AS total
        FROM tbrc_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t 
        WHERE ie.id_unidad_medida = u.id_unidad_medida 
        AND ie.id_cotizacion = t.id_cotizacion 
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion = '${id_planeacion}' GROUP BY ie.tipo ORDER BY ie.tipo  `);


        /**grafias de detalles */
        const facturaciontbr = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
        const facturaciontbrc = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
        
        const costos_totalestbr = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tbr_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);
        const costos_totalestbrc = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tbrc_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);

        const imprevistostbr = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tbr_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);
        const imprevistostbrc = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tbrc_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);

    
        const utilidad_brutatbr = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
        const utilidad_brutatbrc = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

        const utilidad_netatbr = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_brutatbr[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tbr_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
        const utilidad_netatbrc = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_brutatbrc[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tbrc_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

        const equipo_total_personal_rubrostbr = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tbr_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tbr_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); 
        const equipo_total_equipo_herramienta_rubrotbr = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tbr_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tbr_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
        
        const mov_total_vehiculos_rubrostbr = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tbr_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tbr_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
        const mov_total_personal_rubrotbr = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tbr_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tbr_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`)
        

        const mov_total_vehiculos_rubrostbrc = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tbrc_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tbrc_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
        const mov_total_personal_rubrotbrc = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tbrc_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tbrc_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
       
        const equipo_total_personal_rubrostbrc = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tbrc_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tbrc_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); 
        const equipo_total_equipo_herramienta_rubrotbrc = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tbrc_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tbrc_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
        
        let et1 = 0, et2 = 0;
        let t1 = 0, t2 = 0;
        if(Number.isInteger(parseInt(mov_total_personal_rubrotbr[0].total)))et1 =mov_total_personal_rubrotbr[0].total
        if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_rubrotbr[0].total)))et2 = equipo_total_equipo_herramienta_rubrotbr[0].total
        if(Number.isInteger(parseInt(mov_total_personal_rubrotbrc[0].total)))t1 =mov_total_personal_rubrotbrc[0].total
        if(Number.isInteger(parseInt(equipo_total_equipo_herramienta_rubrotbrc[0].total)))t2 = equipo_total_equipo_herramienta_rubrotbrc[0].total
       
      

        
        let subcontratotbr = [
            {
                suma: parseInt(et1) + parseInt(et2)
            }
        ];
        let subcontratotbrc = [
            {
                suma: parseInt(t1) + parseInt(t2)
            }
        ];

        if(mov_total_personal_rubrotbrc && equipo_total_personal_rubrostbrc){
            if(mov_total_personal_rubrotbrc[0].total != null) v1 = mov_total_personal_rubrotbrc[0].total;
            if(equipo_total_personal_rubrostbrc[0].total != null) v2 = equipo_total_personal_rubrostbrc[0].total;
        }

        function arrVal(arr, val){
            if(arr){
                if(val != null) return val;
                else return 0;
            }
        }
    res.json({
     

    
        facturaciontbr:facturaciontbr,
        facturaciontbrc:facturaciontbrc,

        costos_totalestbr:costos_totalestbr,
        costos_totalestbrc :costos_totalestbrc,


        imprevistostbr:imprevistostbr , 
        imprevistostbrc:imprevistostbrc, 
       
  
        utilidad_brutatbr:utilidad_brutatbr ,
        utilidad_brutatbrc:utilidad_brutatbrc ,


        utilidad_netatbr,utilidad_netatbr , 
        utilidad_netatbrc :utilidad_netatbrc,

        subcontratotbr:subcontratotbr,
        subcontratotbrc:subcontratotbrc,

        ejecutado:ejecutado,

        costo_cotizaciontbr:costo_cotizaciontbr ,
        costo_cotizaciontbrc:costo_cotizaciontbrc ,

        proequipotbr:equipo_total_equipo_herramienta_rubrotbrc[0].total ,
        proequipotbrc:equipo_total_equipo_herramienta_rubrotbrc[0].total,

        propersonaltbr:mov_total_personal_rubrotbr[0].total + equipo_total_personal_rubrostbr[0].total,
        propersonaltbrc: arrVal(mov_total_personal_rubrotbrc, mov_total_personal_rubrotbrc[0].total) + arrVal(equipo_total_personal_rubrostbrc, equipo_total_personal_rubrostbrc[0].total),

        promvilizaciontbr: arrVal(mov_total_vehiculos_rubrostbr, mov_total_vehiculos_rubrostbr[0].total),
        promvilizaciontbrc: arrVal(mov_total_vehiculos_rubrostbrc, mov_total_vehiculos_rubrostbrc[0].total),
        
        prootrostbr :0,
        prootrostbrc : 0,


       
    })
});
/*
//estasssss 4 son para movilizacion
const mov_total_vehiculos_rubros = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tb_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tb_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
const mov_total_personal_rubro = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tb_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);

//estas son las 4 de equipo
const equipo_total_equipo_herramienta_rubro = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); */

module.exports = router;