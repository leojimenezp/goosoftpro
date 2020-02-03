const express = require('express');
const router = express.Router();
const moment = require('moment');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

/********************************************************************************
 * API REST
 ********************************************************************************/

router.post('/planeacion/ej', isLoggedIn, async (req, res) => {
    const { fecha_inicio, fecha_final } = req.body;
    const consulta = await pool.query(`SELECT ie.id_planeacion, ie.estado ,ie.titulo, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, p.razon_social_proveedor, pe.nombre_personal, pe.apellido_personal, c.abreviatura_centro_costo, co.descripcion_contrato, ca.nombre_campo, m.abreviatura_moneda FROM tb_planeacion ie, tb_proveedor p, tb_personal pe, tb_centro_costos c, tb_contratos co, tb_campos ca, tb_monedas m WHERE ie.id_cliente = p.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = c.id_centro_costo AND ie.id_contrato = co.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.fecha_estimada BETWEEN ? AND ?`, [fecha_inicio, fecha_final]);
    res.json({ data: consulta });
});

router.post('/planeacion/getBy/fechas', isLoggedIn, async (req, res) => {

    const { fecha_inicio, fecha_final } = req.body;
    const consulta = await pool.query(`SELECT ie.id_planeacion, ie.estado ,ie.titulo, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, p.razon_social_proveedor, pe.nombre_personal, pe.apellido_personal, c.abreviatura_centro_costo, co.descripcion_contrato, ca.nombre_campo, m.abreviatura_moneda FROM tb_planeacion ie, tb_proveedor p, tb_personal pe, tb_centro_costos c, tb_contratos co, tb_campos ca, tb_monedas m WHERE ie.id_cliente = p.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = c.id_centro_costo AND ie.id_contrato = co.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.fecha_estimada BETWEEN ? AND ?`, [fecha_inicio, fecha_final]);
    const dataTable = await pool.query(`SELECT * FROM tb_planeacion_valor_fecha WHERE mes_ano > ? AND mes_ano < ? ORDER BY mes_ano`, [fecha_inicio, fecha_final]);
    const planeado = await pool.query("SELECT SUM(IF(tcc.id_moneda = '1', (tcc.precio * tcc.cantidad ) / tc.trm , (tcc.precio * tcc.cantidad ))) total FROM tb_planeacion tp, tb_cotizaciones_costos tcc, tb_cotizaciones tc WHERE tp.fecha_estimada > ? AND tp.fecha_estimada < ? AND tp.id_planeacion  = tcc.id_planeacion AND tc.id_planeacion = tcc.id_planeacion;", [fecha_inicio, fecha_final]);
    const ejecutado = await pool.query("SELECT SUM(IF(ttcgp.id_moneda = '1', (ttcgp.valor * ttcgp.cant) / tp.trm, (ttcgp.valor * ttcgp.cant))) total FROM tb_planeacion tp, tb_ticket tt, tb_ticket_copia_gatos_planeacion ttcgp WHERE tp.fecha_estimada > ? AND tp.fecha_estimada < ? AND tp.id_planeacion  = tt.id_servicio AND tt.id  = ttcgp.id_ticket", [fecha_inicio, fecha_final]);

    const months = [{ id: "01", name: "ENERO" }, { id: "02", name: "FEBRERO" }, { id: "03", name: "MARZO" }, { id: "04", name: "ABRIL" }, { id: "05", name: "MAYO" }, { id: "06", name: "JUNIO" }, { id: "07", name: "JULIO" }, { id: "08", name: "AGOSTO" }, { id: "09", name: "SEPTIEMBRE" }, { id: "10", name: "OCTUBRE" }, { id: "11", name: "NOVIEMBRE" }, { id: "12", name: "DICIEMBRE" }];

    let montsFin = [];
    let yearsFin = [];
    let diffYears = moment(fecha_final).diff(moment(fecha_inicio), "years");
    let diffMonts = moment(fecha_final).diff(moment(fecha_inicio), "months");
    let fechaSplit = fecha_inicio.split("-");

    if (diffYears > 0) {
        let fecha = 0;
        yearsFin.push(fechaSplit[0]);
        for (i = 0; i < diffYears; i++) {
            if (i == 0) fecha = parseInt(fechaSplit[0]) + 1;else fecha = parseInt(fecha) + 1;
            yearsFin.push(fecha.toString());
        }
    } else {
        yearsFin.push(fechaSplit[0]);
    }

    if (diffMonts > 0) {
        if (diffMonts < 12) {
            let mes = parseInt(fechaSplit[1]) - 1;
            for (i = 0; i <= diffMonts; i++) {
                if (mes == 11) {
                    montsFin.push(months[mes]);
                    mes = 0;
                } else if (mes < 11) {
                    montsFin.push(months[mes]);
                    mes++;
                }
            }
        } else {
            montsFin = months;
        }
    } else {
        let mes = parseInt(fechaSplit[1]) - 1;
        montsFin.push(months[mes]);
    }

    res.json({
        consulta: consulta, years: yearsFin, months: montsFin, dataTable: dataTable,
        planeado: planeado[0].total, ejecutado: ejecutado[0].total
    });
});

router.post('/planeacion/set/valor-mes', isLoggedIn, async (req, res) => {
    const { fIni, fFin, ano, mes, valor } = req.body;
    const consultValor = await pool.query(`SELECT SUM(ingreso_estimado) total FROM tb_hojas_trabajo tht, tb_planeacion tp WHERE tht.fecha > ? AND tht.fecha < ? AND tp.estado=? GROUP BY MONTH(tht.fecha), YEAR(tht.fecha)`, [`${ano}-${mes}-01`, `${ano}-${mes}-31`, "Ejecucion"]);
    const consultAnoMes = await pool.query(`SELECT id FROM tb_planeacion_valor_fecha WHERE mes_ano = ?`, [`${ano}-${mes}-01`]);
    if (consultValor.length > 0) {
        if (consultAnoMes.length > 0) {
            await pool.query(`UPDATE tb_planeacion_valor_fecha SET valor_ingresado=?, valor_consulta=? WHERE id=?`, [valor, consultValor[0].total, consultAnoMes[0].id]);
        } else {
            await pool.query(`INSERT INTO tb_planeacion_valor_fecha (valor_ingresado, valor_consulta, mes_ano) VALUES(?, ?, ?)`, [valor, consultValor[0].total, `${ano}-${mes}-01`]);
        }
    }
    const dataTable = await pool.query(`SELECT * FROM tb_planeacion_valor_fecha WHERE mes_ano > ? AND mes_ano < ? ORDER BY mes_ano`, [fIni, fFin]);
    res.json({ resp: dataTable });
});
/********************************************************************************/

router.get('/planeacion', isLoggedIn, async (req, res) => {
    const consulta = await pool.query("SELECT ie.id_planeacion, ie.estado ,ie.titulo, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, p.razon_social_proveedor, pe.nombre_personal, pe.apellido_personal, c.abreviatura_centro_costo, co.descripcion_contrato, ca.nombre_campo, m.abreviatura_moneda FROM tb_planeacion ie, tb_proveedor p, tb_personal pe, tb_centro_costos c, tb_contratos co, tb_campos ca, tb_monedas m WHERE ie.id_cliente = p.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = c.id_centro_costo AND ie.id_contrato = co.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda");
    res.render('planeacion/planeacion', {
        consulta: consulta
    });
});

router.get('/planeacion/agregar', isLoggedIn, async (req, res) => {

    const clientes = await pool.query("SELECT * FROM  tb_clientes");
    console.log(clientes);
    const personal = await pool.query("SELECT id,nombre_personal,apellido_personal FROM tb_personal");
    const centro_costos = await pool.query("SELECT id_centro_costo,nombre_centro_costo FROM tb_centro_costos");
    const contratos = await pool.query("SELECT id_contrato,descripcion_contrato FROM tb_contratos");
    const campos = await pool.query("SELECT id_campo,nombre_campo FROM tb_campos");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/agregar-planeacion', {
        clientes: clientes,
        personal: personal,
        centro_costos: centro_costos,
        contratos: contratos,
        campos: campos,
        monedas: monedas
    });
});

router.get('/info-planeacion/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const tipos_trabajo = await pool.query("SELECT id_tipo_trabajo, descripcion_tipo_trabajo FROM tb_tipo_trabajos");
    const tipos_trabajo_planeacion = await pool.query(`SELECT t.descripcion_tipo_trabajo, ie.id_planeacion, ie.id_tipo_trabajo_planeacion FROM tb_tipo_trabajo_planeacion ie, tb_tipo_trabajos t WHERE ie.id_tipo_trabajo = t.id_tipo_trabajo AND ie.id_planeacion = '${id_planeacion}'`);
    const pozos = await pool.query("SELECT id_pozo, nombre_pozo FROM tb_pozos");
    const pozos_planeacion = await pool.query(`SELECT p.nombre_pozo, ie.id_planeacion, ie.id_pozo_planeacion FROM tb_pozos_planeacion ie, tb_pozos p WHERE ie.id_pozo = p.id_pozo AND ie.id_planeacion = '${id_planeacion}'`);
    const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida`);
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
    const cotizacion = await pool.query(`SELECT id_planeacion,id_cotizacion FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, (ie.cantidad * precio) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_moneda = m.id_moneda AND id_planeacion = '${id_planeacion}'`);
    const mod_planeacion = await pool.query(`SELECT ie.titulo, pro.id_proveedor, pro.razon_social_proveedor, ce.id_centro_costo, con.id_contrato, ca.id_campo, m.id_moneda, ie.contacto, ie.telefono, ie.email, DATE_FORMAT(ie.fecha_contacto, '%Y-%m-%d') fecha_contacto, ie.hora_contacto, pe.nombre_personal, pe.apellido_personal, pe.id, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, con.descripcion_contrato, IF(ie.alojamiento = 1, "GOS","Cliente") alojamiento_, IF(ie.combustible = 1, "GOS","Cliente") combustible_, IF(ie.iluminacion = 1, "GOS","Cliente") iluminacion_, IF(ie.seguridad_fisica = 1, "GOS","Cliente") seguridad_fisica_, IF(ie.personal = 1, "GOS","Cliente") personal_, ca.nombre_campo, m.abreviatura_moneda, ie.objetivo_trabajo, ie.requisitos_hse, ie.observacion, ie.trm, ce.nombre_centro_costo, ie.alojamiento, ie.combustible, ie.iluminacion, ie.seguridad_fisica, ie.personal FROM tb_planeacion ie, tb_personal pe, tb_proveedor pro, tb_centro_costos ce, tb_contratos con, tb_campos ca, tb_monedas m WHERE ie.id_cliente = pro.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = ce.id_centro_costo AND ie.id_contrato = con.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const personal_supervisor_planeacion = await pool.query(`SELECT pe.id ,pe.nombre_personal, pe.apellido_personal FROM tb_planeacion ie, tb_personal pe WHERE ie.id_personal_supervisor = pe.id AND ie.id_planeacion = '${id_planeacion}'`);
    const clientes = await pool.query(`SELECT id_proveedor ,razon_social_proveedor FROM tb_proveedor`);
    const personal = await pool.query(`SELECT id, nombre_personal, apellido_personal FROM tb_personal`);
    const centro_costos = await pool.query(`SELECT id_centro_costo ,nombre_centro_costo FROM tb_centro_costos`);
    const contratos = await pool.query(`SELECT id_contrato, descripcion_contrato FROM tb_contratos`);
    const campos = await pool.query(`SELECT id_campo, nombre_campo FROM tb_campos`);
    res.render('planeacion/info-planeacion', {
        tipos_trabajo: tipos_trabajo,
        tipos_trabajo_planeacion: tipos_trabajo_planeacion,
        pozos: pozos,
        pozos_planeacion: pozos_planeacion,
        unidad_medida: unidad_medida,
        monedas: monedas,
        cotizacion: cotizacion,
        costos_cotizacion: costos_cotizacion,
        mod_planeacion: mod_planeacion,
        personal_supervisor_planeacion: personal_supervisor_planeacion,
        clientes: clientes,
        personal: personal,
        centro_costos: centro_costos,
        contratos: contratos,
        campos: campos,
        consulta: consulta[0],
        position: position
    });
});

