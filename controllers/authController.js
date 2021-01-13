const jwtHelper = require("../helpers/jwt.helper");
var users = require('../models/userModel');
const debug = console.log.bind(console);

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ||"refresh-token-secret";

module.exports.login = async (req, res) => {
  try {
    debug(`Đăng nhập với Email: ${req.body.email} 
          Password: ${req.body.password}`);
    
    let email = req.body.email
    const data ={
      email: req.body.email,
      password: req.body.password
    }
    const accessToken = await jwtHelper.generateToken(data, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(data, refreshTokenSecret, refreshTokenLife);

    tokenList[refreshToken] = {accessToken, refreshToken};
    
    debug(`Gửi Token và Refresh Token về cho client...`);
    console.log(accessToken)
  
    users.updateOne({email:email},{$set :{accessToken, refreshToken}}, (err, datadb)=>{
      if(datadb){
        //res.status(200).send('Update token Success');
        //insert token
        }
    })

    return res.status(200).json({accessToken, refreshToken});
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports.refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;

  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      const userFakeData = decoded.data;

      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({accessToken});
    } catch (error) {
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    //khong tim thay token
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};
