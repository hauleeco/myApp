const mongoose = require('mongoose');
const { METHODS } = require('http');
module.exports.connnect= ()=>{
    mongoose.connect('mongodb://localhost/express',{ useNewUrlParser: true },{ useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('we\'re connected!');
    });
    
}
