const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/legalizacion', isLoggedIn, async (req, res) => {
    const consulta = await pool.query('SELECT count(IF(estado = "confirmado", 1, null)) aprobado, count(IF(estado = "no aprobado", 1, null)) no_aprobado, count(IF(estado = "rechazado", 1, null)) rechazado FROM tb_consignacion');
    const consulta1 = await pool.query('SELECT count(IF(estado_legalizado = 1, 1, null)) legalizado, count(IF(estado_legalizado = 0, 1, null)) no_legalizado FROM tb_consignacion WHERE estado = "confirmado"');
    const consulta2 = await pool.query("SELECT MONTH(tc.fecha) idOrder, SUM(tc.costo_legalizacion) personal, SUM(tc.costo_cotizacion) empresa FROM tb_consignacion tc WHERE estado = 'confirmado' GROUP BY idOrder");
    const consulta3 = await pool.query("SELECT * FROM tb_planeacion");

    res.render('legalizacion/legalizacion', {
        consulta: consulta[0],
        consulta1: consulta1[0],
        consulta2: JSON.stringify(consulta2),
        consulta3: consulta3,
        _planeacionSelect: "0",
        _fInicioTxt: "0000-00-00",
        _fFinTxt: "0000-00-00"
    });
});

router.post('/legalizacion', isLoggedIn, async (req, res) => {
    const { planeacionSelect, fInicioTxt, fFinTxt } = req.body;
    let sqlFaltante = "";

    if (planeacionSelect > 0) sqlFaltante = `WHERE estado = 'confirmado' AND id_planeacion = ${planeacionSelect}`;
    if (fInicioTxt != undefined && fFinTxt != undefined) sqlFaltante = `WHERE WHERE estado = 'confirmado' fecha BETWEEN "${fInicioTxt}" AND "${fFinTxt}"`;

    const consulta = await pool.query(`SELECT count(IF(estado = "confirmado", 1, null)) aprobado, count(IF(estado = "no aprobado", 1, null)) no_aprobado, count(IF(estado = "rechazado", 1, null)) rechazado FROM tb_consignacion ${sqlFaltante}`);
    const consulta1 = await pool.query(`SELECT count(IF(estado_legalizado = 1, 1, null)) legalizado, count(IF(estado_legalizado = 0, 1, null)) no_legalizado FROM tb_consignacion  ${sqlFaltante}`);
    const consulta2 = await pool.query(`SELECT MONTH(tc.fecha) idOrder, SUM(tc.costo_legalizacion) personal, SUM(tc.costo_cotizacion) empresa FROM tb_consignacion tc ${sqlFaltante} GROUP BY idOrder`);
    const consulta3 = await pool.query(`SELECT * FROM tb_planeacion`);

    res.render('legalizacion/legalizacion', {
        consulta: consulta[0],
        consulta1: consulta1[0],
        consulta2: JSON.stringify(consulta2),
        consulta3: consulta3,
        _planeacionSelect: planeacionSelect,
        _fInicioTxt: fInicioTxt,
        _fFinTxt: fFinTxt
    });
});

router.get('/legalizacion/personal', isLoggedIn, async (req, res) => {
    const consulta = await pool.query(`SELECT DISTINCT tp.*, "0" planeacion, "0000-00-00" finicio, "0000-00-00" ffin, ( SELECT SUM(tc.sobrante_legalizacion) FROM tb_consignacion tc WHERE tp.id = tc.id_personal AND tc.estado = "confirmado" ) sobrante_legalizacion, ( SELECT SUM(tc.costo_cotizacion) FROM tb_consignacion tc WHERE tp.id = tc.id_personal AND tc.estado = "confirmado" ) costo_cotizacion, ( SELECT SUM(tc.costo_legalizacion) FROM tb_consignacion tc WHERE tp.id = tc.id_personal AND tc.estado = "confirmado" ) costo_legalizacion FROM tb_personal tp LEFT JOIN tb_mov_item_personal tmip ON tp.id = tmip.id_personal LEFT JOIN tb_equipo_item_personal teip ON tp.id = teip.id_personal`);
    const consulta3 = await pool.query(`SELECT * FROM tb_planeacion`);
    if (consulta[0] != undefined) {
        consulta.forEach(element => {
            element.costo_cotizacion = Intl.NumberFormat().format(element.costo_cotizacion), element.costo_legalizacion = Intl.NumberFormat().format(element.costo_legalizacion), element.sobrante_legalizacion = Intl.NumberFormat().format(element.sobrante_legalizacion);
        });
    }

    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        consulta3: consulta3,
        personal: true,
        consignacion: false,
        detalleConsignacion: false,
        title: "Personal",
        _planeacionSelect: "0",
        _fInicioTxt: "0000-00-00",
        _fFinTxt: "0000-00-00"
    });
});

