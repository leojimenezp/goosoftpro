const express = require('express');
const router = express.Router();
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/proveedores', isLoggedIn, async (req, res) => {
    const proveedores = await pool.query('SELECT * FROM tb_proveedor');
    res.render('proveedores/proveedores', { proveedores });
});

router.get('/proveedores/crear', isLoggedIn, async (req, res) => {
    res.render('proveedores/crear');
});

router.post('/proveedores',isLoggedIn, async (req, res) => {

    const { numero_documento_proveedor} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un proveedor nuevo con No. de documento "+numero_documento_proveedor;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const { id_personal,tipo_documento_proveedor,regimen_proveedor,rut_proveedor,
        razon_social_proveedor,contacto_proveedor,email_proveedor,telefono_proveedor,extension_proveedor,
        pais_proveedor,departamento_proveedor,ciudad_proveedor,direccion_proveedor,categoría_proveedor,
        area_influencia_proveedor,banco_proveedor,tipo_banco_proveedor,numero_cuenta_proveedor,
        seguridad_social_proveedor,estado_proveedor,actividad_economica_proveedor 
    } = req.body;

    const certificado_bancario_proveedor = req.files.certificado_bancario_proveedor;

    const array = {
        id_personal,
        tipo_documento_proveedor,
        numero_documento_proveedor,
        regimen_proveedor,
        rut_proveedor,
        razon_social_proveedor,
        contacto_proveedor,
        email_proveedor,
        telefono_proveedor,
        extension_proveedor,
        pais_proveedor,
        departamento_proveedor,
        ciudad_proveedor,
        direccion_proveedor,
        categoría_proveedor,
        area_influencia_proveedor,
        banco_proveedor,
        tipo_banco_proveedor,
        numero_cuenta_proveedor,
        seguridad_social_proveedor,
        certificado_bancario_proveedor: certificado_bancario_proveedor.name,
        estado_proveedor,
        actividad_economica_proveedor
    };

    certificado_bancario_proveedor.mv(path.join('src/public/files-proveedores/',certificado_bancario_proveedor.name));

    await pool.query('INSERT INTO tb_proveedor set ?', [array]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    req.flash('success', 'Registro exitoso!');
    res.redirect('/proveedores');
});

router.get('/editar-proveedor/:id_proveedor', isLoggedIn, async (req, res) => {
    
    const { id_proveedor } = req.params;
    const proveedor = await pool.query('SELECT * FROM tb_proveedor WHERE id_proveedor = ?', [id_proveedor]);

    res.render('proveedores/editar', { proveedor: proveedor[0]});
});

router.post('/editar-proveedor/:id_proveedor', isLoggedIn , async (req, res) => {

    const { id_proveedor } = req.params;
    const { numero_documento_proveedor} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el proveedor con No. de documento "+numero_documento_proveedor;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_proveedor set ? WHERE id_proveedor = ?', [array, id_proveedor]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/proveedores');
});

module.exports = router;