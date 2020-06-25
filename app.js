var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入session模块
let session = require('express-session')
// 引入上传模块
let multer = require('multer');
// let upload = multer({dest:"./public/upload"})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter  = require('./routes/sessionModel.js')
// var loginRouter  = require('./routes/loginRouter')
// 引入后台路由模块
var adminRouter = require('./routes/admin/adminRouter')
// 引入注册登录模块
var loginRouter = require('./routes/login/loginRouter')
var app = express();

// view engine setup
// 视图设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件 解析请求对象
// 配置session
app.use(session({
  secret:'lgwd',
  resave:true,//强制保存sesstion
  cookie:{
    maxAge:7*24*3600*1000,
  },
  saveUninitialized:true,//保存初始化的session
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

// 路由匹配
// 前台路由
app.use('/', indexRouter);
// 后台路由
app.use('/admin',adminRouter);
// 登录注册路由
app.use('/rl', loginRouter);
app.use('/users', usersRouter);
// session相关页面的路有匹配
app.use('/session',sessionRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404.ejs')
  // next(createError(404));
});

// error handler
// 处理错误的中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
