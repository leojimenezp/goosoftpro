const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/item', isLoggedIn, async (req, res) => {
    const items = await pool.query('SELECT * FROM tb_item');
    if(items[0]==undefined ){} else {items.forEach(element=>{
        element.valor_item = Intl.NumberFormat().format(element.item)})}
    res.render('item/item', {items});
});

router.get('/item/crear', isLoggedIn, async (req, res) => {
    res.render('item/crear');
});

router.get('/eliminar-item/:id_item', isLoggedIn, async (req, res) => {
    
    const { id_item } = req.params;
    const bases = await pool.query(`DELETE FROM tb_item WHERE id_item ='${id_item}'`);

    res.redirect('/item');
});

router.post('/item',isLoggedIn, async (req, res) => {

    const { numero_item} = req.body;
    const descripcion_bitacora = "El usuario "+req.user.username+" creó un item nuevo con el ID "+numero_item;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    const array = req.body;
    console.log(array);

    const rows = await pool.query('SELECT id_item FROM tb_item WHERE numero_item = ?', [numero_item]);
    
    if (rows.length > 0) {
        
     req.flash('error', 'El ID del item ya existe!');
     res.redirect('item/crear');

    }else{
     
        await pool.query('INSERT INTO tb_item set ?', [array]);
        await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);
    
        req.flash('success', 'Registro exitoso!');
    
        res.redirect('item');

    }

});

router.get('/editar-item/:id_item', isLoggedIn, async (req, res) => {
    
    const { id_item } = req.params;
    const item = await pool.query('SELECT * FROM tb_item WHERE id_item = ?', [id_item]);
    res.render('item/editar', { item: item[0]});
});

router.post('/editar-item/:id_item', isLoggedIn , async (req, res) => {

    const { id_item } = req.params;
    const { numero_item} = req.body;
    const array = req.body; 
    const descripcion_bitacora = "El usuario "+req.user.username+" modificó el item con el ID "+numero_item;

    const bitacora = {
        descripcion_bitacora: descripcion_bitacora,
        id_user: req.user.id
    };

    await pool.query('UPDATE tb_item set ? WHERE id_item = ?', [array, id_item]);

    await pool.query('INSERT INTO tb_bitacora set ?', [bitacora]);

    req.flash('success', 'Registro moficicado exitosamente!');
    res.redirect('/item');
});


module.exports = router;