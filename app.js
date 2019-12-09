const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const hbs = require('hbs')


require('./config/db.config')
require('./config/hbs.config')
const session = require('./config/session.config')

// configure express

const app = express()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// sesion config
app.use(session);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})

// hbs config

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// const equalsHelper = require('./helpers/equals');
// hbs.registerHelper('equals', equalsHelper);

// routes configuration

const router = require('./config/routes.js');
app.use('/', router);



// listen on port

const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// normalizaPort
function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }