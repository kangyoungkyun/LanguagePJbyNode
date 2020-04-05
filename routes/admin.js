var express = require('express');
var loger = require('../logmodule.js');            //로그모듈
var connection = require('../mysqlconfig.js');      //mysql 모듈
var router = express.Router();




/* 글 작성하기 페이지 */
router.get('/showWriteSpeechPage', function(req, res, next) {

  res.render('writeSpeech', { title: 'writeSpeech' });
  
});


/* 글작성하기 - 저장*/
router.post('/saveWriteSpeech', function(req, res, next) {

  loger.info('글작성하기 저장 진입  - /admin/saveWriteSpeech - admin.js');

  var code = req.body.code;
  var title = req.body.title;
  var description = req.body.description;
  var type = req.body.type;
  var level = req.body.level;
  var image = req.body.image;
  var tag = req.body.tag;
  var speech_count = req.body.speech_count;
  var runing_time = req.body.runing_time;

  //speech 테이블에 입력하기
  var insertsql = 'INSERT INTO langdb.speech (code, title, description, type, level, image, tag, speech_count, runing_time) VALUES (?,?,?,?,?,?,?,?,?);';
  var params = [code,title,description,type,level,image,tag,speech_count,runing_time];
  
  connection.query(insertsql, params, function (err, rows, fields) {
    if (err) {
        loger.error('insert 쿼리에 오류가 있습니다. - /admin/saveWriteSpeech - admin.js');
        loger.error(err);
        //res.status(500).send('죄송합니다. 작업중 오류가 발생했습니다.');
        throw err;

    } else {

        //insertId가 존재하면
        if(rows.insertId){
          res.send({ result: 'success' , tocken:'저장성공'});
        }else{
          res.send({ result: 'fail' , tocken:'저장실패'});
        }
    
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



