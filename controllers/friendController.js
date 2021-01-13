const users = require("../models/userModel");

const debug = console.log.bind(console);
module.exports.friendLists = (req, res) => {
 
  debug(`Demo xác thực token hợp lệ`);
  data = users.find((err, data)=>{
    if(err) throw err;
    if(data){
      console.log(data)
    }
  });
  console.log(data)
  const friends = [
    {
      name: "Cat: Russian Blue",
    },
    {
      name: "Cat: Maine Coon",
    },
    {
      name: "Cat: Balinese",
    },
  ];
  return res.status(200).json(data);
}
