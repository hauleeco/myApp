const AuthMiddleWare = require("../helpers/authMiddware");
const AuthController = require("../controllers/authController");
const friendController = require("../controllers/friendController");
const { Sequelize } = require('sequelize');

var md5 = require('md5')
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set(bodyParser.json());


var router = express.Router();
var controller = require('../controllers/userController')
//middware
let middleware = (req, res, next) => {
  let user= app.locals.user;
 // console.log(app.locals.user);
  if(user){
    res.redirect('/users/update')
  }
  next();
}
//upfile
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      var duoifile = file.originalname.split(".")
      var tenfile
      for(i=0;i<100; i++){
        if (!fs.existsSync('./public/uploads/user-'+i+"."+duoifile[1])) {
          tenfile = "user-"+i+"."+duoifile[1]
          break;
        }
      }
      cb(null, tenfile)//set file name
    }
  })
  var maxSize = 1000* 1000* 1000 ; //check file
  var upload = multer({ storage: storage, limits: { fileSize: maxSize } });
//redis
// const redis = require('redis');
// const randomInt = require('random-int');


// const REDIS_PORT = process.env.PORT || 6379;

// const client = redis.createClient(REDIS_PORT);

//mongo
const mongoose = require('mongoose');
const { METHODS } = require('http');

mongoose.connect('mongodb://localhost/express',{ useNewUrlParser: true },{ useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});
var users = require('../models/userModel');
//siquelize
// const sequelize = new Sequelize('sinhvien', 'root', '12345', {
//   host: 'localhost',
//   dialect:  'mysql'
// });
// try {
//    sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
//route
router.post('/create', controller.postCreate)
router.post('/update',upload.single('avatar'), controller.postUpdate);
router.post('/login', controller.postLogin)

router.get('/', controller.index);
router.get('/create', middleware, controller.create);
router.get('/update',controller.update);
router.get('/login',
//AuthController.login, 
middleware, 
controller.login);

router.post("/dangnhap", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.get("/friends", friendController.friendLists);
router.post("/update", AuthMiddleWare.isAuth, friendController.friendLists);
  
module.exports = router;