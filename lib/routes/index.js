const express = require('express');

const router = express.Router();

const passport = require('passport');

const {
  isLoggedIn,
  isNotLoggedIn
} = require('../lib/auth');

const path = require('path');

const pool = require('../database');

router.get('/', isNotLoggedIn, async (req, res) => {
  res.render('login/login');
});
router.get('/registro', isNotLoggedIn, async (req, res) => {
  res.render('registro/registro');
});
router.post('/registro', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));
router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});
router.get('/dashboard', isLoggedIn, async (req, res) => {
  consulta = await pool.query(`SELECT nombre_personal , apellido_personal FROM tb_personal WHERE id=${req.user.id}`);
  res.render('dashboard/dashboard', {
    consulta: consulta
  });
});
module.exports = router;