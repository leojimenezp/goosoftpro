const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/contratos', isLoggedIn, async (req, res) => {
    const contratos = await pool.query('SELECT * FROM tb_contratos c,tb_monedas m, tb_clientes cl, tb_tipo_contratos tc WHERE c.id_moneda=m.id_moneda AND c.id_tipo_contrato=tc.id_tipo_contrato AND c.id_cliente=cl.id_cliente');
    if(contratos[0]==undefined ){}
     else{contratos.forEach(element=>{
        element.bolsa_contrato= Intl.NumberFormat().format(element.bolsa_contrato)})}
    res.render('contratos/contratos', { contratos });
});

router.get('/contratos/crear', isLoggedIn, async (req, res) => {

    const monedas = await pool.query('SELECT id_moneda,nombre_moneda FROM tb_monedas WHERE estado_moneda = ?',[1]);
    const tipo_contratos = await pool.query('SELECT id_tipo_contrato,nombre_tipo_contrato FROM tb_tipo_contratos WHERE estado_tipo_contrato = ?',[1]);
    const clientes = await pool.query('SELECT id_cliente,razon_social_cliente FROM tb_clientes WHERE estado_cliente = ?',[1]);

    res.render('contratos/crear', { monedas, tipo_contratos, clientes });
});

router.post('/contratos',isLoggedIn, async (req, res) => {

    const { numero_contrato} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un contrato nuevo con el ID "+numero_contrato;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    console.log(array);

    const rows = await pool.query('SELECT id_contrato FROM tb_contratos WHERE numero_contrato = ?', [numero_contrato]);
    
    if (rows.length > 0) {
        
     req.flash('error', 'El ID de contrato ya existe!');
     res.redirect('contratos/crear');

    }else{
     
        await pool.query('INSERT INTO tb_contratos set ?', [array]);
        await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    
        req.flash('success', 'Registro exitoso!');
    
        res.redirect('contratos');

    }

});

router.get('/editar-contrato/:id_contrato', isLoggedIn, async (req, res) => {
    
    const { id_contrato } = req.params;

    const contrato = await pool.query('SELECT * FROM tb_contratos WHERE id_contrato = ?', [id_contrato]);
    const monedas = await pool.query('SELECT id_moneda,nombre_moneda FROM tb_monedas WHERE estado_moneda');
    const tipo_contratos = await pool.query('SELECT id_tipo_contrato,nombre_tipo_contrato FROM tb_tipo_contratos');
    const clientes = await pool.query('SELECT id_cliente,razon_social_cliente FROM tb_clientes WHERE estado_cliente');
    const costos_fijos = await pool.query('SELECT * FROM tb_costos_fijos WHERE id_contrato = ?', [id_contrato]);

    res.render('contratos/editar', { contrato: contrato[0], monedas, tipo_contratos, clientes,costos_fijos});
});
router.get('/eliminar-contrato/:id_contrato/:descripcion_contrato', isLoggedIn, async (req, res) => {
    const {descripcion_contrato} =req.params
    const { id_contrato } = req.params;
    const descripcion_bitacora = "El usuario "+req.user.username+" elimino un contrato" +descripcion_contrato ;

    const bitacora = {
    descripcion_bitacora: descripcion_bitacora,
    id_user: req.user.id}

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    const bases = await pool.query(`DELETE FROM tb_contratos WHERE id_contrato ='${id_contrato}'`);

    res.redirect('/contratos');
});


router.post('/editar-contrato/:id_contrato', isLoggedIn , async (req, res) => {

    const { id_contrato } = req.params;
    const { numero_contrato} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el contrato con el ID "+numero_contrato;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_contratos set ? WHERE id_contrato = ?', [array, id_contrato]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/contratos');
});

router.post('/contratos-costos-fijos',isLoggedIn, async (req, res) => {
   
    const { id_contrato } = req.body;

    const array = req.body;
    await pool.query('INSERT INTO tb_costos_fijos set ?', [array]);

    req.flash('success', 'Registro exitoso!');
    res.redirect('/editar-contrato/'+id_contrato);
});

router.get('/contrato-eliminar-costo-fijo/:id_costo_fijo/:id_contrato', isLoggedIn, async (req, res) => {
    
    const { id_costo_fijo } = req.params;
    const { id_contrato } = req.params;
    
    await pool.query('DELETE FROM tb_costos_fijos WHERE id_costo_fijo = ?', id_costo_fijo);
    req.flash('error', 'Registro eliminado!');
    res.redirect('/editar-contrato/'+id_contrato);

});

module.exports = router;