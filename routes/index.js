var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var cookieParser = require('cookie-parser');
var pool = require('../mysql-config');

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


// 大型文件的上传/下载
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
  console.log(req.signedCookies);

  res.cookie('name', 'gaoxiaofeng', {
    signed: true,
  });
  res.send('xxx');
});

router.get('/attachment', function(req, res) {
  res.type(path.join(__dirname, '../public/images/1.jpg'));
  res.attachment('2.jpg');
});

router.get('/database', function(req, res) {
  pool.getConnection(function(err, connection) {
    connection.query('select * from agent', function(error, results, fields) {
      if (error) throw error;
      console.log('The solution is :', results);
      res.send(results);
      connection.release(); 
    });
  });
});

router.get('/angularjs', function(req, res) {
  res.render('angular');
});

router.get('/totalCount', function(req, res) {
  pool.getConnection(function(err, connection) {
    connection.query('select count from count where id = 1', function(error, results, fields) {
      res.json({
        totalCount: results[0].count,
      });
      connection.release();
    });
  });
});

router.post('/totalCount/:count', function(req, res) {
  pool.getConnection(function(err, connection) {
    connection.query(`update count set count = ${req.params.count} where id = 1`, function(err, results) {
      if (err)
        res.status(500).send('服务器内部错误');
      res.json({
        data: '成功啦',
      });
    });
    connection.release();
  })
});

router.get('/first', function(req, res) {
  res.render('first');
});


module.exports = router;
