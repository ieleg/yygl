var express = require('express');
var router = express.Router();
var crytpo = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/setcookie',(req,res) => {
  // 设置加密操作
  res.cookie("isLogin","true",{signed:true});
  res.send('cookie设置成功')
})
router.get('/adminSecret',(req,res) => {
  console.log(req.signedCookies);
  if(!req.signedCookies.isLogin)
  res.send('登录成功');

  
})


// 加密
router.get('/secret',(req,res) => {
  let secretValue = Jiami.jiami('神上');
  console.log(secretValue);
  
  res.cookie("name",secretValue);
  res.send(Jiami.secret[secretValue]);
  
})

let Jiami = {
  secret:{},
  jiami(str){
    let password = str;
    password = str + 'wl';
    let sf = crytpo.createHash('md5');
    // 对字符串加密
    sf.update(password);
    // 加密的二进制数据以字符串的形式显示
    let content = sf.digest('hex');
    this.secret[content] || (this.secret[content] = str);
    return content;
  },
}
module.exports = router;
