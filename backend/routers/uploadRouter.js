import multer from 'multer';
import express from 'express';
import { isAuth } from './utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({ //40.upload product image
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage }); //40.upload product image

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => { //40.upload product image
  res.send(`/${req.file.path}`);
});

export default uploadRouter;