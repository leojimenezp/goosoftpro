
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const xlsx = require("xlsx");

router.get('/personal', isLoggedIn, async (req, res) => {
    const personal = await pool.query('SELECT * FROM tb_personal p,tb_cargos c WHERE p.id_cargo=c.id_cargo');
    res.render('personal/personal', { personal });
});

router.get('/personal/crear', isLoggedIn, async (req, res) => {
    
    const cargos = await pool.query('SELECT id_cargo,nombre_cargo FROM tb_cargos WHERE estado_cargo = ?',[1]);
    const bases = await pool.query('SELECT id_base,nombre_base FROM tb_bases WHERE estado_base = ?',[1]);
    res.render('personal/crear', {cargos,bases});
});

router.get('/eliminar-personal/:id', isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const bases = await pool.query(`DELETE FROM tb_personal WHERE id ='${id}'`);

    res.redirect('/personal');
});

router.post('/personal',isLoggedIn, async (req, res) => {
   
    const {
        nombre_personal,
        apellido_personal,
        numero_documento_personal,
        fecha_expedicion_personal,
        lugar_expedicion_personal,
        fecha_nacimiento_personal,
        lugar_nacimiento_personal,
        edad_personal,
        rh_personal,
        genero_personal,
        telefono_personal,
        telefono_residencia_personal,
        direccion_residencia_personal,
        ciudad_personal,
        correo_corporativo_personal,
        correo_personal,
        profesion_personal,
        experiencia_personal,
        contrato_personal,
        id_cargo,
        id_base,
        fecha_ingreso_personal,
        salario_personal,
        bono_salarial_personal,
        bono_no_salarial_personal,
        eps_personal,
        fecha_eps_personal,
        pension_personal,
        fecha_pension_personal,
        cesantias_personal,
        arl_personal,
        fecha_arl_personal,
        fecha_parafiscales_personal,
        sena_personal,
        icbf_personal,
        caja_personal,
        accidente_personal,
        accidente_telefono_personal,
        estado_personal,
        derecho_festivo
    } = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un personal nuevo con No. de documento "+numero_documento_personal;
    let tipe ,file = req.files.foto_personal;
    tipe = file.name.split('.')
    console.log(req.files.foto_personal)
    console.log(tipe[1])
    console.log(file.name)
    file.mv(`${__dirname}/../public/pics-personal/${file.name}`) 

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };
    let foto_personal = file.name; 

    console.log(foto_personal)
        array =[]
      array = {
        nombre_personal,
        apellido_personal,
        numero_documento_personal,
        fecha_expedicion_personal,
        lugar_expedicion_personal,
        fecha_nacimiento_personal,
        lugar_nacimiento_personal,
        edad_personal,
        rh_personal,
        genero_personal,
        telefono_personal,
        telefono_residencia_personal,
        direccion_residencia_personal,
        ciudad_personal,
        correo_corporativo_personal,
        correo_personal,
        profesion_personal,
        experiencia_personal,
        contrato_personal,
        id_cargo,
        id_base,
        fecha_ingreso_personal,
        salario_personal,
        bono_salarial_personal,
        bono_no_salarial_personal,
        eps_personal,
        fecha_eps_personal,
        pension_personal,
        fecha_pension_personal,
        cesantias_personal,
        arl_personal,
        fecha_arl_personal,
        fecha_parafiscales_personal,
        sena_personal,
        icbf_personal,
        caja_personal,
        accidente_personal,
        accidente_telefono_personal,
        estado_personal,
        derecho_festivo,
        foto_personal
    } 

    console.log(array);

    const rows = await pool.query('SELECT id FROM tb_personal WHERE numero_documento_personal = ?', [numero_documento_personal]);
    
    if (rows.length > 0) {
        
     req.flash('error', 'El No. documento ya existe!');
     res.redirect('personal/crear');

    }else{
     
        await pool.query('INSERT INTO tb_personal set ?', [array]);
        await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    
        req.flash('success', 'Registro exitoso!');
    
        res.redirect('personal');
 
    }

});

