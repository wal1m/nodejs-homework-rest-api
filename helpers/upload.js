const multer = require("multer");

require("dotenv").config();

const TEMP_DIR = process.env.TEMP_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2097152 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
});

module.exports = upload;
