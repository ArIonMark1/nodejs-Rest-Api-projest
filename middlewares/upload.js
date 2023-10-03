const multer = require("multer");
const path = require("path");

// об'єкт налаштувань
const tempDir = path.join(__dirname, "../", "tmp");
//
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// міделваря
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
