const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/planeacion', isLoggedIn, async (req, res) => {

    const date = new Date();

    console.log(req.user.id);
    console.log(req.user.username);
    console.log(date.toISOString());

    const consulta = await pool.query("SELECT ie.id_planeacion ,ie.titulo, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, p.razon_social_proveedor, pe.nombre_personal, pe.apellido_personal, c.abreviatura_centro_costo, co.descripcion_contrato, ca.nombre_campo, m.abreviatura_moneda FROM tb_planeacion ie, tb_proveedor p, tb_personal pe, tb_centro_costos c, tb_contratos co, tb_campos ca, tb_monedas m WHERE ie.id_cliente = p.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = c.id_centro_costo AND ie.id_contrato = co.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda");

    res.render('planeacion/planeacion', {
        consulta: consulta
    });
});

router.get('/planeacion/agregar', isLoggedIn, async (req, res) => {

    const clientes = await pool.query("SELECT id_proveedor, razon_social_proveedor FROM tb_proveedor");
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

router.get('/info-planeacion/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
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

    console.log(id_planeacion);

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
        consulta: consulta
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
        observacion
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

    await pool.query("INSERT INTO tb_planeacion SET ?", [datos]);
    res.redirect('/planeacion');

});

router.post('/modificarPlaneacion', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
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
        requisitos_hse,
        observacion
    } = req.body;

    if (titulo == '') {
        console.log("El campo titulo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_cliente == '') {
        console.log("El campo id_cliente esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (contacto == '') {
        console.log("El campo contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (telefono == '') {
        console.log("El campo telefono esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (email == '') {
        console.log("El campo email esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (fecha_contacto == '') {
        console.log("El campo fecha_contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (hora_contacto == '') {
        console.log("El campo hora_contacto esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_personal == '') {
        console.log("El campo id_personal esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_centro_costo == '') {
        console.log("El campo id_centro_costo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (fecha_estimada == '') {
        console.log("El campo fecha_estimada esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_contrato == '') {
        console.log("El campo id_contrato esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (alojamiento == '') {
        console.log("El campo alojamiento esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (combustible == '') {
        console.log("El campo combustible esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (iluminacion == '') {
        console.log("El campo iluminacion esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (seguridad_fisica == '') {
        console.log("El campo seguridad_fisica esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (personal == '') {
        console.log("El campo personal esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_campo == '') {
        console.log("El campo id_campo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_personal_supervisor == '') {
        console.log("El campo id_personal_supervisor esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_moneda == '') {
        console.log("El campo id_moneda esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (trm == '') {
        console.log("El campo trm esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (objetivo_trabajo == '') {
        console.log("El campo objetivo_trabajo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (objetivo_trabajo == '') {
        console.log("El campo objetivo_trabajo esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (requisitos_hse == '') {
        console.log("El campo requisitos_hse esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (observacion == '') {
        console.log("El campo observacion esta vacio");
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

    await pool.query(`UPDATE tb_planeacion SET 
    titulo = '${titulo}',
    id_cliente = '${id_cliente}',
    contacto = '${contacto}', 
    telefono = '${telefono}', 
    email = '${email}', 
    fecha_contacto = '${fecha_contacto}', 
    hora_contacto = '${hora_contacto}', 
    id_personal = '${id_personal}', 
    id_centro_costo = '${id_centro_costo}', 
    fecha_estimada = '${fecha_estimada}', 
    id_contrato = '${id_contrato}', 
    alojamiento = '${alojamiento}', 
    combustible = '${combustible}', 
    iluminacion = '${iluminacion}', 
    seguridad_fisica = '${seguridad_fisica}', 
    personal = '${personal}', 
    id_campo = '${id_campo}', 
    id_personal_supervisor = '${id_personal_supervisor}',
    id_moneda = '${id_moneda}', 
    objetivo_trabajo = '${objetivo_trabajo}', 
    requisitos_hse = '${requisitos_hse}', 
    observacion = '${observacion}', 
    trm = '${trm}' 
    WHERE id_planeacion = '${id_planeacion}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.get('/planeacion/graficas/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const tipos_trabajo = await pool.query("SELECT id_tipo_trabajo, descripcion_tipo_trabajo FROM tb_tipo_trabajos");
    const tipos_trabajo_planeacion = await pool.query(`SELECT t.descripcion_tipo_trabajo, ie.id_planeacion, ie.id_tipo_trabajo_planeacion FROM tb_tipo_trabajo_planeacion ie, tb_tipo_trabajos t WHERE ie.id_tipo_trabajo = t.id_tipo_trabajo AND ie.id_planeacion = '${id_planeacion}'`);
    const pozos = await pool.query("SELECT id_pozo, nombre_pozo FROM tb_pozos");
    const pozos_planeacion = await pool.query(`SELECT p.nombre_pozo, ie.id_planeacion, ie.id_pozo_planeacion FROM tb_pozos_planeacion ie, tb_pozos p WHERE ie.id_pozo = p.id_pozo AND ie.id_planeacion = '${id_planeacion}'`);
    const unidad_medida = await pool.query(`SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida`);
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
    const cotizacion = await pool.query(`SELECT id_planeacion,id_cotizacion FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
    const costos_cotizacion = await pool.query(`SELECT ie.id_planeacion ,ie.id_cotizacion_costo ,ie.descripcion, ie.tipo, ie.cantidad, u.abreviatura_unidad_medida, ie.precio, m.abreviatura_moneda, IF(m.id_moneda = '1', (precio * cantidad) / p.trm, (precio * cantidad)) total FROM tb_cotizaciones_costos ie, tb_unidad_medida u, tb_monedas m, tb_planeacion p WHERE ie.id_unidad_medida = u.id_unidad_medida AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const mod_planeacion = await pool.query(`SELECT ie.titulo, pro.id_proveedor, pro.razon_social_proveedor, ce.id_centro_costo, con.id_contrato, ca.id_campo, m.id_moneda, ie.contacto, ie.telefono, ie.email, DATE_FORMAT(ie.fecha_contacto, '%Y-%m-%d') fecha_contacto, ie.hora_contacto, pe.nombre_personal, pe.apellido_personal, pe.id, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, con.descripcion_contrato, IF(ie.alojamiento = 1, "GOS","Cliente") alojamiento_, IF(ie.combustible = 1, "GOS","Cliente") combustible_, IF(ie.iluminacion = 1, "GOS","Cliente") iluminacion_, IF(ie.seguridad_fisica = 1, "GOS","Cliente") seguridad_fisica_, IF(ie.personal = 1, "GOS","Cliente") personal_, ca.nombre_campo, m.abreviatura_moneda, ie.objetivo_trabajo, ie.requisitos_hse, ie.observacion, ie.trm, ce.nombre_centro_costo, ie.alojamiento, ie.combustible, ie.iluminacion, ie.seguridad_fisica, ie.personal FROM tb_planeacion ie, tb_personal pe, tb_proveedor pro, tb_centro_costos ce, tb_contratos con, tb_campos ca, tb_monedas m WHERE ie.id_cliente = pro.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = ce.id_centro_costo AND ie.id_contrato = con.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const personal_supervisor_planeacion = await pool.query(`SELECT pe.id ,pe.nombre_personal, pe.apellido_personal FROM tb_planeacion ie, tb_personal pe WHERE ie.id_personal_supervisor = pe.id AND ie.id_planeacion = '${id_planeacion}'`);
    const clientes = await pool.query(`SELECT id_proveedor ,razon_social_proveedor FROM tb_proveedor`);
    const personal = await pool.query(`SELECT id, nombre_personal, apellido_personal FROM tb_personal`);
    const centro_costos = await pool.query(`SELECT id_centro_costo ,nombre_centro_costo FROM tb_centro_costos`);
    const contratos = await pool.query(`SELECT id_contrato, descripcion_contrato FROM tb_contratos`);
    const campos = await pool.query(`SELECT id_campo, nombre_campo FROM tb_campos`);

    var subcontratado_equipo = 0;
    var subcontratado_credito_equipo = 0;
    var subcontratado_contado_equipo = 0;
    var consumible_equipo = 0;
    var consumible_credito_equipo = 0;
    var consumible_contado_equipo = 0;

    var rubro_equipo_herramienta_equipo;
    var rubro_personal_equipo;
    var rubro_combustibles_equipo;
    var rubro_imprevistos_equipo;

    var rubro_combustibles_mov;
    var rubro_personal_mov;
    var rubro_vehiculo_mov;
    var rubro_imprevistos_mov;

    var subcontratado_mov = 0;
    var subcontratado_credito_mov = 0;
    var subcontratado_contado_mov = 0;
    var consumible_mov = 0;
    var consumible_credito_mov = 0;
    var consumible_contado_mov = 0;

    var control_movilizacion_subcontado_equipo = [];
    var control_movilizacion_subcontado_mov = [];
    var sigla_rubro_equipo = [];
    var sigla_rubro_mov = [];

    function eliminateDuplicates(arr) {
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }

    const tb_equipo_item_equipo_herramienta = await pool.query(`SELECT ie.id_equipo_item_equipo_herramienta, ie.id_planeacion, e.nombre_equipo, e.placa_equipo, u.abreviatura_unidad_medida, ie.gasto_unitario, ie.gasto_standby_unitario, r.sigla_rubro, ((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) dias, (((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby)) * gasto_unitario) + ((fecha_2 - fecha_1) * gasto_standby_unitario) total_costo, (((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby))* gasto_unitario) suma_gasto, ((fecha_2 - fecha_1) * gasto_standby_unitario) suma_gasto_standby FROM tb_equipo_item_equipo_herramienta ie, tb_equipos e, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.vehiculo = e.id_equipo AND ie.carga = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_equipo_item_personal = await pool.query(`SELECT ie.id_equipo_item_personal, ie.id_planeacion, ie.cantidad, ie.costo, m.abreviatura_moneda, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, p.bono_salarial_personal, (cantidad * costo) + p.bono_salarial_personal total_costo, id_mov_item_personal, ((ie.fecha_final_mov - ie.fecha_inicio_mov) + (ie.fecha_final_demov - ie.fecha_inicio_demov)) dias, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total FROM tb_equipo_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_monedas m WHERE ie.id_cargo = c.id_cargo AND ie.id_personal = p.id AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_equipo_item_combustible = await pool.query(`SELECT ie.id_equipo_item_combustible, ie.id_planeacion, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, ie.costo_unitario, ie.cantidad, m.abreviatura_moneda, ie.medio_pago, ((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov) + (fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) dias, IF(ie.medio_pago = '1', "Credito","Contado") medio_de_pago, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov) + (fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) * costo_unitario) total_costo FROM tb_equipo_item_combustible ie, tb_item i, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_item = i.id_item AND ie.id_moneda = m.id_moneda AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_equipo_item_imprevistos = await pool.query(`SELECT ie.id_equipo_item_imprevisto, ie.id_planeacion, ie.id_mov_item_imprevisto, ie.descripcion, DATE_FORMAT(ie.fecha_imprevisto, '%Y-%m-%d') fecha_imprevisto, ie.cantidad, ie.costo_unitario, ie.contado, ie.credito, r.sigla_rubro, u.abreviatura_unidad_medida, m.abreviatura_moneda, (cantidad * costo_unitario) total_costo FROM tb_equipo_item_imprevistos ie, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);

    for (var s_equipo of tb_equipo_item_equipo_herramienta) {
        subcontratado_credito_equipo = subcontratado_credito_equipo + s_equipo.credito_gasto + s_equipo.credito_gasto_standby;
        subcontratado_contado_equipo = subcontratado_contado_equipo + s_equipo.contado_gasto + s_equipo.contado_gasto_standby;
        subcontratado_equipo = subcontratado_equipo + s_equipo.total_costo;
    }

    for (var c_equipo of tb_equipo_item_combustible) {
        consumible_credito_equipo = consumible_credito_equipo + c_equipo.credito;
        consumible_contado_equipo = consumible_contado_equipo + c_equipo.contado;
        consumible_equipo = consumible_equipo + c_equipo.total_costo;
    }

    control_movilizacion_subcontado_equipo.push(subcontratado_equipo,
        subcontratado_credito_equipo,
        subcontratado_contado_equipo,
        consumible_equipo,
        consumible_credito_equipo,
        consumible_contado_equipo);


    for (var eq_equipo_rubro of tb_equipo_item_equipo_herramienta) {
        sigla_rubro_equipo.push(eq_equipo_rubro.sigla_rubro);
    }

    for (var eq_personal_rubro of tb_equipo_item_personal) {
        sigla_rubro_equipo.push(eq_personal_rubro.sigla_rubro);
    }

    for (var eq_combustibles_rubro of tb_equipo_item_combustible) {
        sigla_rubro_equipo.push(eq_combustibles_rubro.sigla_rubro);
    }

    for (var eq_imprevistos_rubro of tb_equipo_item_imprevistos) {
        sigla_rubro_equipo.push(eq_imprevistos_rubro.sigla_rubro);
    }

    var res_rubro_equipo = [];

    for (var i = 0; i <= eliminateDuplicates(sigla_rubro_equipo).length - 1; i++) {

        rubro_equipo_herramienta_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', 1, 0)) suma FROM tb_equipo_item_equipo_herramienta ih, tb_rubros r WHERE ih.id_rubro = r.id_rubro AND ih.id_planeacion = '${id_planeacion}'`);
        rubro_personal_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', 1, 0)) suma FROM tb_equipo_item_personal ip, tb_rubros r WHERE ip.id_rubro = r.id_rubro AND ip.id_planeacion = '${id_planeacion}'`);
        rubro_combustibles_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', 1, 0)) suma FROM tb_equipo_item_combustible ic, tb_rubros r WHERE ic.id_rubro = r.id_rubro AND ic.id_planeacion = '${id_planeacion}'`);
        rubro_imprevistos_equipo = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_equipo)[i]}', 1, 0)) suma FROM tb_equipo_item_imprevistos ii, tb_rubros r WHERE ii.id_rubro = r.id_rubro AND ii.id_planeacion = '${id_planeacion}'`);

        var suma_rubro = rubro_equipo_herramienta_equipo[0].suma + rubro_personal_equipo[0].suma + rubro_combustibles_equipo[0].suma + rubro_imprevistos_equipo[0].suma
        res_rubro_equipo.push(suma_rubro);

    }

    var lbl_rubro_equipo = eliminateDuplicates(sigla_rubro_equipo);
    var data_rubro_equipo = res_rubro_equipo;

    // Movilizacion

    const tb_mov_item_vehiculos = await pool.query(`SELECT ie.id_mov_item_vehiculo, ie.gasto_unitario, ie.id_planeacion, DATE_FORMAT(ie.fecha_inicio_gasto, '%Y-%m-%d') fecha_inicio_gasto, DATE_FORMAT(ie.fecha_final_gasto, '%Y-%m-%d') fecha_final_gasto, DATE_FORMAT(ie.fecha_inicio_gasto_standby, '%Y-%m-%d') fecha_inicio_gasto_standby, DATE_FORMAT(ie.fecha_final_gasto_standby, '%Y-%m-%d') fecha_final_gasto_standby, e.nombre_equipo, ie.observaciones, e.placa_equipo, u.abreviatura_unidad_medida, m.abreviatura_moneda, r.sigla_rubro, ((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) dias, (((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby))* gasto_unitario) suma_gasto, ((fecha_2 - fecha_1) * gasto_standby_unitario) suma_gasto_standby, (((fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby))* gasto_unitario) + ((fecha_2 - fecha_1) * gasto_standby_unitario) total_costo FROM tb_mov_item_vehiculos ie, tb_equipos e, tb_unidad_medida u, tb_monedas m, tb_rubros r WHERE ie.vehiculo = e.id_equipo AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_moneda = m.id_moneda AND ie.id_rubro = r.id_rubro AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_mov_item_personal = await pool.query(`SELECT ie.id_mov_item_personal, ie.id_planeacion, ie.cantidad, ROUND(p.salario_personal / 30) costo_unitario, c.nombre_cargo, p.nombre_personal, p.apellido_personal, u.abreviatura_unidad_medida, r.sigla_rubro, e.placa_equipo, a.descripcion, m.abreviatura_moneda, DATE_FORMAT(ie.fecha_inicio_mov, '%Y-%m-%d') fecha_inicio_mov, DATE_FORMAT(ie.fecha_final_mov, '%Y-%m-%d') fecha_final_mov,DATE_FORMAT(ie.fecha_inicio_demov, '%Y-%m-%d') fecha_inicio_demov, DATE_FORMAT(ie.fecha_final_demov, '%Y-%m-%d') fecha_final_demov, (fecha_final_mov - fecha_inicio_mov) suma_mov, (fecha_final_demov - fecha_inicio_demov) suma_demov, ((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov)) cantidad, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov))*ROUND(p.salario_personal / 30)) + p.bono_salarial_personal total ,p.bono_salarial_personal bono_campo FROM tb_mov_item_personal ie, tb_cargos c, tb_personal p, tb_unidad_medida u, tb_rubros r, tb_equipos e, tb_tipo_asignacion a, tb_monedas m WHERE ie.id_cargo = c.id_cargo AND ie.id_personal = p.id AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_rubro = r.id_rubro AND ie.id_equipo = e.id_equipo AND ie.id_tipo_asignacion = a.id_tipo_asignacion AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_mov_item_combustibles = await pool.query(`SELECT r.nombre_rubro, ie.id_planeacion, ie.id_mov_item_combustible, ie.costo_unitario, i.descripcion_item, r.sigla_rubro, u.abreviatura_unidad_medida, m.abreviatura_moneda, ie.medio_pago, ((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov) + (fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) dias, IF(ie.medio_pago = '1', "Credito","Contado") medio_de_pago, (((fecha_final_mov - fecha_inicio_mov) + (fecha_final_demov - fecha_inicio_demov) + (fecha_final_gasto - fecha_inicio_gasto) + (fecha_final_gasto_standby - fecha_inicio_gasto_standby) + (fecha_2 - fecha_1)) * costo_unitario) total_costo FROM tb_mov_item_combustibles ie, tb_item i, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_item = i.id_item AND ie.id_rubro = r.id_rubro AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_moneda = m.id_moneda AND ie.id_planeacion = '${id_planeacion}'`);
    const tb_mov_item_imprevistos = await pool.query(`SELECT ie.id_mov_item_imprevisto, ie.id_planeacion, DATE_FORMAT(ie.fecha_imprevisto, '%Y-%m-%d') fecha_inicio, ie.descripcion, ie.cantidad, ie.costo_unitario, ie.contado, ie.credito, r.sigla_rubro, u.abreviatura_unidad_medida, m.abreviatura_moneda, (cantidad * costo_unitario) total_costo FROM tb_mov_item_imprevistos ie, tb_rubros r, tb_unidad_medida u, tb_monedas m WHERE ie.id_rubro = r.id_rubro AND ie.id_moneda = m.id_moneda AND ie.id_unidad_medida = u.id_unidad_medida AND ie.id_planeacion = '${id_planeacion}'`);

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

    control_movilizacion_subcontado_mov.push(subcontratado_mov,
        subcontratado_credito_mov,
        subcontratado_contado_mov,
        consumible_mov,
        consumible_credito_mov,
        consumible_contado_mov);

    for (var mov_vehiculo_rubro of tb_mov_item_vehiculos) {
        sigla_rubro_mov.push(mov_vehiculo_rubro.sigla_rubro);
    }

    for (var mov_personal_rubro of tb_mov_item_personal) {
        sigla_rubro_mov.push(mov_personal_rubro.sigla_rubro);
    }

    for (var mov_combustibles_rubro of tb_mov_item_combustibles) {
        sigla_rubro_mov.push(mov_combustibles_rubro.sigla_rubro);
    }

    for (var mov_imprevistos_rubro of tb_mov_item_imprevistos) {
        sigla_rubro_mov.push(mov_imprevistos_rubro.sigla_rubro);
    }

    var res_rubro_mov = [];

    for (var o = 0; o <= eliminateDuplicates(sigla_rubro_mov).length - 1; o++) {
        rubro_combustibles_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', 1, 0)) suma FROM tb_mov_item_combustibles ic, tb_rubros r WHERE ic.id_rubro = r.id_rubro AND ic.id_planeacion = '${id_planeacion}'`);
        rubro_personal_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', 1, 0)) suma FROM tb_mov_item_personal ip, tb_rubros r WHERE ip.id_rubro = r.id_rubro AND ip.id_planeacion = '${id_planeacion}'`);
        rubro_vehiculo_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', 1, 0)) suma FROM tb_mov_item_vehiculos iv, tb_rubros r WHERE iv.id_rubro = r.id_rubro AND iv.id_planeacion = '${id_planeacion}'`);
        rubro_imprevistos_mov = await pool.query(`SELECT SUM(IF(r.sigla_rubro = '${eliminateDuplicates(sigla_rubro_mov)[o]}', 1, 0)) suma FROM tb_mov_item_imprevistos ii, tb_rubros r WHERE ii.id_rubro = r.id_rubro AND ii.id_planeacion = '${id_planeacion}'`);

        var suma_rubro = rubro_combustibles_mov[0].suma + rubro_personal_mov[0].suma + rubro_vehiculo_mov[0].suma + rubro_imprevistos_mov[0].suma;
        res_rubro_mov.push(suma_rubro);
    }

    var lbl_rubro_mov = eliminateDuplicates(sigla_rubro_mov);
    var data_rubro_mov = res_rubro_mov;

    res.render('planeacion/planeacion-datos', {

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

        consulta: consulta

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

router.get('/equipo/equipos-herramientas/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const tipo_equipo_herramienta = await pool.query("SELECT id_tipo_equipo_herramienta ,nombre_equipo_herramienta FROM tb_tipo_equipos_herramientas");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");
    const vehiculo_carga = await pool.query("SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos");

    res.render('planeacion/Equipo/Equipos-herramientas', {
        consulta: consulta,
        tipo_equipo_herramienta: tipo_equipo_herramienta,
        unidad_medida: unidad_medida,
        monedas: monedas,
        rubros: rubros,
        vehiculo_carga: vehiculo_carga
    });
});



router.post('/equipo/equipos-herramientas/agregar/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        vehiculo,
        carga,
        id_unidad_medida,
        gasto_unitario,
        fecha_inicio_gasto,
        fecha_final_gasto,
        id_rubro,
        costo_unitario_rubro,
        id_moneda,
        medio_pago,
        observaciones
    } = req.body;
    const datos = req.body;

    if (fecha_inicio_gasto == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (fecha_final_gasto == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (vehiculo == '') {
        req.flash('error', 'El campo vehiculo esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (carga == '') {
        req.flash('error', 'El campo carga esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (gasto_unitario == '') {
        req.flash('error', 'El campo gasto esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (observaciones == '') {
        req.flash('error', 'El campo observaciones esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }

    console.log(datos);

    await pool.query(`INSERT INTO tb_equipo_item_equipo_herramienta (id_planeacion,vehiculo,carga,id_unidad_medida,id_rubro,id_moneda,medio_pago,costo_unitario,observaciones,gasto_unitario,fecha_inicio_gasto,fecha_final_gasto)
    VALUES('${id_planeacion}','${vehiculo}','${carga}','${id_unidad_medida}','${id_rubro}','${id_moneda}','${medio_pago}','${costo_unitario_rubro}','${observaciones}','${gasto_unitario}','${fecha_inicio_gasto}','${fecha_final_gasto}')`);

    const id = await pool.query(`SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta`);

    var array = [];

    for (var ids of id) {
        array.push(ids.id_equipo_item_equipo_herramienta);
    }

    console.log(array[array.length - 1]);

    await pool.query(`INSERT INTO tb_equipo_item_combustible (id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_equipo_item_equipo_herramienta)
    VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}')`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);
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

router.get('/equipo/equipos-herramientas/eliminar/:id_equipo_item_equipo_herramienta/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_equipo_herramienta,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item eliminado');

    await pool.query("DELETE FROM tb_equipo_item_equipo_herramienta WHERE id_equipo_item_equipo_herramienta = ?", [id_equipo_item_equipo_herramienta]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/equipo/personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const cargos = await pool.query("SELECT id_cargo, nombre_cargo FROM tb_cargos");
    const personal = await pool.query("SELECT id, nombre_personal, apellido_personal FROM tb_personal");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");
    const tipo_asignacion = await pool.query("SELECT id_tipo_asignacion, descripcion FROM tb_tipo_asignacion");

    res.render('planeacion/Equipo/Personal', {
        consulta: consulta,
        cargos: cargos,
        personal: personal,
        unidad_medida: unidad_medida,
        rubros: rubros,
        monedas: monedas,
        tipo_asignacion: tipo_asignacion
    });
});

router.get('/equipo/personal/pausar/:id_equipo_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_personal,
        id_planeacion
    } = req.params;

    const date = new Date();

    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_final_mov = '${date.toISOString()}' WHERE id_equipo_item_personal = '${id_equipo_item_personal}'`);

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

router.post('/equipo/personal/agregar/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_cargo,
        id_personal,
        id_unidad_medida,
        id_moneda,
        cantidad,
        costo,
        id_rubro,
        fecha_inicio_mov,
        fecha_final_mov,
        costo_unitario_rubro,
        medio_pago,
        id_tipo_asignacion
    } = req.body;
    const datos = req.body;

    if (id_cargo == '') {
        req.flash('error', 'El campo cargo esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (id_personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (costo == '') {
        req.flash('error', 'El campo costo esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (fecha_inicio_mov == '') {
        req.flash('error', 'El campo fecha inicio movilizacion esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (fecha_final_mov == '') {
        req.flash('error', 'El campo fecha final movilizacion esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }
    if (id_tipo_asignacion == '') {
        req.flash('error', 'El campo asignacion esta vacio');
        res.redirect(`/equipo/personal/${id_planeacion}`);
    }

    const persona = await pool.query(`SELECT salario_personal FROM tb_personal WHERE id = '${id_personal}'`);

    req.body.costo = persona[0].salario_personal / 30;

    await pool.query("INSERT INTO tb_equipo_item_personal SET ?", [datos]);

    const id = await pool.query(`SELECT id_equipo_item_personal FROM tb_equipo_item_personal`);

    var array = [];

    for (var ids of id) {
        array.push(ids.id_equipo_item_personal);
    }

    console.log(array[array.length - 1]);

    await pool.query(`INSERT INTO tb_equipo_item_combustible (id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_equipo_item_personal)
    VALUES ('${id_planeacion}', '1', '${id_rubro}', '${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}')`);

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

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

router.get('/equipo/personal/eliminar/:id_equipo_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_personal,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_equipo_item_personal WHERE id_equipo_item_personal = ?", [id_equipo_item_personal]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/equipo/combustibles/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const items = await pool.query("SELECT id_item, descripcion_item FROM tb_item");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Equipo/Combustibles', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        items: items,
        consulta: consulta,
        monedas: monedas
    });
});

router.post('/equipo/combustibles/agregar', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_item,
        id_rubro,
        id_unidad_medida,
        cantidad,
        costo_unitario,
        contado,
        id_moneda,
        credito
    } = req.body
    const datos = req.body;

    const total_costo = parseInt(cantidad * costo_unitario);
    const _contado = parseInt(contado);
    const _credito = parseInt(credito);

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (contado == '') {
        req.flash('error', 'El campo contado esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }

    if (total_costo == _contado + _credito) {
        req.flash('success', 'Item Agregado');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
        await pool.query("INSERT INTO tb_equipo_item_combustible SET ?", [datos]);
    } else {
        req.flash('error', 'La suma de contado y credito no coinciden');
        res.redirect(`/equipo/combustibles/${id_planeacion}`);
    }

});

router.get('/equipo/combustibles/eliminar/:id_equipo_item_combustible/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_combustible,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_equipo_item_combustible WHERE id_equipo_item_combustible = ?", [id_equipo_item_combustible]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/equipo/imprevistos/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda,abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Equipo/Imprevistos', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta,
        monedas: monedas
    })
});

router.post('/equipo/imprevistos/agregar', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        descripcion,
        fecha_imprevisto,
        id_rubro,
        id_unidad_medida,
        cantidad,
        id_moneda,
        costo_unitario,
        contado,
        credito
    } = req.body
    const datos = req.body;

    const total_costo = parseInt(cantidad * costo_unitario);
    const _contado = parseInt(contado);
    const _credito = parseInt(credito);

    if (descripcion == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (fecha_imprevisto == '') {
        req.flash('error', 'El campo fecha imprevisto esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (contado == '') {
        req.flash('error', 'El campo contado esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }

    if (total_costo == _contado + _credito) {
        req.flash('success', 'Item Agregado');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
        await pool.query("INSERT INTO tb_equipo_item_imprevistos SET ?", [datos]);
    } else {
        req.flash('error', 'La suma de contado y credito no coinciden');
        res.redirect(`/equipo/imprevistos/${id_planeacion}`);
    }

});

router.get('/equipo/imprevistos/eliminar/:id_equipo_item_imprevisto/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_equipo_item_imprevisto,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_equipo_item_imprevistos WHERE id_equipo_item_imprevisto = ?", [id_equipo_item_imprevisto]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/movilizacion/combustibles/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
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
        consulta: consulta
    });
});

router.post('/movilizacion/combustibles/agregar', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_item,
        id_rubro,
        id_moneda,
        cantidad,
        costo_unitario,
        contado,
        credito
    } = req.body
    const datos = req.body;

    const total_costo = parseInt(cantidad * costo_unitario);
    const _contado = parseInt(contado);
    const _credito = parseInt(credito);

    if (id_item == '') {
        req.flash('error', 'El campo item esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (contado == '') {
        req.flash('error', 'El campo contado esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }

    if (total_costo == _contado + _credito) {
        req.flash('success', 'Item Agregado');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
        await pool.query("INSERT INTO tb_mov_item_combustibles SET ?", [datos]);
    } else {
        req.flash('error', 'La suma de contado y credito no coinciden');
        res.redirect(`/movilizacion/combustibles/${id_planeacion}`);
    }

});

router.get('/movilizacion/combustibles/eliminar/:id_mov_item_combustible/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_combustible,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_mov_item_combustibles WHERE id_mov_item_combustible = ?", [id_mov_item_combustible]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/movilizacion/imprevistos/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro, sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Imprevistos', {
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta,
        monedas: monedas,
    })
});

router.post('/movilizacion/imprevistos/agregar', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        descripcion,
        fecha_imprevisto,
        id_rubro,
        id_unidad_medida,
        id_moneda,
        cantidad,
        costo_unitario,
        contado,
        credito
    } = req.body

    const total_costo = parseInt(cantidad * costo_unitario);
    const _contado = parseInt(contado);
    const _credito = parseInt(credito);

    if (descripcion == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (fecha_imprevisto == '') {
        req.flash('error', 'El campo fecha imprevisto esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (costo_unitario == '') {
        req.flash('error', 'El campo costo unitario esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (contado == '') {
        req.flash('error', 'El campo contado esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }

    if (total_costo == _contado + _credito) {
        req.flash('success', 'Item Agregado');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
        const datos = req.body;
        await pool.query("INSERT INTO tb_mov_item_imprevistos SET ?", [datos]);

        const consulta_id = await pool.query("SELECT id_mov_item_imprevisto FROM tb_mov_item_imprevistos");

        var array = [];

        for (var ids of consulta_id) {
            array.push(ids.id_mov_item_imprevisto);
        }

        console.log(array[array.length - 1]);

        await pool.query(`INSERT INTO tb_equipo_item_imprevistos(id_planeacion,descripcion,id_moneda,fecha_imprevisto,id_rubro,id_unidad_medida,cantidad,costo_unitario,contado,credito,id_mov_item_imprevisto) VALUES ('${id_planeacion}','${descripcion}','${id_moneda}','${fecha_imprevisto}','${id_rubro}','${id_unidad_medida}','${cantidad}','${costo_unitario}','${contado}','${credito}','${array[array.length - 1]}')`);

    } else {
        req.flash('error', 'La suma de contado y credito no coinciden');
        res.redirect(`/movilizacion/imprevistos/${id_planeacion}`);
    }

});

router.get('/movilizacion/imprevistos/agregar/:id_mov_item_imprevisto', isLoggedIn, async (req, res) => {

    const { id_mov_item_imprevisto } = req.params;

    console.log(id_mov_item_imprevisto);

    res.render('planeacion/Imprevistos/inicio');
});

router.get('/movilizacion/imprevistos/eliminar/:id_mov_item_imprevisto/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_imprevisto,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_mov_item_imprevistos WHERE id_mov_item_imprevisto = ?", [id_mov_item_imprevisto]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/movilizacion/personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);
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
        consulta: consulta
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

router.get('/movilizacion/personal/rubros/:id_mov_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");

    res.render('planeacion/Rubros/mov-personal', {
        rubros: rubros,
        unidad_medida: unidad_medida
    });

});

router.get('/movilizacion/vehiculos/rubros/:id_mov_item_vehiculo/:id_planeacion', isLoggedIn, async (req, res) => {

    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");

    res.render('planeacion/Rubros/mov-vehiculos', {
        rubros: rubros,
        unidad_medida: unidad_medida
    });

});

router.get('/equipo/personal/rubros/:id_equipo_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");

    res.render('planeacion/Rubros/equipo-personal', {
        rubros: rubros,
        unidad_medida: unidad_medida
    });

});

router.get('/equipo/equipos-herramientas/rubros/:id_equipo_item_equipo_herramienta/:id_planeacion', isLoggedIn, async (req,res) => {

    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");

    res.render('planeacion/Rubros/equipo-personal', {
        rubros: rubros,
        unidad_medida: unidad_medida
    });

});

router.post('/consultarItem', isLoggedIn, async (req, res) => {

    const {
        categoria
    } = req.body

    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const items = await pool.query(`SELECT id_item, descripcion_item FROM tb_item WHERE categoria_item = '${categoria}'`);

    res.render('planeacion/Rubros/mov-personal', {
        rubros: rubros,
        unidad_medida: unidad_medida,
        items: items
    });

});

router.post('/movilizacion/personal/agregar/rubro', isLoggedIn, async (req, res) => {

    const {
        id_item,
        id_rubro,
        id_unidad_medida,
        cantidad,
        costo_unitario,
        medio_pago,
        aplicar_ambos
    } = req.body;

    if (aplicar_ambos === 'true') {
        console.log('INSERT A LAS 2 TABLAS');
    } else {
        console.log('INSERT A UNA TABLA');
    }

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

    const {
        id_planeacion,
        cal_m,
        cal_dm,
        verifica,
    } = req.body;
    const datos = req.body;

    console.log(verifica);

    if (cal_m != undefined) {

        const {
            f_i_mov,
            f_f_mov
        } = req.body;
        const f_mov = req.body;

        var fe_i_mov = new Date(f_i_mov);
        var fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_mov > fe_f_mov) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_mov_item_personal = '${verifica[i]}'`);
        }

    } else if (cal_dm != undefined) {

        const {
            f_i_dm,
            f_f_dm
        } = req.body;
        const f_dm = req.body;

        var fe_i_dm = new Date(f_i_dm);
        var fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_mov_item_personal = '${verifica[i]}'`);
        }

    }
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/calcularPersonal_Equipo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        cal_m,
        cal_dm,
        verifica
    } = req.body;
    const datos = req.body;

    console.log(verifica);

    if (cal_m != undefined) {

        const {
            f_i_mov,
            f_f_mov
        } = req.body;
        const f_mov = req.body;

        var fe_i_mov = new Date(f_i_mov);
        var fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_mov > fe_f_mov) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_equipo_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_mov = '${f_i_mov}', fecha_final_mov = '${f_f_mov}' WHERE id_equipo_item_personal = '${verifica[i]}'`);
        }

    } else if (cal_dm != undefined) {

        const {
            f_i_dm,
            f_f_dm
        } = req.body;
        const f_dm = req.body;

        var fe_i_dm = new Date(f_i_dm);
        var fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }
        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_equipo_item_personal = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_demov = '${f_i_dm}', fecha_final_demov = '${f_f_dm}' WHERE id_equipo_item_personal = '${verifica[i]}'`);
        }

    }
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/movilizacion/personal/agregar/:id_planeacion', isLoggedIn, async (req, res) => {

    var {
        id_cargo,
        id_planeacion,
        id_personal,
        id_unidad_medida,
        fecha_inicio_mov,
        fecha_final_mov,
        cantidad,
        medio_pago,
        costo_unitario_rubro,
        total,
        costo,
        id_moneda,
        id_rubro,
        id_equipo,
        id_tipo_asignacion
    } = req.body;
    const datos = req.body;

    if (id_cargo == '') {
        req.flash('error', 'El campo cargo esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_personal == '') {
        req.flash('error', 'El campo personal esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (costo == '') {
        req.flash('error', 'El campo costo esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_equipo == '') {
        req.flash('error', 'El campo equipo esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (id_tipo_asignacion == '') {
        req.flash('error', 'El campo tipo de asignacion esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (fecha_inicio_mov == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (fecha_final_mov == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio pago esta vacio');
        res.redirect(`/movilizacion/personal/${id_planeacion}`);
    }

    const persona = await pool.query(`SELECT salario_personal FROM tb_personal WHERE id = '${id_personal}'`);
    console.log(persona);
    console.log(persona[0].salario_personal);

    var dia = new Date(fecha_inicio_mov);
    var dia2 = new Date(fecha_final_mov);

    var d = Date.parse(dia) / 86400000;
    var e = Date.parse(dia2) / 86400000;

    var dias = (e - d);

    req.body.cantidad = dias;
    req.body.total = (persona[0].salario_personal / 30) * dias;

    console.log(cantidad);

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
    await pool.query("INSERT INTO tb_mov_item_personal SET ?", [datos]);

    const consulta_id = await pool.query("SELECT id_mov_item_personal FROM tb_mov_item_personal");

    var array = [];

    for (var ids of consulta_id) {
        array.push(ids.id_mov_item_personal);
    }

    console.log(array[array.length - 1]);

    console.log(req.body.costo_unitario_rubro);

    await pool.query(`INSERT INTO tb_equipo_item_personal(id_planeacion,id_cargo,medio_pago,id_personal,id_unidad_medida,id_moneda,cantidad,costo,costo_unitario_rubro,id_rubro,id_mov_item_personal,fecha_inicio_mov,fecha_final_mov)
    VALUES('${id_planeacion}','${id_cargo}','${medio_pago}','${id_personal}','${id_unidad_medida}','${id_moneda}','${cantidad}','${(persona[0].salario_personal / 30)}','${costo_unitario_rubro}','${id_rubro}','${array[array.length - 1]}','${fecha_inicio_mov}','${fecha_final_mov}')`);

    const consulta_id_personal = await pool.query("SELECT id_equipo_item_personal FROM tb_equipo_item_personal");

    var array2 = [];

    for (var ids of consulta_id_personal) {
        array2.push(ids.id_equipo_item_personal);
    }

    console.log(array2[array2.length - 1]);

    await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_mov_item_personal)
    VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}')`);

    await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_mov,fecha_final_mov,id_mov_item_personal,id_equipo_item_personal)
    VALUES('${id_planeacion}','1','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_mov}','${fecha_final_mov}','${array[array.length - 1]}','${array2[array2.length - 1]}')`);

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

    var dias = (e - d);

    console.log(fecha_inicio_demov, fecha_final_demov);

    await pool.query(`UPDATE tb_mov_item_personal SET fecha_inicio_demov = '${fecha_inicio_demov}', fecha_final_demov = '${fecha_final_demov}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);
    await pool.query(`UPDATE tb_equipo_item_personal SET fecha_inicio_demov = '${fecha_inicio_demov}', fecha_final_demov = '${fecha_final_demov}' WHERE id_mov_item_personal = '${id_mov_item_personal}'`);

    res.redirect(`planeacion/graficas/${id_planeacion}`);

});

router.get('/movilizacion/personal/eliminar/:id_mov_item_personal/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_personal,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_mov_item_personal WHERE id_mov_item_personal = ?", [id_mov_item_personal]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/movilizacion/vehiculos/:id_planeacion', isLoggedIn, async (req, res) => {

    const { id_planeacion } = req.params;
    const consulta = await pool.query("SELECT * FROM tb_planeacion WHERE id_planeacion = ?", [id_planeacion]);

    const vehiculo_carga = await pool.query("SELECT id_equipo, nombre_equipo, placa_equipo FROM tb_equipos");
    const unidad_medida = await pool.query("SELECT id_unidad_medida ,nombre_unidad_medida, abreviatura_unidad_medida FROM tb_unidad_medida");
    const rubros = await pool.query("SELECT id_rubro,sigla_rubro FROM tb_rubros");
    const monedas = await pool.query("SELECT id_moneda, abreviatura_moneda FROM tb_monedas");

    res.render('planeacion/Movilizacion/Vehiculos', {
        vehiculo_carga: vehiculo_carga,
        unidad_medida: unidad_medida,
        rubros: rubros,
        consulta: consulta,
        monedas: monedas
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

    const {
        id_planeacion,
        cal_m,
        cal_dm,
        cal_gs,
        verifica
    } = req.body;
    const datos = req.body;

    if (cal_m != undefined) {

        const {
            f_i_mov,
            f_f_mov
        } = req.body;
        const f_mov = req.body

        var fe_i_mov = new Date(f_i_mov);
        var fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_mov >= fe_f_mov) {
            req.flash('error', 'La fecha de inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }

    } else if (cal_dm != undefined) {

        const {
            f_i_dm,
            f_f_dm
        } = req.body;
        const f_dm = req.body

        var fe_i_dm = new Date(f_i_dm);
        var fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha de inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto_standby = '${f_i_dm}', fecha_final_gasto_standby = '${f_f_dm}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }

    } else if (cal_gs != undefined) {

        const {
            f_i_gs,
            f_f_gs,
            c_u_gs
        } = req.body;
        const f_gs = req.body;

        var fe_i_gs = new Date(f_i_gs);
        var fe_f_gs = new Date(f_f_gs);

        if (f_i_gs == '' || f_f_gs == '' || c_u_gs == '') {
            req.flash('error', 'Error en las fechas de gasto standby');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (fe_i_gs > fe_f_gs) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_mov_item_vehiculos SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', gasto_standby_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', gasto_standby_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_mov_item_combustibles SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_mov_item_vehiculo = '${verifica[i]}'`);
        }

    }
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
});

router.post('/calcularVehiculos_Equipo', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        verifica,
        cal_m,
        cal_dm,
        cal_gs
    } = req.body;
    const datos = req.body;

    console.log(verifica);

    if (cal_m != undefined) {

        const {
            f_i_mov,
            f_f_mov
        } = req.body;
        const f_mov = req.body;

        var fe_i_mov = new Date(f_i_mov);
        var fe_f_mov = new Date(f_f_mov);

        if (f_i_mov == '' || f_f_mov == '') {
            req.flash('error', 'Error en las fechas de movilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }
        if (fe_i_mov > fe_f_mov) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto = '${f_i_mov}', fecha_final_gasto = '${f_f_mov}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
        }

    } else if (cal_dm != undefined) {

        const {
            f_i_dm,
            f_f_dm
        } = req.body;
        const f_dm = req.body;

        var fe_i_dm = new Date(f_i_dm);
        var fe_f_dm = new Date(f_f_dm);

        if (f_i_dm == '' || f_f_dm == '') {
            req.flash('error', 'Error en las fechas de desmovilizacion');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }
        if (fe_i_dm > fe_f_dm) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_inicio_gasto_standby = '${f_i_mov}', fecha_final_gasto_standby = '${f_f_mov}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_inicio_gasto_standby = '${f_i_mov}', fecha_final_gasto_standby = '${f_f_mov}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
        }

    } else if (cal_gs != undefined) {

        const {
            f_i_gs,
            f_f_gs,
            c_u_gs
        } = req.body;
        const gs = req.body;

        var fe_i_gs = new Date(f_i_gs);
        var fe_f_gs = new Date(f_f_gs);

        if (f_i_gs == '' || f_f_gs == '' || c_u_gs == '') {
            req.flash('error', 'Error en las fechas de gasto standby');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        if (f_i_gs > f_f_gs) {
            req.flash('error', 'La fecha inicio no puede ser mayor');
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

        for (var i = 0; i <= verifica.length - 1; i++) {
            await pool.query(`UPDATE tb_equipo_item_equipo_herramienta SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
            await pool.query(`UPDATE tb_equipo_item_combustible SET fecha_1 = '${f_i_gs}', fecha_2 = '${f_f_gs}', costo_unitario = '${c_u_gs}' WHERE id_equipo_item_equipo_herramienta = '${verifica[i]}'`);
        }
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

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
        id_planeacion,
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
        id_planeacion,
        vehiculo,
        carga,
        id_unidad_medida,
        gasto_unitario,
        fecha_inicio_gasto,
        fecha_final_gasto,
        id_rubro,
        costo_unitario_rubro,
        id_moneda,
        medio_pago,
        observaciones
    } = req.body;
    const datos = req.body;

    if (fecha_inicio_gasto == '') {
        req.flash('error', 'El campo fecha inicio esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (fecha_final_gasto == '') {
        req.flash('error', 'El campo fecha final esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (vehiculo == '') {
        req.flash('error', 'El campo vehiculo esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (carga == '') {
        req.flash('error', 'El campo carga esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad de medida esta vacia');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (gasto_unitario == '') {
        req.flash('error', 'El campo gasto esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_rubro == '') {
        req.flash('error', 'El campo rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (observaciones == '') {
        req.flash('error', 'El campo observaciones esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (costo_unitario_rubro == '') {
        req.flash('error', 'El campo costo unitario rubro esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }
    if (medio_pago == '') {
        req.flash('error', 'El campo medio de pago esta vacio');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }

    var dia1 = new Date(fecha_inicio_gasto) / 86400000;
    var dia2 = new Date(fecha_final_gasto) / 86400000;

    var dias_gasto = dia2 - dia1;

    if (dias_gasto < 0) {
        req.flash('error', 'Error en las fechas');
        res.redirect(`/movilizacion/vehiculos/${id_planeacion}`);
    }

    var val = gasto_unitario * dias_gasto;

    req.flash('success', 'Item Agregado');
    res.redirect(`/planeacion/graficas/${id_planeacion}`);
    await pool.query("INSERT INTO tb_mov_item_vehiculos SET ?", [datos]);

    const consulta_id = await pool.query("SELECT id_mov_item_vehiculo FROM tb_mov_item_vehiculos");

    var array = [];

    for (var ids of consulta_id) {
        array.push(ids.id_mov_item_vehiculo);
    }

    console.log(array[array.length - 1]);

    await pool.query(`INSERT INTO tb_equipo_item_equipo_herramienta(id_planeacion,id_equipo_herramienta,vehiculo,carga,cantidad,id_moneda,id_rubro,id_mov_item_vehiculo,fecha_inicio_gasto,fecha_final_gasto,id_unidad_medida,observaciones,gasto_unitario,medio_pago,costo_unitario) 
    VALUES ('${id_planeacion}','${carga}','${vehiculo}','${carga}','${dias_gasto}','${id_moneda}','${id_rubro}','${array[array.length - 1]}','${fecha_inicio_gasto}','${fecha_final_gasto}','${id_unidad_medida}','${observaciones}','${gasto_unitario}','${req.body.medio_pago}','${costo_unitario_rubro}')`);

    const consulta_id_vehiculo = await pool.query("SELECT id_equipo_item_equipo_herramienta FROM tb_equipo_item_equipo_herramienta");

    var array2 = [];

    for (var ids of consulta_id_vehiculo) {
        array2.push(ids.id_equipo_item_equipo_herramienta);
    }

    console.log(array2[array2.lenght - 1]);

    await pool.query(`INSERT INTO tb_mov_item_combustibles(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_mov_item_vehiculo)
    VALUES('${id_planeacion}','${vehiculo}','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}')`);

    await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion,id_item,id_rubro,id_unidad_medida,id_moneda,costo_unitario,medio_pago,fecha_inicio_gasto,fecha_final_gasto,id_mov_item_vehiculo,id_equipo_item_equipo_herramienta)
    VALUES('${id_planeacion}','${vehiculo}','${id_rubro}','${id_unidad_medida}','${id_moneda}','${costo_unitario_rubro}','${medio_pago}','${fecha_inicio_gasto}','${fecha_final_gasto}','${array[array.length - 1]}','${array2[array2.length - 1]}')`);

});

router.get('/movilizacion/vehiculos/eliminar/:id_mov_item_vehiculo/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_mov_item_vehiculo,
        id_planeacion
    } = req.params;

    req.flash('success', 'Item Eliminado');

    await pool.query("DELETE FROM tb_mov_item_vehiculos WHERE id_mov_item_vehiculo = ?", [id_mov_item_vehiculo]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.post('/agregarCotizacion', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        titulo,
        credito,
        trm,
        consecutivo,
        descuento,
        agregar_cot,
        act_cot
    } = req.body;
    const datos = req.body;

    if (titulo == '') {
        req.flash('error', 'El campo titulo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (credito == '') {
        req.flash('error', 'El campo credito esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (consecutivo == '') {
        req.flash('error', 'El campo consecutivo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (descuento == '') {
        req.flash('error', 'El campo descuento esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (trm == '') {
        req.flash('error', 'El campo trm esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

    if (agregar_cot != undefined) {

        const validar_cot = await pool.query(`SELECT id_planeacion FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);

        var array = [];

        for (var id of validar_cot) {
            array.push(id.id_planeacion);
        }

        if (array.length > 0) {
            console.log("YA EXISTE UNA COTIZACION PARA LA PLANEACION");
        } else {
            await pool.query(`INSERT INTO tb_cotizaciones (id_planeacion,titulo,credito,trm,consecutivo,descuento) VALUES ('${id_planeacion}','${titulo}','${credito}','${trm}','${consecutivo}','${descuento}')`);
            res.redirect(`/planeacion/graficas/${id_planeacion}`);
        }

    } else if (act_cot != undefined) {

        await pool.query(`UPDATE tb_cotizaciones SET titulo = '${titulo}', credito = '${credito}', consecutivo = '${consecutivo}', descuento = '${descuento}' WHERE id_planeacion = '${id_planeacion}'`);
        res.redirect(`/planeacion/graficas/${id_planeacion}`);

    }


});

router.post('/cotizacion/costos', isLoggedIn, async (req, res) => {

    const {
        id_planeacion,
        id_cotizacion,
        tipo_cot,
        desc,
        cantidad,
        id_unidad_medida,
        precio,
        id_moneda
    } = req.body;
    const datos = req.body;

    if (tipo_cot == '') {
        req.flash('error', 'El campo tipo esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (desc == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_unidad_medida == '') {
        req.flash('error', 'El campo unidad_medida esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (precio == '') {
        req.flash('error', 'El campo precio esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }
    if (id_moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);
    }

    if (id_cotizacion == undefined) {

        console.log('Por favor crear primero la cotizacion');
        req.flash('error', 'Por favor crear primero la cotizacion');
        res.redirect(`/planeacion/graficas/${id_planeacion}`);

    } else {

        //await pool.query(`INSERT INTO tb_cotizaciones_costos (id_cotizacion,id_planeacion,tipo,descripcion,cantidad,id_unidad_medida,precio,id_moneda) 
        //VALUES ('${id_cotizacion}','${id_planeacion}','${tipo_cot}','${desc}','${cantidad}','${id_unidad_medida}','${precio}','${id_moneda}')`);

        const total = cantidad * precio;

        console.log(total);

        const op = total.toString();

        console.log(op[0]);

        console.log(op.length);

        var array = [];

        for (var i = 0; i <= op.length - 1; i++) {
            if (i % 3 === 0) {
                array.push(op[i]);
                array.push(',');
            } else {
                array.push(op[i]);
            }
        }

        console.log(array);

        for (var o = 0; o <= op.lenght - 1; o++) {
            console.log(array[o]);
        }

        res.redirect(`/planeacion/graficas/${id_planeacion}`);

    }
});

router.get('/cotizacion/costos/eliminar/:id_cotizacion_costo/:id_planeacion', isLoggedIn, async (req, res) => {

    const {
        id_cotizacion_costo,
        id_planeacion
    } = req.params;

    await pool.query("DELETE FROM tb_cotizaciones_costos WHERE id_cotizacion_costo = ?", [id_cotizacion_costo]);
    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

router.get('/cotizacion/costos/modificar/:id_cotizacion_costo', isLoggedIn, async (req, res) => {

    const { id_cotizacion_costo } = req.params;

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
        consulta: consulta
    });

});

router.post('/cotizacion/costos/modificar', isLoggedIn, async (req, res) => {

    const {
        id_cotizacion_costo,
        id_planeacion,
        tipo,
        desc,
        cantidad,
        unidad_medida,
        precio,
        moneda
    } = req.body;
    const datos = req.body;

    if (tipo == '') {
        req.flash('error', 'El campo tipo esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }
    if (desc == '') {
        req.flash('error', 'El campo descripcion esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }
    if (cantidad == '') {
        req.flash('error', 'El campo cantidad esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }
    if (unidad_medida == '') {
        req.flash('error', 'El campo unidad medida esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }
    if (precio == '') {
        req.flash('error', 'El campo precio esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }
    if (moneda == '') {
        req.flash('error', 'El campo moneda esta vacio');
        res.redirect(`/cotizacion/costos/modificar/${id_cotizacion_costo}`);
    }

    await pool.query(`UPDATE tb_cotizaciones_costos SET
    tipo = '${tipo}',
    descripcion = '${desc}', 
    cantidad = '${cantidad}', 
    id_unidad_medida = '${unidad_medida}', 
    precio = '${precio}', 
    id_moneda = '${moneda}'`);

    res.redirect(`/planeacion/graficas/${id_planeacion}`);

});

module.exports = router;