//Import des modules
const multer = require('multer');
const uuid = require("uuid");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'video/mov': 'mov'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/products');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, uuid.v4() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).array('files');