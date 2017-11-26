var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.send('bababababbakka');
  next();
})

/* GET users listing. */
router.get('/seven', function(req, res, next) {
  res.send('哈哈哈哈凄神寒骨悄怆幽邃');
});

router.get('/register', function(req, res, next) {
  res.send('你知道吗 樱花飘落的速度是每秒五厘米');
});
module.exports = router;
