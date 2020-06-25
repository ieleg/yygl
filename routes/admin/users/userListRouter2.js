var express = require('express');
var router = express.Router();
let sql = require('../../../mysql')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/users/userlist2');

});
router.get('/api', async function(req, res, next) {
  // 获取page
  let sqlStr = "select * from user limit ?,?";
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  console.log([page,limit]);

  let sqlStr2 = "select count(id) as num from user";
  let result = await sql(sqlStr,[(page-1)*limit,limit]);
  let result2 = await sql(sqlStr2);
  result.map(item => {
    item.roleid = item.roleid == 1&& '管理员' || item.roleid == 2 && '医生' || item.roleid == 3 && '患者' || null
  })
  console.log('api'+result);

  let option = 
  {
    "code": 0,
    "msg": "",
    "count": result2[0].num,
    "data": Array.from(result)
  } 
  // console.log(option);

  res.json(option)
});

router.get('/edituser',async (req,res) => {
  let id = req.query.id;
  // console.log(req.query);
  // 通过id找所有的信息
  let sqlStr = 'select * from user where id=?';
  let results = await sql(sqlStr,[id]);
  let role = await getRole();
  let users = results[0];
  let option = {users,role}
  console.log(option);
  res.render('admin/users/selfinfo',option)
})

router.get('/adduser',(req,res) => {
  res.send('od')
})

async function getRole(){
  let sqlStr = 'select * from role ';
  let result = await sql(sqlStr);
  return Array.from(result)
}
module.exports = router;