router.post('/legalizacion/personal', isLoggedIn, async (req, res) => {
    const { planeacionSelect, fInicioTxt, fFinTxt } = req.body;
    let sqlFaltante = `WHERE tp.id = tc.id_personal AND tc.estado = "confirmado"`;
    let sqlFaltante1 = "";

    if (planeacionSelect > 0) {
        sqlFaltante += ` AND tc.id_planeacion = ${planeacionSelect}`;
        sqlFaltante1 = `WHERE tmip.id_planeacion = ${planeacionSelect} OR teip.id_planeacion = ${planeacionSelect}`;
    }
    if (fInicioTxt != undefined && fFinTxt != undefined) sqlFaltante += ` AND tc.fecha BETWEEN "${fInicioTxt}" AND "${fFinTxt}"`;

    const consulta = await pool.query(`SELECT DISTINCT tp.*, "${planeacionSelect}" planeacion, "${fInicioTxt}" finicio, "${fFinTxt}" ffin, ( SELECT SUM(tc.sobrante_legalizacion) FROM tb_consignacion tc ${sqlFaltante} ) sobrante_legalizacion, ( SELECT SUM(tc.costo_cotizacion) FROM tb_consignacion tc ${sqlFaltante} ) costo_cotizacion, ( SELECT SUM(tc.costo_legalizacion) FROM tb_consignacion tc ${sqlFaltante} ) costo_legalizacion FROM tb_personal tp LEFT JOIN tb_mov_item_personal tmip ON tp.id = tmip.id_personal LEFT JOIN tb_equipo_item_personal teip ON tp.id = teip.id_personal ${sqlFaltante1}`);
    const consulta3 = await pool.query(`SELECT * FROM tb_planeacion`);

    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        consulta3: consulta3,
        personal: true,
        consignacion: false,
        detalleConsignacion: false,
        title: "Personal",
        _planeacionSelect: planeacionSelect,
        _fInicioTxt: fInicioTxt,
        _fFinTxt: fFinTxt
    });
});

router.get('/legalizacion/consignacion', isLoggedIn, async (req, res) => {
    const { planeacionSelect, fInicioTxt, fFinTxt, id_personal } = req.query;

    if (planeacionSelect > 0) {
        const consulta = await pool.query("SELECT *, '0' grafica FROM tb_consignacion WHERE id_personal = ? AND id_planeacion = ? AND estado = ?", [id_personal, planeacionSelect, "confirmado"]);
        const consulta1 = await pool.query("SELECT MONTH(tc.fecha) idOrder, SUM(tc.costo_legalizacion) personal, SUM(tc.costo_cotizacion) empresa FROM tb_consignacion tc WHERE id_personal = ? AND id_planeacion = ? AND estado = ? GROUP BY idOrder", [id_personal, planeacionSelect, "confirmado"]);
        res.render('legalizacion/personal-legalizacion', {
            consulta: consulta,
            consulta1: JSON.stringify(consulta1),
            personal: false,
            consignacion: true,
            detalleConsignacion: false,
            title: "Personal"
        });
    } else if (fInicioTxt != undefined && fInicioTxt != "0000-00-00" && fFinTxt != undefined && fFinTxt != "0000-00-00") {
        const consulta = await pool.query("SELECT *, '0' grafica FROM tb_consignacion WHERE id_personal = ? AND estado = ? AND fecha BETWEEN ? AND ?", [id_personal, "confirmado", fInicioTxt, fFinTxt]);
        const consulta1 = await pool.query("SELECT MONTH(tc.fecha) idOrder, SUM(tc.costo_legalizacion) personal, SUM(tc.costo_cotizacion) empresa FROM tb_consignacion tc WHERE id_personal = ? AND estado = ? AND fecha BETWEEN ? AND ? GROUP BY idOrder", [id_personal, "confirmado", fInicioTxt, fFinTxt]);
        res.render('legalizacion/personal-legalizacion', {
            consulta: consulta,
            consulta1: JSON.stringify(consulta1),
            personal: false,
            consignacion: true,
            detalleConsignacion: false,
            title: "Personal"
        });
    } else {
        const consulta = await pool.query("SELECT *, '0' grafica FROM tb_consignacion WHERE id_personal = ? AND estado = ?", [id_personal, "confirmado"]);
        const consulta1 = await pool.query("SELECT MONTH(tc.fecha) idOrder, SUM(tc.costo_legalizacion) personal, SUM(tc.costo_cotizacion) empresa FROM tb_consignacion tc WHERE id_personal = ? AND estado = ? GROUP BY idOrder", [id_personal, "confirmado"]);

        res.render('legalizacion/personal-legalizacion', {
            consulta: consulta,
            consulta1: JSON.stringify(consulta1),
            personal: false,
            consignacion: true,
            detalleConsignacion: false,
            title: "Personal"
        });
    }
});

