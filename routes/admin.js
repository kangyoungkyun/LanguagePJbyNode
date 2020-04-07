var express = require('express');
var loger = require('../logmodule.js');            //로그모듈
var connection = require('../mysqlconfig.js');      //mysql 모듈
var router = express.Router();
var fs = require('fs');                                     //파일 시스템 모듈
var multer = require('multer')                              //파일관련 모듈


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


/* 글 관리하기 페이지 */
router.get('/showReadSpeechPage', function(req, res, next) {


    //테스트 쿼리문
    var sql = 'SELECT * FROM langdb.speech;';


    connection.query(sql, function (err, rows, results) {
      
    
      //에러 처리
      if(err){
        loger.error('speech 테이블 조회 쿼리에 오류가 있습니다. - / - /admin.js');
        loger.error(err);
        throw err;
        
      }else{
          //페이지 렌더링
          res.render('readSpeech',{
              title : '글관리',
              rows:rows
          });
          
      }
    });
  
});



//파일 저장위치와 파일이름 설정
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    loger.info("******destination");
    //파일이 이미지 파일이면
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {

      loger.info("******그림파일 입니다^^");

      cb(null, 'public/images/index');
      //텍스트 파일이면 
    } else {
      loger.info("******그림파일만 등록할 수 있습니다.");
    };
  },
  //파일이름 설정
  filename: function (req, file, cb) {
    var nowdate = new Date().toLocaleString();
    var nowdate2 = nowdate.replace(' ','');
    var nowdate3 = nowdate2.replace(':','');
    var nowdate4 = nowdate3.replace('-','');
    var nowdate5 = nowdate4.replace('-','');
    var now = nowdate5.replace(':','');
    var filename = now + '.png';
    loger.info("****** filename : " + filename);
    //var originalFileName = req.file.originalname;
    //var realName  = filename
    cb(null,filename);                          // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});


//파일 업로드 모듈
var upload = multer({ storage: storage });
/* 대분류 저장 액션 */
router.post('/saveimage', upload.single('fileupload') ,function (req, res, next) {
 
  try {
    loger.info('글관리 화면 이미지 저장 진입  - /admin/saveimage - admin.js ');
    loger.info("*****파일 -- > : " + req.file);

  } catch (error) {
    loger.info(error);
  }

  //파일 경로 넘겨주기
  var nowdate = new Date().toLocaleString();
  var nowdate2 = nowdate.replace(' ','');
  var nowdate3 = nowdate2.replace(':','');
  var nowdate4 = nowdate3.replace('-','');
  var nowdate5 = nowdate4.replace('-','');
  var now = nowdate5.replace(':','');

  res.send({ result: 'success' , 'path' : './images/index/'+ now + '.png'});
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



