var express = require('express');
var router = express.Router();
let sql = require('../../mysql')
let multer = require('multer');
let upload = multer({dest:"./public/upload"})
let fs = require('fs')
var crytpo = require('crypto');
let userListRouter = require('./users/userListRouter')
let userListRouter2 = require('./users/userListRouter2')
let authListRouter = require('./users/authListRouter')
let roleListRouter = require('./users/roleListRouter')



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
router.get('/', function(req, res, next) {
  res.send('用户管理');
});
// 个人信息路由
router.get('/selfinfo', async function(req, res, next) {
  // 获取用户名，通过用户名获取所有用户信息
  let username = req.session.username;
  let sqlStr = 'select * from user where username=?';
  let results = await sql(sqlStr,[username]);
  let role = await getRole();
  let users = results[0];
  let option = {users,role}
  console.log(option);

  res.render('admin/users/selfinfo',option)
});

async function getRole(){
  let sqlStr = 'select * from role ';
  let result = await sql(sqlStr);
  return Array.from(result)
}
// 上传图片
router.post('/selfimgupload',upload.single('imgfile'),async function(req,res){
  let result = rename(req)
  console.log(req.query);
  
  // 将改名后的结果上传到数据库
  let sqlStr = "update user set imgheader = ? where username = ?";
  await sql(sqlStr,[result.imgUrl,req.query.username])
  res.json(result)
})

function rename(req){
  // console.log(req.file);
  let oldPath = req.file.destination+"/"+req.file.filename;
  let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname;
  fs.rename(oldPath,newPath,() => {
    console.log('改名成功');  
  })
  return{
    state: 'ok',
    imgUrl:'/upload/'+req.file.filename+req.file.originalname,
  }
}

router.post('/selfinfo',async function(req,res){
  console.log(req.body);
  // username: 'admin',
  // phone: '13777806555',
  // roleid: '1',
  // pass: '123456',
  // repass: '123456',
  // imgfile: ''
  console.log(req.body);
  
  let sqlStr = "update user set password=?,mobile=?,roleid=? where username=?";
  let password = Jiami.jiami(req.body.pass);
  let mobile = req.body.phone;
  let roleid = req.body.roleid;
  let result = await sql(sqlStr,[password,mobile,roleid,req.body.username]);
  res.json({
    state:'ok',
    content:'个人信息更新成功'
  })
})

router.use('/userlist1',userListRouter)
router.use('/userlist2',userListRouter2)
router.use('/authlist',authListRouter)
router.use('/rolelist',roleListRouter)


module.exports = router;