router.get('/legalizacion/detalle_consignacion', isLoggedIn, async (req, res) => {
    const { id_consignacion } = req.query;
    const consulta = await pool.query("SELECT i.id_item idItem, i.descripcion_item descripcionItem, cd.cantidad cdCantidad, cd.valor_unitario cdValorUnitario, cd.costo_total_item cdCostoTotal, l.valor_unitario lValorUnitario FROM tb_consignacion_detalles cd INNER JOIN tb_legalizacion l ON l.id_consignacion_detalle = cd.id INNER JOIN tb_rubros r ON cd.id_item = r.id_rubro WHERE id_consignacion = ? ORDER BY r.id_rubro", [id_consignacion]);
    const consulta1 = await pool.query("SELECT * FROM tb_consignacion c LEFT JOIN tb_personal p ON c.id_personal = p.id WHERE id_consignacion = ?", [id_consignacion]);
    res.render('legalizacion/personal-legalizacion', {
        id_consignacion: id_consignacion,
        consulta: consulta,
        consulta1: consulta1[0],
        personal: false,
        consignacion: false,
        detalleConsignacion: true,
        title: "Personal"
    });
});

router.post('/legalizacion/legalizar', isLoggedIn, async (req, res) => {
    const { id_consignacion, tTotal, cTotal, lTotal } = req.body;
    const consulta = await pool.query("SELECT id_item idItem, id FROM tb_consignacion_detalles WHERE id_consignacion = ? ORDER BY id_item", [id_consignacion]);
    consulta.forEach(async element => {
        if (lTotal > 0) await pool.query('UPDATE tb_legalizacion SET valor = ? WHERE id_consignacion_detalle = ?', [req.body[`lValor-${element.idItem}`], element.id]);
    });

    if (lTotal > 0) await pool.query("UPDATE tb_consignacion SET estado_legalizado = ?, costo_legalizacion = ?, costo_cotizacion = ?, sobrante_legalizacion = ? WHERE id_consignacion = ?", [1, lTotal, cTotal, tTotal, id_consignacion]);

    res.redirect("/legalizacion/personal");
});

/***API*********************************************************************************************************************/
router.post('/legalizacion/tabla', isLoggedIn, async (req, res) => {
    const { id_consignacion } = req.body;

    if (id_consignacion) {
        const consulta = await pool.query("SELECT id_item idItem FROM tb_consignacion_detalles WHERE id_consignacion = ? ORDER BY id_item", [id_consignacion]);

        res.json({ resp: consulta });
    } else res.json({ resp: [] });
});
/***************************************************************************************************************************/

/***GRAFICAS****************************************************************************************************************/
router.get('/legalizacion/consignacion_grafica_consignacion', isLoggedIn, async (req, res) => {
    const { estado } = req.query;
    const consulta = await pool.query("SELECT *, '1' grafica FROM tb_consignacion WHERE estado = ?", [estado]);
    consulta.forEach(element => {
        element.costo_cotizacion = Intl.NumberFormat().format(element.costo_cotizacion), element.costo_legalizacion = Intl.NumberFormat().format(element.costo_legalizacion), element.sobrante_legalizacion = Intl.NumberFormat().format(element.sobrante_legalizacion);
    });

    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        personal: false,
        consignacion: true,
        detalleConsignacion: false,
        title: "Graficas"
    });
});

router.get('/legalizacion/consignacion_grafica_legalizada', isLoggedIn, async (req, res) => {
    const { estado } = req.query;
    const consulta = await pool.query("SELECT *, '1' grafica FROM tb_consignacion WHERE estado_legalizado = ? AND estado = 'confirmado'", [estado]);

    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        personal: false,
        consignacion: true,
        detalleConsignacion: false,
        title: "Graficas"
    });
});

router.get('/legalizacion/consignacion_grafica_deuda', isLoggedIn, async (req, res) => {
    let signo = ">";
    const { estado } = req.query;
    if (estado == "empresa") signo = "<";
    const consulta = await pool.query(`SELECT *, '1' grafica FROM tb_consignacion WHERE sobrante_legalizacion ${signo} ?`, [0]);

    res.render('legalizacion/personal-legalizacion', {
        consulta: consulta,
        personal: false,
        consignacion: true,
        detalleConsignacion: false,
        title: "Graficas"
    });
});
/***************************************************************************************************************************/

module.exports = router;