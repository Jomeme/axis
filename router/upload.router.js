const uploadRouter = require('express').Router();
const multer = require('multer');
const downloadPicture = require('../controllers/uploads/downloadPicture');
const uploadPicture = require('../controllers/uploads/uploadPicture');
const verifyToken = require('../middleware/verifyToken');
const APIError = require('../utils/APIError');
const wrap = require('../utils/wrap');
const { validate } = require('../validations');
const downloadPictureValidate = require('../validations/uploads/downloadPicture.validate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}_${suffix}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new APIError({ message: 'Only images can be uploaded.', isPublic: true }));
  }
};

const upload = multer({ storage, fileFilter });

uploadRouter.post('/', upload.single('picture'), wrap(uploadPicture));

uploadRouter.get('/:userId/:filename', downloadPictureValidate(), validate, wrap(downloadPicture));

module.exports = uploadRouter;