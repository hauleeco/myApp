const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    avatar: String,
    accessToken: String,
    refreshToken: String,
    email: String,
    password: String,
    fullname: String,
    phone: String,
    address: String,
    sex: String
  });
  const users = mongoose.model('users', userSchema);

module.exports = users;

