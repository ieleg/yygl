var express = require('express');
var router = express.Router();
let sql = require('../mysql')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/', async function(req, res, next) {
  let strSql = "select * from user where username=? and password=?"
  let arr = [req.body.username,req.body.password];
  let result = await sql(strSql,arr);
  if(result.length !== 0){
    res.send('ok')
  }else{
    res.send('登陆失败')
  }
});
module.exports = router;
