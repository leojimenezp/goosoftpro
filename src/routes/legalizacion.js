const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/legalizacion', isLoggedIn, async (req, res) => {
    const consulta = await pool.query('SELECT count(IF(estado = "aprobado", 1, null)) aprobado, count(IF(estado = "no aprobado", 1, null)) no_aprobado, count(IF(estado = "rechazado", 1, null)) rechazado FROM tb_consignacion;');
    console.log(consulta);
    res.render('legalizacion/legalizacion',{
        consulta: consulta[0]
    });
});

router.get('/legalizacion/personal', isLoggedIn, async (req, res) => {
    const consulta = await pool.query("SELECT * FROM guacamaya.tb_personal");
    res.render('legalizacion/personal-legalizacion',{
        consulta: consulta,
        personal: true,
        consignacion: false,
        detalleConsignacion: false
    });
});

router.get('/legalizacion/consignacion', isLoggedIn, async (req, res) => {
    const { id_personal } = req.query;
    const consulta = await pool.query("SELECT * FROM tb_consignacion WHERE id_personal = ?", [id_personal]);
    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        personal: false,
        consignacion: true,
        detalleConsignacion: false
    });
});

router.get('/legalizacion/detalle_consignacion', isLoggedIn, async (req, res) => {
    const { id_consignacion } = req.query;

    const consulta = await pool.query("SELECT c.estado cEstado, i.id_item idItem, i.descripcion_item descripcionItem, cd.cantidad cdCantidad, cd.valor_unitario cdValorUnitario, cd.costo_total_item cdCostoTotal, l.cantidad lCantidad, l.valor_unitario lValorUnitario FROM tb_consignacion c INNER JOIN tb_consignacion_detalles cd ON c.id_consignacion = cd.id_consignacion INNER JOIN tb_legalizacion l ON l.id_consignacion_detalle = cd.id INNER JOIN tb_item i ON cd.id_item = i.id_item WHERE c.id_consignacion = ? ORDER BY i.id_item", [id_consignacion]);
    const consulta1 = await pool.query("SELECT * FROM guacamaya.tb_consignacion c LEFT JOIN tb_personal p ON c.id_personal = p.id WHERE id_consignacion = ?", [id_consignacion]);

    res.render('legalizacion/personal-legalizacion',{
        id_consignacion: id_consignacion,
        consulta: consulta,
        consulta1: consulta1[0],
        personal: false,
        consignacion: false,
        detalleConsignacion: true
    });
});

router.get('/legalizacion/agregar_detalle_consignacion', isLoggedIn, async (req, res) => {
    const { id_consignacion } = req.query;

    const consulta = await pool.query("SELECT i.id_item idItem, i.descripcion_item descripcionItem, cd.cantidad cdCantidad, cd.valor_unitario cdValorUnitario, cd.costo_total_item cdCostoTotal, l.cantidad lCantidad, l.valor_unitario lValorUnitario FROM tb_consignacion_detalles cd INNER JOIN tb_legalizacion l ON l.id_consignacion_detalle = cd.id INNER JOIN tb_item i ON cd.id_item = i.id_item WHERE id_consignacion = ? ORDER BY i.id_item", [id_consignacion]);
    const consulta1 = await pool.query("SELECT * FROM guacamaya.tb_consignacion c LEFT JOIN tb_personal p ON c.id_personal = p.id WHERE id_consignacion = ?", [id_consignacion]);

    res.render('legalizacion/agregar-legalizacion',{
        id_consignacion: id_consignacion,
        consulta: consulta,
        consulta1: consulta1[0],
        consignacion: false,
        detalleConsignacion: true
    });
});

router.get('/legalizacion/agregar', isLoggedIn, async (req, res) => {
    const consulta = await pool.query("SELECT c.id_consignacion, c.fecha, c.descripcion, c.observaciones, c.estado, p.nombre_personal, p.apellido_personal, pl.titulo FROM tb_consignacion c LEFT JOIN tb_personal p ON p.id = c.id_personal LEFT JOIN tb_planeacion pl ON pl.id_planeacion = c.id_planeacion");
    res.render('legalizacion/agregar-legalizacion', {
        consulta: consulta,
        consignacion: true,
        detalleConsignacion: false
    });
});

router.post('/legalizacion/legalizar', isLoggedIn, async (req, res) => {
    const { id_consignacion, vTotal } = req.body;
    const consulta = await pool.query("SELECT id_item idItem, id FROM tb_consignacion_detalles WHERE id_consignacion = ? ORDER BY id_item", [id_consignacion]);
    consulta.forEach(async element => {
        await pool.query('UPDATE tb_legalizacion SET cantidad = ?, valor_unitario = ? WHERE id_consignacion_detalle = ?', [ req.body[`lCantdad-${element.idItem}`], req.body[`lCostoUnitario-${element.idItem}`], element.id ]);
    });
    res.redirect("/legalizacion/agregar");
});

router.post('/legalizacion/tabla', isLoggedIn, async (req, res) => {
    const { id_consignacion } = req.body;
    if(id_consignacion){
        const consulta = await pool.query("SELECT id_item idItem FROM tb_consignacion_detalles WHERE id_consignacion = ? ORDER BY id_item", [id_consignacion]);
        res.json({resp: consulta});
    }
    else res.json({resp: []});
});
module.exports = router;