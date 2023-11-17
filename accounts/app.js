var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/web/index');
const authRoter=require('./routes/web/auth')
const authApiRouter=require('./routes/api/appauth')
//导入account接口路由文件
const accountRouter=require('./routes/api/account')

//
const session=require('express-session')
const MongoStore=require('connect-mongo')
var app = express();
//导入配置项
const{DBHOST,DBPORT,DBNAME}=require('./config')
//设置session中间件
app.use(session({
  name:'sid',
  secret:'shushu',
  saveUninitialized:false,
  resave:true,// 是否在每次请求时重新保存session20分钟
  store:MongoStore.create({
      mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie:{
      httpOnly:true,//开启后前端无法通过js操作查看cookie
      maxAge:1000*60*60*24*7
  }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRoter);
app.use('/api',authApiRouter)
app.use('/api',accountRouter)

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

module.exports = app;