router.post('/agregarPlaneacion', isLoggedIn, async (req, res) => {

    const {
        titulo,
        id_cliente,
        contacto,
        telefono,
        email,
        fecha_contacto,
        hora_contacto,
        id_personal,
        id_centro_costo,
        fecha_estimada,
        id_contrato,
        alojamiento,
        combustible,
        iluminacion,
        seguridad_fisica,
        personal,
        id_campo,
        id_personal_supervisor,
        id_moneda,
        trm,
        objetivo_trabajo,
        requisito_hse,
        observacion,
        estado
    } = req.body;
    const datos = req.body;

    if (titulo == '') {
        req.flash('error', 'El campo titulo esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_cliente == '') {
        req.flash('error', 'El campo cliente esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (contacto == '') {
        req.flash('error', 'El campo contacto esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (telefono == '') {
        req.flash('error', 'El campo telefono esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (email == '') {
        req.flash('error', 'El campo email esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (fecha_contacto == '') {
        req.flash('error', 'El campo fecha contacto esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (hora_contacto == '') {
        req.flash('error', 'El campo hora contacto esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_centro_costo == '') {
        req.flash('error', 'El campo centro costo esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (fecha_estimada == '') {
        req.flash('error', 'El campo fecha estimada esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_contrato == '') {
        req.flash('error', 'El campo contrato esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (alojamiento == '') {
        req.flash('error', 'El campo alojamiento esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (combustible == '') {
        req.flash('error', 'El campo combustible esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (iluminacion == '') {
        req.flash('error', 'El campo iluminacion esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (seguridad_fisica == '') {
        req.flash('error', 'El campo seguridad fisica esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_campo == '') {
        req.flash('error', 'El campo campo esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_personal_supervisor == '') {
        req.flash('error', 'El campo supervisor esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (trm == '') {
        req.flash('error', 'El campo trm esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (objetivo_trabajo == '') {
        req.flash('error', 'El campo objetivo trabajo esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (requisito_hse == '') {
        req.flash('error', 'El campo requisito hse esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (observacion == '') {
        req.flash('error', 'El campo observacion esta vacio');
        res.redirect('/planeacion/agregar');
    }
    if (estado == '') {
        req.flash('error', 'El campo estado esta vacio');
        res.redirect('/planeacion/agregar');
    }

    await pool.query("INSERT INTO tb_planeacion SET ?", [datos]);
    res.redirect('/planeacion');
});

router.post('/modificarPlaneacion', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, titulo, id_cliente, contacto, telefono, email, fecha_contacto,
        hora_contacto, id_personal, id_centro_costo, fecha_estimada, id_contrato,
        alojamiento, combustible, iluminacion, seguridad_fisica, personal, id_campo,
        id_personal_supervisor, id_moneda, trm, objetivo_trabajo, requisitos_hse,
        observacion, estado, position
    } = req.body;

    if (titulo == '') {
        console.log("El campo titulo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_cliente == '') {
        console.log("El campo id_cliente esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (contacto == '') {
        console.log("El campo contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (telefono == '') {
        console.log("El campo telefono esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (email == '') {
        console.log("El campo email esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (fecha_contacto == '') {
        console.log("El campo fecha_contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (hora_contacto == '') {
        console.log("El campo hora_contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_personal == '') {
        console.log("El campo id_personal esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_centro_costo == '') {
        console.log("El campo id_centro_costo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (fecha_estimada == '') {
        console.log("El campo fecha_estimada esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_contrato == '') {
        console.log("El campo id_contrato esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (alojamiento == '') {
        console.log("El campo alojamiento esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (combustible == '') {
        console.log("El campo combustible esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (iluminacion == '') {
        console.log("El campo iluminacion esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (seguridad_fisica == '') {
        console.log("El campo seguridad_fisica esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (personal == '') {
        console.log("El campo personal esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_campo == '') {
        console.log("El campo id_campo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_personal_supervisor == '') {
        console.log("El campo id_personal_supervisor esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        console.log("El campo id_moneda esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (trm == '') {
        console.log("El campo trm esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (objetivo_trabajo == '') {
        console.log("El campo objetivo_trabajo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (objetivo_trabajo == '') {
        console.log("El campo objetivo_trabajo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (requisitos_hse == '') {
        console.log("El campo requisitos_hse esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (observacion == '') {
        console.log("El campo observacion esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (estado == '') {
        console.log("El campo estado esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    await pool.query(`UPDATE tb_planeacion SET titulo = '${titulo}', id_cliente = '${id_cliente}', contacto = '${contacto}', telefono = '${telefono}', email = '${email}', fecha_contacto = '${fecha_contacto}', hora_contacto = '${hora_contacto}', id_personal = '${id_personal}', id_centro_costo = '${id_centro_costo}', fecha_estimada = '${fecha_estimada}', id_contrato = '${id_contrato}', alojamiento = '${alojamiento}', combustible = '${combustible}', iluminacion = '${iluminacion}', seguridad_fisica = '${seguridad_fisica}', personal = '${personal}', id_campo = '${id_campo}', id_personal_supervisor = '${id_personal_supervisor}', id_moneda = '${id_moneda}', objetivo_trabajo = '${objetivo_trabajo}', requisitos_hse = '${requisitos_hse}', observacion = '${observacion}', trm = '${trm}', estado = '${estado}' WHERE id_planeacion = '${id_planeacion}'`);

    let validacion;
    if (estado == "Ejecucion") {
        validacion = 1;
    } else {
        validacion = 0;
    }
    if (estado == "Cerrado") {
        validacion = 2;
    } else {
        validacion = 0;
    }

    if (validacion == '1') {
        await pool.query(`INSERT INTO  tbr_equipo_item_combustible   SELECT * FROM tb_equipo_item_combustible WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbr_equipo_item_equipo_herramienta	SELECT * FROM  tb_equipo_item_equipo_herramienta  WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbr_equipo_item_imprevistos	SELECT * FROM	tb_equipo_item_imprevistos	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbr_equipo_item_personal	SELECT * FROM	tb_equipo_item_personal	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbr_equipo_rubros_equipo_herramienta SELECT * FROM  tb_equipo_rubros_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbr_equipo_rubros_personal	SELECT * FROM	tb_equipo_rubros_persona WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_item_combustibles  	SELECT * FROM	tb_mov_item_combustibles WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_item_imprevistos 	SELECT * FROM	tb_mov_item_imprevistos  WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_item_personal 	SELECT * FROM	tb_mov_item_personal 	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_item_vehiculos	SELECT * FROM	tb_mov_item_vehiculos	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_rubros_personal	SELECT * FROM	tb_mov_rubros_personal	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbr_mov_rubros_vehiculos  	SELECT * FROM	tb_mov_rubros_vehiculos  WHERE id_planeacion = '${id_planeacion}'`);
    }
    if (validacion == '2') {
        await pool.query(`INSERT INTO  tbrc_equipo_item_combustible   SELECT * FROM tb_equipo_item_combustible WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbrc_equipo_item_equipo_herramienta	SELECT * FROM  tb_equipo_item_equipo_herramienta  WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbrc_equipo_item_imprevistos	SELECT * FROM	tb_equipo_item_imprevistos	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbrc_equipo_item_personal	SELECT * FROM	tb_equipo_item_personal	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbrc_equipo_rubros_equipo_herramienta SELECT * FROM  tb_equipo_rubros_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO  tbrc_equipo_rubros_personal	SELECT * FROM	tb_equipo_rubros_persona WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_item_combustibles  	SELECT * FROM	tb_mov_item_combustibles WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_item_imprevistos 	SELECT * FROM	tb_mov_item_imprevistos  WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_item_personal 	SELECT * FROM	tb_mov_item_personal 	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_item_vehiculos	SELECT * FROM	tb_mov_item_vehiculos	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_rubros_personal	SELECT * FROM	tb_mov_rubros_personal	 WHERE id_planeacion = '${id_planeacion}'`);
        await pool.query(`INSERT INTO tbrc_mov_rubros_vehiculos  	SELECT * FROM	tb_mov_rubros_vehiculos  WHERE id_planeacion = '${id_planeacion}'`);
    }
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/planeacion/graficas/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const tipos_trabajo = await pool.query("SELECT id_tipo_trabajo, descripcion_tipo_trabajo FROM tb_tipo_trabajos");
    const tipos_trabajo_planeacion = await pool.query(`SELECT t.descripcion_tipo_trabajo, ie.id_planeacion, ie.id_tipo_trabajo_planeacion FROM tb_tipo_trabajo_planeacion ie, tb_tipo_trabajos t WHERE ie.id_tipo_trabajo = t.id_tipo_trabajo AND ie.id_planeacion = '${id_planeacion}'`);
    const pozos = await pool.query("SELECT id_pozo, nombre_pozo FROM tb_pozos");
    const pozos_planeacion = await pool.query(`SELECT p.nombre_pozo, ie.id_planeacion, ie.id_pozo_planeacion FROM tb_pozos_planeacion ie, tb_pozos p WHERE ie.id_pozo = p.id_pozo AND ie.id_planeacion = '${id_planeacion}'`);
    const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida`);
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
    const cotizacion = await pool.query(`SELECT * FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const mod_planeacion = await pool.query(`SELECT ie.titulo, pro.id_proveedor, pro.razon_social_proveedor, ce.id_centro_costo, con.id_contrato, ca.id_campo, m.id_moneda, ie.contacto, ie.telefono, ie.email, DATE_FORMAT(ie.fecha_contacto, '%Y-%m-%d') fecha_contacto, ie.hora_contacto, pe.nombre_personal, pe.apellido_personal, pe.id, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, con.descripcion_contrato, IF(ie.alojamiento = 1, "GOS","Cliente") alojamiento_, IF(ie.combustible = 1, "GOS","Cliente") combustible_, IF(ie.iluminacion = 1, "GOS","Cliente") iluminacion_, IF(ie.seguridad_fisica = 1, "GOS","Cliente") seguridad_fisica_, IF(ie.personal = 1, "GOS","Cliente") personal_, ca.nombre_campo, m.abreviatura_moneda, ie.objetivo_trabajo, ie.requisitos_hse, ie.observacion, ie.trm, ce.nombre_centro_costo, ie.alojamiento, ie.combustible, ie.iluminacion, ie.seguridad_fisica, ie.personal FROM tb_planeacion ie, tb_personal pe, tb_proveedor pro, tb_centro_costos ce, tb_contratos con, tb_campos ca, tb_monedas m WHERE ie.id_cliente = pro.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = ce.id_centro_costo AND ie.id_contrato = con.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const personal_supervisor_planeacion = await pool.query(`SELECT pe.id ,pe.nombre_personal, pe.apellido_personal FROM tb_planeacion ie, tb_personal pe WHERE ie.id_personal_supervisor = pe.id AND ie.id_planeacion = '${id_planeacion}'`);
    const clientes = await pool.query(`SELECT id_proveedor ,razon_social_proveedor FROM tb_proveedor`);
    const personal = await pool.query(`SELECT id, nombre_personal, apellido_personal FROM tb_personal`);
    const centro_costos = await pool.query(`SELECT id_centro_costo ,nombre_centro_costo FROM tb_centro_costos`);
    const contratos = await pool.query(`SELECT id_contrato, descripcion_contrato FROM tb_contratos`);
    const campos = await pool.query(`SELECT id_campo, nombre_campo FROM tb_campos`);

    let subcontratado_equipo = 0;
    let subcontratado_credito_equipo = 0;
    let subcontratado_contado_equipo = 0;
    let consumible_equipo = 0;
    let consumible_credito_equipo = 0;
    let consumible_contado_equipo = 0;
    let rubro_equipo_herramienta_equipo;
    let rubro_personal_equipo;
    let rubro_combustibles_equipo;
    let rubro_imprevistos_equipo;
    let rubro_combustibles_mov;
    let rubro_personal_mov;
    let rubro_vehiculo_mov;
    let rubro_imprevistos_mov;
    let subcontratado_mov = 0;
    let subcontratado_credito_mov = 0;
    let subcontratado_contado_mov = 0;
    let consumible_mov = 0;
    let consumible_credito_mov = 0;
    let consumible_contado_mov = 0;
    let control_movilizacion_subcontado_equipo = [];
    let control_movilizacion_subcontado_mov = [];
    let sigla_rubro_equipo = [];
    let sigla_rubro_mov = [];

    function eliminateDuplicates(arr) {
        let i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) obj[arr[i]] = 0;
        for (i in obj) out.push(i);
        return out;
    }

<<<<<<< HEAD
    /* SELECT ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo,
    m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal,
     u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal,
     (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal,p.salario_personal,
    DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' AS dias,
    ((
    (
    DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1'
    )*ROUND(p.salario_personal / 30)
    ) + p.bono_salarial_personal) + 
    IF(
    (SELECT SUM(rp.costo_unitario * rp.cantidad ) total
    FROM tb_equipo_rubros_personal rp WHERE rp.id_equipo_item_personal = ie.id_equipo_item_personal) = NULL, 0,
    (SELECT SUM(rp.costo_unitario * rp.cantidad ) total
    FROM tb_equipo_rubros_personal rp WHERE rp.id_equipo_item_personal = ie.id_equipo_item_personal) 
           )AS  total 
    FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m
    WHERE ie.id_cargo = c.id_cargo 
    AND ie.id_personal = p.id 
    AND ie.id_unidad_medida = u.id_unidad_medida
    AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda 
    AND ie.id_planeacion 
    
    
    SELECT
    (SUM(
    (
    (
    (
    	DATEDIFF(  ie.fecha_inicio_demov , ie.fecha_final_mov ) + 1
    )
    * ROUND(p.salario_personal / 30)
    ) 
    + p.bono_salarial_personal		
    )
    ) + (
    SELECT SUM(rp.costo_unitario * rp.cantidad ) total
    FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion
    )) AS total
     FROM tb_equipo_item_personal ie, tb_personal p
     WHERE ie.id_personal = p.id 	
     AND ie.id_planeacion = '7'; */

    const tb_equipo_item_equipo_herramienta = await pool.query(`SELECT 1 as button, ie.id_equipo_item_equipo_herramienta, m.abreviatura_moneda, ie.id_planeacion, e.nombre_equipo, e.placa_equipo,
=======
  if (estado == '') {
    console.log("El campo estado esta vacio");
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
  }

  await pool.query(`UPDATE tb_planeacion SET titulo = '${titulo}', id_cliente = '${id_cliente}', contacto = '${contacto}', telefono = '${telefono}', email = '${email}', fecha_contacto = '${fecha_contacto}', hora_contacto = '${hora_contacto}', id_personal = '${id_personal}', id_centro_costo = '${id_centro_costo}', fecha_estimada = '${fecha_estimada}', id_contrato = '${id_contrato}', alojamiento = '${alojamiento}', combustible = '${combustible}', iluminacion = '${iluminacion}', seguridad_fisica = '${seguridad_fisica}', personal = '${personal}', id_campo = '${id_campo}', id_personal_supervisor = '${id_personal_supervisor}', id_moneda = '${id_moneda}', objetivo_trabajo = '${objetivo_trabajo}', requisitos_hse = '${requisitos_hse}', observacion = '${observacion}', trm = '${trm}', estado = '${estado}' WHERE id_planeacion = '${id_planeacion}'`);
  let validacion;

  if (estado == "Ejecucion") {
    validacion = 1;
  } else {
    validacion = 0;
  }

  if (estado == "Cerrado") {
    validacion = 2;
  } else {
    validacion = 0;
  }

  if (validacion == '1') {
    await pool.query(`INSERT INTO  tbr_equipo_item_combustible   SELECT * FROM tb_equipo_item_combustible WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbr_equipo_item_equipo_herramienta	SELECT * FROM  tb_equipo_item_equipo_herramienta  WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbr_equipo_item_imprevistos	SELECT * FROM	tb_equipo_item_imprevistos	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbr_equipo_item_personal	SELECT * FROM	tb_equipo_item_personal	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbr_equipo_rubros_equipo_herramienta SELECT * FROM  tb_equipo_rubros_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbr_equipo_rubros_personal	SELECT * FROM	tb_equipo_rubros_persona WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_item_combustibles  	SELECT * FROM	tb_mov_item_combustibles WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_item_imprevistos 	SELECT * FROM	tb_mov_item_imprevistos  WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_item_personal 	SELECT * FROM	tb_mov_item_personal 	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_item_vehiculos	SELECT * FROM	tb_mov_item_vehiculos	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_rubros_personal	SELECT * FROM	tb_mov_rubros_personal	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbr_mov_rubros_vehiculos  	SELECT * FROM	tb_mov_rubros_vehiculos  WHERE id_planeacion = '${id_planeacion}'`);
  }

  if (validacion == '2') {
    await pool.query(`INSERT INTO  tbrc_equipo_item_combustible   SELECT * FROM tb_equipo_item_combustible WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbrc_equipo_item_equipo_herramienta	SELECT * FROM  tb_equipo_item_equipo_herramienta  WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbrc_equipo_item_imprevistos	SELECT * FROM	tb_equipo_item_imprevistos	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbrc_equipo_item_personal	SELECT * FROM	tb_equipo_item_personal	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbrc_equipo_rubros_equipo_herramienta SELECT * FROM  tb_equipo_rubros_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO  tbrc_equipo_rubros_personal	SELECT * FROM	tb_equipo_rubros_persona WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_item_combustibles  	SELECT * FROM	tb_mov_item_combustibles WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_item_imprevistos 	SELECT * FROM	tb_mov_item_imprevistos  WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_item_personal 	SELECT * FROM	tb_mov_item_personal 	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_item_vehiculos	SELECT * FROM	tb_mov_item_vehiculos	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_rubros_personal	SELECT * FROM	tb_mov_rubros_personal	 WHERE id_planeacion = '${id_planeacion}'`);
    await pool.query(`INSERT INTO tbrc_mov_rubros_vehiculos  	SELECT * FROM	tb_mov_rubros_vehiculos  WHERE id_planeacion = '${id_planeacion}'`);
  }

  res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});
router.get('/planeacion/graficas/:id_planeacion/:position', isLoggedIn, async (req, res) => {
  const {
    id_planeacion,
    position
  } = req.params;
  const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
  const tipos_trabajo = await pool.query("SELECT id_tipo_trabajo, descripcion_tipo_trabajo FROM tb_tipo_trabajos");
  const tipos_trabajo_planeacion = await pool.query(`SELECT t.descripcion_tipo_trabajo, ie.id_planeacion, ie.id_tipo_trabajo_planeacion FROM tb_tipo_trabajo_planeacion ie, tb_tipo_trabajos t WHERE ie.id_tipo_trabajo = t.id_tipo_trabajo AND ie.id_planeacion = '${id_planeacion}'`);
  const pozos = await pool.query("SELECT id_pozo, nombre_pozo FROM tb_pozos");
  const pozos_planeacion = await pool.query(`SELECT p.nombre_pozo, ie.id_planeacion, ie.id_pozo_planeacion FROM tb_pozos_planeacion ie, tb_pozos p WHERE ie.id_pozo = p.id_pozo AND ie.id_planeacion = '${id_planeacion}'`);
  const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida`);
  const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
  const cotizacion = await pool.query(`SELECT * FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
  const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
  const mod_planeacion = await pool.query(`SELECT ie.titulo, pro.id_proveedor, pro.razon_social_proveedor, ce.id_centro_costo, con.id_contrato, ca.id_campo, m.id_moneda, ie.contacto, ie.telefono, ie.email, DATE_FORMAT(ie.fecha_contacto, '%Y-%m-%d') fecha_contacto, ie.hora_contacto, pe.nombre_personal, pe.apellido_personal, pe.id, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, con.descripcion_contrato, IF(ie.alojamiento = 1, "GOS","Cliente") alojamiento_, IF(ie.combustible = 1, "GOS","Cliente") combustible_, IF(ie.iluminacion = 1, "GOS","Cliente") iluminacion_, IF(ie.seguridad_fisica = 1, "GOS","Cliente") seguridad_fisica_, IF(ie.personal = 1, "GOS","Cliente") personal_, ca.nombre_campo, m.abreviatura_moneda, ie.objetivo_trabajo, ie.requisitos_hse, ie.observacion, ie.trm, ce.nombre_centro_costo, ie.alojamiento, ie.combustible, ie.iluminacion, ie.seguridad_fisica, ie.personal FROM tb_planeacion ie, tb_personal pe, tb_proveedor pro, tb_centro_costos ce, tb_contratos con, tb_campos ca, tb_monedas m WHERE ie.id_cliente = pro.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = ce.id_centro_costo AND ie.id_contrato = con.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
  const personal_supervisor_planeacion = await pool.query(`SELECT pe.id ,pe.nombre_personal, pe.apellido_personal FROM tb_planeacion ie, tb_personal pe WHERE ie.id_personal_supervisor = pe.id AND ie.id_planeacion = '${id_planeacion}'`);
  const clientes = await pool.query(`SELECT id_proveedor ,razon_social_proveedor FROM tb_proveedor`);
  const personal = await pool.query(`SELECT id, nombre_personal, apellido_personal FROM tb_personal`);
  const centro_costos = await pool.query(`SELECT id_centro_costo ,nombre_centro_costo FROM tb_centro_costos`);
  const contratos = await pool.query(`SELECT id_contrato, descripcion_contrato FROM tb_contratos`);
  const campos = await pool.query(`SELECT id_campo, nombre_campo FROM tb_campos`);
  let subcontratado_equipo = 0;
  let subcontratado_credito_equipo = 0;
  let subcontratado_contado_equipo = 0;
  let consumible_equipo = 0;
  let consumible_credito_equipo = 0;
  let consumible_contado_equipo = 0;
  let rubro_equipo_herramienta_equipo;
  let rubro_personal_equipo;
  let rubro_combustibles_equipo;
  let rubro_imprevistos_equipo;
  let rubro_combustibles_mov;
  let rubro_personal_mov;
  let rubro_vehiculo_mov;
  let rubro_imprevistos_mov;
  let subcontratado_mov = 0;
  let subcontratado_credito_mov = 0;
  let subcontratado_contado_mov = 0;
  let consumible_mov = 0;
  let consumible_credito_mov = 0;
  let consumible_contado_mov = 0;
  let control_movilizacion_subcontado_equipo = [];
  let control_movilizacion_subcontado_mov = [];
  let sigla_rubro_equipo = [];
  let sigla_rubro_mov = [];

  function eliminateDuplicates(arr) {
    let i,
        len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) obj[arr[i]] = 0;

    for (i in obj) out.push(i);

    return out;
  }
  /* SELECT ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo,
  m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal,
   u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal,
   (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal,p.salario_personal,
  DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' AS dias,
  ((
  (
  DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1'
  )*ROUND(p.salario_personal / 30)
  ) + p.bono_salarial_personal) + 
  IF(
  (SELECT SUM(rp.costo_unitario * rp.cantidad ) total
  FROM tb_equipo_rubros_personal rp WHERE rp.id_equipo_item_personal = ie.id_equipo_item_personal) = NULL, 0,
  (SELECT SUM(rp.costo_unitario * rp.cantidad ) total
  FROM tb_equipo_rubros_personal rp WHERE rp.id_equipo_item_personal = ie.id_equipo_item_personal) 
         )AS  total 
  FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m
  WHERE ie.id_cargo = c.id_cargo 
  AND ie.id_personal = p.id 
  AND ie.id_unidad_medida = u.id_unidad_medida
  AND ie.id_rubro = r.id_rubro 
  AND ie.id_moneda = m.id_moneda 
  AND ie.id_planeacion 
  
  
  SELECT
  (SUM(
  (
  (
  (
  	DATEDIFF(  ie.fecha_inicio_demov , ie.fecha_final_mov ) + 1
  )
  * ROUND(p.salario_personal / 30)
  ) 
  + p.bono_salarial_personal		
  )
  ) + (
  SELECT SUM(rp.costo_unitario * rp.cantidad ) total
  FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion
  )) AS total
   FROM tb_equipo_item_personal ie, tb_personal p
   WHERE ie.id_personal = p.id 	
   AND ie.id_planeacion = '7'; */


  const tb_equipo_item_equipo_herramienta = await pool.query(`SELECT 1 as button, ie.id_equipo_item_equipo_herramienta, m.abreviatura_moneda, ie.id_planeacion, e.nombre_equipo, e.placa_equipo,
>>>>>>> 0f1e922afbb55ac9ab728baa7bcfe77fb152b436
    u.abreviatura_unidad_medida, ie.gasto_unitario, ie.gasto_standby_unitario, r.sigla_rubro, 
    (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) AS dias, 
    IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) AS dias_s 
    , (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario
        + (
            IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) *
            IF(gasto_standby_unitario IS NULL, 0, gasto_standby_unitario) 
          )AS total_costo,
       
       ((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario) AS suma_gasto, 
       (	
           IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1'))* gasto_standby_unitario
       ) AS suma_gasto_standby 
    FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m 
    WHERE ie.vehiculo = e.id_equipo 
    AND ie.carga = e.id_equipo 
    AND ie.id_unidad_medida = u.id_unidad_medida
     AND ie.id_rubro = r.id_rubro 
    AND ie.id_moneda = m.id_moneda
    AND ie.id_planeacion = '${id_planeacion}'`);

    const tb_equipo_item_personal = await pool.query(` SELECT 1 as button, ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo,
       m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal,
       u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal,
       (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal,p.salario_personal,
       DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' AS dias,
       ((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  )	AS  total 
       FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m
       WHERE ie.id_cargo = c.id_cargo AND ie.id_personal = p.id AND ie.id_unidad_medida = u.id_unidad_medida
       AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda 
       AND ie.id_planeacion ='${id_planeacion}'`);
    const tb_equipo_item_combustible = await pool.query(`  SELECT 1 as button , ie.id_equipo_item_combustible, ie.id_planeacion ,i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_equipo_item_combustible ie, tb_item i, tb_rubros r, tb_unidad_medida u WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_equipo_item_imprevistos = await pool.query(`SELECT ie.id_equipo_item_imprevisto, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, ie.id_planeacion, ie.id_mov_item_imprevisto, ie.descripcion, DATE_FORMAT(ie.fecha_imprevisto, '%Y-%m-%d') fecha_imprevisto, ie.cantidad, ie.costo_unitario, r.sigla_rubro, u.abreviatura_unidad_medida, m.abreviatura_moneda, (cantidad * costo_unitario) total_costo FROM tb_equipo_item_imprevistos ie, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);

    for (let s_equipo of tb_equipo_item_equipo_herramienta) {
        subcontratado_credito_equipo = subcontratado_credito_equipo + s_equipo.credito_gasto + s_equipo.credito_gasto_standby;
        subcontratado_contado_equipo = subcontratado_contado_equipo + s_equipo.contado_gasto + s_equipo.contado_gasto_standby;
        subcontratado_equipo = subcontratado_equipo + s_equipo.total_costo;
    }

    for (let c_equipo of tb_equipo_item_combustible) {
        consumible_credito_equipo = consumible_credito_equipo + c_equipo.credito;
        consumible_contado_equipo = consumible_contado_equipo + c_equipo.contado;
        consumible_equipo = consumible_equipo + c_equipo.total_costo;
    }

    const suma_equipo_subcontratado = await pool.query(` SELECT SUM((( DATEDIFF(fecha_final_gasto , fecha_inicio_gasto )+ '2' + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby))* gasto_unitario) + ((DATEDIFF(fecha_2, fecha_1)+'1') * gasto_standby_unitario) ) suma_subcontratado FROM tb_equipo_item_equipo_herramienta ie WHERE ie.id_planeacion ='${id_planeacion}'`);
    const credito_equipo_subcontratado = await pool.query(`SELECT SUM(IF(ie.medio_pago = '1',  ((DATEDIFF(fecha_final_gasto, fecha_inicio_gasto) +'2' + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby)) * gasto_unitario) + ((DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario), 0)) suma_credito FROM tb_equipo_item_equipo_herramienta ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const contado_equipo_subcontratado = await pool.query(`SELECT SUM(IF(ie.medio_pago = '2',  (( DATEDIFF(fecha_final_gasto , fecha_inicio_gasto)+'2' + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby)) * gasto_unitario) + ( (DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario), 0)) suma_contado FROM tb_equipo_item_equipo_herramienta ie WHERE ie.id_planeacion ='${id_planeacion}'`);

    const suma_equipo_consumibles = await pool.query(`SELECT SUM(ie.costo_unitario * cantidad) suma_consumible FROM tb_equipo_item_combustible ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const credito_equipo_comsumible = await pool.query(`SELECT SUM(IF(ie.medio_pago = '1', ie.costo_unitario * cantidad, 0)) suma_credito FROM tb_equipo_item_combustible ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const contado_equipo_comsumible = await pool.query(`SELECT SUM(IF(ie.medio_pago = '2', ie.costo_unitario * cantidad, 0)) suma_contado FROM tb_equipo_item_combustible ie WHERE ie.id_planeacion = '${id_planeacion}'`);

    control_movilizacion_subcontado_equipo.push(suma_equipo_subcontratado[0].suma_subcontratado, credito_equipo_subcontratado[0].suma_credito, contado_equipo_subcontratado[0].suma_contado, suma_equipo_consumibles[0].suma_consumible, credito_equipo_comsumible[0].suma_credito, contado_equipo_comsumible[0].suma_contado);

    for (let eq_equipo_rubro of tb_equipo_item_equipo_herramienta) sigla_rubro_equipo.push(eq_equipo_rubro.sigla_rubro);

    for (let eq_personal_rubro of tb_equipo_item_personal) sigla_rubro_equipo.push(eq_personal_rubro.sigla_rubro);

    for (let eq_combustibles_rubro of tb_equipo_item_combustible) sigla_rubro_equipo.push(eq_combustibles_rubro.sigla_rubro);

    for (let eq_imprevistos_rubro of tb_equipo_item_imprevistos) sigla_rubro_equipo.push(eq_imprevistos_rubro.sigla_rubro);

    let res_rubro_equipo = [];
    for (var i = 0; i <= eliminateDuplicates(sigla_rubro_equipo).length - 1; i++) {
        rubro_equipo_herramienta_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', ((DATEDIFF(fecha_final_gasto , fecha_inicio_gasto)+'2' + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby)) * gasto_unitario) + ((DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario), 0)) suma FROM tb_equipo_item_equipo_herramienta ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
        rubro_personal_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}',((DATEDIFF(fecha_final_mov, fecha_inicio_mov) +'2' + DATEDIFF(fecha_final_demov , fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal , 0)) suma FROM tb_equipo_item_personal ie, tb_rubros r, tb_personal p WHERE ie.id_rubro = r.id_rubro AND ie.id_personal = p.id AND ie.id_planeacion ='${id_planeacion}'`);
        rubro_combustibles_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', (cantidad * costo_unitario), 0)) suma FROM tb_equipo_item_combustible ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
        rubro_imprevistos_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', (cantidad * costo_unitario), 0)) suma FROM tb_equipo_item_imprevistos ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
        let suma_rubro = rubro_equipo_herramienta_equipo[0].suma + rubro_personal_equipo[0].suma + rubro_combustibles_equipo[0].suma + rubro_imprevistos_equipo[0].suma;
        res_rubro_equipo.push(suma_rubro);
    }

    let lbl_rubro_equipo = eliminateDuplicates(sigla_rubro_equipo);
    let data_rubro_equipo = res_rubro_equipo;

    const equipo_total_equipo_herramienta = await pool.query(`SELECT SUM( (DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1' ) * ie.gasto_unitario + (IF((DATEDIFF(ie.fecha_2,ie.fecha_1) + '1') IS NULL ,0 ,(DATEDIFF(ie.fecha_2 , ie.fecha_1) + '1')) * IF(ie.gasto_standby_unitario IS NULL, 0, ie.gasto_standby_unitario)))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = ${id_planeacion}`);
    const equipo_total_equipo_herramienta_rubro = await pool.query(`SELECT (SUM((((DATEDIFF(ie.fecha_inicio_gasto_standby, ie.fecha_final_gasto) +'1') * ie.gasto_unitario) +  IF((DATEDIFF(fecha_2 , fecha_1)) IS NULL, 0, (DATEDIFF(fecha_2 , fecha_1) + '1')) * gasto_standby_unitario)) + (SELECT SUM(ehh.costo_unitario * ehh.cantidad) FROM tb_equipo_rubros_equipo_herramienta ehh WHERE ehh.id_planeacion = ie.id_planeacion GROUP BY ehh.id_planeacion))AS total FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e , tb_equipo_rubros_equipo_herramienta eh WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND eh.id_planeacion = ie.id_planeacion`);
    const equipo_total_personal = await pool.query(` SELECT SUM(((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' ) * ROUND(p.salario_personal / 30)) +
    p.bono_salarial_personal ) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  )AS total FROM tb_equipo_item_personal ie, tb_personal p
    WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_personal_rubros = await pool.query(` SELECT (SUM((((DATEDIFF(ie.fecha_inicio_demov , ie.fecha_final_mov) + 1) * ROUND(p.salario_personal / 30)) + p.bono_salarial_personal)) + (SELECT SUM(rp.costo_unitario * rp.cantidad) + ROUND(( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' )*((DATEDIFF (  ie.fecha_inicio_demov , ie.fecha_final_mov ) +'1' )*ROUND(p.salario_personal / 30))  ) total FROM tb_equipo_rubros_personal rp WHERE rp.id_planeacion = ie.id_planeacion)) AS total  FROM tb_equipo_item_personal ie, tb_personal p WHERE ie.id_personal = p.id AND ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_consumible = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_equipo_item_combustible ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const equipo_total_imprevistos = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);

    /**esta la que hace apra mostrar en tabla los vehiculos de movilicazion */
    const tb_mov_item_vehiculos = await pool.query(` SELECT ie.id_mov_item_vehiculo, ie.gasto_unitario, ie.id_planeacion, e.nombre_equipo, ie.observaciones, e.placa_equipo, u.abreviatura_unidad_medida, m.abreviatura_moneda, r.sigla_rubro, (DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto) + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby) + DATEDIFF(ie.fecha_2 , ie.fecha_1) +'3' ) dias, ((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto) + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby) + '2')* ie.gasto_unitario) suma_gasto, ((DATEDIFF(ie.fecha_2 , ie.fecha_1) +'1') * ie.gasto_standby_unitario) suma_gasto_standby, ((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto) + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby) +'2' )* gasto_unitario) + ((DATEDIFF(ie.fecha_2 ,ie.fecha_1)+'1') * gasto_standby_unitario) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e, tb_unidad_medida u, tb_monedas m, tb_rubros r WHERE ie.vehiculo = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_moneda = m.id_moneda AND ie.id_rubro = r.id_rubro AND ie.id_planeacion ='${id_planeacion}'`);
    /*este es el de las putas persona jajajaja espero este codigo lo lea yo jiji att: el judas */
    const tb_mov_item_personal = await pool.query(`SELECT ie.id_mov_item_personal, ie.id_planeacion,(DATEDIFF(fecha_final_mov , fecha_inicio_mov )+ '2' + 
    DATEDIFF(fecha_final_demov , fecha_inicio_demov))AS cantidad, ROUND(p.salario_personal / 30) costo_unitario, c.nombre_cargo, 
    p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, e.placa_equipo, a.descripcion, m.abreviatura_moneda,
    DATE_FORMAT(ie.fecha_inicio_mov, '%Y-%m-%d') fecha_inicio_mov, DATE_FORMAT(ie.fecha_final_mov, '%Y-%m-%d')
    fecha_final_mov,DATE_FORMAT(ie.fecha_inicio_demov, '%Y-%m-%d') fecha_inicio_demov, DATE_FORMAT(ie.fecha_final_demov, '%Y-%m-%d') 
    fecha_final_demov, DATEDIFF(fecha_final_mov , fecha_inicio_mov )+'1' 
    AS suma_mov,
    DATEDIFF(fecha_final_demov , fecha_inicio_demov )+'1' 
    AS suma_demov,
    (DATEDIFF(fecha_final_mov , fecha_inicio_mov )+ '2' + DATEDIFF(fecha_final_demov , fecha_inicio_demov))
    AS ascantidad,
    ((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2'
        + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov))*ROUND(p.salario_personal / 30)) 
    + ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + 
            DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)) ) + p.bono_no_salarial_personal ) AS total , p.bono_no_salarial_personal bono_campo 
    FROM tb_mov_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_equipos e, tb_tipo_asignacion a, tb_monedas m WHERE ie.id_cargo = c.id_cargo AND ie.id_personal = p.id AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_equipo = e.id_equipo AND ie.id_tipo_asignacion = a.id_tipo_asignacion
        AND ie.id_moneda = m.id_moneda 
        AND ie.id_planeacion =${id_planeacion}`);
    const tb_mov_item_combustibles = await pool.query(`SELECT ie.id_mov_item_combustible, ie.id_planeacion ,i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_mov_item_combustibles ie, tb_item i, tb_rubros r, tb_unidad_medida u WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_mov_item_imprevistos = await pool.query(`SELECT ie.id_mov_item_imprevisto, IF(ie.medio_pago = '1', 'Credito', 'Contado') medio_pago, ie.cantidad ,ie.id_planeacion, DATE_FORMAT(ie.fecha_imprevisto, '%Y-%m-%d') fecha_inicio, ie.descripcion, ie.cantidad, ie.costo_unitario, r.sigla_rubro, u.abreviatura_unidad_medida, m.abreviatura_moneda, (cantidad * costo_unitario) total_costo FROM tb_mov_item_imprevistos ie, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);

    for (var s_mov of tb_mov_item_vehiculos) {
        subcontratado_credito_mov = subcontratado_credito_mov + s_mov.credito_gasto + s_mov.credito_gasto_standby;
        subcontratado_contado_mov = subcontratado_contado_mov + s_mov.contado_gasto + s_mov.contado_gasto_standby;
        subcontratado_mov = subcontratado_mov + s_mov.total_costo;
    }

    for (var c_mov of tb_mov_item_combustibles) {
        consumible_credito_mov = consumible_credito_mov + c_mov.credito;
        consumible_contado_mov = consumible_contado_mov + c_mov.contado;
        consumible_mov = consumible_mov + c_mov.total_costo;
    }

    const suma_mov_subcontratado = await pool.query(`SELECT SUM((( DATEDIFF(fecha_final_gasto , fecha_inicio_gasto)+'2'+ DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby))* gasto_unitario) + ((DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario)) suma_subcontratado FROM tb_mov_item_vehiculos WHERE id_planeacion = '${id_planeacion}'`);
    const credito_mov_subcontratado = await pool.query(`SELECT SUM(IF(medio_pago = '1', ((DATEDIFF(fecha_final_gasto , fecha_inicio_gasto)+ '2' + DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby))* gasto_unitario) + ((DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario), 0)) suma_credito FROM tb_mov_item_vehiculos WHERE id_planeacion = '${id_planeacion}'`);
    const contado_mov_subcontratado = await pool.query(` SELECT SUM(IF(medio_pago = '2', ((DATEDIFF(fecha_final_gasto , fecha_inicio_gasto) +'2' + DATEDIFF(fecha_final_gasto_standby ,fecha_inicio_gasto_standby))* gasto_unitario) + ((DATEDIFF(fecha_2 , fecha_1)+'1') * gasto_standby_unitario), 0)) suma_contado FROM tb_mov_item_vehiculos WHERE id_planeacion ='${id_planeacion}'`);

    const suma_mov_consumibles = await pool.query(`SELECT SUM(ie.costo_unitario * cantidad) suma_consumible FROM tb_mov_item_combustibles ie WHERE id_planeacion = '${id_planeacion}'`);
    const credito_mov_comsumible = await pool.query(`SELECT SUM(IF(ie.medio_pago = '1', ie.costo_unitario * cantidad, 0)) suma_credito FROM tb_mov_item_combustibles ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const contado_mov_comsumible = await pool.query(`SELECT SUM(IF(ie.medio_pago = '2', ie.costo_unitario * cantidad, 0)) suma_contado FROM tb_mov_item_combustibles ie WHERE ie.id_planeacion = '${id_planeacion}'`);

    control_movilizacion_subcontado_mov.push(suma_mov_subcontratado[0].suma_subcontratado, credito_mov_subcontratado[0].suma_credito, contado_mov_subcontratado[0].suma_contado, suma_mov_consumibles[0].suma_consumible, credito_mov_comsumible[0].suma_credito, contado_mov_comsumible[0].suma_contado);

    for (var mov_vehiculo_rubro of tb_mov_item_vehiculos) sigla_rubro_mov.push(mov_vehiculo_rubro.sigla_rubro);

    for (var mov_personal_rubro of tb_mov_item_personal) sigla_rubro_mov.push(mov_personal_rubro.sigla_rubro);

    for (var mov_combustibles_rubro of tb_mov_item_combustibles) sigla_rubro_mov.push(mov_combustibles_rubro.sigla_rubro);

    for (var mov_imprevistos_rubro of tb_mov_item_imprevistos) sigla_rubro_mov.push(mov_imprevistos_rubro.sigla_rubro);

    var res_rubro_mov = [];

    for (var o = 0; o <= eliminateDuplicates(sigla_rubro_mov).length - 1; o++) {
        rubro_combustibles_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', (cantidad * costo_unitario), 0)) suma FROM tb_mov_item_combustibles ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
        rubro_personal_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', ((DATEDIFF(fecha_final_mov , fecha_inicio_mov)+'2' + DATEDIFF(fecha_final_demov , fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal, 0)) suma FROM tb_mov_item_personal ie, tb_rubros r, tb_personal p WHERE ie.id_rubro = r.id_rubro AND ie.id_personal = p.id AND ie.id_planeacion ='${id_planeacion}'`);
        rubro_vehiculo_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}',  ((DATEDIFF(fecha_final_gasto , fecha_inicio_gasto) +'2'+ DATEDIFF(fecha_final_gasto_standby , fecha_inicio_gasto_standby))* gasto_unitario) + ((DATEDIFF(fecha_2 ,fecha_1)+'1') * gasto_standby_unitario), 0)) suma FROM tb_mov_item_vehiculos ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
        rubro_imprevistos_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', (cantidad * costo_unitario), 0)) suma FROM tb_mov_item_imprevistos ie, tb_rubros r WHERE ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);

        var suma_rubro = rubro_combustibles_mov[0].suma + rubro_personal_mov[0].suma + rubro_vehiculo_mov[0].suma + rubro_imprevistos_mov[0].suma;
        res_rubro_mov.push(suma_rubro);
    }

    var lbl_rubro_mov = eliminateDuplicates(sigla_rubro_mov);
    var data_rubro_mov = res_rubro_mov;

    /**este es para total dinero por cada persona */
    const mov_total_personal = await pool.query(`	SELECT SUM((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2'
    + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov))*ROUND(p.salario_personal / 30)) 
+ ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *(
       ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + 
       DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30)) )) + p.bono_no_salarial_personal) AS total 
   FROM tb_mov_item_personal ie, tb_personal p 
   WHERE ie.id_personal = p.id 
   AND ie.id_planeacion = '${id_planeacion}'`);

    /**este es para total dinero por cada persona y con rubro */
    const mov_total_personal_rubro = await pool.query(`
    SELECT SUM(((( DATEDIFF(ie.fecha_final_mov , ie.fecha_inicio_mov)+ '2' + DATEDIFF(ie.fecha_final_demov , ie.fecha_inicio_demov))
    *ROUND(p.salario_personal / 30)) + p.bono_no_salarial_personal) + 
    ( ( SELECT porcentaje FROM tb_porcentaje WHERE resumen = 'PD' ) *(
            ((DATEDIFF(fecha_final_mov , fecha_inicio_mov) + 
            DATEDIFF(fecha_final_demov , fecha_inicio_demov) +'2')*ROUND(p.salario_personal / 30))))+
    (SELECT SUM(mrr.costo_unitario * mrr.cantidad ) total 
    FROM tb_mov_rubros_personal mrr
     WHERE mrr.id_planeacion = ie.id_planeacion)) AS total 
    FROM tb_mov_item_personal ie, tb_personal p , tb_mov_rubros_personal mr 
    WHERE ie.id_personal = p.id 
    AND ie.id_planeacion = '${id_planeacion}' 
    AND mr.id_planeacion = ie.id_planeacion`);

    /**este es para total dinero por cada veiculo  */
    const mov_total_vehiculos = await pool.query(`SELECT SUM(((DATEDIFF(ie.fecha_final_gasto ,ie.fecha_inicio_gasto ) + '2' + DATEDIFF(ie.fecha_final_gasto_standby ,ie.fecha_inicio_gasto_standby)) * ie.gasto_unitario) + ((DATEDIFF(ie.fecha_2 , ie.fecha_1  ) +'1') * ie.gasto_standby_unitario)) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}'`);

    /**este es para total dinero por cada veiculo esta es con rubros  */
    const mov_total_vehiculos_rubros = await pool.query(`SELECT SUM((((DATEDIFF(ie.fecha_final_gasto , ie.fecha_inicio_gasto)+ '2' + DATEDIFF(ie.fecha_final_gasto_standby , ie.fecha_inicio_gasto_standby))*ie.gasto_unitario) + (((ie.fecha_2 - ie.fecha_1)+'1') * ie.gasto_standby_unitario)) + (SELECT SUM(rvv.costo_unitario * rvv.cantidad ) total FROM tb_mov_rubros_vehiculos rvv WHERE rvv.id_planeacion = ie.id_planeacion)) AS total FROM tb_mov_item_vehiculos ie, tb_equipos e ,tb_mov_rubros_vehiculos rv WHERE ie.vehiculo = e.id_equipo AND ie.id_planeacion = '${id_planeacion}' AND rv.id_planeacion = ie.id_planeacion`);
    const mov_total_consumibles = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_item_combustibles ie WHERE ie.id_planeacion = '${id_planeacion}'`);
    const mov_total_imprevistos = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);

    const suma = mov_total_vehiculos[0].total + equipo_total_equipo_herramienta[0].total;

    const facturacion = await pool.query(`SELECT SUM(precio * cantidad) total_fac FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const costos_totales = await pool.query(`SELECT SUM(cantidad * costo_unitario) costo_total FROM tb_equipo_item_combustible WHERE confirmar = '1' AND id_planeacion = '${id_planeacion}'`);
    const imprevistos = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_equipo_item_imprevistos ie, tb_equipos e WHERE ie.id_planeacion = '${id_planeacion}'`);
    const descuento = await pool.query(`SELECT descuento FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_bruta = await pool.query(`SELECT SUM(IF(tipo != '2', cantidad * precio, 0)) utilidad_bruta FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const utilidad_neta = await pool.query(`SELECT SUM(IF(tipo = '2', (${utilidad_bruta[0].utilidad_bruta}) - ((cantidad * precio) * 0.3), 0)) utilidad_neta FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_10 = await pool.query(`SELECT SUM((precio * cantidad) * 0.1) total_fac_10 FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const gasto_admin_20 = await pool.query(`SELECT SUM((precio * cantidad) * 0.2) total_fac_20 FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);
    const sub_contratacion = [{ suma: suma }];

    const gastos = await pool.query(`SELECT ie.id_equipo_item_combustible, ie.id_planeacion ,i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_equipo_item_combustible ie, tb_item i, tb_rubros r, tb_unidad_medida u WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.confirmar = '1' AND ie.id_planeacion = '${id_planeacion}'`);
    const rent_bruta = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.tipo != '2' AND ie.id_planeacion = '${id_planeacion}'`);
    const rent_bruta_neta = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / t.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_cotizaciones t WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_cotizacion = t.id_cotizacion AND ie.id_moneda = m.id_moneda AND ie.tipo = '2' AND ie.id_planeacion = '${id_planeacion}'`);
    const suma_rent_bruta_neta = await pool.query(`SELECT SUM(IF(tipo = '2', cantidad * precio, 0)) suma FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`);

    const grafica_general = [];

    grafica_general.push(facturacion[0].total_fac, sub_contratacion[0].suma, costos_totales[0].costo_total, utilidad_bruta[0].utilidad_bruta, utilidad_neta[0].utilidad_neta, imprevistos[0].total);

    const data_general = grafica_general;

    /*****= Intl.NumberFormat().format( *****aqui se hace la conversion a los numeritos con , */
    facturacion[0].total_fac = Intl.NumberFormat().format(facturacion[0].total_fac);
    costos_totales[0].costo_total = Intl.NumberFormat().format(costos_totales[0].costo_total);
    sub_contratacion[0].suma = Intl.NumberFormat(sub_contratacion[0].suma).format();
    equipo_total_personal[0].total = Intl.NumberFormat().format(equipo_total_personal[0].total);
    imprevistos[0].total = Intl.NumberFormat().format(imprevistos[0].total);
    utilidad_bruta[0].utilidad_bruta = Intl.NumberFormat().format(utilidad_bruta[0].utilidad_bruta);
    utilidad_neta[0].utilidad_neta = Intl.NumberFormat().format(utilidad_neta[0].utilidad_neta);
    gasto_admin_10[0].total_fac_10 = Intl.NumberFormat().format(gasto_admin_10[0].total_fac_10);
    gasto_admin_20[0].total_fac_20 = Intl.NumberFormat().format(gasto_admin_20[0].total_fac_20);
    suma_rent_bruta_neta[0].suma = Intl.NumberFormat().format(suma_rent_bruta_neta[0].suma);
    equipo_total_imprevistos[0].total = Intl.NumberFormat().format(equipo_total_imprevistos[0].total);
    equipo_total_equipo_herramienta[0].total = Intl.NumberFormat().format(equipo_total_equipo_herramienta[0].total);
    equipo_total_consumible[0].total = Intl.NumberFormat().format(equipo_total_consumible[0].total);
    mov_total_personal[0].total = Intl.NumberFormat().format(mov_total_personal[0].total);
    equipo_total_personal_rubros[0].total = Intl.NumberFormat().format(equipo_total_personal_rubros[0].total);
    equipo_total_equipo_herramienta_rubro[0].total = Intl.NumberFormat().format(equipo_total_equipo_herramienta_rubro[0].total);
    mov_total_personal_rubro[0].total = Intl.NumberFormat().format(mov_total_personal_rubro[0].total);
    mov_total_vehiculos[0].total_costo = Intl.NumberFormat().format(mov_total_vehiculos[0].total_costo);
    mov_total_vehiculos_rubros[0].total = Intl.NumberFormat().format(mov_total_vehiculos_rubros[0].total);

    tb_equipo_item_imprevistos.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total_costo = Intl.NumberFormat().format(element.total_costo);
    });

    tb_equipo_item_combustible.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    tb_mov_item_personal.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
        element.bono_campo = Intl.NumberFormat().format(element.bono_campo);
    });

    tb_equipo_item_equipo_herramienta.forEach(element => {
        element.suma_gasto = Intl.NumberFormat().format(element.suma_gasto);
        element.suma_gasto_standby = Intl.NumberFormat().format(element.suma_gasto_standby);
        element.total_costo = Intl.NumberFormat().format(element.total_costo);
    });

    rent_bruta.forEach(element => {
        element.precio = Intl.NumberFormat().format(element.precio);
        element.total = Intl.NumberFormat().format(element.total);
    });

    gastos.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    /***aquiii esta consulta no le sirve el total */
    tb_mov_item_vehiculos.forEach(element => {
        element.suma_gasto = Intl.NumberFormat().format(element.suma_gasto);
        element.suma_gasto_standby = Intl.NumberFormat().format(element.suma_gasto_standby);
        element.total_costo = Intl.NumberFormat().format(element.total_costo);
    });

    costos_cotizacion.forEach(element => {
        element.precio = Intl.NumberFormat().format(element.precio);
        element.total = Intl.NumberFormat().format(element.total);
    });

    tb_equipo_item_personal.forEach(element => {
        element.costo = Intl.NumberFormat().format(element.costo);
        element.bono_salarial_personal = Intl.NumberFormat().format(element.bono_salarial_personal);
        element.total = Intl.NumberFormat().format(element.total);
    });

    /*******************************FIN DE LOS PUNTITOS */
    // Movilizacion

    tb_equipo_item_equipo_herramienta.push({
        placa_equipo: "TOTAL",
        abreviatura_unidad_medida: "",
        dias: "",
        dias_s: "",
        suma_gasto: "",
        suma_gasto_standby: "",
        total_costo: equipo_total_equipo_herramienta[0].total + "COP",
        abreviatura_moneda: "",
        id_equipo_item_equipo_herramienta: "",
        id_planeacion: ""
    }, {
        placa_equipo: "TOTAL CON RUBROS",
        abreviatura_unidad_medida: "",
        dias: "",
        dias_s: "",
        suma_gasto: "",
        suma_gasto_standby: "",
        total_costo: equipo_total_equipo_herramienta_rubro[0].total + "COP",
        abreviatura_moneda: "",
        id_equipo_item_equipo_herramienta: "",
        id_planeacion: ""
    });

    tb_equipo_item_personal.push({
        nombre_cargo: "TOTAL",
        nombre_personal: "",
        apellido_personal: "",
        abreviatura_unidad_medida: "",
        dias: "",
        costo: "",
        bono_salarial_personal: "",
        total: equipo_total_personal[0].total,
        abreviatura_moneda: "COP",
        id_equipo_item_personal: "",
        id_planeacion: ""
    }, {
        nombre_cargo: "TOTAL CON RUBROS",
        nombre_personal: "",
        apellido_personal: "",
        abreviatura_unidad_medida: "",
        dias: "",
        costo: "",
        bono_salarial_personal: "",
        total: equipo_total_personal_rubros[0].total,
        abreviatura_moneda: "COP",
        id_equipo_item_personal: "",
        id_planeacion: ""
    });

    /* tb_equipo_item_combustible.push(
        {
            descripcion_item: "TOTAL",
            sigla_rubro: "",
            abreviatura_unidad_medida: "",
            cantidad: "",
            costo_unitario: "",
            medio_pago: "",
            total: equipo_total_consumible[0].total,
            id_equipo_item_combustible: "",
            id_planeacion: "",
        }
    ); */

    res.render('planeacion/planeacion-datos', {
        facturacion: facturacion,
        costos_totales: costos_totales,
        imprevistos: imprevistos,
        descuento: descuento,
        utilidad_bruta: utilidad_bruta,
        utilidad_neta: utilidad_neta,
        gasto_admin_10: gasto_admin_10,
        gasto_admin_20: gasto_admin_20,
        sub_contratacion: sub_contratacion,
        gastos: gastos,
        rent_bruta: rent_bruta,
        rent_bruta_neta: rent_bruta_neta,
        suma_rent_bruta_neta: suma_rent_bruta_neta,
        tb_equipo_item_equipo_herramienta: tb_equipo_item_equipo_herramienta,
        tb_equipo_item_personal: tb_equipo_item_personal,
        tb_equipo_item_combustible: tb_equipo_item_combustible,
        tb_equipo_item_imprevistos: tb_equipo_item_imprevistos,
        data_equipo_cntl_mov_subcontado: JSON.stringify(control_movilizacion_subcontado_equipo),
        data_mov_cntl_mov_subcontado: JSON.stringify(control_movilizacion_subcontado_mov),
        data_equipo_rubros_label: JSON.stringify(lbl_rubro_equipo),
        data_equipo_rubros: JSON.stringify(data_rubro_equipo),
        data_mov_rubros_label: JSON.stringify(lbl_rubro_mov),
        data_mov_rubros: JSON.stringify(data_rubro_mov),
        data_general: JSON.stringify(data_general),
        tb_mov_item_vehiculos: tb_mov_item_vehiculos,
        tb_mov_item_personal: tb_mov_item_personal,
        tb_mov_item_combustibles: tb_mov_item_combustibles,
        tb_mov_item_imprevistos: tb_mov_item_imprevistos,
        tipos_trabajo: tipos_trabajo,
        tipos_trabajo_planeacion: tipos_trabajo_planeacion,
        pozos: pozos,
        pozos_planeacion: pozos_planeacion,
        unidad_medida: unidad_medida,
        monedas: monedas,
        cotizacion: cotizacion,
        costos_cotizacion: costos_cotizacion,
        mod_planeacion: mod_planeacion,
        personal_supervisor_planeacion: personal_supervisor_planeacion,
        clientes: clientes,
        personal: personal,
        centro_costos: centro_costos,
        contratos: contratos,
        campos: campos,
        equipo_total_equipo_herramienta_rubro: equipo_total_equipo_herramienta_rubro[0].total,
        equipo_total_equipo_herramienta: equipo_total_equipo_herramienta,
        equipo_total_personal: equipo_total_personal,
        equipo_total_consumible: equipo_total_consumible,
        equipo_total_imprevistos: equipo_total_imprevistos,
        equipo_total_personal_rubros: equipo_total_personal_rubros[0].total,
        mov_total_personal_rubro: mov_total_personal_rubro[0].total,
        mov_total_personal: mov_total_personal,
        mov_total_vehiculos: mov_total_vehiculos,
        mov_total_vehiculos_rubros: mov_total_vehiculos_rubros[0].total,
        mov_total_consumibles: mov_total_consumibles,
        mov_total_imprevistos: mov_total_imprevistos,
        consulta: consulta[0],
        position: position
    });
});

router.post('/agregarTipoTrabajo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_tipo_trabajo
    } = req.body;
    const datos = req.body;

    if (id_tipo_trabajo == '') {
        req.flash('error', 'El campo tipo de trabajo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

    await pool.query("INSERT INTO tb_tipo_trabajo_planeacion SET ?", [datos]);
    req.flash('success', 'Tipo de trabajo agregado');
    res.redirect(`/info-planeacion/${id_planeacion}`);
});

router.get('/eliminarTipoTrabajo/:id_tipo_trabajo_planeacion/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_tipo_trabajo_planeacion,
        id_planeacion
    } = req.params;

    await pool.query("DELETE FROM tb_tipo_trabajo_planeacion WHERE id_tipo_trabajo_planeacion = ?", [id_tipo_trabajo_planeacion]);
    req.flash('success', 'Tipo de trabajo eliminado');
    res.redirect(`/info-planeacion/${id_planeacion}`);
});

router.post('/agregarPozo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_pozo
    } = req.body;
    const datos = req.body;

    if (id_pozo == '') {
        req.flash('error', 'El campo pozo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

    await pool.query("INSERT INTO tb_pozos_planeacion SET ?", [datos]);
    req.flash('success', 'Pozo agregado');
    res.redirect(`/info-planeacion/${id_planeacion}`);
});

router.get('/eliminarPozo/:id_pozo_planeacion/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_pozo_planeacion,
        id_planeacion
    } = req.params;

    await pool.query("DELETE FROM tb_pozos_planeacion WHERE id_pozo_planeacion = ?", [id_pozo_planeacion]);
    req.flash('success', 'Pozo eliminado');
    res.redirect(`/info-planeacion/${id_planeacion}`);
});

router.get('/eliminarPlaneacion/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;

    await pool.query("DELETE FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    req.flash('success', 'Planeacion eliminada');
    res.redirect("/planeacion");
});

router.get('/equipo/equipos-herramientas/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const tipo_equipo_herramienta = await pool.query("SELECT id_tipo_equipo_herramienta ,nombre_equipo_herramienta FROM tb_tipo_equipos_herramientas");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
    const vehiculo_carga = await pool.query("SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos");

    res.render('planeacion/Equipo/Equipos-herramientas', {
        planeacion: consulta[0].id_planeacion,
        consulta: consulta,
        tipo_equipo_herramienta: tipo_equipo_herramienta,
        unidad_medida: unidad_medida,
        monedas: monedas,
        rubros: rubros,
        vehiculo_carga: vehiculo_carga,
        position: position
    });
});

router.post('/equipo/equipos-herramientas/agregar/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        position, id_planeacion, vehiculo, carga, id_unidad_medida, gasto_unitario,
        fecha_inicio_gasto_standby, fecha_final_gasto, id_rubro, costo_unitario_rubro,
        id_moneda, medio_pago, observaciones
    } = req.body;

    if (fecha_inicio_gasto_standby == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (fecha_final_gasto == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (vehiculo == '') {
        req.flash('error', 'El campo vehiculo esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (carga == '') {
        req.flash('error', 'El campo carga esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (gasto_unitario == '') {
        req.flash('error', 'El campo gasto esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (observaciones == '') {
        req.flash('error', 'El campo observaciones esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/equipos-herramientas/${id_planeacion}/${position}`);
    }

    await pool.query(`INSERT INTO tb_equipo_item_equipo_herramienta (id_planeacion,vehiculo,carga,id_unidad_medida,id_rubro,id_moneda,medio_pago,costo_unitario,observaciones,gasto_unitario,fecha_inicio_gasto_standby,fecha_final_gasto)
    VALUES('${id_planeacion}','${vehiculo}','${carga}','${id_unidad_medida}','${id_rubro}','${id_moneda}','${medio_pago}','${costo_unitario_rubro}','${observaciones}','${gasto_unitario}','${fecha_inicio_gasto_standby}','${fecha_final_gasto}')`);

    const id = await pool.query(`SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta`);

    var array = [];

    for (var ids of id) {
        array.push(ids.id_equipo_item_equipo_herramienta);
    }

    //await pool.query(`INSERT INTO tb_equipo_item_combustible (id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_equipo_item_equipo_herramienta)
    //VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}')`);

    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/equipos-herramientas/modificar/:id_equipo_item_equipo_herramienta', isLoggedIn, async (req, res) => {

    const { id_equipo_item_equipo_herramienta } = req.params;

    const consulta = await pool.query(`SELECT * FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);

    const vehiculo_carga = await pool.query(`SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos WHERE id_equipo = '${consulta[0].vehiculo}'`);
    const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida WHERE id_unidad_medida = '${consulta[0].id_unidad_medida}'`);
    const rubro = await pool.query(`SELECT id_rubro, sigla_rubro FROM tb_rubros WHERE id_rubro = '${consulta[0].id_rubro}'`);
    const moneda = await pool.query(`SELECT id_moneda, abreviatura_moneda FROM tb_monedas WHERE id_moneda = '${consulta[0].id_moneda}'`);
    const medio_pago = await pool.query(`SELECT medio_pago FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const c_u_rubro = await pool.query(`SELECT costo_unitario FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const observaciones = await pool.query(`SELECT observaciones FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const gasto = await pool.query(`SELECT gasto_unitario FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const f_mov = await pool.query(`SELECT DATE_FORMAT(fecha_inicio_gasto, '%Y-%m-%d') fecha_inicio_gasto, DATE_FORMAT(fecha_final_gasto, '%Y-%m-%d') fecha_final_gasto FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);

    res.render('planeacion/Equipo/Equipos-herramientas-modificar', {
        vehiculo_carga: vehiculo_carga,
        unidad_medida: unidad_medida,
        rubro: rubro,
        moneda: moneda,
        medio_pago: medio_pago,
        c_u_rubro: c_u_rubro,
        observaciones: observaciones,
        gasto: gasto,
        f_mov: f_mov,
        consulta: consulta
    });
});

router.post('/actualizarEquipo_Equipo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_equipo_item_equipo_herramienta,
        f_i_gs,
        f_f_gs,
        c_u_gs
    } = req.body;
    const datos = req.body;

    // seguir

    if (f_i_gs == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/equipo/equipos-herramientas/modificar/${id_equipo_item_equipo_herramienta}`);
    }
    if (f_f_gs == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/equipo/equipos-herramientas/modificar/${id_equipo_item_equipo_herramienta}`);
    }
    if (c_u_gs == '') {
        req.flash('error', 'El campo gasto standby esta vacio');
        res.redirect(`/equipo/equipos-herramientas/modificar/${id_equipo_item_equipo_herramienta}`);
    }

    await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET gasto_standby_unitario = '${c_u_gs}', fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.get('/equipo/equipos-herramientas/eliminar/:id_equipo_item_equipo_herramienta/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_item_equipo_herramienta, id_planeacion, position } = req.params;
    req.flash('success', 'Item eliminado');
    await pool.query("DELETE FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = ?", [id_equipo_item_equipo_herramienta]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_planeacion, position } = req.params;
    const cargos = await pool.query("SELECT id_cargo, nombre_cargo FROM tb_cargos");

    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");
    const tipo_asignacion = await pool.query("SELECT id_tipo_asignacion, descripcion FROM tb_tipo_asignacion");

    res.render('planeacion/Equipo/Personal', {
        id_planeacion: id_planeacion,
        cargos: cargos,
        unidad_medida: unidad_medida,
        rubros: rubros,
        monedas: monedas,
        tipo_asignacion: tipo_asignacion,
        position: position
    });
});
/************************************************************************/
/*************API */

router.post('/personal/cargos', isLoggedIn, async (req, res) => {
    const { id_cargo } = req.body;

    const personal = await pool.query(`SELECT * FROM tb_cargos car , tb_personal pr WHERE pr.id_cargo = car.id_cargo AND  car.id_cargo =${id_cargo}`);

    res.send({ resp: personal });
});

router.post('/personal/clientes/agregar', isLoggedIn, async (req, res) => {
    const { id_cliente } = req.body;

    const clientes = await pool.query(`SELECT * FROM  tb_clientes WHERE id_cliente=${id_cliente}`);

    res.send({ contacto: clientes[0] });
});

/************************************************************************/

router.get('/equipo/personal/pausar/:id_equipo_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_personal,
        id_planeacion
    } = req.params;

    const date = new Date();

    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_final_mov = '${date.toISOString()}' WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.get('/equipo/equipos-herramientas/pausar/:id_equipo_item_equipo_herramienta/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_equipo_herramienta,
        id_planeacion
    } = req.params;

    const date = new Date();

    await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_final_gasto = '${date.toISOString()}' WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/equipo/personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const { dato } = req.body;

    const cargos = await pool.query("SELECT id_cargo, nombre_cargo FROM tb_cargos");
    const personal = await pool.query("SELECT id, nombre_personal, apellido_personal FROM tb_personal");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const cargo_personal = await pool.query(`SELECT c.id_cargo, c.nombre_cargo, p.nombre_personal, p.apellido_personal, p.id FROM tb_cargos c, tb_personal p WHERE c.id_personal = p.id AND c.id_cargo = '${req.body.dato}'`);
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");
    const tipo_asignacion = await pool.query("SELECT id_tipo_asignacion, descripcion FROM tb_tipo_asignacion");

    res.render('planeacion/Equipo/Personal', {
        consulta: consulta,
        cargos: cargos,
        personal: personal,
        unidad_medida: unidad_medida,
        cargo_personal: cargo_personal,
        rubros: rubros,
        monedas: monedas,
        tipo_asignacion: tipo_asignacion
    });
});
/***** tokennnn *****/
router.post('/movilizacion/personal/agregar/:id_planeacion', isLoggedIn, async (req, res) => {
    var {
        id_cargo, id_planeacion, id_personal, id_unidad_medida, fecha_inicio_mov, fecha_final_mov,
        fecha_inicio_demov, fecha_final_demov, cantidad, medio_pago, costo_unitario_rubro, id_moneda,
        id_rubro, id_equipo, id_tipo_asignacion, position
    } = req.body;

    const datos = req.body;

    if (id_cargo == '') {
        req.flash('error', 'El campo cargo esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_equipo == '') {
        req.flash('error', 'El campo equipo esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (id_tipo_asignacion == '') {
        req.flash('error', 'El campo tipo de asignacion esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (fecha_inicio_mov == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (fecha_final_mov == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio pago esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}/${position}`);
    }

    const persona = await pool.query(`SELECT salario_personal FROM tb_personal WHERE id = '${id_personal}'`);
    const dias = await pool.query(`SELECT DATEDIFF('${fecha_final_mov}','${fecha_inicio_mov}')AS dias`);
    const dias1 = await pool.query(`SELECT DATEDIFF('${fecha_final_demov}','${fecha_inicio_demov}')AS dias`);

    let diastotal = dias[0].dias + dias1[0].dias + 2;

    req.body.cantidad = diastotal;
    req.body.total = persona[0].salario_personal / 30 * diastotal;

    delete datos.position;

    await pool.query("INSERT INTO tb_mov_item_personal SET ?", [datos]);
    const consulta_id = await pool.query("SELECT id_mov_item_personal FROM tb_mov_item_personal");
    let array = [];

    for (let ids of consulta_id) array.push(ids.id_mov_item_personal);

    await pool.query(`INSERT INTO tb_equipo_item_personal(id_planeacion,id_cargo,medio_pago,id_personal,id_unidad_medida,id_moneda,cantidad,costo,costo_unitario_rubro,id_rubro,id_mov_item_personal,fecha_inicio_mov,fecha_final_mov,fecha_inicio_demov,fecha_final_demov,id_tipo_asignacion) VALUES('${id_planeacion}','${id_cargo}','${medio_pago}','${id_personal}','${id_unidad_medida}','${id_moneda}','${cantidad}','${persona[0].salario_personal / 30}','${costo_unitario_rubro}','${id_rubro}','${array[array.length - 1]}','${fecha_inicio_mov}','${fecha_final_mov}','${fecha_inicio_demov}','${fecha_final_demov}','${id_tipo_asignacion}')`);
    const consulta_id_personal = await pool.query("SELECT id_equipo_item_personal FROM tb_equipo_item_personal");
    let array2 = [];
    for (var ids of consulta_id_personal) array2.push(ids.id_equipo_item_personal);
    //await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_mov_item_personal)
    //VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}')`);

    //await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_mov_item_personal,id_equipo_item_personal)
    //VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}','${array2[array2.length - 1]}')`);
    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.post('/equipo/personal/agregar/:id_planeacion', isLoggedIn, async (req, res) => {
    const {
        id_cargo, id_personal, id_unidad_medida, fecha_final_mov, position,
        id_moneda, cantidad, id_rubro, costo_unitario_rubro, medio_pago, id_tipo_asignacion, fecha_inicio_demov
    } = req.body;
    let { costo } = req.body;
    const { id_planeacion } = req.params;

    if (id_cargo == '') {
        req.flash('error', 'El campo cargo esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (id_personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (fecha_final_mov == '') {
        req.flash('error', 'El campo fecha final movilizacion esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    if (id_tipo_asignacion == '') {
        req.flash('error', 'El campo asignacion esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}/${position}`);
    }
    const persona = await pool.query(`SELECT salario_personal FROM tb_personal WHERE id = '${id_personal}'`);
    console.log(persona);

    costo = persona[0].salario_personal / 30;
    console.log(costo);
    const datos = {
        id_planeacion, fecha_inicio_demov, id_cargo, id_personal, id_unidad_medida, fecha_final_mov,
        id_moneda, cantidad, id_rubro, costo_unitario_rubro, medio_pago, id_tipo_asignacion, costo
    };

    delete datos.position;

    await pool.query("INSERT INTO tb_equipo_item_personal SET ?", [datos]);

    const id = await pool.query(`SELECT id_equipo_item_personal FROM tb_equipo_item_personal`);

    let array = [];

    for (var ids of id) array.push(ids.id_equipo_item_personal);

    //await pool.query(`INSERT INTO tb_equipo_item_combustible (id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_equipo_item_personal)
    //VALUES ('${id_planeacion}', '1', '${id_rubro}', '${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}')`);

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/personal/modificar/:id_equipo_item_personal', isLoggedIn, async (req, res) => {

    const { id_equipo_item_personal } = req.params;

    const consulta = await pool.query(`SELECT * FROM tb_equipo_item_personal WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);

    const cargo = await pool.query(`SELECT nombre_cargo FROM tb_cargos WHERE id_cargo = '${consulta[0].id_cargo}'`);
    const personal = await pool.query(`SELECT nombre_personal, apellido_personal FROM tb_personal WHERE id = '${consulta[0].id_personal}'`);
    const unidad_medida = await pool.query(`SELECT abreviatura_unidad_medida FROM tb_unidad_medida WHERE id_unidad_medida = '${consulta[0].id_unidad_medida}'`);
    const moneda = await pool.query(`SELECT abreviatura_moneda FROM tb_monedas WHERE id_moneda = '${consulta[0].id_moneda}'`);
    const c_u_rubro = await pool.query(`SELECT costo_unitario_rubro FROM tb_equipo_item_personal WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);
    const medio_pago = await pool.query(`SELECT medio_pago FROM tb_equipo_item_personal WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);
    const rubro = await pool.query(`SELECT sigla_rubro FROM tb_rubros WHERE id_rubro = '${consulta[0].id_rubro}'`);
    const f_mov = await pool.query(`SELECT DATE_FORMAT(fecha_inicio_mov, '%Y-%m-%d') fecha_inicio_mov, DATE_FORMAT(fecha_final_mov, '%Y-%m-%d') fecha_final_mov FROM tb_equipo_item_personal WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);
    const tipo_asignacion = await pool.query(`SELECT descripcion FROM tb_tipo_asignacion WHERE id_tipo_asignacion = '${consulta[0].id_tipo_asignacion}'`);

    res.render('planeacion/Equipo/Personal-modificar', {
        cargo: cargo,
        personal: personal,
        unidad_medida: unidad_medida,
        moneda: moneda,
        c_u_rubro: c_u_rubro,
        medio_pago: medio_pago,
        rubro: rubro,
        f_mov: f_mov,
        consulta: consulta,
        tipo_asignacion: tipo_asignacion
    });
});

router.post('/actualizarPersonal_Equipo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_equipo_item_personal,
        f_i_dm,
        f_f_dm
    } = req.body;
    const datos = req.body;

    if (f_i_dm == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/equipo/personal/modificar/${id_equipo_item_personal}`);
    }
    if (f_f_dm == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/equipo/personal/modificar/${id_equipo_item_personal}`);
    }

    await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);
    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.get('/equipo/personal/eliminar/:id_equipo_item_personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_item_personal, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_equipo_item_personal WHERE id_equipo_item_personal = ?", [id_equipo_item_personal]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/combustibles/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const items = await pool.query("SELECT id_item, descripcion_item FROM tb_item");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Equipo/Combustibles', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        items: items,
        consulta: consulta[0],
        monedas: monedas,
        position: position
    });
});

router.post('/equipo/combustibles/agregar', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_item, id_rubro, id_unidad_medida, cantidad,
        costo_unitario, medio_pago, id_moneda, confirma, position
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    if (confirma == '') {
        req.flash('error', 'El campo confirma esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}/${position}`);
    }
    await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,id_moneda,medio_pago,confirmar) VALUES('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${id_moneda}','${medio_pago}','${confirma}')`);
    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/combustibles/eliminar/:id_equipo_item_combustible/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_item_combustible, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_equipo_item_combustible WHERE id_equipo_item_combustible = ?", [id_equipo_item_combustible]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/imprevistos/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Equipo/Imprevistos', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta[0],
        monedas: monedas,
        position: position
    });
});

router.post('/equipo/imprevistos/agregar', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, descripcion, fecha_imprevisto, id_rubro, id_unidad_medida,
        cantidad, id_moneda, costo_unitario, medio_pago, position
    } = req.body;

    const datos = req.body;

    if (descripcion == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (fecha_imprevisto == '') {
        req.flash('error', 'El campo fecha imprevisto esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}/${position}`);
    }

    delete datos.position;

    await pool.query("INSERT INTO tb_equipo_item_imprevistos SET ?", [datos]);
    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/equipo/imprevistos/eliminar/:id_equipo_item_imprevisto/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_item_imprevisto, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_equipo_item_imprevistos WHERE id_equipo_item_imprevisto = ?", [id_equipo_item_imprevisto]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/combustibles/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const items = await pool.query("SELECT id_item, descripcion_item FROM tb_item");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Combustibles', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        items: items,
        monedas: monedas,
        consulta: consulta[0],
        position: position
    });
});

router.post('/movilizacion/combustibles/agregar', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_item, id_rubro, id_moneda, id_unidad_medida, cantidad, costo_unitario,
        medio_pago, confirma, position
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}/${position}`);
    }

    await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,id_moneda,medio_pago,confirmar) VALUES('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${id_moneda}','${medio_pago}','${confirma}')`);
    await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,id_moneda,medio_pago,confirmar) VALUES('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${id_moneda}','${medio_pago}','${confirma}')`);
    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/combustibles/eliminar/:id_mov_item_combustible/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_combustible, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_mov_item_combustibles WHERE id_mov_item_combustible = ?", [id_mov_item_combustible]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/imprevistos/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Imprevistos', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta[0],
        monedas: monedas,
        position: position
    });
});

router.post('/movilizacion/imprevistos/agregar', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, descripcion, fecha_imprevisto, id_rubro, id_unidad_medida, id_moneda,
        cantidad, costo_unitario, medio_pago, position
    } = req.body;

    if (descripcion == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (fecha_imprevisto == '') {
        req.flash('error', 'El campo fecha imprevisto esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}/${position}`);
    }

    const datos = req.body;

    delete datos.position;

    await pool.query("INSERT INTO tb_mov_item_imprevistos SET ?", [datos]);
    const consulta_id = await pool.query("SELECT id_mov_item_imprevisto FROM tb_mov_item_imprevistos");
    let array = [];
    for (var ids of consulta_id) array.push(ids.id_mov_item_imprevisto);
    await pool.query(`INSERT INTO tb_equipo_item_imprevistos(id_planeacion,descripcion,id_moneda,fecha_imprevisto,id_rubro,id_unidad_medida,cantidad,costo_unitario,id_mov_item_imprevisto,medio_pago) VALUES ('${id_planeacion}','${descripcion}','${id_moneda}','${fecha_imprevisto}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${array[array.length - 1]}','${medio_pago}')`);

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/imprevistos/agregar/:id_mov_item_imprevisto', isLoggedIn, async (req, res) => {
    const { id_mov_item_imprevisto } = req.params;
    res.render('planeacion/Imprevistos/inicio');
});

router.get('/movilizacion/imprevistos/eliminar/:id_mov_item_imprevisto/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_imprevisto, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_mov_item_imprevistos WHERE id_mov_item_imprevisto = ?", [id_mov_item_imprevisto]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const { dato } = req.body;

    const cargos = await pool.query("SELECT id_cargo, nombre_cargo FROM tb_cargos");
    const personal = await pool.query("SELECT id,nombre_personal,apellido_personal FROM tb_personal");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const tipo_asignacion = await pool.query("SELECT id_tipo_asignacion, descripcion FROM tb_tipo_asignacion");
    const placa = await pool.query("SELECT id_equipo, placa_equipo FROM tb_equipos");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Personal', {
        cargos: cargos,
        personal: personal,
        unidad_medida: unidad_medida,
        rubros: rubros,
        tipo_asignacion: tipo_asignacion,
        placa: placa,
        monedas: monedas,
        id_planeacion: id_planeacion,
        position: position
    });
});

router.get('/movilizacion/personal/pausar/:id_mov_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_personal,
        id_planeacion
    } = req.params;

    const date = new Date();

    await pool.query(`UPDATE tb_mov_item_personal SET fecha_final_mov = '${date.toISOString()}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_final_mov = '${date.toISOString()}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/movilizacion/personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const cargos = await pool.query("SELECT id_cargo, nombre_cargo FROM tb_cargos");
    const personal = await pool.query("SELECT id,nombre_personal,apellido_personal FROM tb_personal");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const tipo_asignacion = await pool.query("SELECT id_tipo_asignacion, descripcion FROM tb_tipo_asignacion");
    const placa = await pool.query("SELECT id_equipo, placa_equipo FROM tb_equipos");
    const cargo_personal = await pool.query(`SELECT c.id_cargo, c.nombre_cargo, p.nombre_personal, p.apellido_personal, p.id FROM tb_cargos c, tb_personal p WHERE c.id_personal = p.id AND c.id_cargo = '${req.body.dato}'`);
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Personal', {
        cargos: cargos,
        personal: personal,
        unidad_medida: unidad_medida,
        rubros: rubros,
        tipo_asignacion: tipo_asignacion,
        placa: placa,
        consulta: consulta,
        cargo_personal: cargo_personal,
        monedas: monedas
    });
});

router.post('/calcularPersonal_mov', isLoggedIn, async (req, res) => {
    const { id_planeacion, cal_m, cal_dm, verifica, position } = req.body;
    const datos = req.body;

    if (cal_m != undefined) {
        const { f_i_mov, f_f_mov } = req.body;

        let fe_i_mov = new Date(f_i_mov);
        let fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        if (fe_i_mov > fe_f_mov) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
        }
    } else if (cal_dm != undefined) {
        const { f_i_dm, f_f_dm } = req.body;

        let fe_i_dm = new Date(f_i_dm);
        let fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
        }
    }
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.post('/calcularPersonal_Equipo', isLoggedIn, async (req, res) => {
    const { id_planeacion, cal_m, verifica, position, f_i_dm, f_f_mov } = req.body;
    if (cal_m && verifica) {
        if (f_i_dm == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }
        if (typeof verifica != "string") {
            for (var i = 0; i <= verifica.length; i++) await pool.query(`UPDATE tb_equipo_item_personal SET    fecha_inicio_demov= '${f_i_dm}', fecha_final_mov = '${f_f_mov}' WHERE id_equipo_item_personal = '${verifica[i]}'`);
        } else await pool.query(`UPDATE tb_equipo_item_personal SET    fecha_inicio_demov= '${f_i_dm}', fecha_final_mov = '${f_f_mov}' WHERE id_equipo_item_personal = '${verifica}'`);
    }
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/personal/modificar/:id_mov_item_personal', isLoggedIn, async (req, res) => {

    const { id_mov_item_personal } = req.params;

    const consulta = await pool.query(`SELECT * FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    const cargo = await pool.query(`SELECT c.nombre_cargo FROM tb_cargos c, tb_mov_item_personal ie WHERE c.id_cargo = ie.id_cargo AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const personal = await pool.query(`SELECT p.nombre_personal, p.apellido_personal FROM tb_personal p, tb_mov_item_personal ie WHERE p.id = ie.id_personal AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const unidad_medida = await pool.query(`SELECT u.nombre_unidad_medida FROM tb_unidad_medida u ,tb_mov_item_personal ie WHERE u.id_unidad_medida = ie.id_unidad_medida AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const moneda = await pool.query(`SELECT m.abreviatura_moneda FROM tb_monedas m, tb_mov_item_personal ie WHERE m.id_moneda = ie.id_moneda AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const medio_pago = await pool.query(`SELECT medio_pago FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    const rubro = await pool.query(`SELECT r.sigla_rubro FROM tb_rubros r ,tb_mov_item_personal ie WHERE r.id_rubro = ie.id_rubro AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const vehiculo = await pool.query(`SELECT e.placa_equipo FROM tb_equipos e ,tb_mov_item_personal ie WHERE e.id_equipo = ie.id_equipo AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const tipo_asignacion = await pool.query(`SELECT a.descripcion FROM tb_tipo_asignacion a ,tb_mov_item_personal ie WHERE a.id_tipo_asignacion = ie.id_tipo_asignacion AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const f_mov = await pool.query(`SELECT DATE_FORMAT(fecha_inicio_mov, '%Y-%m-%d') fecha_inicio_mov, DATE_FORMAT(fecha_final_mov, '%Y-%m-%d') fecha_final_mov FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    const c_u_rubro = await pool.query(`SELECT costo_unitario_rubro FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    res.render('planeacion/Movilizacion/Personal-modificar', {
        cargo: cargo,
        personal: personal,
        unidad_medida: unidad_medida,
        moneda: moneda,
        medio_pago: medio_pago,
        rubro: rubro,
        vehiculo: vehiculo,
        tipo_asignacion: tipo_asignacion,
        f_mov: f_mov,
        consulta: consulta,
        c_u_rubro: c_u_rubro
    });
});

router.post('/actualizarPersonal_mov', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_personal,
        id_planeacion,
        f_i_dm,
        f_f_dm
    } = req.body;
    const datos = req.body;

    if (f_i_dm == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/personal/modificar/${id_mov_item_personal}`);
    }
    if (f_f_dm == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/personal/modificar/${id_mov_item_personal}`);
    }

    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_1 = '${f_i_dm}', fecha_2 = '${f_f_dm}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_dm}', fecha_2 = '${f_f_dm}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.get('/movilizacion/personal/fecha_demov/:id_mov_item_personal', isLoggedIn, async (req, res) => {

    const { id_mov_item_personal } = req.params;

    const consulta = await pool.query(`SELECT id_mov_item_personal, id_planeacion FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    res.render('planeacion/fecha-demov', {
        consulta: consulta
    });
});

router.post('/actualizarFechas_demov', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_mov_item_personal,
        fecha_inicio_demov,
        fecha_final_demov
    } = req.body;
    const datos = req.body;

    if (fecha_inicio_demov == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/personal/fecha_demov/${id_mov_item_personal}`);
    }
    if (fecha_final_demov == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/personal/fecha_demov/${id_mov_item_personal}`);
    }

    var dia = new Date(fecha_inicio_demov);
    var dia2 = new Date(fecha_final_demov);

    var d = Date.parse(dia) / 86400000;
    var e = Date.parse(dia2) / 86400000;

    var dias = e - d;

    await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_demov = '${fecha_inicio_demov}', fecha_final_demov = '${fecha_final_demov}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${fecha_inicio_demov}', fecha_final_demov = '${fecha_final_demov}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    res.redirect(`planeacion/graficas/${id_planeacion}`);
});

router.get('/movilizacion/personal/eliminar/:id_mov_item_personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_personal, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_mov_item_personal WHERE id_mov_item_personal = ?", [id_mov_item_personal]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/vehiculos/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_planeacion, position } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
    const vehiculo_carga = await pool.query("SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Vehiculos', {
        vehiculo_carga: vehiculo_carga,
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta[0],
        monedas: monedas,
        position: position
    });
});

router.get('/movilizacion/vehiculos/pausar/:id_mov_item_vehiculo/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_vehiculo,
        id_planeacion
    } = req.params;

    const date = new Date();

    await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_final_gasto = '${date.toISOString()}' WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/calcularVehiculos_mov', isLoggedIn, async (req, res) => {
    const { id_planeacion, cal_m, cal_dm, cal_gs, verifica, position } = req.body;
    const datos = req.body;

    if (cal_m != undefined) {
        const { f_i_mov, f_f_mov } = req.body;

        let fe_i_mov = new Date(f_i_mov);
        let fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }
        if (fe_i_mov >= fe_f_mov) {
            req.flash('error', 'La fecha de inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (let i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }
    } else if (cal_dm != undefined) {
        const { f_i_dm, f_f_dm } = req.body;

        let fe_i_dm = new Date(f_i_dm);
        let fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }
        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha de inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (let i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }
    } else if (cal_gs != undefined) {
        const { f_i_gs, f_f_gs, c_u_gs } = req.body;

        let fe_i_gs = new Date(f_i_gs);
        let fe_f_gs = new Date(f_f_gs);

        if (f_i_gs == '' || f_f_gs == '' || c_u_gs == '') {
            req.flash('error', 'Error en las fechas de gasto standby');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }
        if (fe_i_gs > fe_f_gs) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (let i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', gasto_standby_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', gasto_standby_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }
    }
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.post('/calcularVehiculos_Equipo', isLoggedIn, async (req, res) => {

    const {
        position,
        id_planeacion,
        verifica,
        cal_dm,
        cal_gs
    } = req.body;

    console.log(req.body);
    if (cal_dm != undefined) {

        const {
            f_i_dm,
            f_f_mov
        } = req.body;

        if (f_i_dm == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }
        if (f_i_dm > f_f_mov) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_final_gasto = '${f_f_mov}', fecha_inicio_gasto_standby = '${f_i_dm}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto_standby = '${f_i_mov}', fecha_final_gasto_standby = '${f_f_mov}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
        }
    } else if (cal_gs != undefined) {

        const {
            f_i_gs,
            f_f_gs,
            c_u_gs
        } = req.body;

        var fe_i_gs = new Date(f_i_gs);
        var fe_f_gs = new Date(f_f_gs);

        if (f_i_gs == '' || f_f_gs == '' || c_u_gs == '') {
            req.flash('error', 'Error en las fechas de gasto standby');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        if (f_i_gs > f_f_gs) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', gasto_standby_unitario = '${c_u_gs}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
            //await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}',  = '${c_u_gs}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
        }
    }
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/vehiculos/gasto_standby/:id_mov_item_vehiculo', isLoggedIn, async (req, res) => {

    const { id_mov_item_vehiculo } = req.params;

    const consulta = await pool.query(`SELECT * FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);

    console.log(consulta);

    const vehiculo_carga = await pool.query(`SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos WHERE id_equipo = '${consulta[0].vehiculo}'`);
    const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida WHERE id_unidad_medida = '${consulta[0].id_unidad_medida}'`);
    const rubros = await pool.query(`SELECT id_rubro,sigla_rubro FROM tb_rubros WHERE id_rubro = '${consulta[0].id_rubro}'`);
    const monedas = await pool.query(`SELECT id_moneda, abreviatura_moneda FROM tb_monedas WHERE id_moneda = '${consulta[0].id_moneda}'`);
    const gasto_unitario = await pool.query(`SELECT gasto_unitario FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const medio_pago = await pool.query(`SELECT medio_pago FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const observaciones = await pool.query(`SELECT observaciones FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const f_mov = await pool.query(`SELECT DATE_FORMAT(fecha_inicio_gasto, '%Y-%m-%d') fecha_inicio_gasto, DATE_FORMAT(fecha_final_gasto, '%Y-%m-%d') fecha_final_gasto FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const c_u_rubro = await pool.query(`SELECT costo_unitario_rubro FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);

    res.render('planeacion/Movilizacion/Vehiculos-gs', {
        vehiculo_carga: vehiculo_carga,
        unidad_medida: unidad_medida,
        rubros: rubros,
        monedas: monedas,
        gasto_unitario: gasto_unitario,
        medio_pago: medio_pago,
        observaciones: observaciones,
        consulta: consulta,
        f_mov: f_mov,
        c_u_rubro: c_u_rubro
    });
});

router.post('/actualizar_gs', isLoggedIn, async (req, res) => {

    const {
        gasto_standby_unitario,
        id_mov_item_vehiculo,
        f_i_gs,
        f_f_gs,
        medio_pago,
        id_planeacion
    } = req.body;
    const datos = req.body;

    if (gasto_standby_unitario == '') {
        req.flash('error', 'El campo gasto standby esta vacio');
        res.redirect(`/vehiculos/gasto_standby/${id_mov_item_vehiculo}`);
    }
    if (f_i_gs == '') {
        req.flash('error', 'El campo fecha inicio gasto standby esta vacio');
        res.redirect(`/vehiculos/gasto_standby/${id_mov_item_vehiculo}`);
    }
    if (f_f_gs == '') {
        req.flash('error', 'El campo fecha final gasto standby esta vacio');
        res.redirect(`/vehiculos/gasto_standby/${id_mov_item_vehiculo}`);
    }

    await pool.query(`UPDATE tb_mov_item_vehiculos SET gasto_standby_unitario = '${gasto_standby_unitario}', fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET gasto_standby_unitario = '${gasto_standby_unitario}', fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}' WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/movilizacion/vehiculos/agregar', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, vehiculo, carga, id_unidad_medida, gasto_unitario, fecha_inicio_gasto, position,
        fecha_final_gasto, id_rubro, costo_unitario_rubro, id_moneda, medio_pago, observaciones
    } = req.body;

    const datos = req.body;

    if (fecha_inicio_gasto == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (fecha_final_gasto == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (vehiculo == '') {
        req.flash('error', 'El campo vehiculo esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (carga == '') {
        req.flash('error', 'El campo carga esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (gasto_unitario == '') {
        req.flash('error', 'El campo gasto esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (observaciones == '') {
        req.flash('error', 'El campo observaciones esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}/${position}`);
    }

    let dia1 = new Date(fecha_inicio_gasto) / 86400000;
    let dia2 = new Date(fecha_final_gasto) / 86400000;
    let dias_gasto = dia2 - dia1;

    if (dias_gasto < 0) {
        req.flash('error', 'Error en las fechas');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }

    delete datos.position;

    await pool.query("INSERT INTO tb_mov_item_vehiculos SET ?", [datos]);
    const consulta_id = await pool.query("SELECT id_mov_item_vehiculo FROM tb_mov_item_vehiculos");

    let array = [],
        array2 = [];

    for (let ids of consulta_id) array.push(ids.id_mov_item_vehiculo);

    await pool.query(`INSERT INTO tb_equipo_item_equipo_herramienta(id_planeacion,id_equipo_herramienta,vehiculo,carga,cantidad,id_moneda,id_rubro,id_mov_item_vehiculo,fecha_inicio_gasto,fecha_final_gasto,id_unidad_medida,observaciones,gasto_unitario,medio_pago,costo_unitario) VALUES ('${id_planeacion}','${carga}','${vehiculo}','${carga}','${dias_gasto}','${id_moneda}','${id_rubro}','${array[array.length - 1]}','${fecha_inicio_gasto}','${fecha_final_gasto}','${id_unidad_medida}','${observaciones}','${gasto_unitario}','${req.body.medio_pago}','${costo_unitario_rubro}')`);
    const consulta_id_vehiculo = await pool.query("SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta");

    for (var ids of consulta_id_vehiculo) array2.push(ids.id_equipo_item_equipo_herramienta);

    //await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_mov_item_vehiculo)
    //VALUES('${id_planeacion}','${vehiculo}','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}')`);

    //await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_mov_item_vehiculo,id_equipo_item_equipo_herramienta)
    //VALUES('${id_planeacion}','${vehiculo}','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}','${array2[array2.length - 1]}')`);

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/vehiculos/eliminar/:id_mov_item_vehiculo/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_vehiculo, id_planeacion, position } = req.params;
    req.flash('success', 'Item Eliminado');
    await pool.query("DELETE FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = ?", [id_mov_item_vehiculo]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.post('/agregarCotizacion', isLoggedIn, async (req, res) => {

    const {
        position,
        id_planeacion,
        titulo,
        credito,
        trm,
        consecutivo,
        descuento,
        act_cot
    } = req.body;

    if (titulo == '') {
        req.flash('error', 'El campo titulo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (consecutivo == '') {
        req.flash('error', 'El campo consecutivo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (descuento == '') {
        req.flash('error', 'El campo descuento esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (trm == '') {
        req.flash('error', 'El campo trm esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }

    if (act_cot != undefined) {

        await pool.query(`UPDATE tb_cotizaciones SET 
        titulo = '${titulo}',
        credito = '${credito}',
        trm = '${trm}',
        consecutivo = '${consecutivo}',
        descuento = '${descuento}'
        WHERE id_planeacion = '${id_planeacion}'
        `);
    } else {

        await pool.query(`INSERT INTO tb_cotizaciones (id_planeacion,titulo,credito,trm,consecutivo,descuento) 
        VALUES ('${id_planeacion}','${titulo}','${credito}','${trm}','${consecutivo}','${descuento}')`);
    }

    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.post('/cotizacion/costos', isLoggedIn, async (req, res) => {

    const {
        position,
        id_planeacion,
        id_cotizacion,
        tipo_cot,
        desc,
        cantidad,
        id_unidad_medida,
        precio,
        id_moneda
    } = req.body;
    if (tipo_cot == '') {
        req.flash('error', 'El campo tipo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (desc == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad_medida esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (precio == '') {
        req.flash('error', 'El campo precio esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }

    if (id_cotizacion == undefined) {

        console.log('Por favor crear primero la cotizacion');

        req.flash('error', 'Por favor crear primero la cotizacion');
        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    } else {

        await pool.query(`INSERT INTO tb_cotizaciones_costos (id_cotizacion,id_planeacion,tipo,descripcion,cantidad,id_unidad_medida,precio,id_moneda) 
        VALUES ('${id_cotizacion}','${id_planeacion}','${tipo_cot}','${desc}','${cantidad}','${id_unidad_medida}','${precio}','${id_moneda}')`);

        const total = cantidad * precio;
        const op = total.toString();
        let array = [];
        for (var i = 0; i <= op.length - 1; i++) {
            if (i % 3 === 0) {
                array.push(op[i]);
                array.push(',');
            } else array.push(op[i]);
        }

        for (var o = 0; o <= op.lenght - 1; o++) console.log(array[o]);

        res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
    }
});

router.get('/cotizacion/costos/eliminar/:id_cotizacion_costo/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_cotizacion_costo, id_planeacion, position } = req.params;
    await pool.query("DELETE FROM tb_cotizaciones_costos WHERE id_cotizacion_costo = ?", [id_cotizacion_costo]);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/cotizacion/costos/modificar/:id_cotizacion_costo/:position', isLoggedIn, async (req, res) => {

    const { id_cotizacion_costo, position } = req.params;

    const consulta = await pool.query(`SELECT id_cotizacion_costo, id_planeacion, descripcion, cantidad, precio FROM tb_cotizaciones_costos WHERE id_cotizacion_costo = '${id_cotizacion_costo}'`);
    const unidad_medida = await pool.query(`SELECT u.id_unidad_medida ,u.nombre_unidad_medida, u.abreviatura_unidad_medida FROM tb_cotizaciones_costos ie ,tb_unidad_medida u WHERE ie.id_cotizacion_costo = '${id_cotizacion_costo}' AND ie.id_unidad_medida = u.id_unidad_medida`);
    const unidad_medidas = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida`);
    const moneda = await pool.query(`SELECT m.id_moneda, m.abreviatura_moneda FROM tb_cotizaciones_costos ie ,tb_monedas m WHERE ie.id_cotizacion_costo = '${id_cotizacion_costo}' AND m.id_moneda = ie.id_moneda`);
    const tipo = await pool.query(`SELECT tipo FROM tb_cotizaciones_costos WHERE id_cotizacion_costo = '${id_cotizacion_costo}'`);
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/modificar-cotizacion', {
        unidad_medida: unidad_medida,
        unidad_medidas: unidad_medidas,
        moneda: moneda,
        monedas: monedas,
        tipo: tipo,
        consulta: consulta[0],
        position: position
    });
});

router.post('/cotizacion/costos/modificar', isLoggedIn, async (req, res) => {

    const {
        id_cotizacion_costo, id_planeacion, tipo, desc, cantidad, unidad_medida,
        precio, moneda, position
    } = req.body;

    if (tipo == '') {
        req.flash('error', 'El campo tipo esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }
    if (desc == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }
    if (unidad_medida == '') {
        req.flash('error', 'El campo unidad medida esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }
    if (precio == '') {
        req.flash('error', 'El campo precio esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }
    if (moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}/${position}`);
    }

    await pool.query(`UPDATE tb_cotizaciones_costos SET tipo = '${tipo}', descripcion = '${desc}', cantidad = '${cantidad}', id_unidad_medida = '${unidad_medida}', precio = '${precio}', id_moneda = '${moneda}'`);
    res.redirect(`/planeacion/graficas/${id_planeacion}/${position}`);
});

router.get('/movilizacion/personal/rubros/:id_mov_item_personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_personal, id_planeacion, position } = req.params;
    const consulta = await pool.query(`SELECT id_planeacion, id_mov_item_personal FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_mov_personal = await pool.query(`SELECT '${position}' as position, ie.id_mov_item_personal , ie.id_mov_rubro_personal, ie.id_planeacion, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_mov_rubros_personal ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const total = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_rubros_personal ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);

    res.render('planeacion/Rubros/mov-personal', {
        consulta: consulta[0],
        unidad_medida: unidad_medida,
        rubros: rubros,
        rubros_mov_personal: rubros_mov_personal,
        total: total,
        position: position
    });
});

router.post('/consultarItem/movilizacion/personal/:id_mov_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_personal,
        id_planeacion
    } = req.params;

    const {
        categoria
    } = req.body;

    const items = await pool.query(`SELECT id_item, descripcion_item FROM tb_item WHERE categoria_item = '${categoria}'`);
    const consulta = await pool.query(`SELECT id_planeacion, id_mov_item_personal FROM tb_mov_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_mov_personal = await pool.query(`SELECT ie.id_mov_rubro_personal, ie.id_planeacion, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_mov_rubros_personal ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida   AND ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);
    const total = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_rubros_personal ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_personal = '${id_mov_item_personal}'`);

    total[0].total = Intl.NumberFormat().format(total[0].total);

    rubros_mov_personal.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    res.render('planeacion/Rubros/mov-personal', {
        consulta: consulta,
        unidad_medida: unidad_medida,
        rubros: rubros,
        items: items,
        rubros_mov_personal: rubros_mov_personal,
        total: total
    });
});

router.post('/rubro/movilizacion/personal', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_mov_item_personal, id_item, id_rubro, id_unidad_medida,
        cantidad, costo_unitario, medio_pago, aplicar_ambos, position
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo_unitario esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
    }

    if (aplicar_ambos === 'true') {

        function eliminateDuplicates(arr) {
            var i,
                len = arr.length,
                out = [],
                obj = {};

            for (i = 0; i < len; i++) obj[arr[i]] = 0;
            for (i in obj) out.push(i);
            return out;
        }

        const ids = await pool.query("SELECT id_mov_item_personal FROM tb_mov_item_personal");

        let array = [];

        for (let id of ids) array.push(id.id_mov_item_personal);

        for (var i = 0; i <= eliminateDuplicates(array).length - 1; i++) {
            await pool.query(`INSERT INTO tb_mov_rubros_personal(id_mov_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${eliminateDuplicates(array)[i]}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            const consulta = await pool.query(`SELECT id_equipo_item_personal FROM tb_equipo_item_personal WHERE id_mov_item_personal = '${eliminateDuplicates(array)[i]}'`);
            await pool.query(`INSERT INTO tb_equipo_rubros_personal(id_equipo_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${consulta[0].id_equipo_item_personal}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        }
    } else {
        await pool.query(`INSERT INTO tb_mov_rubros_personal(id_mov_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${id_mov_item_personal}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        const consulta = await pool.query(`SELECT id_equipo_item_personal FROM tb_equipo_item_personal WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
        await pool.query(`INSERT INTO tb_equipo_rubros_personal(id_equipo_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${consulta[0].id_equipo_item_personal}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
    }

    res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
});

router.get('/movilizacion/vehiculos/rubros/:id_mov_item_vehiculo/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_mov_item_vehiculo, id_planeacion, position } = req.params;
    const consulta = await pool.query(`SELECT id_planeacion, id_mov_item_vehiculo FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_mov_vehiculo = await pool.query(`SELECT '${position}' as position, ie.id_mov_item_vehiculo , ie.id_mov_rubro_vehiculo, ie.id_planeacion ,i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_mov_rubros_vehiculos ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const total = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_rubros_vehiculos ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    res.render('planeacion/Rubros/mov-vehiculos', {
        consulta: consulta[0],
        unidad_medida: unidad_medida,
        rubros: rubros,
        rubros_mov_vehiculo: rubros_mov_vehiculo,
        total: total,
        position: position
    });
});

router.post('/consultarItem/movilizacion/vehiculos/:id_mov_item_vehiculo/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_vehiculo,
        id_planeacion
    } = req.params;

    const {
        categoria
    } = req.body;

    const items = await pool.query(`SELECT id_item, descripcion_item FROM tb_item WHERE categoria_item = '${categoria}'`);
    const consulta = await pool.query(`SELECT id_planeacion, id_mov_item_vehiculo FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_mov_vehiculo = await pool.query(`SELECT ie.id_mov_rubro_vehiculo, ie.id_planeacion ,i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_mov_rubros_vehiculos ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
    const total = await pool.query(`SELECT SUM(cantidad * costo_unitario) total FROM tb_mov_rubros_vehiculos ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);

    total[0].total = Intl.NumberFormat().format(total[0].total);

    rubros_mov_vehiculo.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    res.render('planeacion/Rubros/mov-vehiculos', {
        consulta: consulta,
        unidad_medida: unidad_medida,
        rubros: rubros,
        items: items,
        rubros_mov_vehiculo: rubros_mov_vehiculo,
        total: total
    });
});

router.post('/rubro/movilizacion/vehiculos', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_mov_item_vehiculo, id_item, id_rubro, id_unidad_medida,
        cantidad, costo_unitario, medio_pago, aplicar_ambos, position
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo_unitario esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
    }

    if (aplicar_ambos === 'true') {
        function eliminateDuplicates(arr) {
            let i,
                len = arr.length,
                out = [],
                obj = {};
            for (i = 0; i < len; i++) obj[arr[i]] = 0;
            for (i in obj) out.push(i);
            return out;
        }

        const ids = await pool.query("SELECT id_mov_item_vehiculo FROM tb_mov_item_vehiculos");

        let array = [];

        for (let id of ids) array.push(id.id_mov_item_vehiculo);

        for (let i = 0; i <= eliminateDuplicates(array).length - 1; i++) {
            await pool.query(`INSERT INTO tb_mov_rubros_vehiculos(id_mov_item_vehiculo,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${eliminateDuplicates(array)[i]}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            const consulta = await pool.query(`SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta WHERE id_mov_item_vehiculo = '${eliminateDuplicates(array)[i]}'`);
            await pool.query(`INSERT INTO tb_equipo_rubros_equipo_herramienta(id_equipo_item_equipo_herramienta,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${consulta[0].id_equipo_item_equipo_herramienta}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        }
    } else {
        await pool.query(`INSERT INTO tb_mov_rubros_vehiculos(id_mov_item_vehiculo,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${id_mov_item_vehiculo}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        const consulta = await pool.query(`SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta WHERE id_mov_item_vehiculo = '${id_mov_item_vehiculo}'`);
        await pool.query(`INSERT INTO tb_equipo_rubros_equipo_herramienta(id_equipo_item_equipo_herramienta,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${consulta[0].id_equipo_item_equipo_herramienta}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
    }
    res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
});

router.get('/equipo/personal/rubros/:id_equipo_item_personal/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_item_personal, id_planeacion, position } = req.params;
    const consulta = await pool.query(`SELECT id_planeacion, id_equipo_item_personal FROM tb_equipo_item_personal WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_equipo_personal = await pool.query(`SELECT '${position}' as position, ie.id_equipo_item_personal , ie.id_equipo_rubro_personal, ie.id_planeacion, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_equipo_rubros_personal ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}' AND ie.id_equipo_item_personal = '${id_equipo_item_personal}'`);
    const total = await pool.query(`SELECT SUM(ie.cantidad * ie.costo_unitario) total FROM tb_equipo_rubros_personal ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_equipo_item_personal = '${id_equipo_item_personal}'`);

    total[0].total = Intl.NumberFormat().format(total[0].total);

    rubros_equipo_personal.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    res.render('planeacion/Rubros/equipo-personal', {
        consulta: consulta[0],
        unidad_medida: unidad_medida,
        rubros: rubros,
        rubros_equipo_personal: rubros_equipo_personal,
        total: total,
        position: position
    });
});
/******** api para consultar los item por categorias  //equipos 1 */
router.post('/consultarItem/equipo/personal', isLoggedIn, async (req, res) => {
    const { categoria } = req.body;
    const items = await pool.query(`SELECT id_item, descripcion_item FROM tb_item WHERE categoria_item = '${categoria}'`);
    res.json({ items: items });
});

router.post('/rubro/equipo/personal', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_equipo_item_personal, id_item, id_rubro, position,
        id_unidad_medida, cantidad, costo_unitario, medio_pago, aplicar_ambos
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo_unitario esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
    }

    if (aplicar_ambos === 'true') {
        function eliminateDuplicates(arr) {
            let i,
                len = arr.length,
                out = [],
                obj = {};
            for (i = 0; i < len; i++) obj[arr[i]] = 0;
            for (i in obj) out.push(i);
            return out;
        }

        const ids = await pool.query("SELECT id_equipo_item_personal FROM tb_equipo_item_personal");
        let array = [];

        for (var id of ids) array.push(id.id_equipo_item_personal);

        for (var i = 0; i <= eliminateDuplicates(array).length - 1; i++) {
            await pool.query(`INSERT INTO tb_equipo_rubros_personal(id_equipo_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${eliminateDuplicates(array)[i]}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
            await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        }
    } else {
        await pool.query(`INSERT INTO tb_equipo_rubros_personal(id_equipo_item_personal,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES('${id_equipo_item_personal}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago) VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
    }
    res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
});

router.get('/equipo/equipos-herramientas/rubros/:id_equipo_item_equipo_herramienta/:id_planeacion/:position', isLoggedIn, async (req, res) => {

    const { id_equipo_item_equipo_herramienta, id_planeacion, position } = req.params;

    const consulta = await pool.query(`SELECT id_planeacion, id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const rubros_equipo_herramienta = await pool.query(`SELECT '${position}' as position, ie.id_equipo_item_equipo_herramienta, ie.id_equipo_rubro_equipo_herramienta, ie.id_planeacion, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.cantidad, ie.costo_unitario, IF(ie.medio_pago = '1', 'Credito','Contado') medio_pago, (cantidad * costo_unitario) total FROM tb_equipo_rubros_equipo_herramienta ie, tb_item i, tb_unidad_medida u, tb_rubros r WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}' AND ie.id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);
    const total = await pool.query(`SELECT SUM(ie.cantidad * ie.costo_unitario) total FROM tb_equipo_rubros_equipo_herramienta ie WHERE ie.id_planeacion = '${id_planeacion}' AND ie.id_equipo_item_equipo_herramienta = '${id_equipo_item_equipo_herramienta}'`);

    total[0].total = Intl.NumberFormat().format(total[0].total);

    rubros_equipo_herramienta.forEach(element => {
        element.costo_unitario = Intl.NumberFormat().format(element.costo_unitario);
        element.total = Intl.NumberFormat().format(element.total);
    });

    res.render('planeacion/Rubros/equipo-equipo_herramienta', {
        consulta: consulta[0],
        unidad_medida: unidad_medida,
        rubros: rubros,
        rubros_equipo_herramienta: rubros_equipo_herramienta,
        total: total,
        position: position
    });
});

router.post('/consultarItem/equipo/equipos-herramientas', isLoggedIn, async (req, res) => {

    const {
        categoria
    } = req.body;

    const items = await pool.query(`SELECT id_item, descripcion_item FROM tb_item WHERE categoria_item = '${categoria}'`);

    res.json({ items: items });
});

router.post('/rubro/equipo/equipos-herramientas', isLoggedIn, async (req, res) => {
    const {
        id_planeacion, id_equipo_item_equipo_herramienta, id_item, id_rubro, position,
        id_unidad_medida, cantidad, costo_unitario, medio_pago, aplicar_ambos
    } = req.body;

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo_unitario esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
    }

    if (aplicar_ambos === 'true') {
        function eliminateDuplicates(arr) {
            let i,
                len = arr.length,
                out = [],
                obj = {};
            for (i = 0; i < len; i++) obj[arr[i]] = 0;
            for (i in obj) out.push(i);
            return out;
        }

        const ids = await pool.query("SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta");
        let array = [];

        for (var id of ids) array.push(id.id_equipo_item_equipo_herramienta);

        for (var i = 0; i <= eliminateDuplicates(array).length - 1; i++) {
            await pool.query(`INSERT INTO tb_equipo_rubros_equipo_herramienta(id_equipo_item_equipo_herramienta,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago)
            VALUES('${eliminateDuplicates(array)[i]}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);

            await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago)
            VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
        }
    } else {

        await pool.query(`INSERT INTO tb_equipo_rubros_equipo_herramienta(id_equipo_item_equipo_herramienta,id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago)
        VALUES('${id_equipo_item_equipo_herramienta}','${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);

        await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,cantidad,costo_unitario,medio_pago)
        VALUES ('${id_planeacion}','${id_item}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${medio_pago}')`);
    }

    res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
});

router.get('/rubro/movilizacion/personal/eliminar/:id_mov_rubro_personal/:id_planeacion/:id_mov_item_personal/:position', isLoggedIn, async (req, res) => {
    const { id_mov_rubro_personal, id_planeacion, id_mov_item_personal, position } = req.params;
    await pool.query(`DELETE FROM tb_mov_rubros_personal WHERE id_mov_rubro_personal = '${id_mov_rubro_personal}'`);
    res.redirect(`/movilizacion/personal/rubros/${id_mov_item_personal}/${id_planeacion}/${position}`);
});

router.get('/rubro/movilizacion/vehiculo/eliminar/:id_mov_rubro_vehiculo/:id_planeacion/:id_mov_item_vehiculo/:position', isLoggedIn, async (req, res) => {
    const { id_mov_rubro_vehiculo, id_planeacion, id_mov_item_vehiculo, position } = req.params;
    await pool.query(`DELETE FROM tb_mov_rubros_vehiculos WHERE id_mov_rubro_vehiculo = '${id_mov_rubro_vehiculo}'`);
    res.redirect(`/movilizacion/vehiculos/rubros/${id_mov_item_vehiculo}/${id_planeacion}/${position}`);
});

router.get('/rubro/equipo/personal/eliminar/:id_equipo_rubro_personal/:id_planeacion/:id_equipo_item_personal/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_rubro_personal, id_planeacion, id_equipo_item_personal, position } = req.params;
    await pool.query(`DELETE FROM tb_equipo_rubros_personal WHERE id_equipo_rubro_personal = '${id_equipo_rubro_personal}'`);
    res.redirect(`/equipo/personal/rubros/${id_equipo_item_personal}/${id_planeacion}/${position}`);
});

router.get('/rubro/equipo/equipo-herramienta/eliminar/:id_equipo_rubro_equipo_herramienta/:id_planeacion/:id_equipo_item_equipo_herramienta/:position', isLoggedIn, async (req, res) => {
    const { id_equipo_rubro_equipo_herramienta, position, id_planeacion, id_equipo_item_equipo_herramienta } = req.params;
    await pool.query(`DELETE FROM tb_equipo_rubros_equipo_herramienta WHERE id_equipo_rubro_equipo_herramienta = '${id_equipo_rubro_equipo_herramienta}'`);
    res.redirect(`/equipo/equipos-herramientas/rubros/${id_equipo_item_equipo_herramienta}/${id_planeacion}/${position}`);
});

router.get('/cotizacion/:id_planeacion/:position', isLoggedIn, async (req, res) => {
    const { id_planeacion, position } = req.params;
    const consulta = await pool.query(`SELECT id_planeacion FROM tb_planeacion WHERE id_planeacion = '${id_planeacion}'`);
    res.render('planeacion/cotizaciones', {
        consulta: consulta[0],
        position: position
    });
});

module.exports = router;