const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM tb_personal WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user);
    } else {
      done(null, false, req.flash('error', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('error', 'El nombre de usuario no existe.'));
  }
}));

passport.use('crear.usuario', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const {id } = req.body;
  const newUser = req.body;
  newUser.password = await helpers.encryptPassword(password);

  const result =  await pool.query('UPDATE tb_personal set ? WHERE id = ?', [newUser, id]);
  return done(null);
}));
passport.use('crear.nueva_clave', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const {id } = req.body;
  const newUser = req.body;
  newUser.password = await helpers.encryptPassword(password);

  const result =  await pool.query('UPDATE tb_personal set ? WHERE id = ?', [newUser, id]);
  return done(null);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM tb_personal p,tb_cargos c WHERE p.id = '+[id]+' AND p.id_cargo=c.id_cargo');
  done(null, rows[0]);
});