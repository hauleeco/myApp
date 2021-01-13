require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParer = require('cookie-parser');

var userRoute = require('./routes/user.route');
var port = 3000;
var app = express();

app.use(express.json())
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParer(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index',{
    });
});

app.use('/users', userRoute);

app.listen(port, ()=> {
    console.log('Server listenning on port '+ port);
});

module.exports = app;
