const express = require('express');
const router = express.Router();
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/equipos-herramientas', isLoggedIn, async (req, res) => {
    const equipos = await pool.query('SELECT id_equipo,nombre_equipo,descripcion_equipo,propietario_equipo,estado_equipo FROM tb_equipos');
    res.render('equipos-herramientas/equipos-herramientas', {equipos});
});

router.get('/equipos-herramientas/crear', isLoggedIn, async (req, res) => {
    const proveedor = await pool.query('SELECT id_proveedor,razon_social_proveedor FROM tb_proveedor WHERE estado_proveedor = ?',[1]);
    const tipo_equipos_herramientas = await pool.query('SELECT * FROM tb_tipo_equipos_herramientas WHERE estado_equipo_herramienta = ?',[1]);
    res.render('equipos-herramientas/crear',{proveedor,tipo_equipos_herramientas});
});

router.post('/equipos-herramientas',isLoggedIn, async (req, res) => {
   
    const { id_personal,nombre_equipo, descripcion_equipo, codigo_equipo, placa_equipo, id_proveedor,
        tuberia_equipo,alto_equipo,ancho_equipo,capacidad_equipo,dia_equipo,peso_base_equipo,
        marca_equipo,arriendo_equipo,fecha_inicio_tecno_equipo,fecha_fin_tecno_equipo,fecha_inicio_propiedad_equipo,
        fecha_fin_propiedad_equipo,fecha_inicio_soat_equipo,fecha_fin_soat_equipo,
        fecha_inicio_grua_equipo,fecha_fin_grua_equipo,largo_equipo,diametro_equipo,ejes_equipo,peso_cargado_equipo,
        fecha_inicio_lmi_equipo,fecha_fin_lmi_equipo,color_equipo,fecha_inicio_pliza_equipo,fecha_fin_pliza_equipo,
        modelo_equipo,propietario_equipo,fecha_inicio_luz_equipo,fecha_fin_luz_equipo,fecha_inicio_licencia_equipo,
        fecha_fin_licencia_equipo,fecha_inicio_inspeccion_equipo,fecha_fin_inspeccion_equipo,id_tipo_equipo_herramienta,
        fecha_inicio_king_equipo,fecha_fin_king_equipo,fecha_inicio_resolucion_equipo,fecha_fin_resolucion_equipo,
        estado_equipo
     } = req.body;

    const doc_tecnomecanica_equipo = req.files.doc_tecnomecanica_equipo;
    const doc_tarjeta_propiedad_equipo = req.files.doc_tarjeta_propiedad_equipo;
    const doc_grua_equipo = req.files.doc_grua_equipo;
    const doc_lmi_equipo = req.files.doc_lmi_equipo;
    const doc_poliza_equipo = req.files.doc_poliza_equipo;
    const doc_luz_equipo = req.files.doc_luz_equipo;
    const doc_licencia_equipo = req.files.doc_licencia_equipo;
    const doc_inspeccion_equipo = req.files.doc_inspeccion_equipo;
    const doc_king_equipo = req.files.doc_king_equipo;
    const doc_resolucion_equipo = req.files.doc_resolucion_equipo;
    const doc_soat_equipo = req.files.doc_soat_equipo;

    const array = {
        id_personal,
        nombre_equipo,
        descripcion_equipo,
        codigo_equipo,
        placa_equipo,
        id_proveedor,
        tuberia_equipo,
        alto_equipo,
        ancho_equipo,
        capacidad_equipo,
        dia_equipo,
        peso_base_equipo,
        marca_equipo,
        arriendo_equipo,
        fecha_inicio_tecno_equipo,
        fecha_fin_tecno_equipo,
        doc_tecnomecanica_equipo: doc_tecnomecanica_equipo.name,
        fecha_inicio_propiedad_equipo,
        fecha_fin_propiedad_equipo,
        doc_tarjeta_propiedad_equipo: doc_tarjeta_propiedad_equipo.name,
        fecha_inicio_soat_equipo,
        fecha_fin_soat_equipo,
        doc_soat_equipo: doc_soat_equipo.name,
        fecha_inicio_grua_equipo,
        fecha_fin_grua_equipo,
        doc_grua_equipo: doc_grua_equipo.name,
        largo_equipo,
        diametro_equipo,
        ejes_equipo,
        peso_cargado_equipo,
        fecha_inicio_lmi_equipo,
        fecha_fin_lmi_equipo,
        doc_lmi_equipo: doc_lmi_equipo.name,
        color_equipo,
        fecha_inicio_pliza_equipo,
        fecha_fin_pliza_equipo,
        doc_poliza_equipo: doc_poliza_equipo.name,
        modelo_equipo,
        propietario_equipo,
        fecha_inicio_luz_equipo,
        fecha_fin_luz_equipo,
        doc_luz_equipo: doc_luz_equipo.name,
        fecha_inicio_licencia_equipo,
        fecha_fin_licencia_equipo,
        doc_licencia_equipo: doc_licencia_equipo.name,
        fecha_inicio_inspeccion_equipo,
        fecha_fin_inspeccion_equipo,
        doc_inspeccion_equipo: doc_inspeccion_equipo.name,
        id_tipo_equipo_herramienta,
        fecha_inicio_king_equipo,
        fecha_fin_king_equipo,
        doc_king_equipo: doc_king_equipo.name,
        fecha_inicio_resolucion_equipo,
        fecha_fin_resolucion_equipo,
        doc_resolucion_equipo: doc_resolucion_equipo.name,
        estado_equipo
      
    };

    doc_tecnomecanica_equipo.mv(path.join('src/public/files-equipos/',doc_tecnomecanica_equipo.name));
    doc_tarjeta_propiedad_equipo.mv(path.join('src/public/files-equipos/',doc_tarjeta_propiedad_equipo.name));
    doc_grua_equipo.mv(path.join('src/public/files-equipos/',doc_grua_equipo.name));
    doc_poliza_equipo.mv(path.join('src/public/files-equipos/',doc_poliza_equipo.name));
    doc_luz_equipo.mv(path.join('src/public/files-equipos/',doc_luz_equipo.name));
    doc_licencia_equipo.mv(path.join('src/public/files-equipos/',doc_licencia_equipo.name));
    doc_inspeccion_equipo.mv(path.join('src/public/files-equipos/',doc_inspeccion_equipo.name));
    doc_king_equipo.mv(path.join('src/public/files-equipos/',doc_king_equipo.name));
    doc_resolucion_equipo.mv(path.join('src/public/files-equipos/',doc_resolucion_equipo.name));
    doc_lmi_equipo.mv(path.join('src/public/files-equipos/',doc_lmi_equipo.name));
    doc_soat_equipo.mv(path.join('src/public/files-equipos/',doc_soat_equipo.name));

    const descripcion_bitacora = "El usuario "+req.user.username+" creó un nuevo equipo o herramienta llamado "+nombre_equipo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };
    
    await pool.query('INSERT INTO tb_equipos set ?', [array]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    req.flash('success', 'Registro exitoso!');
    res.redirect('/equipos-herramientas');
});

router.get('/editar-equipo-herramienta/:id_equipo', isLoggedIn, async (req, res) => {
    
    const { id_equipo } = req.params;
    const equipo = await pool.query('SELECT * FROM tb_equipos WHERE id_equipo = ?', [id_equipo]);
    const proveedor = await pool.query('SELECT id_proveedor,razon_social_proveedor FROM tb_proveedor');
    const tipo_equipos_herramientas = await pool.query('SELECT * FROM tb_tipo_equipos_herramientas');

    res.render('equipos-herramientas/editar', { equipo: equipo[0], proveedor,tipo_equipos_herramientas});
});

router.post('/editar-equipo-herramienta/:id_equipo', isLoggedIn , async (req, res) => {

    const { id_equipo } = req.params;
    const { nombre_equipo} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el equipo o herramienta llamado "+nombre_equipo;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_equipos set ? WHERE id_equipo = ?', [array, id_equipo]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/equipos-herramientas');
});

module.exports = router;