router.get('/editar-personal/:id', isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const personal = await pool.query('SELECT * FROM tb_personal WHERE id = ?', [id]);
    const cargos = await pool.query('SELECT id_cargo,nombre_cargo FROM tb_cargos WHERE estado_cargo = ?',[1]);
    const bases = await pool.query('SELECT id_base,nombre_base FROM tb_bases WHERE estado_base = ?',[1]);
    
    res.render('personal/editar', { personal: personal[0], cargos, bases});
});

router.get('/ver-personal/:id', isLoggedIn, async (req, res) => {
    
    const { id } = req.params;
    const personal = await pool.query('SELECT * FROM tb_personal p,tb_cargos c,tb_bases b WHERE p.id ='+id+' AND p.id_cargo=c.id_cargo AND p.id_base=b.id_base');
    personal[0].bono_salarial_personal = Intl.NumberFormat().format( personal[0].bono_salarial_personal);
    personal[0].salario_personal = Intl.NumberFormat().format( personal[0].salario_personal);
    personal[0].bono_no_salarial_personal = Intl.NumberFormat().format( personal[0].bono_no_salarial_personal);
    console.log(personal[0].bono_no_salarial_personal)
    console.log(personal)
    res.render('personal/ver', { personal: personal[0]});
});

router.post('/editar-personal/:id', isLoggedIn , async (req, res) => {
    const { id } = req.params;
    const {
        nombre_personal,
        apellido_personal,
        numero_documento_personal,
        fecha_expedicion_personal,
        lugar_expedicion_personal,
        fecha_nacimiento_personal,
        lugar_nacimiento_personal,
        edad_personal,
        rh_personal,
        genero_personal,
        telefono_personal,
        telefono_residencia_personal,
        direccion_residencia_personal,
        ciudad_personal,
        correo_corporativo_personal,
        correo_personal,
        profesion_personal,
        experiencia_personal,
        contrato_personal,
        id_cargo,
        id_base,
        fecha_ingreso_personal,
        salario_personal,
        bono_salarial_personal,
        bono_no_salarial_personal,
        eps_personal,
        fecha_eps_personal,
        pension_personal,
        fecha_pension_personal,
        cesantias_personal,
        arl_personal,
        fecha_arl_personal,
        fecha_parafiscales_personal,
        sena_personal,
        icbf_personal,
        caja_personal,
        accidente_personal,
        accidente_telefono_personal,
        estado_personal,
        derecho_festivo
    } = req.body;
  
    
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el personal con No. de documento "+numero_documento_personal;
    let tipe, file = req.files.foto_personal;
    tipe= file.name.split('.')
 
    
    file.mv(`${__dirname}/../public/pics-personal/${file.name}`) 
    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };
    let foto_personal = file.name; 

    array =[]
    array = {
        nombre_personal,
        apellido_personal,
        numero_documento_personal,
        fecha_expedicion_personal,
        lugar_expedicion_personal,
        fecha_nacimiento_personal,
        lugar_nacimiento_personal,
        edad_personal,
        rh_personal,
        genero_personal,
        telefono_personal,
        telefono_residencia_personal,
        direccion_residencia_personal,
        ciudad_personal,
        correo_corporativo_personal,
        correo_personal,
        profesion_personal,
        experiencia_personal,
        contrato_personal,
        id_cargo,
        id_base,
        fecha_ingreso_personal,
        salario_personal,
        bono_salarial_personal,
        bono_no_salarial_personal,
        eps_personal,
        fecha_eps_personal,
        pension_personal,
        fecha_pension_personal,
        cesantias_personal,
        arl_personal,
        fecha_arl_personal,
        fecha_parafiscales_personal,
        sena_personal,
        icbf_personal,
        caja_personal,
        accidente_personal,
        accidente_telefono_personal,
        estado_personal,
        derecho_festivo,
        foto_personal
    } 
    await pool.query('UPDATE tb_personal set ? WHERE id = ?', [array, id]);
    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/personal');
});

module.exports = router;