var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var cookieParser = require('cookie-parser');
var pool = require('../mysql-config');

var winston = require('winston');

var examMark = require('../dataConfig/examMark');

const Sequelize = require('sequelize');

const loadController = require('../controllers/LoadController');

const User = require('../dataConfig/user');
const Eraser = require('../dataConfig/eraser');




examMark.create({
  subjectName: '地理',
  mark: '56',
  person: '小红'
})


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
// 修改2
// 添加注释1
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

router.get('/second', (req, res) => {
  res.render('second');
});

// ------
// 大型文件的上传/下载
router.get('/commonUpload', (req, res) => {
  res.render('common-upload');
});

router.post('/uploadFile', upload.single('file'), (req, res) => {
  res.status(200).json({
    data: 'success',
    route: '/image/' + req.file.filename,
  });
});

router.get('/promise', (req, res) => {
  var defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res);      
    }, 4000);
  });

  var defer2 = new Promise((resolve, reject) => {
    resolve(res);
  });

  Promise.all([defer, defer2]).then((resArr) => {
    resArr[0].send('delayed ttt');
  });
});

router.get('/cookieTest', function(req, res) {
  res.cookie('dashabi', 'haoahaoa', {
    signed: true,
  })
  res.send(req.signedCookies.dashabi);
});

// router.get('/load', function(req, res) {
//   console.log('为啥呢')
//   res.render('loadin')
// })

// router.get('/loadin', function(req, res) {
  

//   let userName = req.query.username;
//   let password = req.query.password;


//   User.findOne({
//     where: {
//       userName: userName,
//     }
//   }).then(user => {
//     if (user.getDataValue('password') === password) {
//       res.send('登陆成功');
//     } else {
//       res.send('登录失败');
//     }
//   })
// });

router.get('/one', function(req, res) {
  req.session.objTest = {
    key1: 'hahaha',
    key2: {
      key3: {
        key4: 'kakakka',
        key5: 'coconatsu',
      }
    },
  };
  res.send('<a href="/two">click me</a>');
});

router.get('/two', function(req, res) {
  console.log('para', req.session.para);
  res.send(req.session.para);
});


router.get('/register', loadController.register);
router.post('/register', loadController.registerSolve);
router.get('/load', loadController.load);
router.post('/load', loadController.loadSolve);
router.get('/eraser', function(req, res) {
  User.findAll()
    .then(users => {
      res.send(users);
    })
});

module.exports = router;

// do you want to say something like that?
// not your dimension