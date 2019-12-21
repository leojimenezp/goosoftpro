const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const helpers = require('./helpers/helper')
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload')

const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'Guacamaya',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.use(fileUpload());

// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.error = req.flash('error');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/bases'));
app.use(require('./routes/cargos'));
app.use(require('./routes/unidad-medida'));
app.use(require('./routes/tipo-pozos'));
app.use(require('./routes/tipo-contratos'));
app.use(require('./routes/rubros'));
app.use(require('./routes/monedas'));
app.use(require('./routes/centro-costos'));
app.use(require('./routes/proveedores'));
app.use(require('./routes/clientes'));
app.use(require('./routes/personal'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/contratos'));
app.use(require('./routes/campos'));
app.use(require('./routes/pozos'));
app.use(require('./routes/item'));
app.use(require('./routes/tipo-trabajos'));
app.use(require('./routes/calendario'));
app.use(require('./routes/equipos-herramientas'));
app.use(require('./routes/tipo-equipos-herramientas'));
app.use(require('./routes/planeacion'));
app.use(require('./routes/planeacion_template'));
app.use(require('./routes/consignaciones'));
app.use(require('./routes/legalizacion'));
app.use(require('./routes/gestionbonos'));
app.use(require('./routes/hojas-trabajo'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});