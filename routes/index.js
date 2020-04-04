var express = require('express');
var router = express.Router();

/* 홈 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* 리스트 페이지로 이동 */
router.get('/showList', function(req, res, next) {
  res.render('list', { title: 'list' });
});


/* 비디오 재생 페이지로 이동 */
router.get('/runVideo', function(req, res, next) {
  res.render('video', { title: 'runVideo' });
});

module.exports = router;
