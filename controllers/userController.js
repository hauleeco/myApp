var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.set(bodyParser.json());

var md5 = require('md5')
var users = require('../models/userModel');

module.exports.index = function(req, res){
    res.render('users/index')
};

module.exports.create = function(req, res){
    res.render('users/create')
};
module.exports.postCreate = function(req, res, next) {
    let email = req.body.email;
      if(!email){
         res.send("Khong co thong tin email")
       }
    
    let password = md5(req.body.password);
       if(!password){
         res.status(400).send("mat khau khong duoc de trong");
       }
  
    users.findOne({email: email}, function(err, data){
          if(data){
          res.send('Email da co, nhap lai email khac de dang ki');
          return; 
          } 
        if(data === null){
          users.insertMany({email, password}, function(data){
          //  res.status(200).send('dang ki thanh cong');
            app.locals.user=email;
            res.redirect('/users/update')
         })
        }     
    })
  }

module.exports.update = function(req, res){
    res.render('users/update');
};

module.exports.postUpdate = function(req, res, next) {
    
    let email = req.body.email;
      if(!email){
         res.send("Khong co thong tin email")
       }
  
    let avatar = req.file.path
    let fullname = req.body.fullname;
    let phone = req.body.phone;
    let address = req.body.address;
    let sex = req.body.sex;
        users.updateOne({email},{$set :{avatar, fullname, phone, address, sex}} , function(err, data){
          // if(!email && !password){
          //   res.send('Sai mk or email')
          //   return; 
          // }
          if(data){
          res.status(200).send('Update Success');
          }
        } ) 
  }

module.exports.login = function(req, res){
    res.render('users/login');
};

module.exports.postLogin = function(req, res, next){
    let email = req.body.email;
      if(!email){
        res.send("Khong co thong tin email")
      }
        
      let password = md5(req.body.password);
          if(!password){
              res.status(400).send("mat khau khong duoc de trong");
          }
        
      let sex = req.body.sex;
          users.findOne({email: email, password:password}, function(err, data){
          if(data===null){
              res.send('Wrong email or password. Please login again');
              return; 
          } 
          if(data){
              //AuthController.login
              //res.status(200).send('dang nhap thanh cong');
              //res.cookie('userId', 1)
              res.redirect('/users/update');
              }    
          })
}