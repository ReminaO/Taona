const multer = require('multer');
const uuid = require("uuid");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/avatars');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, uuid.v4() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');