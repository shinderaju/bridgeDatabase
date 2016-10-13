var multer = require('multer');
var fileName = 'uploadFile.json';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //  console.log(file);
        cb(null, './fileUpload/')
    },
    filename: function(req, file, cb) {
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage
}).single('file');

module.exports = upload;
