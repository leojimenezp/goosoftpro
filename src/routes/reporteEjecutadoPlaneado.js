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
<<<<<<< HEAD
/* 
 estasssss 4 son para movilizacion 
=======

/*
//estasssss 4 son para movilizacion
>>>>>>> 0f1e922afbb55ac9ab728baa7bcfe77fb152b436
const mov_total_vehiculos_rubros = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tb_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tb_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
const mov_total_vehiculos = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);
const mov_total_personal_rubro = await pool.query(` SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov)) *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) +  ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *( ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)))) + (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total FROM tb_mov_rubros_personal mrr  WHERE mrr.id_planeacion = ie.id_planeacion)) AS total  FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}' AND mr.id_planeacion = ie.id_planeacion`);
const mov_total_personal = await pool.query(`	SELECT SUM((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *(((DATEDIFF(fecha_final_mov , fecha_inicio_mov) +  DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)) )) + p.bono_no_salarial_personal) AS total  FROM tb_mov_item_personal ie, tb_personal p  WHERE ie.id_personal = p.id  AND ie.id_planeacion = '${id_planeacion}'`);

<<<<<<< HEAD
   estas son las 4 de equipo  
=======
//estas son las 4 de equipo
>>>>>>> 0f1e922afbb55ac9ab728baa7bcfe77fb152b436

const equipo_total_personal = await pool.query(` SELECT SUM(((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' ) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal ) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  )AS total FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`);
const equipo_total_equipo_herramienta = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);
const equipo_total_equipo_herramienta_rubro = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
<<<<<<< HEAD
const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`);
    */
=======
const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`); */
>>>>>>> 0f1e922afbb55ac9ab728baa7bcfe77fb152b436

module.exports = router;