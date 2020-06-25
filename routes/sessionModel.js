var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 设置session
router.get('/setsession',(req,res) => {
  // 登陆之后，要能快速获得用户姓名，VIp等级
  req.session.isLogin = "true";
  req.session.username = 'jack';
  req.session.password = '123456';
  req.session.vipLevel = 5;
  res.send('登陆状态已设置到session中')

})
router.get('/getsession',(req,res) => {
  // 登陆之后，要能快速获得用户姓名，VIp等级

  res.send('用户名'+req.session.username+'vip等级'+req.session.vipLevel)

})
module.exports = router;

