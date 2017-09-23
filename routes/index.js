var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'haha')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
})

var upload = multer({
  storage: storage,
});

router.get('/pictures', function(req, res, next) {
  res.render('pictures');
});

/* GET home page. */
router.get('/file/:fileName', function(req, res, next) {
  let fileName = req.params.fileName;
  res.download(path.join(__dirname, '../public/images/', fileName + '.jpg') , fileName + '.jpg');
});

router.post('/upload', upload.single('pic'), function(req, res, next) {
  res.send('<a href="' + req.file.filename + '">点我</a>');
});

router.get('/redirect', function(req, res, next) {
  res.redirect("http://hao123.com");
});

router.get('/setCookie', function(req, res) {
  console.log(req.cookies);

  res.cookie('name', 'gaoxiaofeng', {
    signed: true,
  });
  res.send('xxx');
});

module.exports = router;
