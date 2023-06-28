const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback ) => callback(null, __dirname + '/../public/imgs'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jp')
});

const upload = multer.MulterError({ storage });

module.exports = upload;