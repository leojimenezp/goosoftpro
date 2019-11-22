const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/calendario', isLoggedIn, async (req, res) => {
    res.render('calendario/calendario');
});

module.exports = router;