const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/hojas-trabajo', isLoggedIn, async(req, res) => {    
    const hojasTrabajo = await pool.query("SELECT tht.id_servicio id, tp.titulo FROM tb_hojas_trabajo tht INNER JOIN tb_planeacion tp ON tht.id_servicio = tp.id_planeacion GROUP BY tht.id_servicio");
    const planeacion = await pool.query("SELECT * FROM tb_planeacion WHERE estado = ?", ['Ejecucion']);
    res.render('hojas-trabajo/hojas-trabajo', {
        hojasTrabajo: hojasTrabajo,
        planeacion: planeacion
    });
});

router.get('/hojas-trabajo/ver', isLoggedIn, async(req, res) => {
    const { hoja } = req.query;
    const bombeoHora = await pool.query("SELECT * FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo = ? ORDER BY thtd.hora1", [hoja]);
    const bombeo = await pool.query("SELECT SUM(IF(thtd.tipo = 'acido', thtd.volumen, 0)) acido, SUM(IF(thtd.tipo = 'no acido', thtd.volumen, 0)) noacido, SUM(IF(thtd.tipo = 'N2', thtd.volumen, 0)) n2 FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo= ? ORDER BY thtd.hora1", [hoja]);
    const profundidad = await pool.query("SELECT SUM(thtd.desde - thtd.hasta) profPos FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo= ? ORDER BY thtd.hora1", [hoja])
    const hojaDetalle = await pool.query("SELECT * FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo = ?", [hoja]);
    res.render('hojas-trabajo/hojas-trabajo-ver', {
        hoja: hoja,
        hojaDetalle: hojaDetalle,
        bombeoHora: bombeoHora,
        bombeo: bombeo[0],
        profundidad: profundidad[0]
    });
});

router.get('/hojas-trabajo/ver1', isLoggedIn, async(req, res) => {
    const { hoja } = req.query;
    const fecha = await pool.query("SELECT fecha FROM tb_hojas_trabajo tht WHERE tht.id = ?", [hoja]);
    const personal = await pool.query("SELECT tp.id, tp.nombre_personal, tp.apellido_personal, tht.fecha FROM tb_hojas_trabajo tht INNER JOIN tb_equipo_item_personal teip ON tht.id_servicio = teip.id_planeacion INNER JOIN tb_personal tp ON teip.id_personal = tp.id WHERE tht.id=? AND (SELECT COUNT(*) FROM tb_hojas_trabajo_personal_turno thtpt WHERE thtpt.id_personal = tp.id) = 0", [hoja]);
    const equipo = await pool.query("SELECT te.id_equipo, te.nombre_equipo, te.placa_equipo FROM tb_hojas_trabajo tht INNER JOIN tb_equipo_item_equipo_herramienta teieh ON tht.id_servicio = teieh.id_planeacion INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo WHERE tht.id = ?", [hoja]);
    const diurno = await pool.query("SELECT tp.nombre_personal, tp.apellido_personal, tc.nombre_cargo, thtpt.entrada, thtpt.salida, thtpt.id FROM tb_hojas_trabajo_personal_turno thtpt INNER JOIN tb_personal tp ON thtpt.id_personal = tp.id INNER JOIN tb_cargos tc On tp.id_cargo = tc.id_cargo WHERE thtpt.id_hojas_trabajo_detalle = ? AND thtpt.jornada = ?", [hoja, 'diurno']);
    const nocturno = await pool.query("SELECT tp.nombre_personal, tp.apellido_personal, tc.nombre_cargo, thtpt.entrada, thtpt.salida, thtpt.id FROM tb_hojas_trabajo_personal_turno thtpt INNER JOIN tb_personal tp ON thtpt.id_personal = tp.id INNER JOIN tb_cargos tc On tp.id_cargo = tc.id_cargo WHERE thtpt.id_hojas_trabajo_detalle = ? AND thtpt.jornada = ?", [hoja, 'nocturno']);
    res.render('hojas-trabajo/hojas-trabajo-ver1',{
        personal: personal,
        hoja: hoja,
        equipo: equipo,
        fecha: fecha[0].fecha,
        diurno: diurno,
        nocturno: nocturno
    });
});

