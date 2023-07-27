const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    if (
      extension !== ".png" &&
      extension !== ".jpeg" &&
      extension !== ".jpg" &&
      extension !== ".gif"
    ) {
      cb({ name: "fileNotSupported" }, false);
      return;
    }
    cb(null, true);
  },
});