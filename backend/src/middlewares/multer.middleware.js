import multer from "multer";
import os from "os";

// Photo ko temporarily OS ke temp folder mein save karne ka logic (taaki alag se folder na banana pade)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir()); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });