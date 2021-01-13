// var multer  = require('multer')
// var fs = require('fs');
// var upload = multer().single('avatar');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//       var duoifile = file.originalname.split(".")
//       var tenfile
//       for(i=0;i<100; i++){
//         if (!fs.existsSync('./public/uploads/user-'+i+"."+duoifile[1])) {
//           tenfile = "user-"+i+"."+duoifile[1]
//           break;
//         }
//       }
//       cb(null, tenfile)//set file name
//     }
//   })
//   var maxSize = 1000* 1000* 1000 ; //check file
// let upload = multer({ storage: storage, limits: { fileSize: maxSize } });