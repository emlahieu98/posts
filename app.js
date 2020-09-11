const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");



const postRouter = require('./src/routes/post');
const adminRouter = require('./src/routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRouter);
app.use('/admin/posts', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(
  logger("dev", {
    skip: (req, res) => {
      if (
        req.path.startsWith("/assets") ||
        req.path.startsWith("/dist") ||
        req.path.startsWith("/script")
      )
        return true;
      return false;
    },
  })
);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message)
  
});

module.exports = app;
