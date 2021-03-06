var express = require('express');
var loger = require('../logmodule.js');            //로그모듈
var connection = require('../mysqlconfig.js');      //mysql 모듈
var router = express.Router();




/* 홈 */
router.get('/', function(req, res, next) {

  //테스트 쿼리문
  var sql = 'SELECT * FROM langdb.speech;';


  connection.query(sql, function (err, rows, results) {
    
  
    //에러 처리
    if(err){
      
      loger.error('test 테이블 조회 쿼리에 오류가 있습니다. - / - /index.js');
      loger.error(err);
      throw err;
      
    }else{
        //페이지 렌더링
        res.render('index',{
            title : '메인화면',
            rows:rows
        });
        
    }
  });

  

  
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
loger.info("메모리 로딩 완료. - index.js");



