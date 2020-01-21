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
    const ticket = await pool.query("INSERT INTO guacamaya.tb_ticket (id_servicio, equipo, descripcion) VALUES(?, ?, ?)", [servicio, equipo, descrip]);
    const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion, ie.id_moneda, ie.id_cotizacion_costo, ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${servicio}'`);
    costos_cotizacion.forEach(async element => {
        await pool.query("INSERT INTO guacamaya.tb_ticket_copia_gatos_planeacion (descripcion, cant, und, valor, id_moneda, total, id_ticket, tipo) VALUES(?,?,?,?,?,?,?,?)", [element.descripcion, element.cantidad, element.abreviatura_unidad_medida, element.precio, element.id_moneda, element.total, ticket.insertId, element.tipo]);
    });
    res.json({resp: "ok"});
});

router.get("/ticket/ver", isLoggedIn, async (req, res) => {
    const {ticket} = req.query;
    const monedas = await pool.query("SELECT tm.abreviatura_moneda, tm.id_moneda FROM  tb_monedas tm");
    const tickets = await pool.query("SELECT tt.descuento FROM tb_ticket tt WHERE tt.id  = ?", [ticket]);
    const costos_cotizacion = await pool.query(`SELECT * FROM tb_ticket_copia_gatos_planeacion ttcgp, tb_monedas tm WHERE ttcgp.id_moneda = tm.id_moneda AND ttcgp.id_ticket = ?`, [ticket]);
    let subCop = 0, subUsd = 0, totCop = 0, totUsd = 0;
    costos_cotizacion.forEach(element => {
        if(element.id_moneda == 1) subUsd += element.total;
        if(element.id_moneda == 2) subCop += element.total;
    });

    if(tickets[0].descuento > 0){
        totUsd = subUsd - ((subUsd * tickets[0].descuento) / 100);
        totCop = subCop - ((subCop * tickets[0].descuento) / 100);
    }else{
        totUsd = subUsd;
        totCop = subCop;
    }
    res.render('generacion-ticket/generacion-ticket-ver', {
        costos_cotizacion: costos_cotizacion,
        descuento: tickets[0].descuento,
        subCop: subCop, subUsd: subUsd,
        totCop: totCop, totUsd: totUsd,
        monedas: monedas, ticket: ticket
    });
});

router.post("/ticket/save/descuento", isLoggedIn, async (req, res)=>{
    const {ticket, descuento} = req.body;

    await pool.query("UPDATE tb_ticket SET descuento = ? WHERE id  = ?", [descuento, ticket]);
    res.json({resp: "ok"});
});

router.post("/ticket/save/item", isLoggedIn, async (req, res)=>{
    const { descripcion, cant, und, valor, id_moneda, total, id_ticket, tipo } = req.body;
    await pool.query("INSERT INTO guacamaya.tb_ticket_copia_gatos_planeacion (descripcion, cant, und, valor, id_moneda, total, id_ticket, tipo) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [descripcion, cant, und, valor, id_moneda, total, id_ticket, tipo]);
    res.json({resp: "ok"});
});

router.post("/ticket/get/items", isLoggedIn, async (req, res) => {
    const {item} = req.body;

    const dataItem = await pool.query("SELECT * FROM tb_ticket_copia_gatos_planeacion ttcgp WHERE  ttcgp.id  = ?", [item]);

    if(dataItem.length > 0) res.json({ item: dataItem });
    else res.json({resp: "No se encontraron datos"});
});

module.exports = router;
