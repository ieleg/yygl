var express = require('express');
var router = express.Router();
let sql = require('../../../mysql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/users/rolelist')
});
router.get('/add',(req,res) => {
  res.render('admin/users/addrole')
})
router.get('/api',async (req,res) => {
  let sqlStr = "select * from role limit ?,?";
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  let result = await sql(sqlStr,[(page-1)*limit,limit])
  let sqlStr2 = "select count(id) as role from user";
  let result2 = await sql(sqlStr2);
  
  let option = {
    "code": 0,
    "msg": "",
    "count": result2[0].num,
    "data": Array.from(result)
  }
  res.json(option)
})

router.get('/api/allrole',async (req,res) => {
  let sqlStr = "select * from auth";

  let result = await sql(sqlStr)
  // console.log(result);
  
  let option = {
    "code": 0,
    "data": Array.from(result)
  }
  res.json(option)
})

router.post('/addrole', async (req,res) => {
  // console.log(req.body);
  // 修改角色表
  // let sqlStr = "insert into role (rolename,brief) values (?,?)";
  let rolename = req.body.rolename
  // await sql(sqlStr,[rolename,req.body.brief]);
  // 修改角色与权限关系表
  let authlist = req.body.authlist;
  authlist.forEach(async item => {
    let id = item.value;
    console.log([rolename,id]);
    let sqlStr2 = "insert into role_auth (roleid,authid) values ((select id from role where rolename=?),?)";
    let r = await sql(sqlStr2,[rolename,id]);
    console.log(r);
  })
  res.json({state:'pk',content:'插入成功'})

  
})
module.exports = router;
