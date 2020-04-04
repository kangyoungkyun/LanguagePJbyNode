var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loger = require('./logmodule.js');            //로그모듈

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//html 랜더링
app.engine('html', require('ejs').renderFile);
//대소문자 구분하기
app.set('case sensitive routes', true);                       

//미들웨어 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//static 파일 저장 경로
app.use(express.static(path.join(__dirname, 'public')));


//라우터 미들웨어 설정 - / 경로로 들어오면 여기서 모두 처리
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

loger.info("서버 작동. - index.js");
module.exports = app;
