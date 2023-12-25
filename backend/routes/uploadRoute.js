const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp|jpg/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadMultiImages = upload.array('image', 100);

router.post('/', (req, res) => {
  uploadMultiImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    const filePaths = req.files.map((file) => `/${file.path}`);
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: filePaths,
    });
  });
});

module.exports = router;
