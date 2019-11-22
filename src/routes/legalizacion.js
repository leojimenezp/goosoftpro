const express = require('express');
const router = express.Router();

router.get('/legalizacion', (req,res) => {
    res.render('legalizacion/legalizacion')
})

router.get('/legalizacion/agregar', (req,res) => {
    res.render('legalizacion/agregar-legalizacion')
})
module.exports = router;