var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/kicknot/:id', function(req, res, next) {
  res.render('kicknot', {
    id: req.params.id,
  });
});

module.exports = router;
