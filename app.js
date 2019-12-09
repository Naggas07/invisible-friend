const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const hbs = require('hbs')


require('./config/db.config')
const session = require('./config/session.config')

// configure express

const app = express()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})
