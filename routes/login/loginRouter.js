var express = require('express');
var router = express.Router();
var sql = require('../../mysql')
// 加密
var crytpo = require('crypto');
// 对密码加密
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
/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('login/register');
});
router.get('/info', function(req, res, next) {
  res.render('info/info',{
    title:"注册失败",
    content:"用户已存在",
    href:"/rl/register",
    hrefTxt:"注册页",
  })
});
router.post('/register', async function(req, res, next) {
  // 获取用户名密码
  let username = req.body.username;
  let password = Jiami.jiami(req.body.password);
  
  // 判断用户是否存在，如果没有用户才进行插入操作
  let sqlStr = 'select * from user where username=?'
  let result = await sql(sqlStr,[username]);  
  if(result.length){
    // 告知此用户名已存在
    res.render('info/info',{
      title:"注册失败",
      content:"用户已存在",
      href:"/rl/register",
      hrefTxt:"注册页",
    })
  }else{
    sqlStr = "insert into user (username,password,roleid) value (?,?,1)";
    await sql(sqlStr,[username,password])
    res.render('info/info',{
      title:"注册成功",
      content:"即将进入登录页",
      href:"/rl/login",
      hrefTxt:"登录页",
    })
  }

});
router.get('/login',  function(req, res, next) {
  res.render('login/login');
});
router.post('/login', async function(req, res, next) {
  let arry = [req.body.username,Jiami.jiami(req.body.password)];
  let sqlStr = 'select * from user where username=? and password=?'
  let result = await sql(sqlStr,arry);  
  if(!result.length){
    console.log(arry);
    
    res.render('info/info',{
      title:"登录失败",
      content:"用户名或密码不存在",
      href:"/rl/login",
      hrefTxt:"登录页",
    })
  }else{
    req.session.username = req.body.username;
    res.render('info/info',{
      title:"登录成功",
      content:"即将进入后台页面",
      href:"/admin",
      hrefTxt:"后台",
    })
  }
});

router.get('/clear',(req,res) => {
  req.session.destroy();
  res.send('清除session')
})

router.get('/loginout',(req,res) => {
  req.session.destroy();
  res.render('info/info',{
    title:"退出登录成功",
    content:"即将进入登录页面",
    href:"/rl/login",
    hrefTxt:"登录",
  })
})
module.exports = router;
