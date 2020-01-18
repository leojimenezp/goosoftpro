const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/ticket', isLoggedIn, async (req, res) => {
    const ticket = await pool.query("SELECT * FROM tb_ticket tt INNER JOIN tb_planeacion tp ON tt.id_servicio = tp.id_planeacion");
    const planeacion = await pool.query("SELECT * FROM tb_planeacion tp");
    res.render('generacion-ticket/generacion-ticket', {
        ticket: ticket,
        planeacion: planeacion
    });
});

router.post("/ticket", isLoggedIn, async (req, res) => {
    const {ticket} = req.body;
    let tickets;
    if(ticket > 0)
        tickets = await pool.query("SELECT tt.id, tpl.titulo, tpl.fecha_estimada, tt.fecha FROM tb_ticket tt INNER JOIN tb_planeacion tpl ON tt.id_servicio = tpl.id_planeacion WHERE tt.id_servicio = ?", [servicio]);
    else
        tickets = await pool.query("SELECT tt.id, tpl.titulo, tpl.fecha_estimada, tt.fecha FROM tb_ticket tt INNER JOIN tb_planeacion tpl ON tt.id_servicio = tpl.id_planeacion");
    
    res.json({tickets: tickets});
});

router.post("/ticket/guardar", isLoggedIn, async (req, res) => {
    const {servicio, equipo, descrip} = req.body;
    await pool.query("INSERT INTO guacamaya.tb_ticket (id_servicio, equipo, descripcion) VALUES(?, ?, ?)", [servicio, equipo, descrip]);
    res.json({resp: "ok"});
});

router.get("/ticket/ver", isLoggedIn, async (req, res) => {
    const {ticket} = req.query;
    const tickets = await pool.query("SELECT * FROM tb_ticket tt WHERE tt.id = ?", [ticket]);
    const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${tickets[0].id_servicio}'`);
    res.render('generacion-ticket/generacion-ticket-ver', {
        costos_cotizacion: costos_cotizacion
    });
});

module.exports = router;
