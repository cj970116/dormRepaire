var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let mysql = require('mysql')

var app = express();
var http = require('http');
var server = http.createServer(app);

var debug = require('debug')('my-application'); // debug模块

// 加载跨域模块
const cors = require('cors')
app.use(cors())
app.set('port', process.env.PORT || 3000); // 设定监听端口
 
//启动监听
var server = app.listen(app.get('port'), function() {
debug('Express server listening on port ' + server.address().port);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/cj', indexRouter);
app.use('/users', usersRouter);
app.set("view engine","ejs")

// catch 404 and forward to error handler


// error handler


server.listen(3000,()=>{
  console.log("3000");
  
})