router.post('/hojas-trabajo/guardar-personal-hora', isLoggedIn, async(req, res) => {
    const { personal, hoja, fecha, tipo } = req.body;
    console.log(personal, hoja, fecha, tipo);
    if(tipo == 1) await pool.query("INSERT INTO guacamaya.tb_hojas_trabajo_personal_turno (id_personal, entrada, salida, jornada, id_hojas_trabajo_detalle) VALUES(?,?,?,?,?)", [personal, fecha+" 06:00:00", fecha+" 18:00:00", 'diurno', hoja]);
    if(tipo == 2) await pool.query("INSERT INTO guacamaya.tb_hojas_trabajo_personal_turno (id_personal, entrada, salida, jornada, id_hojas_trabajo_detalle) VALUES(?,?,?,?,?)", [personal, fecha+" 18:00:00", fecha+" 06:00:00", 'nocturno', hoja]);    
    res.json({ resp: "ok"});
});

router.post('/hojas-trabajo/eliminar-personal-hora', isLoggedIn, async(req, res) => {
    const { id } = req.body;
    await pool.query("DELETE FROM tb_hojas_trabajo_personal_turno WHERE id = ?", [id]);
    res.json({ resp: "ok"});
});

router.post('/hojas-trabajo/guardar-detalle', isLoggedIn, async(req, res) => {
    const { hoja, hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des, volumen, comentario } = req.body;
    await pool.query("INSERT INTO tb_hojas_trabajo_detalle (hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des_tipo_fluido, volumen, comentarios, id_hojas_trabajo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des, volumen, comentario, hoja]);
    res.redirect("/hojas-trabajo/ver?hoja="+hoja);
});

router

/***API*******************************************************/
router.post('/hojas-trabajo/eliminar-detalle', isLoggedIn, async(req, res) => {
    const { id } = req.body;
    await pool.query("DELETE FROM tb_hojas_trabajo_detalle WHERE id = ?", [id]);
    res.json({ resp: "ok"});
});

router.post('/hojas-trabajo', isLoggedIn, async(req, res) => {
    const { servicio } = req.body;
    const hojaTrabajo = await pool.query("SELECT tpl.titulo, tht.fecha, tpo.nombre_pozo, te.nombre_equipo, te.placa_equipo, tht.tuberia, tht.id FROM tb_hojas_trabajo tht INNER JOIN tb_planeacion tpl ON tht.id_servicio = tpl.id_planeacion INNER JOIN tb_equipo_item_equipo_herramienta teieh ON tht.id_equipo = teieh.id_equipo_item_equipo_herramienta INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo INNER JOIN tb_pozos_planeacion tpp ON tht.id_pozo = tpp.id_pozo_planeacion INNER JOIN tb_pozos tpo ON tpp.id_pozo = tpo.id_pozo WHERE tht.id_servicio = ?", [servicio]);
    res.json({
        hojaTrabajo: hojaTrabajo
    });
});

router.post('/hojas-trabajo/servicio', isLoggedIn, async(req, res) => {
    const { servicio } = req.body;
    const equipo = await pool.query("SELECT teieh.id_equipo_item_equipo_herramienta id, te.nombre_equipo, te.placa_equipo FROM tb_equipo_item_equipo_herramienta teieh INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo WHERE teieh.id_planeacion = ?", [servicio]);
    const pozo = await pool.query("SELECT tpp.id_pozo_planeacion id, tp.nombre_pozo FROM tb_pozos_planeacion tpp INNER JOIN tb_pozos tp ON tpp.id_pozo = tp.id_pozo WHERE tpp.id_planeacion=?", [servicio]);

    res.json({ equipo: equipo, pozo: pozo });
});

router.post('/hojas-trabajo/guardar', isLoggedIn, async(req, res) => {
    const { servicio, equipo, pozo, fecha, tuberia } = req.body;
    await pool.query("INSERT INTO tb_hojas_trabajo (id_servicio, id_pozo, id_equipo, fecha, tuberia) VALUES(?,?,?,?,?)", [servicio, pozo, equipo, fecha, tuberia]);
    res.json({ resp: "ok"});
});

router.post('/hojas-trabajo/eliminar', isLoggedIn, async(req, res) => {
    const { id } = req.body;
    await pool.query("DELETE FROM tb_hojas_trabajo WHERE id=?", [id]);
    res.json({ resp: "ok"});
});
/*************************************************************/

module.exports = router;
