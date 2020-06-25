var express = require('express');
var router = express.Router();
const userRouter = require('./userRouter')
const newsRouter = require('./newsRouter')
const doctorsRouter = require('./doctorsRouter')
const patientsRouter = require('./patientsRouter')
const sql = require('../../mysql')
// 是否允许进行后台的中间件
function permission(req,res,next){
  console.log(req.session.username);
  
  if(req.session.username == undefined){
    // 尚未登录，返回登陆页面
    res.render('info/info',{
      title:"用户未登录",
      content:"请重新登录",
      href:"/rl/login",
      hrefTxt:"登陆页",
    })
  }else{
    // 进入后台
    next();
  }
}
// 设置后台权限的中间件
async function adminAuth(req,res,next){
  // 通过用户名找权限
  let username = req.session.username;
  // console.log(username);
  
  let sqlStr = "SELECT * from auth where id in(SELECT authid from role_auth where roleid = (select roleid from user where username = ?))"
  let result = await sql(sqlStr,[username]);
  // console.log(result);
  let currentUrl = req.originalUrl; 
  // console.log(currentUrl);
  
  let isSelected = result.some(item => {
    return new RegExp('^'+currentUrl).test(item.authurl) || new RegExp('^'+item.authurl).test(currentUrl)
  })
  // 判断当前请求的路径是否在允许的路径里
  // console.log(arr);
  // console.log(currentUrl);
  
  
  if(isSelected){
    next();
  }else{
    res.render('info/info',{
      title:'禁止访问',
      content:'没有权限访问该页面,请联系管理员',
      href:'/',
      hrefTxt:'首页'
    })
  }
}

/* GET users listing. */
router.get('/', permission, function(req, res, next) {
  console.log(req.session.username);
  
  res.render('admin/index',{
    username:req.session.username,
  })
});
router.use(adminAuth);

// 后台的用户管理
router.use('/users',userRouter)
// 后台新闻管理
router.use('/news',newsRouter)
// 后台医生管理
router.use('/doctors',doctorsRouter)

// 后台患者管理
router.use('/patients',patientsRouter)

module.exports = router;
